import { useState, useRef, useEffect } from "react";
import type { FC, FormEvent } from "react";
import {
  CheckCircle2,
  CreditCard,
  ChevronRight,
  ChevronDown,
  Calendar,
} from "lucide-react";
import Button from "../Ui/Button";
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
    name: "",
    email: "",
    phone: "",
    date: "",
    adults: "1",
    children: "0",
    pickup: "",
  });

  const prices = Array.isArray(tour.prices)
    ? tour.prices
    : tour.prices
      ? [tour.prices]
      : [];
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
      // Registrar Cliente
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

      // Registrar Reservación
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
        await fetch(
          "https://azfqkxithtocwgbysfjr.supabase.co/functions/v1/send-booking-email",
          {
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
                booking_id: folio, // o usa el ID real si lo tienes
              },
            }),
          },
        );
      } catch (emailErr) {
        console.error("Error al enviar el correo de confirmación:", emailErr);
      }
    } catch (err: any) {
      toast.error("Error al procesar la reserva: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-teal-50 rounded-[2.5rem] border border-teal-100">
        <div className="w-16 h-16 bg-white text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          ¡Aventura Reservada!
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          Tu folio es:{" "}
          <span className="font-black text-teal-600">{reservationFolio}</span>
        </p>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Un asesor se pondrá en contacto contigo en los próximos minutos para
          confirmar los detalles finales.
        </p>
      </div>
    );
  }

  const availability = Array.isArray(tour.availability)
    ? tour.availability
    : tour.availability
      ? [tour.availability]
      : [];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50">
      <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
        <CreditCard className="w-6 h-6 text-teal-600" />
        Reserva tu Lugar
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Nombre Completo
          </label>
          <input
            required
            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-sm"
            placeholder="Ej. Juan Pérez"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Email
            </label>
            <input
              required
              type="email"
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-sm"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              WhatsApp
            </label>
            <input
              required
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-sm"
              placeholder="+52 ..."
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Punto de Pickup / Hotel
          </label>
          <input
            required
            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-sm"
            placeholder="¿Dónde pasamos por ti?"
            value={formData.pickup}
            onChange={(e) =>
              setFormData({ ...formData, pickup: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-center block">
              Adultos
            </label>
            <select
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all font-black text-sm text-center appearance-none"
              value={formData.adults}
              onChange={(e) =>
                setFormData({ ...formData, adults: e.target.value })
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-center block">
              Niños
            </label>
            <select
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all font-black text-sm text-center appearance-none"
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

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Fecha
          </label>
          <div className="relative" ref={calendarRef}>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all font-black text-sm flex justify-between items-center text-left appearance-none"
            >
              <span
                className={formData.date ? "text-slate-900" : "text-slate-400"}
              >
                {formData.date || "Selecciona una fecha..."}
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
                  selectedDate={formData.date}
                  onSelectDate={(date) => {
                    setFormData({ ...formData, date: date });
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

        <div className="pt-6 border-t border-slate-50">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5 text-left">
                Total a Pagar
              </span>
              <span className="text-4xl font-black text-slate-900">
                ${total}
              </span>
              <span className="text-[10px] font-black text-teal-600 ml-1 uppercase">
                MXN
              </span>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full py-5 rounded-[1.5rem] bg-teal-600 text-black font-black uppercase tracking-widest shadow-xl shadow-teal-600/20 hover:bg-slate-900 hover:text-white transition-all"
          >
            Confirmar Reserva
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingFormPro;
