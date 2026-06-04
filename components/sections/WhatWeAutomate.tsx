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
    accent: '#4F46E5',
    accentBg: 'rgba(79,70,229,0.07)',
    span: 'lg:col-span-2',
  },
  {
    num: '02',
    Icon: Stethoscope,
    name: 'Kliniki / Stomatologia',
    tasks: [
      'Chatbot umawiający wizyty',
      'SMS/email — 60% mniej no-show',
      'Automatyczny wywiad medyczny',
      'Raporty NFZ i dokumentacja',
    ],
    stack: ['Make.com', 'Twilio', 'CRM'],
    accent: '#0D9488',
    accentBg: 'rgba(13,148,136,0.07)',
    span: '',
  },
  {
    num: '03',
    Icon: Building2,
    name: 'Agencje Nieruchomości',
    tasks: [
      'Auto-odpowiedzi na zapytania OLX/Otodom',
      'Kwalifikacja leadów przez AI',
      'Generowanie opisów nieruchomości',
      'CRM pipeline automatyczny',
    ],
    stack: ['Make.com', 'GPT-4', 'CRM'],
    accent: '#F59E0B',
    accentBg: 'rgba(245,158,11,0.07)',
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
    accent: '#7C3AED',
    accentBg: 'rgba(124,58,237,0.07)',
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
    accent: '#EA580C',
    accentBg: 'rgba(234,88,12,0.07)',
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
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -4 } : { y: 0 }}
      transition={{ duration: 0.22, type: 'spring', stiffness: 300, damping: 24 }}
      className={`flex flex-col gap-5 p-7 rounded-2xl ${item.span}`}
      style={{
        backgroundColor: '#FFFFFF',
        border: `1.5px solid ${hovered ? item.accent : '#E7E5E4'}`,
        boxShadow: hovered
          ? `0 8px 32px rgba(28,25,23,0.10), 0 0 0 1px ${item.accent}22`
          : '0 1px 4px rgba(28,25,23,0.06)',
        transition: 'border-color 0.22s, box-shadow 0.22s',
        cursor: 'default',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            fontFamily: 'var(--font-ibm)',
            color: item.accent,
            backgroundColor: item.accentBg,
            fontSize: '10px',
          }}
        >
          {item.num}
        </span>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-220"
          style={{
            backgroundColor: hovered ? item.accentBg : '#F4F1EB',
          }}
        >
          <Icon
            size={17}
            style={{ color: hovered ? item.accent : '#A8A29E', transition: 'color 0.22s' }}
          />
        </div>
      </div>

      {/* Name */}
      <h3
        className="text-base font-semibold leading-snug"
        style={{ fontFamily: 'var(--font-fraunces)', color: '#1C1917' }}
      >
        {item.name}
      </h3>

      {/* Tasks */}
      <ul className="flex flex-col gap-2 flex-1">
        {item.tasks.map((task) => (
          <li
            key={task}
            className="flex items-start gap-2 text-sm"
            style={{ color: '#57534E', fontFamily: 'var(--font-dm)' }}
          >
            <span
              style={{ color: item.accent, flexShrink: 0, marginTop: 2, fontSize: '14px' }}
              aria-hidden
            >
              ✓
            </span>
            {task}
          </li>
        ))}
      </ul>

      {/* Stack badges */}
      <div
        className="flex flex-wrap gap-2 pt-4"
        style={{ borderTop: '1px solid #F0EDE6' }}
      >
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] px-2.5 py-1 rounded-full"
            style={{
              fontFamily: 'var(--font-ibm)',
              color: item.accent,
              border: `1px solid ${item.accent}28`,
              backgroundColor: item.accentBg,
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
    <section
      id="zakres"
      className="py-28"
      style={{ backgroundColor: '#F4F1EB' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="02" label="ZAKRES WDROŻEŃ" />
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-fraunces)', color: '#1C1917' }}
          >
            Konkretne systemy.{' '}
            <span style={{ color: '#4F46E5', fontStyle: 'italic' }}>
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
