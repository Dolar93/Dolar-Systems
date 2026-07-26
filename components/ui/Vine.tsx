'use client'
import { motion, useReducedMotion } from 'framer-motion'

/* ══════════════════════════════════════════════════════════════════
   Bluszcz — jedyny element, który nie słucha siatki.

   Wcześniej rysowany wektorowo; płaskie plamy nie trzymały się
   fotorealistycznego logo, więc teraz to renderyzacje z kanałem alfa.
   Źródła przyszły z wpalonym w piksele checkerboardem — tło wycięte
   po nasyceniu (kratka jest achromatyczna, roślina nie).
   ══════════════════════════════════════════════════════════════════ */

const ASSETS = {
  corner:  { src: '/vine-corner.webp',  w: 900, h: 884  },
  hanging: { src: '/vine-hanging.webp', w: 460, h: 2657 },
} as const

export default function Vine({
  variant = 'corner',
  size = 220,
  flipX = false,
  flipY = false,
  delay = 0,
  className = '',
}: {
  variant?: keyof typeof ASSETS
  /* Szerokość w px — wysokość dolicza się z proporcji materiału */
  size?: number
  flipX?: boolean
  flipY?: boolean
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const a = ASSETS[variant]
  const height = Math.round((size * a.h) / a.w)

  /* Kępa wyrasta z zakotwiczonego rogu, więc stamtąd się rozwija */
  const originX = flipX ? 'right' : 'left'
  const originY = flipY ? 'bottom' : 'top'

  return (
    /* Odbicie siedzi na opakowaniu, animacja na obrazku. Gdyby
       trafiły na ten sam element, framer nadpisałby transform
       przez style i odbicie by zniknęło. */
    <div
      className={className}
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`, lineHeight: 0 }}
      aria-hidden
    >
      <motion.img
        src={a.src}
        alt=""
        width={size}
        height={height}
        loading="lazy"
        decoding="async"
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'block',
          width: size,
          height: 'auto',
          transformOrigin: `${originX} ${originY}`,
          filter: 'drop-shadow(0 5px 9px rgba(58,50,34,0.26))',
        }}
      />
    </div>
  )
}
