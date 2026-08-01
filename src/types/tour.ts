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
  tipo_tour: 'colectivo' | 'privado';
  activo: boolean;
  mostrar_home: boolean;
  oferta: boolean;
  precio_oferta?: number;
  porcentaje_descuento?: number;
  fecha_inicio_oferta?: string;
  fecha_fin_oferta?: string;
  created_at: string;
  updated_at: string;
}

export interface DBOffer {
  id: string;
  tour_id?: string | null;
  titulo: string;
  descripcion: string;
  descuento?: number;
  precio_original?: number;
  precio_oferta?: number;
  imagen_url?: string;
  ubicacion?: string;
  activa: boolean;
  fecha_fin?: string;
  created_at: string;
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

// ── Cotización de Transporte Privado ──────────────────────────────────────────
export type TransportVehicleType = 'sedan' | 'suv' | 'van' | 'sprinter';
export type TransportQuotationStatus = 'pendiente' | 'contactado' | 'confirmado' | 'rechazado';

export interface TransportQuotation {
  id?: string;
  folio?: string;
  // Datos del cliente
  nombre: string;
  telefono: string;
  email?: string;
  // Detalle del servicio
  fecha_servicio: string;
  hora_aproximada?: string;
  lugar_recogida: string;
  destino: string;
  num_pasajeros: number;
  // Preferencias
  tipo_vehiculo?: TransportVehicleType;
  equipaje?: string;
  comentarios?: string;
  // Administración (para panel futuro)
  estado?: TransportQuotationStatus;
  notas_internas?: string;
  created_at?: string;
}

// ── Formulario de Contacto ───────────────────────────────────────────────────
export interface ContactMessage {
  id?: string;
  nombre: string;
  email: string;
  asunto?: string;
  mensaje: string;
  ip?: string;
  user_agent?: string;
  created_at?: string;
  updated_at?: string;
}
