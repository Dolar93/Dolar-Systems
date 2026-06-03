import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, type ContactPayload } from '@/lib/mailer'

/* Simple in-memory rate limiter — resets on cold start.
   For stateful rate limiting in production use Upstash Redis. */
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT) return true

  entry.count++
  return false
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Zbyt wiele zapytań. Spróbuj za godzinę.' },
      { status: 429 },
    )
  }

  let body: Partial<ContactPayload & { consent: boolean }>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowy format danych.' }, { status: 400 })
  }

  const { name, company, phone, message, branch, consent } = body

  if (!name?.trim() || !company?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: 'Wypełnij wszystkie wymagane pola (imię, firma, telefon).' },
      { status: 400 },
    )
  }

  if (!consent) {
    return NextResponse.json(
      { error: 'Wymagana akceptacja przetwarzania danych osobowych.' },
      { status: 400 },
    )
  }

  try {
    await sendContactEmail({
      name: name.trim(),
      company: company.trim(),
      phone: phone.trim(),
      message: message?.trim(),
      branch,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[kontakt] Email send error:', err)
    return NextResponse.json(
      { error: 'Błąd serwera. Spróbuj ponownie lub napisz bezpośrednio.' },
      { status: 500 },
    )
  }
}
