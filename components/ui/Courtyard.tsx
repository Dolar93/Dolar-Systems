'use client'
import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import InteractiveAutomationCube from '@/components/ui/InteractiveAutomationCube'

/* ══════════════════════════════════════════════════════════════════
   Dziedziniec — bruk widziany z góry.

   Wszystko leży na siatce CELL px. Fugi rysuje tło kontenera,
   a płyty akcentowe (łupek, mech, sadzawka) siedzą w gridzie na
   jawnych współrzędnych, więc trzymają się fug niezależnie od
   szerokości ekranu. Zero losowości — układ musi być identyczny
   na serwerze i w przeglądarce.
   ══════════════════════════════════════════════════════════════════ */

export const CELL = 84

type Kind = 'artifact'
type Slab = {
  c: number
  r: number
  cs?: number
  rs?: number
  k: Kind
}

/* Ciężar rozłożony na obrzeża — środek zasłania płyta z treścią.
   Wszystko mieści się w rzędach 1–7, bo dalsze i tak nie wchodzą
   w kadr przy typowej wysokości hero. Dolny środek zostaje pusty
   pod wskaźnik scrollowania. */
const SLABS: Slab[] = [
  { c: 1,  r: 3, cs: 2, rs: 2, k: 'artifact' },
]

const DECORATIONS = [
  {
    src: '/courtyard-data-rail.webp',
    className: 'left-[22%] top-[82px] h-[112px] w-[224px]',
    transform: 'rotate(-4deg)',
  },
  {
    src: '/courtyard-gateway.webp',
    className: 'right-[-12px] top-[320px] h-[116px] w-[232px]',
    transform: 'rotate(-3deg)',
  },
  {
    src: '/courtyard-data-spine.webp',
    className: 'left-1/2 top-[54px] h-[182px] w-[92px]',
    transform: 'translateX(-50%)',
  },
  {
    src: '/courtyard-living-circuit.webp',
    className: 'left-[3.5%] top-[405px] h-[138px] w-[138px]',
    transform: 'rotate(-5deg)',
  },
  {
    src: '/courtyard-relay-core.webp',
    className: 'right-[3.5%] top-[160px] h-[136px] w-[136px]',
    transform: 'rotate(3deg)',
  },
  {
    src: '/courtyard-rune-core.webp',
    className: 'right-[3.5%] top-[510px] h-[146px] w-[146px]',
    transform: 'rotate(-2deg)',
  },
] as const

export default function Courtyard({
  className = '',
  onIgnite,
}: {
  className?: string
  onIgnite?: () => void
}) {
  const reduced = useReducedMotion()

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundColor: '#E7E1D3',
        /* Żyłkowanie trawertynu + fugi: pionowe i poziome linie co CELL */
        backgroundImage: `
          repeating-linear-gradient(94deg, rgba(88,74,52,0.030) 0 2px, transparent 2px 9px),
          repeating-linear-gradient(90deg, rgba(51,71,28,0.30) 0 2px, transparent 2px ${CELL}px),
          repeating-linear-gradient(0deg,  rgba(51,71,28,0.30) 0 2px, transparent 2px ${CELL}px)
        `,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, ${CELL}px)`,
          gridAutoRows: `${CELL}px`,
        }}
      >
        {SLABS.map((s) => (
          <div
            key={`${s.c}-${s.r}-${s.k}`}
            style={{
              gridColumn: `${s.c} / span ${s.cs ?? 1}`,
              gridRow: `${s.r} / span ${s.rs ?? 1}`,
              /* 2px marginesu odsłania fugę dookoła płyty */
              margin: '2px',
              position: 'relative',
            }}
          >
            {s.k === 'artifact' && (
              <InteractiveAutomationCube reduced={reduced} onIgnite={onIgnite} />
            )}
          </div>
        ))}
      </div>

      {DECORATIONS.map((decoration) => (
        <div
          key={decoration.src}
          className={`pointer-events-none absolute hidden lg:block ${decoration.className}`}
          style={{ transform: decoration.transform, zIndex: 1 }}
          aria-hidden
        >
          <Image
            src={decoration.src}
            alt=""
            fill
            sizes="232px"
            className="object-contain"
            style={{ filter: 'drop-shadow(0 10px 9px rgba(43,48,37,0.30))' }}
          />
        </div>
      ))}

      {/* Winieta — dociąga wzrok do środka dziedzińca */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgba(90,80,60,0.16) 100%)' }}
      />
    </div>
  )
}
