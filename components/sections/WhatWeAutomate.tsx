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
    name: 'KANCELARIE PRAWNE',
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
    name: 'KLINIKI / STOMATOLOGIA',
    tasks: [
      'Chatbot umawiający wizyty',
      'SMS/email przypomnienia (–60% no-show)',
      'Automatyczny wywiad medyczny',
      'Raporty NFZ i dokumentacja',
    ],
    stack: ['Make.com', 'Twilio', 'CRM'],
    span: '',
  },
  {
    num: '03',
    Icon: Building2,
    name: 'AGENCJE NIERUCHOMOŚCI',
    tasks: [
      'Auto-odpowiedzi na zapytania OLX/Otodom',
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
    name: 'DEWELOPERZY',
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
    name: 'FIRMY PRODUKCYJNE',
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

function Card({
  item,
  index,
}: {
  item: (typeof INDUSTRIES)[0]
  index: number
}) {
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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className={`flex flex-col gap-5 p-7 ${item.span}`}
      style={{
        border: `2px solid ${hovered ? '#00D4FF' : '#1E1E1E'}`,
        backgroundColor: '#111111',
        transition: 'border-color 0.22s',
        cursor: 'default',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <span
          className="text-xs"
          style={{ fontFamily: 'var(--font-space-mono)', color: '#2A2A2A' }}
        >
          [ {item.num} ]
        </span>
        <Icon
          size={18}
          style={{
            color: hovered ? '#00D4FF' : '#333',
            transition: 'color 0.22s',
          }}
        />
      </div>

      {/* Name */}
      <h3
        className="text-[13px] font-bold"
        style={{
          fontFamily: 'var(--font-ibm)',
          color: '#F5F5F5',
          letterSpacing: '0.06em',
        }}
      >
        {item.name}
      </h3>

      {/* Tasks */}
      <ul className="flex flex-col gap-2 flex-1">
        {item.tasks.map((task) => (
          <li
            key={task}
            className="flex items-start gap-2 text-xs"
            style={{ color: '#555', fontFamily: 'var(--font-inter)' }}
          >
            <span
              style={{ color: '#00D4FF', flexShrink: 0, marginTop: 1 }}
              aria-hidden
            >
              ›
            </span>
            {task}
          </li>
        ))}
      </ul>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop: '1px solid #1A1A1A' }}>
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] px-2 py-0.5"
            style={{
              fontFamily: 'var(--font-space-mono)',
              color: '#00D4FF',
              border: '1px solid rgba(0,212,255,0.18)',
              backgroundColor: 'rgba(0,212,255,0.04)',
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
      className="py-28 terminal-grid-dense"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="02" label="ZAKRES WDROŻEŃ" />
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', color: '#F5F5F5' }}
          >
            Konkretne systemy.
            <br />
            <span style={{ color: '#00D4FF' }}>Konkretne branże.</span>
          </h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {INDUSTRIES.map((item, i) => (
            <Card key={item.num} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
