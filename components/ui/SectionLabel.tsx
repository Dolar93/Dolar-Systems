import { FONT, STONE } from './stone'

interface SectionLabelProps {
  number: string
  label: string
  /* Na ciemnym łupku etykieta musi rozjaśnić się do porostu */
  onDark?: boolean
}

export default function SectionLabel({ number, label, onDark = false }: SectionLabelProps) {
  const text = onDark ? STONE.lichen : STONE.inkMuted
  const rule = onDark ? 'rgba(168,184,140,0.45)' : 'rgba(79,107,40,0.45)'

  return (
    <div className="inline-flex items-center gap-3 mb-6">
      {/* Numer sekcji czytany jak oznaczenie na planie */}
      <span style={{ fontFamily: FONT.mono, fontSize: '10px', color: text, letterSpacing: '0.15em' }}>
        {number}
      </span>
      {/* Kwadrat mchu zamiast neutralnej kreski */}
      <span style={{ width: 6, height: 6, backgroundColor: onDark ? STONE.lichen : STONE.moss, display: 'inline-block' }} />
      <span style={{ width: 18, height: 1, backgroundColor: rule, display: 'inline-block' }} />
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: '10px',
          color: text,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}
