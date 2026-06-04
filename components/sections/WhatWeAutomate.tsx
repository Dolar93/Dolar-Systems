'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Stethoscope, Building2, Landmark, Factory } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

const INDUSTRIES = [
  {
    num: '01',
    Icon: Scale,
    name: 'Kancelarie Prawne',
    tasks: [
      'Auto-generowanie umów z szablonów',
      'Chatbot intake klientów 24/7',
      'System follow-up i przypomnień',
      'Automatyczne faktury i dokumenty',
    ],
    stack: ['n8n', 'Claude AI', 'DocuSign'],
    span: 'lg:col-span-2',
  },
  {
    num: '02',
    Icon: Stethoscope,
    name: 'Kliniki / Stomatologia',
    tasks: [
      'Chatbot umawiający wizyty',
      'SMS/email — −60% no-show',
      'Automatyczny wywiad medyczny',
      'Raporty NFZ i dokumentacja',
    ],
    stack: ['Make.com', 'Twilio', 'CRM'],
    span: '',
  },
  {
    num: '03',
    Icon: Building2,
    name: 'Agencje Nieruchomości',
    tasks: [
      'Auto-odpowiedzi na OLX/Otodom',
      'Kwalifikacja leadów przez AI',
      'Generowanie opisów nieruchomości',
      'CRM pipeline automatyczny',
    ],
    stack: ['Make.com', 'GPT-4', 'CRM'],
    span: '',
  },
  {
    num: '04',
    Icon: Landmark,
    name: 'Deweloperzy',
    tasks: [
      'Raporty sprzedaży auto-generowane',
      'Dashboard KPI w czasie rzeczywistym',
      'Auto-follow-up kupujących',
      'Integracja z systemami ERP',
    ],
    stack: ['n8n', 'PostgreSQL', 'Claude AI'],
    span: '',
  },
  {
    num: '05',
    Icon: Factory,
    name: 'Firmy Produkcyjne',
    tasks: [
      'Automatyczne zamówienia przy niskim stanie',
      'Raporty produkcyjne codzienne',
      'System zgłoszeń i eskalacji',
      'Integracja z ERP/WMS',
    ],
    stack: ['n8n', 'Make.com', 'ERP API'],
    span: '',
  },
]

function Card({ item, index }: { item: (typeof INDUSTRIES)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = item

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: {
          opacity: 1, y: 0,
          transition: { duration: 0.6, delay: index * 0.09, ease: 'easeOut' },
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -4 } : { y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative flex flex-col gap-5 p-8 overflow-hidden ${item.span}`}
      style={{
        backgroundColor: '#FAFAF8',
        border: '1px solid rgba(26,43,71,0.10)',
        borderRadius: '8px',
        boxShadow: hovered
          ? '0 8px 32px rgba(26,43,71,0.12), 0 2px 8px rgba(26,43,71,0.06)'
          : '0 2px 12px rgba(26,43,71,0.08), 0 1px 3px rgba(26,43,71,0.04)',
        transition: 'box-shadow 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Watermark number */}
      <span
        className="absolute -bottom-4 -left-2 select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: '96px',
          fontStyle: 'italic',
          fontWeight: 700,
          color: 'rgba(26,43,71,0.05)',
          lineHeight: 1,
        }}
        aria-hidden
      >
        {item.num}
      </span>

      {/* Icon */}
      <div className="flex items-start justify-between">
        <Icon
          size={24}
          style={{ color: hovered ? '#C9A84C' : '#1A2B47', transition: 'color 0.25s' }}
        />
        <span
          style={{
            fontFamily: 'var(--font-ibm)',
            fontSize: '10px',
            color: '#8A9AB5',
            letterSpacing: '0.12em',
          }}
        >
          [{item.num}]
        </span>
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: '20px',
          fontWeight: 600,
          color: '#1A2B47',
          lineHeight: 1.25,
        }}
      >
        {item.name}
      </h3>

      {/* Tasks */}
      <ul className="flex flex-col gap-2 flex-1">
        {item.tasks.map((task) => (
          <li
            key={task}
            className="flex items-start gap-2 text-sm"
            style={{ color: '#3D4F6B', fontFamily: 'var(--font-dm)' }}
          >
            <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: 2 }} aria-hidden>—</span>
            {task}
          </li>
        ))}
      </ul>

      {/* Stack badges */}
      <div
        className="flex flex-wrap gap-2 pt-4"
        style={{ borderTop: '1px solid rgba(26,43,71,0.07)' }}
      >
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2 py-0.5"
            style={{
              fontFamily: 'var(--font-ibm)',
              backgroundColor: 'rgba(26,43,71,0.06)',
              color: '#3D4F6B',
              borderRadius: '2px',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function WhatWeAutomate() {
  return (
    <section id="zakres" className="py-28" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="02" label="ZAKRES WDROŻEŃ" />
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 700,
              color: '#1A2B47',
              lineHeight: 1.2,
              maxWidth: 540,
            }}
          >
            Konkretne systemy.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>
              Konkretne branże.
            </span>
          </h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {INDUSTRIES.map((item, i) => (
            <Card key={item.num} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
