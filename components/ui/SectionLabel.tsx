interface SectionLabelProps {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center mb-8">
      <span
        className="text-xs tracking-[0.35em] uppercase px-4 py-1.5 border"
        style={{
          fontFamily: 'var(--font-space-mono)',
          color: '#00D4FF',
          borderColor: 'rgba(0, 212, 255, 0.35)',
          backgroundColor: 'rgba(0, 212, 255, 0.04)',
          letterSpacing: '0.3em',
        }}
      >
        [ {number} // {label} ]
      </span>
    </div>
  )
}
