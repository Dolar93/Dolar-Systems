'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/#zakres', label: 'Zakres' },
  { href: '/#realizacje', label: 'Realizacje' },
  { href: '/#zespol', label: 'Zespół' },
  { href: '/#kontakt', label: 'Kontakt' },
]

export default function NavBar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(latest > 20)
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
        backgroundColor: scrolled ? 'rgba(245,243,239,0.94)' : '#F5F3EF',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(26,43,71,0.10)',
        boxShadow: scrolled ? '0 2px 16px rgba(26,43,71,0.06)' : 'none',
        transition: 'background-color 0.3s, box-shadow 0.3s',
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Nawigacja główna"
      >
        {/* Logo */}
        <a
          href="#"
          className="select-none"
          style={{
            fontFamily: 'var(--font-playfair)',
            color: '#1A2B47',
            fontSize: '19px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
          aria-label="Dolar Systems — strona główna"
        >
          Dolar<span style={{ color: '#C9A84C' }}>_</span>Systems
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="listitem"
              className="text-sm relative group transition-colors duration-200"
              style={{ fontFamily: 'var(--font-dm)', color: '#3D4F6B' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1A2B47')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#3D4F6B')}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full transition-all duration-200"
                style={{ height: '1px', backgroundColor: '#C9A84C' }}
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/#kontakt"
          className="hidden md:inline-flex items-center text-sm px-5 py-2.5 font-medium transition-all duration-200 cursor-pointer"
          style={{
            fontFamily: 'var(--font-dm)',
            backgroundColor: '#1A2B47',
            color: '#F5F3EF',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#C9A84C'
            e.currentTarget.style.color = '#1A2B47'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1A2B47'
            e.currentTarget.style.color = '#F5F3EF'
          }}
        >
          Bezpłatna analiza
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={mobileOpen}
          style={{ color: '#1A2B47' }}
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
          style={{ borderTop: '1px solid rgba(26,43,71,0.10)', backgroundColor: '#F5F3EF' }}
        >
          <div className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm py-3 border-b"
                style={{ fontFamily: 'var(--font-dm)', color: '#3D4F6B', borderColor: 'rgba(26,43,71,0.08)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#kontakt"
              className="text-sm px-5 py-3 text-center mt-4 font-medium"
              style={{ fontFamily: 'var(--font-dm)', backgroundColor: '#1A2B47', color: '#F5F3EF', borderRadius: '4px' }}
              onClick={() => setMobileOpen(false)}
            >
              Bezpłatna analiza
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
