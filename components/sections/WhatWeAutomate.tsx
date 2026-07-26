'use client'
import { motion } from 'framer-motion'
import { ClipboardCheck, CalendarCheck, Workflow, ArrowRight, Check } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import StonePlate from '@/components/ui/StonePlate'
import { Reveal } from '@/components/animations/reveal'
import { STONE, FONT, CARVED, grout } from '@/components/ui/stone'

/* ── Akcenty w obrębie jednego materiału ───────────────────────────
   Mech dla flagowca, woda dla rezerwacji, łupek dla automatyzacji.
   Wersje `check` są przyciemnione tak, żeby ptaszki same z siebie
   trzymały 3:1 na jasnym kamieniu. */
const ACCENTS = {
  rentcore:      { c: STONE.moss,      check: '#41581F' },
  bookcore:      { c: '#4E6577',       check: '#3E5364' },
  automatyzacje: { c: STONE.slateSoft, check: '#3A404C' },
}

/* Etykieta niesie realny stan oferty, nie dekoracyjny numer 01/02/03 */
const SERVICES = [
  {
    id: 'rentcore' as const,
    status: 'WDROŻENIE W TOKU',
    Icon: ClipboardCheck,
    product: 'RentCore',
    name: 'System dla wypożyczalni sprzętu',
    hook: 'Klient mówi, że rysa już tam była. Nie masz jak udowodnić, że nie.',
    points: [
      'Protokół wydania i zwrotu ze zdjęciami i podpisem — koniec sporów bez dowodu',
      'Podgląd całej sieci oddziałów z jednego miejsca',
      'Decyzje na danych: który sprzęt się zwraca, który oddział przoduje',
    ],
    variant: 'flagship' as const,
    gridClass: 'col-span-1 lg:col-span-12',
  },
  {
    id: 'bookcore' as const,
    status: 'PRODUKT WŁASNY',
    Icon: CalendarCheck,
    product: 'BookCore',
    name: 'Rezerwacje dla usług premium',
    hook: 'Recepcja cały wieczór odpisuje na „a może we wtorek o 15", zamiast obsługiwać klientów na miejscu.',
    points: [
      'Klient umawia wizytę w naturalnej rozmowie z agentem AI — bez apki, bez telefonu',
      'Kalendarz wypełnia się sam, zero podwójnych rezerwacji',
      'Dopasowane do klinik i salonów premium — dyskretnie, bez kompromisów na jakości',
    ],
    variant: 'standard' as const,
    gridClass: 'col-span-1 lg:col-span-6',
  },
  {
    id: 'automatyzacje' as const,
    status: 'NA ZAMÓWIENIE',
    Icon: Workflow,
    product: '',
    name: 'Automatyzacje procesów',
    hook: 'Ile godzin tygodniowo zjada Wam Excel, kopiuj-wklej i ręczne raportowanie?',
    points: [
      'Łączymy systemy, które dotąd ze sobą nie gadały',
      'Przejmujemy powtarzalne zadania — dokumenty, komunikację, raporty',
      'Zespół wraca do pracy, która faktycznie się liczy',
    ],
    variant: 'standard' as const,
    gridClass: 'col-span-1 lg:col-span-6',
  },
] as const

type Service = (typeof SERVICES)[number]

/* ── Lista dowodów ─────────────────────────────────────────────── */
function Points({ points, accent, size }: { points: readonly string[]; accent: string; size: number }) {
  return (
    <div className="flex flex-col gap-2.5 flex-1">
      {points.map((point) => (
        <div key={point} className="flex items-start gap-2.5">
          <Check size={16} style={{ color: accent, flexShrink: 0, marginTop: 3 }} aria-hidden />
          <span style={{ fontFamily: FONT.body, fontSize: `${size}px`, color: STONE.inkSoft, lineHeight: 1.6 }}>
            {point}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── CTA ───────────────────────────────────────────────────────── */
function Cta({ accent, hovered, label }: { accent: string; hovered: boolean; label: string }) {
  return (
    <a
      href="#kontakt"
      className="inline-flex items-center gap-1.5 self-start transition-opacity duration-200"
      style={{
        fontFamily: FONT.mono,
        fontSize: '11px',
        fontWeight: 600,
        color: accent,
        opacity: hovered ? 1 : 0.8,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
    >
      Zapytaj o wdrożenie
      <ArrowRight size={11} aria-hidden />
    </a>
  )
}

/* ── Karta systemu ─────────────────────────────────────────────── */
function Card({ item }: { item: Service }) {
  const { Icon } = item
  const accent = ACCENTS[item.id]
  const flagship = item.variant === 'flagship'

  /* Nagłówek trzyma się lewej — ikona, nazwa produktu, stan wdrożenia */
  const header = (
    <div className="flex items-center gap-3.5">
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: flagship ? 52 : 46,
          height: flagship ? 52 : 46,
          backgroundColor: `${accent.c}1F`,
          border: `1px solid ${accent.c}44`,
        }}
      >
        <Icon size={flagship ? 24 : 20} style={{ color: accent.c }} aria-hidden />
      </div>
      <div className="flex flex-col items-start gap-1.5 min-w-0">
        {item.product && (
          <span
            className="carved"
            style={{ ...CARVED, fontSize: flagship ? '21px' : '18px', color: STONE.ink, lineHeight: 1 }}
          >
            {item.product}
          </span>
        )}
        <span
          style={{
            fontFamily: FONT.mono, fontSize: '9.5px', color: accent.c,
            letterSpacing: '0.16em', border: `1px solid ${accent.c}55`,
            padding: '3px 8px', whiteSpace: 'nowrap',
          }}
        >
          {item.status}
        </span>
      </div>
    </div>
  )

  const title = (
    <h3
      className="carved"
      style={{ ...CARVED, fontSize: flagship ? '25px' : '19px', color: STONE.ink, lineHeight: 1.15 }}
    >
      {item.name}
    </h3>
  )

  /* Ból klienta jego własnymi słowami */
  const hook = (
    <p style={{
      fontFamily: FONT.body,
      fontSize: flagship ? '16px' : '15px',
      fontStyle: 'italic',
      color: accent.c,
      lineHeight: 1.6,
      marginTop: '-4px',
    }}>
      {item.hook}
    </p>
  )

  return (
    <motion.div
      className={item.gridClass}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <StonePlate
        accent={accent.c}
        tone="light"
        style={{ padding: flagship ? '30px' : '24px' }}
        onClick={() => { window.location.hash = 'kontakt' }}
      >
        {(hovered) =>
          flagship ? (
            /* Flagowiec jako baner: oferta po lewej, dowody po prawej,
               rozdzielone włosową fugą. Na mobile CTA zostaje na końcu. */
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row lg:items-stretch gap-7 lg:gap-10">
                <div className="flex flex-col gap-4 lg:w-[44%]">
                  {header}
                  {title}
                  {hook}
                  <div className="hidden lg:flex lg:flex-col lg:flex-1 lg:justify-end">
                    <Cta accent={accent.c} hovered={hovered} label="Zapytaj o wdrożenie systemu RentCore" />
                  </div>
                </div>
                <div
                  className="flex border-t lg:border-t-0 lg:border-l pt-6 lg:pt-1 lg:pl-10"
                  style={{ borderColor: 'rgba(51,71,28,0.20)' }}
                >
                  <Points points={item.points} accent={accent.check} size={15} />
                </div>
              </div>
              <div className="flex lg:hidden mt-6">
                <Cta accent={accent.c} hovered={hovered} label="Zapytaj o wdrożenie systemu RentCore" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 h-full">
              {header}
              {title}
              {hook}
              <Points points={item.points} accent={accent.check} size={14} />
              <Cta accent={accent.c} hovered={hovered} label={`Zapytaj o wdrożenie: ${item.name}`} />
            </div>
          )
        }
      </StonePlate>
    </motion.div>
  )
}

/* ── Sekcja ──────────────────────────────────────────────────────── */
export default function WhatWeAutomate() {
  return (
    <section
      id="zakres"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: STONE.travertine, ...grout(84, 0.16) }}
    >
      <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>
        <Reveal className="mb-3">
          <SectionLabel number="02" label="CO BUDUJEMY" />
          <h2
            className="carved"
            style={{ ...CARVED, fontSize: 'clamp(21px, 3.1vw, 32px)', color: STONE.ink, maxWidth: 840, lineHeight: 1.2 }}
          >
            Budujemy systemy pod jedną branżę{' '}
            <span style={{ color: STONE.moss }}>i pokazujemy je, zanim zdecydujesz o wdrożeniu.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mb-12">
          <p style={{ fontFamily: FONT.body, fontSize: '16px', color: STONE.inkSoft, maxWidth: 640, lineHeight: 1.75, marginTop: 14 }}>
            RentCore i BookCore to nasze własne produkty — działające systemy, które możemy Wam pokazać
            na spotkaniu. Automatyzacje budujemy wokół procesu, który już u Was działa.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {SERVICES.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
