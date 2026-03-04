import { fonts, colors } from '../theme'

export default function SectionLabel({ children, color = colors.accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 13,
          color,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}
      >
        {'>'} {children}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, ${color}44, transparent)`,
        }}
      />
    </div>
  )
}
