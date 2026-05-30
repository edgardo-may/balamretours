import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/tours';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 bg-noche-950 overflow-hidden relative">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-cenote-700/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-tierra-700/8 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-5 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-eyebrow text-cenote-400 mb-3 block">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Lo que dicen nuestros{" "}
            <span className="text-cenote-300">viajeros</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className="relative flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:bg-white/8 hover:border-cenote-400/20 transition-all duration-300"
            >
              {/* Quote decoration */}
              <Quote className="absolute top-5 right-6 w-10 h-10 text-white/6" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/75 text-base leading-relaxed mb-7 flex-grow italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3.5 mt-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cenote-500/30"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-cenote-400 text-xs font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <p className="text-noche-400 text-sm font-medium mb-6">
            Más de <span className="text-cenote-400 font-bold">500 reseñas de 5 estrellas</span> en plataformas globales
          </p>
          <div className="flex justify-center items-center gap-10 opacity-35 hover:opacity-60 transition-opacity">
            {["TripAdvisor", "Google", "Viator", "Booking"].map((platform) => (
              <span key={platform} className="text-white text-base font-black tracking-tight">
                {platform}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
