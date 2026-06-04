'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CybercoreBackground from '@/components/ui/cybercore-section-hero'

const LINE1 = 'Twoja firma.'
const LINE2 = 'Zautomatyzowana.'
const CHAR_DELAY = 48

type Phase = 'line1' | 'line2' | 'done'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [phase, setPhase] = useState<Phase>('line1')

  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 800], ['0%', '35%'])
  const videoScale = useTransform(scrollY, [0, 800], [1, 1.15])
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.55, 0.92])
  const textY = useTransform(scrollY, [0, 400], ['0%', '20%'])
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const beamsOpacity = useTransform(scrollY, [0, 500], [1, 0])

  /* typewriter — line 1 */
  useEffect(() => {
    let i = 0
    const id = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setText1(LINE1.slice(0, i))
        if (i === LINE1.length) {
          clearInterval(interval)
          setPhase('line2')
        }
      }, CHAR_DELAY)
      return () => clearInterval(interval)
    }, 700)
    return () => clearTimeout(id)
  }, [])

  /* typewriter — line 2 */
  useEffect(() => {
    if (phase !== 'line2') return
    let i = 0
    const interval = setInterval(() => {
      i++
      setText2(LINE2.slice(0, i))
      if (i === LINE2.length) {
        clearInterval(interval)
        setPhase('done')
      }
    }, CHAR_DELAY)
    return () => clearInterval(interval)
  }, [phase])

  const showSub = phase !== 'line1'
  const showCTA = phase === 'done'

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#000308' }}
      aria-label="Hero"
    >
      {/* WARSTWA 1 — WIDEO Z PARALLAX */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          style={{
            y: videoY,
            scale: videoScale,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55,
          }}
        >
          <source src="/videos/film2.mp4" type="video/mp4" />
        </motion.video>
      </div>

      {/* WARSTWA 2 — CYBERCORE BEAMS */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: beamsOpacity, zIndex: 1 }}
      >
        <CybercoreBackground beamCount={70} />
      </motion.div>

      {/* WARSTWA 3 — GRADIENT OVERLAY */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          zIndex: 2,
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)',
        }}
      />

      {/* WARSTWA 4 — TEKST HERO */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
        style={{ y: textY, opacity: textOpacity, zIndex: 3 }}
      >
        {/* Tag militarny */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-6"
        >
          <span
            className="inline-block text-[11px] tracking-[0.3em] uppercase px-3 py-1 border"
            style={{
              fontFamily: 'var(--font-ibm)',
              color: '#00D4FF',
              borderColor: 'rgba(0, 212, 255, 0.5)',
              backgroundColor: 'rgba(0, 212, 255, 0.04)',
            }}
          >
            [ DOLAR SYSTEMS // AI AUTOMATYZACJA ]
          </span>
        </motion.div>

        {/* H1 — typewriter */}
        <h1
          className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.08] mb-8 max-w-4xl"
          style={{ fontFamily: 'var(--font-ibm)' }}
        >
          <span
            className="block min-h-[1.1em]"
            style={{ color: '#F5F5F5' }}
            aria-label={LINE1}
          >
            {text1}
            {phase === 'line1' && (
              <span className="animate-pulse ml-0.5" style={{ color: '#00D4FF' }} aria-hidden>
                |
              </span>
            )}
          </span>
          <span
            className="block min-h-[1.1em]"
            style={{ color: '#00D4FF' }}
            aria-label={LINE2}
          >
            {text2}
            {phase === 'line2' && (
              <span className="animate-pulse ml-0.5" aria-hidden>
                |
              </span>
            )}
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: showSub ? 1 : 0, y: showSub ? 0 : 18 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-xl mb-10 max-w-2xl leading-relaxed"
          style={{ fontFamily: 'var(--font-inter)', color: '#aaa' }}
        >
          Wdrażamy systemy AI które działają.{' '}
          <span style={{ color: '#F5F5F5', fontWeight: 500 }}>
            Nie prezentacje — produkcja.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: showCTA ? 1 : 0, y: showCTA ? 0 : 18 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all duration-300"
            style={{
              fontFamily: 'var(--font-ibm)',
              border: '1px solid #00D4FF',
              color: '#00D4FF',
              letterSpacing: '0.1em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00D4FF'
              e.currentTarget.style.color = '#000'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#00D4FF'
            }}
          >
            UMÓW BEZPŁATNĄ ANALIZĘ →
          </a>
          <a
            href="#zakres"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all duration-300"
            style={{
              fontFamily: 'var(--font-ibm)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              letterSpacing: '0.1em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
          >
            ZOBACZ WDROŻENIA ↓
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCTA ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap gap-x-12 gap-y-4 mt-16"
          style={{ borderTop: '1px solid rgba(0,212,255,0.15)', paddingTop: '2rem' }}
        >
          {[
            { val: '< 3 tygodnie', label: 'CZAS WDROŻENIA' },
            { val: '−60%', label: 'REDUKCJA PRACY MANUALNEJ' },
            { val: '24/7', label: 'SYSTEMY DZIAŁAJĄ' },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-ibm)', color: '#00D4FF' }}
              >
                {s.val}
              </div>
              <div
                className="text-xs mt-1"
                style={{ fontFamily: 'var(--font-ibm)', color: '#555', letterSpacing: '0.15em' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 3, opacity: textOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden
      >
        <div
          className="text-xs tracking-widest"
          style={{ fontFamily: 'var(--font-ibm)', color: 'rgba(0,212,255,0.6)' }}
        >
          SCROLL ↓
        </div>
      </motion.div>
    </section>
  )
}
