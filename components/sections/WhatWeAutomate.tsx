'use client'
import { motion } from 'framer-motion'
import { Globe, ShoppingBag, Clapperboard, Workflow, ArrowRight, Check } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'
import { FoldCorner, useCardFold } from '@/components/ui/FoldCorner'

/* ── Curated accent palette — one deliberate colour per card, ──────
   all tuned to sit next to the navy/gold base without turning
   into a pastel post-it wall. */
const ACCENTS = {
  strony:        { c: '#C9A84C', rgb: '201,168,76'  }, // gold — flagship
  sklepy:        { c: '#C1652F', rgb: '193,101,47'  }, // terracotta
  ugc:           { c: '#1F7A6C', rgb: '31,122,108'  }, // teal
  automatyzacje: { c: '#5B4B8A', rgb: '91,75,138'   }, // indigo
}
const NAVY = '26,43,71'

const SERVICES = [
  {
    id: 'strony'        as const,
    num: '01', Icon: Globe,
    name: 'Strony Internetowe',
    hook: 'Twoja strona ma więcej lat niż Twój najmłodszy pracownik?',
    points: ['Nowa strona w 24–48h, bez czekania tygodniami', 'Ładuje się szybko i dobrze wygląda na telefonie', 'Sam zmienisz tekst czy zdjęcie, bez dzwonienia do nas'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: true,
    portfolio: { name: 'Moniquu Art', url: 'https://www.moniquuart.pl/' },
  },
  {
    id: 'sklepy'        as const,
    num: '02', Icon: ShoppingBag,
    name: 'Sklepy Internetowe',
    hook: 'Chcesz sprzedawać, nie ogarniać oprogramowanie?',
    points: ['Płatności, magazyn i wysyłka działają same', 'Wchodzimy z Tobą na TikTok Shop', 'Mniej klikania po zapleczu, więcej zamówień'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: false,
    portfolio: undefined,
  },
  {
    id: 'ugc'           as const,
    num: '03', Icon: Clapperboard,
    name: 'Reklamy AI (UGC Models)',
    hook: 'Masz produkt i nie wiesz jak go pokazać?',
    points: ['Nagrywamy reklamy bez ekipy i modelek', 'Gotowe wideo pod TikTok/IG/FB w kilka dni', 'Ty zajmujesz się produktem, my kreacją'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: false,
    portfolio: undefined,
  },
  {
    id: 'automatyzacje' as const,
    num: '04', Icon: Workflow,
    name: 'Automatyzacje jako usługa',
    hook: 'Ile godzin tygodniowo zjada Ci Excel i kopiuj-wklej?',
    points: ['Łączymy systemy, które dotąd ze sobą nie gadały', 'Zapytania klientów obsłużone, nawet gdy śpisz', 'Odzyskujesz czas — a nie dokładamy Ci pracy'],
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-3',
    large: false,
    portfolio: undefined,
  },
] as const

/* ── Live portfolio preview ────────────────────────────────────── */
function PortfolioPreview({ name, url, accentRgb }: { name: string; url: string; accentRgb: string }) {
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
        border: `1px solid rgba(${accentRgb},0.30)`,
        backgroundColor: '#fff',
      }}
    >
      {/* Fake browser chrome bar */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid rgba(${accentRgb},0.18)` }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: `rgba(${accentRgb},0.45)` }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: `rgba(${accentRgb},0.30)` }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: `rgba(${accentRgb},0.18)` }} />
        <span className="ml-1.5 truncate" style={{ fontFamily: 'var(--font-ibm)', fontSize: '9px', color: `rgba(${NAVY},0.65)` }}>
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
  const { Icon } = item
  const accent = ACCENTS[item.id]
  const foldSz = item.large ? 56 : 46

  return (
    <div className={item.gridClass} style={{ perspective: '700px' }}
      onClick={() => { window.location.hash = 'kontakt' }}
    >
      <motion.div
        ref={cardRef}
        {...handlers}
        className="h-full flex flex-col gap-4"
        style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          backgroundImage: `radial-gradient(ellipse 420px 220px at 100% 0%, rgba(${accent.rgb},0.12), transparent 70%)`,
          borderTop: `3px solid ${accent.c}`,
          border: `1px solid rgba(${NAVY},0.08)`,
          borderTopWidth: '3px',
          borderTopColor: accent.c,
          borderRadius: '10px',
          padding: item.large ? '24px' : '20px',
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
            ? `0 20px 40px rgba(${accent.rgb},0.18), 0 4px 10px rgba(0,0,0,0.06)`
            : '2px 2px 0 rgba(0,0,0,0.04), 4px 4px 0 rgba(0,0,0,0.03), 6px 6px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* ── Origami corner fold (top-right) ── */}
        <FoldCorner bgRgb="250,250,248" isOpen={hovered} sz={foldSz} />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: 48, height: 48, backgroundColor: `rgba(${accent.rgb},0.14)` }}
          >
            <Icon size={item.large ? 24 : 20} style={{ color: accent.c }} />
          </div>
          <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: accent.c, opacity: 0.85, letterSpacing: '0.1em' }}>
            [{item.num}]
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: item.large ? '23px' : '18px',
          fontWeight: 700,
          color: '#1A2B47',
          lineHeight: 1.2,
        }}>
          {item.name}
        </h3>

        {/* Hook — casual pain-point line, not a sales pitch */}
        <p style={{
          fontFamily: 'var(--font-dm)',
          fontSize: '15px',
          fontStyle: 'italic',
          color: accent.c,
          lineHeight: 1.5,
          marginTop: '-8px',
        }}>
          {item.hook}
        </p>

        {/* Plain-language benefit list */}
        <div className="flex flex-col gap-2 flex-1">
          {item.points.map((point) => (
            <div key={point} className="flex items-start gap-2">
              <Check size={15} style={{ color: accent.c, flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: 'var(--font-dm)', fontSize: '13.5px', color: 'rgba(26,43,71,0.82)', lineHeight: 1.5 }}>
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* Real portfolio project, if any */}
        {item.portfolio && (
          <PortfolioPreview name={item.portfolio.name} url={item.portfolio.url} accentRgb={accent.rgb} />
        )}

        {/* CTA link */}
        <a
          href="#kontakt"
          className="inline-flex items-center gap-1.5 mt-1 transition-opacity duration-200"
          style={{
            fontFamily: 'var(--font-ibm)',
            fontSize: '11px',
            fontWeight: 600,
            color: accent.c,
            opacity: hovered ? 1 : 0.75,
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

/* ── Section ─────────────────────────────────────────────────────── */
export default function WhatWeAutomate() {
  return (
    <section
      id="zakres"
      className="relative py-28 overflow-hidden"
      style={{
        backgroundColor: '#F5F3EF',
        backgroundImage: `
          linear-gradient(rgba(26,43,71,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,43,71,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>
        <Reveal className="mb-12">
          <SectionLabel number="02" label="ZAKRES USŁUG" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(34px, 5vw, 46px)', fontWeight: 700, color: '#1A2B47', maxWidth: 520 }}>
            Cztery usługi.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Jeden cel — czas.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 auto-rows-auto">
          {SERVICES.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
