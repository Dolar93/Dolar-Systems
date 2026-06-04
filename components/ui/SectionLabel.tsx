interface SectionLabelProps {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2 mb-6">
      <span
        style={{
          fontFamily: 'var(--font-ibm)',
          fontSize: '10px',
          letterSpacing: '0.22em',
          color: '#A8A29E',
        }}
      >
        {number}
      </span>
      <span
        style={{
          width: 24,
          height: 1,
          display: 'inline-block',
          backgroundColor: '#E7E5E4',
        }}
      />
      <span
        className="text-xs tracking-[0.22em] uppercase px-3 py-1 rounded-full"
        style={{
          fontFamily: 'var(--font-ibm)',
          color: '#4F46E5',
          backgroundColor: 'rgba(79,70,229,0.08)',
          letterSpacing: '0.18em',
          fontSize: '10px',
        }}
      >
        {label}
      </span>
    </div>
  )
}
