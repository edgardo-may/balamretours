// src/components/TourDetailCard.tsx
import React from 'react';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaCheck } from 'react-icons/fa';
import type { Destination } from '../types/index';
import { Link } from 'react-router-dom';

interface TourDetailCardProps {
  tour: Destination;
  showFullDetails?: boolean;
}

export const TourDetailCard: React.FC<TourDetailCardProps> = ({ tour, showFullDetails = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden h-48">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
          {tour.price}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{tour.name}</h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="font-semibold">{tour.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{tour.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2" />
            <span>{tour.duration}</span>
          </div>
          {showFullDetails ? (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors hover:bg-blue-700">
              Reservar Ahora
            </button>
          ) : (
            <Link 
              to={`/tours/${tour.id}`}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Ver detalles
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetailCard;