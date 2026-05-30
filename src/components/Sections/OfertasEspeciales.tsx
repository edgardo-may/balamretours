import { type FC, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  Tag,
  ArrowRight,
  Percent,
  CalendarDays,
  ShoppingBag,
  Flame,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useOffers } from "../../hooks/useTours";
import { Link } from "react-router-dom";
import type { DBOffer } from "../../types/tour";
import { getPublicImageUrl } from "../../lib/supabase";

// ─── Intent ──────────────────────────────────────────────────────────────────
// Who: Turistas buscando descuentos y ofertas activas independientes.
// What: Visualizar promociones exclusivas sin afectar la integridad del catálogo de tours regulares.
// Feel: Exclusividad, urgencia elegante y alta conversión.
//
// Palette: Rose-500 para acentos de oferta, Cenote-600 para CTAs, Caliza-100 para fondo.
// Spacing: Base 4px.
// Fallback: Si no hay imagen, usa fotos de stock premium de la Riviera Maya.

// ─── Skeletons ───────────────────────────────────────────────────────────────
const OfertaSkeleton: FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-caliza-200 animate-pulse">
    <div className="relative h-60 bg-caliza-200" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-caliza-200 rounded-full w-2/5" />
      <div className="h-5 bg-caliza-200 rounded-full w-4/5" />
      <div className="h-3 bg-caliza-200 rounded-full w-full" />
      <div className="pt-3 border-t border-caliza-100 flex items-end justify-between">
        <div className="h-3 bg-caliza-200 rounded-full w-24" />
        <div className="space-y-1 text-right">
          <div className="h-3 bg-caliza-200 rounded-full w-16 ml-auto" />
          <div className="h-7 bg-caliza-300 rounded-full w-20 ml-auto" />
        </div>
      </div>
      <div className="h-10 bg-caliza-200 rounded-xl w-full mt-1" />
    </div>
  </div>
);

// ─── Pills y Badges ──────────────────────────────────────────────────────────
const DiscountBadge: FC<{ pct: number }> = ({ pct }) => (
  <div className="absolute top-4 left-4 z-10">
    <span className="flex items-center gap-1.5 bg-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-rose-500/30 tracking-wide">
      <Tag className="w-3.5 h-3.5" />
      -{pct}%
    </span>
  </div>
);

const ExpiryPill: FC<{ fecha: string }> = ({ fecha }) => {
  const end = new Date(fecha);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return null;

  const label =
    diffDays === 0
      ? "Último día"
      : diffDays === 1
      ? "Vence mañana"
      : `${diffDays} días restantes`;

  const urgencyClass =
    diffDays <= 2
      ? "bg-red-50 text-red-600 border-red-200"
      : diffDays <= 7
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-caliza-100 text-noche-500 border-caliza-200";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-bold border uppercase tracking-widest ${urgencyClass}`}
    >
      <CalendarDays className="w-3 h-3" />
      {label}
    </div>
  );
};

// ─── Oferta Card Individual ──────────────────────────────────────────────────
interface OfertaCardProps {
  offer: DBOffer;
  index: number;
}

const OfertaCard: FC<OfertaCardProps> = ({ offer, index }) => {
  const [imgError, setImgError] = useState(false);
  const originalPrice = offer.precio_original || 0;
  const salePrice = offer.precio_oferta || 0;
  
  // Cálculo inteligente de descuento si no viene preestablecido
  const discount = offer.descuento 
    ? Math.round(offer.descuento) 
    : (originalPrice > 0 && salePrice > 0)
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : 20;

  // Imagen fallback premium de la Riviera Maya
  const fallbacks = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800", // Playa Paradise
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800", // Cenote Ik Kil
    "https://images.unsplash.com/photo-1531278563162-8178df6f8821?auto=format&fit=crop&q=80&w=800", // Ruinas Tulum
  ];
  
  let imagePath = offer.imagen_url;
  if (imagePath && !imagePath.startsWith('http')) {
    imagePath = imagePath.replace(/\.[^/.]+$/, "") + ".webp";
  }
  const bucketUrl = getPublicImageUrl(imagePath, "ofertas_images");
  const mainImage = imgError ? fallbacks[index % fallbacks.length] : (bucketUrl || fallbacks[index % fallbacks.length]);
  
  const savings = originalPrice > salePrice ? originalPrice - salePrice : 0;
  
  // Destino del CTA principal
  const whatsappUrl = `https://wa.me/529983471258?text=Hola!%20Me%20interesa%20la%20oferta%20especial%3A%20%22${encodeURIComponent(offer.titulo)}%22`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-caliza-200 flex flex-col hover:-translate-y-1.5 transition-all duration-300"
      style={{
        boxShadow: "0 4px 24px rgba(14,75,88,0.09), 0 1px 4px rgba(14,75,88,0.05)",
      }}
    >
      {/* Imagen */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={mainImage}
          alt={offer.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            if (!imgError) {
              setImgError(true);
            }
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbacks[index % fallbacks.length]) {
              target.src = fallbacks[index % fallbacks.length];
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Badges */}
        <DiscountBadge pct={discount} />
        
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-noche-800">5.0</span>
          </div>
        </div>

        {savings > 0 && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-selva-700 border border-selva-200 px-3 py-1.5 rounded-full text-2xs font-bold">
              <Sparkles className="w-3 h-3" />
              Ahorras ${savings} USD
            </span>
          </div>
        )}
      </div>

      {/* Cuerpo */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-cenote-600 shrink-0" />
          <span className="text-2xs font-bold uppercase tracking-widest text-noche-400">
            {offer.ubicacion || "Riviera Maya"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-noche-900 mb-2 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
          {offer.titulo}
        </h3>

        <p className="text-sm text-noche-500 line-clamp-2 mb-3 leading-relaxed">
          {offer.descripcion}
        </p>

        {offer.fecha_fin && (
          <div className="mb-3">
            <ExpiryPill fecha={offer.fecha_fin} />
          </div>
        )}

        {/* Precios */}
        <div className="mt-auto pt-4 border-t border-caliza-100 flex items-end justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-noche-500">
            <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Sujeto a disponibilidad</span>
          </div>

          <div className="text-right shrink-0">
            {originalPrice > 0 && (
              <span className="text-xs text-noche-400 line-through block leading-none mb-0.5">
                ${originalPrice} USD
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-rose-600 leading-none">
                ${salePrice > 0 ? salePrice : "Consultar"}
              </span>
              {salePrice > 0 && <span className="text-2xs text-noche-400 font-medium">USD</span>}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-4 flex flex-col gap-2.5">
          {offer.tour_id ? (
            <>
              {/* Si está enlazado a un tour regular */}
              <Link
                to={`/tours/${offer.tour_id}`}
                state={{ openBooking: true }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-sm hover:shadow-rose-500/30 hover:shadow-md group/btn"
              >
                <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                Reservar Ahora
              </Link>
              <Link
                to={`/tours/${offer.tour_id}`}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-bold text-cenote-700 bg-cenote-50 border border-cenote-100 hover:bg-cenote-600 hover:text-white hover:border-cenote-600 transition-all"
              >
                Ver Detalles del Tour
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </>
          ) : (
            <>
              {/* Si es una oferta 100% independiente */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-sm hover:shadow-rose-500/30 hover:shadow-md group/btn"
              >
                <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                Reservar Oferta
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-bold text-cenote-700 bg-cenote-50 border border-cenote-100 hover:bg-cenote-600 hover:text-white hover:border-cenote-600 transition-all"
              >
                Consultar Detalles
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// ─── Estado Vacío ─────────────────────────────────────────────────────────────
const EmptyOffers: FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="col-span-full flex flex-col items-center justify-center py-20 px-6 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-caliza-200 flex items-center justify-center mb-5">
      <Tag className="w-9 h-9 text-caliza-400" />
    </div>
    <h3 className="text-xl font-extrabold text-noche-800 mb-2">
      No hay ofertas activas en este momento
    </h3>
    <p className="text-noche-500 text-sm max-w-sm leading-relaxed mb-6">
      Estamos diseñando nuevas aventuras con precios especiales. Consúltanos directamente por WhatsApp para promociones personalizadas.
    </p>
    <a
      href="https://wa.me/529983471258?text=Hola!%20Quiero%20saber%20si%20tienen%20alguna%20promoci%C3%B3n%20disponible"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-cenote-600 text-white rounded-2xl text-sm font-bold hover:bg-cenote-700 transition-all"
    >
      Consultar por WhatsApp <ArrowRight className="w-4 h-4" />
    </a>
  </motion.div>
);

// ─── Sección Principal ─────────────────────────────────────────────────────────
const OfertasEspeciales: FC = () => {
  const { offers, loading } = useOffers();

  // Si no está cargando y no hay ofertas en la DB, no renderizar la sección para mantener el flujo limpio
  if (!loading && offers.length === 0) return null;

  return (
    <section
      id="ofertas-especiales"
      className="relative py-20 bg-caliza-100 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 right-1/4 w-[600px] h-[600px] bg-rose-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cenote-400/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-5 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                <Flame className="w-3 h-3 text-rose-500" />
              </div>
              <span className="text-2xs font-bold uppercase tracking-brand text-rose-600">
                Promociones Exclusivas
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 text-noche-900"
            >
              Ofertas <span className="text-rose-500">Especiales</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-noche-500 leading-relaxed"
            >
              Planes de ensueño con precios rebajados. Aprovecha estas oportunidades limitadas para explorar lo mejor del Caribe Mexicano.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <a
              href="https://wa.me/529983471258?text=Hola!%20Me%20gustar%C3%ADa%20conocer%20las%20ofertas%20especiales%20activas"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest bg-white text-rose-600 border border-rose-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all"
            >
              <Percent className="w-3.5 h-3.5" />
              Solicitar Info
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Grid de Ofertas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3].map((i) => <OfertaSkeleton key={i} />)
          ) : offers.length > 0 ? (
            offers.map((offer, index) => (
              <OfertaCard key={offer.id} offer={offer} index={index} />
            ))
          ) : (
            <EmptyOffers />
          )}
        </div>
      </div>
    </section>
  );
};

export default OfertasEspeciales;
