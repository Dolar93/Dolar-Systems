'use client'

const LINKS = [
  { href: '/#zakres', label: 'Zakres' },
  { href: '/#realizacje', label: 'Realizacje' },
  { href: '/#zespol', label: 'Zespół' },
  { href: '/#kontakt', label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A2B47' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-14">
          {/* Brand */}
          <div className="max-w-xs">
            <div
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '22px',
                fontWeight: 700,
                color: '#F5F3EF',
                marginBottom: '10px',
                letterSpacing: '-0.01em',
              }}
            >
              Dolar<span style={{ color: '#C9A84C' }}>_</span>Systems
            </div>
            <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: 'rgba(245,243,239,0.55)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Twoja firma. Zautomatyzowana.
            </p>
            <a
              href="mailto:dolar@dolar-systems.pl"
              style={{ fontFamily: 'var(--font-ibm)', fontSize: '12px', color: '#C9A84C', opacity: 0.85, letterSpacing: '0.05em' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
            >
              dolar@dolar-systems.pl
            </a>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: 'rgba(245,243,239,0.35)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Nawigacja
            </div>
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: 'rgba(245,243,239,0.55)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F3EF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,243,239,0.55)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div>
            <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: 'rgba(245,243,239,0.35)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Gotowy na automatyzację?
            </div>
            <a
              href="/#kontakt"
              className="inline-flex items-center text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{ fontFamily: 'var(--font-dm)', backgroundColor: '#C9A84C', color: '#1A2B47', padding: '12px 28px', borderRadius: '4px' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F3EF' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C9A84C' }}
            >
              Bezpłatna analiza →
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(245,243,239,0.10)' }}
        >
          <span style={{ fontFamily: 'var(--font-dm)', fontSize: '13px', color: 'rgba(245,243,239,0.30)' }}>
            © 2025 Dolar Systems. Wszelkie prawa zastrzeżone.
          </span>
          <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: 'rgba(245,243,239,0.25)', letterSpacing: '0.1em' }}>
            dolar-systems.pl
          </span>
        </div>
      </div>
    </footer>
  )
}
