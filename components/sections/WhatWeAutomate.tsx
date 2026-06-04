'use client'
import { motion } from 'framer-motion'
import { Scale, Stethoscope, Building2, Landmark, Factory } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

/* ── Brand colour map ───────────────────────────────────────────── */
const BRAND = {
  kancelarie:    { bg: '#D4E4C8', dark: '#4A7A3A' },
  kliniki:       { bg: '#F2D4C8', dark: '#8B4A35' },
  nieruchomosci: { bg: '#C8D4E8', dark: '#2A4A6B' },
  deweloperzy:   { bg: '#E8DCC8', dark: '#6B4A1A' },
  produkcja:     { bg: '#D4C8E8', dark: '#4A2A6B' },
}

const INDUSTRIES = [
  {
    id: 'kancelarie',
    num: '01', Icon: Scale,
    name: 'Kancelarie Prawne',
    tasks: ['Auto-generowanie umów z szablonów', 'Chatbot intake klientów 24/7', 'System follow-up i przypomnień', 'Automatyczne faktury i dokumenty'],
    stack: ['n8n', 'Claude AI', 'DocuSign'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2',
    large: true,
  },
  {
    id: 'kliniki',
    num: '02', Icon: Stethoscope,
    name: 'Kliniki / Stomatologia',
    tasks: ['Chatbot umawiający wizyty', 'SMS/email — −60% no-show', 'Automatyczny wywiad medyczny', 'Raporty NFZ i dokumentacja'],
    stack: ['Make.com', 'Twilio', 'CRM'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: false,
  },
  {
    id: 'nieruchomosci',
    num: '03', Icon: Building2,
    name: 'Agencje Nieruchomości',
    tasks: ['Auto-odpowiedzi na OLX/Otodom', 'Kwalifikacja leadów przez AI', 'Generowanie opisów nieruchomości', 'CRM pipeline automatyczny'],
    stack: ['Make.com', 'GPT-4', 'CRM'],
    gridClass: 'col-span-1 md:col-span-1 lg:col-span-2',
    large: false,
  },
  {
    id: 'deweloperzy',
    num: '04', Icon: Landmark,
    name: 'Deweloperzy',
    tasks: ['Raporty sprzedaży auto-generowane', 'Dashboard KPI real-time', 'Auto-follow-up kupujących', 'Integracja z systemami ERP'],
    stack: ['n8n', 'PostgreSQL', 'Claude AI'],
    gridClass: 'col-span-1 md:col-span-1 lg:col-span-2',
    large: false,
  },
  {
    id: 'produkcja',
    num: '05', Icon: Factory,
    name: 'Firmy Produkcyjne',
    tasks: ['Automatyczne zamówienia przy niskim stanie', 'Raporty produkcyjne codzienne', 'System zgłoszeń i eskalacji', 'Integracja z ERP/WMS'],
    stack: ['n8n', 'Make.com', 'ERP API'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-2',
    large: false,
  },
] as const

/* ── Origami bird SVG ───────────────────────────────────────────── */
function OrigamiBird({ color, size = 32, rotate = 0, opacity = 0.3 }: { color: string; size?: number; rotate?: number; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 40 30"
      width={size} height={size * 0.75}
      style={{ color, transform: `rotate(${rotate}deg)`, opacity }}
      aria-hidden
    >
      <polygon points="0,30 20,0 40,30"   fill="currentColor" opacity="0.4" />
      <polygon points="20,0 40,30 20,20"  fill="currentColor" opacity="0.6" />
      <polygon points="0,30 20,20 10,30"  fill="currentColor" opacity="0.3" />
    </svg>
  )
}

/* ── Industry card ──────────────────────────────────────────────── */
function Card({ item }: { item: (typeof INDUSTRIES)[number] }) {
  const brand = BRAND[item.id as keyof typeof BRAND]
  const { Icon } = item

  return (
    <motion.div
      className={`paper-texture paper-fold ${item.gridClass}`}
      style={{
        backgroundColor: brand.bg,
        border: `1px solid rgba(0,0,0,0.06)`,
        borderRadius: '8px',
        boxShadow: '2px 2px 0px rgba(0,0,0,0.06), 4px 4px 0px rgba(0,0,0,0.04), 8px 8px 16px rgba(0,0,0,0.08)',
        padding: item.large ? '2rem' : '1.5rem',
        overflow: 'hidden',
        cursor: 'default',
      }}
      whileHover={{ y: -8, rotate: 0.8, boxShadow: '4px 12px 32px rgba(0,0,0,0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* Watermark number */}
      <span
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: item.large ? '140px' : '96px',
          fontStyle: 'italic',
          fontWeight: 700,
          color: brand.dark,
          opacity: 0.06,
          lineHeight: 1,
          bottom: '-20px',
          left: '-8px',
        }}
        aria-hidden
      >
        {item.num}
      </span>

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        {/* Icon circle */}
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{ width: 72, height: 72, backgroundColor: 'rgba(255,255,255,0.55)' }}
        >
          <Icon size={item.large ? 32 : 26} style={{ color: brand.dark }} />
        </div>
        <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: brand.dark, opacity: 0.55, letterSpacing: '0.12em' }}>
          [{item.num}]
        </span>
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: item.large ? '26px' : '20px',
          fontWeight: 700,
          color: brand.dark,
          lineHeight: 1.2,
          marginBottom: '1rem',
        }}
      >
        {item.name}
      </h3>

      {/* Tasks */}
      <ul className="flex flex-col gap-2 flex-1 mb-5">
        {item.tasks.map((task) => (
          <li key={task} className="flex items-start gap-2" style={{ fontFamily: 'var(--font-dm)', fontSize: item.large ? '15px' : '13px', color: brand.dark, opacity: 0.85 }}>
            <span style={{ flexShrink: 0, marginTop: 2, opacity: 0.6 }} aria-hidden>—</span>
            {task}
          </li>
        ))}
      </ul>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: '11px',
              backgroundColor: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.80)',
              color: brand.dark,
              borderRadius: '3px',
              padding: '2px 8px',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Section ────────────────────────────────────────────────────── */
const BIRDS = [
  { color: '#4A7A3A', size: 48, rotate: -15, left: '2%',  top: '10%' },
  { color: '#8B4A35', size: 32, rotate: 25,  left: '94%', top: '18%' },
  { color: '#2A4A6B', size: 56, rotate: -5,  left: '48%', top: '3%'  },
  { color: '#6B4A1A', size: 28, rotate: 40,  left: '88%', top: '65%' },
  { color: '#4A2A6B', size: 44, rotate: -20, left: '5%',  top: '72%' },
  { color: '#4A7A3A', size: 24, rotate: 10,  left: '72%', top: '88%' },
]

export default function WhatWeAutomate() {
  return (
    <section
      id="zakres"
      className="relative py-28 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(212,228,200,0.30) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(212,200,232,0.30) 0%, transparent 50%),
          radial-gradient(circle at 60% 30%, rgba(242,212,200,0.20) 0%, transparent 40%),
          #F5F3EF
        `,
      }}
    >
      {/* Origami birds in background */}
      {BIRDS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: b.left, top: b.top }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
        >
          <OrigamiBird color={b.color} size={b.size} rotate={b.rotate} opacity={0.28} />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>
        <Reveal className="mb-14">
          <SectionLabel number="02" label="ZAKRES WDROŻEŃ" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A2B47', maxWidth: 540 }}>
            Konkretne systemy.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Konkretne branże.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-auto">
          {INDUSTRIES.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
