import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import type { Variants } from "framer-motion"; 
import StatsSection from "../Sections/StatSection";
import PyramidIcon from "../Ui/PiramidIcon";
import CenoteIcon from "../Ui/CenoteIcon";

// Interface para los puntos del mapa
interface MapPoint {
  id: number;
  name: string;
  type: "pyramid" | "cenote" | "city";
  x: number; // Porcentaje horizontal (0-100)
  y: number; // Porcentaje vertical (0-100)
  description: string;
  color: string;
}

const MapStats: React.FC = () => {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const mapPoints: MapPoint[] = [
    {
      id: 1,
      name: "Chichen Itza",
      type: "pyramid",
      x: 60,
      y: 35,
      description:
        "Maravilla del Mundo, famosa por El Castillo y el juego de pelota",
      color: "#ec6d13",
    },
    {
      id: 2,
      name: "Tulum",
      type: "pyramid",
      x: 83,
      y: 38,
      description: "Ciudad amurallada frente al mar Caribe",
      color: "#ec6d13",
    },
    {
      id: 3,
      name: "Cobá",
      type: "pyramid",
      x: 75,
      y: 35,
      description: "Ciudad entre lagos con la pirámide de Nohoch Mul",
      color: "#ec6d13",
    },
    {
      id: 4,
      name: "Ek Balam",
      type: "pyramid",
      x: 68,
      y: 30,
      description: "Acrópolis con estuco perfectamente conservado",
      color: "#ec6d13",
    },
    {
      id: 5,
      name: "Uxmal",
      type: "pyramid",
      x: 51,
      y: 40,
      description: "Arquitectura Puuc, famosa por la Pirámide del Adivino",
      color: "#ec6d13",
    },
    {
      id: 6,
      name: "Ik Kil",
      type: "cenote",
      x: 54,
      y: 41,
      description: "Cenote sagrado abierto con cascadas naturales",
      color: "#00f7ff",
    },
    {
      id: 7,
      name: "Gran Cenote",
      type: "cenote",
      x: 80,
      y: 38,
      description: "Sistema de cuevas subacuáticas para buceo",
      color: "#00f7ff",
    },
    {
      id: 8,
      name: "Cenote Azul",
      type: "cenote",
      x: 86,
      y: 35,
      description: "Cenote abierto ideal para snorkel y familias",
      color: "#00f7ff",
    },
  ];

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePointClick = (id: number) => {
    setActivePoint(activePoint === id ? null : id);
  };

  const getPointIcon = (type: string, color: string) => {
    switch (type) {
      case "pyramid":
        return <PyramidIcon size="sm" color={color} />;
      case "cenote":
        return <CenoteIcon size="sm" color={color} />;
      default:
        return <div className="w-3 h-3 rounded-full bg-white"></div>;
    }
  };

  const isRightSide = (x: number) => x > 67;

  // Variants tipados correctamente
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const mapContainerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 1, ease: easeOut }, // ✅ corregido
    },
  };

  const pointVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: easeOut },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-24 bg-secondary text-white relative z-5 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda - Texto y estadísticas */}
          <motion.div variants={containerVariants}>
            <motion.h2
              variants={titleVariants}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Explorando el corazón del mundo maya
            </motion.h2>
            <motion.p
              variants={containerVariants}
              className="text-lg text-gray-300 mb-12 font-light leading-relaxed"
            >
              Nuestros recorridos se centran en la Península de Yucatán, una
              región llena de historia y fenómenos naturales.
            </motion.p>
            <motion.div variants={containerVariants}>
              <StatsSection />
            </motion.div>
          </motion.div>

          {/* Columna derecha - Mapa interactivo */}
          <motion.div
            variants={mapContainerVariants}
            style={{ transformPerspective: 1000 }} // ✅ efecto 3D
            className="relative bg-white/5 rounded-3xl p-6 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <motion.div
              variants={containerVariants}
              className="text-center mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Península de Yucatán
              </h3>
              <p className="text-sm text-gray-400">
                Haz clic en los iconos para descubrir los sitios arqueológicos y
                cenotes
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="aspect-square w-full rounded-2xl bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-emerald-900/10"></div>
              <img
                src="/Maps/Peninsula_de_Yucatan.svg"
                alt="Silueta de la Península de Yucatán"
                className="absolute inset-0 w-full h-full object-contain opacity-70"
              />

              {/* Puntos interactivos */}
              <AnimatePresence>
                {mapPoints.map((point, index) => (
                  <motion.div
                    key={point.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={pointVariants}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    onClick={() => handlePointClick(point.id)}
                    title={point.name}
                  >
                    {activePoint === point.id && (
                      <div className="absolute inset-0 animate-ping opacity-50">
                        {getPointIcon(point.type, point.color)}
                      </div>
                    )}
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getPointIcon(point.type, point.color)}
                    </motion.div>
                    {activePoint === point.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`absolute mt-2 min-w-[200px] bg-white text-black text-sm rounded-xl shadow-2xl p-4 z-50 ${
                          isRightSide(point.x)
                            ? "right-full mr-3"
                            : "left-1/2 -translate-x-1/2"
                        }`}
                      >
                        <div className="font-bold text-primary mb-2">
                          {point.name}
                        </div>
                        <div className="text-gray-600 text-xs leading-relaxed mb-3">
                          {point.description}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="material-symbols-outlined text-sm">
                            {point.type === "pyramid" ? "history_edu" : "water"}
                          </span>
                          <span className="capitalize">
                            {point.type === "pyramid"
                              ? "Ruina Maya"
                              : "Cenote Sagrado"}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MapStats;
