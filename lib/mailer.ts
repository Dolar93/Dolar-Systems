import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ?? 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT ?? '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export interface ContactPayload {
  name: string
  company: string
  phone: string
  message?: string
  branch?: string
}

export async function sendContactEmail(data: ContactPayload) {
  const { name, company, phone, message, branch } = data

  await transporter.sendMail({
    from: `"Dolar Systems" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_TO ?? 'dolar@dolar-systems.pl',
    replyTo: undefined,
    subject: `[DS] Nowe zapytanie — ${company} (${name})`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:monospace;background:#0A0A0A;color:#F5F5F5;padding:32px;margin:0;">
        <div style="max-width:560px;margin:0 auto;">
          <div style="border-bottom:1px solid #1E1E1E;padding-bottom:16px;margin-bottom:24px;">
            <span style="color:#00D4FF;font-size:18px;font-weight:bold;letter-spacing:.15em;">
              DOLAR<span style="color:#F5F5F5;">_</span>SYSTEMS
            </span>
          </div>
          <h2 style="color:#00D4FF;font-size:13px;letter-spacing:.2em;margin-bottom:24px;">
            NOWE ZAPYTANIE // ${new Date().toLocaleString('pl-PL')}
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="color:#444;padding:10px 0;font-size:11px;letter-spacing:.15em;width:140px;vertical-align:top;">IMIĘ I NAZWISKO</td>
              <td style="color:#F5F5F5;padding:10px 0;font-size:13px;">${name}</td>
            </tr>
            <tr style="border-top:1px solid #1A1A1A;">
              <td style="color:#444;padding:10px 0;font-size:11px;letter-spacing:.15em;vertical-align:top;">FIRMA</td>
              <td style="color:#F5F5F5;padding:10px 0;font-size:13px;">${company}</td>
            </tr>
            <tr style="border-top:1px solid #1A1A1A;">
              <td style="color:#444;padding:10px 0;font-size:11px;letter-spacing:.15em;vertical-align:top;">BRANŻA</td>
              <td style="color:#F5F5F5;padding:10px 0;font-size:13px;">${branch ?? '—'}</td>
            </tr>
            <tr style="border-top:1px solid #1A1A1A;">
              <td style="color:#444;padding:10px 0;font-size:11px;letter-spacing:.15em;vertical-align:top;">TELEFON</td>
              <td style="color:#00D4FF;padding:10px 0;font-size:14px;font-weight:bold;">${phone}</td>
            </tr>
            <tr style="border-top:1px solid #1A1A1A;">
              <td style="color:#444;padding:10px 0;font-size:11px;letter-spacing:.15em;vertical-align:top;">WIADOMOŚĆ</td>
              <td style="color:#888;padding:10px 0;font-size:13px;line-height:1.6;">${message ?? '—'}</td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `,
  })
}
