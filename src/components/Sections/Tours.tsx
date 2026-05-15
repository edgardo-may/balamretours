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
} from "lucide-react";
import { useGeneralTours, usePrivateTours, useOfferTours } from "../../hooks/useTours";
import { getPublicImageUrl } from "../../lib/supabase";
import { Link } from "react-router-dom";
import type { TourWithDetails } from "../../types/tour";

// ─── Tour Card reutilizable ────────────────────────────────────────────────────
interface TourCardProps {
  tour: TourWithDetails;
  index: number;
  badge?: { label: string; color: string };
}

const TourCard: FC<TourCardProps> = ({ tour, index, badge }) => {
  const prices = Array.isArray(tour.prices)
    ? tour.prices
    : tour.prices
    ? [tour.prices]
    : [];
  const minPrice =
    prices.length > 0
      ? Math.min(...prices.map((p) => p.precio_adulto || 0))
      : 0;
  const images = Array.isArray(tour.images)
    ? tour.images
    : tour.images
    ? [tour.images]
    : [];
  const mainImage =
    getPublicImageUrl(
      images.find((img) => img.is_main)?.url || images[0]?.url,
      "tour_images"
    ) || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800";

  return (
    <motion.div
      key={tour.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={mainImage}
          alt={tour.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Category badge */}
        <div className="absolute top-5 left-5 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-sm">
            {tour.categoria}
          </span>
          {badge && (
            <span
              className={`px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-sm ${badge.color}`}
            >
              {badge.label}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-teal-600/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span className="text-white text-xs font-black">5.0</span>
          </div>
        </div>
      </div>

      <div className="p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {tour.ubicacion || "Riviera Maya"}
          </span>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
          {tour.nombre}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
          {tour.descripcion}
        </p>

        <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold">
                {tour.duracion} {tour.duracion_tipo}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase block mb-0.5">
              Desde
            </span>
            <span className="text-2xl font-black text-slate-900">
              ${minPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Overlay link */}
      <Link to={`/tours/${tour.id}`} className="absolute inset-0 z-10" aria-label={`Ver tour: ${tour.nombre}`} />
    </motion.div>
  );
};

// ─── Skeleton de carga ────────────────────────────────────────────────────────
const TourSkeleton: FC = () => (
  <div className="animate-pulse bg-slate-50 rounded-[2.5rem] h-[440px] border border-slate-100" />
);

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  linkLabel: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  highlight,
  description,
  icon,
  linkTo,
  linkLabel,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-4"
      >
        {icon}
        <span className="text-teal-600 font-black uppercase tracking-[0.2em] text-xs">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
      >
        {title}{" "}
        <span className="text-teal-600">{highlight}</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-500 mt-3 leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
    <Link
      to={linkTo}
      className="group flex items-center gap-3 bg-slate-50 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-xs shrink-0"
    >
      {linkLabel}
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

// ─── Sección Tours Generales ──────────────────────────────────────────────────
const GeneralToursSection: FC = () => {
  const { tours, loading } = useGeneralTours();

  return (
    <section id="tours-generales" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Experiencias Compartidas"
          title="Tours"
          highlight="Generales"
          description="Explora los destinos más icónicos de la Riviera Maya junto a otros viajeros. Tours grupales con guías expertos."
          icon={<Sparkles className="w-5 h-5 text-teal-600" />}
          linkTo="/tours"
          linkLabel="Ver todos"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((i) => <TourSkeleton key={i} />)
            : tours.length > 0
            ? tours.map((tour, index) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  index={index}
                  badge={{ label: "Grupal", color: "bg-teal-600/90 text-white backdrop-blur-md" }}
                />
              ))
            : (
              <div className="col-span-full text-center py-16 text-slate-400">
                <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No hay tours generales disponibles por el momento.</p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

// ─── Sección Tours Privados ───────────────────────────────────────────────────
const PrivateToursSection: FC = () => {
  const { tours, loading } = usePrivateTours();
  const whatsappUrl = `https://wa.me/529983471258?text=${encodeURIComponent("Hola, me interesa reservar un tour privado")}`;

  return (
    <section id="tours-privados" className="py-24 bg-slate-950 overflow-hidden relative">
      {/* Decorative gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Lock className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-black uppercase tracking-[0.2em] text-xs">
                Exclusividad Total
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white leading-tight"
            >
              Tours{" "}
              <span className="text-amber-400">Privados</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 mt-3 leading-relaxed"
            >
              Experiencias diseñadas exclusivamente para ti y tus acompañantes. Horarios flexibles, atención personalizada y acceso a destinos únicos.
            </motion.p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-900 px-8 py-4 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-xs shrink-0"
          >
            Cotizar Privado
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-slate-800 rounded-[2.5rem] h-[440px]" />
              ))
            : tours.length > 0
            ? tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group relative bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-amber-400/30 transition-all duration-500 flex flex-col h-full hover:shadow-2xl hover:shadow-amber-400/5"
                >
                  {/* Image */}
                  {(() => {
                    const images = Array.isArray(tour.images) ? tour.images : tour.images ? [tour.images] : [];
                    const mainImage = getPublicImageUrl(images.find((img) => img.is_main)?.url || images[0]?.url, "tour_images") ||
                      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800";
                    const prices = Array.isArray(tour.prices) ? tour.prices : tour.prices ? [tour.prices] : [];
                    const minPrice = prices.length > 0 ? Math.min(...prices.map((p) => p.precio_adulto || 0)) : 0;

                    return (
                      <>
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={mainImage}
                            alt={tour.nombre}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                          <div className="absolute top-5 left-5 flex gap-2">
                            <span className="bg-amber-400 text-slate-900 px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Privado
                            </span>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-white text-xs font-black">5.0</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-7 flex flex-col flex-grow">
                          <div className="flex items-center gap-1.5 text-slate-500 mb-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                              {tour.ubicacion || "Riviera Maya"}
                            </span>
                          </div>
                          <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-1">
                            {tour.nombre}
                          </h3>
                          <p className="text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                            {tour.descripcion}
                          </p>

                          <div className="mt-auto pt-5 border-t border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Clock className="w-4 h-4 text-amber-400" />
                              <span className="text-xs font-bold">
                                {tour.duracion} {tour.duracion_tipo}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-black text-slate-500 uppercase block mb-0.5">
                                Desde
                              </span>
                              <span className="text-2xl font-black text-white">${minPrice}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}

                  <Link to={`/tours/${tour.id}`} className="absolute inset-0 z-10" aria-label={`Ver tour privado: ${tour.nombre}`} />
                </motion.div>
              ))
            : (
              <div className="col-span-full text-center py-16 text-slate-500">
                <Lock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No hay tours privados disponibles por el momento.</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
                >
                  Contactar para cotización personalizada <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

// ─── Sección Ofertas ──────────────────────────────────────────────────────────
const OffersSection: FC = () => {
  const { tours, loading } = useOfferTours();

  if (!loading && tours.length === 0) return null;

  return (
    <section id="ofertas" className="py-24 bg-gradient-to-br from-rose-50 via-white to-orange-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Tiempo Limitado"
          title="Ofertas"
          highlight="Especiales"
          description="Aprovecha nuestros precios especiales en tours seleccionados. Las ofertas son por tiempo limitado."
          icon={<Percent className="w-5 h-5 text-rose-500" />}
          linkTo="/tours"
          linkLabel="Ver todas"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-[2.5rem] h-[440px] border border-rose-100" />
              ))
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
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-rose-100 flex flex-col h-full"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={mainImage}
                        alt={tour.nombre}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Discount badge */}
                      <div className="absolute top-5 left-5">
                        <span className="bg-rose-500 text-white px-3 py-1.5 rounded-2xl text-sm font-black shadow-lg flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" /> -{discount}%
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-rose-500/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-white text-white" />
                          <span className="text-white text-xs font-black">5.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-7 flex flex-col flex-grow">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {tour.ubicacion || "Riviera Maya"}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-rose-500 transition-colors line-clamp-1">
                        {tour.nombre}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                        {tour.descripcion}
                      </p>

                      <div className="mt-auto pt-5 border-t border-rose-50 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-4 h-4 text-rose-500" />
                          <span className="text-xs font-bold">
                            {tour.duracion} {tour.duracion_tipo}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black text-slate-400 line-through block">
                            ${originalPrice}
                          </span>
                          <span className="text-2xl font-black text-rose-500">
                            ${salePrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link to={`/tours/${tour.id}`} className="absolute inset-0 z-10" aria-label={`Ver oferta: ${tour.nombre}`} />
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

// ─── Componente principal que exporta las 3 secciones ────────────────────────
const Tours: FC = () => (
  <>
    <GeneralToursSection />
    <PrivateToursSection />
    <OffersSection />
  </>
);

export default Tours;
