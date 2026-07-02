/**
 * useTransportQuotation
 *
 * Hook que encapsula la lógica para crear solicitudes de cotización de
 * transporte privado en la tabla `cotizaciones_transporte` de Supabase.
 *
 * ── SQL para crear la tabla (ejecutar en el dashboard de Supabase) ───────────
 *
 * CREATE TABLE IF NOT EXISTS cotizaciones_transporte (
 *   id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   folio           TEXT UNIQUE NOT NULL,
 *   nombre          TEXT NOT NULL,
 *   telefono        TEXT NOT NULL,
 *   email           TEXT,
 *   fecha_servicio  DATE NOT NULL,
 *   hora_aproximada TIME,
 *   lugar_recogida  TEXT NOT NULL,
 *   destino         TEXT NOT NULL,
 *   num_pasajeros   INT NOT NULL DEFAULT 1,
 *   tipo_vehiculo   TEXT,          -- sedan | suv | van | sprinter
 *   equipaje        TEXT,
 *   comentarios     TEXT,
 *   estado          TEXT NOT NULL DEFAULT 'pendiente',
 *   notas_internas  TEXT,
 *   created_at      TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- RLS: permitir inserts anónimos
 * ALTER TABLE cotizaciones_transporte ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Allow public insert" ON cotizaciones_transporte
 *   FOR INSERT WITH CHECK (true);
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import type { TransportQuotation } from '../types/tour';

type SubmitInput = Omit<TransportQuotation, 'id' | 'folio' | 'estado' | 'notas_internas' | 'created_at'>;

function generateFolio(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `TR-${timestamp}-${random}`;
}

export function useTransportQuotation() {
  const [loading, setLoading] = useState(false);

  const submitQuotation = async (input: SubmitInput) => {
    setLoading(true);
    const folio = generateFolio();

    try {
      const { error } = await supabase
        .from('cotizaciones_transporte')
        .insert([
          {
            folio,
            nombre: input.nombre,
            telefono: input.telefono,
            email: input.email || null,
            fecha_servicio: input.fecha_servicio,
            hora_aproximada: input.hora_aproximada || null,
            lugar_recogida: input.lugar_recogida,
            destino: input.destino,
            num_pasajeros: input.num_pasajeros,
            tipo_vehiculo: input.tipo_vehiculo || null,
            equipaje: input.equipaje || null,
            comentarios: input.comentarios || null,
            estado: 'pendiente',
          },
        ]);

      if (error) throw error;

      toast.success(`Solicitud enviada. Folio: ${folio}`, {
        description: 'Nos pondremos en contacto contigo a la brevedad.',
        duration: 6000,
      });

      return { success: true, folio };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      console.error('[useTransportQuotation] Error:', err);
      toast.error('No se pudo enviar la solicitud', {
        description: msg,
      });
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return { submitQuotation, loading };
}
