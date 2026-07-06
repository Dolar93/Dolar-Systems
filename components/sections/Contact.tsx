'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'
import { FoldCorner, useCardFold } from '@/components/ui/FoldCorner'

const BRANCHES = [
  { value: '', label: 'Wybierz branżę' },
  { value: 'kancelaria', label: 'Kancelaria prawna' },
  { value: 'klinika', label: 'Klinika / Stomatologia' },
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
  display: 'block', fontFamily: 'var(--font-dm)', fontSize: '13px',
  fontWeight: 500, color: '#3D4F6B', marginBottom: '6px',
}

const inputSt: React.CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: '4px',
  border: '1.5px solid rgba(26,43,71,0.15)', backgroundColor: '#FAFAF8',
  color: '#1A2B47', fontFamily: 'var(--font-dm)', fontSize: '15px',
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
}

function PaperCard({ children, sz = 46, className = '', style = {} }: {
  children: React.ReactNode; sz?: number; className?: string; style?: React.CSSProperties
}) {
  const { hovered, ref, handlers } = useCardFold()
  return (
    <div style={{ position: 'relative' }}>
      <FoldCorner isOpen={hovered} sz={sz} bgRgb="250,250,248" />
      <div
        ref={ref}
        {...handlers}
        className={className}
        style={{
          backgroundColor: '#FAFAF8',
          border: '1px solid rgba(26,43,71,0.10)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: hovered
            ? '4px 14px 32px rgba(0,0,0,0.12)'
            : '2px 2px 0px rgba(0,0,0,0.05), 4px 4px 0px rgba(0,0,0,0.03), 8px 8px 16px rgba(0,0,0,0.07)',
          transition: 'box-shadow 0.3s ease, transform 0.25s ease',
          transform: hovered ? 'translateY(-3px)' : 'none',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', branch: '', phone: '', message: '', consent: false })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const focusEl = (el: HTMLElement) => {
    el.style.borderColor = '#C9A84C'
    el.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)'
  }
  const blurEl = (el: HTMLElement) => {
    el.style.borderColor = 'rgba(26,43,71,0.15)'
    el.style.boxShadow = 'none'
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
    <section id="kontakt" className="py-28" style={{ backgroundColor: '#EEEAE3' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="06" label="KONTAKT" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, fontStyle: 'italic', color: '#1A2B47', marginBottom: '1rem' }}>
            Powiedz nam o swojej firmie.
          </h2>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: '16px', color: '#3D4F6B' }}>
            Wrócimy w 24h z konkretną analizą.{' '}
            <span style={{ color: '#8A9AB5' }}>Bez bullshitu, bez ogólników.</span>
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form card */}
          <Reveal className="lg:col-span-3">
            <PaperCard sz={52}>
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
                  <textarea id="message" value={form.message} onChange={set('message')} placeholder="Opisz co chcesz zautomatyzować..." rows={4} style={{ ...inputSt, resize: 'none' }}
                    onFocus={(e) => focusEl(e.currentTarget)} onBlur={(e) => blurEl(e.currentTarget)} />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.consent} onChange={set('consent')} className="mt-0.5 cursor-pointer" style={{ accentColor: '#C9A84C' }} />
                  <span style={{ fontFamily: 'var(--font-dm)', fontSize: '13px', color: '#8A9AB5', lineHeight: 1.6 }}>
                    Akceptuję przetwarzanie danych osobowych zgodnie z Polityką Prywatności Dolar Systems.
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent' || !form.consent}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 w-full py-4 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                  style={{ fontFamily: 'var(--font-dm)', backgroundColor: status === 'sent' ? '#2D7A4F' : '#1A2B47', color: '#F5F3EF', borderRadius: '4px', border: 'none', fontSize: '15px' }}
                  onMouseEnter={(e) => { if (status === 'idle' && form.consent) { e.currentTarget.style.backgroundColor = '#C9A84C'; e.currentTarget.style.color = '#1A2B47' } }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = status === 'sent' ? '#2D7A4F' : '#1A2B47'; e.currentTarget.style.color = '#F5F3EF' }}
                >
                  {status === 'sent' ? (
                    <><CheckCircle2 size={15} aria-hidden /> Wysłano — odezwiemy się w 24h</>
                  ) : status === 'sending' ? 'Wysyłanie...' : (
                    <>Wyślij zapytanie <Send size={14} aria-hidden /></>
                  )}
                </motion.button>

                {status === 'error' && (
                  <p style={{ fontFamily: 'var(--font-dm)', fontSize: '13px', color: '#C0392B' }}>
                    Błąd wysyłania. Napisz bezpośrednio:{' '}
                    <a href="mailto:dolar@dolar-systems.pl" style={{ color: '#C0392B', textDecoration: 'underline' }}>dolar@dolar-systems.pl</a>
                  </p>
                )}
              </form>
            </PaperCard>
          </Reveal>

          {/* Info panel */}
          <Reveal delay={0.2} className="lg:col-span-2 flex flex-col gap-5">
            <PaperCard>
              <div className="p-6 flex flex-col gap-4">
                {[
                  { Icon: Mail, text: 'dolar@dolar-systems.pl', href: 'mailto:dolar@dolar-systems.pl' },
                  { Icon: Clock, text: 'Odpowiedź w < 24h', href: null },
                  { Icon: MapPin, text: 'Polska / Remote', href: null },
                ].map(({ Icon, text, href }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(201,168,76,0.15)', borderRadius: '4px' }}>
                      <Icon size={14} style={{ color: '#C9A84C' }} aria-hidden />
                    </div>
                    {href ? (
                      <a href={href} className="text-sm transition-colors" style={{ fontFamily: 'var(--font-dm)', color: '#3D4F6B' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#1A2B47')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#3D4F6B')}>
                        {text}
                      </a>
                    ) : (
                      <span className="text-sm" style={{ fontFamily: 'var(--font-dm)', color: '#3D4F6B' }}>{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </PaperCard>

            <PaperCard className="flex-1">
              <div className="p-6">
                <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                  Proces współpracy
                </div>
                {PROCESS.map(({ n, label }, i) => (
                  <motion.div key={n}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.45 }}
                    className="flex items-center gap-4 py-3"
                    style={{ borderBottom: i < PROCESS.length - 1 ? '1px solid rgba(26,43,71,0.06)' : 'none' }}
                  >
                    <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: '#C9A84C', minWidth: '1.5rem' }}>{n}</span>
                    <span style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B' }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </PaperCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
