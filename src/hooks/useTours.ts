import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { TourWithDetails } from "../types/tour";

export function useHomeTours() {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);

        const { data, error: supabaseError } = await supabase
          .from("tours")
          .select(
            `
            *,
            prices:precio_tours(*),
            images:tour_images(*),
            availability:tour_fechas_disponibilidad(*)
          `,
          )
          .eq("principal", true)
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;
        setTours(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  return { tours, loading, error };
}
