'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, CheckCheck, Clock, ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'
import { FoldCorner, useCardFold } from '@/components/ui/FoldCorner'
import { getNicheBySlug } from '@/data/niches'
import type { NicheData } from '@/data/niches'

/* ── Animated counter ──────────────────────────────────────────────── */
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

/* ── Origami bird ──────────────────────────────────────────────────── */
function OrigamiBird({ color, size = 32, rotate = 0, opacity = 0.22 }: {
  color: string; size?: number; rotate?: number; opacity?: number
}) {
  return (
    <svg viewBox="0 0 40 30" width={size} height={size * 0.75}
      style={{ color, transform: `rotate(${rotate}deg)`, opacity }} aria-hidden>
      <polygon points="0,30 20,0 40,30" fill="currentColor" opacity="0.4" />
      <polygon points="20,0 40,30 20,20" fill="currentColor" opacity="0.6" />
      <polygon points="0,30 20,20 10,30" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

/* ── Hero stat card ────────────────────────────────────────────────── */
function HeroStatCard({ val, label, dark }: { val: string; label: string; dark: string }) {
  const { hovered, ref, handlers } = useCardFold()
  return (
    <div ref={ref} {...handlers} className="flex-1 min-w-0" style={{ position: 'relative' }}>
      <FoldCorner isOpen={hovered} sz={28} bgRgb="250,250,248" />
      <div
        className="text-center p-4"
        style={{
          backgroundColor: '#FAFAF8',
          border: '1px solid rgba(26,43,71,0.09)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: hovered
            ? '4px 10px 24px rgba(0,0,0,0.12)'
            : '2px 2px 0px rgba(0,0,0,0.05), 4px 4px 0px rgba(0,0,0,0.03), 8px 8px 16px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s ease, transform 0.25s ease',
          transform: hovered ? 'translateY(-3px)' : 'none',
        }}
      >
        <div style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(20px,3.5vw,26px)', fontWeight: 700, color: dark, lineHeight: 1, marginBottom: '4px' }}>
          {val}
        </div>
        <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.14em' }}>
          {label}
        </div>
      </div>
    </div>
  )
}

/* ── Pain point card ───────────────────────────────────────────────── */
function PainCard({ item, dark, darkRgb, index }: {
  item: { num: string; title: string; desc: string }; dark: string; darkRgb: string; index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col gap-3 p-6"
      style={{
        backgroundColor: '#FAFAF8',
        border: '1px solid rgba(26,43,71,0.08)',
        borderRadius: '8px',
        borderLeft: `3px solid rgba(${darkRgb},0.35)`,
        boxShadow: '2px 2px 0px rgba(0,0,0,0.04), 6px 6px 16px rgba(0,0,0,0.06)',
      }}
    >
      <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: dark, opacity: 0.55, letterSpacing: '0.12em' }}>
        [{item.num}]
      </span>
      <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '17px', fontWeight: 700, color: '#1A2B47', lineHeight: 1.25 }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B', lineHeight: 1.75 }}>
        {item.desc}
      </p>
    </motion.div>
  )
}

/* ── System card ───────────────────────────────────────────────────── */
function SystemCard({ item, dark, darkRgb, bgRgb, index }: {
  item: { name: string; desc: string; tools: string[]; impact: string }
  dark: string; darkRgb: string; bgRgb: string; index: number
}) {
  const { hovered, ref: cardRef, handlers } = useCardFold()
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      style={{ position: 'relative' }}
    >
      <FoldCorner bgRgb={bgRgb} isOpen={hovered} sz={44} />
      <div
        ref={cardRef}
        {...handlers}
        className="flex flex-col gap-3 h-full"
        style={{
          backgroundColor: `rgba(${bgRgb},0.38)`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.55)',
          borderRadius: '8px',
          padding: '20px',
          overflow: 'visible',
          boxShadow: hovered
            ? '4px 14px 32px rgba(0,0,0,0.12)'
            : '2px 2px 0px rgba(0,0,0,0.04), 4px 4px 0px rgba(0,0,0,0.03), 6px 6px 16px rgba(0,0,0,0.07)',
          transition: 'box-shadow 0.3s ease, transform 0.25s ease',
          transform: hovered ? 'translateY(-4px)' : 'none',
          cursor: 'default',
        }}
      >
        <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', fontWeight: 700, color: dark, lineHeight: 1.2 }}>
          {item.name}
        </h3>
        <p style={{ fontFamily: 'var(--font-dm)', fontSize: '13.5px', color: `rgba(${darkRgb},0.80)`, lineHeight: 1.75, flex: 1 }}>
          {item.desc}
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(255,255,255,0.55)',
          border: `1px solid rgba(${darkRgb},0.20)`,
          borderRadius: '4px',
          padding: '5px 10px',
          fontFamily: 'var(--font-ibm)',
          fontSize: '11px',
          color: dark,
          fontWeight: 500,
        }}>
          <ArrowRight size={10} />
          {item.impact}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tools.map((t) => (
            <span key={t} style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: '10px',
              backgroundColor: 'rgba(255,255,255,0.50)',
              border: '1px solid rgba(255,255,255,0.70)',
              color: dark,
              borderRadius: '3px',
              padding: '2px 7px',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Process step ──────────────────────────────────────────────────── */
function ProcessStep({ item, dark, darkRgb, index, total }: {
  item: { step: string; title: string; desc: string }; dark: string; darkRgb: string; index: number; total: number
}) {
  return (
    <motion.div
      className="flex flex-col gap-3 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-8 left-full w-full z-0" style={{ height: '1px', backgroundColor: `rgba(${darkRgb},0.15)`, transform: 'translateX(-50%)' }} />
      )}
      <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '42px', fontWeight: 600, color: `rgba(${darkRgb},0.18)`, lineHeight: 1 }}>
        {item.step}
      </div>
      <div style={{ width: 32, height: 2, backgroundColor: `rgba(${darkRgb},0.30)`, borderRadius: 1 }} />
      <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '17px', fontWeight: 700, color: '#1A2B47', lineHeight: 1.3 }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B', lineHeight: 1.75 }}>
        {item.desc}
      </p>
    </motion.div>
  )
}

/* ── Metric counter ────────────────────────────────────────────────── */
function AnimatedMetric({ val, prefix, suffix, label, inView, dark }: {
  val: number; prefix: string; suffix: string; label: string; inView: boolean; dark: string
}) {
  const count = useCountUp(val, inView)
  return (
    <div className="text-center px-8">
      <div style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(42px,6vw,56px)', fontWeight: 700, color: dark, lineHeight: 1 }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: dark, opacity: 0.6, letterSpacing: '0.14em', marginTop: 6 }}>
        {label}
      </div>
    </div>
  )
}

/* ── Pricing card ──────────────────────────────────────────────────── */
function PricingCard({ item, dark, darkRgb, bgRgb, index }: {
  item: { name: string; price: string; desc: string; features: string[]; highlighted?: boolean }
  dark: string; darkRgb: string; bgRgb: string; index: number
}) {
  const { hovered, ref: cardRef, handlers } = useCardFold()
  const bg = item.highlighted ? `rgba(${bgRgb},0.50)` : '#FAFAF8'
  const foldBg = item.highlighted ? bgRgb : '250,250,248'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      style={{ position: 'relative', flex: 1 }}
    >
      <FoldCorner bgRgb={foldBg} isOpen={hovered} sz={40} />
      {item.highlighted && (
        <div style={{
          position: 'absolute',
          top: -12, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-ibm)',
          fontSize: '10px',
          backgroundColor: dark,
          color: '#F5F3EF',
          borderRadius: '3px',
          padding: '3px 12px',
          letterSpacing: '0.12em',
          whiteSpace: 'nowrap',
          zIndex: 10,
        }}>
          NAJPOPULARNIEJSZY
        </div>
      )}
      <div
        ref={cardRef}
        {...handlers}
        className="flex flex-col h-full"
        style={{
          backgroundColor: bg,
          backdropFilter: item.highlighted ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: item.highlighted ? 'blur(12px)' : 'none',
          border: item.highlighted
            ? `1.5px solid rgba(${darkRgb},0.35)`
            : '1px solid rgba(26,43,71,0.09)',
          borderRadius: '8px',
          padding: '28px 24px',
          overflow: 'visible',
          boxShadow: hovered
            ? '4px 14px 32px rgba(0,0,0,0.14)'
            : item.highlighted
              ? `2px 2px 0px rgba(${darkRgb},0.08), 6px 6px 20px rgba(${darkRgb},0.12)`
              : '2px 2px 0px rgba(0,0,0,0.05), 6px 6px 16px rgba(0,0,0,0.07)',
          transition: 'box-shadow 0.3s ease, transform 0.25s ease',
          transform: hovered ? 'translateY(-5px)' : 'none',
        }}
      >
        <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: item.highlighted ? dark : '#8A9AB5', letterSpacing: '0.18em', marginBottom: 10 }}>
          {item.name.toUpperCase()}
        </div>
        <div style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(24px,3vw,30px)', fontWeight: 700, color: '#1A2B47', lineHeight: 1, marginBottom: 8 }}>
          {item.price}
        </div>
        <p style={{ fontFamily: 'var(--font-dm)', fontSize: '13px', color: '#3D4F6B', lineHeight: 1.6, marginBottom: 20 }}>
          {item.desc}
        </p>
        <div className="flex flex-col gap-2.5 flex-1">
          {item.features.map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <CheckCheck size={13} style={{ color: dark, flexShrink: 0, marginTop: 2 }} aria-hidden />
              <span style={{ fontFamily: 'var(--font-dm)', fontSize: '13px', color: '#1A2B47', lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </div>
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center gap-2 mt-8 text-sm font-medium transition-all duration-200 cursor-pointer"
          style={{
            fontFamily: 'var(--font-dm)',
            backgroundColor: item.highlighted ? dark : '#1A2B47',
            color: '#F5F3EF',
            padding: '12px 24px',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C9A84C'; e.currentTarget.style.color = '#1A2B47' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = item.highlighted ? dark : '#1A2B47'; e.currentTarget.style.color = '#F5F3EF' }}
        >
          Zacznij teraz →
        </a>
      </div>
    </motion.div>
  )
}

/* ── Main component ────────────────────────────────────────────────── */
export default function NichePage({ slug }: { slug: string }) {
  // page.tsx already calls notFound() for invalid slugs, so niche is always defined here
  const niche = getNicheBySlug(slug) as NicheData
  const { Icon } = niche
  const caseRef = useRef<HTMLDivElement>(null)
  const caseInView = useInView(caseRef, { once: true, margin: '-80px' })

  const BIRDS = [
    { size: 48, rotate: -12, left: '2%',  top: '6%'  },
    { size: 30, rotate: 22,  left: '93%', top: '14%' },
    { size: 38, rotate: -5,  left: '48%', top: '3%'  },
    { size: 26, rotate: 38,  left: '85%', top: '72%' },
    { size: 44, rotate: -18, left: '5%',  top: '78%' },
  ]

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-24"
        style={{
          background: `
            radial-gradient(circle at 15% 30%, rgba(${niche.bgRgb},0.45) 0%, transparent 55%),
            radial-gradient(circle at 85% 70%, rgba(${niche.bgRgb},0.25) 0%, transparent 50%),
            #F5F3EF
          `,
        }}
      >
        {BIRDS.map((b, i) => (
          <motion.div key={i} className="absolute pointer-events-none"
            style={{ left: b.left, top: b.top }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
          >
            <OrigamiBird color={niche.dark} size={b.size} rotate={b.rotate} />
          </motion.div>
        ))}

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link
              href="/#zakres"
              className="inline-flex items-center gap-2 transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: '#8A9AB5', letterSpacing: '0.12em' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = niche.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9AB5')}
            >
              <ArrowLeft size={12} />
              WSZYSTKIE BRANŻE
            </Link>
          </motion.div>

          <div className="max-w-4xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="flex items-center justify-center rounded-full"
                style={{ width: 40, height: 40, backgroundColor: `rgba(${niche.bgRgb},0.55)`, border: `1px solid rgba(${niche.darkRgb},0.20)` }}
              >
                <Icon size={18} style={{ color: niche.dark }} />
              </div>
              <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: '#8A9AB5', letterSpacing: '0.28em' }}>
                {niche.tagline.toUpperCase()}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
              style={{ lineHeight: 1.05 }}
            >
              <span style={{ display: 'block', fontFamily: 'var(--font-playfair)', fontSize: 'clamp(44px, 6.5vw, 72px)', fontWeight: 700, fontStyle: 'italic', color: '#1A2B47' }}>
                {niche.headline}
              </span>
              <span style={{ display: 'block', fontFamily: 'var(--font-playfair)', fontSize: 'clamp(44px, 6.5vw, 72px)', fontWeight: 700, fontStyle: 'italic', color: niche.dark }}>
                {niche.headlineAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              style={{ fontFamily: 'var(--font-dm)', fontSize: 'clamp(16px,2vw,18px)', color: '#3D4F6B', maxWidth: 560, lineHeight: 1.8, marginBottom: '2.5rem' }}
            >
              {niche.sub}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{ fontFamily: 'var(--font-dm)', backgroundColor: '#1A2B47', color: '#F5F3EF', padding: '14px 32px', borderRadius: '4px' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C9A84C'; e.currentTarget.style.color = '#1A2B47' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1A2B47'; e.currentTarget.style.color = '#F5F3EF' }}
              >
                Umów bezpłatną analizę →
              </a>
              <a
                href="#systemy"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{ fontFamily: 'var(--font-dm)', border: '1.5px solid #1A2B47', color: '#1A2B47', backgroundColor: 'transparent', padding: '14px 32px', borderRadius: '4px' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(26,43,71,0.06)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                Zobacz systemy ↓
              </a>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {niche.heroMetrics.map((m) => (
                <HeroStatCard key={m.label} val={m.val} label={m.label} dark={niche.dark} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ─────────────────────────────────────────────── */}
      <section
        className="py-24 overflow-hidden"
        style={{ backgroundColor: '#EEEAE3' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <SectionLabel number="01" label="WYZWANIA BRANŻY" />
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(30px,4.5vw,42px)', fontWeight: 700, color: '#1A2B47', maxWidth: 500, lineHeight: 1.15, marginTop: 12 }}>
              Czy to brzmi{' '}
              <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>znajomo?</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {niche.painPoints.map((p, i) => (
              <PainCard key={p.num} item={p} dark={niche.dark} darkRgb={niche.darkRgb} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOMATION SYSTEMS ──────────────────────────────────────── */}
      <section
        id="systemy"
        className="py-24 overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 10% 50%, rgba(${niche.bgRgb},0.22) 0%, transparent 55%),
            radial-gradient(circle at 90% 20%, rgba(${niche.bgRgb},0.18) 0%, transparent 50%),
            #F5F3EF
          `,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <SectionLabel number="02" label="SYSTEMY AUTOMATYZACJI" />
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(30px,4.5vw,42px)', fontWeight: 700, color: '#1A2B47', maxWidth: 560, lineHeight: 1.15, marginTop: 12 }}>
              Co automatyzujemy{' '}
              <span style={{ fontStyle: 'italic', color: niche.dark }}>dla Twojej firmy.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {niche.systems.map((s, i) => (
              <SystemCard key={s.name} item={s} dark={niche.dark} darkRgb={niche.darkRgb} bgRgb={niche.bgRgb} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#EEEAE3' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-14">
            <SectionLabel number="03" label="JAK PRACUJEMY" />
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(30px,4.5vw,42px)', fontWeight: 700, color: '#1A2B47', maxWidth: 480, lineHeight: 1.15, marginTop: 12 }}>
              Od rozmowy do{' '}
              <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>działającego systemu.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {niche.process.map((p, i) => (
              <ProcessStep key={p.step} item={p} dark={niche.dark} darkRgb={niche.darkRgb} index={i} total={niche.process.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ──────────────────────────────────────────────── */}
      <section
        className="py-24 overflow-hidden"
        style={{ backgroundColor: '#F5F3EF' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <SectionLabel number="04" label="CASE STUDY" />
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(30px,4.5vw,42px)', fontWeight: 700, color: '#1A2B47', lineHeight: 1.15, marginTop: 12 }}>
              Wdrożenie które działa{' '}
              <span style={{ fontStyle: 'italic', color: niche.dark }}>w produkcji.</span>
            </h2>
          </Reveal>

          <motion.div
            ref={caseRef}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="paper-texture"
            style={{
              backgroundColor: '#FAFAF8',
              border: '1px solid rgba(26,43,71,0.08)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '2px 2px 0px rgba(0,0,0,0.05), 6px 6px 0px rgba(0,0,0,0.04), 12px 12px 24px rgba(0,0,0,0.08)',
            }}
          >
            {/* Color strip */}
            <div style={{ height: 6, backgroundColor: `rgba(${niche.bgRgb},0.80)` }} />

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full"
                    style={{ width: 44, height: 44, backgroundColor: `rgba(${niche.bgRgb},0.50)` }}
                  >
                    <Icon size={20} style={{ color: niche.dark }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', fontWeight: 700, color: '#1A2B47' }}>
                      {niche.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.14em' }}>
                      {niche.caseStudy.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.2em', marginBottom: 3 }}>INWESTYCJA</div>
                    <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '26px', fontWeight: 700, color: '#1A2B47' }}>od {niche.caseStudy.price} zł</div>
                  </div>
                  <div className="text-right">
                    <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.2em', marginBottom: 3 }}>CZAS</div>
                    <div className="flex items-center gap-1.5" style={{ fontFamily: 'var(--font-ibm)', fontSize: '12px', color: '#8A9AB5' }}>
                      <Clock size={11} />{niche.caseStudy.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated metrics */}
              <div className="flex justify-center gap-0 mb-10 pb-10" style={{ borderBottom: '1px solid rgba(26,43,71,0.07)' }}>
                {niche.caseStudy.bigMetrics.map((m, i) => (
                  <div key={m.label}>
                    <AnimatedMetric {...m} inView={caseInView} dark={niche.dark} />
                  </div>
                ))}
              </div>

              {/* Problem + Solution + Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>Problem</div>
                  <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B', fontStyle: 'italic', lineHeight: 1.75 }}>
                    „{niche.caseStudy.problem}"
                  </p>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>Rozwiązanie</div>
                  <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#3D4F6B', lineHeight: 1.75 }}>
                    {niche.caseStudy.solution}
                  </p>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>Efekty</div>
                  <div className="flex flex-col gap-2">
                    {niche.caseStudy.results.map((r) => (
                      <div key={r} className="flex items-start gap-2">
                        <CheckCheck size={12} style={{ color: niche.dark, flexShrink: 0, marginTop: 2 }} aria-hidden />
                        <span style={{ fontFamily: 'var(--font-dm)', fontSize: '13px', color: '#1A2B47', lineHeight: 1.5 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ──────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: '#EEEAE3' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-8">
            <SectionLabel number="05" label="NARZĘDZIA" />
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(26px,3.5vw,34px)', fontWeight: 700, color: '#1A2B47', marginTop: 10 }}>
              Sprawdzony{' '}
              <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>stack technologiczny.</span>
            </h2>
          </Reveal>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {niche.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                style={{
                  fontFamily: 'var(--font-ibm)',
                  fontSize: '12px',
                  backgroundColor: '#FAFAF8',
                  border: '1px solid rgba(26,43,71,0.10)',
                  color: '#1A2B47',
                  borderRadius: '4px',
                  padding: '7px 14px',
                  boxShadow: '1px 1px 0px rgba(0,0,0,0.04), 2px 2px 6px rgba(0,0,0,0.05)',
                  letterSpacing: '0.04em',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────── */}
      <section className="py-24 overflow-hidden" style={{ backgroundColor: '#F5F3EF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-14">
            <SectionLabel number="06" label="PRZEJRZYSTE CENY" />
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(30px,4.5vw,42px)', fontWeight: 700, color: '#1A2B47', maxWidth: 480, lineHeight: 1.15, marginTop: 12 }}>
              Wiesz za co płacisz.{' '}
              <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Bez zaskoczeń.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#8A9AB5', marginTop: 10 }}>
              Ceny orientacyjne. Bezpłatna analiza = konkretna wycena dla Twojej firmy.
            </p>
          </Reveal>
          <div className="flex flex-col md:flex-row gap-5 items-stretch">
            {niche.pricing.map((p, i) => (
              <PricingCard key={p.name} item={p} dark={niche.dark} darkRgb={niche.darkRgb} bgRgb={niche.bgRgb} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section
        id="kontakt"
        className="py-24"
        style={{ backgroundColor: '#1A2B47' }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: 'rgba(201,168,76,0.80)', letterSpacing: '0.3em' }}>
              [ BEZPŁATNA ANALIZA // BEZ ZOBOWIĄZAŃ ]
            </span>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, fontStyle: 'italic', color: '#F5F3EF', marginTop: 20, marginBottom: 16, lineHeight: 1.1 }}>
              Zacznij automatyzację.{' '}
              <span style={{ color: '#C9A84C' }}>Dziś.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-dm)', fontSize: '17px', color: 'rgba(245,243,239,0.65)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
              60-minutowa bezpłatna analiza procesów Twojej firmy. Dostaniesz konkretny plan — bez wody, bez slajdów.
            </p>
            <a
              href="mailto:dolar@dolar-systems.pl"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{ fontFamily: 'var(--font-dm)', backgroundColor: '#C9A84C', color: '#1A2B47', padding: '16px 44px', borderRadius: '4px', fontSize: '16px' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F3EF' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C9A84C' }}
            >
              Napisz do nas →
            </a>
            <div style={{ marginTop: 20, fontFamily: 'var(--font-ibm)', fontSize: '11px', color: 'rgba(245,243,239,0.30)', letterSpacing: '0.12em' }}>
              dolar@dolar-systems.pl
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
