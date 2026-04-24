import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Reservation } from '../types/tour';
import { toast } from 'sonner';

export function useBooking() {
  const [loading, setLoading] = useState(false);

  const createReservation = async (reservation: Omit<Reservation, 'id' | 'folio_reservacion' | 'estado' | 'created_at'>) => {
    try {
      setLoading(true);
      
      // Generate unique folio
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 5).toUpperCase();
      const folio = `BR-${timestamp}-${random}`;

      const newReservation: Reservation = {
        ...reservation,
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
