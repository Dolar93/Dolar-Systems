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
        backgroundColor: 'rgba(250,250,247,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E7E5E4',
        boxShadow: '0 1px 12px rgba(28,25,23,0.06)',
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Nawigacja główna"
      >
        {/* Logo */}
        <a
          href="#"
          className="font-bold select-none"
          style={{ fontFamily: 'var(--font-fraunces)', color: '#1C1917', fontSize: '18px' }}
          aria-label="Dolar Systems — strona główna"
        >
          Dolar<span style={{ color: '#4F46E5' }}>.</span>Systems
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="listitem"
              className="text-sm transition-all duration-200 relative group"
              style={{ fontFamily: 'var(--font-dm)', color: '#57534E' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1917')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#57534E')}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full transition-all duration-200"
                style={{ height: '1.5px', backgroundColor: '#4F46E5' }}
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center text-sm px-5 py-2 rounded-lg font-medium transition-all duration-200"
          style={{
            fontFamily: 'var(--font-dm)',
            backgroundColor: '#4F46E5',
            color: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#4338CA'
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(79,70,229,0.35)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4F46E5'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Bezpłatna analiza →
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={mobileOpen}
          style={{ color: '#1C1917' }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            borderTop: '1px solid #E7E5E4',
            backgroundColor: 'rgba(250,250,247,0.98)',
          }}
        >
          <div className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm py-3 border-b"
                style={{
                  fontFamily: 'var(--font-dm)',
                  color: '#57534E',
                  borderColor: '#E7E5E4',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="text-sm px-5 py-3 text-center mt-4 rounded-lg font-medium"
              style={{
                fontFamily: 'var(--font-dm)',
                backgroundColor: '#4F46E5',
                color: '#ffffff',
              }}
              onClick={() => setMobileOpen(false)}
            >
              Bezpłatna analiza →
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
