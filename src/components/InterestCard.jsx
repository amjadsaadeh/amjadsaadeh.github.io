import { useState } from 'react'
import { fonts, colors } from '../theme'

function InterestCard(props) {
  var [hovered, setHovered] = useState(false)
  var color = props.color || colors.accent

  return (
    <div
      onMouseEnter={function() { setHovered(true) }}
      onMouseLeave={function() { setHovered(false) }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        padding: '20px 16px',
        borderRadius: 10,
        background: hovered ? color + '12' : 'transparent',
        border: '1px solid ' + (hovered ? color + '44' : 'transparent'),
        transition: 'all 0.3s',
        cursor: 'default',
        minWidth: 100,
      }}
    >
      <span style={{ fontSize: 28 }}>{props.icon}</span>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: hovered ? color : colors.textMuted,
          letterSpacing: 0.5,
          textAlign: 'center',
          transition: 'color 0.3s',
        }}
      >
        {props.label}
      </span>
    </div>
  )
}

export default InterestCard
