'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import StonePlate from '@/components/ui/StonePlate'
import { Reveal } from '@/components/animations/reveal'
import { STONE, FONT, CARVED, grout } from '@/components/ui/stone'

const BRANCHES = [
  { value: '', label: 'Wybierz branżę' },
  { value: 'wypozyczalnia', label: 'Wypożyczalnia sprzętu' },
  { value: 'klinika', label: 'Klinika / Stomatologia' },
  { value: 'salon', label: 'Salon / SPA premium' },
  { value: 'kancelaria', label: 'Kancelaria prawna' },
  { value: 'nieruchomosci', label: 'Agencja nieruchomości' },
  { value: 'deweloper', label: 'Deweloper' },
  { value: 'produkcja', label: 'Produkcja' },
  { value: 'inna', label: 'Inna' },
]

const PROCESS = [
  { n: '01', label: 'Bezpłatna analiza (30 min)' },
  { n: '02', label: 'Projekt architektury systemu' },
  { n: '03', label: 'Wdrożenie i testy' },
  { n: '04', label: 'Support + iteracje' },
]

const labelSt: React.CSSProperties = {
  display: 'block', fontFamily: FONT.mono, fontSize: '10px',
  letterSpacing: '0.16em', textTransform: 'uppercase',
  color: STONE.inkMuted, marginBottom: '8px',
}

/* Pola wyglądają jak wgłębienia wykute w płycie */
const inputSt: React.CSSProperties = {
  width: '100%', padding: '13px 14px',
  border: '1px solid rgba(51,71,28,0.28)',
  backgroundColor: 'rgba(216,209,191,0.42)',
  boxShadow: 'inset 0 2px 4px rgba(58,50,34,0.10)',
  color: STONE.ink, fontFamily: FONT.body, fontSize: '15px',
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', branch: '', phone: '', message: '', consent: false })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const focusEl = (el: HTMLElement) => {
    el.style.borderColor = STONE.moss
    el.style.boxShadow = `inset 0 2px 4px rgba(58,50,34,0.10), 0 0 0 3px rgba(79,107,40,0.18)`
  }
  const blurEl = (el: HTMLElement) => {
    el.style.borderColor = 'rgba(51,71,28,0.28)'
    el.style.boxShadow = 'inset 0 2px 4px rgba(58,50,34,0.10)'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent || status !== 'idle') return
    setStatus('sending')
    try {
      const res = await fetch('/api/kontakt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
    } catch { setStatus('error') }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm((f) => ({ ...f, [k]: val }))
  }

  return (
    <section id="kontakt" className="py-28" style={{ backgroundColor: STONE.deep, ...grout(84, 0.20) }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="05" label="KONTAKT" />
          <h2 className="carved" style={{ ...CARVED, fontSize: 'clamp(21px, 3.1vw, 32px)', color: STONE.ink, marginBottom: '1rem', lineHeight: 1.12 }}>
            Powiedz nam o swojej firmie.
          </h2>
          <p style={{ fontFamily: FONT.body, fontSize: '16px', color: STONE.inkSoft, lineHeight: 1.7 }}>
            Wrócimy w 24h z konkretną analizą — co da się zautomatyzować, ile to zajmie i ile kosztuje.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Formularz */}
          <Reveal className="lg:col-span-3">
            <StonePlate tone="light" accent={STONE.moss}>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" style={labelSt}>Imię i nazwisko *</label>
                    <input id="name" type="text" required autoComplete="name" value={form.name} onChange={set('name')} placeholder="Jan Kowalski" style={inputSt}
                      onFocus={(e) => focusEl(e.currentTarget)} onBlur={(e) => blurEl(e.currentTarget)} />
                  </div>
                  <div>
                    <label htmlFor="company" style={labelSt}>Firma *</label>
                    <input id="company" type="text" required autoComplete="organization" value={form.company} onChange={set('company')} placeholder="Nazwa firmy" style={inputSt}
                      onFocus={(e) => focusEl(e.currentTarget)} onBlur={(e) => blurEl(e.currentTarget)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="branch" style={labelSt}>Branża</label>
                    <select id="branch" value={form.branch} onChange={set('branch')} style={{ ...inputSt, cursor: 'pointer' }}
                      onFocus={(e) => focusEl(e.currentTarget)} onBlur={(e) => blurEl(e.currentTarget)}>
                      {BRANCHES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" style={labelSt}>Telefon *</label>
                    <input id="phone" type="tel" required autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="+48 000 000 000" style={inputSt}
                      onFocus={(e) => focusEl(e.currentTarget)} onBlur={(e) => blurEl(e.currentTarget)} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" style={labelSt}>Wiadomość</label>
                  <textarea id="message" value={form.message} onChange={set('message')} placeholder="Opisz proces, który zjada Wam najwięcej czasu..." rows={4} style={{ ...inputSt, resize: 'none' }}
                    onFocus={(e) => focusEl(e.currentTarget)} onBlur={(e) => blurEl(e.currentTarget)} />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.consent} onChange={set('consent')} className="mt-0.5 cursor-pointer" style={{ accentColor: STONE.moss, width: 17, height: 17 }} />
                  <span style={{ fontFamily: FONT.body, fontSize: '13px', color: STONE.inkSoft, lineHeight: 1.6 }}>
                    Akceptuję przetwarzanie danych osobowych zgodnie z Polityką Prywatności Dolar Systems.
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent' || !form.consent}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 w-full py-4 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200"
                  style={{
                    fontFamily: FONT.mono, fontSize: '12px', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    backgroundColor: status === 'sent' ? STONE.mossDeep : STONE.moss,
                    color: STONE.light, border: 'none',
                    boxShadow: `0 4px 0 ${STONE.mossDeep}`,
                  }}
                  onMouseEnter={(e) => { if (status === 'idle' && form.consent) e.currentTarget.style.backgroundColor = STONE.mossDeep }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = status === 'sent' ? STONE.mossDeep : STONE.moss }}
                >
                  {status === 'sent' ? (
                    <><CheckCircle2 size={15} aria-hidden /> Wysłano — odezwiemy się w 24h</>
                  ) : status === 'sending' ? 'Wysyłanie...' : (
                    <>Wyślij zapytanie <Send size={14} aria-hidden /></>
                  )}
                </motion.button>

                {status === 'error' && (
                  <p style={{ fontFamily: FONT.body, fontSize: '13px', color: '#9B3A2B' }}>
                    Nie udało się wysłać formularza. Napisz bezpośrednio na{' '}
                    <a href="mailto:dolar@dolar-systems.pl" style={{ color: '#9B3A2B', textDecoration: 'underline' }}>dolar@dolar-systems.pl</a>.
                  </p>
                )}
              </form>
            </StonePlate>
          </Reveal>

          {/* Panel informacyjny */}
          <Reveal delay={0.2} className="lg:col-span-2 flex flex-col gap-5">
            <StonePlate tone="light" accent={STONE.moss}>
              <div className="p-6 flex flex-col gap-4">
                {[
                  { Icon: Mail, text: 'dolar@dolar-systems.pl', href: 'mailto:dolar@dolar-systems.pl' },
                  { Icon: Clock, text: 'Odpowiedź w mniej niż 24h', href: null },
                  { Icon: MapPin, text: 'Polska / zdalnie', href: null },
                ].map(({ Icon, text, href }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${STONE.moss}1F`, border: `1px solid ${STONE.moss}44` }}>
                      <Icon size={14} style={{ color: STONE.moss }} aria-hidden />
                    </div>
                    {href ? (
                      <a href={href} className="transition-colors" style={{ fontFamily: FONT.body, fontSize: '15px', color: STONE.inkSoft }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = STONE.moss)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = STONE.inkSoft)}>
                        {text}
                      </a>
                    ) : (
                      <span style={{ fontFamily: FONT.body, fontSize: '15px', color: STONE.inkSoft }}>{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </StonePlate>

            <StonePlate tone="light" accent={STONE.moss} className="flex-1">
              <div className="p-6">
                <div style={{ fontFamily: FONT.mono, fontSize: '10px', color: STONE.inkMuted, letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                  Proces współpracy
                </div>
                {PROCESS.map(({ n, label }, i) => (
                  <motion.div key={n}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.45 }}
                    className="flex items-center gap-4 py-3.5"
                    style={{ borderBottom: i < PROCESS.length - 1 ? '1px solid rgba(51,71,28,0.16)' : 'none' }}
                  >
                    <span style={{ fontFamily: FONT.mono, fontSize: '11px', color: STONE.moss, minWidth: '1.5rem', letterSpacing: '0.1em' }}>{n}</span>
                    <span style={{ fontFamily: FONT.body, fontSize: '14.5px', color: STONE.inkSoft }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </StonePlate>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
