import type { FC } from "react";
import { Clock, Star, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../Ui/Button";
import Card from "../Ui/Card";
import type { TourWithDetails } from "../../types/tour";
import { getPublicImageUrl } from "../../lib/supabase";

interface TourItemProps {
  tour: TourWithDetails;
  onClick: () => void;
}

export const TourCard: FC<TourItemProps> = ({ tour, onClick }) => {
  const prices = Array.isArray(tour.prices) ? tour.prices : (tour.prices ? [tour.prices] : []);
  const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.precio_adulto || 0)) : 0;
  
  const images = Array.isArray(tour.images) ? tour.images : (tour.images ? [tour.images] : []);
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images') || 
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800';

  return (
    <Card className="h-full flex flex-col group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={mainImage} 
          alt={tour.nombre} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
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

      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <div className="flex items-center gap-1 text-slate-400 mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{tour.ubicacion || 'Riviera Maya'}</span>
          </div>
          <h4 className="text-xl font-black text-slate-900 leading-tight group-hover:text-teal-600 transition-colors line-clamp-1">
            {tour.nombre}
          </h4>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold">{tour.duracion} {tour.duracion_tipo}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5">Desde</span>
            <span className="text-xl font-black text-slate-900">${minPrice}</span>
          </div>
        </div>

        <Button 
          className="w-full mt-6 bg-slate-900 text-white hover:bg-teal-600 hover:text-black border-none rounded-xl py-6 font-black uppercase tracking-widest text-xs"
          onClick={onClick}
        >
          Ver Detalles
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export const TourListItem: FC<TourItemProps> = ({ tour, onClick }) => {
  const prices = Array.isArray(tour.prices) ? tour.prices : (tour.prices ? [tour.prices] : []);
  const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.precio_adulto || 0)) : 0;
  
  const images = Array.isArray(tour.images) ? tour.images : (tour.images ? [tour.images] : []);
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images') || 
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800';

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden">
          <img 
            src={mainImage} 
            alt={tour.nombre} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
              {tour.categoria}
            </span>
          </div>
        </div>

        <div className="p-8 flex-grow flex flex-col justify-center">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{tour.ubicacion || 'Riviera Maya'}</span>
              </div>
              <h4 className="text-2xl font-black text-slate-900 group-hover:text-teal-600 transition-colors">
                {tour.nombre}
              </h4>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-2xl flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-slate-900 font-black">5.0</span>
            </div>
          </div>

          <p className="text-slate-500 text-sm mb-8 line-clamp-2 max-w-2xl">
            {tour.descripcion}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-8 pt-6 border-t border-slate-50">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-bold">{tour.duracion} {tour.duracion_tipo}</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5">Desde</span>
                <span className="text-3xl font-black text-slate-900">${minPrice}</span>
              </div>
              <Button 
                className="bg-slate-900 text-white hover:bg-teal-600 hover:text-black border-none rounded-xl px-8 py-6 font-black uppercase tracking-widest text-xs"
                onClick={onClick}
              >
                Reservar Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
