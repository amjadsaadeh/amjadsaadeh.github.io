import { useState } from 'react'
import { fonts, colors } from '../theme'
import Tag from './Tag'

function ProjectCard(props) {
  var tagList = props.tags || []
  var color = props.color || colors.accent
  var [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={function() { setHovered(true) }}
      onMouseLeave={function() { setHovered(false) }}
      style={{
        background: colors.surface,
        border: '1px solid ' + (hovered ? color + '66' : colors.border),
        borderRadius: 10,
        padding: 24,
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 8px 30px ' + color + '15' : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontSize: 11, color: color, marginBottom: 10, letterSpacing: 1 }}>
        {'///'} PROJECT
      </div>
      <h3 style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 700, color: colors.text, margin: '0 0 8px 0' }}>
        {props.title}
      </h3>
      <p style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, lineHeight: 1.6, margin: '0 0 14px 0' }}>
        {props.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tagList.map(function(t, i) {
          return <Tag key={i} color={color}>{t}</Tag>
        })}
      </div>
    </div>
  )
}

export default ProjectCard
