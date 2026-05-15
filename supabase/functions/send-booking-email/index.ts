import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORS OPTIONS Handler
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, nombre } = await req.json()

    if (!email || !nombre) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos obligatorios: email y nombre.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const SITE_URL = Deno.env.get('SITE_URL') || 'https://balamretours.com'

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY no está configurada.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const confirmUrl = `${SITE_URL}/confirm?email=${encodeURIComponent(email)}`

    // Construir HTML del correo profesional
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirma tu correo electrónico</title>
      <style>
        body { margin:0; padding:0; background-color:#f8fafc; font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif; }
        .wrapper { width:100%; table-layout:fixed; background-color:#f8fafc; padding-bottom:40px; padding-top:40px; }
        .main-card { max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background-color:#0f172a; padding:32px; text-align:center; }
        .logo { max-height:48px; }
        .content { padding:40px 32px; }
        .title { color:#0f172a; font-size:24px; font-weight:800; margin-bottom:16px; margin-top:0; }
        .text { color:#475569; font-size:16px; line-height:24px; margin-bottom:32px; margin-top:0; }
        .btn-wrapper { text-align:center; margin-bottom:32px; }
        .btn { display:inline-block; background-color:#0d9488; color:#ffffff; font-size:16px; font-weight:700; text-decoration:none; padding:16px 32px; border-radius:12px; transition: background-color 0.2s; }
        .footer { background-color:#f1f5f9; padding:24px; text-align:center; border-top:1px solid #e2e8f0; }
        .footer-text { color:#94a3b8; font-size:12px; margin:0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="main-card">
          <div class="header">
            <h1 style="color:#2dd4bf; margin:0; font-weight:900; font-size:28px;">Balam RE Tours</h1>
          </div>
          <div class="content">
            <h2 class="title">¡Hola, ${nombre}! 👋</h2>
            <p class="text">
              Gracias por ponerte en contacto con nosotros. Para confirmar tu dirección de correo electrónico y asegurar que recibas todas las notificaciones de tus reservas, haz clic en el botón de confirmación de abajo.
            </p>
            <div class="btn-wrapper">
              <a href="${confirmUrl}" target="_blank" class="btn">Confirmar Correo Electrónico</a>
            </div>
            <p class="text" style="font-size:14px; margin-bottom:0;">
              Si tú no realizaste esta acción, puedes ignorar este correo sin problemas.
            </p>
          </div>
          <div class="footer">
            <p class="footer-text">© 2026 Balam RE Tours. Riviera Maya, México.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `

    const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev';

    // Enviar a Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Balam RE Tours <${FROM_EMAIL}>`,
        to: [email],
        subject: 'Confirma tu correo electrónico - Balam RE Tours',
        html: htmlContent,
      }),
    })

    const resData = await res.json()

    if (!res.ok) {
      throw new Error(resData.message || 'Error en Resend API')
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
