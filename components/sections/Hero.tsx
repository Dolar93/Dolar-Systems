'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FoldCorner, useCardFold } from '@/components/ui/FoldCorner'
import { GridPulseBackground } from '@/components/ui/grid-pulse-background'

/* ── Rotating kicker ────────────────────────────────────────────── */
const KICKER_WORDS = ['PRZYSZŁOŚĆ', 'ROZWÓJ', 'BIZNES']

function RotatingKicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % KICKER_WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: '#8A9AB5', letterSpacing: '0.3em' }}>
      [ DOLAR SYSTEMS _{' '}
      <span style={{ position: 'relative', display: 'inline-block', minWidth: '9ch', textAlign: 'left' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={KICKER_WORDS[i]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ display: 'inline-block', color: '#C9A84C' }}
          >
            {KICKER_WORDS[i]}
          </motion.span>
        </AnimatePresence>
      </span>{' '}
      ]
    </span>
  )
}

/* ── Rotating Seal ──────────────────────────────────────────────── */
function Seal() {
  return (
    <div className="relative" style={{ width: 128, height: 128 }}>
      <svg viewBox="0 0 128 128" className="absolute inset-0 w-full h-full" aria-hidden>
        <circle cx="64" cy="64" r="60" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
        <circle cx="64" cy="64" r="52" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1" strokeDasharray="2 4" />
      </svg>
      <motion.svg
        viewBox="0 0 128 128"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >
        <defs>
          <path id="seal-circle" d="M 64,64 m -54,0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0" />
        </defs>
        <text fill="rgba(201,168,76,0.70)" fontSize="9" letterSpacing="4.5" fontFamily="var(--font-ibm)">
          <textPath href="#seal-circle">DOLAR SYSTEMS · EST. 2025 · AI AUTOMATYZACJA ·</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden>
          <circle cx="14" cy="14" r="10" fill="none" stroke="rgba(201,168,76,0.45)" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="3" fill="rgba(201,168,76,0.55)" />
          <line x1="14" y1="4" x2="14" y2="8" stroke="rgba(201,168,76,0.45)" strokeWidth="1" />
          <line x1="14" y1="20" x2="14" y2="24" stroke="rgba(201,168,76,0.45)" strokeWidth="1" />
          <line x1="4" y1="14" x2="8" y2="14" stroke="rgba(201,168,76,0.45)" strokeWidth="1" />
          <line x1="20" y1="14" x2="24" y2="14" stroke="rgba(201,168,76,0.45)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}

/* ── Stat card with fold (dark-glass variant) ───────────────────── */
function StatCard({ val, label }: { val: string; label: string }) {
  const { hovered, ref, handlers } = useCardFold()
  return (
    <div className="flex-1" style={{ position: 'relative' }}>
      <FoldCorner isOpen={hovered} sz={32} bgRgb="30,46,74" />
      <div
        ref={ref}
        {...handlers}
        className="p-5 text-center"
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(245,243,239,0.14)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.35)' : 'none',
          transition: 'box-shadow 0.3s ease, transform 0.25s ease, border-color 0.25s ease',
          transform: hovered ? 'translateY(-3px)' : 'none',
          borderColor: hovered ? 'rgba(201,168,76,0.45)' : 'rgba(245,243,239,0.14)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '28px', fontWeight: 700, color: '#F5F3EF', lineHeight: 1, marginBottom: '4px' }}>
          {val}
        </div>
        <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.18em' }}>
          {label}
        </div>
      </div>
    </div>
  )
}

/* ── Title block ────────────────────────────────────────────────── */
function HeroTitle() {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-7"
      >
        <RotatingKicker />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-7"
        style={{ lineHeight: 1.05 }}
      >
        <span style={{ display: 'block', fontFamily: 'var(--font-playfair)', fontSize: 'clamp(34px, 9vw, 80px)', fontWeight: 700, fontStyle: 'italic', color: '#F5F3EF' }}>
          Twoja firma.
        </span>
        <span style={{ display: 'block', fontFamily: 'var(--font-playfair)', fontSize: 'clamp(34px, 9vw, 80px)', fontWeight: 700, fontStyle: 'italic', color: '#C9A84C' }}>
          Zautomatyzowana.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.65 }}
        style={{ fontFamily: 'var(--font-dm)', fontSize: '18px', color: '#8A9AB5', maxWidth: 520, lineHeight: 1.8, marginBottom: '2rem', textAlign: 'center' }}
      >
        Wdrażamy systemy AI które działają.{' '}
        <span style={{ color: '#F5F3EF', fontWeight: 500 }}>Nie prezentacje — produkcja.</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 mb-12 justify-center"
      >
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
          style={{ fontFamily: 'var(--font-dm)', backgroundColor: '#C9A84C', color: '#1A2B47', padding: '14px 32px', borderRadius: '4px' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F3EF' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C9A84C' }}
        >
          Umów bezpłatną analizę →
        </a>
        <a
          href="#realizacje"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
          style={{ fontFamily: 'var(--font-dm)', border: '1.5px solid rgba(245,243,239,0.35)', color: '#F5F3EF', backgroundColor: 'transparent', padding: '14px 32px', borderRadius: '4px' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(245,243,239,0.08)'; e.currentTarget.style.borderColor = 'rgba(245,243,239,0.6)' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(245,243,239,0.35)' }}
        >
          Zobacz wdrożenia ↓
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl"
      >
        {[
          { val: '< 3 tygodnie', label: 'CZAS WDROŻENIA' },
          { val: '−60%',         label: 'PRACA MANUALNA' },
          { val: '24/7',         label: 'SYSTEMY DZIAŁAJĄ' },
        ].map((s) => (
          <StatCard key={s.label} val={s.val} label={s.label} />
        ))}
      </motion.div>
    </div>
  )
}

/* ── Hero ───────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#1A2B47' }}
      aria-label="Hero"
    >
      {/* Animated grid-pulse background */}
      <GridPulseBackground className="pointer-events-none" />

      {/* Seal */}
      <div className="absolute hidden lg:block" style={{ top: '5rem', right: '4rem', zIndex: 10 }} aria-hidden>
        <Seal />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '9px', color: '#8A9AB5', letterSpacing: '0.2em' }}>SCROLL</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5 }}>
            <path d="M6 2v8M3 7l3 3 3-3" stroke="#F5F3EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-6 pt-40 pb-24" style={{ zIndex: 10 }}>
        <HeroTitle />
      </div>
    </section>
  )
}
