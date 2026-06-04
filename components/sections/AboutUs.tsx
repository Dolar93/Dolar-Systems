'use client'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

const TEAM = [
  {
    initials: 'BD',
    name: 'Bartosz "Dolar" Dolczewski',
    role: 'Architekt Automatyzacji · Założyciel',
    bio: 'Buduję systemy AI które zastępują powtarzalną pracę. Stack: Node.js, Make.com, n8n, Claude AI, PostgreSQL. Każde wdrożenie traktuję jak projekt inżynierski — najpierw architektura, potem kod.',
    badges: ['Node.js', 'Make.com', 'n8n', 'Claude AI', 'PostgreSQL', 'Railway'],
  },
  {
    initials: 'M',
    name: 'Marek',
    role: 'Head of Business · Co-Founder',
    bio: 'Head w AppChance — firma z portfolio aplikacji mobilnych dla klientów B2B. Doświadczenie w sprzedaży enterprise, kontakty w branży IT i prawnej. Ogarnia biznes żebym ja mógł ogarniać kod.',
    badges: ['B2B Sales', 'AppChance', 'Mobile Apps', 'Enterprise'],
  },
]

const MANIFESTO = [
  'Automatyzujemy procesy które zjadają czas Twoich ludzi.',
  'Nie jesteśmy kolejną „agencją AI". Jesteśmy wdrożeniowcami.',
  'Każdy projekt: analiza → architektura → wdrożenie → support.',
]

export default function AboutUs() {
  return (
    <section id="zespol" className="py-28" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="04" label="ZESPÓŁ" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A2B47', maxWidth: 600 }}>
            Nie sprzedajemy narzędzi.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>
              Wdrażamy systemy które działają.
            </span>
          </h2>
        </Reveal>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.15}>
              <div
                className="p-8 h-full"
                style={{
                  backgroundColor: '#FAFAF8',
                  border: '1px solid rgba(26,43,71,0.10)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 12px rgba(26,43,71,0.08), 0 1px 3px rgba(26,43,71,0.04)',
                }}
              >
                {/* Avatar + name */}
                <div className="flex items-start gap-5 mb-6">
                  {/* Photo placeholder */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center font-bold text-lg"
                    style={{
                      width: 72,
                      height: 96,
                      backgroundColor: '#EEEAE3',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-playfair)',
                      color: '#8A9AB5',
                      fontSize: '22px',
                      letterSpacing: '0.05em',
                    }}
                    aria-hidden
                  >
                    {member.initials}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#1A2B47',
                        lineHeight: 1.2,
                        marginBottom: 4,
                      }}
                    >
                      {member.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '12px', color: '#8A9AB5', letterSpacing: '0.08em' }}>
                      {member.role}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p style={{ fontFamily: 'var(--font-dm)', fontSize: '15px', color: '#3D4F6B', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  {member.bio}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {member.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[11px] px-2 py-0.5"
                      style={{ fontFamily: 'var(--font-ibm)', backgroundColor: 'rgba(26,43,71,0.06)', color: '#3D4F6B', borderRadius: '2px' }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Manifesto */}
        <Reveal delay={0.3}>
          <div
            className="relative p-10 md:p-14"
            style={{
              backgroundColor: '#FAFAF8',
              border: '1px solid rgba(26,43,71,0.10)',
              borderRadius: '8px',
              boxShadow: '0 2px 12px rgba(26,43,71,0.08), 0 1px 3px rgba(26,43,71,0.04)',
            }}
          >
            {/* Decorative quote mark */}
            <div
              className="absolute top-6 left-10 select-none pointer-events-none"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '96px',
                color: '#C9A84C',
                opacity: 0.18,
                lineHeight: 1,
              }}
              aria-hidden
            >
              "
            </div>

            <div className="relative">
              <div
                style={{ fontFamily: 'var(--font-ibm)', fontSize: '10px', color: '#8A9AB5', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '2rem' }}
              >
                Nasze podejście
              </div>
              <div className="flex flex-col gap-5">
                {MANIFESTO.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.5, ease: 'easeOut' }}
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: 'clamp(18px, 2.5vw, 26px)',
                      fontStyle: 'italic',
                      fontWeight: 500,
                      color: i === 0 ? '#1A2B47' : '#3D4F6B',
                      lineHeight: 1.5,
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: '#C9A84C', marginTop: '2.5rem', letterSpacing: '0.08em' }}>
                — Bartosz "Dolar" Dolczewski, Dolar Systems
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
