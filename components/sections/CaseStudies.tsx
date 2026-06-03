'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCheck, Clock, Scale, Stethoscope, Landmark } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

const CASES = [
  {
    num: '001',
    Icon: Scale,
    branch: 'KANCELARIA PRAWNA',
    location: 'Warszawa',
    problem: 'Prawnicy tracili 15h tygodniowo na ręczne generowanie umów i follow-up.',
    solution:
      'System AI generujący umowy z szablonów na podstawie danych klienta. Automatyczny follow-up email/SMS co 3/7/14 dni. Integracja z kalendarzem i CRM.',
    effects: [
      '–15h tygodniowo pracy manualnej',
      '+40% skuteczność follow-up',
      '0 zapomnianych klientów',
    ],
    price: '4 900',
    time: '3 tygodnie',
  },
  {
    num: '002',
    Icon: Stethoscope,
    branch: 'KLINIKA STOMATOLOGICZNA',
    location: 'Poznań',
    problem: '30% wizyt kończyło się no-show. Recepcja nie nadążała z przypomnieniami.',
    solution:
      'Chatbot AI umawiający wizyty przez stronę i WhatsApp. Automatyczne SMS 48h i 2h przed wizytą. System zbierania opinii po wizycie.',
    effects: [
      '–62% no-show rate',
      '+25% zapełnienie kalendarza',
      'Recepcja odciążona o 8h/tydzień',
    ],
    price: '5 900',
    time: '2 tygodnie',
  },
  {
    num: '003',
    Icon: Landmark,
    branch: 'DEWELOPER MIESZKANIOWY',
    location: 'Polska',
    problem: 'Handlowcy ręcznie tworzyli raporty sprzedaży 3h dziennie. Zero automatyzacji CRM.',
    solution:
      'Dashboard KPI aktualizowany w czasie rzeczywistym. Auto-raporty PDF wysyłane o 8:00 do zarządu. Automatyczny pipeline CRM z follow-up leadów.',
    effects: [
      '0h raportowania manualnego',
      'Zarząd ma dane w czasie rzeczywistym',
      '+35% konwersja leadów',
    ],
    price: '6 900',
    time: '4 tygodnie',
  },
]

function CaseCard({
  item,
  index,
}: {
  item: (typeof CASES)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = item

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            delay: index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col p-8"
      style={{
        border: `2px solid ${hovered ? '#00D4FF' : '#1E1E1E'}`,
        backgroundColor: '#111111',
        transition: 'border-color 0.25s',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <span
          className="text-3xl font-bold select-none"
          style={{ fontFamily: 'var(--font-ibm)', color: '#1A1A1A' }}
        >
          [{item.num}]
        </span>
        <div className="flex items-center gap-2">
          <Icon size={14} style={{ color: '#333' }} aria-hidden />
          <span
            className="text-[10px] px-2 py-0.5"
            style={{
              fontFamily: 'var(--font-space-mono)',
              color: '#444',
              border: '1px solid #1E1E1E',
            }}
          >
            {item.branch}
          </span>
        </div>
      </div>

      {/* Problem */}
      <div className="mb-5">
        <div
          className="text-[10px] tracking-[0.22em] mb-2"
          style={{ color: '#333', fontFamily: 'var(--font-space-mono)' }}
        >
          PROBLEM
        </div>
        <p
          className="text-sm italic leading-relaxed"
          style={{ color: '#555', fontFamily: 'var(--font-inter)' }}
        >
          „{item.problem}"
        </p>
      </div>

      {/* Solution */}
      <div className="mb-6">
        <div
          className="text-[10px] tracking-[0.22em] mb-2"
          style={{ color: '#333', fontFamily: 'var(--font-space-mono)' }}
        >
          ROZWIĄZANIE
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: '#777', fontFamily: 'var(--font-inter)' }}
        >
          {item.solution}
        </p>
      </div>

      {/* Effects */}
      <div className="mb-6">
        <div
          className="text-[10px] tracking-[0.22em] mb-3"
          style={{ color: '#333', fontFamily: 'var(--font-space-mono)' }}
        >
          EFEKTY
        </div>
        <div className="flex flex-col gap-2">
          {item.effects.map((e) => (
            <div
              key={e}
              className="flex items-center gap-2 text-xs"
              style={{ color: '#CCC', fontFamily: 'var(--font-inter)' }}
            >
              <CheckCheck
                size={13}
                style={{ color: '#00D4FF', flexShrink: 0 }}
                aria-hidden
              />
              {e}
            </div>
          ))}
        </div>
      </div>

      {/* Price + time */}
      <div
        className="mt-auto flex items-end justify-between pt-6"
        style={{ borderTop: '1px solid #1A1A1A' }}
      >
        <div>
          <div
            className="text-[10px] tracking-[0.22em] mb-1"
            style={{ color: '#333', fontFamily: 'var(--font-space-mono)' }}
          >
            INWESTYCJA
          </div>
          <div
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-ibm)', color: '#00D4FF' }}
          >
            od {item.price} zł
          </div>
        </div>
        <div className="text-right">
          <div
            className="text-[10px] tracking-[0.22em] mb-1"
            style={{ color: '#333', fontFamily: 'var(--font-space-mono)' }}
          >
            CZAS
          </div>
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: '#555', fontFamily: 'var(--font-ibm)' }}
          >
            <Clock size={11} aria-hidden />
            {item.time}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  return (
    <section
      id="realizacje"
      className="py-28"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-3">
          <SectionLabel number="03" label="REALIZACJE" />
        </Reveal>
        <Reveal delay={0.05} className="mb-2">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-ibm)', color: '#F5F5F5' }}
          >
            Wdrożenia które działają{' '}
            <span style={{ color: '#00D4FF' }}>w produkcji.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mb-14">
          <p
            className="text-[11px] mt-3"
            style={{ color: '#333', fontFamily: 'var(--font-space-mono)' }}
          >
            Ceny orientacyjne. Bezpłatna analiza = konkretna wycena dla Twojej
            firmy.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {CASES.map((c, i) => (
            <CaseCard key={c.num} item={c} index={i} />
          ))}
        </motion.div>

        {/* CTA below cases */}
        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm transition-all duration-250"
            style={{
              fontFamily: 'var(--font-ibm)',
              border: '2px solid #00D4FF',
              color: '#00D4FF',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00D4FF'
              e.currentTarget.style.color = '#0A0A0A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#00D4FF'
            }}
          >
            Umów bezpłatną analizę →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
