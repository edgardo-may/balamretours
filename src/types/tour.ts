export interface DBTour {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  duracion: number;
  duracion_tipo: string;
  incluye: string; // En tu DB es text, probablemente separado por comas o saltos de línea
  no_incluye: string;
  recomendaciones: string;
  ubicacion: string;
  categoria: string;
  categoria_id: string;
  nivel: string;
  idiomas: string;
  tags: string;
  activo: boolean;
  principal: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBTourPrice {
  id: string;
  tour_id: string;
  precio_adulto: number | null;
  precio_menor: number | null;
  moneda: string;
  label?: string;
}

export interface DBTourImage {
  id: string;
  tour_id: string;
  url: string;
  is_main: boolean;
}

export interface DBTourAvailability {
  id: string;
  tour_id: string;
  date: string;
  spots_available: number;
}

// Composite Type for Frontend
export interface TourWithDetails extends DBTour {
  prices: DBTourPrice[];
  images: DBTourImage[];
  availability: DBTourAvailability[];
}

export interface Reservation {
  id?: string;
  tour_id: string;
  fecha: string;
  adultos: number;
  menores: number;
  total: number;
  folio_reservacion: string;
  pick_up?: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  cliente_id?: string;
  nombre_cliente?: string;
  email_cliente?: string;
  telefono_cliente?: string;
  created_at?: string;
}
