'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const LINE1 = 'Twoja firma.'
const LINE2 = 'Zautomatyzowana.'
const CHAR_DELAY = 48

type Phase = 'line1' | 'line2' | 'done'

export default function Hero() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [phase, setPhase] = useState<Phase>('line1')

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
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: '#0A0A0A' }}
      aria-label="Hero"
    >
      {/* Video background */}
      <video
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(10,10,10,0.5)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-[2] max-w-6xl mx-auto w-full px-6 pt-32 pb-24">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-10"
        >
          <span
            className="inline-block text-[11px] tracking-[0.38em] uppercase px-4 py-1.5 border"
            style={{
              fontFamily: 'var(--font-space-mono)',
              color: '#00D4FF',
              borderColor: 'rgba(0, 212, 255, 0.3)',
              backgroundColor: 'rgba(0, 212, 255, 0.04)',
            }}
          >
            [ DOLAR SYSTEMS // AI AUTOMATYZACJA ]
          </span>
        </motion.div>

        {/* H1 — typewriter */}
        <h1
          className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.08] mb-8"
          style={{ fontFamily: 'var(--font-ibm)' }}
        >
          <span
            className="block min-h-[1.1em]"
            style={{ color: '#F5F5F5' }}
            aria-label={LINE1}
          >
            {text1}
            {phase === 'line1' && (
              <span
                className="animate-pulse ml-0.5"
                style={{ color: '#00D4FF' }}
                aria-hidden
              >
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
          className="text-base md:text-lg mb-12 max-w-lg"
          style={{
            color: '#666',
            fontFamily: 'var(--font-inter)',
            lineHeight: 1.75,
          }}
        >
          Wdrażamy systemy AI które działają.{' '}
          <span style={{ color: '#999' }}>
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
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-all duration-250"
            style={{
              fontFamily: 'var(--font-ibm)',
              border: '2px solid #00D4FF',
              color: '#00D4FF',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00D4FF'
              e.currentTarget.style.color = '#0A0A0A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#00D4FF'
            }}
          >
            Umów bezpłatną analizę →
          </a>
          <a
            href="#zakres"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-all duration-200"
            style={{
              fontFamily: 'var(--font-ibm)',
              border: '2px solid #1E1E1E',
              color: '#555',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#333'
              e.currentTarget.style.color = '#F5F5F5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1E1E1E'
              e.currentTarget.style.color = '#555'
            }}
          >
            Zobacz wdrożenia ↓
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCTA ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 flex flex-wrap gap-x-12 gap-y-4"
          style={{ borderTop: '1px solid #1E1E1E', paddingTop: '2rem' }}
        >
          {[
            { val: '< 3 tygodnie', label: 'Czas wdrożenia' },
            { val: '–60%', label: 'Redukcja pracy manualnej' },
            { val: '24/7', label: 'Systemy działają non-stop' },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-ibm)', color: '#00D4FF' }}
              >
                {s.val}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ fontFamily: 'var(--font-space-mono)', color: '#444' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: showCTA ? 0.5 : 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} color="#00D4FF" />
        </motion.div>
      </motion.div>
    </section>
  )
}
