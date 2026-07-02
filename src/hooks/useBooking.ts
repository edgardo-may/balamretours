import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { Reservation } from "../types/tour";
import { toast } from "sonner";
import { sendBookingConfirmation } from "../services/bookingEmailService";

// Extended input to accept tour_nombre for the confirmation email
interface CreateReservationInput extends Omit<
  Reservation,
  "id" | "folio_reservacion" | "estado" | "created_at"
> {
  tour_nombre?: string; // Human-readable tour name for the email subject & body
}

export function useBooking() {
  const [loading, setLoading] = useState(false);

  const createReservation = async (reservation: CreateReservationInput) => {
    try {
      setLoading(true);

      // 1. Registrar Cliente primero (para normalización de DB)
      const { data: cliente, error: cliErr } = await supabase
        .from("clientes")
        .insert({
          nombre: reservation.nombre_cliente,
          email: reservation.email_cliente,
          telefono: reservation.telefono_cliente,
        })
        .select("id")
        .single();

      if (cliErr) throw cliErr;

      // 2. Generar folio único
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 5).toUpperCase();
      const folio = `BR-${timestamp}-${random}`;

      // 3. Crear Reservación vinculada al cliente
      const {
        nombre_cliente,
        email_cliente,
        telefono_cliente,
        tour_nombre,
        ...reservationData
      } = reservation;

      const newReservation = {
        ...reservationData,
        cliente_id: cliente.id,
        folio_reservacion: folio,
        estado: "pendiente",
      };

      const { data, error } = await supabase
        .from("reservaciones")
        .insert([newReservation])
        .select()
        .single();

      if (error) throw error;

      toast.success("Reserva confirmada. Folio: " + folio);

      // 4. Enviar email de confirmación (non-blocking – no bloquea el flujo UI)
      if (email_cliente) {
        sendBookingConfirmation({
          booking_id: data.id ?? "",
          folio,
          nombre_cliente: nombre_cliente ?? "",
          email_cliente,
          tour_nombre: tour_nombre ?? "Tour Balam Re",
          fecha: reservation.fecha,
          adultos: reservation.adultos,
          menores: reservation.menores ?? 0,
          total: reservation.total,
          pick_up: reservation.pick_up,
        }).then((result) => {
          if (!result.success) {
            console.warn(
              "[useBooking] Email confirmation failed:",
              result.error,
            );
          } else {
            console.info(
              "[useBooking] Confirmation email sent:",
              result.email_id,
            );
          }
        });
      }

      return { data, folio };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      console.error("Error creating reservation:", error);
      toast.error("Error al procesar reserva: " + msg);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return { createReservation, loading };
}
