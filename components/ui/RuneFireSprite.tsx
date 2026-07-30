'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type RuneFireSpriteProps = {
  active: boolean
  className?: string
  style?: CSSProperties
}

export default function RuneFireSprite({
  active,
  className = '',
  style,
}: RuneFireSpriteProps) {
  const reduced = useReducedMotion()
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!active || reduced) {
      setFrame(0)
      return
    }

    const interval = window.setInterval(() => {
      setFrame((current) => (current + 1) % 8)
    }, 115)

    return () => window.clearInterval(interval)
  }, [active, reduced])

  const column = frame % 4
  const row = Math.floor(frame / 4)

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none ${className}`}
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.92 }}
      transition={{ duration: reduced ? 0 : 0.38, ease: 'easeOut' }}
      style={{
        backgroundImage: 'url("/rune-fire-sheet.webp")',
        backgroundPosition: `${column * (100 / 3)}% ${row * 100}%`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '400% 200%',
        mixBlendMode: 'normal',
        ...style,
      }}
    />
  )
}
