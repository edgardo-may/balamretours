import { type FC, useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { fetchHeroSlides, type HeroSlide } from "../../services/heroService";
import { useNavigate } from "react-router-dom";

/* ─── Intent ──────────────────────────────────────────────────────────────
   Intent : Traveler mid-inspiration — the Hero must be a window into an
            experience, not a header. Feel the place before reading a word.
   Palette: Cenote deep (#0a2f38), limestone warm, turquoise accent (#6adde7),
            amber cursor (#e28a20), velvet night (#111827)
   Depth  : Layered gradient overlays — organic, not pure left-to-right
   Type   : Plus Jakarta Sans 800 — monumental h1, ultra-legible over imagery
   Cursor : Amber ▌ bar (tierra-400) — brand-specific, not generic pipe
   Sync   : Typing effect DRIVES the carousel — slide advances after erase
   ────────────────────────────────────────────────────────────────────── */

/* ─── Typing speeds ───────────────────────────────────────────────────── */
const TYPE_SPEED = 52; // ms per character while writing
const ERASE_SPEED = 28; // ms per character while erasing
const PAUSE_FULL = 2400; // ms pause when phrase is fully typed
const PAUSE_EMPTY = 320; // ms pause before typing next phrase

/* ─── Fallback slides (Unsplash — temporary, replaced by Supabase later) */
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: "fallback-1",
    title: "Cenotes cristalinos",
    subtitle: "Sumérgete en las aguas sagradas de los mayas",
    media_type: "image",
    media_url:
      "https://unsplash.com/photos/BmqEmGPEifM/download?force=true&w=1920",
    display_order: 1,
    show_in_hero: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-2",
    title: "Ruinas mayas impresionantes",
    subtitle: "Descubre la historia milenaria de la civilización maya",
    media_type: "image",
    media_url:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1920&q=80",
    display_order: 2,
    show_in_hero: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-3",
    title: "Playas paradisíacas",
    subtitle: "El Caribe Mexicano en su máximo esplendor",
    media_type: "image",
    media_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    display_order: 3,
    show_in_hero: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

/* ─── Typewriter hook ─────────────────────────────────────────────────── */
//
// DESIGN: phase is ONLY a ref — never React state.
// The useEffect depends solely on [target].
// This guarantees exactly ONE timer chain runs at all times.
// Previous bug: [phase, displayed] deps → every character re-ran the effect
// → spawned a new parallel timer → exponential cascade → runaway cycling.
//
type TypingPhase = "waiting" | "typing" | "pausing" | "erasing";

function useTypewriter(target: string, onEraseComplete: () => void) {
  // Only `displayed` is React state — triggers re-renders for the visible text.
  const [displayed, setDisplayed] = useState("");

  // Everything else is a ref — no extra renders, no stale closures.
  const phaseRef = useRef<TypingPhase>("waiting");
  const displayedRef = useRef("");
  const targetRef = useRef(target);
  const callbackRef = useRef(onEraseComplete);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the callback ref current (slides.length changes over time).
  useEffect(() => {
    callbackRef.current = onEraseComplete;
  }, [onEraseComplete]);

  // Restart the machine whenever the target phrase changes.
  // This fires on: initial mount, slide auto-advance, and arrow/dot navigation.
  useEffect(() => {
    // Kill any running timer immediately.
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    // Reset to a clean state for the new phrase.
    targetRef.current = target;
    phaseRef.current = "waiting";
    displayedRef.current = "";
    setDisplayed("");

    // The single recursive tick — self-schedules via setTimeout.
    // No external re-trigger needed; it runs until the phrase is erased.
    const tick = () => {
      const t = targetRef.current;
      const cur = displayedRef.current;
      const ph = phaseRef.current;

      if (ph === "waiting") {
        // Brief pause before typing starts.
        phaseRef.current = "typing";
        timerId.current = setTimeout(tick, PAUSE_EMPTY);
      } else if (ph === "typing") {
        if (cur.length < t.length) {
          // Add one character.
          const next = t.slice(0, cur.length + 1);
          displayedRef.current = next;
          setDisplayed(next);
          timerId.current = setTimeout(tick, TYPE_SPEED);
        } else {
          // Phrase complete — hold before erasing.
          phaseRef.current = "pausing";
          timerId.current = setTimeout(tick, PAUSE_FULL);
        }
      } else if (ph === "pausing") {
        phaseRef.current = "erasing";
        timerId.current = setTimeout(tick, ERASE_SPEED);
      } else if (ph === "erasing") {
        if (cur.length > 0) {
          // Remove one character.
          const next = cur.slice(0, -1);
          displayedRef.current = next;
          setDisplayed(next);
          timerId.current = setTimeout(tick, ERASE_SPEED);
        } else {
          // Fully erased → signal parent to advance slide.
          // The target-change effect will restart a fresh cycle.
          callbackRef.current();
          // Do NOT schedule another tick here — the new target triggers the effect.
        }
      }
    };

    // Kick off the first tick after a tiny delay (avoids SSR/hydration flicker).
    timerId.current = setTimeout(tick, 50);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [target]); // ← ONLY target. No phase, no displayed.

  return displayed; // phase is internal — callers only need the visible string.
}

/* ─── Media sub-components ────────────────────────────────────────────── */
const VideoSlide: FC<{ src: string }> = ({ src }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {
      /* autoplay policy — silent */
    });
    return () => {
      v.pause();
    };
  }, [src]);
  return (
    <video
      ref={ref}
      src={src}
      className="absolute inset-0 w-full h-full object-cover"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
};

const ImageSlide: FC<{ src: string; alt: string; isFirst: boolean }> = ({
  src,
  alt,
  isFirst,
}) => (
  <div className="absolute inset-0 overflow-hidden">
    <img
      src={src}
      alt={alt}
      loading={isFirst ? "eager" : "lazy"}
      decoding="async"
      className="w-full h-full object-cover animate-hero-kenburns"
    />
  </div>
);

/* ─── Slide variants — cross-dissolve ────────────────────────────────── */
const slideVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ─── Content entrance variants (stagger on mount only) ──────────────── */
const contentEnter = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemEnter = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const eyebrowEnter = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ─── Blinking cursor — always active; typing cycle never stops ───────── */
const Cursor: FC = () => (
  <span
    className="inline-block w-[3px] h-[0.85em] ml-[2px] align-middle rounded-sm bg-tierra-400 animate-hero-blink"
    aria-hidden="true"
  />
);

/* ═══ HeroCarousel ════════════════════════════════════════════════════════ */
const HeroCarousel: FC = () => {
  const navigate = useNavigate();

  const [slides, setSlides] = useState<HeroSlide[]>(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // controls entrance animation

  /* drag */
  const dragStart = useRef<number>(0);
  const isDragging = useRef(false);

  /* ── Load slides from Supabase ─────────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    fetchHeroSlides().then((data) => {
      if (cancelled) return;
      if (data.length > 0) setSlides(data);
      setIsLoading(false);
      setTimeout(() => setMounted(true), 60); // tiny delay — let DOM settle
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /* ── Advance to next slide ─────────────────────────────────────────── */
  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
  }, []);

  /* ── Typewriter: onEraseComplete advances the slide ───────────────── */
  const handleEraseComplete = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const slide = slides[current];
  const typingTarget = slide?.title ?? "";

  // Hook returns the visible string only — phase is internal to the hook.
  const displayed = useTypewriter(typingTarget, handleEraseComplete);

  /* ── Drag / swipe ──────────────────────────────────────────────────── */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    isDragging.current = false;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (Math.abs(e.clientX - dragStart.current) > 8) isDragging.current = true;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = dragStart.current - e.clientX;
      if (Math.abs(delta) > 50) delta > 0 ? goNext() : goPrev();
      isDragging.current = false;
    },
    [goNext, goPrev],
  );

  /* ── Loading skeleton ──────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <section className="relative min-h-screen w-full bg-noche-950 overflow-hidden">
        <div
          className="hero-skeleton-pulse absolute inset-0"
          aria-hidden="true"
        />
      </section>
    );
  }

  /* ══ Render ════════════════════════════════════════════════════════════ */
  return (
    <section
      className="relative min-h-screen w-full flex items-center overflow-hidden select-none"
      aria-label="Hero — Balam RE Tours"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* ── Media layer — cross-dissolve ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0"
          aria-hidden="true"
        >
          {slide.media_type === "video" ? (
            <VideoSlide src={slide.media_url} />
          ) : (
            <ImageSlide
              src={slide.media_url}
              alt={slide.title ?? "Balam RE Tours — Riviera Maya"}
              isFirst={current === 0}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Preload next image ── */}
      {slides.length > 1 &&
        slides[(current + 1) % slides.length].media_type === "image" && (
          <link
            rel="preload"
            as="image"
            href={slides[(current + 1) % slides.length].media_url}
          />
        )}

      {/* ── Gradient overlays — organic, layered ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-noche-950/85 via-noche-950/50 to-cenote-950/20" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-noche-950/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-noche-950/45 to-transparent" />
      </div>

      {/* ── Content — stagger entrance on mount ── */}
      <div className="container mx-auto px-5 lg:px-8 relative z-20 pt-20 pb-12 md:pt-28 md:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={contentEnter}
          >
            {/* Eyebrow */}
            <motion.div
              variants={eyebrowEnter}
              className="flex items-center gap-2 mb-4 md:mb-6"
            >
              <Star
                className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0"
                aria-hidden="true"
              />
              <span className="text-white/90 text-xs md:text-sm font-semibold tracking-widest uppercase">
                La mejor experiencia en la Riviera Maya
              </span>
            </motion.div>

            {/* Headline — static, monumental */}
            <motion.h1
              variants={itemEnter}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-4 md:mb-6"
            >
              Descubre la{" "}
              <span className="relative inline-block">
                <span className="text-cenote-300">Riviera Maya</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-cenote-400/50 rounded-full" />
              </span>{" "}
              como nunca.
            </motion.h1>

            {/* Typing phrase — dynamic subtitle */}
            <motion.div
              variants={itemEnter}
              className="mb-7 md:mb-10"
              aria-live="polite"
              aria-label={`Experiencia destacada: ${typingTarget}`}
            >
              <p className="text-lg md:text-xl text-white/85 leading-relaxed font-normal min-h-[1.75rem]">
                {displayed}
                <Cursor />
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={itemEnter}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                id="hero-cta-tours"
                onClick={() => navigate("/tours")}
                className="btn-reserva text-base px-10 py-4 group shadow-xl hover:shadow-2xl transition-all"
                aria-label="Ver todos los tours disponibles"
              >
                Ver Todos los Tours
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Arrow nav — only when >1 slide ── */}
      {slides.length > 1 && (
        <>
          <button
            id="hero-prev"
            onClick={goPrev}
            aria-label="Slide anterior"
            className="hero-arrow-btn hidden md:flex left-4 md:left-6"
          >
            <ChevronLeft
              className="w-5 h-5 text-white"
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
          <button
            id="hero-next"
            onClick={goNext}
            aria-label="Siguiente slide"
            className="hero-arrow-btn hidden md:flex right-4 md:right-6"
          >
            <ChevronRight
              className="w-5 h-5 text-white"
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </>
      )}

      {/* ── Film-strip indicators ── */}
      {slides.length > 1 && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          role="tablist"
          aria-label="Slides del carrusel"
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              id={`hero-dot-${i}`}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`hero-dot ${i === current ? "hero-dot--active" : ""}`}
            />
          ))}
        </div>
      )}

      {/* ── Scroll indicator — center bottom ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase font-medium">
          Explorar
        </span>
        <div className="w-5 h-9 border-2 border-white/25 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
