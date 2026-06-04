'use client'
import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

/* ── useCardFold ──────────────────────────────────────────────────
 * Hover state + paper-wrinkle @keyframes trigger.
 * Force-reflow restarts the animation on every mouse-enter.
 * ──────────────────────────────────────────────────────────────── */
export function useCardFold() {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const triggerWrinkle = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('paper-wrinkle')
    void el.offsetWidth
    el.classList.add('paper-wrinkle')
  }, [])

  const open  = useCallback(() => { setHovered(true);  triggerWrinkle() }, [triggerWrinkle])
  const close = useCallback(() => { setHovered(false) }, [])

  return {
    hovered,
    ref,
    handlers: {
      onMouseEnter: open,
      onMouseLeave: close,
      onTouchStart: open,
      onTouchEnd:   close,
    },
  }
}

/* ── FoldCorner ───────────────────────────────────────────────────
 *
 * Geometry: sz×sz px right-triangle at top-right of parent.
 *   clip-path: polygon(0 0, 100% 0, 100% 100%)
 *   Fold crease: rotate3d(1,1,0,angle), transform-origin: 0% 0%
 *
 * Layers (bottom → top):
 *   ① Reveal bg      — warm cream, always present under flap
 *   ② Logo           — /dolar.png, appears dramatically on open
 *   ③ Perspective    — independent 3D space per corner
 *      └ fold-group  — CSS-animated -174° on .is-open
 *         ├ front    — card colour, backface-hidden
 *         └ back     — warm paper inside, backface-hidden
 *   ④ Drop shadow    — radial gradient, fades in on open
 *
 * Logo technique: mix-blend-mode:multiply removes the cream bg,
 * leaving only the navy $ mark floating above the reveal.
 * ──────────────────────────────────────────────────────────────── */
export function FoldCorner({
  isOpen,
  sz = 46,
  bgRgb = '250,250,248',
  backStyle,
}: {
  isOpen: boolean
  sz?: number
  bgRgb?: string
  backStyle?: React.CSSProperties
}) {
  /* Logo occupies ~55% of sz, minimum 18px */
  const logoSz = Math.max(18, Math.round(sz * 0.55))

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: sz,
        height: sz,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* ① Reveal background — warm cream paper inside */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          background: `linear-gradient(
            215deg,
            rgba(248,244,238,0.96) 0%,
            rgba(235,226,210,0.90) 100%
          )`,
        }}
      />

      {/* ② Logo — appears after fold starts, exits before fold closes */}
      <motion.div
        style={{
          position: 'absolute',
          /* sit tight in the top-right corner of the triangle */
          top: sz * 0.04,
          right: sz * 0.04,
          width: logoSz,
          height: logoSz,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}
        initial={false}
        animate={
          isOpen
            ? {
                scale: 1,
                opacity: 1,
                rotate: 0,
                filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.55)) drop-shadow(0 2px 4px rgba(26,43,71,0.25))',
              }
            : {
                scale: 0.25,
                opacity: 0,
                rotate: -25,
                filter: 'drop-shadow(0 0 0px rgba(201,168,76,0))',
              }
        }
        transition={
          isOpen
            ? {
                /* Entrance: spring with bounce, starts after fold is ~30% open */
                delay: 0.18,
                type: 'spring',
                stiffness: 380,
                damping: 16,
                mass: 0.7,
              }
            : {
                /* Exit: fast fade out before fold closes */
                duration: 0.12,
                ease: 'easeIn',
              }
        }
      >
        {/* mix-blend-mode:multiply removes cream bg → only navy $ visible */}
        <img
          src="/dolar.png"
          alt=""
          width={logoSz}
          height={logoSz}
          style={{
            width: logoSz,
            height: logoSz,
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            display: 'block',
          }}
        />
      </motion.div>

      {/* ③ Perspective shell — independent vanishing point per corner */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '280px',
          perspectiveOrigin: '0% 0%',
          zIndex: 3,
        }}
      >
        <div className={`fold-group${isOpen ? ' is-open' : ''}`}>
          {/* Front face: card surface colour */}
          <div
            className="fold-face"
            style={{ backgroundColor: `rgba(${bgRgb}, 0.97)` }}
          />
          {/* Back face: warm paper inside */}
          <div className="fold-face fold-face-back" style={backStyle} />
        </div>
      </div>

      {/* ④ Drop shadow cast by lifted corner on card surface */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.35s ease',
          zIndex: 4,
          background: `radial-gradient(
            ellipse 85% 70% at 88% 12%,
            rgba(0,0,0,0.18) 0%,
            rgba(0,0,0,0.05) 55%,
            transparent 75%
          )`,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
