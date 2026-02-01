// src/components/AnimatedHero.tsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface AnimatedHeroProps {
  onOpenContact: () => void;
}

// Imágenes para el carrusel
const heroImages = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
];

// Textos animados para el hero
const heroTitles = [
  'Descubre el mundo con nuestras experiencias únicas',
  'Vive aventuras inolvidables en cada rincón del planeta',
  'Transforma tus sueños en recuerdos eternos',
  'Explora, descubre, vive: Tu viaje perfecto comienza aquí'
];

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({ onOpenContact }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Cambio automático de imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setTitleIndex((prev) => (prev + 1) % heroTitles.length);
        setFadeIn(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      setTitleIndex((prev) => (prev + 1) % heroTitles.length);
      setFadeIn(true);
    }, 500);
  };

  const prevImage = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      setTitleIndex((prev) => (prev - 1 + heroTitles.length) % heroTitles.length);
      setFadeIn(true);
    }, 500);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Carrusel de imágenes con transición */}
      <div className="relative h-[600px] md:h-[700px] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
              index === currentImageIndex
                ? 'opacity-100 transform scale-105'
                : 'opacity-0 transform scale-100'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`,
              transition: 'opacity 1s ease-in-out, transform 10s ease-in-out'
            }}
          />
        ))}

        {/* Contenido animado */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className={`max-w-2xl transition-all duration-1000 ${
              fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Título con efecto de escritura */}
              <div className="overflow-hidden">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  <span className="inline-block animate-slideUp">
                    {heroTitles[titleIndex]}
                  </span>
                </h1>
              </div>
              
              {/* Subtítulo con efecto fade */}
              <div className={`transition-opacity duration-1000 delay-300 ${
                fadeIn ? 'opacity-90' : 'opacity-0'
              }`}>
                <p className="text-xl md:text-2xl text-white mb-8">
                  Ofrecemos los mejores paquetes turísticos a destinos exóticos alrededor del globo. 
                  Vive aventuras inolvidables con nuestra agencia especializada.
                </p>
              </div>

              {/* Botones con animación escalonada */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenContact}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-slideUp delay-500"
                  style={{ animationDelay: '500ms' }}
                >
                  Planificar mi viaje
                </button>
                <a
                  href="#destinos"
                  className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-slideUp delay-700 flex items-center justify-center"
                  style={{ animationDelay: '700ms' }}
                >
                  <FaSearch className="mr-2 animate-pulse" />
                  Explorar destinos
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Controles del carrusel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setFadeIn(false);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setTitleIndex(index);
                  setFadeIn(true);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Imagen anterior"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Siguiente imagen"
        >
          <FaChevronRight className="text-2xl" />
        </button>
      </div>

      {/* Indicador de imagen actual */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentImageIndex + 1} / {heroImages.length}
      </div>

      {/* Búsqueda rápida con animación */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 transform transition-all duration-700 hover:shadow-3xl animate-slideUp delay-1000">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 animate-pulse">
            ✈️ Encuentra tu próximo destino
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="animate-slideRight" style={{ animationDelay: '100ms' }}>
              <label className="block text-gray-700 mb-2">Destino</label>
              <input
                type="text"
                placeholder="¿A dónde quieres ir?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="animate-slideRight" style={{ animationDelay: '200ms' }}>
              <label className="block text-gray-700 mb-2">Fecha de salida</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="animate-slideRight" style={{ animationDelay: '300ms' }}>
              <label className="block text-gray-700 mb-2">Duración</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-105">
                <option>Todos</option>
                <option>1-3 días</option>
                <option>4-7 días</option>
                <option>8-14 días</option>
                <option>15+ días</option>
              </select>
            </div>
            <div className="flex items-end animate-slideRight" style={{ animationDelay: '400ms' }}>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group">
                <FaSearch className="mr-2 group-hover:animate-spin" />
                Buscar viajes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};