import { type FC } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Star,
  MapPin,
  ChevronRight,
  Sparkles,
  Lock,
  Tag,
  ArrowRight,
  Percent,
  Users,
} from "lucide-react";
import { useGeneralTours, usePrivateTours, useOfferTours } from "../../hooks/useTours";
import { getPublicImageUrl } from "../../lib/supabase";
import { Link } from "react-router-dom";
import type { TourWithDetails } from "../../types/tour";

// ─── Tour Card reutilizable ────────────────────────────────────────────────────
interface TourCardProps {
  tour: TourWithDetails;
  index: number;
  variant?: "light" | "dark";
  badge?: { label: string; variant: "colectivo" | "privado" | "oferta" };
}

const TourCard: FC<TourCardProps> = ({ tour, index, variant = "light", badge }) => {
  const prices = Array.isArray(tour.prices) ? tour.prices : tour.prices ? [tour.prices] : [];
  const minPrice = prices.length > 0 ? Math.min(...prices.map((p) => p.precio_adulto || 0)) : 0;
  const images = Array.isArray(tour.images) ? tour.images : tour.images ? [tour.images] : [];
  const mainImage =
    getPublicImageUrl(images.find((img) => img.is_main)?.url || images[0]?.url, "tour_images") ||
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800";

  const isDark = variant === "dark";

  const badgeColors = {
    colectivo: "bg-cenote-50 text-cenote-700 border border-cenote-200",
    privado: "bg-tierra-100 text-tierra-800 border border-tierra-200",
    oferta: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className={`group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "bg-noche-900 border border-noche-800 hover:border-tierra-400/30"
          : "bg-white border border-caliza-200"
      }`}
      style={{ boxShadow: isDark ? "0 2px 20px rgba(0,0,0,0.3)" : "0 2px 20px rgba(14,75,88,0.07)" }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={mainImage}
          alt={tour.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-noche-900/70" : "from-black/30"} to-transparent`} />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {badge && (
            <span className={`tour-badge ${badgeColors[badge.variant]}`}>
              {badge.variant === "privado" && <Lock className="w-3 h-3" />}
              {badge.variant === "colectivo" && <Users className="w-3 h-3" />}
              {badge.label}
            </span>
          )}
          <span className={`tour-badge ${isDark ? "bg-noche-800/90 text-caliza-300 border border-noche-700" : "bg-white/90 text-noche-700 border border-caliza-200 backdrop-blur-sm"}`}>
            {tour.categoria}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4">
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${isDark ? "bg-noche-800/90" : "bg-white/90 backdrop-blur-sm"}`}>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className={`text-xs font-bold ${isDark ? "text-white" : "text-noche-800"}`}>5.0</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-1.5">
          <MapPin className={`w-3.5 h-3.5 ${isDark ? "text-cenote-400" : "text-cenote-600"}`} />
          <span className={`text-2xs font-bold uppercase tracking-widest ${isDark ? "text-noche-400" : "text-noche-400"}`}>
            {tour.ubicacion || "Riviera Maya"}
          </span>
        </div>
        <h3 className={`text-lg font-bold mb-2 line-clamp-1 transition-colors ${
          isDark
            ? "text-white group-hover:text-tierra-300"
            : "text-noche-900 group-hover:text-cenote-700"
        }`}>
          {tour.nombre}
        </h3>
        <p className={`text-sm line-clamp-2 mb-4 leading-relaxed ${isDark ? "text-noche-400" : "text-noche-500"}`}>
          {tour.descripcion}
        </p>

        {/* Footer */}
        <div className={`mt-auto pt-4 border-t flex items-end justify-between ${isDark ? "border-noche-800" : "border-caliza-100"}`}>
          <div className="flex flex-col gap-1.5">
            <div className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? "text-noche-400" : "text-noche-500"}`}>
              <Clock className={`w-3.5 h-3.5 ${isDark ? "text-tierra-400" : "text-cenote-600"}`} />
              {tour.duracion} {tour.duracion_tipo}
            </div>
          </div>
          <div className="text-right">
            <span className={`block text-2xs font-bold uppercase tracking-widest mb-0.5 ${isDark ? "text-noche-500" : "text-noche-400"}`}>
              Desde
            </span>
            <span className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-noche-900"}`}>
              ${minPrice}
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-4">
          <Link
            to={`/tours/${tour.id}`}
            className={`flex items-center justify-center gap-1.5 w-full py-3 rounded-xl text-xs font-bold transition-all ${
              isDark
                ? "bg-tierra-500 text-white hover:bg-tierra-600"
                : "bg-cenote-600 text-white hover:bg-cenote-700"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            Ver Detalles
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Skeleton ──────────────────────────────────────────────────────────────────
const TourSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <div className={`animate-pulse rounded-3xl h-[440px] ${dark ? "bg-noche-800" : "bg-caliza-100"}`} />
);

// ─── Section Header ────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  icon: React.ReactNode;
  linkTo?: string;
  linkLabel?: string;
  linkHref?: string;
  dark?: boolean;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  eyebrow, title, highlight, description, icon, linkTo, linkLabel, linkHref, dark,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-2 mb-3"
      >
        {icon}
        <span className={`text-2xs font-bold uppercase tracking-brand ${dark ? "text-cenote-400" : "text-cenote-600"}`}>
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className={`text-4xl md:text-5xl font-extrabold leading-tight mb-3 ${dark ? "text-white" : "text-noche-900"}`}
      >
        {title}{" "}
        <span className={dark ? "text-tierra-300" : "text-cenote-600"}>{highlight}</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={`leading-relaxed ${dark ? "text-noche-400" : "text-noche-500"}`}
      >
        {description}
      </motion.p>
    </div>
    {(linkTo || linkHref) && linkLabel && (
      linkHref ? (
        <a
          href={linkHref}
          className={`shrink-0 group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
            dark
              ? "bg-tierra-500 text-white hover:bg-tierra-400"
              : "bg-cenote-50 text-cenote-700 border border-cenote-100 hover:bg-cenote-600 hover:text-white hover:border-cenote-600"
          }`}
        >
          {linkLabel}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      ) : (
        <Link
          to={linkTo!}
          className={`shrink-0 group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
            dark
              ? "bg-tierra-500 text-white hover:bg-tierra-400"
              : "bg-cenote-50 text-cenote-700 border border-cenote-100 hover:bg-cenote-600 hover:text-white hover:border-cenote-600"
          }`}
        >
          {linkLabel}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )
    )}
  </div>
);

// ─── Sección Tours Generales ───────────────────────────────────────────────────
const GeneralToursSection: FC = () => {
  const { tours, loading } = useGeneralTours();

  return (
    <section id="tours-generales" className="py-20 bg-caliza-50 overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cenote-400/40 to-transparent mb-0" />
      <div className="container mx-auto px-5 lg:px-8 pt-20">
        <SectionHeader
          eyebrow="Experiencias Compartidas"
          title="Tours"
          highlight="Colectivos"
          description="Vive los destinos más icónicos de la Riviera Maya junto a otros viajeros. Grupos pequeños, guías expertos, precios accesibles."
          icon={<Sparkles className="w-4 h-4 text-cenote-600" />}
          linkTo="/tours?tipo=colectivo"
          linkLabel="Ver todos los tours"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => <TourSkeleton key={i} />)
            : tours.length > 0
            ? tours.slice(0, 6).map((tour, index) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  index={index}
                  badge={{ label: "Grupal", variant: "colectivo" }}
                />
              ))
            : (
              <div className="col-span-full text-center py-16 text-noche-400">
                <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No hay tours generales disponibles por el momento.</p>
              </div>
            )}
        </div>

        {!loading && tours.length > 6 && (
          <div className="text-center mt-10">
            <Link to="/tours" className="btn-reserva inline-flex">
              Ver todos los tours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Sección Tours Privados ────────────────────────────────────────────────────
const PrivateToursSection: FC = () => {
  const { tours, loading } = usePrivateTours();

  return (
    <section id="tours-privados" className="py-20 bg-noche-950 overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-tierra-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cenote-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-5 lg:px-8 relative">
        <SectionHeader
          eyebrow="Exclusividad Total"
          title="Tours"
          highlight="Privados"
          description="Diseñados exclusivamente para ti y tus acompañantes. Horarios flexibles, rutas personalizadas y atención de primer nivel."
          icon={<Lock className="w-4 h-4 text-tierra-400" />}
          linkTo="/tours?tipo=privado"
          linkLabel="Explorar Privados"
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => <TourSkeleton key={i} dark />)
            : tours.length > 0
            ? tours.slice(0, 6).map((tour, index) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  index={index}
                  variant="dark"
                  badge={{ label: "Privado", variant: "privado" }}
                />
              ))
            : (
              <div className="col-span-full text-center py-16 text-noche-500">
                <Lock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-semibold mb-4">No hay tours privados disponibles por el momento.</p>
                <Link to="/tours" className="btn-reserva-tierra inline-flex">
                  Ver Catálogo General <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
        </div>

        {/* Private CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 bg-gradient-to-r from-tierra-900/60 via-noche-900 to-noche-900 border border-tierra-800/40 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2">¿Quieres una experiencia 100% tuya?</h3>
            <p className="text-noche-400 max-w-xl">
              Diseñamos tu tour privado desde cero. Destinos, horarios, transporte y experiencias a tu medida. Sin grupos, sin prisa.
            </p>
          </div>
          <Link
            to="/tours?tipo=privado"
            className="shrink-0 btn-reserva-tierra px-8 py-4 text-base"
          >
            Ver Catálogo Privado
            <ArrowRight className="w-5 h-5 ml-1 inline-block" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Sección Ofertas ───────────────────────────────────────────────────────────
const OffersSection: FC = () => {
  const { tours, loading } = useOfferTours();

  if (!loading && tours.length === 0) return null;

  return (
    <section id="ofertas" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="Tiempo Limitado"
          title="Ofertas"
          highlight="Especiales"
          description="Precios reducidos en tours seleccionados. Aprovecha antes de que se agoten los lugares."
          icon={<Percent className="w-4 h-4 text-rose-500" />}
          linkTo="/tours"
          linkLabel="Ver todas"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => <TourSkeleton key={i} />)
            : tours.map((tour, index) => {
                const prices = Array.isArray(tour.prices) ? tour.prices : tour.prices ? [tour.prices] : [];
                const originalPrice = prices.length > 0 ? Math.min(...prices.map((p) => p.precio_adulto || 0)) : 0;
                const salePrice = tour.precio_oferta || Math.round(originalPrice * 0.8);
                const discount = originalPrice > 0 ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : 20;
                const images = Array.isArray(tour.images) ? tour.images : tour.images ? [tour.images] : [];
                const mainImage = getPublicImageUrl(images.find((img) => img.is_main)?.url || images[0]?.url, "tour_images") ||
                  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800";

                return (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                    className="group relative bg-white rounded-3xl overflow-hidden border border-caliza-200 flex flex-col hover:-translate-y-1 transition-all duration-300"
                    style={{ boxShadow: "0 2px 20px rgba(14,75,88,0.07)" }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={mainImage}
                        alt={tour.nombre}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="flex items-center gap-1.5 bg-rose-500 text-white px-3 py-1.5 rounded-full text-2xs font-bold shadow-lg">
                          <Tag className="w-3 h-3" /> -{discount}%
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-noche-800">5.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cenote-600" />
                        <span className="text-2xs font-bold uppercase tracking-widest text-noche-400">
                          {tour.ubicacion || "Riviera Maya"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-noche-900 mb-2 line-clamp-1 group-hover:text-rose-600 transition-colors">
                        {tour.nombre}
                      </h3>
                      <p className="text-sm text-noche-500 line-clamp-2 mb-4 leading-relaxed">{tour.descripcion}</p>

                      <div className="mt-auto pt-4 border-t border-caliza-100 flex items-end justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-noche-500">
                          <Clock className="w-3.5 h-3.5 text-rose-500" />
                          {tour.duracion} {tour.duracion_tipo}
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-noche-400 line-through block">${originalPrice}</span>
                          <span className="text-2xl font-extrabold text-rose-600">${salePrice}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link
                          to={`/tours/${tour.id}`}
                          className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-all"
                        >
                          Ver Detalles <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

// ─── Exportación principal ─────────────────────────────────────────────────────
const Tours: FC = () => (
  <>
    <GeneralToursSection />
    <PrivateToursSection />
    <OffersSection />
  </>
);

export default Tours;
