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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
    accentColor: '#4F46E5',
  },
  {
    initials: 'M',
    name: 'Marek',
    role: 'Head of Business · Co-Founder',
    bio: 'Head w AppChance — firma z portfolio aplikacji mobilnych dla klientów B2B. Doświadczenie w sprzedaży enterprise, kontakty w branży IT i prawnej. Ogarnia biznes żebym ja mógł ogarniać kod.',
    badges: ['B2B Sales', 'AppChance', 'Mobile Apps', 'Enterprise'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format',
    accentColor: '#F59E0B',
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
      className="py-28 warm-grid"
      style={{ backgroundColor: '#F4F1EB' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="04" label="ZESPÓŁ" />
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-fraunces)', color: '#1C1917' }}
          >
            Nie sprzedajemy narzędzi.{' '}
            <span style={{ color: '#4F46E5', fontStyle: 'italic' }}>
              Wdrażamy systemy które działają.
            </span>
          </h2>
        </Reveal>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.15}>
              <div
                className="p-8 h-full rounded-2xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E7E5E4',
                  boxShadow: '0 2px 8px rgba(28,25,23,0.06)',
                }}
              >
                {/* Avatar + name */}
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    style={{
                      border: `2px solid ${member.accentColor}33`,
                    }}
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement
                      el.style.display = 'none'
                      const fallback = el.nextElementSibling as HTMLElement | null
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0 items-center justify-center text-sm font-bold hidden"
                    style={{
                      fontFamily: 'var(--font-fraunces)',
                      backgroundColor: `${member.accentColor}14`,
                      border: `2px solid ${member.accentColor}33`,
                      color: member.accentColor,
                    }}
                    aria-hidden
                  >
                    {member.initials}
                  </div>
                  <div>
                    <div
                      className="font-semibold mb-0.5"
                      style={{ fontFamily: 'var(--font-fraunces)', color: '#1C1917', fontSize: '15px' }}
                    >
                      {member.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ fontFamily: 'var(--font-ibm)', color: member.accentColor, opacity: 0.9 }}
                    >
                      {member.role}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#57534E', fontFamily: 'var(--font-dm)', lineHeight: 1.75 }}
                >
                  {member.bio}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {member.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] px-2.5 py-1 rounded-full"
                      style={{
                        fontFamily: 'var(--font-ibm)',
                        color: member.accentColor,
                        border: `1px solid ${member.accentColor}28`,
                        backgroundColor: `${member.accentColor}0D`,
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

        {/* Manifesto quote */}
        <Reveal delay={0.3}>
          <div
            className="relative rounded-2xl p-10 overflow-hidden"
            style={{
              backgroundColor: '#1C1917',
            }}
          >
            {/* Decorative quote mark */}
            <div
              className="absolute top-6 left-8 select-none"
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: '96px',
                color: 'rgba(79,70,229,0.15)',
                lineHeight: 1,
              }}
              aria-hidden
            >
              "
            </div>

            <div className="relative">
              <div
                className="text-xs tracking-[0.22em] uppercase mb-6"
                style={{ fontFamily: 'var(--font-ibm)', color: '#A8A29E' }}
              >
                Nasze podejście
              </div>

              <div className="flex flex-col gap-4">
                {MANIFESTO.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg md:text-xl font-medium leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-fraunces)',
                      color: i === 0 ? '#FFFFFF' : '#A8A29E',
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <div
                className="mt-8 text-sm"
                style={{ fontFamily: 'var(--font-ibm)', color: '#4F46E5', opacity: 0.9 }}
              >
                — Bartosz "Dolar" Dolczewski, Dolar Systems
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
