import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Map, CreditCard, Star } from "lucide-react";

const benefits = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-cenote-600" />,
    title: "Guías Certificados",
    description:
      "Expertos locales apasionados con años de experiencia en historia maya, flora y fauna.",
    stat: "15+ años",
  },
  {
    icon: <Users className="w-6 h-6 text-cenote-600" />,
    title: "Grupos Pequeños",
    description:
      "Grupos reducidos para asegurar atención personalizada y la mejor experiencia posible.",
    stat: "Máx. 15 pers.",
  },
  {
    icon: <Map className="w-6 h-6 text-cenote-600" />,
    title: "Transporte Incluido",
    description:
      "Recogida desde tu hotel en Playa del Carmen, Tulum o Cancun. Sin preocupaciones extra.",
    stat: "Pickup incluido",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-cenote-600" />,
    title: "Pago Seguro",
    description:
      "Reserva con total seguridad. Anticipo mínimo y pago del resto el día del tour.",
    stat: "Anticipo 30%",
  },
];

const Benefits: React.FC = () => {
  return (
    <section
      id="beneficios"
      className="py-12 md:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: copy + benefits grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-eyebrow mb-3 block">
                ¿Por qué Balam RE?
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-noche-900 leading-tight mb-5">
                Tu aventura merece ser{" "}
                <span className="text-cenote-600">perfecta.</span>
              </h2>
              <p className="text-noche-500 text-lg leading-relaxed mb-8 md:mb-12 max-w-lg">
                No somos solo una agencia de tours. Somos tus anfitriones en el
                paraíso, comprometidos con la calidad, la seguridad y la
                autenticidad.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    delay: 0.1 + index * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="group p-5 rounded-2xl border border-caliza-200 bg-caliza-50 hover:border-cenote-200 hover:bg-cenote-50/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-noche-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-noche-500 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                      <span className="mt-2 inline-block text-2xs font-bold uppercase tracking-widest text-cenote-600 bg-cenote-50 border border-cenote-100 px-2.5 py-1 rounded-full">
                        {benefit.stat}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: image + stats overlay */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200"
                alt="Viajeros felices en tour Balam RE"
                className="w-full h-[540px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noche-950/30 to-transparent rounded-3xl" />
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: -10 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-caliza-200 hidden md:block"
            >
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-cenote-600">
                    10k+
                  </div>
                  <div className="text-2xs font-bold uppercase tracking-widest text-noche-400 mt-0.5">
                    Clientes
                  </div>
                </div>
                <div className="w-px h-10 bg-caliza-200" />
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-cenote-600">
                    15+
                  </div>
                  <div className="text-2xs font-bold uppercase tracking-widest text-noche-400 mt-0.5">
                    Años Exp.
                  </div>
                </div>
                <div className="w-px h-10 bg-caliza-200" />
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <span className="text-3xl font-extrabold text-amber-500">
                      5.0
                    </span>
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400 mt-0.5" />
                  </div>
                  <div className="text-2xs font-bold uppercase tracking-widest text-noche-400 mt-0.5">
                    Rating
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="absolute top-6 -right-4 bg-cenote-600 text-white px-4 py-3 rounded-2xl shadow-lg hidden md:flex flex-col items-center"
            >
              <ShieldCheck className="w-6 h-6 mb-1" />
              <span className="text-2xs font-bold uppercase tracking-wider text-center leading-tight">
                100%
                <br />
                Certificados
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
