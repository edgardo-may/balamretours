/**
 * useContactForm
 *
 * Hook que encapsula la lógica para enviar mensajes de contacto
 * a la tabla `contacto` de Supabase.
 *
 * ── SQL para crear la tabla (ejecutar en el dashboard de Supabase) ───────────
 *
 * CREATE TABLE IF NOT EXISTS contacto (
 *   id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   nombre      TEXT NOT NULL,
 *   email       TEXT NOT NULL,
 *   asunto      TEXT,
 *   mensaje     TEXT NOT NULL,
 *   ip          TEXT,
 *   user_agent  TEXT,
 *   created_at  TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at  TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_contacto_email ON contacto (email);
 * CREATE INDEX idx_contacto_created_at ON contacto (created_at DESC);
 *
 * ALTER TABLE contacto ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Allow public insert" ON contacto
 *   FOR INSERT WITH CHECK (true);
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { sendContactNotification } from "../services/contactEmailService";
import type { ContactMessage } from "../types/tour";

type SubmitInput = Pick<ContactMessage, "nombre" | "email" | "asunto" | "mensaje">;

/** Sanitiza texto: trim + remueve tags HTML para prevenir XSS almacenado */
function sanitize(value: string): string {
  return value.trim().replace(/<[^>]*>/g, "");
}

export function useContactForm() {
  const [loading, setLoading] = useState(false);

  const submitContact = async (input: SubmitInput) => {
    setLoading(true);

    try {
      const sanitized = {
        nombre: sanitize(input.nombre),
        email: sanitize(input.email).toLowerCase(),
        asunto: input.asunto ? sanitize(input.asunto) : null,
        mensaje: sanitize(input.mensaje),
        user_agent: navigator.userAgent || null,
      };

      const { error } = await supabase
        .from("contacto")
        .insert([sanitized]);

      if (error) throw error;

      toast.success("¡Mensaje enviado con éxito!", {
        description: "Nos pondremos en contacto contigo pronto.",
        duration: 5000,
      });

      // Non-blocking email notification (same pattern as useBooking)
      sendContactNotification({
        nombre: sanitized.nombre,
        email: sanitized.email,
        asunto: sanitized.asunto || undefined,
        mensaje: sanitized.mensaje,
      }).then((result) => {
        if (!result.success) {
          console.warn(
            "[useContactForm] Email notification failed:",
            result.error,
          );
        }
      });

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      console.error("[useContactForm] Error:", err);
      toast.error("No se pudo enviar el mensaje", {
        description: msg,
      });
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading };
}
