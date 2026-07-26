'use client'
import { motion, useReducedMotion } from 'framer-motion'

/* ══════════════════════════════════════════════════════════════════
   Bluszcz — jedyny element, który nie słucha siatki.

   Liście rozstawiam wzdłuż krzywej Béziera: pozycja z punktu na
   krzywej, obrót ze stycznej, skala maleje ku wierzchołkowi pędu.
   Liczone deterministycznie w module, więc SSR i klient dostają
   dokładnie ten sam kształt.
   ══════════════════════════════════════════════════════════════════ */

type Pt = readonly [number, number]

function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const m = 1 - t
  const a = m * m * m, b = 3 * m * m * t, c = 3 * m * t * t, d = t * t * t
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
  ]
}

function tangent(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): number {
  const m = 1 - t
  const dx = 3 * m * m * (p1[0] - p0[0]) + 6 * m * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0])
  const dy = 3 * m * m * (p1[1] - p0[1]) + 6 * m * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1])
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

/* Liść bluszczu — trójklapowy, rysowany od nasady ogonka */
const LEAF = 'M0,0 C2,-2.6 4.6,-5.2 7.4,-5.6 C7,-3.4 7.8,-2 9.4,-1.4 C11.6,-2.8 14,-2.4 15,0 C14,2.4 11.6,2.8 9.4,1.4 C7.8,2 7,3.4 7.4,5.6 C4.6,5.2 2,2.6 0,0 Z'

type Stem = { from: Pt; c1: Pt; c2: Pt; to: Pt; leaves: number }

function buildStem(stem: Stem, stemIndex: number) {
  const { from, c1, c2, to, leaves } = stem
  return Array.from({ length: leaves }, (_, i) => {
    const t = 0.14 + (i * 0.82) / Math.max(leaves - 1, 1)
    const [x, y] = cubic(from, c1, c2, to, t)
    const ang = tangent(from, c1, c2, to, t)
    const side = i % 2 === 0 ? 1 : -1
    /* Liść ma 15 jednostek przy viewBoxie 130 — bez tego mnożnika
       ginie na tle pędu */
    const scale = 3.0 - 1.45 * (i / Math.max(leaves - 1, 1))
    return {
      key: `${stemIndex}-${i}`,
      transform: `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(ang + side * 54).toFixed(1)}) scale(${scale.toFixed(3)})`,
      delay: stemIndex * 0.12 + i * 0.055,
      /* Dwa odcienie zieleni, żeby kępa nie była płaska */
      fill: i % 3 === 0 ? '#33471C' : '#4F6B28',
    }
  })
}

function stemPath({ from, c1, c2, to }: Stem) {
  return `M${from[0]},${from[1]} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${to[0]},${to[1]}`
}

/* Kępa: trzy pędy rozchodzące się z jednego narożnika */
const CLUSTER: Stem[] = [
  { from: [4, 4],  c1: [40, 10],  c2: [58, 44],  to: [96, 52],  leaves: 8 },
  { from: [6, 8],  c1: [22, 46],  c2: [30, 74],  to: [58, 104], leaves: 7 },
  { from: [2, 2],  c1: [46, 30],  c2: [86, 30],  to: [116, 16], leaves: 6 },
]

export default function Vine({
  className = '',
  size = 190,
  flipX = false,
  flipY = false,
  delay = 0,
}: {
  className?: string
  size?: number
  flipX?: boolean
  flipY?: boolean
  delay?: number
}) {
  const reduced = useReducedMotion()

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 130 120"
      fill="none"
      aria-hidden
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
    >
      {CLUSTER.map((stem, si) => (
        <g key={si}>
          <motion.path
            d={stemPath(stem)}
            stroke="#3E5720"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.1, delay: delay + si * 0.12, ease: 'easeOut' }}
          />
          {buildStem(stem, si).map((leaf) => (
            /* Pozycja liścia siedzi na <g> jako atrybut SVG. Gdyby
               trafiła na ten sam element co animacja, framer nadpisałby
               ją przez style.transform i cała kępa zapadłaby się do (0,0). */
            <g key={leaf.key} transform={leaf.transform}>
              <motion.path
                d={LEAF}
                fill={leaf.fill}
                style={{ transformBox: 'fill-box', transformOrigin: '0% 50%' }}
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.35 + leaf.delay, ease: [0.34, 1.4, 0.64, 1] }}
              />
            </g>
          ))}
        </g>
      ))}
    </svg>
  )
}
