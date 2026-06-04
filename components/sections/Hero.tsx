'use client'
import { motion } from 'framer-motion'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

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

/* ── Title block (passed to ContainerScroll) ────────────────────── */
function HeroTitle() {
  return (
    <div className="flex flex-col items-center">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-7"
      >
        <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: '#8A9AB5', letterSpacing: '0.3em' }}>
          [ DOLAR SYSTEMS // AI AUTOMATYZACJA ]
        </span>
      </motion.div>

      {/* H1 */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-7"
        style={{ lineHeight: 1.05 }}
      >
        <span style={{ display: 'block', fontFamily: 'var(--font-playfair)', fontSize: 'clamp(52px, 7vw, 80px)', fontWeight: 700, fontStyle: 'italic', color: '#1A2B47' }}>
          Twoja firma.
        </span>
        <span style={{ display: 'block', fontFamily: 'var(--font-playfair)', fontSize: 'clamp(52px, 7vw, 80px)', fontWeight: 700, fontStyle: 'italic', color: '#C9A84C' }}>
          Zautomatyzowana.
        </span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.65 }}
        style={{ fontFamily: 'var(--font-dm)', fontSize: '18px', color: '#3D4F6B', maxWidth: 520, lineHeight: 1.8, marginBottom: '2rem', textAlign: 'center' }}
      >
        Wdrażamy systemy AI które działają.{' '}
        <span style={{ color: '#1A2B47', fontWeight: 500 }}>Nie prezentacje — produkcja.</span>
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 mb-12 justify-center"
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
          href="#realizacje"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
          style={{ fontFamily: 'var(--font-dm)', border: '1.5px solid #1A2B47', color: '#1A2B47', backgroundColor: 'transparent', padding: '14px 32px', borderRadius: '4px' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(26,43,71,0.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          Zobacz wdrożenia ↓
        </a>
      </motion.div>

      {/* Stats */}
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
          <div
            key={s.label}
            className="flex-1 p-5 text-center"
            style={{ backgroundColor: '#FAFAF8', border: '1px solid rgba(26,43,71,0.10)', borderRadius: '8px', boxShadow: '0 2px 12px rgba(26,43,71,0.08)' }}
          >
            <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '28px', fontWeight: 700, color: '#1A2B47', lineHeight: 1, marginBottom: '4px' }}>
              {s.val}
            </div>
            <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.18em' }}>
              {s.label}
            </div>
          </div>
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
      style={{ backgroundColor: '#F5F3EF' }}
      aria-label="Hero"
    >
      {/* Seal — top right */}
      <div
        className="absolute hidden lg:block"
        style={{ top: '5rem', right: '4rem', zIndex: 10 }}
        aria-hidden
      >
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
            <path d="M6 2v8M3 7l3 3 3-3" stroke="#1A2B47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      <ContainerScroll titleComponent={<HeroTitle />}>
        {/* Video inside the 3D scroll card */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ borderRadius: '18px' }}
        >
          <source src="/videos/heroorigami.mp4" type="video/mp4" />
        </video>
      </ContainerScroll>
    </section>
  )
}
