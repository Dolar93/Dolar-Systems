'use client'
import { useState, type ReactNode, type CSSProperties } from 'react'
import { STONE, REST_SHADOW, LIFTED_SHADOW } from './stone'

/* ══════════════════════════════════════════════════════════════════
   Płyta — jedyny nośnik treści w tym layoucie.

   Zastępuje papierową kartę z zaginanym rogiem: papier nie leży
   w kamieniu. Przy najechaniu płyta się unosi, a wzdłuż dolnej
   fugi wrasta mech.
   ══════════════════════════════════════════════════════════════════ */

type Tone = 'light' | 'stone' | 'slate'

const TONE_CLASS: Record<Tone, string> = {
  light: 'stone-light',
  stone: 'stone',
  slate: '',
}

export default function StonePlate({
  children,
  accent = STONE.moss,
  tone = 'light',
  className = '',
  style,
  moss = true,
  onClick,
}: {
  /* Funkcja dostaje stan hovera, gdy wnętrze musi na niego zareagować */
  children: ReactNode | ((hovered: boolean) => ReactNode)
  accent?: string
  tone?: Tone
  className?: string
  style?: CSSProperties
  moss?: boolean
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const dark = tone === 'slate'

  return (
    <div
      className={`relative h-full ${TONE_CLASS[tone]} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        ...(dark
          ? { background: 'linear-gradient(147deg, #464D5A 0%, #3A404C 55%, #333944 100%)' }
          : null),
        border: `1px solid ${dark ? 'rgba(255,255,255,0.10)' : 'rgba(51,71,28,0.22)'}`,
        borderColor: hovered
          ? (dark ? 'rgba(168,184,140,0.45)' : `${accent}88`)
          : (dark ? 'rgba(255,255,255,0.10)' : 'rgba(51,71,28,0.22)'),
        boxShadow: hovered ? LIFTED_SHADOW : REST_SHADOW,
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {typeof children === 'function' ? children(hovered) : children}

      {/* Mech wrasta w dolną fugę — jedyna ozdoba na płycie */}
      {moss && (
        <span
          aria-hidden
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 3,
            backgroundColor: accent,
            transform: `scaleX(${hovered ? 1 : 0.22})`,
            transformOrigin: 'left',
            transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      )}
    </div>
  )
}
