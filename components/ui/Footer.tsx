'use client'
import { STONE, FONT, CARVED } from './stone'

const LINKS = [
  { href: '/#zakres', label: 'Systemy' },
  { href: '/#realizacje', label: 'Realizacje' },
  { href: '/#zespol', label: 'Zespół' },
  { href: '/#kontakt', label: 'Kontakt' },
]

const eyebrow: React.CSSProperties = {
  fontFamily: FONT.mono, fontSize: '10px', color: 'rgba(168,184,140,0.75)',
  letterSpacing: '0.26em', textTransform: 'uppercase',
}

export default function Footer() {
  return (
    <footer
      style={{
        /* Stopka to płyta łupka — ten sam materiał co ciemne kamienie w bruku */
        background: 'linear-gradient(147deg, #464D5A 0%, #3A404C 55%, #333944 100%)',
        borderTop: `3px solid ${STONE.moss}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-14">
          {/* Marka */}
          <div className="max-w-xs">
            <div
              className="carved-dark"
              style={{ ...CARVED, fontVariationSettings: '"wdth" 112, "wght" 700', fontSize: '20px', color: STONE.light, marginBottom: '12px' }}
            >
              Dolar<span style={{ color: STONE.lichen }}>_</span>Systems
            </div>
            <p style={{ fontFamily: FONT.body, fontSize: '14.5px', color: 'rgba(242,237,226,0.62)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Budujemy systemy pod konkretną branżę i pokazujemy je działające, zanim zdecydujesz o wdrożeniu.
            </p>
            <a
              href="mailto:dolar@dolar-systems.pl"
              style={{ fontFamily: FONT.mono, fontSize: '12px', color: STONE.lichen, letterSpacing: '0.06em' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = STONE.light)}
              onMouseLeave={(e) => (e.currentTarget.style.color = STONE.lichen)}
            >
              dolar@dolar-systems.pl
            </a>
          </div>

          {/* Nawigacja */}
          <div className="flex flex-col gap-3">
            <div style={{ ...eyebrow, marginBottom: '4px' }}>Nawigacja</div>
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: FONT.mono, fontSize: '11px', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'rgba(242,237,226,0.62)', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = STONE.lichen)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,226,0.62)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div>
            <div style={{ ...eyebrow, marginBottom: '1rem' }}>Gotowy na wdrożenie?</div>
            <a
              href="/#kontakt"
              className="inline-flex items-center cursor-pointer transition-colors duration-200"
              style={{
                fontFamily: FONT.mono, fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                backgroundColor: STONE.moss, color: STONE.light,
                padding: '14px 30px', boxShadow: `0 4px 0 ${STONE.mossDeep}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = STONE.lichen; e.currentTarget.style.color = STONE.slate }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = STONE.moss; e.currentTarget.style.color = STONE.light }}
            >
              Bezpłatna analiza →
            </a>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(168,184,140,0.20)' }}
        >
          <span style={{ fontFamily: FONT.body, fontSize: '13px', color: 'rgba(242,237,226,0.38)' }}>
            © 2025 Dolar Systems. Wszelkie prawa zastrzeżone.
          </span>
          <span style={{ fontFamily: FONT.mono, fontSize: '11px', color: 'rgba(242,237,226,0.32)', letterSpacing: '0.1em' }}>
            dolar-systems.pl
          </span>
        </div>
      </div>
    </footer>
  )
}
