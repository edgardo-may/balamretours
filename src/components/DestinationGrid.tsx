// src/components/AnimatedDestinationsGrid.tsx
import React, { useEffect, useRef, useState } from 'react';
import { DestinationCard } from './DestinationCard';
import type { Destination } from '../types/index';
import { FaPlane } from 'react-icons/fa';

interface DestinationsGridProps {
  destinations: Destination[];
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({ destinations }) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 100); // Delay escalonado
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = gridRef.current?.querySelectorAll('[data-index]');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            data-index={index}
            className={`transform transition-all duration-700 ease-out ${
              visibleCards.includes(index)
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <DestinationCard destination={destination} />
          </div>
        ))}
      </div>
      
      {/* Elemento decorativo animado */}
      <div className="relative mt-16">
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
          <FaPlane className="text-blue-200 text-6xl animate-bounce" />
        </div>
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
          <FaPlane className="text-blue-200 text-6xl animate-bounce" style={{ animationDelay: '500ms' }} />
        </div>
      </div>
    </div>
  );
};