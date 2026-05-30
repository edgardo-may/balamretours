import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  HeartPulse,
  Compass,
  Waves,
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Info,
  Scale,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../components/Sections/Navbar';
import Footer from '../components/Sections/Footer';
import FloatingWhatsApp from '../components/Ui/FloatingWhatsApp';

// ─── Intent ──────────────────────────────────────────────────────────────────
// Who: Cliente que está evaluando si puede hacer la actividad o que tuvo una
//      mala experiencia y busca entender las limitaciones de responsabilidad.
// What: Entender qué riesgos acepta y qué cubre la empresa.
// Feel: Honesto, directo, sin letra pequeña hostil.

const ExencionResponsabilidad: FC = () => {
  return (
    <>
      <head>
        <title>Exención de Responsabilidad | Balam RE Tours</title>
        <meta
          name="description"
          content="Aviso legal sobre los riesgos inherentes a las actividades turísticas de Balam RE Tours. Comprende tus derechos y las limitaciones de responsabilidad conforme a la ley mexicana."
        />
      </head>

      <div className="min-h-screen bg-caliza-50 font-sans">
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-12 bg-noche-950 relative overflow-hidden" aria-labelledby="page-title">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/8 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-5 lg:px-8 relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-noche-400 hover:text-cenote-300 transition-colors text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Volver al inicio
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span className="text-2xs font-bold uppercase tracking-brand text-amber-400">
                  Aviso Legal
                </span>
              </div>
              <h1 id="page-title" className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Exención de{' '}
                <span className="text-amber-400">Responsabilidad</span>
              </h1>
              <p className="text-noche-400 max-w-xl leading-relaxed">
                Al participar en nuestras actividades turísticas, el cliente reconoce y acepta
                los riesgos inherentes descritos a continuación.
              </p>
            </motion.div>
          </div>
        </section>

        <main className="container mx-auto px-5 lg:px-8 py-12 max-w-4xl">

          {/* Alerta principal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-3xl p-6 mb-8"
          >
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="font-extrabold text-amber-900 mb-1">Aviso Importante</h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                Las actividades turísticas —incluyendo snorkel, senderismo, visitas a cenotes y zonas
                arqueológicas— implican <strong>riesgos inherentes</strong> que no pueden ser eliminados
                completamente. Al reservar, el participante declara estar en condiciones físicas
                apropiadas para la actividad elegida.
              </p>
            </div>
          </motion.div>

          <div className="space-y-6">

            {/* Riesgos inherentes */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="riesgos-heading"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <Waves className="w-5 h-5 text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="riesgos-heading" className="text-lg font-extrabold text-noche-900 mb-3">
                    Riesgos Inherentes a las Actividades
                  </h2>
                  <p className="text-sm text-noche-600 leading-relaxed mb-3">
                    Las actividades turísticas en entornos naturales conllevan riesgos que el participante
                    conoce y acepta al realizar su reserva. Estos incluyen, de manera enunciativa y no limitativa:
                  </p>
                  <ul className="space-y-2 text-sm text-noche-600">
                    {[
                      'Condiciones climáticas variables (sol intenso, lluvia, viento)',
                      'Terreno irregular en zonas arqueológicas y senderos naturales',
                      'Corrientes y condiciones del agua en cenotes, mar y ríos',
                      'Fauna silvestre en su hábitat natural',
                      'Fatiga física derivada de caminatas o actividades acuáticas',
                      'Reacciones alérgicas a elementos del entorno natural',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-noche-300 shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Instrucciones del guía */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="guia-heading"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cenote-50 border border-cenote-100 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-cenote-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="guia-heading" className="text-lg font-extrabold text-noche-900 mb-2">
                    Instrucciones del Guía Turístico
                  </h2>
                  <p className="text-sm text-noche-600 leading-relaxed">
                    Los participantes están obligados a seguir en todo momento las instrucciones del guía
                    turístico asignado. El guía tiene autoridad para tomar decisiones de seguridad, incluyendo
                    la modificación o suspensión de actividades cuando las condiciones lo requieran.
                  </p>
                  <p className="text-sm text-noche-600 leading-relaxed mt-2">
                    El incumplimiento deliberado de las instrucciones del guía exime a Balam RE Tours de
                    cualquier responsabilidad por daños o accidentes derivados de dicha conducta.
                  </p>
                  <div className="mt-4 flex items-start gap-2.5 bg-cenote-50 border border-cenote-100 rounded-2xl px-4 py-3">
                    <Info className="w-4 h-4 text-cenote-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-xs text-cenote-900">
                      Nuestros guías están certificados y llevan años operando en la Riviera Maya.
                      Sus indicaciones tienen como único objetivo garantizar tu seguridad y disfrute.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Condiciones médicas */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="medico-heading"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-5 h-5 text-rose-500" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="medico-heading" className="text-lg font-extrabold text-noche-900 mb-2">
                    Condiciones Médicas Relevantes
                  </h2>
                  <p className="text-sm text-noche-600 leading-relaxed">
                    El cliente debe informar a Balam RE Tours, previo al tour, sobre cualquier condición
                    médica que pueda ser relevante para la actividad, incluyendo pero no limitado a:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-noche-600 list-disc pl-5">
                    <li>Problemas cardíacos o respiratorios</li>
                    <li>Alergias graves (a insectos, plantas, medicamentos)</li>
                    <li>Embarazo</li>
                    <li>Lesiones musculares o articulares recientes</li>
                    <li>Epilepsia, vértigo o mareos frecuentes</li>
                    <li>Fobia al agua, a espacios cerrados o a las alturas</li>
                  </ul>
                  <div className="mt-4 flex items-start gap-2.5 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-xs text-rose-800">
                      La omisión de información médica relevante exime a Balam RE Tours de responsabilidad
                      ante cualquier eventualidad derivada de dicha condición durante el tour.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Limitación de responsabilidad */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="limitacion-heading"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-noche-900 border border-noche-800 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-noche-300" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="limitacion-heading" className="text-lg font-extrabold text-noche-900 mb-2">
                    Limitación de Responsabilidad
                  </h2>
                  <p className="text-sm text-noche-600 leading-relaxed">
                    Balam RE Tours no será responsable por pérdidas, daños o lesiones derivadas de actos
                    fuera de su control razonable, incluyendo:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-noche-600 list-disc pl-5">
                    <li>Actos de terceros no relacionados con la empresa</li>
                    <li>Fenómenos naturales extraordinarios (sismos, huracanes, inundaciones)</li>
                    <li>Decisiones gubernamentales o cierre temporal de sitios turísticos</li>
                    <li>Conducta imprudente o negligente del propio cliente</li>
                    <li>Condiciones de salud preexistentes no informadas por el cliente</li>
                    <li>Pérdida de objetos personales durante el desarrollo del tour</li>
                  </ul>
                  <p className="text-sm text-noche-600 leading-relaxed mt-3">
                    La responsabilidad de Balam RE Tours, en los casos que legalmente corresponda, estará
                    limitada al monto del tour contratado, conforme a la legislación mexicana vigente.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Nota legal final */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="nota-legal-heading"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-selva-50 border border-selva-100 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5 text-selva-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="nota-legal-heading" className="text-lg font-extrabold text-noche-900 mb-2">
                    Nota Legal — Jurisdicción Aplicable
                  </h2>
                  <blockquote className="border-l-4 border-selva-300 pl-4 py-1">
                    <p className="text-sm text-noche-700 leading-relaxed italic">
                      "Estas disposiciones se interpretarán conforme a la legislación aplicable en los
                      Estados Unidos Mexicanos y a las autoridades competentes del Estado de Quintana Roo."
                    </p>
                  </blockquote>
                  <p className="text-sm text-noche-600 leading-relaxed mt-3">
                    La presente Exención de Responsabilidad forma parte integral de los Términos y Condiciones
                    de Balam RE Tours y se rige por la legislación turística y civil vigente en México,
                    en particular por la Ley Federal de Turismo y el Código Civil Federal.
                  </p>
                </div>
              </div>
            </motion.section>

          </div>

          {/* Navegación a otras páginas legales */}
          <nav className="mt-10 pt-8 border-t border-caliza-200" aria-label="Otras páginas legales">
            <p className="text-xs font-bold uppercase tracking-widest text-noche-400 mb-4">Ver también</p>
            <div className="flex flex-wrap gap-3">
              {[
                { to: '/politicas-de-cancelacion', label: 'Políticas de Cancelación' },
                { to: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-caliza-200 rounded-xl text-sm text-noche-700 hover:bg-caliza-100 hover:text-cenote-700 transition-all"
                >
                  {link.label} <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </nav>
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
};

export default ExencionResponsabilidad;
