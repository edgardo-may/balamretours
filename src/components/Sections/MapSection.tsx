import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import { mapLocations } from "../../data/mapLocations";
import { AnimatedCounter } from "../animations/AnimatedCounter";
import { useInView } from "../../hooks/useInView";

// Fix for default marker icons in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const cenoteIcon = new L.Icon({
  iconUrl: "/images/cenote.png",
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -45],
  className: "drop-shadow-lg",
});

const archIcon = new L.Icon({
  iconUrl: "/images/piramide.png",
  iconSize: [90, 90],
  iconAnchor: [45, 90],
  popupAnchor: [0, -90],
  className: "drop-shadow-lg",
});

const MapSection: React.FC = () => {
  const [inViewRef, inView] = useInView<HTMLElement>({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="explorar"
      ref={inViewRef}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3"
          >
            Explora la Región
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
          >
            Tu Próximo Destino está en el{" "}
            <span className="text-teal-600">Mapa</span>
          </motion.h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center p-6"
          >
            <div className="text-4xl md:text-5xl font-black text-teal-600 mb-2">
              <AnimatedCounter end={500} prefix="+" />
            </div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">
              Clientes Felices
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center p-6"
          >
            <div className="text-4xl md:text-5xl font-black text-teal-600 mb-2">
              <AnimatedCounter end={120} prefix="+" />
            </div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">
              Tours Realizados
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center p-6"
          >
            <div className="text-4xl md:text-5xl font-black text-teal-600 mb-2">
              <AnimatedCounter end={15} prefix="+" />
            </div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">
              Destinos Únicos
            </div>
          </motion.div>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-[600px] w-full relative shadow-2xl rounded-[2.5rem] overflow-hidden bg-slate-100"
        >
          {!inView ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <MapContainer
              center={[20.5, -87.8]}
              zoom={9}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapLocations.map((loc) => (
                <Marker
                  key={loc.id}
                  position={[loc.lat, loc.lng]}
                  icon={loc.type === "cenote" ? cenoteIcon : archIcon}
                >
                  <Popup>
                    <div className="group overflow-hidden">
                      <img
                        src={loc.image}
                        alt={loc.name}
                        className="w-full h-32 object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-slate-900 mb-1">
                          {loc.name}
                        </h4>
                        <p className="text-sm text-slate-500 leading-snug">
                          {loc.description}
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
