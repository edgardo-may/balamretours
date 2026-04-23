import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/tours';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 bg-slate-950 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-3">Testimonios</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Lo que dicen nuestros viajeros
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[2rem] flex flex-col h-full relative group"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/10 group-hover:text-teal-400/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-white/80 text-lg italic mb-8 flex-grow">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-teal-500/30"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-teal-400 text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-white/60 font-medium mb-6">Más de 500 reseñas de 5 estrellas en plataformas globales</p>
          <div className="flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
            {/* Simple representation of review site logos */}
            <span className="text-white text-xl font-black">TripAdvisor</span>
            <span className="text-white text-xl font-black">Google</span>
            <span className="text-white text-xl font-black">Viator</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
