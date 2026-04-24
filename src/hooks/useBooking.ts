import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Reservation } from '../types/tour';
import { toast } from 'sonner';

export function useBooking() {
  const [loading, setLoading] = useState(false);

  const createReservation = async (reservation: Omit<Reservation, 'id' | 'folio_reservacion' | 'estado' | 'created_at'>) => {
    try {
      setLoading(true);
      
      // 1. Registrar Cliente primero (para normalización de DB)
      // Extraemos los datos del cliente del objeto de reservación
      const { data: cliente, error: cliErr } = await supabase
        .from('clientes')
        .insert({
          nombre: reservation.nombre_cliente,
          email: reservation.email_cliente,
          telefono: reservation.telefono_cliente,
        })
        .select('id')
        .single();

      if (cliErr) throw cliErr;

      // 2. Generar folio único
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 5).toUpperCase();
      const folio = `BR-${timestamp}-${random}`;

      // 3. Crear Reservación vinculada al cliente
      // Eliminamos los campos "virtuales" del cliente antes de insertar en reservaciones
      const { nombre_cliente, email_cliente, telefono_cliente, ...reservationData } = reservation;

      const newReservation = {
        ...reservationData,
        cliente_id: cliente.id,
        folio_reservacion: folio,
        estado: 'pendiente',
      };

      const { data, error } = await supabase
        .from('reservaciones')
        .insert([newReservation])
        .select()
        .single();

      if (error) throw error;

      toast.success('Reserva confirmada. Folio: ' + folio);
      return { data, folio };
    } catch (error: any) {
      console.error('Error creating reservation:', error);
      toast.error('Error al procesar reserva: ' + error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return { createReservation, loading };
}
