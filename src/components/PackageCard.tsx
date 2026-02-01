// src/components/PackageCard.tsx
import React from 'react';
import { FaCheck, FaCalendarAlt } from 'react-icons/fa';
import type { Package } from '../types/index';

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  return (
    <div className={`relative rounded-xl shadow-lg overflow-hidden ${
      pkg.popular
        ? 'border-2 border-blue-500 transform scale-105'
        : 'border border-gray-200'
    }`}>
      {pkg.popular && (
        <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 font-bold">
          MÁS POPULAR
        </div>
      )}
      
      <div className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
          <div className="flex items-center justify-center text-gray-600 mb-2">
            <FaCalendarAlt className="mr-2" />
            <span>{pkg.duration}</span>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">{pkg.price}</div>
          <p className="text-gray-600">{pkg.description}</p>
        </div>
        
        <ul className="space-y-3 mb-8">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <FaCheck className="text-green-500 mr-3" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            pkg.popular
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          Seleccionar Paquete
        </button>
      </div>
    </div>
  );
};