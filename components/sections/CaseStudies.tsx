'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCheck, Clock, Scale, Stethoscope, Landmark } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

function useCountUp(end: number, inView: boolean, duration = 1.4) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    setVal(0)
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])
  return val
}

const CASES = [
  {
    num: '001',
    Icon: Scale,
    branch: 'Kancelaria Prawna',
    location: 'Warszawa',
    problem: 'Prawnicy tracili 15h tygodniowo na ręczne generowanie umów i follow-up.',
    solution: 'System AI generujący umowy z szablonów na podstawie danych klienta. Automatyczny follow-up email/SMS co 3/7/14 dni.',
    metrics: [
      { num: 15, suffix: 'h', prefix: '–', label: 'tygodniowo' },
      { num: 40, suffix: '%', prefix: '+', label: 'follow-up' },
    ],
    effects: ['–15h tygodniowo pracy manualnej', '+40% skuteczność follow-up', '0 zapomnianych klientów'],
    price: '4 900',
    time: '3 tygodnie',
  },
  {
    num: '002',
    Icon: Stethoscope,
    branch: 'Klinika Stomatologiczna',
    location: 'Poznań',
    problem: '30% wizyt kończyło się no-show. Recepcja nie nadążała z przypomnieniami.',
    solution: 'Chatbot AI umawiający wizyty przez stronę i WhatsApp. Automatyczne SMS 48h i 2h przed wizytą.',
    metrics: [
      { num: 62, suffix: '%', prefix: '–', label: 'no-show' },
      { num: 25, suffix: '%', prefix: '+', label: 'kalendarza' },
    ],
    effects: ['–62% no-show rate', '+25% zapełnienie kalendarza', 'Recepcja odciążona o 8h/tydzień'],
    price: '5 900',
    time: '2 tygodnie',
  },
  {
    num: '003',
    Icon: Landmark,
    branch: 'Deweloper Mieszkaniowy',
    location: 'Polska',
    problem: 'Handlowcy ręcznie tworzyli raporty sprzedaży 3h dziennie. Zero automatyzacji CRM.',
    solution: 'Dashboard KPI w czasie rzeczywistym. Auto-raporty PDF wysyłane o 8:00 do zarządu.',
    metrics: [
      { num: 0, suffix: 'h', prefix: '', label: 'raportowania' },
      { num: 35, suffix: '%', prefix: '+', label: 'konwersja' },
    ],
    effects: ['0h raportowania manualnego', 'Zarząd ma dane w czasie rzeczywistym', '+35% konwersja leadów'],
    price: '6 900',
    time: '4 tygodnie',
  },
]

function MetricBlock({ num, prefix, suffix, label, inView }: {
  num: number; prefix: string; suffix: string; label: string; inView: boolean
}) {
  const val = useCountUp(num, inView)
  return (
    <div className="text-center">
      <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '36px', fontWeight: 700, color: '#1A2B47', lineHeight: 1 }}>
        {prefix}{val}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.12em', marginTop: 4 }}>
        {label}
      </div>
    </div>
  )
}

function CaseCard({ item, index }: { item: (typeof CASES)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { Icon } = item

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1, y: 0,
          transition: { duration: 0.6, delay: index * 0.12, ease: 'easeOut' },
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -6 } : { y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col"
      style={{
        backgroundColor: '#FAFAF8',
        border: '1px solid rgba(26,43,71,0.10)',
        borderLeft: '3px solid #C9A84C',
        borderRadius: '8px',
        boxShadow: hovered
          ? '0 16px 40px rgba(26,43,71,0.15)'
          : '0 2px 12px rgba(26,43,71,0.08), 0 1px 3px rgba(26,43,71,0.04)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div className="flex flex-col flex-1 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '13px', color: '#8A9AB5', letterSpacing: '0.1em' }}>
            [{item.num}]
          </span>
          <div className="flex items-center gap-2">
            <Icon size={14} style={{ color: '#8A9AB5' }} aria-hidden />
            <span
              className="text-xs px-2 py-0.5"
              style={{
                fontFamily: 'var(--font-ibm)',
                backgroundColor: 'rgba(201,168,76,0.15)',
                color: '#8A6B2A',
                borderRadius: '2px',
                fontSize: '10px',
              }}
            >
              {item.branch}
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div
          className="flex justify-around mb-6 pb-6"
          style={{ borderBottom: '1px solid rgba(26,43,71,0.07)' }}
        >
          {item.metrics.map((m) => (
            <MetricBlock key={m.label} {...m} inView={inView} />
          ))}
        </div>

        {/* Problem */}
        <div className="mb-4">
          <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>
            Problem
          </div>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B', fontStyle: 'italic', lineHeight: 1.7 }}>
            „{item.problem}"
          </p>
        </div>

        {/* Solution */}
        <div className="mb-5 flex-1">
          <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>
            Rozwiązanie
          </div>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B', lineHeight: 1.7 }}>
            {item.solution}
          </p>
        </div>

        {/* Effects */}
        <div className="flex flex-col gap-2 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(26,43,71,0.07)' }}>
          {item.effects.map((e) => (
            <div key={e} className="flex items-center gap-2 text-sm" style={{ fontFamily: 'var(--font-dm)', color: '#1A2B47' }}>
              <CheckCheck size={13} style={{ color: '#2D7A4F', flexShrink: 0 }} aria-hidden />
              {e}
            </div>
          ))}
        </div>

        {/* Price + time */}
        <div className="flex items-end justify-between">
          <div>
            <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
              Inwestycja
            </div>
            <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '36px', fontWeight: 700, color: '#1A2B47', lineHeight: 1 }}>
              od {item.price} zł
            </div>
          </div>
          <div className="text-right">
            <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
              Czas
            </div>
            <div className="flex items-center gap-1.5" style={{ fontFamily: 'var(--font-ibm)', fontSize: '12px', color: '#8A9AB5' }}>
              <Clock size={11} aria-hidden />
              {item.time}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  return (
    <section id="realizacje" className="py-28" style={{ backgroundColor: '#EEEAE3' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-3">
          <SectionLabel number="03" label="REALIZACJE" />
        </Reveal>
        <Reveal delay={0.05} className="mb-2">
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A2B47' }}>
            Wdrożenia które działają{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>w produkcji.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mb-14">
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#8A9AB5', marginTop: 8 }}>
            Ceny orientacyjne. Bezpłatna analiza = konkretna wycena dla Twojej firmy.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {CASES.map((c, i) => (
            <CaseCard key={c.num} item={c} index={i} />
          ))}
        </motion.div>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{ fontFamily: 'var(--font-dm)', backgroundColor: '#1A2B47', color: '#F5F3EF', padding: '16px 40px', borderRadius: '4px' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C9A84C'; e.currentTarget.style.color = '#1A2B47' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1A2B47'; e.currentTarget.style.color = '#F5F3EF' }}
          >
            Umów bezpłatną analizę →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
