// src/services/contactEmailService.ts
// Handles calling the Supabase Edge Function to send contact notification emails.
// Call this AFTER a contact message is successfully saved in the database.

import { supabase } from "../lib/supabase";

export interface ContactEmailPayload {
  nombre: string;
  email: string;
  asunto?: string;
  mensaje: string;
}

interface EmailResult {
  success: boolean;
  email_id?: string;
  message?: string;
  error?: string;
}

/**
 * Invokes the `send-contact-notification` Supabase Edge Function.
 * Does NOT throw – returns a result object so the caller can handle gracefully.
 * If the Edge Function doesn't exist yet, fails silently with a warning.
 */
export async function sendContactNotification(
  payload: ContactEmailPayload,
): Promise<EmailResult> {
  try {
    const { data, error } = await supabase.functions.invoke(
      "send-contact-notification",
      {
        body: payload,
      },
    );

    if (error) {
      console.warn(
        "[contactEmailService] Edge Function invocation error:",
        error,
      );
      return { success: false, error: error.message };
    }

    return data as EmailResult;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn("[contactEmailService] Unexpected error:", message);
    return { success: false, error: message };
  }
}
