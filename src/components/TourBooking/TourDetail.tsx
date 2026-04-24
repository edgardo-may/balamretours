import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Info,
  ArrowLeft
} from "lucide-react";
import type { TourWithDetails } from "../../types/tour";
import { getPublicImageUrl } from "../../lib/supabase";
import BookingForm from "./BookingForm";
import Button from "../Ui/Button";

interface TourDetailProps {
  tour: TourWithDetails;
  onBack: () => void;
}

const TourDetail: FC<TourDetailProps> = ({ tour, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = tour.images.length > 0 
    ? tour.images.map(img => getPublicImageUrl(img.url, 'tour_images') || '')
    : ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200'];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Top Navbar Placeholder */}
      <div className="container mx-auto px-6 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver al listado</span>
        </button>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Gallery */}
            <div className="relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-white">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {tour.category}
                      </span>
                   </div>
                   <h1 className="text-4xl md:text-5xl font-black mb-2 leading-tight">{tour.name}</h1>
                   <div className="flex items-center gap-4 text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-bold">{tour.location || 'Riviera Maya'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 border-none" />
                        <span className="text-sm font-bold">{tour.rating || 5.0} (Mock Rating)</span>
                      </div>
                   </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={prevImage} className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Counter */}
              <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl text-white text-xs font-black tracking-widest">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
               <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                 <Info className="w-6 h-6 text-teal-600" />
                 Acerca de esta experiencia
               </h2>
               <p className="text-slate-600 leading-relaxed text-lg mb-10 whitespace-pre-line">
                 {tour.description}
               </p>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Duración</span>
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                       <Clock className="w-4 h-4 text-teal-600" />
                       {tour.duration}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Categoría</span>
                    <span className="text-slate-900 font-bold capitalize">{tour.category}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Idiomas</span>
                    <span className="text-slate-900 font-bold">Español, Inglés</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Confirmación</span>
                    <span className="text-slate-900 font-bold">Inmediata</span>
                  </div>
               </div>
            </div>

            {/* Lists Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Que incluye */}
               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    ¿Qué incluye?
                  </h3>
                  <ul className="space-y-4">
                    {(tour.includes || [
                      "Transportación redonda",
                      "Guía certificado",
                      "Equipo de snorkel",
                      "Comida buffet",
                      "Bebidas naturales"
                    ]).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                         <div className="mt-1 w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                         {item}
                      </li>
                    ))}
                  </ul>
               </div>

               {/* No incluye */}
               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    No incluye
                  </h3>
                  <ul className="space-y-4">
                    {(tour.excludes || [
                      "Propinas",
                      "Souvenirs",
                      "Fotos y video",
                      "Impuesto de muelle ($15 USD)",
                    ]).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                         <div className="mt-1 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                         {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            {/* Recomendaciones */}
            <div className="bg-teal-900 rounded-[2rem] p-8 md:p-12 text-white shadow-xl shadow-teal-900/20">
               <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-teal-400">
                 💡 Recomendaciones
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                 {(tour.recommendations || [
                   "Llevar protector solar biodegradable",
                   "Traje de baño y toalla",
                   "Ropa cómoda y cambio de ropa",
                   "Efectivo para gastos extras",
                   "Cámara resistente al agua",
                   "Repelente de insectos biodegradable"
                 ]).map((rec, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs text-teal-400">
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-200">{rec}</span>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
             <BookingForm tour={tour} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourDetail;
