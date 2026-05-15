// emailTemplate.ts
// Generates the premium HTML email body for booking confirmations.
// Designed to be compatible with Gmail, Outlook, and Apple Mail.

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

interface TemplateOptions {
  booking: BookingPayload;
  companyName: string;
  supportEmail: string;
}

function formatDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function buildConfirmationEmail({
  booking,
  companyName,
  supportEmail,
}: TemplateOptions): string {
  const formattedDate = formatDate(booking.fecha);
  const formattedTotal = formatCurrency(booking.total);
  const totalPax = booking.adultos + (booking.menores ?? 0);
  const paxLabel = `${booking.adultos} adulto${booking.adultos !== 1 ? "s" : ""}${booking.menores > 0 ? ` · ${booking.menores} niño${booking.menores !== 1 ? "s" : ""}` : ""}`;
  const pickUpRow = booking.pick_up
    ? `<tr>
        <td style="padding:8px 0;color:#64748b;font-size:14px;font-family:'Inter',Arial,sans-serif;">📍 Punto de encuentro</td>
        <td style="padding:8px 0;text-align:right;font-weight:700;color:#0f172a;font-size:14px;font-family:'Inter',Arial,sans-serif;">${booking.pick_up}</td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Confirmación de Reserva – ${booking.tour_nombre}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #f1f5f9; font-family: 'Inter', Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 16px !important; }
      .email-card { border-radius: 20px !important; }
      .header-logo { font-size: 22px !important; }
      .detail-table td { font-size: 13px !important; }
      .cta-btn { padding: 14px 24px !important; font-size: 14px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
  <!-- Email Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding:40px 16px;" class="email-wrapper">

        <!-- Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background:#ffffff;border-radius:28px;overflow:hidden;
                      box-shadow:0 20px 60px rgba(0,0,0,0.08);" class="email-card">

          <!-- ── HEADER ───────────────────────────────── -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f766e 0%,#0d9488 50%,#14b8a6 100%);padding:40px 40px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Logo / Brand -->
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;color:rgba(255,255,255,0.6);
                               font-family:'Inter',Arial,sans-serif;text-transform:uppercase;">
                      Tours &amp; Experiencias
                    </p>
                    <p style="margin:0;font-size:26px;font-weight:800;color:#ffffff;
                               font-family:'Inter',Arial,sans-serif;letter-spacing:-0.5px;" class="header-logo">
                      🌿 ${companyName}
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <!-- Badge -->
                    <span style="display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);
                                 color:#ffffff;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:6px 14px;
                                 border-radius:100px;font-family:'Inter',Arial,sans-serif;text-transform:uppercase;">
                      ✓ Confirmada
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── HERO SECTION ──────────────────────────── -->
          <tr>
            <td style="padding:40px 40px 0;">
              <!-- Success Icon -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px;">
                <tr>
                  <td align="center" style="width:72px;height:72px;background:linear-gradient(135deg,#ccfbf1,#99f6e4);
                                             border-radius:50%;font-size:32px;line-height:72px;">
                    🎉
                  </td>
                </tr>
              </table>
              <h1 style="margin:0 0 12px;font-size:28px;font-weight:800;color:#0f172a;text-align:center;
                         font-family:'Inter',Arial,sans-serif;letter-spacing:-0.5px;line-height:1.2;">
                Tu reserva ha sido<br/>confirmada
              </h1>
              <p style="margin:0 0 32px;font-size:16px;color:#64748b;text-align:center;
                        font-family:'Inter',Arial,sans-serif;line-height:1.6;">
                Hola <strong style="color:#0f172a;">${booking.nombre_cliente}</strong>,<br/>
                Gracias por elegir ${companyName}. Tu aventura está asegurada.
              </p>
            </td>
          </tr>

          <!-- ── FOLIO BADGE ───────────────────────────── -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background:linear-gradient(135deg,#f0fdfa,#ccfbf1);border:1.5px solid #99f6e4;
                            border-radius:16px;padding:20px 24px;">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;color:#0d9488;
                               font-family:'Inter',Arial,sans-serif;text-transform:uppercase;">
                      Folio de Confirmación
                    </p>
                    <p style="margin:0;font-size:24px;font-weight:800;color:#0f766e;letter-spacing:2px;
                               font-family:'Inter',Arial,sans-serif;">
                      ${booking.folio}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── BOOKING DETAILS ───────────────────────── -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background:#f8fafc;border-radius:20px;padding:24px;">
                <tr>
                  <td style="padding:0 0 16px;">
                    <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:2px;color:#94a3b8;
                               font-family:'Inter',Arial,sans-serif;text-transform:uppercase;">
                      Detalles de la Reserva
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                           class="detail-table">
                      <!-- Tour -->
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:12px 0;color:#64748b;font-size:14px;font-family:'Inter',Arial,sans-serif;">
                          🗺️ Tour
                        </td>
                        <td style="padding:12px 0;text-align:right;font-weight:700;color:#0f172a;font-size:14px;
                                   font-family:'Inter',Arial,sans-serif;">
                          ${booking.tour_nombre}
                        </td>
                      </tr>
                      <!-- Fecha -->
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:12px 0;color:#64748b;font-size:14px;font-family:'Inter',Arial,sans-serif;">
                          📅 Fecha
                        </td>
                        <td style="padding:12px 0;text-align:right;font-weight:700;color:#0f172a;font-size:14px;
                                   font-family:'Inter',Arial,sans-serif;">
                          ${formattedDate}
                        </td>
                      </tr>
                      <!-- Personas -->
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:12px 0;color:#64748b;font-size:14px;font-family:'Inter',Arial,sans-serif;">
                          👥 Personas
                        </td>
                        <td style="padding:12px 0;text-align:right;font-weight:700;color:#0f172a;font-size:14px;
                                   font-family:'Inter',Arial,sans-serif;">
                          ${paxLabel} (${totalPax} total)
                        </td>
                      </tr>
                      <!-- Pick-up (condicional) -->
                      ${pickUpRow}
                      <!-- ID Reserva -->
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:12px 0;color:#64748b;font-size:14px;font-family:'Inter',Arial,sans-serif;">
                          🔖 ID de Reserva
                        </td>
                        <td style="padding:12px 0;text-align:right;font-weight:600;color:#64748b;font-size:12px;
                                   font-family:'Inter',Arial,sans-serif;letter-spacing:0.5px;">
                          ${booking.booking_id}
                        </td>
                      </tr>
                      <!-- Total -->
                      <tr>
                        <td style="padding:16px 0 4px;font-size:15px;font-weight:700;color:#0f172a;
                                   font-family:'Inter',Arial,sans-serif;">
                          💳 Total pagado
                        </td>
                        <td style="padding:16px 0 4px;text-align:right;font-size:22px;font-weight:800;color:#0d9488;
                                   font-family:'Inter',Arial,sans-serif;letter-spacing:-0.5px;">
                          ${formattedTotal}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── CTA BUTTON ────────────────────────────── -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://balamretours.com"
                 style="display:inline-block;background:linear-gradient(135deg,#0f766e,#0d9488);color:#ffffff;
                        font-size:15px;font-weight:700;text-decoration:none;padding:16px 36px;
                        border-radius:14px;font-family:'Inter',Arial,sans-serif;letter-spacing:0.3px;
                        box-shadow:0 8px 24px rgba(13,148,136,0.35);"
                 class="cta-btn">
                Ver detalles de mi reserva →
              </a>
            </td>
          </tr>

          <!-- ── INFO BANNER ───────────────────────────── -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border-left:4px solid #f59e0b;
                            border-radius:0 12px 12px 0;padding:16px 20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#92400e;
                               font-family:'Inter',Arial,sans-serif;">
                      📋 Información importante
                    </p>
                    <p style="margin:0;font-size:13px;color:#78350f;line-height:1.6;
                               font-family:'Inter',Arial,sans-serif;">
                      Por favor, llega 15 minutos antes de la hora programada.
                      Guarda este correo como comprobante de tu reservación.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── DIVIDER ───────────────────────────────── -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" />
            </td>
          </tr>

          <!-- ── FOOTER ────────────────────────────────── -->
          <tr>
            <td style="padding:32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Contact Info -->
                  <td valign="top">
                    <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#0f172a;
                               font-family:'Inter',Arial,sans-serif;">
                      🌿 ${companyName}
                    </p>
                    <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;font-family:'Inter',Arial,sans-serif;">
                      ✉️ <a href="mailto:${supportEmail}" style="color:#0d9488;text-decoration:none;">${supportEmail}</a>
                    </p>
                    <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;font-family:'Inter',Arial,sans-serif;">
                      🌐 <a href="https://balamretours.com" style="color:#0d9488;text-decoration:none;">balamretours.com</a>
                    </p>
                    <!-- Redes sociales -->
                    <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;font-family:'Inter',Arial,sans-serif;">
                      <a href="https://instagram.com/balamretours" style="color:#0d9488;text-decoration:none;margin-right:8px;">Instagram</a>
                      <a href="https://facebook.com/balamretours" style="color:#0d9488;text-decoration:none;">Facebook</a>
                    </p>
                  </td>
                  <!-- Cancel Policy -->
                  <td valign="top" align="right" style="padding-left:16px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#cbd5e1;
                               font-family:'Inter',Arial,sans-serif;text-transform:uppercase;">
                      Cancelaciones
                    </p>
                    <p style="margin:0;font-size:11px;color:#94a3b8;font-family:'Inter',Arial,sans-serif;line-height:1.6;max-width:220px;">
                      Cancelación gratuita hasta 48h antes del tour.
                      Contacta a soporte para cambios.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── COPYRIGHT ─────────────────────────────── -->
          <tr>
            <td style="padding:16px 40px 28px;text-align:center;background:#f8fafc;border-radius:0 0 28px 28px;">
              <p style="margin:0;font-size:11px;color:#cbd5e1;font-family:'Inter',Arial,sans-serif;">
                © ${new Date().getFullYear()} ${companyName} · Todos los derechos reservados
                <br/>Este correo fue enviado automáticamente. No respondas directamente a este mensaje.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}
