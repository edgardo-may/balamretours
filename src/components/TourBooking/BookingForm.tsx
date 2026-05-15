import { useState, useMemo, useRef, useEffect, type FC } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Users,
  MapPin,
  User,
  Mail,
  Phone,
  ShoppingCart,
  Loader2,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import type { TourWithDetails } from "../../types/tour";
import { useBooking } from "../../hooks/useBooking";
import { useTourDates } from "../../hooks/useTourDates";
import TourCalendar from "./TourCalendar";
import Button from "../Ui/Button";

interface BookingFormProps {
  tour: TourWithDetails;
}

const BookingForm: FC<BookingFormProps> = ({ tour }) => {
  const { createReservation, loading } = useBooking();
  const { dates: tourDates, loading: loadingDates } = useTourDates(tour.id);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showCalendar && calendarRef.current) {
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [showCalendar]);
  const [formData, setFormData] = useState({
    fecha: "",
    adultos: 1,
    ninos: 0,
    nombre: "",
    email: "",
    telefono: "",
    pickup: "",
  });

  const priceData = tour.prices[0]; // Simplified for demo
  const adultPrice = priceData?.precio_adulto || 0;
  const childPrice = priceData?.precio_menor || 0;

  const summary = useMemo(() => {
    const totalAdults = formData.adultos * adultPrice;
    const totalChildren = formData.ninos * childPrice;
    return {
      totalAdults,
      totalChildren,
      total: totalAdults + totalChildren,
    };
  }, [formData.adultos, formData.ninos, adultPrice, childPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fecha) {
      toast.error("Por favor, selecciona una fecha en el calendario.");
      return;
    }
    const result = await createReservation({
      tour_id: tour.id,
      tour_nombre: tour.nombre, // passed to Edge Function for email
      fecha: formData.fecha,
      adultos: formData.adultos,
      menores: formData.ninos,
      total: summary.total,
      nombre_cliente: formData.nombre,
      email_cliente: formData.email,
      telefono_cliente: formData.telefono,
      pick_up: formData.pickup,
    });

    if (result.folio) {
      setSuccess(result.folio);
      try {
        await fetch(
          "https://azfqkxithtocwgbysfjr.supabase.co/functions/v1/send-booking-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              email: formData.email,
              nombre: formData.nombre,
            }),
          },
        );
      } catch (err) {
        console.error("Error enviando email:", err);
      }
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-teal-100 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-teal-600" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          ¡Reserva Exitosa!
        </h3>
        <p className="text-slate-500 mb-6">
          Tu aventura está lista. Hemos enviado un correo con los detalles.
        </p>
        <div className="bg-slate-50 p-4 rounded-2xl mb-8">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Tu Folio de Confirmación
          </span>
          <span className="text-xl font-black text-teal-600">{success}</span>
        </div>
        <Button
          onClick={() => window.location.reload()}
          className="w-full bg-slate-900 text-white rounded-xl py-4 border-none"
        >
          Nueva Reservación
        </Button>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-8 flex flex-col gap-6">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Reservar Ahora</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fecha */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              Fecha del Tour
            </label>
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none text-left flex justify-between items-center"
              >
                <span
                  className={
                    formData.fecha ? "text-slate-900" : "text-slate-400"
                  }
                >
                  {formData.fecha || "Selecciona una fecha..."}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${showCalendar ? "rotate-180" : ""}`}
                />
              </button>

              {showCalendar && (
                <div className="absolute top-full left-0 w-full mt-2 z-50 shadow-2xl rounded-2xl bg-white border border-slate-100 overflow-hidden">
                  <TourCalendar
                    dates={tourDates}
                    loading={loadingDates}
                    selectedDate={formData.fecha}
                    onSelectDate={(date) => {
                      setFormData({ ...formData, fecha: date });
                      setShowCalendar(false);
                      setTimeout(() => {
                        calendarRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }, 50);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Pax */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Users className="w-4 h-4 text-teal-600" />
                Adultos
              </label>
              <select
                value={formData.adultos}
                onChange={(e) =>
                  setFormData({ ...formData, adultos: Number(e.target.value) })
                }
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Users className="w-4 h-4 text-teal-600" />
                Niños
              </label>
              <select
                value={formData.ninos}
                onChange={(e) =>
                  setFormData({ ...formData, ninos: Number(e.target.value) })
                }
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-4 pt-4 border-t border-slate-50">
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Nombre completo"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="Correo electrónico"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                placeholder="Teléfono"
                required
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Hotel / Punto de encuentro"
                value={formData.pickup}
                onChange={(e) =>
                  setFormData({ ...formData, pickup: e.target.value })
                }
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-3">
            <div className="flex justify-between text-slate-400 text-xs font-bold uppercase">
              <span>
                Adultos ({formData.adultos} x ${adultPrice})
              </span>
              <span>${summary.totalAdults}</span>
            </div>
            {formData.ninos > 0 && (
              <div className="flex justify-between text-slate-400 text-xs font-bold uppercase">
                <span>
                  Niños ({formData.ninos} x ${childPrice})
                </span>
                <span>${summary.totalChildren}</span>
              </div>
            )}
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-sm font-bold">Total a pagar</span>
              <span className="text-2xl font-black text-teal-400">
                ${summary.total}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-2xl py-5 border-none shadow-xl shadow-teal-100 disabled:opacity-50 transition-all duration-300"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <span className="text-sm font-black uppercase tracking-widest">
                Confirmar Reserva
              </span>
            )}
          </Button>
        </form>
      </div>

      <p className="text-center text-[10px] text-slate-400 font-medium px-4">
        Al confirmar, aceptas nuestros términos y condiciones. Los precios están
        en pesos mexicanos (MXN).
      </p>
    </div>
  );
};

export default BookingForm;
