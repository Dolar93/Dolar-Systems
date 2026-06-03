'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#zakres', label: 'Zakres' },
  { href: '#realizacje', label: 'Realizacje' },
  { href: '#zespol', label: 'Zespół' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function NavBar() {
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    if (latest > prev && latest > 80) {
      setHidden(true)
      setMobileOpen(false)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: '1px solid #1E1E1E',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        backgroundColor: 'rgba(10, 10, 10, 0.88)',
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Nawigacja główna"
      >
        {/* Logo */}
        <a
          href="#"
          className="text-sm font-bold tracking-[0.18em] select-none"
          style={{ fontFamily: 'var(--font-ibm)', color: '#F5F5F5' }}
          aria-label="Dolar Systems — strona główna"
        >
          DOLAR<span style={{ color: '#00D4FF' }}>_</span>SYSTEMS
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="listitem"
              className="text-xs tracking-[0.1em] transition-colors duration-200 hover:text-[#F5F5F5]"
              style={{ fontFamily: 'var(--font-ibm)', color: '#666' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center text-xs px-5 py-2.5 transition-all duration-250"
          style={{
            fontFamily: 'var(--font-ibm)',
            border: '1px solid #00D4FF',
            color: '#00D4FF',
            letterSpacing: '0.12em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00D4FF'
            e.currentTarget.style.color = '#0A0A0A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#00D4FF'
          }}
        >
          UMÓW ANALIZĘ
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={mobileOpen}
          style={{ color: '#F5F5F5' }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="md:hidden px-6 pb-6"
          style={{
            borderTop: '1px solid #1E1E1E',
            backgroundColor: 'rgba(10, 10, 10, 0.96)',
          }}
        >
          <div className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm py-3 border-b transition-colors"
                style={{
                  fontFamily: 'var(--font-ibm)',
                  color: '#666',
                  borderColor: '#1E1E1E',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="text-xs px-5 py-3 text-center mt-4"
              style={{
                fontFamily: 'var(--font-ibm)',
                border: '1px solid #00D4FF',
                color: '#00D4FF',
                letterSpacing: '0.12em',
              }}
              onClick={() => setMobileOpen(false)}
            >
              UMÓW ANALIZĘ
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
