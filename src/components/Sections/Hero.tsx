import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaArrowDown } from 'react-icons/fa';

const Hero: React.FC = () => {
  // Estado para el carrusel de imágenes
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 para izquierda, 1 para derecha, 0 para inicial
  
  // Imágenes para el carrusel
  const heroImages = [
    {
      url: 'src/assets/images/hero1.jpg',
    },
    {
      url: 'src/assets/images/hero2.jpg',
    },
    {
      url: 'src/assets/images/hero3.jpg',
    },
    {
      url: 'src/assets/images/hero4.jpg',
    }
  ];

  // Funciones para navegar el carrusel
  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [heroImages.length]);

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  // Ir a una imagen específica
  const goToImage = (index: number) => {
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  // Efecto para cambiar automáticamente las imágenes del carrusel
  useEffect(() => {
    const imageInterval = setInterval(() => {
      nextImage();
    }, 5000); // Cambia cada 5 segundos
    
    return () => clearInterval(imageInterval);
  }, [nextImage]);

  // Variantes de animación para Framer Motion
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8
      }
    })
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };


  return (
    <header className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden z-10">
      {/* Carrusel de imágenes de fondo con Framer Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${heroImages[currentImageIndex].url}')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>
          </motion.div>
        </AnimatePresence>
        
        {/* Indicadores del carrusel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-10' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Controles del carrusel */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-4 rounded-full transition-all duration-300 group"
          aria-label="Imagen anterior"
        >
          <FaChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-4 rounded-full transition-all duration-300 group"
          aria-label="Siguiente imagen"
        >
          <FaChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </button>
        
        {/* Título de la imagen actual */}
        <motion.div 
          key={`title-${currentImageIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-32 left-8 z-20 text-white max-w-md"
        >
        </motion.div>
      </div>
      
      {/* Contenido principal con animaciones */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl pt-20">
        <motion.h1 
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-7xl font-bold leading-none tracking-tighter mb-6 drop-shadow-lg"
        >
          Descubre el mundo con nuestras <span className="text-primary italic">experiencias</span>.
        </motion.h1>
        
        <motion.h1 
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-6xl font-bold leading-none tracking-tighter mb-8 drop-shadow-lg"
        >
          únicas.
        </motion.h1>
        
        <motion.p 
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 text-white/90"
        >
          Excursiones arqueológicas exclusivas e inmersiones privadas en cenotes en el corazón de la Península de Yucatán.
        </motion.p>
        
        <motion.div 
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-white text-primary hover:bg-gray-100 transition-colors px-8 py-4 rounded-full font-bold text-lg tracking-wide inline-flex items-center gap-3 shadow-lg"
          >
            Explorar Tours
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaArrowDown className="w-5 h-5" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;