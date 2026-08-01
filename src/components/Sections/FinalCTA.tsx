import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  User,
  Mail,
  MapPin,
  Calendar,
  Users,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useContactForm } from "../../hooks/useContactForm";
import { useHomeTours } from "../../hooks/useTours";

/* ── Validation helpers ───────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  nombre?: string;
  email?: string;
}

function validate(data: {
  nombre: string;
  email: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (data.nombre.trim().length < 2)
    errors.nombre = "Ingresa tu nombre (mín. 2 caracteres)";
  if (!EMAIL_RE.test(data.email.trim()))
    errors.email = "Ingresa un email válido";
  return errors;
}

/* ── Stagger animation variants ───────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

/* ── Component ────────────────────────────────────────────────────────── */
const FinalCTA: React.FC = () => {
  const { submitContact, loading } = useContactForm();
  const { tours } = useHomeTours();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    tourId: "",
    fecha: "",
    adultos: "1",
    ninos: "0",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Honeypot for spam
  const [honeypot, setHoneypot] = useState("");

  const errors = validate(formData);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!touched[name]) setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    // Mark all as touched
    setTouched({ nombre: true, email: true });
    if (hasErrors) return;

    // Build asunto with tour name + date + passengers
    const selectedTour = tours.find((t) => t.id === formData.tourId);
    const parts: string[] = [];
    if (selectedTour) parts.push(`Tour: ${selectedTour.nombre}`);
    if (formData.fecha) parts.push(`Fecha: ${formData.fecha}`);
    parts.push(`Adultos: ${formData.adultos}, Niños: ${formData.ninos}`);
    const asunto = parts.join(" | ");
    const mensaje = `Solicitud de reserva — ${asunto}`;

    const result = await submitContact({ nombre: formData.nombre, email: formData.email, asunto, mensaje });
    if (result.success) {
      setIsSuccess(true);
      setFormData({ nombre: "", email: "", tourId: "", fecha: "", adultos: "1", ninos: "0" });
      setTouched({});
      // Reset success state after 8 seconds
      setTimeout(() => setIsSuccess(false), 8000);
    }
  };

  /* ── Input class builder ─────────────────────────────────────────────── */
  const inputBase =
    "w-full px-5 py-4 rounded-2xl border bg-white/5 backdrop-blur-sm text-white placeholder:text-white/30 font-medium transition-all duration-200 outline-none";
  const inputNormal = "border-white/10 focus:border-cenote-400 focus:ring-4 focus:ring-cenote-400/10 focus:bg-white/8";
  const inputError = "border-rose-500/50 ring-2 ring-rose-500/20 focus:border-rose-400 focus:ring-rose-400/20";

  const getInputClass = (field: keyof FieldErrors) =>
    `${inputBase} ${touched[field] && errors[field] ? inputError : inputNormal}`;

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      {/* Background image — unchanged */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero2.jpg"
          className="w-full h-full object-cover"
          alt="Riviera Maya"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-noche-950/90 via-cenote-950/80 to-noche-950/85" />
      </div>

      <div className="container mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* ── Left: CTA text (original content preserved) ────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Rating row */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-7">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-white/70 text-sm font-medium">
                +500 viajeros satisfechos
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Tu próxima aventura empieza{" "}
              <span className="text-cenote-300">hoy.</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              No dejes para mañana lo que puedes vivir este fin de semana.
              Reserva ahora y asegura tu lugar.
            </p>

            {/* Micro trust notes */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              {[
                "Sin cargo por cancelación anticipada",
                "Confirmación inmediata",
                "Transporte incluido",
              ].map((note) => (
                <span
                  key={note}
                  className="text-white/50 text-xs font-medium flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-cenote-400 inline-block" />
                  {note}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Contact form ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 p-7 sm:p-9 shadow-2xl shadow-black/20">
              {/* Form header */}
              <div className="mb-7">
                <span className="text-2xs font-bold uppercase tracking-brand text-cenote-400">
                  ¿Preguntas o reservas?
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1.5">
                  Contacto y Reserva
                </h3>
                <p className="text-white/50 text-sm mt-2 leading-relaxed">
                  Escríbenos para consultas o reservar tu aventura. Respondemos en menos de 24 hrs.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* ── Success state ─────────────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="w-20 h-20 bg-cenote-600/20 text-cenote-400 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-cenote-500/30"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    <h4 className="text-xl font-extrabold text-white mb-2">
                      ¡Mensaje Enviado!
                    </h4>
                    <p className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed">
                      Gracias por contactarnos. Te responderemos a tu correo
                      electrónico lo antes posible.
                    </p>
                  </motion.div>
                ) : (
                  /* ── Form ──────────────────────────────────────────────── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-5"
                  >
                    {/* Honeypot — hidden from humans */}
                    <div className="absolute opacity-0 -z-50" aria-hidden="true">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Row: Nombre + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Nombre */}
                      <motion.div variants={fieldVariants} className="space-y-2">
                        <label
                          htmlFor="contact-nombre"
                          className="text-xs font-black text-white/50 uppercase tracking-wider flex items-center gap-2"
                        >
                          <User className="w-3.5 h-3.5 text-cenote-400" />
                          Nombre <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="contact-nombre"
                          name="nombre"
                          type="text"
                          required
                          placeholder="Tu nombre"
                          aria-required="true"
                          aria-invalid={
                            touched.nombre && errors.nombre ? "true" : "false"
                          }
                          aria-describedby={
                            touched.nombre && errors.nombre
                              ? "contact-nombre-error"
                              : undefined
                          }
                          className={getInputClass("nombre")}
                          value={formData.nombre}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.nombre && errors.nombre && (
                          <p
                            id="contact-nombre-error"
                            role="alert"
                            className="text-rose-400 text-xs font-semibold mt-1 animate-fade-in"
                          >
                            {errors.nombre}
                          </p>
                        )}
                      </motion.div>

                      {/* Email */}
                      <motion.div variants={fieldVariants} className="space-y-2">
                        <label
                          htmlFor="contact-email"
                          className="text-xs font-black text-white/50 uppercase tracking-wider flex items-center gap-2"
                        >
                          <Mail className="w-3.5 h-3.5 text-cenote-400" />
                          Email <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder="tu@email.com"
                          aria-required="true"
                          aria-invalid={
                            touched.email && errors.email ? "true" : "false"
                          }
                          aria-describedby={
                            touched.email && errors.email
                              ? "contact-email-error"
                              : undefined
                          }
                          className={getInputClass("email")}
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.email && errors.email && (
                          <p
                            id="contact-email-error"
                            role="alert"
                            className="text-rose-400 text-xs font-semibold mt-1 animate-fade-in"
                          >
                            {errors.email}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* Tour de interés */}
                    <motion.div variants={fieldVariants} className="space-y-2">
                      <label
                        htmlFor="contact-tour"
                        className="text-xs font-black text-white/50 uppercase tracking-wider flex items-center gap-2"
                      >
                        <MapPin className="w-3.5 h-3.5 text-cenote-400" />
                        Tour de interés{" "}
                        <span className="text-white/30 font-medium normal-case tracking-normal">
                          (opcional)
                        </span>
                      </label>
                      <select
                        id="contact-tour"
                        name="tourId"
                        className={`${inputBase} ${inputNormal} appearance-none cursor-pointer`}
                        value={formData.tourId}
                        onChange={handleChange}
                      >
                        <option value="">Selecciona un tour</option>
                        {tours.map((tour) => (
                          <option key={tour.id} value={tour.id}>
                            {tour.nombre}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Fecha */}
                    <motion.div variants={fieldVariants} className="space-y-2">
                      <label
                        htmlFor="contact-fecha"
                        className="text-xs font-black text-white/50 uppercase tracking-wider flex items-center gap-2"
                      >
                        <Calendar className="w-3.5 h-3.5 text-cenote-400" />
                        Fecha{" "}
                        <span className="text-white/30 font-medium normal-case tracking-normal">
                          (opcional)
                        </span>
                      </label>
                      <input
                        id="contact-fecha"
                        name="fecha"
                        type="date"
                        className={`${inputBase} ${inputNormal} cursor-pointer`}
                        value={formData.fecha}
                        onChange={handleChange}
                      />
                    </motion.div>

                    {/* Adultos + Niños */}
                    <div className="grid grid-cols-2 gap-5">
                      <motion.div variants={fieldVariants} className="space-y-2">
                        <label
                          htmlFor="contact-adultos"
                          className="text-xs font-black text-white/50 uppercase tracking-wider flex items-center gap-2"
                        >
                          <Users className="w-3.5 h-3.5 text-cenote-400" />
                          Adultos
                        </label>
                        <select
                          id="contact-adultos"
                          name="adultos"
                          className={`${inputBase} ${inputNormal} appearance-none cursor-pointer text-center`}
                          value={formData.adultos}
                          onChange={handleChange}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </motion.div>

                      <motion.div variants={fieldVariants} className="space-y-2">
                        <label
                          htmlFor="contact-ninos"
                          className="text-xs font-black text-white/50 uppercase tracking-wider flex items-center gap-2 justify-center"
                        >
                          Niños
                        </label>
                        <select
                          id="contact-ninos"
                          name="ninos"
                          className={`${inputBase} ${inputNormal} appearance-none cursor-pointer text-center`}
                          value={formData.ninos}
                          onChange={handleChange}
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    </div>

                    {/* Submit */}
                    <motion.div variants={fieldVariants} className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-reserva w-full justify-center text-base py-4 group disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando…
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            Enviar Mensaje
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
