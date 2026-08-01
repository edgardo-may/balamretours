import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Users,
  Luggage,
  MessageSquare,
  Send,
  CheckCircle2,
  Car,
  Shield,
  Zap,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { Toaster } from 'sonner';
import Navbar from '../Sections/Navbar';
import Footer from '../Sections/Footer';
import FloatingWhatsApp from '../Ui/FloatingWhatsApp';
import { useTransportQuotation } from '../../hooks/useTransportQuotation';
import type { TransportVehicleType } from '../../types/tour';

// ── WhatsApp config ──────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '529983471258';

function buildWhatsAppUrl(data?: Partial<FormState>): string {
  if (!data?.nombre) {
    const text = 'Hola, me interesa solicitar una cotización de transporte privado con Balam RE Tours.';
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }
  const text = [
    `Hola, soy ${data.nombre} y quisiera cotizar un transporte privado.`,
    data.fecha_servicio && `📅 Fecha: ${data.fecha_servicio}`,
    data.hora_aproximada && `🕐 Hora: ${data.hora_aproximada}`,
    data.lugar_recogida && `📍 Recogida: ${data.lugar_recogida}`,
    data.destino && `🏁 Destino: ${data.destino}`,
    data.num_pasajeros && `👥 Pasajeros: ${data.num_pasajeros}`,
    data.tipo_vehiculo && `🚗 Vehículo: ${VEHICLES.find(v => v.id === data.tipo_vehiculo)?.label}`,
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ── Vehicle definitions ──────────────────────────────────────────────────────
const VEHICLES: {
  id: TransportVehicleType;
  label: string;
  capacity: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'sedan',
    label: 'Sedán',
    capacity: '1–3 pax',
    desc: 'Viaje cómodo para grupos pequeños',
    icon: (
      <svg viewBox="0 0 64 32" fill="none" className="w-12 h-6" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="14" width="56" height="12" rx="3" fill="currentColor" opacity="0.15" />
        <path d="M8 14 Q16 4 28 4 H40 Q52 4 56 14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="4" y="14" width="56" height="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="16" cy="27" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="48" cy="27" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
      </svg>
    ),
  },
  {
    id: 'suv',
    label: 'SUV',
    capacity: '1–5 pax',
    desc: 'Espacio extra, confort total',
    icon: (
      <svg viewBox="0 0 64 32" fill="none" className="w-12 h-6" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="12" width="56" height="14" rx="3" fill="currentColor" opacity="0.15" />
        <path d="M6 12 Q12 2 26 2 H42 Q56 2 58 12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="4" y="12" width="56" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="16" cy="28" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="48" cy="28" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
      </svg>
    ),
  },
  {
    id: 'van',
    label: 'Van',
    capacity: '6–10 pax',
    desc: 'Ideal para grupos medianos',
    icon: (
      <svg viewBox="0 0 72 32" fill="none" className="w-14 h-6" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="64" height="16" rx="3" fill="currentColor" opacity="0.15" />
        <path d="M4 14 L4 8 Q4 4 8 4 H60 Q64 4 64 8 L64 14" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="4" y="8" width="64" height="15" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="28" y1="8" x2="28" y2="23" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="27" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="56" cy="27" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
      </svg>
    ),
  },
  {
    id: 'sprinter',
    label: 'Sprinter',
    capacity: '11–20 pax',
    desc: 'Máxima capacidad para grupos grandes',
    icon: (
      <svg viewBox="0 0 80 32" fill="none" className="w-16 h-6" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="72" height="18" rx="3" fill="currentColor" opacity="0.15" />
        <path d="M4 16 L4 6 Q4 2 8 2 H68 Q72 2 72 6 L72 16" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="4" y="6" width="72" height="17" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="24" y1="6" x2="24" y2="23" stroke="currentColor" strokeWidth="1.5" />
        <line x1="48" y1="6" x2="48" y2="23" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="27" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="64" cy="27" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
      </svg>
    ),
  },
];

// ── Trust badges ─────────────────────────────────────────────────────────────
const TRUST = [
  { icon: <Shield className="w-4 h-4" />, label: 'Servicio seguro y verificado' },
  { icon: <Zap className="w-4 h-4" />, label: 'Respuesta en menos de 2 horas' },
  { icon: <CheckCircle2 className="w-4 h-4" />, label: 'Sin compromiso al solicitar' },
];

// ── Form state type ──────────────────────────────────────────────────────────
interface FormState {
  nombre: string;
  telefono: string;
  email: string;
  fecha_servicio: string;
  hora_aproximada: string;
  lugar_recogida: string;
  destino: string;
  num_pasajeros: string;
  tipo_vehiculo: TransportVehicleType | '';
  equipaje: string;
  comentarios: string;
}

const INITIAL_FORM: FormState = {
  nombre: '',
  telefono: '',
  email: '',
  fecha_servicio: '',
  hora_aproximada: '',
  lugar_recogida: '',
  destino: '',
  num_pasajeros: '2',
  tipo_vehiculo: '',
  equipaje: '',
  comentarios: '',
};

// ── Field component ──────────────────────────────────────────────────────────
function Field({
  label,
  icon,
  required,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  required?: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-brand text-noche-500">
        <span className="text-cenote-600">{icon}</span>
        {label}
        {required && <span className="text-tierra-500 text-sm leading-none">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-tierra-600 font-semibold">Campo requerido</p>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
const TransportQuotationPage: React.FC = () => {
  const { submitQuotation, loading } = useTransportQuotation();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [successFolio, setSuccessFolio] = useState<string | null>(null);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const touch = (key: keyof FormState) => () =>
    setTouched(prev => ({ ...prev, [key]: true }));

  const err = (key: keyof FormState) =>
    touched[key] && form[key] === '';

  const REQUIRED: (keyof FormState)[] = [
    'nombre', 'telefono', 'fecha_servicio', 'lugar_recogida', 'destino',
  ];

  const isValid = REQUIRED.every(k => form[k].trim() !== '');

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Mark all required as touched to show errors
    const allTouched = REQUIRED.reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Partial<Record<keyof FormState, boolean>>,
    );
    setTouched(allTouched);
    if (!isValid) return;

    const result = await submitQuotation({
      nombre: form.nombre,
      telefono: form.telefono,
      email: form.email || undefined,
      fecha_servicio: form.fecha_servicio,
      hora_aproximada: form.hora_aproximada || undefined,
      lugar_recogida: form.lugar_recogida,
      destino: form.destino,
      num_pasajeros: parseInt(form.num_pasajeros) || 1,
      tipo_vehiculo: form.tipo_vehiculo || undefined,
      equipaje: form.equipaje || undefined,
      comentarios: form.comentarios || undefined,
    });

    if (result.success && result.folio) {
      setSuccessFolio(result.folio);
    }
  };

  // ── Input class ────────────────────────────────────────────────────────────
  const inputCls = (key: keyof FormState) =>
    `w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150 outline-none
     bg-caliza-50 border
     placeholder:text-noche-400 text-noche-900
     focus:ring-2 focus:ring-cenote-400/40 focus:border-cenote-400 focus:bg-white
     ${err(key)
      ? 'border-tierra-400 ring-2 ring-tierra-400/20'
      : 'border-caliza-300 hover:border-caliza-400'
    }`;

  // ── Success state ──────────────────────────────────────────────────────────
  if (successFolio) {
    return (
      <div className="min-h-screen bg-caliza-50 font-sans">
        <Navbar />
        <Toaster richColors position="top-right" />
        <div className="flex items-center justify-center min-h-screen px-5 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full bg-white rounded-3xl border border-caliza-200 p-10 text-center"
            style={{ boxShadow: '0 8px 40px rgba(14,75,88,0.10)' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 280, damping: 20 }}
              className="w-20 h-20 bg-cenote-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-cenote-100"
            >
              <CheckCircle2 className="w-10 h-10 text-cenote-600" />
            </motion.div>

            <h2 className="text-2xl font-black text-noche-950 mb-2">¡Solicitud Enviada!</h2>
            <p className="text-noche-500 text-sm leading-relaxed mb-7">
              Hemos recibido tu solicitud de cotización. Un asesor se comunicará contigo a la brevedad.
            </p>

            <div className="bg-cenote-50 border border-cenote-100 rounded-2xl p-5 mb-7">
              <p className="text-cenote-700 text-xs font-bold uppercase tracking-brand mb-1">Tu folio de cotización</p>
              <p className="text-cenote-800 text-2xl font-black tracking-tighter font-mono">{successFolio}</p>
            </div>

            <a
              href={buildWhatsAppUrl(form)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center mb-4"
            >
              <MessageCircle className="w-4 h-4" />
              Confirmar por WhatsApp
            </a>

            <button
              onClick={() => { setForm(INITIAL_FORM); setTouched({}); setSuccessFolio(null); }}
              className="text-sm text-cenote-600 font-semibold hover:underline"
            >
              Hacer otra solicitud
            </button>
          </motion.div>
        </div>
        <Footer />
        <FloatingWhatsApp />
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-caliza-50 font-sans selection:bg-cenote-100 selection:text-cenote-900">
      <Navbar />
      <Toaster richColors position="top-right" />

      {/* ── Hero ── */}
      <section className="relative bg-cenote-950 overflow-hidden pt-32 pb-20">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cenote-600/20 blur-[100px] rounded-full" />

        <div className="container mx-auto px-5 lg:px-8 relative">
          {/* Trust badges row */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {TRUST.map((t) => (
              <div
                key={t.label}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/8 border border-white/12 text-white/80 backdrop-blur-sm"
              >
                <span className="text-cenote-400">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-cenote-400 text-xs font-bold uppercase tracking-brand text-center mb-3"
          >
            Transporte Privado · Sin tour incluido
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white text-center leading-tight mb-4"
          >
            Cotización de{' '}
            <span className="text-cenote-400">Transporte Privado</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-noche-300 text-base md:text-lg text-center max-w-xl mx-auto leading-relaxed"
          >
            ¿Solo necesitas transporte? Sin problema. Cotiza tu traslado privado al aeropuerto, hotel, cenote o cualquier destino en la Riviera Maya.
          </motion.p>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="container mx-auto px-5 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left: Form ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 space-y-8"
            noValidate
          >

            {/* ── Section 1: Client data ── */}
            <div className="bg-white rounded-2xl border border-caliza-200 p-6 md:p-8 space-y-5" style={{ boxShadow: '0 2px 16px rgba(14,75,88,0.06)' }}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-caliza-200">
                <div className="w-8 h-8 bg-cenote-50 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-cenote-600" />
                </div>
                <div>
                  <h2 className="font-black text-noche-900 text-base">Datos del cliente</h2>
                  <p className="text-noche-400 text-xs">Para enviarte la cotización y coordinar el servicio</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Nombre completo" icon={<User className="w-3.5 h-3.5" />} required error={err('nombre')}>
                  <input
                    type="text"
                    id="tr-nombre"
                    placeholder="Ej. María González"
                    className={inputCls('nombre')}
                    value={form.nombre}
                    onChange={set('nombre')}
                    onBlur={touch('nombre')}
                    autoComplete="name"
                  />
                </Field>

                <Field label="Teléfono / WhatsApp" icon={<Phone className="w-3.5 h-3.5" />} required error={err('telefono')}>
                  <input
                    type="tel"
                    id="tr-telefono"
                    placeholder="+52 998 347 1258"
                    className={inputCls('telefono')}
                    value={form.telefono}
                    onChange={set('telefono')}
                    onBlur={touch('telefono')}
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <Field label="Correo electrónico" icon={<Mail className="w-3.5 h-3.5" />}>
                <input
                  type="email"
                  id="tr-email"
                  placeholder="tu@correo.com (opcional)"
                  className={inputCls('email')}
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
              </Field>
            </div>

            {/* ── Section 2: Service detail ── */}
            <div className="bg-white rounded-2xl border border-caliza-200 p-6 md:p-8 space-y-5" style={{ boxShadow: '0 2px 16px rgba(14,75,88,0.06)' }}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-caliza-200">
                <div className="w-8 h-8 bg-tierra-50 rounded-lg flex items-center justify-center">
                  <Car className="w-4 h-4 text-tierra-600" />
                </div>
                <div>
                  <h2 className="font-black text-noche-900 text-base">Detalle del servicio</h2>
                  <p className="text-noche-400 text-xs">Cuéntanos cuándo, dónde y cuántos son</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Fecha del servicio" icon={<Calendar className="w-3.5 h-3.5" />} required error={err('fecha_servicio')}>
                  <input
                    type="date"
                    id="tr-fecha"
                    className={inputCls('fecha_servicio')}
                    value={form.fecha_servicio}
                    onChange={set('fecha_servicio')}
                    onBlur={touch('fecha_servicio')}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Field>

                <Field label="Hora aproximada" icon={<Clock className="w-3.5 h-3.5" />}>
                  <input
                    type="time"
                    id="tr-hora"
                    className={inputCls('hora_aproximada')}
                    value={form.hora_aproximada}
                    onChange={set('hora_aproximada')}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Lugar de recogida" icon={<MapPin className="w-3.5 h-3.5" />} required error={err('lugar_recogida')}>
                  <input
                    type="text"
                    id="tr-recogida"
                    placeholder="Hotel, aeropuerto, dirección..."
                    className={inputCls('lugar_recogida')}
                    value={form.lugar_recogida}
                    onChange={set('lugar_recogida')}
                    onBlur={touch('lugar_recogida')}
                  />
                </Field>

                <Field label="Destino" icon={<Navigation className="w-3.5 h-3.5" />} required error={err('destino')}>
                  <input
                    type="text"
                    id="tr-destino"
                    placeholder="Destino final del traslado"
                    className={inputCls('destino')}
                    value={form.destino}
                    onChange={set('destino')}
                    onBlur={touch('destino')}
                  />
                </Field>
              </div>

              <Field label="Número de pasajeros" icon={<Users className="w-3.5 h-3.5" />} required>
                <select
                  id="tr-pasajeros"
                  className={inputCls('num_pasajeros') + ' cursor-pointer appearance-none'}
                  value={form.num_pasajeros}
                  onChange={set('num_pasajeros')}
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'pasajero' : 'pasajeros'}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* ── Section 3: Preferences ── */}
            <div className="bg-white rounded-2xl border border-caliza-200 p-6 md:p-8 space-y-6" style={{ boxShadow: '0 2px 16px rgba(14,75,88,0.06)' }}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-caliza-200">
                <div className="w-8 h-8 bg-selva-50 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-selva-600" />
                </div>
                <div>
                  <h2 className="font-black text-noche-900 text-base">Preferencias</h2>
                  <p className="text-noche-400 text-xs">Opcional — nos ayuda a preparar la cotización ideal</p>
                </div>
              </div>

              {/* Vehicle selector — signature element */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-brand text-noche-500">
                  <span className="text-cenote-600"><Car className="w-3.5 h-3.5" /></span>
                  Tipo de vehículo preferido
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {VEHICLES.map((v) => {
                    const isSelected = form.tipo_vehiculo === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        id={`tr-vehiculo-${v.id}`}
                        onClick={() =>
                          setForm(prev => ({
                            ...prev,
                            tipo_vehiculo: prev.tipo_vehiculo === v.id ? '' : v.id,
                          }))
                        }
                        className={`relative flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all duration-150 text-left
                          ${isSelected
                            ? 'border-cenote-500 bg-cenote-50 text-cenote-700'
                            : 'border-caliza-200 bg-caliza-50 text-noche-500 hover:border-caliza-400 hover:bg-white'
                          }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-4 h-4 bg-cenote-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                          </span>
                        )}
                        <span className={isSelected ? 'text-cenote-600' : 'text-noche-400'}>
                          {v.icon}
                        </span>
                        <div className="text-center">
                          <p className={`text-sm font-bold leading-tight ${isSelected ? 'text-cenote-800' : 'text-noche-700'}`}>
                            {v.label}
                          </p>
                          <p className={`text-xs font-semibold ${isSelected ? 'text-cenote-600' : 'text-noche-400'}`}>
                            {v.capacity}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {form.tipo_vehiculo && (
                  <AnimatePresence>
                    <motion.p
                      key={form.tipo_vehiculo}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-cenote-600 font-semibold pl-1"
                    >
                      {VEHICLES.find(v => v.id === form.tipo_vehiculo)?.desc}
                    </motion.p>
                  </AnimatePresence>
                )}
              </div>

              {/* Luggage */}
              <Field label="Equipaje" icon={<Luggage className="w-3.5 h-3.5" />}>
                <select
                  id="tr-equipaje"
                  className={inputCls('equipaje') + ' cursor-pointer appearance-none'}
                  value={form.equipaje}
                  onChange={set('equipaje')}
                >
                  <option value="">Sin especificar</option>
                  <option value="sin_equipaje">Sin equipaje</option>
                  <option value="equipaje_de_mano">Solo equipaje de mano</option>
                  <option value="maletas_medianas">Maletas medianas (1–2)</option>
                  <option value="maletas_grandes">Maletas grandes (2–4)</option>
                  <option value="mucho_equipaje">Mucho equipaje (+4 maletas)</option>
                </select>
              </Field>

              {/* Comments */}
              <Field label="Comentarios adicionales" icon={<MessageSquare className="w-3.5 h-3.5" />}>
                <textarea
                  id="tr-comentarios"
                  rows={4}
                  placeholder="Paradas intermedias, necesidades especiales, horarios flexibles..."
                  className={inputCls('comentarios') + ' resize-none'}
                  value={form.comentarios}
                  onChange={set('comentarios')}
                />
              </Field>
            </div>

            {/* ── CTA buttons ── */}
            <div className="space-y-4">
              {/* Primary actions: equal-width grid on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.button
                  type="submit"
                  id="tr-submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.015 } : {}}
                  whileTap={!loading ? { scale: 0.985 } : {}}
                  className={`flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-200 w-full
                    ${loading
                      ? 'bg-cenote-400 text-white cursor-not-allowed'
                      : 'bg-cenote-600 text-white hover:bg-cenote-700 hover:-translate-y-0.5'
                    }`}
                  style={{ boxShadow: loading ? 'none' : '0 8px 30px rgba(14,138,158,0.35)' }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 shrink-0" />
                      Solicitar cotización
                      <ArrowRight className="w-4 h-4 opacity-70 shrink-0" />
                    </>
                  )}
                </motion.button>

                <a
                  id="tr-whatsapp-cta"
                  href={buildWhatsAppUrl(form)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#1fba59] transition-all duration-200 hover:-translate-y-0.5 w-full"
                  style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.30)' }}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  Contactar por WhatsApp
                </a>
              </div>

              <p className="text-center text-xs text-noche-400 font-medium">
                Al enviar, aceptas que un asesor se ponga en contacto contigo.
              </p>
            </div>
          </motion.form>

          {/* ── Right: Sticky sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 lg:sticky lg:top-24 space-y-4"
          >
            {/* Summary card */}
            <div
              className="bg-cenote-950 rounded-2xl p-6 text-white border border-cenote-900"
              style={{ boxShadow: '0 8px 40px rgba(10,47,56,0.30)' }}
            >
              <h3 className="font-black text-base mb-5 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-cenote-800 rounded-lg flex items-center justify-center">
                  <Car className="w-4 h-4 text-cenote-300" />
                </div>
                Resumen de solicitud
              </h3>

              <div className="space-y-3.5 text-sm">
                <SummaryRow
                  icon={<Calendar className="w-3.5 h-3.5" />}
                  label="Fecha"
                  value={form.fecha_servicio
                    ? new Date(form.fecha_servicio + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
                    : '—'}
                />
                <SummaryRow
                  icon={<Clock className="w-3.5 h-3.5" />}
                  label="Hora"
                  value={form.hora_aproximada || '—'}
                />
                <SummaryRow
                  icon={<MapPin className="w-3.5 h-3.5" />}
                  label="Recogida"
                  value={form.lugar_recogida || '—'}
                />
                <SummaryRow
                  icon={<Navigation className="w-3.5 h-3.5" />}
                  label="Destino"
                  value={form.destino || '—'}
                />
                <SummaryRow
                  icon={<Users className="w-3.5 h-3.5" />}
                  label="Pasajeros"
                  value={`${form.num_pasajeros} ${parseInt(form.num_pasajeros) === 1 ? 'pasajero' : 'pasajeros'}`}
                />
                {form.tipo_vehiculo && (
                  <SummaryRow
                    icon={<Car className="w-3.5 h-3.5" />}
                    label="Vehículo"
                    value={VEHICLES.find(v => v.id === form.tipo_vehiculo)?.label || '—'}
                  />
                )}
              </div>

              <div className="mt-5 pt-5 border-t border-cenote-800">
                <p className="text-cenote-400 text-xs font-semibold leading-relaxed">
                  Recibirás una cotización personalizada vía WhatsApp o correo según tus datos.
                </p>
              </div>
            </div>

            {/* Why us card */}
            <div className="bg-white rounded-2xl border border-caliza-200 p-6" style={{ boxShadow: '0 2px 16px rgba(14,75,88,0.06)' }}>
              <h4 className="font-black text-noche-900 text-sm mb-4">¿Por qué Balam RE?</h4>
              <ul className="space-y-3">
                {[
                  { icon: <Shield className="w-3.5 h-3.5" />, text: 'Conductores certificados y verificados' },
                  { icon: <Zap className="w-3.5 h-3.5" />, text: 'Puntualidad garantizada' },
                  { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: 'Vehículos con A/C y en perfecto estado' },
                  { icon: <Users className="w-3.5 h-3.5" />, text: 'Atención personalizada 24/7' },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2.5 text-xs text-noche-600">
                    <span className="text-cenote-500 shrink-0 mt-0.5">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct contact */}
            <a
              href={`tel:+529983471258`}
              className="flex items-center gap-3 bg-white rounded-2xl border border-caliza-200 p-5 hover:border-cenote-300 hover:bg-cenote-50 transition-all duration-150 group"
              style={{ boxShadow: '0 2px 16px rgba(14,75,88,0.06)' }}
            >
              <div className="w-10 h-10 bg-cenote-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-cenote-200 transition-colors">
                <Phone className="w-4.5 h-4.5 text-cenote-700" />
              </div>
              <div>
                <p className="text-xs text-noche-400 font-medium">Llamar directamente</p>
                <p className="text-sm font-bold text-noche-900">+52 (998) 347-1258</p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

// ── Summary row helper ────────────────────────────────────────────────────────
function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-cenote-500 shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-cenote-400 text-xs font-semibold uppercase tracking-wider leading-none mb-0.5">{label}</p>
        <p className="text-white text-sm font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}

export default TransportQuotationPage;
