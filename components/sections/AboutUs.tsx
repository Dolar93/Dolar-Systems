'use client'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

const TEAM = [
  {
    initial: 'BD',
    name: 'BARTOSZ "DOLAR" DOLCZEWSKI',
    role: 'Architekt Automatyzacji / Założyciel',
    bio: 'Buduję systemy AI które zastępują powtarzalną pracę. Stack: Node.js, Make.com, n8n, Claude AI, PostgreSQL. Każde wdrożenie traktuję jak projekt inżynierski — najpierw architektura, potem kod.',
    badges: ['Node.js', 'Make.com', 'n8n', 'Claude AI', 'PostgreSQL', 'Railway'],
  },
  {
    initial: 'M',
    name: 'MAREK',
    role: 'Head of Business / Co-Founder',
    bio: 'Head w AppChance — firma z portfolio aplikacji mobilnych dla klientów B2B. Doświadczenie w sprzedaży enterprise, kontakty w branży IT i prawnej. Ogarnia biznes żebym ja mógł ogarniać kod.',
    badges: ['B2B Sales', 'AppChance', 'Mobile Apps', 'Enterprise'],
  },
]

const MANIFESTO = [
  'Automatyzujemy procesy które zjadają czas Twoich ludzi.',
  'Nie jesteśmy kolejną "agencją AI". Jesteśmy wdrożeniowcami.',
  'Każdy projekt: analiza → architektura → wdrożenie → support.',
]

export default function AboutUs() {
  return (
    <section
      id="zespol"
      className="py-28 terminal-grid"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="04" label="ZESPÓŁ" />
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', color: '#F5F5F5' }}
          >
            Nie sprzedajemy narzędzi.
            <br />
            <span style={{ color: '#00D4FF' }}>
              Wdrażamy systemy które działają.
            </span>
          </h2>
        </Reveal>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.15}>
              <div
                className="p-8 h-full"
                style={{ border: '2px solid #1E1E1E', backgroundColor: '#111111' }}
              >
                {/* Avatar + name */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-sm font-bold"
                    style={{
                      fontFamily: 'var(--font-ibm)',
                      backgroundColor: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.25)',
                      color: '#00D4FF',
                    }}
                    aria-hidden
                  >
                    {member.initial}
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold tracking-wider mb-1"
                      style={{ fontFamily: 'var(--font-ibm)', color: '#F5F5F5' }}
                    >
                      {member.name}
                    </div>
                    <div
                      className="text-[11px]"
                      style={{
                        fontFamily: 'var(--font-space-mono)',
                        color: '#00D4FF',
                        opacity: 0.85,
                      }}
                    >
                      {member.role}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#555', fontFamily: 'var(--font-inter)' }}
                >
                  {member.bio}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {member.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] px-2 py-0.5"
                      style={{
                        fontFamily: 'var(--font-space-mono)',
                        color: '#444',
                        border: '1px solid #1E1E1E',
                        backgroundColor: '#0D0D0D',
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Terminal manifesto */}
        <Reveal delay={0.3}>
          <div
            className="p-8"
            style={{ border: '1px solid #1A1A1A', backgroundColor: '#0D0D0D' }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#febc2e' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28c840' }} />
              <span
                className="text-[10px] ml-3"
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  color: '#333',
                }}
              >
                dolar-systems // manifesto.sh
              </span>
            </div>

            {MANIFESTO.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.3, duration: 0.5 }}
                className="flex gap-3 text-sm py-1"
                style={{ fontFamily: 'var(--font-ibm)', color: '#666' }}
              >
                <span style={{ color: '#00D4FF' }}>{'>'}</span>
                <span>{line}</span>
              </motion.div>
            ))}

            {/* Cursor */}
            <div
              className="flex gap-3 text-sm mt-2"
              style={{ fontFamily: 'var(--font-ibm)', color: '#333' }}
            >
              <span style={{ color: '#00D4FF' }}>{'>'}</span>
              <span className="animate-pulse">█</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
