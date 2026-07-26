'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { STONE, FONT, CARVED } from './stone'

const LOGO = '/logo-dolar-overgrown.png'
const LOGO_FALLBACK = '/logo-dolar-metatron.png'

/* Zarośnięty betonowy dolar. Zwykły <img>, nie next/image, żeby brak
   pliku degradował się do starego logo zamiast zostawiać dziurę.
   Samo onError nie wystarcza: obrazek jest renderowany po stronie
   serwera, więc błąd ładowania potrafi polecieć zanim React zdąży
   podpiąć handler — stąd dodatkowe sprawdzenie po zamontowaniu. */
function Logo() {
  const [src, setSrc] = useState(LOGO)
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setSrc(LOGO_FALLBACK)
  }, [])

  return (
    /* Znak jest pionowy (442×565) — wymiary trzymają proporcję,
       żeby nie rozpychał 64-pikselowego paska ani nie skakał przy ładowaniu */
    <img
      ref={ref}
      src={src}
      alt=""
      width={33}
      height={42}
      style={{ height: 42, width: 'auto', objectFit: 'contain', display: 'block' }}
      onError={() => setSrc(LOGO_FALLBACK)}
    />
  )
}

const NAV_LINKS = [
  { href: '/#zakres', label: 'Systemy' },
  { href: '/#realizacje', label: 'Realizacje' },
  { href: '/#zespol', label: 'Zespół' },
  { href: '/#kontakt', label: 'Kontakt' },
]

const linkSt: React.CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: STONE.inkSoft,
}

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
      className="fixed top-0 left-0 right-0 z-50 stone-light"
      style={{
        /* Pasek nawigacji to płyta krawężnikowa — mech w dolnej fudze */
        borderBottom: `2px solid ${scrolled ? STONE.moss : 'rgba(51,71,28,0.30)'}`,
        boxShadow: scrolled ? '0 4px 18px rgba(58,50,34,0.14)' : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Nawigacja główna"
      >
        {/* Logo */}
        <a
          href="#"
          className="select-none flex items-center gap-2.5"
          aria-label="Dolar Systems — strona główna"
        >
          <Logo />
          <span
            className="carved"
            style={{
              ...CARVED,
              fontVariationSettings: '"wdth" 112, "wght" 700',
              color: STONE.ink,
              fontSize: '17px',
              letterSpacing: '-0.005em',
            }}
          >
            Dolar<span style={{ color: STONE.moss }}>_</span>Systems
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="listitem"
              className="relative group transition-colors duration-200"
              style={linkSt}
              onMouseEnter={(e) => (e.currentTarget.style.color = STONE.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = STONE.inkSoft)}
            >
              {link.label}
              {/* Mech wrasta pod linkiem */}
              <span
                className="absolute -bottom-1.5 left-0 w-0 group-hover:w-full transition-all duration-300"
                style={{ height: '2px', backgroundColor: STONE.moss }}
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/#kontakt"
          className="hidden lg:inline-flex items-center cursor-pointer transition-colors duration-200"
          style={{
            ...linkSt,
            fontWeight: 600,
            color: STONE.light,
            backgroundColor: STONE.moss,
            padding: '11px 20px',
            boxShadow: `0 3px 0 ${STONE.mossDeep}`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = STONE.mossDeep }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = STONE.moss }}
        >
          Bezpłatna analiza
        </a>

        {/* Hamburger */}
        <button
          className="lg:hidden p-2 cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={mobileOpen}
          style={{ color: STONE.ink }}
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
          className="lg:hidden px-6 pb-6 stone-light"
          style={{ borderTop: '1px solid rgba(51,71,28,0.20)' }}
        >
          <div className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3.5"
                style={{ ...linkSt, fontSize: '12px', borderBottom: '1px solid rgba(51,71,28,0.14)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#kontakt"
              className="px-5 py-4 text-center mt-4"
              style={{
                ...linkSt, fontSize: '12px', fontWeight: 600,
                color: STONE.light, backgroundColor: STONE.moss,
                boxShadow: `0 3px 0 ${STONE.mossDeep}`,
              }}
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
