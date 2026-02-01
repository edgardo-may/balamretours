// src/components/DestinationCard.tsx
import React from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import type { Destination } from '../types/index';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden h-48">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
          {destination.price}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{destination.name}</h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="font-semibold">{destination.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{destination.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2" />
            <span>{destination.duration}</span>
          </div>
          <Link 
          to={`/tours/${destination.id}`}
          className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Ver detalles
        </Link>
        </div>
      </div>
    </div>
  );
};