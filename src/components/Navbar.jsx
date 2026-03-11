import { fonts, colors } from '../theme'
import NavLink from './NavLink'

function Navbar({ activePage }) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: colors.bg + 'ee',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid ' + colors.border,
        padding: '0 24px',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 600, color: colors.accent }}>
          saadeh<span style={{ color: colors.textMuted }}>.dev</span>
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          <NavLink href="/" active={activePage === 'home'}>home</NavLink>
          <NavLink href="/about" active={activePage === 'about'}>about</NavLink>
          <NavLink href="/projects" active={activePage === 'projects'}>projects</NavLink>
          <NavLink href="/contact" active={activePage === 'contact'}>contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
