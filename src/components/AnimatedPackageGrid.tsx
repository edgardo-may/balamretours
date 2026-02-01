// src/components/AnimatedPackagesGrid.tsx
import React, { useState } from 'react';
import { PackageCard } from './PackageCard';
import type { Package } from '../types/index';
import { FaStar, FaGift, FaRocket } from 'react-icons/fa';

interface AnimatedPackagesGridProps {
  packages: Package[];
}

export const AnimatedPackagesGrid: React.FC<AnimatedPackagesGridProps> = ({ packages }) => {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Elementos decorativos flotantes */}
      <div className="absolute -top-8 left-1/4 animate-float">
        <FaStar className="text-yellow-300 text-3xl" />
      </div>
      <div className="absolute -top-4 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <FaGift className="text-blue-300 text-3xl" />
      </div>
      <div className="absolute top-12 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
        <FaRocket className="text-purple-300 text-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className={`transition-all duration-500 ${
              hoveredPackage === pkg.id
                ? 'transform scale-105'
                : hoveredPackage !== null
                ? 'opacity-75 transform scale-95'
                : ''
            }`}
            onMouseEnter={() => setHoveredPackage(pkg.id)}
            onMouseLeave={() => setHoveredPackage(null)}
            style={{
              transitionDelay: `${index * 100}ms`,
              animation: `fadeInUp 0.8s ease-out ${index * 100}ms both`
            }}
          >
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>
    </div>
  );
};