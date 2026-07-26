'use client'
import { motion, useReducedMotion } from 'framer-motion'

/* ══════════════════════════════════════════════════════════════════
   Dziedziniec — bruk widziany z góry.

   Wszystko leży na siatce CELL px. Fugi rysuje tło kontenera,
   a płyty akcentowe (łupek, mech, sadzawka) siedzą w gridzie na
   jawnych współrzędnych, więc trzymają się fug niezależnie od
   szerokości ekranu. Zero losowości — układ musi być identyczny
   na serwerze i w przeglądarce.
   ══════════════════════════════════════════════════════════════════ */

export const CELL = 84

type Kind = 'slate' | 'moss' | 'pool' | 'light'
type Slab = { c: number; r: number; cs?: number; rs?: number; k: Kind }

/* Ciężar rozłożony na obrzeża — środek zasłania płyta z treścią.
   Wszystko mieści się w rzędach 1–7, bo dalsze i tak nie wchodzą
   w kadr przy typowej wysokości hero. Dolny środek zostaje pusty
   pod wskaźnik scrollowania. */
const SLABS: Slab[] = [
  // górny pas
  { c: 1,  r: 1, cs: 2,        k: 'slate' },
  { c: 3,  r: 2,               k: 'light' },
  { c: 4,  r: 1,               k: 'moss'  },
  { c: 6,  r: 2, cs: 2,        k: 'moss'  },
  { c: 9,  r: 1,        rs: 2, k: 'slate' },
  { c: 11, r: 1, cs: 2,        k: 'moss'  },
  { c: 14, r: 2,               k: 'slate' },
  // boki
  { c: 1,  r: 3, cs: 2, rs: 2, k: 'pool'  },
  { c: 2,  r: 6,               k: 'moss'  },
  { c: 13, r: 3,        rs: 2, k: 'moss'  },
  { c: 15, r: 3,               k: 'light' },
  { c: 14, r: 5, cs: 2,        k: 'slate' },
  { c: 12, r: 6,               k: 'moss'  },
  // dolny pas
  { c: 3,  r: 7, cs: 2,        k: 'slate' },
  { c: 6,  r: 7,               k: 'moss'  },
  { c: 10, r: 7, cs: 2,        k: 'slate' },
  { c: 13, r: 7,               k: 'moss'  },
]

/* ── Sadzawka — zatopiona płyta z zarysem lilii ─────────────────── */
function Pool({ shimmer }: { shimmer: boolean }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(158deg, #6E8290 0%, #52657A 45%, #3E4E5E 100%)',
        boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.42), inset 0 -1px 0 rgba(255,255,255,0.10)',
      }}
    >
      {shimmer && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(104deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%)',
          }}
          animate={{ x: ['-60%', '60%'] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
        />
      )}
      {/* Lilia — sam zarys, jak rytowany w tafli */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-[22%]" aria-hidden>
        <g fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="2.4" strokeLinecap="round">
          <path d="M50 78 C34 74 24 62 24 50 C36 50 46 58 50 68 C54 58 64 50 76 50 C76 62 66 74 50 78 Z" />
          <path d="M50 68 C46 54 46 40 50 26 C54 40 54 54 50 68 Z" />
          <path d="M50 40 C40 34 32 34 26 38 M50 40 C60 34 68 34 74 38" />
        </g>
      </svg>
    </div>
  )
}

const SURFACE: Record<Exclude<Kind, 'pool'>, React.CSSProperties> = {
  slate: {
    background: 'linear-gradient(147deg, #464D5A 0%, #3A404C 55%, #333944 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.25)',
  },
  moss: {
    backgroundColor: '#4F6B28',
    backgroundImage:
      'radial-gradient(circle at 22% 28%, rgba(255,255,255,0.13) 0 2px, transparent 3px),' +
      'radial-gradient(circle at 68% 62%, rgba(0,0,0,0.16) 0 3px, transparent 4px),' +
      'radial-gradient(circle at 45% 85%, rgba(255,255,255,0.09) 0 2px, transparent 3px)',
    backgroundSize: '19px 19px, 27px 27px, 23px 23px',
    boxShadow: 'inset 0 0 14px rgba(29,41,15,0.55)',
  },
  light: {
    backgroundColor: '#F2EDE2',
    backgroundImage: 'repeating-linear-gradient(94deg, rgba(88,74,52,0.026) 0 2px, transparent 2px 9px)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.06)',
  },
}

export default function Courtyard({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
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
              ...(s.k === 'pool' ? {} : SURFACE[s.k]),
            }}
          >
            {s.k === 'pool' && <Pool shimmer={!reduced} />}
          </div>
        ))}
      </div>

      {/* Winieta — dociąga wzrok do środka dziedzińca */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgba(90,80,60,0.16) 100%)' }}
      />
    </div>
  )
}
