// src/components/TestimonialsCarousel.tsx
import React, { useState, useEffect } from 'react';
import { TestimonialCard } from '../TestimonialCard';
import type { Testimonial } from '../../types/index';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    location: "New York, USA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmBbntlZGj7IyqfmpI7D6xQ5SSurHVXwD6E8-Ue0tQwBP1wTRMXcWuEO5W1ra6NYOHS9Nd6GrdO9yhDpcBsSV4NFZYC_aD_f4A_lUeh8Ya7no7UyHVTZmOpG6bzhBntV0rLp1QtczivywSfW7uB32bKzRoA-iwPoAQx7867cgW1LRDYuQAu_0Mvo8R_Zt5J9tISghlN9kbhQPL8r7EbPGwaKc_QY21oIQlSvNwFDGcwl16hG6PlkUBSoNnV3Fb8Qb7OwZp-0J5JcT",
    rating: 5,
    comment: "It wasn't just a tour; it was a spiritual journey. The cenote swim was unlike anything I've ever experienced on Earth. Truly magical."
  },
  {
    id: 2,
    name: "Carlos R.",
    location: "Mexico City, Mexico",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment: "Excelente guía y lugares espectaculares. Muy recomendable."
  },
  {
    id: 3,
    name: "Linda K.",
    location: "London, UK",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "Una experiencia inolvidable, los cenotes y ruinas fueron impresionantes."
  },
  {
    id: 4,
    name: "Miguel T.",
    location: "Madrid, Spain",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    comment: "Me encantó todo, especialmente los guías y la organización del tour."
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotación cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-background-light relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
        <span className="material-symbols-outlined text-6xl text-primary/30 mb-6 block">
          format_quote
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-[#181411] mb-4">
          Lo que dicen nuestros viajeros
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          Experiencias reales de personas que vivieron nuestros tours y descubrieron algo más que un viaje.
        </p>

        {/* Testimonial */}
        <div className="relative max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
