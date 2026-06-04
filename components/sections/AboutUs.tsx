'use client'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'
import { FoldCorner, useCardFold } from '@/components/ui/FoldCorner'

const TEAM = [
  {
    photo: '/bartosz.png',
    initials: 'BD',
    name: 'Bartosz "Dolar" Dolczewski',
    role: 'Architekt Automatyzacji · Założyciel',
    bio: 'Buduję systemy AI które zastępują powtarzalną pracę. Stack: Node.js, Make.com, n8n, Claude AI, PostgreSQL. Każde wdrożenie traktuję jak projekt inżynierski — najpierw architektura, potem kod.',
    badges: ['Node.js', 'Make.com', 'n8n', 'Claude AI', 'PostgreSQL', 'Railway'],
    accentBg: '#D4E4C8', accentBgRgb: '212,228,200', accentDark: '#4A7A3A',
  },
  {
    photo: '/marek.png',
    initials: 'MR',
    name: 'Marek Rybka',
    role: 'Head of Business · Co-Founder',
    bio: 'Head w AppChance — firma z portfolio aplikacji mobilnych dla klientów B2B. Doświadczenie w sprzedaży enterprise, kontakty w branży IT i prawnej. Ogarnia biznes żebym ja mógł ogarniać kod.',
    badges: ['B2B Sales', 'AppChance', 'Mobile Apps', 'Enterprise'],
    accentBg: '#F2D4C8', accentBgRgb: '242,212,200', accentDark: '#8B4A35',
  },
]

const MANIFESTO = [
  'Automatyzujemy procesy które zjadają czas Twoich ludzi.',
  'Nie jesteśmy kolejną „agencją AI". Jesteśmy wdrożeniowcami.',
  'Każdy projekt: analiza → architektura → wdrożenie → support.',
]

const COLLAGE = [
  { bg: '#D4E4C8', w: 180, h: 240, rot: -6,  style: { left: '-30px', top: '40px'    } as React.CSSProperties },
  { bg: '#F2D4C8', w: 140, h: 190, rot: 8,   style: { right: '-20px', top: '60px'   } as React.CSSProperties },
  { bg: '#C8D4E8', w: 120, h: 160, rot: -4,  style: { left: '30px',  bottom: '20px' } as React.CSSProperties },
  { bg: '#D4C8E8', w: 100, h: 130, rot: 12,  style: { right: '10px', bottom: '30px' } as React.CSSProperties },
]

function TeamCard({ member, index }: { member: typeof TEAM[number]; index: number }) {
  const { hovered, ref: cardRef, handlers } = useCardFold()

  return (
    <Reveal delay={index * 0.15}>
      <div style={{ position: 'relative' }}>
        <FoldCorner isOpen={hovered} sz={46} bgRgb={member.accentBgRgb} />

        <motion.div
          ref={cardRef}
          {...handlers}
          className="h-full"
          style={{
            backgroundColor: member.accentBg,
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: hovered
              ? '4px 14px 32px rgba(0,0,0,0.14)'
              : '2px 2px 0px rgba(0,0,0,0.06), 4px 4px 0px rgba(0,0,0,0.04), 8px 8px 16px rgba(0,0,0,0.08)',
            transition: 'box-shadow 0.3s ease',
          }}
          animate={{ y: hovered ? -4 : 0, rotate: hovered ? 0.4 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          {/* Portrait + info — side by side on md+ */}
          <div className="flex flex-col sm:flex-row">

            {/* Photo */}
            <div
              className="relative flex-shrink-0"
              style={{ width: '100%', maxWidth: 200, aspectRatio: '3/4' }}
            >
              <img
                src={member.photo}
                alt={member.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
              {/* Subtle gradient overlay at bottom of photo */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: `linear-gradient(to bottom, transparent, ${member.accentBg}CC)`,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Text content */}
            <div className="flex flex-col p-6 flex-1">
              {/* Name + role */}
              <div className="mb-4">
                <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '22px', fontWeight: 700, color: member.accentDark, lineHeight: 1.2, marginBottom: 4 }}>
                  {member.name}
                </div>
                <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: member.accentDark, opacity: 0.65, letterSpacing: '0.08em' }}>
                  {member.role}
                </div>
              </div>

              {/* Bio */}
              <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: member.accentDark, lineHeight: 1.75, marginBottom: '1.25rem', opacity: 0.88, flex: 1 }}>
                {member.bio}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {member.badges.map((badge) => (
                  <span key={badge} style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.80)', color: member.accentDark, borderRadius: '3px', padding: '2px 7px' }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  )
}

function ManifestoCard() {
  const { hovered, ref: cardRef, handlers } = useCardFold()

  return (
    <Reveal delay={0.3}>
      <div className="relative overflow-hidden" style={{ borderRadius: '8px' }}>
        {COLLAGE.map((p, i) => (
          <motion.div key={i} className="absolute pointer-events-none"
            style={{ backgroundColor: p.bg, width: p.w, height: p.h, borderRadius: '4px', rotate: p.rot, opacity: 0.55, boxShadow: '2px 2px 8px rgba(0,0,0,0.10)', ...p.style }}
            animate={{ rotate: [p.rot, p.rot + 1, p.rot] }}
            transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
        ))}

        <div style={{ position: 'relative' }}>
          <FoldCorner
            isOpen={hovered}
            sz={50}
            bgRgb="26,43,71"
            backStyle={{ background: 'linear-gradient(215deg, #243555 0%, #1e3050 60%, #172848 100%)' }}
          />

          <motion.div
            ref={cardRef}
            {...handlers}
            className="relative p-10 md:p-14"
            style={{
              backgroundColor: '#1A2B47',
              borderRadius: '8px',
              rotate: -1,
              boxShadow: hovered
                ? '4px 16px 40px rgba(0,0,0,0.25)'
                : '2px 2px 0px rgba(0,0,0,0.10), 4px 4px 0px rgba(0,0,0,0.06), 12px 12px 32px rgba(0,0,0,0.18)',
              transition: 'box-shadow 0.3s ease',
              overflow: 'hidden',
            }}
            animate={{ rotate: hovered ? 0 : -1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="absolute top-4 left-8 select-none pointer-events-none"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: '120px', color: '#C9A84C', opacity: 0.18, lineHeight: 1 }}
              aria-hidden
            >
              "
            </div>
            <div className="relative">
              <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: 'rgba(245,243,239,0.4)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                Nasze podejście
              </div>
              <div className="flex flex-col gap-5">
                {MANIFESTO.map((line, i) => (
                  <motion.p key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                    style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(18px, 2.5vw, 26px)', fontStyle: 'italic', fontWeight: 500, color: i === 0 ? '#F5F3EF' : 'rgba(245,243,239,0.6)', lineHeight: 1.5 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: '#C9A84C', marginTop: '2.5rem', letterSpacing: '0.08em', opacity: 0.9 }}>
                — Bartosz "Dolar" Dolczewski, Dolar Systems
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Reveal>
  )
}

export default function AboutUs() {
  return (
    <section id="zespol" className="py-28" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="04" label="ZESPÓŁ" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A2B47', maxWidth: 600 }}>
            Nie sprzedajemy narzędzi.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Wdrażamy systemy które działają.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <ManifestoCard />
      </div>
    </section>
  )
}
