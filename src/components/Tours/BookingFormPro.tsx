import { useState, useRef, useEffect } from "react";
import type { FC, FormEvent } from "react";
import {
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Calendar,
  Users,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { TourWithDetails } from "../../types/tour";
import { toast } from "sonner";
import { useTourDates } from "../../hooks/useTourDates";
import TourCalendar from "../TourBooking/TourCalendar";

interface BookingFormProProps {
  tour: TourWithDetails;
}

const BookingFormPro: FC<BookingFormProProps> = ({ tour }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationFolio, setReservationFolio] = useState("");
  const { dates: tourDates, loading: loadingDates } = useTourDates(tour.id);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const isPrivado = tour.tipo_tour === "privado";

  useEffect(() => {
    if (showCalendar && calendarRef.current) {
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [showCalendar]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    adults: "1",
    children: "0",
    pickup: "",
  });

  const prices = Array.isArray(tour.prices) ? tour.prices : tour.prices ? [tour.prices] : [];
  const priceData = prices[0];
  const adultPrice = priceData?.precio_adulto || 0;
  const childPrice = priceData?.precio_menor || 0;
  const numAdults = parseInt(formData.adults);
  const numChildren = parseInt(formData.children);
  const total = numAdults * adultPrice + numChildren * childPrice;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      toast.error("Por favor, selecciona una fecha para tu reserva.");
      return;
    }
    setIsSubmitting(true);
    const folio = `BALAM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    try {
      const { data: cliente, error: cliErr } = await supabase
        .from("clientes")
        .insert({ nombre: formData.name, email: formData.email, telefono: formData.phone })
        .select("id")
        .single();

      if (cliErr) throw cliErr;

      const { error: resErr } = await supabase.from("reservaciones").insert({
        cliente_id: cliente.id,
        tour_id: tour.id,
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
      toast.success("¡Reserva confirmada con éxito!");

      try {
        await fetch("https://azfqkxithtocwgbysfjr.supabase.co/functions/v1/send-booking-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            booking: {
              tour_nombre: tour.nombre,
              fecha: formData.date,
              adultos: numAdults,
              menores: numChildren,
              total: total,
              nombre_cliente: formData.name,
              email: formData.email,
              telefono: formData.phone,
              pickup: formData.pickup,
              folio: folio,
              booking_id: folio,
            },
          }),
        });
      } catch (emailErr) {
        console.error("Error al enviar el correo:", emailErr);
      }
    } catch (err: any) {
      toast.error("Error al procesar la reserva: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="bg-cenote-50 rounded-3xl p-8 border border-cenote-100 text-center">
        <div className="w-16 h-16 bg-cenote-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-extrabold text-noche-900 mb-2">¡Aventura Reservada!</h3>
        <p className="text-noche-500 text-sm mb-5">
          Tu folio de reserva:{" "}
          <span className="font-extrabold text-cenote-600 bg-cenote-100 px-2 py-0.5 rounded">{reservationFolio}</span>
        </p>
        <div className="bg-white rounded-2xl p-4 border border-cenote-100 text-left">
          <p className="text-xs text-noche-500 leading-relaxed">
            📧 Te enviaremos un correo de confirmación con todos los detalles.
            Un asesor te contactará próximamente para coordinar los detalles finales.
          </p>
        </div>
        <a
          href={`https://wa.me/529983471258?text=${encodeURIComponent(`Hola, acabo de reservar el tour "${tour.nombre}" con el folio ${reservationFolio}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full justify-center mt-4 py-3.5"
        >
          <Phone className="w-4 h-4" />
          Confirmar por WhatsApp
        </a>
      </div>
    );
  }

  // ── Precio display ───────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-3xl border border-caliza-200 overflow-hidden"
      style={{ boxShadow: "0 4px 32px rgba(14,75,88,0.10)" }}
    >
      {/* Form header */}
      <div className={`px-7 py-5 border-b border-caliza-100 ${isPrivado ? "bg-tierra-50" : "bg-cenote-50"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-noche-900">Reserva tu lugar</h3>
            <p className="text-noche-500 text-xs mt-0.5">Confirmación inmediata · Sin sorpresas</p>
          </div>
          <div className="text-right">
            <span className="text-2xs font-bold uppercase tracking-widest text-noche-400 block mb-0.5">Desde</span>
            <span className="text-3xl font-extrabold text-noche-900">${adultPrice}</span>
            <span className="text-xs text-noche-400 ml-1">/ adulto</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-7 space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-2xs font-bold text-noche-500 uppercase tracking-widest">
            <User className="w-3.5 h-3.5" /> Nombre Completo
          </label>
          <input
            required
            className="input-tour"
            placeholder="Ej. Juan Pérez"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-2xs font-bold text-noche-500 uppercase tracking-widest">
              <Mail className="w-3.5 h-3.5" /> Email
            </label>
            <input
              required
              type="email"
              className="input-tour"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-2xs font-bold text-noche-500 uppercase tracking-widest">
              <Phone className="w-3.5 h-3.5" /> WhatsApp
            </label>
            <input
              required
              className="input-tour"
              placeholder="+52 ..."
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Pickup */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-2xs font-bold text-noche-500 uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" /> Punto de Recogida / Hotel
          </label>
          <input
            required
            className="input-tour"
            placeholder="¿Dónde pasamos por ti?"
            value={formData.pickup}
            onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
          />
        </div>

        {/* Guests */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center justify-center gap-1.5 text-2xs font-bold text-noche-500 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" /> Adultos
            </label>
            <select
              className="input-tour text-center appearance-none cursor-pointer"
              value={formData.adults}
              onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center justify-center gap-1.5 text-2xs font-bold text-noche-500 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" /> Niños
            </label>
            <select
              className="input-tour text-center appearance-none cursor-pointer"
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: e.target.value })}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-2xs font-bold text-noche-500 uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" /> Fecha
          </label>
          <div className="relative" ref={calendarRef}>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="input-tour flex justify-between items-center text-left w-full cursor-pointer"
            >
              <span className={formData.date ? "text-noche-900 font-semibold" : "text-noche-400"}>
                {formData.date || "Selecciona una fecha..."}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-noche-400 transition-transform flex-shrink-0 ${showCalendar ? "rotate-180" : ""}`}
              />
            </button>

            {showCalendar && (
              <div className="absolute top-full left-0 w-full mt-2 z-50 shadow-2xl rounded-2xl bg-white border border-caliza-200 overflow-hidden">
                <TourCalendar
                  dates={tourDates}
                  loading={loadingDates}
                  selectedDate={formData.date}
                  onSelectDate={(date) => {
                    setFormData({ ...formData, date });
                    setShowCalendar(false);
                    setTimeout(() => {
                      calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 50);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Price summary */}
        <div className="bg-caliza-50 rounded-2xl p-4 border border-caliza-200 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-noche-500">{numAdults} adulto{numAdults !== 1 ? "s" : ""} × ${adultPrice}</span>
            <span className="font-bold text-noche-800">${numAdults * adultPrice}</span>
          </div>
          {numChildren > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-noche-500">{numChildren} niño{numChildren !== 1 ? "s" : ""} × ${childPrice}</span>
              <span className="font-bold text-noche-800">${numChildren * childPrice}</span>
            </div>
          )}
          <div className="pt-2 border-t border-caliza-200 flex justify-between items-end">
            <span className="text-2xs font-bold uppercase tracking-widest text-noche-400">Total</span>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-noche-900">${total}</span>
              <span className="text-xs text-noche-400 ml-1">MXN</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-reserva w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Procesando...
            </span>
          ) : (
            <>
              Confirmar Reserva
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingFormPro;
