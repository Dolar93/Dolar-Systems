'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Check, Clock, Scale, Stethoscope, Landmark } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import StonePlate from '@/components/ui/StonePlate'
import { Reveal } from '@/components/animations/reveal'
import { STONE, FONT, CARVED, grout } from '@/components/ui/stone'

function useCountUp(end: number, inView: boolean, skip: boolean, duration = 1.4) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (skip) { setVal(end); return }
    setVal(0)
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration, skip])
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
  },
  {
    num: '002', Icon: Stethoscope,
    branch: 'Klinika Stomatologiczna', location: 'Poznań',
    problem: '30% wizyt kończyło się no-show. Recepcja nie nadążała z przypomnieniami.',
    solution: 'Chatbot AI umawiający wizyty. SMS 48h i 2h przed wizytą.',
    metrics: [{ num: 62, suffix: '%', prefix: '–', label: 'no-show' }, { num: 25, suffix: '%', prefix: '+', label: 'kalendarza' }],
    effects: ['–62% no-show rate', '+25% zapełnienie kalendarza', 'Recepcja odciążona o 8h/tydzień'],
    price: '5 900', time: '2 tygodnie',
  },
  {
    num: '003', Icon: Landmark,
    branch: 'Deweloper Mieszkaniowy', location: 'Polska',
    problem: 'Handlowcy ręcznie tworzyli raporty sprzedaży 3h dziennie. Zero automatyzacji CRM.',
    solution: 'Dashboard KPI real-time. Auto-raporty PDF o 8:00. Pipeline CRM z follow-up.',
    metrics: [{ num: 0, suffix: 'h', prefix: '', label: 'raportowania' }, { num: 35, suffix: '%', prefix: '+', label: 'konwersja' }],
    effects: ['0h raportowania manualnego', 'Zarząd ma dane real-time', '+35% konwersja leadów'],
    price: '6 900', time: '4 tygodnie',
  },
]

function MetricBlock({ num, prefix, suffix, label, inView, skip }: {
  num: number; prefix: string; suffix: string; label: string; inView: boolean; skip: boolean
}) {
  const val = useCountUp(num, inView, skip)
  return (
    <div className="text-center">
      <div className="carved" style={{ ...CARVED, fontSize: '30px', color: STONE.ink, lineHeight: 1 }}>
        {prefix}{val}{suffix}
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: '9.5px', color: STONE.inkMuted, letterSpacing: '0.14em', marginTop: 6 }}>
        {label}
      </div>
    </div>
  )
}

function CaseCard({ item, index }: { item: (typeof CASES)[number]; index: number }) {
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const { Icon } = item

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
    >
      <StonePlate tone="light" accent={STONE.moss} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Pas łupka u góry — ta sama płyta co w bruku */}
        <div
          style={{
            height: 10,
            background: 'linear-gradient(147deg, #464D5A 0%, #3A404C 55%, #333944 100%)',
          }}
        />

        <div className="flex flex-col flex-1 p-7">
          <div className="flex items-start justify-between mb-5 gap-3">
            <span style={{ fontFamily: FONT.mono, fontSize: '12px', color: STONE.inkMuted, letterSpacing: '0.12em' }}>
              [{item.num}]
            </span>
            <div className="flex items-center gap-2">
              <Icon size={14} style={{ color: STONE.moss }} aria-hidden />
              <span style={{
                fontFamily: FONT.mono, fontSize: '9.5px', color: STONE.moss,
                border: `1px solid ${STONE.moss}55`, padding: '3px 8px', letterSpacing: '0.1em',
              }}>
                {item.branch}
              </span>
            </div>
          </div>

          <div className="flex justify-around mb-5 pb-5" style={{ borderBottom: '1px solid rgba(51,71,28,0.18)' }}>
            {item.metrics.map((m) => (
              <MetricBlock key={m.label} {...m} inView={inView} skip={!!reduced} />
            ))}
          </div>

          <div className="mb-4">
            <div style={{ fontFamily: FONT.mono, fontSize: '9.5px', color: STONE.inkMuted, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>Problem</div>
            <p style={{ fontFamily: FONT.body, fontSize: '14px', color: STONE.inkSoft, fontStyle: 'italic', lineHeight: 1.7 }}>„{item.problem}"</p>
          </div>

          <div className="mb-5 flex-1">
            <div style={{ fontFamily: FONT.mono, fontSize: '9.5px', color: STONE.inkMuted, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>Rozwiązanie</div>
            <p style={{ fontFamily: FONT.body, fontSize: '14px', color: STONE.inkSoft, lineHeight: 1.7 }}>{item.solution}</p>
          </div>

          <div className="flex flex-col gap-1.5 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(51,71,28,0.18)' }}>
            {item.effects.map((e) => (
              <div key={e} className="flex items-start gap-2" style={{ fontFamily: FONT.body, fontSize: '14px', color: STONE.ink }}>
                <Check size={14} style={{ color: '#41581F', flexShrink: 0, marginTop: 3 }} aria-hidden />
                {e}
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <div style={{ fontFamily: FONT.mono, fontSize: '9.5px', color: STONE.inkMuted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Inwestycja</div>
              <div className="carved" style={{ ...CARVED, fontSize: '26px', color: STONE.ink, lineHeight: 1 }}>od {item.price} zł</div>
            </div>
            <div className="text-right">
              <div style={{ fontFamily: FONT.mono, fontSize: '9.5px', color: STONE.inkMuted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Czas</div>
              <div className="flex items-center gap-1.5 justify-end" style={{ fontFamily: FONT.mono, fontSize: '12px', color: STONE.inkSoft }}>
                <Clock size={11} aria-hidden />{item.time}
              </div>
            </div>
          </div>
        </div>
      </StonePlate>
    </motion.div>
  )
}

export default function CaseStudies() {
  return (
    <section id="realizacje" className="py-28" style={{ backgroundColor: STONE.deep, ...grout(84, 0.20) }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-3"><SectionLabel number="03" label="REALIZACJE" /></Reveal>
        <Reveal delay={0.05} className="mb-2">
          <h2 className="carved" style={{ ...CARVED, fontSize: 'clamp(21px, 3.1vw, 32px)', color: STONE.ink, lineHeight: 1.12 }}>
            Wdrożenia, które działają{' '}<span style={{ color: STONE.moss }}>w produkcji.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mb-14">
          <p style={{ fontFamily: FONT.body, fontSize: '15px', color: STONE.inkSoft, marginTop: 10 }}>
            Ceny orientacyjne. Bezpłatna analiza kończy się konkretną wyceną dla Twojej firmy.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {CASES.map((c, i) => <CaseCard key={c.num} item={c} index={i} />)}
        </div>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200"
            style={{
              fontFamily: FONT.mono, fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', backgroundColor: STONE.moss, color: STONE.light,
              padding: '17px 40px', boxShadow: `0 4px 0 ${STONE.mossDeep}`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = STONE.mossDeep }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = STONE.moss }}
          >
            Umów bezpłatną analizę →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
