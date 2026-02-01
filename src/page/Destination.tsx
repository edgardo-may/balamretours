// src/pages/Destinations.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DestinationCard } from '../components/DestinationCard';
import ContactForm from '../components/ContactForm';
import type { Destination } from '../types';

const Destinations: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const destinations: Destination[] = [
    {
      id: 1,
      name: 'Maldivas',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Paraíso tropical con aguas cristalinas',
      price: '$2,499',
      duration: '7 días',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Santorini',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Isla griega con vistas espectaculares',
      price: '$1,899',
      duration: '5 días',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Kyoto',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Cultura tradicional japonesa',
      price: '$3,199',
      duration: '10 días',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Machu Picchu',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Maravilla del mundo inca',
      price: '$1,599',
      duration: '6 días',
      rating: 4.9
    },
    {
      id: 5,
      name: 'París',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'La ciudad del amor y la luz',
      price: '$1,799',
      duration: '5 días',
      rating: 4.8
    },
    {
      id: 6,
      name: 'Nueva York',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'La ciudad que nunca duerme',
      price: '$2,199',
      duration: '6 días',
      rating: 4.7
    }
  ];

  const categories = ['todos', 'playa', 'montaña', 'ciudad', 'cultural'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenContact={() => setContactModalOpen(true)} />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Destinos</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explora nuestra amplia selección de destinos alrededor del mundo. 
              Desde playas paradisíacas hasta ciudades vibrantes.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Grid de destinos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          {/* Información adicional */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">¿No encuentras tu destino ideal?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Contáctanos y crearemos un itinerario personalizado para ti. 
                Tenemos acceso a más de 100 destinos adicionales.
              </p>
              <button
                onClick={() => setContactModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Solicitar destino personalizado
              </button>
            </div>
          </div>
        </div>
      </main>

      <ContactForm 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
      <Footer />
    </div>
  );
};

export default Destinations;