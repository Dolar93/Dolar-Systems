'use client'
import dynamic from 'next/dynamic'
import { RotateCcw, BrainCircuit, ShieldCheck } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/reveal'

const ProfitChart3D = dynamic(
  () => import('@/components/ui/profit-chart-3d').then((m) => m.ProfitChart3D),
  { ssr: false, loading: () => null },
)

const LEGEND = [
  { Icon: BrainCircuit, text: 'Setki połączeń — tak wygląda system po automatyzacji' },
  { Icon: RotateCcw, text: 'Przeciągnij, żeby obrócić sieć' },
  { Icon: ShieldCheck, text: 'Bez zgadywania — konkretna wycena po analizie' },
]

export default function ProfitChart() {
  return (
    <section id="zyski" className="py-28" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-12">
          <SectionLabel number="03" label="POD SPODEM" />
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(34px, 5vw, 46px)', fontWeight: 700, color: '#1A2B47', maxWidth: 560 }}>
            Wygląda prosto.{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Pracuje jak sieć.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: '14px', color: '#8A9AB5', marginTop: '0.75rem', maxWidth: 520 }}>
            Twoja firma widzi jeden dashboard. Pod spodem pracują setki połączonych ze sobą procesów — 24/7, bez przerw na kawę.
          </p>
        </Reveal>

        <div
          style={{
            backgroundColor: '#1A2B47',
            borderRadius: '16px',
            border: '1px solid rgba(201,168,76,0.25)',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(26,43,71,0.25)',
          }}
        >
          <div style={{ height: 440 }}>
            <ProfitChart3D />
          </div>

          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5"
            style={{ borderTop: '1px solid rgba(245,243,239,0.10)' }}
          >
            {LEGEND.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={14} style={{ color: '#C9A84C', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-ibm)', fontSize: '11px', color: 'rgba(245,243,239,0.65)', letterSpacing: '0.02em' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
