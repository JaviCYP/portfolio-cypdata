import type { APIRoute } from "astro"
import sgMail from "@sendgrid/mail"

export const prerender = false

// ⚠️ API Key escrita directamente
sgMail.setApiKey(
  "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"
)

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("Llega al handler")
    const body = await request.json()
    const name = body.from_name || ""
    const email = body.reply_to || ""
    const message = body.message || ""

    const msg = {
      to: "alonso.molina@cypcore.com",
      from: "data@cypcore.com",
      subject: `Nuevo mensaje de ${name}`,
      text: `
          Mensaje enviado desde el formulario:
      
          Nombre: ${name}
          Email: ${email}
          Mensaje: ${message}
        `,
      replyTo: email, // esto permite responder directamente al remitente real
    }

    await sgMail.send(msg)

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error("Error en send.ts:", err)
    return new Response(JSON.stringify({ success: false }), { status: 500 })
  }
}
