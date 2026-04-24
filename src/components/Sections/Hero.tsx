import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Button from "../Ui/Button";

const Hero: FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent z-10" />

      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero1.jpg"
          alt="Balam RE Tours Riviera Maya"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-white/90 text-sm font-bold tracking-wider uppercase">
                La mejor experiencia en Riviera Maya
              </span>
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6"
            >
              Vive la <span className="text-teal-400">Aventura</span> de tu
              Vida.
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-2xl"
            >
              Explora cenotes cristalinos, ciudades mayas milenarias y la selva
              virgen con guías certificados.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group text-white"
                onClick={() => navigate('/tours')}
              >
                Explorar Tours
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
