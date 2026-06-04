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
 *   ② Perspective    — independent 3D space per corner   (z:2)
 *      └ fold-group  — CSS-animated -174° on .is-open
 *         ├ front    — card colour, backface-hidden
 *         └ back     — warm paper inside, backface-hidden
 *   ③ Drop shadow    — radial gradient, fades in on open (z:3)
 *   ④ Logo           — /dolar.png, ALWAYS ON TOP         (z:50)
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

      {/* ② Perspective shell — fold flap (front + back faces) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '280px',
          perspectiveOrigin: '0% 0%',
          zIndex: 2,
        }}
      >
        <div className={`fold-group${isOpen ? ' is-open' : ''}`}>
          <div
            className="fold-face"
            style={{ backgroundColor: `rgba(${bgRgb}, 0.97)` }}
          />
          <div className="fold-face fold-face-back" style={backStyle} />
        </div>
      </div>

      {/* ③ Drop shadow cast by lifted corner */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.35s ease',
          zIndex: 3,
          background: `radial-gradient(
            ellipse 85% 70% at 88% 12%,
            rgba(0,0,0,0.18) 0%,
            rgba(0,0,0,0.05) 55%,
            transparent 75%
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* ④ Logo — LAST in DOM, highest z-index → nothing can cover it */}
      <motion.div
        style={{
          position: 'absolute',
          top: sz * 0.05,
          right: sz * 0.05,
          width: logoSz,
          height: logoSz,
          zIndex: 50,
          pointerEvents: 'none',
        }}
        initial={false}
        animate={
          isOpen
            ? {
                scale: 1,
                opacity: 1,
                rotate: 0,
                filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.60)) drop-shadow(0 2px 4px rgba(26,43,71,0.30))',
              }
            : {
                scale: 0.2,
                opacity: 0,
                rotate: -30,
                filter: 'drop-shadow(0 0 0px rgba(201,168,76,0))',
              }
        }
        transition={
          isOpen
            ? { delay: 0.18, type: 'spring', stiffness: 380, damping: 16, mass: 0.7 }
            : { duration: 0.10, ease: 'easeIn' }
        }
      >
        <img
          src="/dolar.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            display: 'block',
          }}
        />
      </motion.div>
    </div>
  )
}
