interface SectionLabelProps {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <span
        style={{
          fontFamily: 'var(--font-ibm)',
          fontSize: '10px',
          color: '#8A9AB5',
          letterSpacing: '0.15em',
        }}
      >
        {number}
      </span>
      <span style={{ width: 20, height: 1, backgroundColor: 'rgba(26,43,71,0.2)', display: 'inline-block' }} />
      <span
        style={{
          fontFamily: 'var(--font-ibm)',
          fontSize: '10px',
          color: '#8A9AB5',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}
