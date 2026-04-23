import type { FC } from "react";
import { motion } from "framer-motion";
import { Clock, Star, Loader2 } from "lucide-react";
import Card from "../Ui/Card";
import Button from "../Ui/Button";
import { useHomeTours } from "../../hooks/useTours";
import { getPublicImageUrl } from "../../lib/supabase";

interface ToursProps {
  onSelectTour: (tourId: string) => void;
}

const Tours: FC<ToursProps> = ({ onSelectTour }) => {
  const { tours, loading, error } = useHomeTours();

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold">Cargando experiencias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center bg-slate-50">
        <p className="text-red-500 font-bold">
          Error al cargar los tours: {error}
        </p>
      </div>
    );
  }

  return (
    <section id="tours" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">
              Nuestras Experiencias
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Diseñadas para los Amantes de la Naturaleza
            </h3>
          </div>
          <p className="text-slate-500 font-medium max-w-sm">
            Desde la adrenalina pura en la selva hasta la paz espiritual en los
            cenotes. Elige tu próxima aventura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours.map((tour, index) => {
            // Pick main image or first one and resolve storage URL
            const imagePath = tour.images?.[0]?.url;

            const fallback =
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800";
            const cleanPath = imagePath?.replace(/^tour_images\//, "");
            const mainImage = cleanPath
              ? getPublicImageUrl(cleanPath, "tour_images")
              : fallback;

            // Pick first price
            const priceData = Array.isArray(tour.prices) ? tour.prices[0] : (tour.prices as any);

            const displayPrice = priceData
              ? Math.min(
                  priceData.precio_adulto ?? Infinity,
                  priceData.precio_menor ?? Infinity,
                )
              : 0;

            const priceLabel = "Desde";

            // Fallbacks for different column names
            const name = tour.name || (tour as any).nombre || "Sin nombre";
            const description =
              tour.description ||
              (tour as any).descripcion ||
              "Sin descripción";
            const category =
              tour.category || (tour as any).categoria || "General";
            const duration = tour.duration || (tour as any).duracion || "4h";
            const rating = tour.rating || (tour as any).puntuacion || 5;

            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card className="h-full flex flex-col group cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={mainImage}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800`;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Button
                        className="w-full bg-white text-black hover:bg-teal-600 hover:text-white border-none shadow-xl transition-all duration-300"
                        onClick={() => onSelectTour(tour.id)}
                      >
                        Reservar Ahora
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors">
                        {name}
                      </h4>
                    </div>

                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                      {description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-bold">{duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-slate-600">
                            {rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-bold uppercase tracking-tighter">
                          {priceLabel}
                        </span>
                        <span className="text-xl font-black text-slate-900">
                          ${displayPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tours;
