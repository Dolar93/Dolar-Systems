import type { CSSProperties } from 'react'

/* ══════════════════════════════════════════════════════════════════
   Wspólny słownik materiałów — "Ogród na siatce".
   Wszystkie sekcje biorą kolory stąd, żeby kamień był jednym
   kamieniem, a nie pięcioma odcieniami beżu.
   ══════════════════════════════════════════════════════════════════ */

export const STONE = {
  travertine: '#E7E1D3',
  light:      '#F2EDE2',
  deep:       '#D8D1BF',
  slate:      '#3A404C',
  slateSoft:  '#4A5260',
  moss:       '#4F6B28',
  mossDeep:   '#33471C',
  lichen:     '#A8B88C',
  water:      '#6E8290',
  waterDeep:  '#3E4E5E',

  /* Tekst na jasnym kamieniu — wszystkie trzy trzymają 4.5:1 */
  ink:        '#3A404C',
  inkSoft:    '#4F5A45',
  inkMuted:   '#5A6647',
} as const

export const FONT = {
  carved: 'var(--font-archivo)',
  body:   'var(--font-inter-tight)',
  mono:   'var(--font-ibm)',
} as const

/* Litery ryte w płycie: rozciągnięta oś wdth + wersaliki */
export const CARVED: CSSProperties = {
  fontFamily: FONT.carved,
  fontVariationSettings: '"wdth" 118, "wght" 800',
  textTransform: 'uppercase',
}

/* Fugi bruku jako tło sekcji — ta sama siatka co w hero */
export function grout(cell = 84, alpha = 0.16): CSSProperties {
  return {
    backgroundImage: `
      repeating-linear-gradient(94deg, rgba(88,74,52,0.026) 0 2px, transparent 2px 9px),
      repeating-linear-gradient(90deg, rgba(51,71,28,${alpha}) 0 2px, transparent 2px ${cell}px),
      repeating-linear-gradient(0deg,  rgba(51,71,28,${alpha}) 0 2px, transparent 2px ${cell}px)
    `,
  }
}

/* Cień płyty leżącej na bruku i uniesionej */
export const REST_SHADOW   = '0 3px 0 rgba(58,50,34,0.10), 0 6px 16px rgba(58,50,34,0.10)'
export const LIFTED_SHADOW = '0 14px 32px rgba(58,50,34,0.22), 0 3px 0 rgba(58,50,34,0.08)'
