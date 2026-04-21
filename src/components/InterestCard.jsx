import { useState } from 'react'
import { fonts, colors } from '../theme'

function IconAIAgents({ color, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="3" stroke={color} strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="1" fill={color}/>
      <circle cx="14" cy="4" r="1.8" stroke={color} strokeWidth="1.2" opacity="0.7"/>
      <circle cx="23" cy="9.5" r="1.8" stroke={color} strokeWidth="1.2" opacity="0.7"/>
      <circle cx="23" cy="18.5" r="1.8" stroke={color} strokeWidth="1.2" opacity="0.5"/>
      <circle cx="14" cy="24" r="1.8" stroke={color} strokeWidth="1.2" opacity="0.5"/>
      <circle cx="5" cy="18.5" r="1.8" stroke={color} strokeWidth="1.2" opacity="0.7"/>
      <circle cx="5" cy="9.5" r="1.8" stroke={color} strokeWidth="1.2" opacity="0.9"/>
      <line x1="14" y1="5.8" x2="14" y2="11" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <line x1="21.5" y1="10.7" x2="16.5" y2="12.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <line x1="21.5" y1="17.3" x2="16.5" y2="15.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="14" y1="22.2" x2="14" y2="17" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="6.5" y1="17.3" x2="11.5" y2="15.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <line x1="6.5" y1="10.7" x2="11.5" y2="12.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.8"/>
    </svg>
  )
}

function IconImageProcessing({ color, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="4" y="6" width="20" height="16" rx="1" stroke={color} strokeWidth="1.5"/>
      <path d="M4 18l6-6 4 4 3-3 7 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <line x1="7" y1="22" x2="7" y2="20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <line x1="10" y1="22" x2="10" y2="19" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <line x1="13" y1="22" x2="13" y2="20.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <line x1="16" y1="22" x2="16" y2="19" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <line x1="19" y1="22" x2="19" y2="20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <line x1="22" y1="22" x2="22" y2="21" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <circle cx="20" cy="10" r="2" stroke={color} strokeWidth="1.2" opacity="0.5"/>
    </svg>
  )
}

function IconComputerVision({ color, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M3 14c0 0 4-7 11-7s11 7 11 7-4 7-11 7S3 14 3 14z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14" cy="14" r="3.5" stroke={color} strokeWidth="1.2"/>
      <circle cx="14" cy="14" r="1.2" fill={color}/>
      <path d="M7 8v-2h2" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M19 6h2v2" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M7 20v2h2" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M19 22h2v-2" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  )
}

function IconSmartHome({ color, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M5 13.5L14 5l9 8.5V24H5V13.5z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="11" y="18" width="6" height="6" rx="0.5" stroke={color} strokeWidth="1.2"/>
      <path d="M10 11.5a5.5 5.5 0 0 1 8 0" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <path d="M12 9.5a2.5 2.5 0 0 1 4 0" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
      <circle cx="14" cy="8.5" r="0.8" fill={color} opacity="0.8"/>
    </svg>
  )
}

function IconEmbeddedAI({ color, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="8" y="8" width="12" height="12" stroke={color} strokeWidth="1.5"/>
      <rect x="11" y="11" width="6" height="6" stroke={color} strokeWidth="0.8" opacity="0.4"/>
      <line x1="11" y1="8" x2="11" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="14" y1="8" x2="14" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="17" y1="8" x2="17" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="11" y1="20" x2="11" y2="23" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="14" y1="20" x2="14" y2="23" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="17" y1="20" x2="17" y2="23" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="8" y1="11" x2="5" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="8" y1="17" x2="5" y2="17" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="20" y1="11" x2="23" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="20" y1="17" x2="23" y2="17" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="14" cy="14" r="1.5" fill={color}/>
    </svg>
  )
}

const ICON_MAP = {
  'AI & Agents':      IconAIAgents,
  'Image Processing': IconImageProcessing,
  'Computer Vision':  IconComputerVision,
  'Smart Home':       IconSmartHome,
  'Embedded AI':      IconEmbeddedAI,
}

function InterestCard({ label, color: colorProp, desc }) {
  const [hovered, setHovered] = useState(false)
  const color = colorProp || colors.accent
  const IconComponent = ICON_MAP[label] || null

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: '16px 18px',
        borderRadius: 10,
        background: hovered ? colors.surfaceLight : colors.surface,
        border: '1px solid ' + (hovered ? color + '44' : colors.border),
        borderTop: '1px solid ' + (hovered ? color + '88' : colors.border),
        transition: 'all 0.25s',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: -30, right: -30,
        width: 80, height: 80,
        borderRadius: '50%',
        background: color,
        opacity: hovered ? 0.07 : 0,
        filter: 'blur(40px)',
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      {IconComponent && (
        <div style={{ flexShrink: 0, marginTop: 1 }}>
          <IconComponent color={hovered ? color : colors.textMuted} size={22} />
        </div>
      )}

      <div>
        <div style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: '0.08em',
          color: hovered ? color : colors.text,
          marginBottom: 4,
          transition: 'color 0.25s',
        }}>
          {label}
        </div>
        {desc && (
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 11.5,
            color: colors.textMuted,
            lineHeight: 1.5,
          }}>
            {desc}
          </div>
        )}
      </div>
    </div>
  )
}

export default InterestCard
