import { useState, useEffect } from "react";
import type { FC, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  Calendar,
  Users,
  Mail,
  Phone,
  User,
  Loader2,
  MapPin,
  CreditCard,
} from "lucide-react";
import Button from "../Ui/Button";
import { useHomeTours } from "../../hooks/useTours";
import { supabase } from "../../lib/supabase";

interface BookingFormProps {
  selectedTourId?: string;
  onSuccess: () => void;
}

const BookingForm: FC<BookingFormProps> = ({ selectedTourId, onSuccess }) => {
  const { tours, loading } = useHomeTours();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationFolio, setReservationFolio] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    adults: "1",
    children: "0",
    tourId: selectedTourId || "",
    pickup: "",
  });

  // Update tourId when tours are loaded if none was selected
  useEffect(() => {
    if (!loading && tours.length > 0 && !formData.tourId) {
      setFormData((prev) => ({ ...prev, tourId: tours[0].id }));
    }
  }, [loading, tours, formData.tourId]);

  const genFolio = () => {
    const time = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RES-${time}-${rand}`;
  };

  const selectedTour = tours.find((t) => t.id === formData.tourId);

  // Calculations
  const priceData = Array.isArray(selectedTour?.prices)
    ? selectedTour?.prices[0]
    : selectedTour?.prices;
  const adultPrice = (priceData as any)?.precio_adulto || 0;
  const childPrice = (priceData as any)?.precio_menor || 0;
  const numAdults = parseInt(formData.adults);
  const numChildren = parseInt(formData.children);

  const subtotalAdults = numAdults * adultPrice;
  const subtotalChildren = numChildren * childPrice;
  const total = subtotalAdults + subtotalChildren;

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  // Validations
  const isValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.date !== "" &&
    formData.tourId !== "" &&
    formData.pickup.trim() !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    const folio = genFolio();

    try {
      // 1. Registrar Cliente y obtener su ID
      const { data: cliente, error: cliErr } = await supabase
        .from("clientes")
        .insert({
          nombre: formData.name,
          email: formData.email,
          telefono: formData.phone,
        })
        .select("id")
        .single();

      if (cliErr) throw cliErr;

      // 2. Registrar Reservación vinculada al cliente
      const { error: resErr } = await supabase.from("reservaciones").insert({
        cliente_id: cliente.id,
        tour_id: formData.tourId,
        fecha: formData.date,
        adultos: numAdults,
        menores: numChildren,
        pick_up: formData.pickup,
        total: total,
        folio_reservacion: folio,
        estado: "pendiente",
      });

      if (resErr) throw resErr;

      setReservationFolio(folio);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err: any) {
      console.error("Error submitting reservation:", err);
      alert("Error al enviar la reserva: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !selectedTourId) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">
          Preparando tu experiencia...
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-teal-100"
        >
          <CheckCircle2 className="w-14 h-14" />
        </motion.div>
        <h3 className="text-3xl font-black text-slate-900 mb-3">
          ¡Reserva Exitosa!
        </h3>
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-6 inline-block">
          <p className="text-teal-800 text-sm font-bold uppercase tracking-widest mb-1">
            Tu Folio de Reserva
          </p>
          <p className="text-2xl font-black text-teal-600 tracking-tighter font-mono">
            {reservationFolio}
          </p>
        </div>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Hemos recibido tu solicitud. Un asesor se comunicará contigo vía
          WhatsApp para finalizar los detalles.
        </p>
      </div>
    );
  }

  const availableDates = (selectedTour?.availability || []).filter(
    (d: any) => (d.cupos_disponibles || d.spots_available) > 0,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-8 space-y-6 bg-white p-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-teal-600" /> Nombre Completo
            </label>
            <input
              required
              type="text"
              placeholder="Ej. Juan Pérez"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-600" /> Correo Electrónico
            </label>
            <input
              required
              type="email"
              placeholder="juan@ejemplo.com"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-600" /> WhatsApp / Celular
            </label>
            <input
              required
              type="tel"
              placeholder="+52 998 ..."
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" /> Fecha del Tour
            </label>
            <select
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium appearance-none cursor-pointer"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            >
              <option value="">Selecciona disponibilidad</option>
              {availableDates.map((d: any) => (
                <option key={d.id} value={d.date || d.fecha}>
                  {new Date(d.date || d.fecha).toLocaleDateString("es-MX", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-600" /> Punto de Encuentro /
            Hotel (Pickup)
          </label>
          <input
            required
            type="text"
            placeholder="¿Dónde pasamos por ti?"
            className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
            value={formData.pickup}
            onChange={(e) =>
              setFormData({ ...formData, pickup: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider">
              Tour Seleccionado
            </label>
            <select
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold appearance-none cursor-pointer"
              value={formData.tourId}
              onChange={(e) =>
                setFormData({ ...formData, tourId: e.target.value, date: "" })
              }
            >
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.name || (tour as any).nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" /> Adultos
              </label>
              <select
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold appearance-none cursor-pointer text-center"
                value={formData.adults}
                onChange={(e) =>
                  setFormData({ ...formData, adults: e.target.value })
                }
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2 text-center justify-center">
                Niños
              </label>
              <select
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold appearance-none cursor-pointer text-center"
                value={formData.children}
                onChange={(e) =>
                  setFormData({ ...formData, children: e.target.value })
                }
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-5 text-xl font-black rounded-2xl transition-all duration-300 ${
              !isValid
                ? "bg-slate-200 text-slate-400 cursor-not-allowed border-none"
                : "bg-teal-600 text-white shadow-lg shadow-teal-600/20 hover:scale-[1.02] active:scale-95"
            }`}
            isLoading={isSubmitting}
          >
            <Send className="w-6 h-6 mr-3" />
            ¡Confirmar Mi Aventura!
          </Button>
          {!isValid && !loading && (
            <p className="text-center text-xs text-rose-500 mt-4 font-bold animate-pulse">
              * Por favor completa todos los campos requeridos
            </p>
          )}
        </div>
      </form>

      {/* Resumen de Precios */}
      <div className="lg:col-span-4 lg:sticky lg:top-8">
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-slate-900/40 border border-slate-800">
          <h4 className="text-xl font-black mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            Resumen de Pago
          </h4>

          <div className="space-y-6 mb-10">
            <div className="flex justify-between items-center group">
              <div>
                <span className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
                  Adultos
                </span>
                <span className="text-sm font-medium">
                  {numAdults} x {formatPrice(adultPrice)}
                </span>
              </div>
              <span className="text-lg font-bold">
                {formatPrice(subtotalAdults)}
              </span>
            </div>

            {numChildren > 0 && (
              <div className="flex justify-between items-center group">
                <div>
                  <span className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
                    Niños
                  </span>
                  <span className="text-sm font-medium">
                    {numChildren} x {formatPrice(childPrice)}
                  </span>
                </div>
                <span className="text-lg font-bold">
                  {formatPrice(subtotalChildren)}
                </span>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-slate-800">
            <div className="flex justify-between items-end mb-2">
              <span className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">
                Total Final
              </span>
              <span className="text-teal-400 text-sm font-black">MXN</span>
            </div>
            <div className="text-5xl font-black text-white tracking-tighter">
              {formatPrice(total).replace("MXN", "").trim()}
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] leading-relaxed text-slate-400 uppercase font-bold tracking-wider text-center">
              Tu reserva quedará en estado{" "}
              <span className="text-amber-400">pendiente</span> hasta que un
              asesor confirme vía WhatsApp.
            </p>
          </div>
        </div>

        {/* Garantía */}
        <div className="mt-6 flex items-center justify-center gap-4 text-slate-400">
          <CheckCircle2 className="w-5 h-5 text-teal-600" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Pago 100% Seguro
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
