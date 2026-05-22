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
  Info,
  Users,
  Lock,
  Phone,
} from "lucide-react";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import BookingFormPro from "./BookingFormPro";
import { getPublicImageUrl } from "../../lib/supabase";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import FloatingWhatsApp from "../Ui/FloatingWhatsApp";

const TourDetailPagePro: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tour, loading, error } = useTourDetailsPro(id || null);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-caliza-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cenote-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-noche-400 font-bold uppercase tracking-widest text-xs">Preparando tu aventura...</p>
      </div>
    </div>
  );

  if (error || !tour) return (
    <div className="min-h-screen flex items-center justify-center bg-caliza-50 px-6 text-center">
      <div className="max-w-md">
        <h2 className="text-3xl font-extrabold text-noche-900 mb-4">Tour no encontrado</h2>
        <p className="text-noche-500 mb-8">Parece que la ruta que buscas no existe o ha sido movida.</p>
        <button
          onClick={() => navigate('/tours')}
          className="btn-reserva"
        >
          Volver al catálogo
        </button>
      </div>
    </div>
  );

  const isPrivado = tour.tipo_tour === "privado";
  const images = Array.isArray(tour.images) ? tour.images : (tour.images ? [tour.images] : []);
  const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images');
  const galleryImages = images.filter(img => !img.is_main);

  const includesList = tour.incluye?.split('\n').filter(i => i.trim()) || [];
  const excludesList = tour.no_incluye?.split('\n').filter(i => i.trim()) || [];

  return (
    <div className="min-h-screen bg-caliza-50 font-sans">
      <Toaster position="top-right" richColors />
      <Navbar />
      <FloatingWhatsApp />

      {/* ── Hero con imagen principal ── */}
      <section className="relative h-[65vh] lg:h-[78vh] w-full overflow-hidden">
        <img
          src={mainImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa'}
          alt={tour.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noche-950/85 via-noche-950/30 to-noche-950/10" />

        <div className="absolute bottom-10 left-0 right-0">
          <div className="container mx-auto px-5 lg:px-8">
            {/* Back nav */}
            <button
              onClick={() => navigate('/tours')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-5 text-xs font-semibold uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a Tours
            </button>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`tour-badge ${isPrivado
                ? "bg-tierra-100/90 text-tierra-800 border border-tierra-300/40 backdrop-blur-sm"
                : "bg-cenote-100/90 text-cenote-800 border border-cenote-300/40 backdrop-blur-sm"
              }`}>
                {isPrivado ? <Lock className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                {isPrivado ? "Tour Privado" : "Tour Grupal"}
              </span>
              <span className="tour-badge bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                {tour.categoria}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-white text-2xs font-bold">5.0 · 120+ reseñas</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight max-w-4xl tracking-tight">
              {tour.nombre}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Cuerpo principal ── */}
      <section className="py-14">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* ── Columna izquierda (info) ── */}
            <div className="lg:col-span-7 space-y-10">

              {/* Quick info strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Clock className="w-5 h-5 text-cenote-600" />, label: "Duración", value: `${tour.duracion} ${tour.duracion_tipo}` },
                  { icon: <MapPin className="w-5 h-5 text-cenote-600" />, label: "Ubicación", value: tour.ubicacion || "Riviera Maya" },
                  { icon: <Calendar className="w-5 h-5 text-cenote-600" />, label: "Nivel", value: tour.nivel || "Todos" },
                  { icon: <ShieldCheck className="w-5 h-5 text-cenote-600" />, label: "Certificado", value: "Garantizado" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-4 border border-caliza-200 flex flex-col gap-2">
                    <span className="text-2xs font-bold uppercase tracking-brand text-noche-400">{item.label}</span>
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-bold text-noche-900 text-sm">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white rounded-3xl p-7 border border-caliza-200">
                <h2 className="text-2xl font-extrabold text-noche-900 mb-5 flex items-center gap-3">
                  <Info className="w-6 h-6 text-cenote-600" />
                  Sobre esta experiencia
                </h2>
                <div className="text-noche-600 leading-relaxed whitespace-pre-line">
                  {tour.descripcion}
                </div>
              </div>

              {/* Includes / Excludes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-cenote-50 rounded-3xl p-6 border border-cenote-100">
                  <h4 className="font-extrabold text-noche-900 mb-5 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cenote-600" />
                    ¿Qué incluye?
                  </h4>
                  <ul className="space-y-3">
                    {includesList.length > 0 ? includesList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cenote-600 flex-shrink-0 mt-0.5" />
                        <span className="text-noche-700 text-sm leading-relaxed">{item}</span>
                      </li>
                    )) : <li className="text-noche-400 italic text-sm">Consultar detalles</li>}
                  </ul>
                </div>

                <div className="bg-caliza-50 rounded-3xl p-6 border border-caliza-200">
                  <h4 className="font-extrabold text-noche-900 mb-5 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-caliza-500" />
                    ¿Qué NO incluye?
                  </h4>
                  <ul className="space-y-3">
                    {excludesList.length > 0 ? excludesList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-caliza-600 flex-shrink-0 mt-0.5" />
                        <span className="text-noche-700 text-sm leading-relaxed">{item}</span>
                      </li>
                    )) : <li className="text-noche-400 italic text-sm">Consultar detalles</li>}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-noche-900 mb-6 flex items-center gap-3">
                    <Camera className="w-6 h-6 text-cenote-600" />
                    Galería de Fotos
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {galleryImages.map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                      >
                        <img
                          src={getPublicImageUrl(img.url, 'tour_images') || ''}
                          alt={`Galería ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* ── Columna derecha (booking) ── */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <BookingFormPro tour={tour} />

                {/* Trust notes below form */}
                <div className="mt-4 bg-white rounded-2xl p-4 border border-caliza-200">
                  <div className="flex flex-col gap-2.5">
                    {[
                      { icon: <ShieldCheck className="w-4 h-4 text-cenote-600" />, text: "Reserva segura y confirmación inmediata" },
                      { icon: <CheckCircle2 className="w-4 h-4 text-selva-600" />, text: "Cancelación flexible — consultar términos" },
                      { icon: <Phone className="w-4 h-4 text-[#25D366]" />, text: "Soporte vía WhatsApp durante toda tu reserva" },
                    ].map((note) => (
                      <div key={note.text} className="flex items-center gap-2.5">
                        {note.icon}
                        <span className="text-xs text-noche-500 font-medium">{note.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
