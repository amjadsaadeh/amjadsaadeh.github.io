import { fonts, colors } from '../theme'
import Tag from './Tag'

function ExperienceItem(props) {
  var tagList = props.tags || []
  return (
    <div style={{ display: 'flex', gap: 20, padding: '16px 0', borderBottom: '1px solid ' + colors.border }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted, minWidth: 90, paddingTop: 3 }}>
        {props.period}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 2 }}>
          {props.company}
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginBottom: 8 }}>
          {props.role}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tagList.map(function(t, i) {
            return <Tag key={i} color={i % 2 === 0 ? colors.accent : colors.warm}>{t}</Tag>
          })}
        </div>
      </div>
    </div>
  )
}

export default ExperienceItem
