import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  CloudRain,
  CreditCard,
  ChevronRight,
  ArrowLeft,
  CalendarX,
} from 'lucide-react';
import Navbar from '../components/Sections/Navbar';
import Footer from '../components/Sections/Footer';
import FloatingWhatsApp from '../components/Ui/FloatingWhatsApp';

// ─── Intent ──────────────────────────────────────────────────────────────────
// Who: Cliente que acaba de reservar o está a punto de hacerlo, buscando
//      entender qué pasa si cancela.
// What: Leer las políticas claramente y tomar una decisión informada.
// Feel: Profesional, justo, transparente. Sin letra pequeña hostigadora.

const PoliticasCancelacion: FC = () => {
  return (
    <>
      <head>
        <title>Políticas de Cancelación | Balam RE Tours</title>
        <meta
          name="description"
          content="Conoce nuestras políticas de cancelación y reembolso para tours en la Riviera Maya. Cancelación sin costo hasta 72 horas antes del tour."
        />
      </head>

      <div className="min-h-screen bg-caliza-50 font-sans">
        <Navbar />

        {/* Hero de página */}
        <section className="pt-32 pb-12 bg-noche-950 relative overflow-hidden" aria-labelledby="page-title">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cenote-600/8 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-5 lg:px-8 relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-noche-400 hover:text-cenote-300 transition-colors text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CalendarX className="w-4 h-4 text-cenote-400" />
                <span className="text-2xs font-bold uppercase tracking-brand text-cenote-400">
                  Información Legal
                </span>
              </div>
              <h1 id="page-title" className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Políticas de{' '}
                <span className="text-cenote-400">Cancelación</span>
              </h1>
              <p className="text-noche-400 max-w-xl leading-relaxed">
                Queremos que tu experiencia sea transparente desde el inicio.
                Lee con atención nuestras condiciones antes de reservar.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contenido */}
        <main className="container mx-auto px-5 lg:px-8 py-12 max-w-4xl">

          {/* Tabla resumen */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-caliza-200 overflow-hidden mb-8"
            style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
            aria-labelledby="summary-table-heading"
          >
            <div className="p-6 border-b border-caliza-100">
              <h2 id="summary-table-heading" className="text-xl font-extrabold text-noche-900">Resumen de Políticas</h2>
              <p className="text-sm text-noche-500 mt-1">Referencia rápida de condiciones de cancelación.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table" aria-label="Tabla resumen de políticas de cancelación">
                <thead>
                  <tr className="bg-caliza-50 border-b border-caliza-100">
                    <th scope="col" className="text-left px-6 py-4 font-bold text-noche-700">Escenario</th>
                    <th scope="col" className="text-left px-6 py-4 font-bold text-noche-700">Reembolso</th>
                    <th scope="col" className="text-center px-6 py-4 font-bold text-noche-700">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-caliza-100">
                  {[
                    {
                      scenario: 'Cancelación con +72 horas de anticipación',
                      refund: 'Reembolso completo',
                      status: 'ok',
                    },
                    {
                      scenario: 'Cancelación con menos de 72 horas',
                      refund: 'Sin reembolso',
                      status: 'no',
                    },
                    {
                      scenario: 'No presentación (No Show)',
                      refund: 'Sin reembolso',
                      status: 'no',
                    },
                    {
                      scenario: 'Llegada tardía sin aviso',
                      refund: 'Puede perder el servicio',
                      status: 'warn',
                    },
                    {
                      scenario: 'Cancelación por evento climático extremo',
                      refund: 'Reprogramación o reembolso',
                      status: 'ok',
                    },
                  ].map((row) => (
                    <tr key={row.scenario} className="hover:bg-caliza-50 transition-colors">
                      <td className="px-6 py-4 text-noche-800 font-medium">{row.scenario}</td>
                      <td className="px-6 py-4 text-noche-600">{row.refund}</td>
                      <td className="px-6 py-4 text-center">
                        {row.status === 'ok' && (
                          <CheckCircle2 className="w-5 h-5 text-selva-500 mx-auto" aria-label="Aprobado" />
                        )}
                        {row.status === 'no' && (
                          <XCircle className="w-5 h-5 text-rose-500 mx-auto" aria-label="No aplica" />
                        )}
                        {row.status === 'warn' && (
                          <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto" aria-label="Advertencia" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Secciones detalladas */}
          <div className="space-y-6">

            {/* 72 horas */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="cancelacion-72h"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-selva-50 border border-selva-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-selva-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="cancelacion-72h" className="text-lg font-extrabold text-noche-900 mb-2">
                    Cancelación con más de 72 horas de anticipación
                  </h2>
                  <p className="text-noche-600 leading-relaxed text-sm">
                    Si cancelas tu reservación con al menos <strong>72 horas de antelación</strong> al inicio del tour,
                    tendrás derecho a un <strong>reembolso completo</strong> del monto pagado.
                    El proceso de devolución dependerá de los tiempos de procesamiento de tu banco o pasarela de pago.
                  </p>

                  {/* Alerta informativa */}
                  <div className="mt-4 flex items-start gap-2.5 bg-selva-50 border border-selva-100 rounded-2xl px-4 py-3">
                    <Info className="w-4 h-4 text-selva-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-selva-800">
                      Los reembolsos aprobados pueden tardar entre <strong>5 y 15 días hábiles</strong> en
                      reflejarse en tu cuenta, dependiendo de tu institución bancaria o pasarela de pago.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Menos de 72 horas */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="cancelacion-menos-72h"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-rose-500" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="cancelacion-menos-72h" className="text-lg font-extrabold text-noche-900 mb-2">
                    Cancelación con menos de 72 horas de anticipación
                  </h2>
                  <p className="text-noche-600 leading-relaxed text-sm">
                    Las cancelaciones realizadas dentro de las <strong>72 horas previas</strong> al inicio del tour
                    no generan reembolso. Esto se debe a los costos operativos ya comprometidos
                    (guías, transporte, reservas en destino).
                  </p>

                  <div className="mt-4 flex items-start gap-2.5 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-rose-800">
                      En casos de emergencia comprobada (hospitalización, defunción de familiar directo),
                      evaluamos reprogramación sin costo adicional. Contáctanos al momento.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* No Show */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="no-show"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-500" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="no-show" className="text-lg font-extrabold text-noche-900 mb-2">
                    No Show y Llegadas Tardías
                  </h2>
                  <p className="text-noche-600 leading-relaxed text-sm">
                    La no presentación al punto de encuentro en el horario indicado (<strong>No Show</strong>) no genera
                    devolución alguna. Si llegas tarde sin previo aviso, el servicio puede haber iniciado sin ti.
                  </p>
                  <p className="text-noche-600 leading-relaxed text-sm mt-2">
                    Si anticipas un retraso, comunícate con nosotros inmediatamente. Haremos lo posible por
                    coordinarte con el grupo, sujeto a disponibilidad logística.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Eventos climáticos */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="clima"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cenote-50 border border-cenote-100 flex items-center justify-center shrink-0">
                  <CloudRain className="w-5 h-5 text-cenote-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="clima" className="text-lg font-extrabold text-noche-900 mb-2">
                    Eventos Climáticos Extremos
                  </h2>
                  <p className="text-noche-600 leading-relaxed text-sm">
                    Ante condiciones climáticas extremas (huracanes, tormentas tropicales, alertas de protección civil),
                    Balam RE Tours puede reprogramar el tour sin costo adicional o, en su caso, ofrecer
                    un reembolso total si la actividad no puede realizarse en un plazo razonable.
                  </p>

                  <div className="mt-4 flex items-start gap-2.5 bg-cenote-50 border border-cenote-100 rounded-2xl px-4 py-3">
                    <Info className="w-4 h-4 text-cenote-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-cenote-900">
                      La lluvia ligera o nubes no constituyen un evento climático extremo y el tour se realiza normalmente.
                      La decisión final sobre la viabilidad del servicio es exclusiva de Balam RE Tours.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Reembolsos */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8"
              style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
              aria-labelledby="reembolsos"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-tierra-50 border border-tierra-100 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-tierra-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="reembolsos" className="text-lg font-extrabold text-noche-900 mb-2">
                    Proceso de Reembolsos
                  </h2>
                  <p className="text-noche-600 leading-relaxed text-sm">
                    Los reembolsos aprobados se procesan por el mismo medio de pago utilizado originalmente.
                    Los tiempos de acreditación dependen de la institución bancaria o pasarela de pago y
                    pueden tomar entre <strong>5 y 15 días hábiles</strong> a partir de la confirmación de la cancelación.
                  </p>
                  <p className="text-noche-600 leading-relaxed text-sm mt-2">
                    Balam RE Tours no se hace responsable por los tiempos de procesamiento internos de
                    bancos o plataformas de pago una vez iniciado el proceso de devolución.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Contacto */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-noche-950 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
            >
              <div>
                <h3 className="font-extrabold text-white text-base mb-1">¿Necesitas cancelar o tienes dudas?</h3>
                <p className="text-noche-400 text-sm">Contáctanos antes del plazo — siempre buscamos la mejor solución.</p>
              </div>
              <div className="flex gap-3 shrink-0 flex-wrap">
                <a
                  href="https://wa.me/529983471258?text=Hola%2C%20necesito%20cancelar%20mi%20reservaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-bold hover:bg-[#1fba59] transition-all"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:hola@balamretours.com?subject=Cancelación%20de%20reservación"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-all border border-white/10"
                >
                  Correo
                </a>
              </div>
            </motion.div>
          </div>

          {/* Navegación a otras páginas legales */}
          <nav className="mt-10 pt-8 border-t border-caliza-200" aria-label="Otras páginas legales">
            <p className="text-xs font-bold uppercase tracking-widest text-noche-400 mb-4">Ver también</p>
            <div className="flex flex-wrap gap-3">
              {[
                { to: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
                { to: '/exencion-de-responsabilidad', label: 'Exención de Responsabilidad' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-caliza-200 rounded-xl text-sm text-noche-700 hover:bg-caliza-100 hover:text-cenote-700 transition-all"
                >
                  {link.label} <ChevronRight className="w-3.5 h-3.5" />
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

export default PoliticasCancelacion;
