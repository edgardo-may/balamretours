import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface TourDateAvailability {
  id: string;
  tour_id: string;
  fecha: string;
  cupos_totales: number;
  cupos_disponibles: number;
}

export function useTourDates(tourId: string) {
  const [dates, setDates] = useState<TourDateAvailability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDates() {
      try {
        setLoading(true);
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;
        const { data, error } = await supabase
          .from('tour_fechas_disponibilidad')
          .select('*')
          .eq('tour_id', tourId)
          .gte('fecha', todayStr)
          .order('fecha', { ascending: true });

        if (error) throw error;
        setDates(data || []);
      } catch (err) {
        console.error('Error fetching tour dates:', err);
      } finally {
        setLoading(false);
      }
    }

    if (tourId) {
      fetchDates();
    }
  }, [tourId]);

  return { dates, loading };
}
