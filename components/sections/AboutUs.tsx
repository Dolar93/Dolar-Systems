'use client'
import SectionLabel from '@/components/ui/SectionLabel'
import StonePlate from '@/components/ui/StonePlate'
import { Reveal } from '@/components/animations/reveal'
import { STONE, FONT, CARVED, grout } from '@/components/ui/stone'

const TEAM = [
  {
    photo: '/bartosz.png',
    name: 'Bartosz "Dolar" Dolczewski',
    role: 'Założyciel',
    bio: 'Buduję systemy, które przejmują powtarzalną pracę — żebyś Ty mógł zająć się prowadzeniem firmy, nie pilnowaniem tabelek.',
  },
]

function TeamCard({ member }: { member: typeof TEAM[number] }) {
  return (
    <StonePlate tone="light" accent={STONE.moss} style={{ overflow: 'hidden' }}>
      <div className="flex flex-col sm:flex-row">
        {/* Zdjęcie osadzone jak płyta w bruku */}
        <div className="relative flex-shrink-0" style={{ width: '100%', maxWidth: 210, aspectRatio: '3/4' }}>
          <img
            src={member.photo}
            alt={member.name}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top', display: 'block',
            }}
          />
          {/* Dół zdjęcia wtapia się w kamień płyty */}
          <div
            aria-hidden
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
              background: `linear-gradient(to bottom, transparent, ${STONE.light}F0)`,
              pointerEvents: 'none',
            }}
          />
          <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 2, backgroundColor: 'rgba(51,71,28,0.22)' }} />
        </div>

        <div className="flex flex-col p-7 flex-1">
          <div className="mb-4">
            <div className="carved" style={{ ...CARVED, fontSize: '20px', color: STONE.ink, lineHeight: 1.2, marginBottom: 8 }}>
              {member.name}
            </div>
            <span style={{
              fontFamily: FONT.mono, fontSize: '9.5px', color: STONE.moss,
              letterSpacing: '0.16em', border: `1px solid ${STONE.moss}55`, padding: '3px 8px',
            }}>
              {member.role.toUpperCase()}
            </span>
          </div>

          <p style={{ fontFamily: FONT.body, fontSize: '15px', color: STONE.inkSoft, lineHeight: 1.8, flex: 1 }}>
            {member.bio}
          </p>
        </div>
      </div>
    </StonePlate>
  )
}

export default function AboutUs() {
  return (
    <section id="zespol" className="relative py-28 overflow-hidden" style={{ backgroundColor: STONE.travertine, ...grout(84, 0.16) }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel number="04" label="ZAŁOŻYCIEL" />
          <h2 className="carved" style={{ ...CARVED, fontSize: 'clamp(21px, 3.1vw, 32px)', color: STONE.ink, maxWidth: 820, lineHeight: 1.2 }}>
            Nie sprzedajemy narzędzi.{' '}
            <span style={{ color: STONE.moss }}>Wdrażamy systemy, które działają.</span>
          </h2>
        </Reveal>

        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            {TEAM.map((member) => (
              <Reveal key={member.name}><TeamCard member={member} /></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
