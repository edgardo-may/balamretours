// Supabase Edge Function: send-booking-confirmation
// Runtime: Deno (Supabase native)
// Sends a professional HTML confirmation email via Resend after a booking is created.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { buildConfirmationEmail } from "./emailTemplate.ts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingPayload {
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

interface ApiResponse {
  success: boolean;
  message: string;
  email_id?: string;
  error?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
  "https://balamretours.com",
  "https://www.balamretours.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
};

// Simple in-memory rate limiter: max 5 requests per IP per 60 seconds
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getOriginHeaders(requestOrigin: string | null): Record<string, string> {
  const origin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];
  return { "Access-Control-Allow-Origin": origin, ...CORS_HEADERS };
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeString(value: unknown, maxLen = 300): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[<>]/g, "").slice(0, maxLen);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function jsonResponse(body: ApiResponse, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

serve(async (req: Request): Promise<Response> => {
  const requestOrigin = req.headers.get("origin");
  const corsHeaders = getOriginHeaders(requestOrigin);

  // Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only POST allowed
  if (req.method !== "POST") {
    return jsonResponse({ success: false, message: "Method not allowed" }, 405, corsHeaders);
  }

  // Rate limiting by IP
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(clientIp)) {
    console.warn(`[send-booking-confirmation] Rate limit exceeded for IP: ${clientIp}`);
    return jsonResponse({ success: false, message: "Too many requests. Please try again later." }, 429, corsHeaders);
  }

  // Parse & validate body
  let payload: BookingPayload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ success: false, message: "Invalid JSON body" }, 400, corsHeaders);
  }

  // Required fields
  const requiredFields: (keyof BookingPayload)[] = [
    "booking_id", "folio", "nombre_cliente", "email_cliente",
    "tour_nombre", "fecha", "adultos", "total",
  ];

  for (const field of requiredFields) {
    if (payload[field] === undefined || payload[field] === null || payload[field] === "") {
      console.error(`[send-booking-confirmation] Missing required field: ${field}`);
      return jsonResponse({ success: false, message: `Missing required field: ${field}` }, 400, corsHeaders);
    }
  }

  // Sanitize & validate
  const booking: BookingPayload = {
    booking_id: sanitizeString(payload.booking_id),
    folio:         sanitizeString(payload.folio),
    nombre_cliente: sanitizeString(payload.nombre_cliente),
    email_cliente:  sanitizeString(payload.email_cliente),
    tour_nombre:    sanitizeString(payload.tour_nombre),
    fecha:          sanitizeString(payload.fecha),
    adultos:        Number(payload.adultos) || 0,
    menores:        Number(payload.menores) || 0,
    total:          Number(payload.total) || 0,
    pick_up:        sanitizeString(payload.pick_up ?? ""),
  };

  if (!validateEmail(booking.email_cliente)) {
    return jsonResponse({ success: false, message: "Invalid email address" }, 400, corsHeaders);
  }

  // ENV vars
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const FROM_EMAIL     = Deno.env.get("FROM_EMAIL")    ?? "reservaciones@balamretours.com";
  const COMPANY_NAME   = Deno.env.get("COMPANY_NAME")  ?? "Balam Re Tours";
  const SUPPORT_EMAIL  = Deno.env.get("SUPPORT_EMAIL") ?? "soporte@balamretours.com";

  if (!RESEND_API_KEY) {
    console.error("[send-booking-confirmation] RESEND_API_KEY is not set");
    return jsonResponse({ success: false, message: "Email service not configured" }, 500, corsHeaders);
  }

  // Build email
  const htmlBody = buildConfirmationEmail({ booking, companyName: COMPANY_NAME, supportEmail: SUPPORT_EMAIL });

  const emailPayload = {
    from: `${COMPANY_NAME} <${FROM_EMAIL}>`,
    to:   [booking.email_cliente],
    subject: `Confirmación de Reserva – ${booking.tour_nombre}`,
    html: htmlBody,
    reply_to: SUPPORT_EMAIL,
  };

  // Send via Resend
  console.info(`[send-booking-confirmation] Sending email to ${booking.email_cliente} | folio: ${booking.folio}`);

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(emailPayload),
  });

  const resendData = await resendRes.json();

  if (!resendRes.ok) {
    console.error("[send-booking-confirmation] Resend error:", JSON.stringify(resendData));
    return jsonResponse(
      { success: false, message: "Failed to send confirmation email", error: resendData.message ?? "Unknown error" },
      502,
      corsHeaders,
    );
  }

  console.info(`[send-booking-confirmation] Email sent successfully | id: ${resendData.id}`);
  return jsonResponse(
    { success: true, message: "Confirmation email sent successfully", email_id: resendData.id },
    200,
    corsHeaders,
  );
});
