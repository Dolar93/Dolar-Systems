'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Courtyard from '@/components/ui/Courtyard'
import Vine from '@/components/ui/Vine'
import { STONE, FONT, CARVED } from '@/components/ui/stone'

const BODY = FONT.body
const MONO = FONT.mono

/* ── Rotujący kicker ────────────────────────────────────────────── */
const KICKER_WORDS = ['PRZYSZŁOŚĆ', 'ROZWÓJ', 'BIZNES']

function RotatingKicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % KICKER_WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{
      fontFamily: MONO,
      fontSize: 'clamp(8.5px, 2.4vw, 11px)',
      color: STONE.inkMuted,
      letterSpacing: '0.22em',
      whiteSpace: 'nowrap',
    }}>
      [ DOLAR SYSTEMS _{' '}
      <span style={{ position: 'relative', display: 'inline-block', minWidth: '9ch', textAlign: 'left' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={KICKER_WORDS[i]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ display: 'inline-block', color: '#4F6B28', fontWeight: 600 }}
          >
            {KICKER_WORDS[i]}
          </motion.span>
        </AnimatePresence>
      </span>{' '}
      ]
    </span>
  )
}

/* ── Narożnik ramki — motyw z wizytówki, kreślony w mchu ────────── */
function Corner({ style }: { style: React.CSSProperties }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ position: 'absolute', ...style }} aria-hidden>
      <path d="M0.8 11 L0.8 0.8 L11 0.8" stroke="#4F6B28" strokeWidth="1.4" />
      <path d="M6 16 L6 6 L16 6" stroke="#4F6B28" strokeWidth="1" opacity="0.55" />
    </svg>
  )
}

/* ── Znacznik pomiarowy — mała płyta z liczbą ───────────────────── */
function Marker({ val, label, delay }: { val: string; label: string; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      className="flex-1 stone-light relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: 'easeOut' }}
      style={{
        padding: '18px 16px',
        textAlign: 'center',
        border: '1px solid rgba(51,71,28,0.22)',
        boxShadow: hovered
          ? '0 10px 22px rgba(58,50,34,0.20)'
          : '0 3px 0 rgba(58,50,34,0.10), 0 6px 14px rgba(58,50,34,0.10)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'box-shadow 0.28s ease, transform 0.28s ease, border-color 0.28s ease',
        borderColor: hovered ? 'rgba(79,107,40,0.55)' : 'rgba(51,71,28,0.22)',
      }}
    >
      {/* Mech wrasta w dolną fugę płyty */}
      <span
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 3,
          backgroundColor: '#4F6B28',
          transform: `scaleX(${hovered ? 1 : 0.28})`,
          transformOrigin: 'left',
          transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <div className="carved" style={{ ...CARVED, fontSize: '24px', color: '#3A404C', lineHeight: 1, marginBottom: 7 }}>
        {val}
      </div>
      <div style={{ fontFamily: MONO, fontSize: '9.5px', color: STONE.inkMuted, letterSpacing: '0.2em' }}>
        {label}
      </div>
    </motion.div>
  )
}

/* ── Hero ───────────────────────────────────────────────────────── */
export default function Hero() {
  const reduced = useReducedMotion()
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section id="hero" className="relative overflow-hidden" aria-label="Hero">
      <Courtyard />

      <div className="relative max-w-5xl mx-auto px-6 pt-36 pb-24" style={{ zIndex: 10 }}>
        {/* ── Płyta z treścią, wyniesiona ponad bruk ── */}
        <motion.div
          className="stone-light relative"
          initial={reduced ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
          style={{
            border: '1px solid rgba(51,71,28,0.28)',
            padding: 'clamp(32px, 6vw, 64px) clamp(22px, 5vw, 56px)',
            boxShadow: '0 4px 0 rgba(58,50,34,0.10), 0 18px 44px rgba(58,50,34,0.22)',
          }}
        >
          {/* Ramka wewnętrzna + narożniki z wizytówki */}
          <div
            className="pointer-events-none absolute"
            style={{ inset: 12, border: '1px solid rgba(79,107,40,0.30)' }}
          />
          <Corner style={{ top: 6, left: 6 }} />
          <Corner style={{ top: 6, right: 6, transform: 'scaleX(-1)' }} />
          <Corner style={{ bottom: 6, left: 6, transform: 'scaleY(-1)' }} />
          <Corner style={{ bottom: 6, right: 6, transform: 'scale(-1,-1)' }} />

          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-8"
            >
              <RotatingKicker />
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7, ease }}
              className="carved mb-8"
              style={{ ...CARVED, fontSize: 'clamp(27px, 6.4vw, 62px)', lineHeight: 1.04, letterSpacing: '-0.01em' }}
            >
              <span style={{ display: 'block', color: '#3A404C' }}>Technologia,</span>
              <span style={{ display: 'block', color: '#4F6B28' }}>która ma sens.</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              style={{ fontFamily: BODY, fontSize: '17px', color: STONE.inkSoft, maxWidth: 560, lineHeight: 1.75, marginBottom: '2.25rem' }}
            >
              Budujemy systemy pod konkretną branżę — wypożyczalnie sprzętu, kliniki i salony premium.
              Zanim zdecydujesz o wdrożeniu, pokażemy Ci działający system.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  fontFamily: MONO, fontSize: 'clamp(10px, 2.7vw, 12px)', fontWeight: 600,
                  letterSpacing: '0.1em', whiteSpace: 'nowrap',
                  textTransform: 'uppercase', backgroundColor: '#4F6B28', color: '#F2EDE2',
                  padding: '15px 26px', transition: 'background-color 0.22s, box-shadow 0.22s',
                  boxShadow: '0 3px 0 rgba(51,71,28,0.55)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#33471C' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#4F6B28' }}
              >
                Umów bezpłatną analizę →
              </a>
              <a
                href="#zakres"
                className="inline-flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  fontFamily: MONO, fontSize: 'clamp(10px, 2.7vw, 12px)', fontWeight: 600,
                  letterSpacing: '0.1em', whiteSpace: 'nowrap',
                  textTransform: 'uppercase', border: '1.5px solid rgba(58,64,76,0.40)',
                  color: '#3A404C', backgroundColor: 'transparent',
                  padding: '15px 26px', transition: 'background-color 0.22s, border-color 0.22s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(79,107,40,0.10)'; e.currentTarget.style.borderColor = '#4F6B28' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(58,64,76,0.40)' }}
              >
                Zobacz nasze systemy ↓
              </a>
            </motion.div>
          </div>

          {/* Bluszcz przechodzi przez krawędź płyty — jedyna rzecz,
              która nie respektuje siatki */}
          <div
            className="absolute pointer-events-none origin-top-right scale-[0.46] sm:scale-75 lg:scale-100"
            style={{ top: -64, right: -58, zIndex: 2 }}
          >
            <Vine size={236} flipX delay={0.7} />
          </div>
          <div className="absolute pointer-events-none hidden sm:block" style={{ bottom: -60, left: -56, zIndex: 2 }}>
            <Vine size={198} flipY delay={1.0} />
          </div>
        </motion.div>

        {/* Znaczniki pomiarowe — nad bluszczem, żeby liście nie zjadały liczb */}
        <div className="relative flex flex-col sm:flex-row gap-3 mt-5" style={{ zIndex: 5 }}>
          {[
            { val: '< 3 tygodnie', label: 'CZAS WDROŻENIA' },
            { val: '−60%',         label: 'PRACA MANUALNA' },
            { val: '24/7',         label: 'SYSTEMY DZIAŁAJĄ' },
          ].map((s, i) => (
            <Marker key={s.label} val={s.val} label={s.label} delay={0.75 + i * 0.1} />
          ))}
        </div>
      </div>

      {/* Wskaźnik scrollowania */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '9px', color: STONE.inkMuted, letterSpacing: '0.2em' }}>SCROLL</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6 }}>
            <path d="M6 2v8M3 7l3 3 3-3" stroke="#4F6B28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
