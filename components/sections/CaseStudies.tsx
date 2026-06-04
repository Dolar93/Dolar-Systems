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
    solution:
      'System AI generujący umowy z szablonów na podstawie danych klienta. Automatyczny follow-up email/SMS co 3/7/14 dni. Integracja z kalendarzem i CRM.',
    metrics: [
      { num: 15, suffix: 'h', prefix: '–', label: 'tygodniowo oszczędności' },
      { num: 40, suffix: '%', prefix: '+', label: 'skuteczność follow-up' },
    ],
    effects: [
      '–15h tygodniowo pracy manualnej',
      '+40% skuteczność follow-up',
      '0 zapomnianych klientów',
    ],
    price: '4 900',
    time: '3 tygodnie',
    accentColor: '#4F46E5',
    accentBg: 'rgba(79,70,229,0.07)',
  },
  {
    num: '002',
    Icon: Stethoscope,
    branch: 'Klinika Stomatologiczna',
    location: 'Poznań',
    problem: '30% wizyt kończyło się no-show. Recepcja nie nadążała z przypomnieniami.',
    solution:
      'Chatbot AI umawiający wizyty przez stronę i WhatsApp. Automatyczne SMS 48h i 2h przed wizytą. System zbierania opinii po wizycie.',
    metrics: [
      { num: 62, suffix: '%', prefix: '–', label: 'no-show rate' },
      { num: 25, suffix: '%', prefix: '+', label: 'zapełnienie kalendarza' },
    ],
    effects: [
      '–62% no-show rate',
      '+25% zapełnienie kalendarza',
      'Recepcja odciążona o 8h/tydzień',
    ],
    price: '5 900',
    time: '2 tygodnie',
    accentColor: '#0D9488',
    accentBg: 'rgba(13,148,136,0.07)',
  },
  {
    num: '003',
    Icon: Landmark,
    branch: 'Deweloper Mieszkaniowy',
    location: 'Polska',
    problem: 'Handlowcy ręcznie tworzyli raporty sprzedaży 3h dziennie. Zero automatyzacji CRM.',
    solution:
      'Dashboard KPI aktualizowany w czasie rzeczywistym. Auto-raporty PDF wysyłane o 8:00 do zarządu. Automatyczny pipeline CRM z follow-up leadów.',
    metrics: [
      { num: 0, suffix: 'h', prefix: '', label: 'raportowania ręcznego' },
      { num: 35, suffix: '%', prefix: '+', label: 'konwersja leadów' },
    ],
    effects: [
      '0h raportowania manualnego',
      'Zarząd ma dane w czasie rzeczywistym',
      '+35% konwersja leadów',
    ],
    price: '6 900',
    time: '4 tygodnie',
    accentColor: '#7C3AED',
    accentBg: 'rgba(124,58,237,0.07)',
  },
]

function MetricCounter({
  num, prefix, suffix, label, inView, accent
}: {
  num: number; prefix: string; suffix: string; label: string; inView: boolean; accent: string
}) {
  const val = useCountUp(num, inView)
  return (
    <div className="text-center">
      <div
        className="text-3xl font-bold leading-none mb-1"
        style={{ fontFamily: 'var(--font-fraunces)', color: accent }}
      >
        {prefix}{val}{suffix}
      </div>
      <div
        className="text-xs leading-tight"
        style={{ fontFamily: 'var(--font-dm)', color: '#A8A29E' }}
      >
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
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -4 } : { y: 0 }}
      transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 24 }}
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        border: `1.5px solid ${hovered ? item.accentColor : '#E7E5E4'}`,
        boxShadow: hovered
          ? `0 12px 40px rgba(28,25,23,0.10)`
          : '0 1px 4px rgba(28,25,23,0.06)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
    >
      {/* Color strip */}
      <div style={{ height: 4, backgroundColor: item.accentColor, opacity: 0.7 }} />

      <div className="flex flex-col flex-1 p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <span
            className="text-3xl font-bold select-none"
            style={{ fontFamily: 'var(--font-fraunces)', color: '#F0EDE6' }}
          >
            {item.num}
          </span>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: item.accentBg }}
            >
              <Icon size={15} style={{ color: item.accentColor }} aria-hidden />
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                fontFamily: 'var(--font-dm)',
                color: item.accentColor,
                backgroundColor: item.accentBg,
                fontSize: '11px',
              }}
            >
              {item.branch}
            </span>
          </div>
        </div>

        {/* Metrics count-up */}
        <div
          className="flex justify-around mb-6 pb-6"
          style={{ borderBottom: '1px solid #F0EDE6' }}
        >
          {item.metrics.map((m) => (
            <MetricCounter
              key={m.label}
              num={m.num}
              prefix={m.prefix}
              suffix={m.suffix}
              label={m.label}
              inView={inView}
              accent={item.accentColor}
            />
          ))}
        </div>

        {/* Problem */}
        <div className="mb-4">
          <div
            className="text-[10px] tracking-[0.22em] mb-1.5 uppercase"
            style={{ color: '#A8A29E', fontFamily: 'var(--font-ibm)' }}
          >
            Problem
          </div>
          <p
            className="text-sm italic leading-relaxed"
            style={{ color: '#57534E', fontFamily: 'var(--font-dm)' }}
          >
            „{item.problem}"
          </p>
        </div>

        {/* Solution */}
        <div className="mb-5 flex-1">
          <div
            className="text-[10px] tracking-[0.22em] mb-1.5 uppercase"
            style={{ color: '#A8A29E', fontFamily: 'var(--font-ibm)' }}
          >
            Rozwiązanie
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: '#57534E', fontFamily: 'var(--font-dm)' }}
          >
            {item.solution}
          </p>
        </div>

        {/* Effects */}
        <div
          className="flex flex-col gap-1.5 mb-6 pb-6"
          style={{ borderBottom: '1px solid #F0EDE6' }}
        >
          {item.effects.map((e) => (
            <div
              key={e}
              className="flex items-center gap-2 text-sm"
              style={{ color: '#1C1917', fontFamily: 'var(--font-dm)' }}
            >
              <CheckCheck size={13} style={{ color: item.accentColor, flexShrink: 0 }} aria-hidden />
              {e}
            </div>
          ))}
        </div>

        {/* Price + time */}
        <div className="flex items-end justify-between">
          <div>
            <div
              className="text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ color: '#A8A29E', fontFamily: 'var(--font-ibm)' }}
            >
              Inwestycja
            </div>
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-fraunces)', color: item.accentColor }}
            >
              od {item.price} zł
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ color: '#A8A29E', fontFamily: 'var(--font-ibm)' }}
            >
              Czas
            </div>
            <div
              className="flex items-center gap-1.5 text-sm"
              style={{ color: '#57534E', fontFamily: 'var(--font-dm)' }}
            >
              <Clock size={12} aria-hidden />
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
    <section id="realizacje" className="py-28" style={{ backgroundColor: '#FAFAF7' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-3">
          <SectionLabel number="03" label="REALIZACJE" />
        </Reveal>
        <Reveal delay={0.05} className="mb-2">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-fraunces)', color: '#1C1917' }}
          >
            Wdrożenia które działają{' '}
            <span style={{ color: '#4F46E5', fontStyle: 'italic' }}>w produkcji.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mb-14">
          <p
            className="text-sm mt-3"
            style={{ color: '#A8A29E', fontFamily: 'var(--font-dm)' }}
          >
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-dm)',
              backgroundColor: '#4F46E5',
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4338CA'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(79,70,229,0.38)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4F46E5'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Umów bezpłatną analizę →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
