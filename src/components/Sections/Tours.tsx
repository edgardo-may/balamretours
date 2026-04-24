import { type FC } from "react";
import { motion } from "framer-motion";
import { Clock, Star, MapPin, ChevronRight, Sparkles } from "lucide-react";
import { useHomeTours } from "../../hooks/useTours";
import { getPublicImageUrl } from "../../lib/supabase";
import { Link } from "react-router-dom";

const Tours: FC = () => {
  const { tours, loading } = useHomeTours();

  if (loading) {
    return (
      <section id="tours" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-slate-100 rounded-full mb-4"></div>
            <div className="h-4 w-96 bg-slate-50 rounded-full mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] bg-slate-50 rounded-[2.5rem]"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tours" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span className="text-teal-600 font-black uppercase tracking-[0.2em] text-xs">
                Experiencias Premium
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Aventuras que te <br />
              <span className="text-teal-600">quitarán el aliento.</span>
            </h2>
          </div>
          <Link
            to="/tours"
            className="group flex items-center gap-3 bg-slate-50 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-xs"
          >
            Ver catálogo completo
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => {
            const prices = Array.isArray(tour.prices) ? tour.prices : (tour.prices ? [tour.prices] : []);
            const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.precio_adulto || 0)) : 0;
            const images = Array.isArray(tour.images) ? tour.images : (tour.images ? [tour.images] : []);
            const mainImage = getPublicImageUrl(images.find(img => img.is_main)?.url || images[0]?.url, 'tour_images');

            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={mainImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa'}
                    alt={tour.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                      {tour.categoria}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {tour.ubicacion || 'Riviera Maya'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {tour.nombre}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-8 leading-relaxed">
                    {tour.descripcion}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-4 h-4 text-teal-600" />
                        <span className="text-xs font-bold">{tour.duracion} {tour.duracion_tipo}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black">5.0</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase block mb-0.5">Desde</span>
                      <span className="text-2xl font-black text-slate-900">${minPrice}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/tours/${tour.id}`} className="absolute inset-0 z-10" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tours;
