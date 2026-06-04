'use client'

const LINKS = [
  { href: '#zakres', label: 'Zakres' },
  { href: '#realizacje', label: 'Realizacje' },
  { href: '#zespol', label: 'Zespół' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1C1917',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(79,70,229,0.08) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div
              className="font-bold mb-3"
              style={{ fontFamily: 'var(--font-fraunces)', color: '#F5F0E8', fontSize: '20px' }}
            >
              Dolar<span style={{ color: '#4F46E5' }}>.</span>Systems
            </div>
            <div
              className="text-sm leading-relaxed mb-4"
              style={{ color: '#78716C', fontFamily: 'var(--font-dm)' }}
            >
              Twoja firma. Zautomatyzowana.
            </div>
            <div
              className="text-xs"
              style={{ color: '#57534E', fontFamily: 'var(--font-ibm)' }}
            >
              dolar@dolar-systems.pl
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <div
              className="text-[10px] tracking-[0.22em] uppercase mb-1"
              style={{ fontFamily: 'var(--font-ibm)', color: '#57534E' }}
            >
              Nawigacja
            </div>
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-200"
                style={{ fontFamily: 'var(--font-dm)', color: '#78716C' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#78716C')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA block */}
          <div className="max-w-xs">
            <div
              className="text-[10px] tracking-[0.22em] uppercase mb-4"
              style={{ fontFamily: 'var(--font-ibm)', color: '#57534E' }}
            >
              Gotowy na automatyzację?
            </div>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: 'var(--font-dm)',
                backgroundColor: '#4F46E5',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4338CA'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4F46E5'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Bezpłatna analiza →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid #292524' }}
        >
          <span
            className="text-xs"
            style={{ color: '#44403C', fontFamily: 'var(--font-dm)' }}
          >
            © 2025 Dolar Systems. Wszelkie prawa zastrzeżone.
          </span>
          <span
            className="text-xs"
            style={{ color: '#44403C', fontFamily: 'var(--font-ibm)' }}
          >
            dolar-systems.pl
          </span>
        </div>
      </div>
    </footer>
  )
}
