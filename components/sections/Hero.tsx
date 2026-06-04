'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 600], ['0%', '20%'])
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const textY = useTransform(scrollY, [0, 400], ['0%', '12%'])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: '#0f0f0f' }}
      aria-label="Hero"
    >
      {/* Video — full screen, clearly visible */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          style={{
            y: videoY,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            opacity: 0.75,
          }}
        >
          <source src="/videos/heroorigami.mp4" type="video/mp4" />
        </motion.video>
      </div>

      {/* Gradient — fades video into dark on right so text is readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(10,10,10,0.10) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.82) 70%, rgba(10,10,10,0.95) 100%)',
          zIndex: 1,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to bottom, transparent, #0f0f0f)',
          zIndex: 1,
        }}
      />

      {/* Content — right side */}
      <div
        className="relative max-w-7xl mx-auto px-6 flex items-center justify-end"
        style={{ zIndex: 2, minHeight: '100vh', paddingTop: '7rem', paddingBottom: '5rem' }}
      >
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="w-full max-w-xl"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                fontFamily: 'var(--font-ibm)',
                color: '#a5b4fc',
                backgroundColor: 'rgba(79,70,229,0.20)',
                border: '1px solid rgba(165,180,252,0.25)',
                letterSpacing: '0.12em',
                fontSize: '10px',
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#a5b4fc' }}
              />
              AI AUTOMATYZACJA DLA MŚP
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="leading-[1.06] mb-7"
            style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-fraunces)',
                color: '#F5F0E8',
                fontWeight: 700,
              }}
            >
              Twoja firma.
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-ibm)',
                color: '#818cf8',
                fontWeight: 600,
                fontSize: '0.76em',
                letterSpacing: '-0.01em',
              }}
            >
              Zautomatyzowana.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg mb-10 leading-relaxed"
            style={{ fontFamily: 'var(--font-dm)', color: '#a8a29e', lineHeight: 1.7 }}
          >
            Wdrażamy systemy AI które działają.{' '}
            <span style={{ color: '#e7e5e4', fontWeight: 500 }}>
              Nie prezentacje — produkcja.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: 'var(--font-dm)',
                backgroundColor: '#4F46E5',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4338CA'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(79,70,229,0.50)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4F46E5'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'none'
              }}
            >
              Umów bezpłatną analizę
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#realizacje"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: 'var(--font-dm)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                color: '#d6d3d1',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(165,180,252,0.5)'
                e.currentTarget.style.color = '#a5b4fc'
                e.currentTarget.style.backgroundColor = 'rgba(79,70,229,0.10)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                e.currentTarget.style.color = '#d6d3d1'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Zobacz wdrożenia ↓
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="flex flex-wrap gap-x-10 gap-y-4 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
          >
            {[
              { val: '< 3 tygodnie', label: 'czas wdrożenia' },
              { val: '−60%', label: 'praca manualna' },
              { val: '24/7', label: 'systemy działają' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-xl font-bold leading-none mb-1"
                  style={{ fontFamily: 'var(--font-fraunces)', color: '#818cf8' }}
                >
                  {s.val}
                </div>
                <div
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-dm)', color: '#78716c' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span
            className="text-[10px] tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-ibm)', color: 'rgba(255,255,255,0.3)' }}
          >
            SCROLL
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.35 }}>
            <path d="M7 3v8M4 8l3 3 3-3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
