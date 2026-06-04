'use client'
import { useState, useCallback, useRef } from 'react'

/* ── useCardFold ──────────────────────────────────────────────────
 * Shared hook: hover state + paper-wrinkle @keyframes trigger.
 * Force-reflow (void offsetWidth) restarts the animation on each enter.
 * ──────────────────────────────────────────────────────────────── */
export function useCardFold() {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const triggerWrinkle = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('paper-wrinkle')
    void el.offsetWidth          // force reflow → restart @keyframes
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
 * Geometry:
 *   sz×sz px wrapper at top-right of parent (position:relative).
 *   Triangle: clip-path polygon(0 0, 100% 0, 100% 100%).
 *   Fold axis: rotate3d(1,1,0,angle) — 45° diagonal through (0,0).
 *   transform-origin: 0% 0%  → axis passes through wrapper corner.
 *
 * Two-face system (in .fold-group which CSS rotates to -174°):
 *   front  bgRgb  0°    backface-hidden → disappears past 90°
 *   back   cream −180°  backface-hidden → appears at ≈ 6° net
 *
 * Props:
 *   isOpen    — driven by useCardFold().hovered
 *   sz        — triangle size in px (default 46)
 *   bgRgb     — RGB string for front face, e.g. "250,250,248"
 *   backStyle — optional override for back-face style (dark cards)
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
      {/* ① Reveal — paper-inside tint, always under the flap */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          background: `linear-gradient(215deg,
            rgba(${bgRgb},0.28) 0%,
            rgba(195,185,168,0.48) 100%)`,
        }}
      />

      {/* ② Independent perspective shell per corner */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '280px',
          perspectiveOrigin: '0% 0%',
        }}
      >
        <div className={`fold-group${isOpen ? ' is-open' : ''}`}>
          {/* Front face */}
          <div
            className="fold-face"
            style={{ backgroundColor: `rgba(${bgRgb}, 0.97)` }}
          />
          {/* Back face — warm paper inside */}
          <div className="fold-face fold-face-back" style={backStyle} />
        </div>
      </div>

      {/* ③ Drop shadow cast on card surface */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.35s ease',
          background: `radial-gradient(
            ellipse 85% 70% at 88% 12%,
            rgba(0,0,0,0.18) 0%,
            rgba(0,0,0,0.05) 55%,
            transparent 75%
          )`,
        }}
      />
    </div>
  )
}
