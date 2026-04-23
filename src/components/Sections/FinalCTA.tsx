import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Ui/Button';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero2.jpg" 
          className="w-full h-full object-cover"
          alt="Adventure Background"
        />
        <div className="absolute inset-0 bg-teal-900/90 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Listo para empezar tu próxima gran historia?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            No dejes tu aventura para mañana. Reserva hoy mismo y asegura tu lugar en las mejores experiencias de la Riviera Maya.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-teal-600 hover:text-white shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reservar Mi Lugar
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open('https://wa.me/5219840000000', '_blank')}
            >
              Hablar con un Experto
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
