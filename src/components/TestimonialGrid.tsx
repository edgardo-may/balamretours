// src/components/AnimatedTestimonialsGrid.tsx
import React, { useEffect, useRef, useState } from 'react';
import { TestimonialCard } from './TestimonialCard';
import type { Testimonial } from '../types/index';

interface TestimonialsGrid {
  testimonials: Testimonial[];
}

export const TestimonialsGrid: React.FC<{ testimonials?: Testimonial[] }> = ({ testimonials = [] }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = containerRef.current?.querySelectorAll('[data-index]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Fondo decorativo animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            data-index={index}
            className={`transition-all duration-1000 ease-out ${
              visibleItems.includes(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
};