'use client'

import { useEffect, useRef } from 'react'

interface GridPulseBackgroundProps {
  rows?: number
  cols?: number
  spacing?: number
  duration?: number
  color?: string
  opacityMin?: number
  opacityMax?: number
  mouseGlow?: boolean
  glowColor?: string
  className?: string
}

/**
 * Animated grid of pulsing cells, radiating outward from the center,
 * with an optional radial glow that follows the cursor. Cells are
 * built imperatively (not React state) so a 600+ cell grid never
 * re-renders through React — only the initial DOM build + CSS animation.
 */
export function GridPulseBackground({
  rows = 18,
  cols = 30,
  spacing = 5,
  duration = 5,
  color = '#C9A84C',
  opacityMin = 0.04,
  opacityMax = 0.30,
  mouseGlow = true,
  glowColor = 'rgba(201,168,76,0.16)',
  className,
}: GridPulseBackgroundProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = gridRef.current
    if (!container) return
    container.innerHTML = ''
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`
    container.style.gap = `${spacing}px`

    const total = rows * cols
    const centerRow = Math.floor(rows / 2)
    const centerCol = Math.floor(cols / 2)
    const frag = document.createDocumentFragment()

    for (let i = 0; i < total; i++) {
      const r = Math.floor(i / cols)
      const c = i % cols
      const dr = Math.abs(r - centerRow)
      const dc = Math.abs(c - centerCol)
      const delay = Math.sqrt(dr * dr + dc * dc) * 0.14

      const cell = document.createElement('div')
      cell.style.backgroundColor = color
      cell.style.borderRadius = '2px'
      cell.style.setProperty('--opacity-min', String(opacityMin))
      cell.style.setProperty('--opacity-max', String(opacityMax))
      cell.style.animation = `cell-pulse ${duration}s ease-in-out infinite alternate`
      cell.style.animationDelay = `${delay.toFixed(3)}s`
      frag.appendChild(cell)
    }
    container.appendChild(frag)
  }, [rows, cols, spacing, color, duration, opacityMin, opacityMax])

  useEffect(() => {
    if (!mouseGlow) return
    const el = glowRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mouseGlow])

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} aria-hidden>
      <div
        ref={gridRef}
        style={{ position: 'absolute', inset: 0, display: 'grid', pointerEvents: 'none' }}
      />
      {mouseGlow && (
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 70%)`,
          }}
        />
      )}
    </div>
  )
}
