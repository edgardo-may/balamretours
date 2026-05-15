// src/services/bookingEmailService.ts
// Handles calling the Supabase Edge Function to send confirmation emails.
// Call this AFTER a reservation is successfully created in the database.

import { supabase } from '../lib/supabase';

export interface BookingEmailPayload {
  booking_id: string;
  folio: string;
  nombre_cliente: string;
  email_cliente: string;
  tour_nombre: string;
  fecha: string;
  adultos: number;
  menores: number;
  total: number;
  pick_up?: string;
}

interface EmailResult {
  success: boolean;
  email_id?: string;
  message?: string;
  error?: string;
}

/**
 * Invokes the `send-booking-confirmation` Supabase Edge Function.
 * Does NOT throw – returns a result object so the caller can handle gracefully.
 */
export async function sendBookingConfirmation(payload: BookingEmailPayload): Promise<EmailResult> {
  try {
    const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
      body: payload,
    });

    if (error) {
      console.error('[bookingEmailService] Edge Function invocation error:', error);
      return { success: false, error: error.message };
    }

    return data as EmailResult;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[bookingEmailService] Unexpected error:', message);
    return { success: false, error: message };
  }
}
