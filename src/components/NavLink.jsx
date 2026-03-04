import { useState } from 'react'
import { fonts, colors } from '../theme'

export default function NavLink({ children, href = '#', active = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: fonts.mono,
        fontSize: 13,
        color: active ? colors.accent : hovered ? colors.text : colors.textMuted,
        textDecoration: 'none',
        letterSpacing: 0.5,
        transition: 'color 0.2s',
        position: 'relative',
        padding: '4px 0',
      }}
    >
      {children}
      {(active || hovered) && (
        <div
          style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: 1,
            background: active ? colors.accent : colors.text,
            transition: 'background 0.2s',
          }}
        />
      )}
    </a>
  )
}
