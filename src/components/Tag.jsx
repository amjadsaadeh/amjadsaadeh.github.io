import { fonts, colors } from '../theme'

export default function Tag({ children, color = colors.accent }) {
  return (
    <span
      style={{
        fontFamily: fonts.mono,
        fontSize: 11,
        color,
        background: color + '18',
        padding: '3px 10px',
        borderRadius: 4,
        border: `1px solid ${color}33`,
        letterSpacing: 0.5,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
