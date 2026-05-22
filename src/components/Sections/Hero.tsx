import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Users, Zap } from "lucide-react";

const trustBadges = [
  { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Guías certificados" },
  { icon: <Zap className="w-3.5 h-3.5" />, label: "Transporte incluido" },
  { icon: <Users className="w-3.5 h-3.5" />, label: "Atención personalizada" },
  { icon: <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />, label: "+500 reseñas 5★" },
];

const Hero: FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero1.jpg"
          alt="Balam RE Tours — Riviera Maya"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
      </div>

      {/* Gradient overlay — more organic, not pure left-to-right */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-noche-950/85 via-noche-950/50 to-cenote-950/20" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-noche-950/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 lg:px-8 relative z-20 pt-28 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.18, delayChildren: 0.2 },
              },
            }}
          >
            {/* Rating row */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
              className="flex items-center gap-2.5 mb-7"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">
                La mejor experiencia en Riviera Maya
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
            >
              Descubre la{" "}
              <span className="relative inline-block">
                <span className="text-cenote-300">Riviera Maya</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-cenote-400/50 rounded-full" />
              </span>
              {" "}como nunca.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl font-normal"
            >
              Cenotes cristalinos, ruinas mayas milenarias y selva virgen.
              Con guías locales certificados que te hacen sentir en casa.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <button
                onClick={() => navigate("/tours")}
                className="btn-reserva text-base px-8 py-4 group"
              >
                Ver Todos los Tours
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("tours-generales");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-ghost-white text-base px-8 py-4"
              >
                Explorar Tours
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.2 } } }}
              className="flex flex-wrap gap-2"
            >
              {trustBadges.map((badge) => (
                <span key={badge.label} className="trust-badge">
                  {badge.icon}
                  <span className="text-xs font-semibold">{badge.label}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase font-medium">Explorar</span>
        <div className="w-5 h-9 border-2 border-white/25 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>

      {/* Bottom stat bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="hidden md:flex items-center gap-8 pb-8">
            {[
              { value: "10k+", label: "Clientes satisfechos" },
              { value: "15+", label: "Años de experiencia" },
              { value: "50+", label: "Tours disponibles" },
              { value: "100%", label: "Guías certificados" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-cenote-300">{stat.value}</span>
                <span className="text-white/50 text-xs font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
