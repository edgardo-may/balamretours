import type { FC } from "react";
import {
  Clock,
  Star,
  MapPin,
  CheckCircle2,
  XCircle,
  Calendar,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Button from "../Ui/Button";
import type { TourWithDetails } from "../../types/tour";
import { getPublicImageUrl } from "../../lib/supabase";

interface TourDetailProps {
  tour: TourWithDetails;
  onBack: () => void;
}

const TourDetail: FC<TourDetailProps> = ({ tour, onBack }) => {
  const prices = Array.isArray(tour.prices) ? tour.prices : (tour.prices ? [tour.prices] : []);
  const mainPrice = prices[0]?.precio_adulto || 0;
  
  const images = Array.isArray(tour.images) ? tour.images : (tour.images ? [tour.images] : []);
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images') || 
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800';

  // Procesar textos (vienen como strings en la DB)
  const includesList = tour.incluye?.split('\n').filter(i => i.trim()) || [];
  const excludesList = tour.no_incluye?.split('\n').filter(i => i.trim()) || [];
  const recommendationsList = tour.recomendaciones?.split('\n').filter(i => i.trim()) || [];

  return (
    <div className="bg-white">
      {/* Header / Hero Style */}
      <div className="relative h-[400px] w-full">
        <img
          src={mainImage}
          alt={tour.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <div className="absolute bottom-10 left-10 right-10">
          <span className="bg-teal-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
            {tour.categoria}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
            {tour.nombre}
          </h2>
          <div className="flex items-center gap-6 mt-4 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span className="font-bold">{tour.ubicacion || 'Riviera Maya'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold">5.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Sobre el Tour</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {tour.descripcion}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <span className="font-bold text-slate-700">Duración: {tour.duracion} {tour.duracion_tipo}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span className="font-bold text-slate-700">Categoría: {tour.categoria}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-teal-50 p-6 rounded-2xl">
                <h4 className="font-black text-teal-900 mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Incluye
                </h4>
                <ul className="space-y-3">
                  {includesList.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-teal-800 flex items-start gap-2 italic">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50 p-6 rounded-2xl">
                <h4 className="font-black text-rose-900 mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> No Incluye
                </h4>
                <ul className="space-y-3">
                  {excludesList.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-rose-800 flex items-start gap-2 italic">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {recommendationsList.length > 0 && (
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <h4 className="font-black text-amber-900 mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Recomendaciones
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendationsList.map((rec: string, i: number) => (
                    <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                      <span className="text-amber-500">•</span> {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
              <div className="mb-6">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Precio desde</span>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black">${mainPrice}</span>
                  <span className="text-teal-400 font-bold mb-1">MXN</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-sm text-slate-400 italic">
                  * Precios sujetos a cambios según temporada y número de personas.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-teal-500 text-black hover:bg-white transition-all py-8 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-teal-500/20"
                onClick={() => {
                   document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Reservar Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
