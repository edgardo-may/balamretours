import type { FC } from "react";
import { motion } from "framer-motion";
import { Clock, Star, MapPin, ChevronRight, Sparkles } from "lucide-react";
import type { TourWithDetails } from "../../types/tour";
import { getPublicImageUrl } from "../../lib/supabase";
import { Link } from "react-router-dom";

interface TourCardProProps {
  tour: TourWithDetails;
}

export const TourCardPro: FC<TourCardProProps> = ({ tour }) => {
  const prices = Array.isArray(tour.prices) ? tour.prices : (tour.prices ? [tour.prices] : []);
  const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.precio_adulto || 0)) : 0;
  
  const images = Array.isArray(tour.images) ? tour.images : (tour.images ? [tour.images] : []);
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images') || 
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800';

  return (
    <Link to={`/tours/${tour.id}`} className="group block">
      <motion.div 
        whileHover={{ y: -8 }}
        className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
      >
        <div className="relative h-64 overflow-hidden">
          <img 
            src={mainImage} 
            alt={tour.nombre} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-600" />
              {tour.categoria}
            </span>
          </div>

          <div className="absolute bottom-4 right-4">
             <div className="bg-teal-600/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-lg">
               <Star className="w-3.5 h-3.5 fill-white text-white" />
               <span className="text-white text-xs font-black">5.0</span>
             </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <div className="flex items-center gap-1 text-slate-400 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{tour.ubicacion || 'Riviera Maya'}</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1">
              {tour.nombre}
            </h3>
          </div>

          <p className="text-slate-500 text-sm line-clamp-2 mb-6">
            {tour.descripcion}
          </p>

          <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold">{tour.duracion} {tour.duracion_tipo}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5 text-right">Desde</span>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-slate-900">${minPrice}</span>
                <ChevronRight className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
