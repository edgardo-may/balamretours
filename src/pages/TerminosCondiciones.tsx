import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  ShieldCheck,
  UserCheck,
  CreditCard,
  Globe,
  Lock,
  Scale,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import Navbar from '../components/Sections/Navbar';
import Footer from '../components/Sections/Footer';
import FloatingWhatsApp from '../components/Ui/FloatingWhatsApp';

// ─── Intent ──────────────────────────────────────────────────────────────────
// Who: Cliente que quiere entender sus derechos y obligaciones antes de pagar.
// What: Leer condiciones claras, confiar en que la empresa opera legalmente.
// Feel: Institucional, confiable, accesible — no abogados, sino personas.

interface SectionProps {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const LegalSection: FC<SectionProps> = ({ id, icon, iconBg, title, children, delay = 0 }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white rounded-3xl border border-caliza-200 p-6 md:p-8 scroll-mt-24"
    style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
    aria-labelledby={`${id}-heading`}
  >
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1">
        <h2 id={`${id}-heading`} className="text-lg font-extrabold text-noche-900 mb-3">
          {title}
        </h2>
        <div className="space-y-2 text-sm text-noche-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </motion.section>
);

const TerminosCondiciones: FC = () => {
  return (
    <>
      <head>
        <title>Términos y Condiciones | Balam RE Tours</title>
        <meta
          name="description"
          content="Términos y condiciones de uso del sitio web y servicios de Balam RE Tours. Condiciones de reserva, pago, protección de datos y legislación mexicana aplicable."
        />
      </head>

      <div className="min-h-screen bg-caliza-50 font-sans">
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-12 bg-noche-950 relative overflow-hidden" aria-labelledby="page-title">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-tierra-500/8 rounded-full blur-3xl" />
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
                <FileText className="w-4 h-4 text-tierra-400" aria-hidden="true" />
                <span className="text-2xs font-bold uppercase tracking-brand text-tierra-400">
                  Información Legal
                </span>
              </div>
              <h1 id="page-title" className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Términos y{' '}
                <span className="text-tierra-400">Condiciones</span>
              </h1>
              <p className="text-noche-400 max-w-xl leading-relaxed">
                Al utilizar nuestros servicios o sitio web, aceptas los siguientes términos.
                Última actualización: mayo 2025.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabla de contenidos + Contenido */}
        <main className="container mx-auto px-5 lg:px-8 py-12 max-w-4xl">

          {/* TOC */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-caliza-200 p-6 mb-8"
            style={{ boxShadow: '0 2px 20px rgba(14,75,88,0.07)' }}
            aria-label="Tabla de contenidos"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-noche-400 mb-4">Contenido</h2>
            <ol className="space-y-2 list-none">
              {[
                { href: '#reservas', label: 'Condiciones de Reserva' },
                { href: '#pago', label: 'Condiciones de Pago' },
                { href: '#obligaciones-cliente', label: 'Obligaciones del Cliente' },
                { href: '#obligaciones-empresa', label: 'Obligaciones de la Empresa' },
                { href: '#uso-sitio', label: 'Uso del Sitio Web' },
                { href: '#datos', label: 'Protección de Datos' },
                { href: '#legislacion', label: 'Legislación Aplicable' },
                { href: '#controversias', label: 'Resolución de Controversias' },
              ].map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-noche-700 hover:text-cenote-600 transition-colors py-1 group"
                  >
                    <span className="w-5 h-5 rounded-full bg-caliza-100 text-2xs font-bold text-noche-500 flex items-center justify-center shrink-0 group-hover:bg-cenote-100 group-hover:text-cenote-700 transition-colors">
                      {i + 1}
                    </span>
                    {item.label}
                    <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>

          {/* Secciones */}
          <div className="space-y-6">

            <LegalSection
              id="reservas"
              delay={0.12}
              icon={<ShieldCheck className="w-5 h-5 text-cenote-600" aria-hidden="true" />}
              iconBg="bg-cenote-50 border border-cenote-100"
              title="1. Condiciones de Reserva"
            >
              <p>
                La reservación de un tour con Balam RE Tours implica la aceptación plena de los presentes
                términos y condiciones. La reserva se considera confirmada únicamente al recibir el comprobante
                de pago correspondiente.
              </p>
              <p>
                Las reservas están sujetas a disponibilidad de fechas y cupos. Balam RE Tours se reserva el
                derecho de ajustar itinerarios por causas de fuerza mayor, condiciones climáticas o
                disposiciones de autoridades competentes.
              </p>
              <p>
                El folio de reservación generado es personal e intransferible. Si deseas ceder tu lugar a otra
                persona, debes notificarnos con al menos 48 horas de anticipación.
              </p>
            </LegalSection>

            <LegalSection
              id="pago"
              delay={0.16}
              icon={<CreditCard className="w-5 h-5 text-tierra-600" aria-hidden="true" />}
              iconBg="bg-tierra-50 border border-tierra-100"
              title="2. Condiciones de Pago"
            >
              <p>
                Los precios publicados en el sitio web están expresados en dólares estadounidenses (USD) y
                pueden estar sujetos a variación sin previo aviso para nuevas reservaciones.
              </p>
              <p>
                Aceptamos pagos mediante tarjeta de crédito/débito y transferencia bancaria a través de las
                pasarelas habilitadas en el sitio. Para reservas privadas, puede requerirse un anticipo del 50%.
              </p>
              <p>
                Los pagos no contemplan comisiones adicionales de nuestra parte. Las comisiones bancarias
                o de pasarela son responsabilidad del cliente según los términos de su institución financiera.
              </p>
            </LegalSection>

            <LegalSection
              id="obligaciones-cliente"
              delay={0.2}
              icon={<UserCheck className="w-5 h-5 text-selva-600" aria-hidden="true" />}
              iconBg="bg-selva-50 border border-selva-100"
              title="3. Obligaciones del Cliente"
            >
              <p>El cliente se obliga a:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-1">
                <li>Presentarse puntualmente en el lugar y hora indicados en su reservación.</li>
                <li>Seguir en todo momento las instrucciones del guía turístico asignado.</li>
                <li>Informar previamente sobre condiciones médicas relevantes que puedan afectar la actividad.</li>
                <li>Tratar con respeto a guías, personal y otros participantes del tour.</li>
                <li>Respetar las normas de los sitios visitados (zonas arqueológicas, reservas naturales, etc.).</li>
                <li>Proporcionar información veraz al momento de la reserva (nombre, contacto, participantes).</li>
              </ul>
            </LegalSection>

            <LegalSection
              id="obligaciones-empresa"
              delay={0.24}
              icon={<ShieldCheck className="w-5 h-5 text-cenote-600" aria-hidden="true" />}
              iconBg="bg-cenote-50 border border-cenote-100"
              title="4. Obligaciones de la Empresa"
            >
              <p>Balam RE Tours se compromete a:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-1">
                <li>Confirmar las reservaciones recibidas en un plazo máximo de 24 horas hábiles.</li>
                <li>Proveer guías certificados y experimentados en los destinos ofrecidos.</li>
                <li>Informar oportunamente ante cambios de itinerario o cancelaciones por parte de la empresa.</li>
                <li>Garantizar estándares de seguridad razonables durante el desarrollo de los tours.</li>
                <li>Mantener la confidencialidad de los datos personales proporcionados por el cliente.</li>
                <li>Gestionar los reembolsos aprobados en los plazos establecidos en las políticas de cancelación.</li>
              </ul>
            </LegalSection>

            <LegalSection
              id="uso-sitio"
              delay={0.28}
              icon={<Globe className="w-5 h-5 text-noche-600" aria-hidden="true" />}
              iconBg="bg-caliza-100 border border-caliza-200"
              title="5. Uso del Sitio Web"
            >
              <p>
                El sitio web de Balam RE Tours (<strong>balamretours.com</strong>) es de uso exclusivamente
                informativo y de gestión de reservas. Se prohíbe su uso para fines comerciales no autorizados,
                reproducción de contenido sin permiso, o cualquier actividad que pueda dañar la integridad
                técnica del sitio.
              </p>
              <p>
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte del sitio
                en cualquier momento sin previo aviso. No nos hacemos responsables por interrupciones del servicio
                derivadas de mantenimiento, fallas técnicas o causas ajenas a nuestra voluntad.
              </p>
              <p>
                El contenido del sitio (textos, imágenes, logotipos) está protegido por derechos de autor.
                Cualquier uso no autorizado será tratado conforme a la legislación aplicable.
              </p>
            </LegalSection>

            <LegalSection
              id="datos"
              delay={0.32}
              icon={<Lock className="w-5 h-5 text-tierra-600" aria-hidden="true" />}
              iconBg="bg-tierra-50 border border-tierra-100"
              title="6. Protección de Datos Personales"
            >
              <p>
                Balam RE Tours recopila y trata datos personales de conformidad con la{' '}
                <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>{' '}
                y su Reglamento.
              </p>
              <p>
                Los datos recopilados (nombre, correo, teléfono) se utilizan exclusivamente para la gestión de
                reservas, comunicación sobre el servicio y mejora de la experiencia. No vendemos ni compartimos
                datos personales con terceros sin consentimiento explícito del titular.
              </p>
              <p>
                El titular de los datos tiene derecho de Acceso, Rectificación, Cancelación y Oposición (ARCO)
                al tratamiento de sus datos. Para ejercerlos, contáctanos a:{' '}
                <a href="mailto:privacidad@balamretours.com" className="text-cenote-600 hover:underline">
                  privacidad@balamretours.com
                </a>
              </p>
            </LegalSection>

            <LegalSection
              id="legislacion"
              delay={0.36}
              icon={<Scale className="w-5 h-5 text-selva-600" aria-hidden="true" />}
              iconBg="bg-selva-50 border border-selva-100"
              title="7. Legislación Aplicable"
            >
              <p>
                Los presentes Términos y Condiciones se rigen e interpretan de conformidad con la legislación
                vigente de los <strong>Estados Unidos Mexicanos</strong>, en particular:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-1">
                <li>Código Civil Federal</li>
                <li>Ley Federal de Protección al Consumidor (PROFECO)</li>
                <li>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</li>
                <li>Ley Federal de Turismo</li>
                <li>Ley de Turismo del Estado de Quintana Roo</li>
              </ul>
              <div className="mt-3 flex items-start gap-2.5 bg-caliza-50 border border-caliza-200 rounded-2xl px-4 py-3">
                <Scale className="w-4 h-4 text-noche-500 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-noche-600">
                  Estas disposiciones se interpretarán conforme a la legislación aplicable en los Estados Unidos
                  Mexicanos y a las autoridades competentes del Estado de Quintana Roo.
                </p>
              </div>
            </LegalSection>

            <LegalSection
              id="controversias"
              delay={0.4}
              icon={<MessageSquare className="w-5 h-5 text-cenote-600" aria-hidden="true" />}
              iconBg="bg-cenote-50 border border-cenote-100"
              title="8. Resolución de Controversias"
            >
              <p>
                Ante cualquier controversia derivada de la prestación de nuestros servicios, las partes
                se comprometen a buscar en primera instancia una solución amigable mediante comunicación
                directa con nuestro equipo.
              </p>
              <p>
                De no resolverse en un plazo razonable, las controversias serán sometidas a la jurisdicción
                de los tribunales competentes del <strong>Estado de Quintana Roo, México</strong>, renunciando
                expresamente a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios
                presentes o futuros.
              </p>
              <p>
                El cliente también tiene el derecho de presentar reclamaciones ante la Procuraduría Federal del
                Consumidor (PROFECO) cuando considere que sus derechos como consumidor han sido vulnerados.
              </p>
            </LegalSection>

          </div>

          {/* Navegación lateral */}
          <nav className="mt-10 pt-8 border-t border-caliza-200" aria-label="Otras páginas legales">
            <p className="text-xs font-bold uppercase tracking-widest text-noche-400 mb-4">Ver también</p>
            <div className="flex flex-wrap gap-3">
              {[
                { to: '/politicas-de-cancelacion', label: 'Políticas de Cancelación' },
                { to: '/exencion-de-responsabilidad', label: 'Exención de Responsabilidad' },
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

export default TerminosCondiciones;
