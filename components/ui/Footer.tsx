'use client'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1E1E1E', backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div
              className="text-sm font-bold tracking-[0.18em] mb-2"
              style={{ fontFamily: 'var(--font-ibm)', color: '#F5F5F5' }}
            >
              DOLAR<span style={{ color: '#00D4FF' }}>_</span>SYSTEMS
            </div>
            <div
              className="text-xs"
              style={{ color: '#444', fontFamily: 'var(--font-ibm)' }}
            >
              Twoja firma. Zautomatyzowana.
            </div>
          </div>

          <div
            className="flex flex-col gap-2 text-xs"
            style={{ fontFamily: 'var(--font-ibm)' }}
          >
            <a
              href="mailto:dolar@dolar-systems.pl"
              className="transition-colors duration-200"
              style={{ color: '#444' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00D4FF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
            >
              dolar@dolar-systems.pl
            </a>
            <span style={{ color: '#333' }}>NIP: 000-000-00-00</span>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid #1E1E1E' }}
        >
          <span
            className="text-xs"
            style={{ color: '#333', fontFamily: 'var(--font-ibm)' }}
          >
            © 2025 Dolar Systems. Wszelkie prawa zastrzeżone.
          </span>
          <span
            className="text-xs"
            style={{ color: '#222', fontFamily: 'var(--font-ibm)' }}
          >
            dolar-systems.pl
          </span>
        </div>
      </div>
    </footer>
  )
}
