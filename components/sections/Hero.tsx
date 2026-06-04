'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ── Automation Flow Visualization ──────────────────────────────── */
const FLOW_NODES = [
  { id: 'input', label: 'Zapytanie klienta', x: 60, y: 80, color: '#F59E0B', bg: 'rgba(245,158,11,0.10)' },
  { id: 'ai', label: 'AI Processing', x: 200, y: 40, color: '#4F46E5', bg: 'rgba(79,70,229,0.10)', large: true },
  { id: 'crm', label: 'CRM Update', x: 340, y: 80, color: '#4F46E5', bg: 'rgba(79,70,229,0.08)' },
  { id: 'email', label: 'Auto E-mail', x: 100, y: 200, color: '#4F46E5', bg: 'rgba(79,70,229,0.08)' },
  { id: 'report', label: 'Raport PDF', x: 300, y: 200, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  { id: 'notify', label: 'Powiadomienie', x: 200, y: 280, color: '#4F46E5', bg: 'rgba(79,70,229,0.08)' },
]

const FLOW_LINES = [
  ['input', 'ai'], ['ai', 'crm'], ['ai', 'email'], ['crm', 'report'],
  ['email', 'notify'], ['report', 'notify'],
]

function nodeById(id: string) {
  return FLOW_NODES.find((n) => n.id === id)!
}

function AutomationFlow() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background glow */}
      <div
        className="absolute"
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.10) 0%, rgba(245,158,11,0.06) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <svg
        viewBox="0 0 440 360"
        className="relative w-full max-w-[440px]"
        style={{ overflow: 'visible' }}
        aria-hidden
      >
        {/* Animated connection lines */}
        {FLOW_LINES.map(([a, b], i) => {
          const na = nodeById(a)
          const nb = nodeById(b)
          const cx = na.x + (na.large ? 54 : 44)
          const cy = na.y + 18
          const ex = nb.x + (nb.large ? 54 : 44)
          const ey = nb.y + 18
          return (
            <motion.line
              key={i}
              x1={cx} y1={cy} x2={ex} y2={ey}
              stroke="rgba(79,70,229,0.20)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.8, ease: 'easeOut' }}
            />
          )
        })}

        {/* Animated dots moving along lines */}
        {FLOW_LINES.map(([a, b], i) => {
          const na = nodeById(a)
          const nb = nodeById(b)
          const cx = na.x + (na.large ? 54 : 44)
          const cy = na.y + 18
          const ex = nb.x + (nb.large ? 54 : 44)
          const ey = nb.y + 18
          return (
            <motion.circle
              key={`dot-${i}`}
              r={3}
              fill="#4F46E5"
              fillOpacity={0.7}
              initial={{ x: cx, y: cy }}
              animate={{ x: [cx, ex], y: [cy, ey] }}
              transition={{
                delay: 1.2 + i * 0.4,
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeInOut',
              }}
            />
          )
        })}

        {/* Nodes */}
        {FLOW_NODES.map((node, i) => {
          const w = node.large ? 108 : 88
          const h = 36
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.g
                animate={{ y: [0, i % 2 === 0 ? -5 : -7, 0] }}
                transition={{
                  delay: i * 0.3,
                  duration: 2.8 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Card */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={w}
                  height={h}
                  rx={10}
                  fill="white"
                  stroke={node.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(28,25,23,0.08))' }}
                />
                {/* Color dot */}
                <circle
                  cx={node.x + 14}
                  cy={node.y + h / 2}
                  r={4}
                  fill={node.color}
                  fillOpacity={0.85}
                />
                {/* Label */}
                <text
                  x={node.x + 26}
                  y={node.y + h / 2 + 4}
                  fontSize={node.large ? '9.5' : '8.5'}
                  fontFamily="var(--font-dm), system-ui, sans-serif"
                  fill="#1C1917"
                  fontWeight={node.large ? '600' : '400'}
                >
                  {node.label}
                </text>
              </motion.g>
            </motion.g>
          )
        })}
      </svg>

      {/* Floating badge — "AI działa 24/7" */}
      <motion.div
        className="absolute rounded-full px-3 py-1.5 text-xs font-medium"
        style={{
          bottom: '12%',
          right: '5%',
          fontFamily: 'var(--font-ibm)',
          backgroundColor: '#4F46E5',
          color: '#fff',
          boxShadow: '0 4px 16px rgba(79,70,229,0.3)',
          fontSize: '10px',
          letterSpacing: '0.08em',
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        ● AI działa 24/7
      </motion.div>
    </div>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 600], ['0%', '25%'])
  const textY = useTransform(scrollY, [0, 400], ['0%', '15%'])
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden gradient-mesh"
      style={{ minHeight: '100vh' }}
      aria-label="Hero"
    >
      {/* Video — very subtle texture */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
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
            height: '100%',
            objectFit: 'cover',
            opacity: 0.07,
            mixBlendMode: 'multiply',
          }}
        >
          <source src="/videos/heroorigami.mp4" type="video/mp4" />
        </motion.video>
      </div>

      {/* Soft gradient at bottom of hero */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '25%',
          background: 'linear-gradient(to bottom, transparent, #FAFAF7)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ zIndex: 2, paddingTop: '8rem', paddingBottom: '5rem', minHeight: '100vh' }}
      >
        {/* Left — Text */}
        <motion.div style={{ y: textY, opacity: textOpacity }}>
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
                color: '#4F46E5',
                backgroundColor: 'rgba(79,70,229,0.09)',
                border: '1px solid rgba(79,70,229,0.20)',
                letterSpacing: '0.12em',
                fontSize: '10px',
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#4F46E5' }}
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
            style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-fraunces)',
                color: '#1C1917',
                fontWeight: 700,
              }}
            >
              Twoja firma.
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-ibm)',
                color: '#4F46E5',
                fontWeight: 600,
                fontSize: '0.78em',
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
            className="text-lg mb-10 max-w-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-dm)', color: '#57534E', lineHeight: 1.7 }}
          >
            Wdrażamy systemy AI które działają.{' '}
            <span style={{ color: '#1C1917', fontWeight: 500 }}>
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
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(79,70,229,0.38)'
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
                border: '1.5px solid #E7E5E4',
                color: '#57534E',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4F46E5'
                e.currentTarget.style.color = '#4F46E5'
                e.currentTarget.style.backgroundColor = 'rgba(79,70,229,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E7E5E4'
                e.currentTarget.style.color = '#57534E'
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
            style={{ borderTop: '1px solid #E7E5E4' }}
          >
            {[
              { val: '< 3 tygodnie', label: 'czas wdrożenia' },
              { val: '−60%', label: 'praca manualna' },
              { val: '24/7', label: 'systemy działają' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-xl font-bold leading-none mb-1"
                  style={{ fontFamily: 'var(--font-fraunces)', color: '#4F46E5' }}
                >
                  {s.val}
                </div>
                <div
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-dm)', color: '#A8A29E' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex items-center justify-center"
          style={{ height: 440 }}
        >
          <AutomationFlow />
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
            style={{ fontFamily: 'var(--font-ibm)', color: '#A8A29E' }}
          >
            SCROLL
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.5 }}>
            <path d="M7 3v8M4 8l3 3 3-3" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
