'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

const TEAM = [
  {
    photo: '/bartosz.png',
    name: 'Bartosz "Dolar" Dolczewski',
    role: 'Założyciel',
    bio: 'Buduję systemy, które przejmują powtarzalną pracę — żebyś Ty mógł zająć się prowadzeniem firmy, nie pilnowaniem tabelek.',
    accentBg:    '#F3EAD4',
    accentBgRgb: '243,234,212',
    accentDark:  '#1A2B47',
    darkRgb:     '26,43,71',
  },
]

/* ── Team card — dissolving edges on hover, no fold ───────────── */
function TeamCard({ member, index }: { member: typeof TEAM[number]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Reveal delay={index * 0.15}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.01 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          /* Border fades to transparent, shadow dissolves to soft glow */
          border: hovered
            ? '1px solid transparent'
            : '1px solid rgba(0,0,0,0.07)',
          backgroundColor: hovered
            ? `rgba(${member.accentBgRgb},0.38)`
            : member.accentBg,
          boxShadow: hovered
            ? `0 28px 56px rgba(${member.darkRgb},0.16), 0 8px 20px rgba(${member.darkRgb},0.08)`
            : '2px 2px 0px rgba(0,0,0,0.06), 4px 4px 0px rgba(0,0,0,0.04), 8px 8px 16px rgba(0,0,0,0.08)',
          transition: 'border-color 0.45s ease, background-color 0.45s ease, box-shadow 0.45s ease',
        }}
      >
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
                /* Photo edges soften on hover matching card */
                transition: 'opacity 0.45s ease',
                opacity: hovered ? 0.92 : 1,
              }}
            />
            {/* Bottom gradient blends photo into card colour */}
            <div
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '55%',
                background: `linear-gradient(to bottom, transparent, ${member.accentBg}E0)`,
                transition: 'background 0.45s ease',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col p-6 flex-1">
            <div className="mb-4">
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '22px', fontWeight: 700, color: member.accentDark, lineHeight: 1.2, marginBottom: 4 }}>
                {member.name}
              </div>
              <div style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: member.accentDark, opacity: 0.65, letterSpacing: '0.08em' }}>
                {member.role}
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: member.accentDark, lineHeight: 1.75, opacity: 0.88, flex: 1 }}>
              {member.bio}
            </p>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

export default function AboutUs() {
  return (
    <section id="zespol" className="py-28" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="05" label="ZAŁOŻYCIEL" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A2B47', maxWidth: 600 }}>
            Nie sprzedajemy narzędzi.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Wdrażamy systemy które działają.</span>
          </h2>
        </Reveal>

        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
