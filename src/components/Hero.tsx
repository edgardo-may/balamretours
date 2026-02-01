// src/components/Hero.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface HeroProps {
  onOpenContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative">
      {/* Fondo con gradiente y imagen */}
      <div 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Descubre el mundo con nuestras experiencias únicas
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Ofrecemos los mejores paquetes turísticos a destinos exóticos alrededor del globo. 
              Vive aventuras inolvidables con nuestra agencia especializada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Planificar mi viaje
              </button>
              <a
                href="/destinos"
                className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Explorar destinos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Búsqueda rápida */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Encuentra tu próximo destino</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Destino</label>
              <input
                type="text"
                placeholder="¿A dónde quieres ir?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Fecha de salida</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Duración</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Todos</option>
                <option>1-3 días</option>
                <option>4-7 días</option>
                <option>8-14 días</option>
                <option>15+ días</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors">
                Buscar viajes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;