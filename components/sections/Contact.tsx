'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-dm)',
  fontSize: '13px',
  color: '#57534E',
  fontWeight: 500,
  marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1.5px solid #E7E5E4',
  backgroundColor: '#FAFAF7',
  color: '#1C1917',
  fontFamily: 'var(--font-dm)',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
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

  const setFocused = (el: HTMLElement, focused: boolean) => {
    if (focused) {
      el.style.borderColor = '#4F46E5'
      el.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.10)'
    } else {
      el.style.borderColor = '#E7E5E4'
      el.style.boxShadow = 'none'
    }
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

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val =
        e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value
      setForm((f) => ({ ...f, [k]: val }))
    }

  return (
    <section
      id="kontakt"
      className="py-28"
      style={{ backgroundColor: '#FAFAF7' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="05" label="KONTAKT" />
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-fraunces)', color: '#1C1917' }}
          >
            Powiedz nam o swojej firmie.
          </h2>
          <p className="text-base" style={{ color: '#57534E', fontFamily: 'var(--font-dm)' }}>
            Wrócimy w 24h z konkretną analizą.{' '}
            <span style={{ color: '#A8A29E' }}>Bez bullshitu, bez ogólników.</span>
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6 p-8 rounded-2xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E7E5E4',
                boxShadow: '0 2px 12px rgba(28,25,23,0.06)',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" style={labelStyle}>Imię i nazwisko *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Jan Kowalski"
                    style={inputStyle}
                    onFocus={(e) => setFocused(e.currentTarget, true)}
                    onBlur={(e) => setFocused(e.currentTarget, false)}
                  />
                </div>
                <div>
                  <label htmlFor="company" style={labelStyle}>Firma *</label>
                  <input
                    id="company"
                    type="text"
                    required
                    autoComplete="organization"
                    value={form.company}
                    onChange={set('company')}
                    placeholder="Nazwa firmy"
                    style={inputStyle}
                    onFocus={(e) => setFocused(e.currentTarget, true)}
                    onBlur={(e) => setFocused(e.currentTarget, false)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="branch" style={labelStyle}>Branża</label>
                  <select
                    id="branch"
                    value={form.branch}
                    onChange={set('branch')}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => setFocused(e.currentTarget, true)}
                    onBlur={(e) => setFocused(e.currentTarget, false)}
                  >
                    {BRANCHES.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="phone" style={labelStyle}>Telefon *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+48 000 000 000"
                    style={inputStyle}
                    onFocus={(e) => setFocused(e.currentTarget, true)}
                    onBlur={(e) => setFocused(e.currentTarget, false)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>Wiadomość</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Opisz co chcesz zautomatyzować..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => setFocused(e.currentTarget, true)}
                  onBlur={(e) => setFocused(e.currentTarget, false)}
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={set('consent')}
                  className="mt-0.5 cursor-pointer"
                  style={{ accentColor: '#4F46E5' }}
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: '#A8A29E', fontFamily: 'var(--font-dm)' }}
                >
                  Akceptuję przetwarzanie danych osobowych zgodnie z Polityką Prywatności
                  Dolar Systems.
                </span>
              </label>

              <div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent' || !form.consent}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-dm)',
                    backgroundColor: status === 'sent' ? '#0D9488' : '#4F46E5',
                    color: '#ffffff',
                    border: 'none',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {status === 'sent' ? (
                    <>
                      <CheckCircle2 size={15} aria-hidden />
                      Wysłano — odezwiemy się w 24h
                    </>
                  ) : status === 'sending' ? (
                    'Wysyłanie...'
                  ) : (
                    <>
                      Wyślij zapytanie
                      <Send size={14} aria-hidden />
                    </>
                  )}
                </motion.button>

                {status === 'error' && (
                  <p
                    className="mt-3 text-sm"
                    style={{ color: '#DC2626', fontFamily: 'var(--font-dm)' }}
                  >
                    Błąd wysyłania. Napisz bezpośrednio:{' '}
                    <a
                      href="mailto:dolar@dolar-systems.pl"
                      style={{ color: '#DC2626', textDecoration: 'underline' }}
                    >
                      dolar@dolar-systems.pl
                    </a>
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          {/* Info panel */}
          <Reveal delay={0.2} className="lg:col-span-2 flex flex-col gap-6">
            {/* Contact info */}
            <div
              className="p-6 rounded-2xl flex flex-col gap-4"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E7E5E4',
                boxShadow: '0 2px 8px rgba(28,25,23,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(79,70,229,0.09)' }}
                >
                  <Mail size={15} style={{ color: '#4F46E5' }} aria-hidden />
                </div>
                <a
                  href="mailto:dolar@dolar-systems.pl"
                  className="text-sm transition-colors"
                  style={{ fontFamily: 'var(--font-dm)', color: '#57534E' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4F46E5')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#57534E')}
                >
                  dolar@dolar-systems.pl
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(245,158,11,0.09)' }}
                >
                  <Clock size={15} style={{ color: '#F59E0B' }} aria-hidden />
                </div>
                <span className="text-sm" style={{ fontFamily: 'var(--font-dm)', color: '#57534E' }}>
                  Odpowiedź w &lt; 24h
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(79,70,229,0.09)' }}
                >
                  <MapPin size={15} style={{ color: '#4F46E5' }} aria-hidden />
                </div>
                <span className="text-sm" style={{ fontFamily: 'var(--font-dm)', color: '#57534E' }}>
                  Polska / Remote
                </span>
              </div>
            </div>

            {/* Process steps */}
            <div
              className="p-6 rounded-2xl flex-1"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E7E5E4',
                boxShadow: '0 2px 8px rgba(28,25,23,0.05)',
              }}
            >
              <div
                className="text-[10px] tracking-[0.22em] uppercase mb-5"
                style={{ fontFamily: 'var(--font-ibm)', color: '#A8A29E' }}
              >
                Proces współpracy
              </div>
              <div className="flex flex-col gap-1">
                {PROCESS.map(({ n, label }, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.45 }}
                    className="flex items-center gap-4 py-3"
                    style={{ borderBottom: i < PROCESS.length - 1 ? '1px solid #F0EDE6' : 'none' }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                      style={{
                        fontFamily: 'var(--font-ibm)',
                        backgroundColor: 'rgba(79,70,229,0.09)',
                        color: '#4F46E5',
                        fontSize: '10px',
                      }}
                    >
                      {n}
                    </span>
                    <span className="text-sm" style={{ fontFamily: 'var(--font-dm)', color: '#57534E' }}>
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
