import type { FC } from "react";
import { Clock, Star, MapPin, ChevronRight } from "lucide-react";
import type { TourWithDetails } from "../../types/tour";
import { getPublicImageUrl } from "../../lib/supabase";
import Button from "../Ui/Button";

interface CardProps {
  tour: TourWithDetails;
  onViewDetails: (id: string) => void;
}

export const TourCard: FC<CardProps> = ({ tour, onViewDetails }) => {
  const images = Array.isArray(tour.images) ? tour.images : [];
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images') || 
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800';

  const prices = Array.isArray(tour.prices) ? tour.prices : [];
  const minPrice = prices.length > 0 
    ? Math.min(...prices.map(p => p.precio_adulto || 0)) 
    : 0;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={mainImage} 
          alt={tour.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-sm">
            {tour.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
           <div className="bg-teal-600/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-lg">
             <Star className="w-3.5 h-3.5 fill-white text-white" />
             <span className="text-white text-xs font-black">{tour.rating || 5.0}</span>
           </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-1 text-slate-400 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{tour.location || 'Riviera Maya'}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1">
              {tour.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2 mb-6">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold">{tour.duration}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5">Desde</span>
            <span className="text-2xl font-black text-slate-900">${minPrice}</span>
          </div>
          <Button 
            onClick={() => onViewDetails(tour.id)}
            variant="primary"
            className="rounded-2xl px-5 py-2.5 bg-slate-900 text-white hover:bg-teal-600 border-none shadow-none group/btn"
          >
            <span className="text-xs font-black uppercase tracking-widest mr-2">Detalles</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const TourListItem: FC<CardProps> = ({ tour, onViewDetails }) => {
  const images = Array.isArray(tour.images) ? tour.images : [];
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images') || 
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800';

  const prices = Array.isArray(tour.prices) ? tour.prices : [];
  const minPrice = prices.length > 0 
    ? Math.min(...prices.map(p => p.precio_adulto || 0)) 
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 p-4 mb-4 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0">
        <img 
          src={mainImage} 
          alt={tour.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex-grow flex flex-col justify-center py-2">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{tour.category}</span>
           <span className="text-slate-300">•</span>
           <div className="flex items-center gap-1">
             <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
             <span className="text-xs font-bold text-slate-600">{tour.rating || 5.0}</span>
           </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
          {tour.name}
        </h3>

        <div className="flex items-center gap-4 text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{tour.location || 'Riviera Maya'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{tour.duration}</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 max-w-2xl">
          {tour.description}
        </p>
      </div>

      <div className="w-full md:w-48 flex flex-col justify-center items-end border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Precio por adulto</span>
        <span className="text-3xl font-black text-slate-900 mb-4">${minPrice}</span>
        <Button 
          onClick={() => onViewDetails(tour.id)}
          className="w-full bg-teal-600 text-white rounded-xl py-3 border-none hover:bg-slate-900 shadow-lg shadow-teal-100"
        >
          <span className="text-sm font-black uppercase tracking-widest">Ver Detalles</span>
        </Button>
      </div>
    </div>
  );
};
