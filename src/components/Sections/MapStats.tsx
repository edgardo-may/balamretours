import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  // Estado para el punto activo
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Puntos del mapa con ubicaciones aproximadas de la península de Yucatán
  const mapPoints: MapPoint[] = [
    {
      id: 1,
      name: "Chichen Itza",
      type: "pyramid",
      x: 60, // Centro-norte de Yucatán
      y: 35,
      description:
        "Maravilla del Mundo, famosa por El Castillo y el juego de pelota",
      color: "#ec6d13", // primary
    },
    {
      id: 2,
      name: "Tulum",
      type: "pyramid",
      x: 83, // Costa este, en Quintana Roo
      y: 38,
      description: "Ciudad amurallada frente al mar Caribe",
      color: "#ec6d13",
    },
    {
      id: 3,
      name: "Cobá",
      type: "pyramid",
      x: 75, // Interior de Quintana Roo
      y: 35,
      description: "Ciudad entre lagos con la pirámide de Nohoch Mul",
      color: "#ec6d13",
    },
    {
      id: 4,
      name: "Ek Balam",
      type: "pyramid",
      x: 68, // Norte de Yucatán, cerca de Valladolid
      y: 30,
      description: "Acrópolis con estuco perfectamente conservado",
      color: "#ec6d13",
    },
    {
      id: 5,
      name: "Uxmal",
      type: "pyramid",
      x: 51, // Oeste de Yucatán
      y: 40,
      description: "Arquitectura Puuc, famosa por la Pirámide del Adivino",
      color: "#ec6d13",
    },
    {
      id: 6,
      name: "Ik Kil",
      type: "cenote",
      x: 54, // Cerca de Chichen Itza
      y: 41,
      description: "Cenote sagrado abierto con cascadas naturales",
      color: "#00f7ff", // secondary
    },
    {
      id: 7,
      name: "Gran Cenote",
      type: "cenote",
      x: 80, // Cerca de Tulum
      y: 38,
      description: "Sistema de cuevas subacuáticas para buceo",
      color: "#00f7ff",
    },
    {
      id: 8,
      name: "Cenote Azul",
      type: "cenote",
      x: 86, // Sur de Quintana Roo
      y: 35,
      description: "Cenote abierto ideal para snorkel y familias",
      color: "#00f7ff",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
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

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOutCubic",
      },
    },
  };

  const mapContainerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: "easeInOutCubic",
      },
    },
  };

  const pointVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeInOutCubic",
      },
    },
  };

  const isRightSide = (x: number) => x > 67;

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
              región llena de historia y fenómenos naturales. Te llevamos fuera
              de los caminos habituales a lugares que la mayoría de los turistas
              nunca ve.
            </motion.p>

            <motion.div variants={containerVariants}>
              <StatsSection />
            </motion.div>

            {/* Sección "Mapa Interactivo" y "Explorar Rutas" cerca del texto */}
            <motion.div
              variants={containerVariants}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">
                      map
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Mapa Interactivo</h4>
                    <p className="text-gray-400 text-sm">
                      Explora todas nuestras ubicaciones
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <PyramidIcon size="sm" color="#ec6d13" />
                    <span className="font-medium">Ruinas Mayas</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    5 sitios arqueológicos principales
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CenoteIcon size="sm" color="#00f7ff" />
                    <span className="font-medium">Cenotes Sagrados</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    3 cenotes icónicos para explorar
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna derecha - Mapa interactivo */}
          <motion.div
            variants={mapContainerVariants}
            className="relative bg-white/5 rounded-3xl p-6 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            {/* Encabezado del mapa */}
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

            {/* Contenedor del mapa */}
            <motion.div
              variants={containerVariants}
              className="aspect-square w-full rounded-2xl bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden border border-white/10"
            >
              {/* Efecto de fondo sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-emerald-900/10"></div>

              {/* Silueta de la península */}
              <img
                src="/Maps/Peninsula_de_Yucatan.svg"
                alt="Silueta de la Península de Yucatán"
                className="absolute inset-0 w-full h-full object-contain opacity-70"
              />

              {/* Puntos interactivos con animación escalonada */}
              <AnimatePresence>
                {mapPoints.map((point, index) => (
                  <motion.div
                    key={point.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={pointVariants}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10`}
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                    }}
                    onClick={() => handlePointClick(point.id)}
                    title={point.name}
                  >
                    {/* Efecto de pulso para el punto activo */}
                    {activePoint === point.id && (
                      <div className="absolute inset-0 animate-ping opacity-50">
                        {getPointIcon(point.type, point.color)}
                      </div>
                    )}

                    {/* Icono principal */}
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getPointIcon(point.type, point.color)}
                    </motion.div>

                    {/* Tooltip/Información */}
                    <AnimatePresence>
                      {activePoint === point.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className={`absolute mt-2 min-w-[200px] bg-white text-black text-sm rounded-xl shadow-2xl p-4 z-50
                          ${isRightSide(point.x) ? "right-full mr-3" : "left-1/2 -translate-x-1/2"}
                        `}
                        >
                          <div className="font-bold text-primary mb-2">
                            {point.name}
                          </div>
                          <div className="text-gray-600 text-xs leading-relaxed mb-3">
                            {point.description}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="material-symbols-outlined text-sm">
                              {point.type === "pyramid"
                                ? "history_edu"
                                : "water"}
                            </span>
                            <span className="capitalize">
                              {point.type === "pyramid"
                                ? "Ruina Maya"
                                : "Cenote Sagrado"}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pie del mapa */}
            <motion.div
              variants={containerVariants}
              className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-gray-400"
            >
              <div className="text-xs text-white/80 text-center -translate-y-5">
                <span className="material-symbols-outlined text-sm mr-1">
                  info
                </span>
                Haz clic en cualquier icono para más información
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MapStats;
