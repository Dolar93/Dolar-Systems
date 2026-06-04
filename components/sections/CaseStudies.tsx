'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCheck, Clock, Scale, Stethoscope, Landmark } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'
import { FoldCorner, useCardFold } from '@/components/ui/FoldCorner'

function useCountUp(end: number, inView: boolean, duration = 1.4) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    setVal(0)
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])
  return val
}

const CASES = [
  {
    num: '001', Icon: Scale,
    branch: 'Kancelaria Prawna', location: 'Warszawa',
    problem: 'Prawnicy tracili 15h tygodniowo na ręczne generowanie umów i follow-up.',
    solution: 'System AI generujący umowy z szablonów. Automatyczny follow-up email/SMS co 3/7/14 dni.',
    metrics: [{ num: 15, suffix: 'h', prefix: '–', label: 'tygodniowo' }, { num: 40, suffix: '%', prefix: '+', label: 'follow-up' }],
    effects: ['–15h tygodniowo pracy manualnej', '+40% skuteczność follow-up', '0 zapomnianych klientów'],
    price: '4 900', time: '3 tygodnie',
    strip: '#D4E4C8', stripDark: '#4A7A3A', badgeBg: 'rgba(212,228,200,0.6)',
  },
  {
    num: '002', Icon: Stethoscope,
    branch: 'Klinika Stomatologiczna', location: 'Poznań',
    problem: '30% wizyt kończyło się no-show. Recepcja nie nadążała z przypomnieniami.',
    solution: 'Chatbot AI umawiający wizyty. SMS 48h i 2h przed wizytą.',
    metrics: [{ num: 62, suffix: '%', prefix: '–', label: 'no-show' }, { num: 25, suffix: '%', prefix: '+', label: 'kalendarza' }],
    effects: ['–62% no-show rate', '+25% zapełnienie kalendarza', 'Recepcja odciążona o 8h/tydzień'],
    price: '5 900', time: '2 tygodnie',
    strip: '#F2D4C8', stripDark: '#8B4A35', badgeBg: 'rgba(242,212,200,0.6)',
  },
  {
    num: '003', Icon: Landmark,
    branch: 'Deweloper Mieszkaniowy', location: 'Polska',
    problem: 'Handlowcy ręcznie tworzyli raporty sprzedaży 3h dziennie. Zero automatyzacji CRM.',
    solution: 'Dashboard KPI real-time. Auto-raporty PDF o 8:00. Pipeline CRM z follow-up.',
    metrics: [{ num: 0, suffix: 'h', prefix: '', label: 'raportowania' }, { num: 35, suffix: '%', prefix: '+', label: 'konwersja' }],
    effects: ['0h raportowania manualnego', 'Zarząd ma dane real-time', '+35% konwersja leadów'],
    price: '6 900', time: '4 tygodnie',
    strip: '#E8DCC8', stripDark: '#6B4A1A', badgeBg: 'rgba(232,220,200,0.6)',
  },
]

function MetricBlock({ num, prefix, suffix, label, inView, dark }: {
  num: number; prefix: string; suffix: string; label: string; inView: boolean; dark: string
}) {
  const val = useCountUp(num, inView)
  return (
    <div className="text-center">
      <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '34px', fontWeight: 700, color: dark, lineHeight: 1 }}>
        {prefix}{val}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: dark, opacity: 0.6, letterSpacing: '0.12em', marginTop: 4 }}>
        {label}
      </div>
    </div>
  )
}

function CaseCard({ item, index }: { item: (typeof CASES)[number]; index: number }) {
  const { hovered, ref: cardRef, handlers } = useCardFold()
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, { once: true, margin: '-80px' })
  const { Icon } = item

  return (
    /* Outer: overflow visible so FoldCorner isn't clipped by border-radius */
    <motion.div
      ref={inViewRef}
      style={{ position: 'relative' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      animate={{ y: hovered ? -6 : 0, rotate: hovered ? -0.4 : 0 }}
    >
      <FoldCorner isOpen={hovered} sz={46} bgRgb="250,250,248" />

      {/* Inner: overflow hidden clips colour strip at border-radius */}
      <div
        ref={cardRef}
        {...handlers}
        className="paper-texture flex flex-col"
        style={{
          backgroundColor: '#FAFAF8',
          border: '1px solid rgba(26,43,71,0.08)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: hovered
            ? '4px 14px 32px rgba(0,0,0,0.14)'
            : '2px 2px 0px rgba(0,0,0,0.06), 4px 4px 0px rgba(0,0,0,0.04), 8px 8px 16px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <div style={{ height: 8, backgroundColor: item.strip }} />

        <div className="flex flex-col flex-1 p-7">
          <div className="flex items-start justify-between mb-5">
            <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '13px', color: '#8A9AB5', letterSpacing: '0.1em' }}>
              [{item.num}]
            </span>
            <div className="flex items-center gap-2">
              <Icon size={14} style={{ color: item.stripDark, opacity: 0.7 }} aria-hidden />
              <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', backgroundColor: item.badgeBg, color: item.stripDark, borderRadius: '2px', padding: '2px 8px' }}>
                {item.branch}
              </span>
            </div>
          </div>

          <div className="flex justify-around mb-5 pb-5" style={{ borderBottom: '1px solid rgba(26,43,71,0.07)' }}>
            {item.metrics.map((m) => (
              <MetricBlock key={m.label} {...m} inView={inView} dark={item.stripDark} />
            ))}
          </div>

          <div className="mb-4">
            <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>Problem</div>
            <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B', fontStyle: 'italic', lineHeight: 1.7 }}>„{item.problem}"</p>
          </div>

          <div className="mb-5 flex-1">
            <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>Rozwiązanie</div>
            <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B', lineHeight: 1.7 }}>{item.solution}</p>
          </div>

          <div className="flex flex-col gap-1.5 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(26,43,71,0.07)' }}>
            {item.effects.map((e) => (
              <div key={e} className="flex items-center gap-2 text-sm" style={{ fontFamily: 'var(--font-dm)', color: '#1A2B47' }}>
                <CheckCheck size={13} style={{ color: '#2D7A4F', flexShrink: 0 }} aria-hidden />
                {e}
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>Inwestycja</div>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '34px', fontWeight: 700, color: '#1A2B47', lineHeight: 1 }}>od {item.price} zł</div>
            </div>
            <div className="text-right">
              <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>Czas</div>
              <div className="flex items-center gap-1.5" style={{ fontFamily: 'var(--font-ibm)', fontSize: '12px', color: '#8A9AB5' }}>
                <Clock size={11} aria-hidden />{item.time}
              </div>
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
        <Reveal className="mb-3"><SectionLabel number="03" label="REALIZACJE" /></Reveal>
        <Reveal delay={0.05} className="mb-2">
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A2B47' }}>
            Wdrożenia które działają{' '}<span style={{ fontStyle: 'italic', color: '#C9A84C' }}>w produkcji.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mb-14">
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#8A9AB5', marginTop: 8 }}>
            Ceny orientacyjne. Bezpłatna analiza = konkretna wycena dla Twojej firmy.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map((c, i) => <CaseCard key={c.num} item={c} index={i} />)}
        </div>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <a href="#kontakt" className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{ fontFamily: 'var(--font-dm)', backgroundColor: '#1A2B47', color: '#F5F3EF', padding: '16px 40px', borderRadius: '4px' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C9A84C'; e.currentTarget.style.color = '#1A2B47' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1A2B47'; e.currentTarget.style.color = '#F5F3EF' }}>
            Umów bezpłatną analizę →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
