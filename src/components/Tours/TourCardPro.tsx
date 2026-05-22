import type { FC } from "react";
import { motion } from "framer-motion";
import { Clock, Star, MapPin, ChevronRight, Lock, Users } from "lucide-react";
import type { TourWithDetails } from "../../types/tour";
import { getPublicImageUrl } from "../../lib/supabase";
import { Link } from "react-router-dom";

interface TourCardProProps {
  tour: TourWithDetails;
}

export const TourCardPro: FC<TourCardProProps> = ({ tour }) => {
  const prices = Array.isArray(tour.prices) ? tour.prices : (tour.prices ? [tour.prices] : []);
  const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.precio_adulto || 0)) : 0;
  const isPrivado = tour.tipo_tour === "privado";

  const images = Array.isArray(tour.images) ? tour.images : (tour.images ? [tour.images] : []);
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images') ||
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800';

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-caliza-200 transition-all duration-300"
      style={{ boxShadow: "0 2px 20px rgba(14,75,88,0.07)" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={mainImage}
          alt={tour.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex gap-1.5 flex-wrap">
          <span className={`tour-badge ${isPrivado
            ? "bg-tierra-50 text-tierra-800 border border-tierra-200"
            : "bg-cenote-50 text-cenote-800 border border-cenote-200"
          }`}>
            {isPrivado ? <Lock className="w-3 h-3" /> : <Users className="w-3 h-3" />}
            {isPrivado ? "Privado" : "Grupal"}
          </span>
          {tour.categoria && (
            <span className="tour-badge bg-white/90 text-noche-700 border border-caliza-200 backdrop-blur-sm">
              {tour.categoria}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3.5 right-3.5">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-noche-800">5.0</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-cenote-600" />
          <span className="text-2xs font-bold uppercase tracking-widest text-noche-400">
            {tour.ubicacion || 'Riviera Maya'}
          </span>
        </div>
        <h3 className={`text-lg font-bold mb-2 line-clamp-1 transition-colors ${
          isPrivado ? "text-noche-900 group-hover:text-tierra-600" : "text-noche-900 group-hover:text-cenote-700"
        }`}>
          {tour.nombre}
        </h3>
        <p className="text-noche-500 text-sm line-clamp-2 leading-relaxed mb-4">
          {tour.descripcion}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-caliza-100 flex items-end justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-noche-500">
            <Clock className={`w-3.5 h-3.5 ${isPrivado ? "text-tierra-500" : "text-cenote-600"}`} />
            {tour.duracion} {tour.duracion_tipo}
          </div>
          <div className="text-right">
            <span className="block text-2xs font-bold uppercase tracking-widest text-noche-400 mb-0.5">Desde</span>
            <span className="text-2xl font-extrabold text-noche-900">${minPrice}</span>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-2">
          <Link
            to={`/tours/${tour.id}`}
            className={`flex items-center justify-center gap-1.5 w-full py-3 rounded-xl text-xs font-bold transition-all ${
              isPrivado
                ? "bg-tierra-500 text-white hover:bg-tierra-600 shadow-md shadow-tierra-500/10"
                : "bg-cenote-600 text-white hover:bg-cenote-700 shadow-md shadow-cenote-600/10"
            }`}
          >
            Ver Detalles <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
