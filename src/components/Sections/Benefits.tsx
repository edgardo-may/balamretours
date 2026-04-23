import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Map, Heart } from 'lucide-react';

const benefits = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
    title: 'Seguridad Total',
    description: 'Equipos certificados y seguros de viaje incluidos en cada una de nuestras experiencias.'
  },
  {
    icon: <Users className="w-8 h-8 text-teal-600" />,
    title: 'Guías Expertos',
    description: 'Nuestros guías son locales apasionados con años de experiencia en historia y naturaleza.'
  },
  {
    icon: <Map className="w-8 h-8 text-teal-600" />,
    title: 'Tours Exclusivos',
    description: 'Evitamos las multitudes. Te llevamos a lugares vírgenes y poco explorados.'
  },
  {
    icon: <Heart className="w-8 h-8 text-teal-600" />,
    title: 'Atención Personalizada',
    description: 'Grupos pequeños para asegurar que cada viajero reciba la mejor experiencia posible.'
  }
];

const Benefits: React.FC = () => {
  return (
    <section id="beneficios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">¿Por qué Balam RE?</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
              Tu Aventura Merece ser Perfecta.
            </h3>
            <p className="text-xl text-slate-500 mb-12">
              No somos solo una agencia de tours. Somos tus anfitriones en el paraíso, comprometidos con la calidad y la autenticidad en cada paso del camino.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 + (index * 0.1), ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200" 
                alt="Happy Travelers"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Stats Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 hidden md:block"
            >
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-black text-teal-600">10k+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clientes Felices</div>
                </div>
                <div className="w-px bg-slate-100" />
                <div>
                  <div className="text-3xl font-black text-teal-600">15+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Años Exp.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
