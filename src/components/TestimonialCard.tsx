// src/components/TestimonialCard.tsx
import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import type { Testimonial } from '../types/index';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
          <p className="text-gray-600 text-sm">{testimonial.location}</p>
          <div className="flex mt-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <FaQuoteLeft className="text-blue-100 text-3xl absolute -top-2 -left-2" />
        <p className="text-gray-700 italic relative z-10">{testimonial.comment}</p>
      </div>
    </div>
  );
};