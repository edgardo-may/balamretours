import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero2.jpg"
          className="w-full h-full object-cover"
          alt="Riviera Maya"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-noche-950/90 via-cenote-950/80 to-noche-950/85" />
      </div>

      <div className="container mx-auto px-5 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Rating row */}
          <div className="flex items-center justify-center gap-2 mb-7">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-medium">+500 viajeros satisfechos</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Tu próxima aventura empieza{" "}
            <span className="text-cenote-300">hoy.</span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-xl mx-auto leading-relaxed">
            No dejes para mañana lo que puedes vivir este fin de semana.
            Reserva ahora y asegura tu lugar.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => navigate("/tours")}
              className="btn-reserva text-base px-9 py-4 group"
            >
              Reservar Mi Lugar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Micro trust notes */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">
            {[
              "Sin cargo por cancelación anticipada",
              "Confirmación inmediata",
              "Transporte incluido",
            ].map((note) => (
              <span key={note} className="text-white/50 text-xs font-medium flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-cenote-400 inline-block" />
                {note}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
