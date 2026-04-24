import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTourDetailsPro } from "../../hooks/useTourDetailsPro";
import { 
  Clock, 
  Star, 
  MapPin, 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  Camera,
  Info
} from "lucide-react";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import BookingFormPro from "./BookingFormPro";
import { getPublicImageUrl } from "../../lib/supabase";
import { Toaster } from "sonner";

const TourDetailPagePro: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tour, loading, error } = useTourDetailsPro(id || null);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Preparando tu aventura...</p>
      </div>
    </div>
  );

  if (error || !tour) return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
      <div className="max-w-md">
        <h2 className="text-3xl font-black text-slate-900 mb-4">¡Oops! No encontramos este tour</h2>
        <p className="text-slate-500 mb-8">Parece que la ruta que buscas no existe o ha sido movida.</p>
        <button onClick={() => navigate('/tours')} className="bg-teal-600 text-white px-8 py-4 rounded-2xl font-bold">Volver al catálogo</button>
      </div>
    </div>
  );

  const images = Array.isArray(tour.images) ? tour.images : (tour.images ? [tour.images] : []);
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images');

  // Parse strings to lists if they are stored as such
  const includesList = tour.incluye?.split('\n').filter(i => i.trim()) || [];
  const excludesList = tour.no_incluye?.split('\n').filter(i => i.trim()) || [];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Toaster position="top-right" richColors />
      <Navbar />
      
      <section className="relative h-[60vh] lg:h-[75vh] w-full overflow-hidden">
        <img 
          src={mainImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa'} 
          alt={tour.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-12 left-0 right-0">
          <div className="container mx-auto px-6">
            <button 
              onClick={() => navigate('/tours')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 font-bold uppercase tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Tours
            </button>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {tour.categoria}
              </span>
              <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-white text-[10px] font-black">5.0</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight max-w-4xl">
              {tour.nombre}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-7 space-y-12">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50 rounded-[2.5rem]">
                <div className="space-y-1">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Duración</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <span className="font-bold text-slate-900">{tour.duracion} {tour.duracion_tipo}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Ubicación</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span className="font-bold text-slate-900">{tour.ubicacion || 'Riviera Maya'}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nivel</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <span className="font-bold text-slate-900">{tour.nivel || 'Todos'}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificado</span>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                    <span className="font-bold text-slate-900">Garantizado</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Info className="w-8 h-8 text-teal-600" />
                  Sobre esta experiencia
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                  {tour.descripcion}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-teal-50/50 p-8 rounded-[2rem] border border-teal-100">
                  <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-sm">¿Qué incluye?</h4>
                  <ul className="space-y-4">
                    {includesList.length > 0 ? includesList.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="text-slate-600 font-medium text-sm">{item}</span>
                      </li>
                    )) : <li className="text-slate-400 italic text-sm">Consultar detalles</li>}
                  </ul>
                </div>
                <div className="bg-rose-50/50 p-8 rounded-[2rem] border border-rose-100">
                  <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-sm">¿Qué NO incluye?</h4>
                  <ul className="space-y-4">
                    {excludesList.length > 0 ? excludesList.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                        <span className="text-slate-600 font-medium text-sm">{item}</span>
                      </li>
                    )) : <li className="text-slate-400 italic text-sm">Consultar detalles</li>}
                  </ul>
                </div>
              </div>

              {images.length > 1 && (
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <Camera className="w-8 h-8 text-teal-600" />
                    Galería de Fotos
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.filter(img => !img.is_main).map((img, i) => (
                      <div key={i} className="aspect-square rounded-3xl overflow-hidden group">
                        <img 
                          src={getPublicImageUrl(img.url, 'tour_images') || ''} 
                          alt={`Gallery ${i}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <BookingFormPro tour={tour} />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TourDetailPagePro;
