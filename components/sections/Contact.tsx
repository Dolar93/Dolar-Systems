'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Clock, MapPin } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

const TERMINAL_LINES = [
  'Inicjalizowanie połączenia...',
  'Weryfikacja systemu... OK',
  'System gotowy.',
  '> Formularz aktywny. Oczekiwanie na kontakt.',
]

const BRANCHES = [
  { value: '', label: 'Wybierz branżę' },
  { value: 'kancelaria', label: 'Kancelaria prawna' },
  { value: 'klinika', label: 'Klinika / Stomatologia' },
  { value: 'nieruchomosci', label: 'Agencja nieruchomości' },
  { value: 'deweloper', label: 'Deweloper' },
  { value: 'produkcja', label: 'Produkcja' },
  { value: 'inna', label: 'Inna' },
]

const inputBase: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid #1E1E1E',
  color: '#F5F5F5',
  fontFamily: 'var(--font-ibm)',
  fontSize: '13px',
  outline: 'none',
  padding: '11px 0',
  width: '100%',
  transition: 'border-color 0.2s',
}

const labelBase: React.CSSProperties = {
  display: 'block',
  fontSize: '10px',
  letterSpacing: '0.22em',
  color: '#333',
  fontFamily: 'var(--font-space-mono)',
  marginBottom: '4px',
  textTransform: 'uppercase',
}

function useFocus(
  onFocus: (el: HTMLElement) => void,
  onBlur: (el: HTMLElement) => void,
) {
  return {
    onFocus: (e: React.FocusEvent<HTMLElement>) => onFocus(e.currentTarget),
    onBlur: (e: React.FocusEvent<HTMLElement>) => onBlur(e.currentTarget),
  }
}

function TerminalWidget() {
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    if (visibleCount >= TERMINAL_LINES.length) return
    const id = setTimeout(
      () => setVisibleCount((c) => c + 1),
      1800,
    )
    return () => clearTimeout(id)
  }, [visibleCount])

  return (
    <div
      className="p-6"
      style={{ border: '1px solid #1A1A1A', backgroundColor: '#0A0A0A' }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#febc2e' }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#28c840' }} />
        <span
          className="text-[10px] ml-2"
          style={{ fontFamily: 'var(--font-space-mono)', color: '#333' }}
        >
          intake.sh
        </span>
      </div>

      {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
        <div
          key={i}
          className="text-[11px] py-0.5 flex gap-2"
          style={{
            fontFamily: 'var(--font-ibm)',
            color: i === visibleCount - 1 ? '#00D4FF' : '#2A2A2A',
          }}
        >
          <span>{'>'}</span>
          <span>{line}</span>
        </div>
      ))}
      <div
        className="flex gap-2 text-[11px] mt-1"
        style={{ fontFamily: 'var(--font-ibm)', color: '#00D4FF' }}
      >
        <span>{'>'}</span>
        <span className="animate-pulse">█</span>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    branch: '',
    phone: '',
    message: '',
    consent: false,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLElement>) =>
      (e.currentTarget.style.borderBottomColor = '#00D4FF'),
    onBlur: (e: React.FocusEvent<HTMLElement>) =>
      (e.currentTarget.style.borderBottomColor = '#1E1E1E'),
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent || status !== 'idle') return

    setStatus('sending')
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const val =
      e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
    setForm((f) => ({ ...f, [k]: val }))
  }

  return (
    <section
      id="kontakt"
      className="py-28 terminal-grid-dense"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="05" label="KONTAKT" />
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-ibm)', color: '#F5F5F5' }}
          >
            Powiedz nam o swojej firmie.
          </h2>
          <p
            className="text-sm"
            style={{ color: '#555', fontFamily: 'var(--font-inter)' }}
          >
            Wrócimy w 24h z konkretną analizą.{' '}
            <span style={{ color: '#777' }}>
              Bez bullshitu, bez ogólników.
            </span>
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form — 3 cols */}
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" style={labelBase}>
                    Imię i nazwisko *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Jan Kowalski"
                    style={inputBase}
                    {...focusHandlers}
                  />
                </div>
                <div>
                  <label htmlFor="company" style={labelBase}>
                    Firma *
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    autoComplete="organization"
                    value={form.company}
                    onChange={set('company')}
                    placeholder="Nazwa firmy"
                    style={inputBase}
                    {...focusHandlers}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="branch" style={labelBase}>
                    Branża
                  </label>
                  <select
                    id="branch"
                    value={form.branch}
                    onChange={set('branch')}
                    style={{ ...inputBase, cursor: 'pointer' }}
                    {...focusHandlers}
                  >
                    {BRANCHES.map((b) => (
                      <option
                        key={b.value}
                        value={b.value}
                        style={{ backgroundColor: '#111', color: '#F5F5F5' }}
                      >
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="phone" style={labelBase}>
                    Telefon *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+48 000 000 000"
                    style={inputBase}
                    {...focusHandlers}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" style={labelBase}>
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Opisz co chcesz zautomatyzować..."
                  rows={4}
                  style={{ ...inputBase, resize: 'none' }}
                  {...focusHandlers}
                />
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={set('consent')}
                  style={{ marginTop: 2, accentColor: '#00D4FF', cursor: 'pointer' }}
                />
                <span
                  className="text-xs leading-relaxed"
                  style={{ color: '#444', fontFamily: 'var(--font-ibm)' }}
                >
                  Akceptuję przetwarzanie danych osobowych zgodnie z Polityką
                  Prywatności Dolar Systems.
                </span>
              </label>

              {/* Submit */}
              <div>
                <motion.button
                  type="submit"
                  disabled={
                    status === 'sending' ||
                    status === 'sent' ||
                    !form.consent
                  }
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-8 py-4 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-250"
                  style={{
                    fontFamily: 'var(--font-ibm)',
                    border: `2px solid ${status === 'sent' ? '#28c840' : '#00D4FF'}`,
                    color: status === 'sent' ? '#28c840' : '#00D4FF',
                    backgroundColor: 'transparent',
                    cursor:
                      status === 'sending' || !form.consent
                        ? 'not-allowed'
                        : 'pointer',
                    letterSpacing: '0.05em',
                  }}
                >
                  {status === 'sent' ? (
                    'Wysłano ✓'
                  ) : status === 'sending' ? (
                    'Wysyłanie...'
                  ) : (
                    <>
                      Wyślij <Send size={13} aria-hidden />
                    </>
                  )}
                </motion.button>

                {status === 'error' && (
                  <p
                    className="mt-3 text-xs"
                    style={{ color: '#ff5f57', fontFamily: 'var(--font-ibm)' }}
                  >
                    Błąd wysyłania. Napisz bezpośrednio:{' '}
                    <a href="mailto:dolar@dolar-systems.pl" style={{ color: '#ff5f57', textDecoration: 'underline' }}>
                      dolar@dolar-systems.pl
                    </a>
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          {/* Info panel — 2 cols */}
          <Reveal delay={0.2} className="lg:col-span-2 flex flex-col gap-8">
            {/* Contact info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Mail size={14} style={{ color: '#00D4FF', flexShrink: 0 }} aria-hidden />
                <a
                  href="mailto:dolar@dolar-systems.pl"
                  className="text-sm transition-colors"
                  style={{ fontFamily: 'var(--font-ibm)', color: '#666' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#00D4FF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
                >
                  dolar@dolar-systems.pl
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={14} style={{ color: '#00D4FF', flexShrink: 0 }} aria-hidden />
                <span
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-ibm)', color: '#444' }}
                >
                  Odpowiedź w &lt; 24h
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} style={{ color: '#00D4FF', flexShrink: 0 }} aria-hidden />
                <span
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-ibm)', color: '#444' }}
                >
                  Polska / Remote
                </span>
              </div>
            </div>

            {/* Terminal animation */}
            <TerminalWidget />

            {/* Process steps */}
            <div
              className="p-6"
              style={{ border: '1px solid #1A1A1A', backgroundColor: '#0D0D0D' }}
            >
              <div
                className="text-[10px] tracking-[0.2em] mb-4"
                style={{ fontFamily: 'var(--font-space-mono)', color: '#333' }}
              >
                PROCES WSPÓŁPRACY
              </div>
              {[
                ['01', 'Bezpłatna analiza (30 min)'],
                ['02', 'Projekt architektury systemu'],
                ['03', 'Wdrożenie i testy'],
                ['04', 'Support + iteracje'],
              ].map(([n, label]) => (
                <div
                  key={n}
                  className="flex gap-3 items-center py-2"
                  style={{ borderBottom: '1px solid #141414' }}
                >
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-space-mono)', color: '#00D4FF', minWidth: '1.5rem' }}
                  >
                    {n}
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: 'var(--font-ibm)', color: '#555' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
