'use client'
import { motion } from 'framer-motion'
import { Scale, Stethoscope, Building2, Landmark, Factory } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

/* ── Brand config ──────────────────────────────────────────────── */
const BRAND = {
  kancelarie:    { bg: '#D4E4C8', bgRgb: '212,228,200', dark: '#4A7A3A', darkRgb: '74,122,58'   },
  kliniki:       { bg: '#F2D4C8', bgRgb: '242,212,200', dark: '#8B4A35', darkRgb: '139,74,53'   },
  nieruchomosci: { bg: '#C8D4E8', bgRgb: '200,212,232', dark: '#2A4A6B', darkRgb: '42,74,107'   },
  deweloperzy:   { bg: '#E8DCC8', bgRgb: '232,220,200', dark: '#6B4A1A', darkRgb: '107,74,26'   },
  produkcja:     { bg: '#D4C8E8', bgRgb: '212,200,232', dark: '#4A2A6B', darkRgb: '74,42,107'   },
}

const INDUSTRIES = [
  {
    id: 'kancelarie'    as const,
    num: '01', Icon: Scale,
    name: 'Kancelarie Prawne',
    tasks: ['Auto-generowanie umów z szablonów', 'Chatbot intake klientów 24/7', 'System follow-up i przypomnień', 'Automatyczne faktury i dokumenty'],
    stack: ['n8n', 'Claude AI', 'DocuSign'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2',
    large: true,
  },
  {
    id: 'kliniki'       as const,
    num: '02', Icon: Stethoscope,
    name: 'Kliniki / Stomatologia',
    tasks: ['Chatbot umawiający wizyty', 'SMS/email — −60% no-show', 'Automatyczny wywiad medyczny', 'Raporty NFZ i dokumentacja'],
    stack: ['Make.com', 'Twilio', 'CRM'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: false,
  },
  {
    id: 'nieruchomosci' as const,
    num: '03', Icon: Building2,
    name: 'Agencje Nieruchomości',
    tasks: ['Auto-odpowiedzi na OLX/Otodom', 'Kwalifikacja leadów przez AI', 'Generowanie opisów', 'CRM pipeline automatyczny'],
    stack: ['Make.com', 'GPT-4', 'CRM'],
    gridClass: 'col-span-1 md:col-span-1 lg:col-span-2',
    large: false,
  },
  {
    id: 'deweloperzy'   as const,
    num: '04', Icon: Landmark,
    name: 'Deweloperzy',
    tasks: ['Raporty sprzedaży auto-generowane', 'Dashboard KPI real-time', 'Auto-follow-up kupujących', 'Integracja z ERP'],
    stack: ['n8n', 'PostgreSQL', 'Claude AI'],
    gridClass: 'col-span-1 md:col-span-1 lg:col-span-2',
    large: false,
  },
  {
    id: 'produkcja'     as const,
    num: '05', Icon: Factory,
    name: 'Firmy Produkcyjne',
    tasks: ['Zamówienia przy niskim stanie', 'Raporty produkcyjne codzienne', 'System zgłoszeń i eskalacji', 'Integracja z ERP/WMS'],
    stack: ['n8n', 'Make.com', 'ERP API'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-2',
    large: false,
  },
] as const

/* ── 3D task block — each sentence on its own "layer" ─────────── */
function TaskBlock({ text, darkRgb, index }: { text: string; darkRgb: string; index: number }) {
  // Each successive block has slightly more shadow — depth illusion
  const depth = 2 + index * 0.5
  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.58)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderRadius: '4px',
        padding: '5px 9px 5px 9px',
        fontSize: '12px',
        fontFamily: 'var(--font-dm)',
        color: `rgba(${darkRgb},0.90)`,
        lineHeight: 1.4,
        borderLeft: `2px solid rgba(${darkRgb},0.28)`,
        /* 3D block: right face + bottom face + corner + drop */
        boxShadow: `
          ${depth}px 0 0 rgba(${darkRgb},0.18),
          0 ${depth}px 0 rgba(${darkRgb},0.13),
          ${depth}px ${depth}px 0 rgba(${darkRgb},0.11),
          ${depth + 2}px ${depth + 2}px ${8 + index * 1.5}px rgba(0,0,0,0.07)
        `,
      }}
    >
      {text}
    </div>
  )
}

/* ── Origami bird ──────────────────────────────────────────────── */
function OrigamiBird({ color, size = 32, rotate = 0, opacity = 0.28 }: { color: string; size?: number; rotate?: number; opacity?: number }) {
  return (
    <svg viewBox="0 0 40 30" width={size} height={size * 0.75}
      style={{ color, transform: `rotate(${rotate}deg)`, opacity }} aria-hidden>
      <polygon points="0,30 20,0 40,30"  fill="currentColor" opacity="0.4" />
      <polygon points="20,0 40,30 20,20" fill="currentColor" opacity="0.6" />
      <polygon points="0,30 20,20 10,30" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

/* ── Industry card ──────────────────────────────────────────────── */
function Card({ item }: { item: (typeof INDUSTRIES)[number] }) {
  const b = BRAND[item.id]
  const { Icon } = item

  return (
    /* Perspective wrapper — "viewed from above" */
    <div
      className={item.gridClass}
      style={{ perspective: '600px' }}
    >
      <motion.div
        className="paper-fold h-full flex flex-col gap-3"
        style={{
          /* Transparent glass over brand colour */
          backgroundColor: `rgba(${b.bgRgb},0.42)`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid rgba(255,255,255,0.60)`,
          borderRadius: '8px',
          padding: item.large ? '20px' : '16px',
          boxShadow: `2px 2px 0 rgba(0,0,0,0.05), 4px 4px 0 rgba(0,0,0,0.03), 6px 6px 16px rgba(0,0,0,0.07)`,
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          height: '100%',
        }}
        initial={{ rotateX: 6, opacity: 0, y: 20 }}
        whileInView={{ rotateX: 6, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        whileHover={{
          rotateX: 1,
          y: -6,
          boxShadow: '4px 12px 28px rgba(0,0,0,0.13)',
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.50)' }}
          >
            <Icon size={item.large ? 24 : 20} style={{ color: b.dark }} />
          </div>
          <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: b.dark, opacity: 0.5, letterSpacing: '0.1em' }}>
            [{item.num}]
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: item.large ? '22px' : '17px',
          fontWeight: 700,
          color: b.dark,
          lineHeight: 1.2,
        }}>
          {item.name}
        </h3>

        {/* 3D task blocks — the core effect */}
        <div className="flex flex-col gap-1.5 flex-1">
          {item.tasks.map((task, i) => (
            <TaskBlock key={task} text={task} darkRgb={b.darkRgb} index={i} />
          ))}
        </div>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.stack.map((tech) => (
            <span key={tech} style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: '10px',
              backgroundColor: 'rgba(255,255,255,0.50)',
              border: '1px solid rgba(255,255,255,0.75)',
              color: b.dark,
              borderRadius: '3px',
              padding: '2px 6px',
            }}>
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/* ── Decorative birds ──────────────────────────────────────────── */
const BIRDS = [
  { color: '#4A7A3A', size: 44, rotate: -15, left: '1%',  top: '8%'  },
  { color: '#8B4A35', size: 28, rotate: 25,  left: '95%', top: '16%' },
  { color: '#2A4A6B', size: 52, rotate: -5,  left: '47%', top: '2%'  },
  { color: '#6B4A1A', size: 26, rotate: 40,  left: '87%', top: '68%' },
  { color: '#4A2A6B', size: 40, rotate: -20, left: '4%',  top: '75%' },
  { color: '#4A7A3A', size: 22, rotate: 10,  left: '73%', top: '90%' },
]

/* ── Section ─────────────────────────────────────────────────────── */
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
      {/* Origami birds */}
      {BIRDS.map((b, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ left: b.left, top: b.top }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
        >
          <OrigamiBird color={b.color} size={b.size} rotate={b.rotate} />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>
        <Reveal className="mb-12">
          <SectionLabel number="02" label="ZAKRES WDROŻEŃ" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(34px, 5vw, 46px)', fontWeight: 700, color: '#1A2B47', maxWidth: 520 }}>
            Konkretne systemy.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Konkretne branże.</span>
          </h2>
        </Reveal>

        {/* Bento grid — 6 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-auto">
          {INDUSTRIES.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
