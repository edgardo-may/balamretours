import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { TourWithDetails } from "../types/tour";

export function useTourDetailsPro(id: string | null) {
  const [tour, setTour] = useState<TourWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchTour() {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: supabaseError } = await supabase
          .from("tours")
          .select(`
            *,
            prices:precio_tours(*),
            images:tour_images(*),
            availability:tour_fechas_disponibilidad(*)
          `)
          .eq("id", id)
          .single();

        if (supabaseError) throw supabaseError;
        setTour(data as TourWithDetails);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTour();
  }, [id]);

  return { tour, loading, error };
}
