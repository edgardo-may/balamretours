// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { AnimatedHero } from '../components/AnimatedHero';
import { DestinationsGrid } from '../components/DestinationGrid';
import { AnimatedPackagesGrid } from '../components/AnimatedPackageGrid';
import { TestimonialsGrid } from '../components/TestimonialGrid';
import Footer from '../components/Footer';
import type { Destination, Package, Testimonial } from '../types/index';
import { FaPlane, FaGift, FaStar, FaAward } from 'react-icons/fa';

const Home: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header onOpenContact={() => setContactModalOpen(true)} />
      <AnimatedHero onOpenContact={() => setContactModalOpen(true)} />

      {/* Modal de contacto con animación */}
      {contactModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-500 scale-100 animate-slideUp">
            <h3 className="text-2xl font-bold mb-4 text-gradient">Contacto</h3>
            <p className="mb-6 text-gray-600">¿Necesitas ayuda para planificar tu viaje?</p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Tu nombre" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              />
              <input 
                type="email" 
                placeholder="Tu email" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              />
              <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-105">
                <option>Selecciona un paquete</option>
                <option>Básico</option>
                <option>Estándar</option>
                <option>Premium</option>
              </select>
              <textarea 
                placeholder="Tu mensaje" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-105"
                rows={4}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setContactModalOpen(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
                  setContactModalOpen(false);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;