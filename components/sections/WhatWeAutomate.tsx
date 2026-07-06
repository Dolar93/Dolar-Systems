'use client'
import { motion } from 'framer-motion'
import { Globe, ShoppingBag, Clapperboard, Workflow, ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'
import { FoldCorner, useCardFold } from '@/components/ui/FoldCorner'

/* ── Brand config ──────────────────────────────────────────────── */
const BRAND = {
  strony:        { bgRgb: '212,228,200', dark: '#4A7A3A', darkRgb: '74,122,58'  },
  sklepy:        { bgRgb: '242,212,200', dark: '#8B4A35', darkRgb: '139,74,53'  },
  ugc:           { bgRgb: '212,200,232', dark: '#4A2A6B', darkRgb: '74,42,107'  },
  automatyzacje: { bgRgb: '200,212,232', dark: '#2A4A6B', darkRgb: '42,74,107'  },
}

const SERVICES = [
  {
    id: 'strony'        as const,
    num: '01', Icon: Globe,
    name: 'Strony Internetowe',
    tasks: ['Premium design, wdrożenie w 24-48h', 'Next.js — szybkość i SEO od pierwszego dnia', 'Bez szablonów sprzed dekady', 'Panel do samodzielnej edycji treści'],
    stack: ['Next.js', 'Framer Motion', 'Vercel'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: true,
    portfolio: { name: 'Moniquu Art', url: 'https://www.moniquuart.pl/' },
  },
  {
    id: 'sklepy'        as const,
    num: '02', Icon: ShoppingBag,
    name: 'Sklepy Internetowe',
    tasks: ['E-commerce od zera lub migracja', 'Wdrożenie sprzedaży na TikTok Shop', 'Płatności, magazyn, wysyłka — spięte', 'Integracja z Allegro/OLX'],
    stack: ['Next.js', 'TikTok Shop', 'Stripe'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: false,
  },
  {
    id: 'ugc'           as const,
    num: '03', Icon: Clapperboard,
    name: 'Reklamy AI (UGC Models)',
    tasks: ['Masz produkt i nie wiesz jak go zareklamować?', 'AI-modelki nagrywają reklamy zamiast ekipy zdjęciowej', 'Gotowe wideo pod TikTok/IG/FB w kilka dni', 'Bez castingu, studia i logistyki zdjęciowej'],
    stack: ['Higgsfield', 'Buffer'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: false,
  },
  {
    id: 'automatyzacje' as const,
    num: '04', Icon: Workflow,
    name: 'Automatyzacje jako usługa',
    tasks: ['Koniec z ręcznym Excelem i copy-paste', 'Systemy klienta połączone ze sobą', 'AI recepcjonista/chatbot 24/7', 'Integracje CRM, ERP, e-mail w jednym'],
    stack: ['n8n', 'Make.com', 'Claude AI'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: false,
  },
] as const


/* ── 3D task block ─────────────────────────────────────────────── */
function TaskBlock({ text, darkRgb, index }: { text: string; darkRgb: string; index: number }) {
  const d = 2 + index * 0.6
  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.58)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderRadius: '4px',
        padding: '5px 9px',
        fontSize: '12px',
        fontFamily: 'var(--font-dm)',
        color: `rgba(${darkRgb},0.90)`,
        lineHeight: 1.4,
        borderLeft: `2px solid rgba(${darkRgb},0.28)`,
        boxShadow: `
          ${d}px 0 0 rgba(${darkRgb},0.18),
          0 ${d}px 0 rgba(${darkRgb},0.13),
          ${d}px ${d}px 0 rgba(${darkRgb},0.11),
          ${d + 2}px ${d + 2}px ${8 + index * 1.5}px rgba(0,0,0,0.07)
        `,
      }}
    >
      {text}
    </div>
  )
}

/* ── Origami bird ─────────────────────────────────────────────── */
function OrigamiBird({ color, size = 32, rotate = 0, opacity = 0.28 }: {
  color: string; size?: number; rotate?: number; opacity?: number
}) {
  return (
    <svg viewBox="0 0 40 30" width={size} height={size * 0.75}
      style={{ color, transform: `rotate(${rotate}deg)`, opacity }} aria-hidden>
      <polygon points="0,30 20,0 40,30"  fill="currentColor" opacity="0.4" />
      <polygon points="20,0 40,30 20,20" fill="currentColor" opacity="0.6" />
      <polygon points="0,30 20,20 10,30" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

/* ── Live portfolio preview ────────────────────────────────────── */
function PortfolioPreview({ name, url, darkRgb }: { name: string; url: string; darkRgb: string }) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="block group"
      style={{
        borderRadius: '6px',
        overflow: 'hidden',
        border: `1px solid rgba(${darkRgb},0.22)`,
        backgroundColor: 'rgba(255,255,255,0.55)',
      }}
    >
      {/* Fake browser chrome bar */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid rgba(${darkRgb},0.15)` }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: `rgba(${darkRgb},0.35)` }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: `rgba(${darkRgb},0.25)` }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: `rgba(${darkRgb},0.15)` }} />
        <span className="ml-1.5 truncate" style={{ fontFamily: 'var(--font-ibm)', fontSize: '9px', color: `rgba(${darkRgb},0.65)` }}>
          {host}
        </span>
      </div>
      {/* Live embedded preview of the real project */}
      <div className="relative w-full overflow-hidden" style={{ height: 110, backgroundColor: '#fff' }}>
        <iframe
          src={url}
          title={`Podgląd projektu: ${name}`}
          loading="lazy"
          className="absolute pointer-events-none"
          style={{ width: '250%', height: '250%', transform: 'scale(0.4)', transformOrigin: 'top left', border: 0 }}
        />
        <div
          className="absolute inset-0 flex items-end justify-between px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)' }}
        >
          <span style={{ fontFamily: 'var(--font-dm)', fontSize: '11px', color: '#fff' }}>{name}</span>
          <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#fff' }}>Zobacz na żywo ↗</span>
        </div>
      </div>
    </a>
  )
}

/* ── Service card ──────────────────────────────────────────────── */
function Card({ item }: { item: (typeof SERVICES)[number] }) {
  const { hovered, ref: cardRef, handlers } = useCardFold()
  const b = BRAND[item.id]
  const { Icon } = item
  const foldSz = item.large ? 56 : 46

  return (
    <div className={item.gridClass} style={{ perspective: '700px' }}
      onClick={() => { window.location.hash = 'kontakt' }}
    >
      <motion.div
        ref={cardRef}
        {...handlers}
        className="h-full flex flex-col gap-3"
        style={{
          position: 'relative',
          backgroundColor: `rgba(${b.bgRgb},0.42)`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.60)',
          borderRadius: '8px',
          padding: item.large ? '20px' : '16px',
          overflow: 'visible',
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
        initial={{ rotateX: 6, opacity: 0, y: 20 }}
        whileInView={{ rotateX: 6, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        animate={{
          rotateX: hovered ? 1 : 6,
          y:       hovered ? -6 : 0,
          boxShadow: hovered
            ? '4px 14px 32px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.06)'
            : '2px 2px 0 rgba(0,0,0,0.05), 4px 4px 0 rgba(0,0,0,0.03), 6px 6px 16px rgba(0,0,0,0.07)',
        }}
      >
        {/* ── Origami corner fold (top-right) ── */}
        <FoldCorner bgRgb={b.bgRgb} isOpen={hovered} sz={foldSz} />

        {/* Header */}
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

        {/* 3D task blocks */}
        <div className="flex flex-col gap-1.5 flex-1">
          {item.tasks.map((task, i) => (
            <TaskBlock key={task} text={task} darkRgb={b.darkRgb} index={i} />
          ))}
        </div>

        {/* Real portfolio project, if any */}
        {item.portfolio && (
          <PortfolioPreview name={item.portfolio.name} url={item.portfolio.url} darkRgb={b.darkRgb} />
        )}

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

        {/* CTA link */}
        <a
          href="#kontakt"
          className="inline-flex items-center gap-1.5 mt-1 transition-opacity duration-200"
          style={{
            fontFamily: 'var(--font-ibm)',
            fontSize: '11px',
            color: b.dark,
            opacity: hovered ? 1 : 0.55,
            letterSpacing: '0.08em',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Zapytaj o ofertę
          <ArrowRight size={11} />
        </a>
      </motion.div>
    </div>
  )
}

/* ── Background birds ──────────────────────────────────────────── */
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
          <SectionLabel number="02" label="ZAKRES USŁUG" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(34px, 5vw, 46px)', fontWeight: 700, color: '#1A2B47', maxWidth: 520 }}>
            Cztery usługi.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Jeden cel — czas.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-auto">
          {SERVICES.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
