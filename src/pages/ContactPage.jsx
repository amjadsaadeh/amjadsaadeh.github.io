import { fonts, colors } from '../theme'
import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'
import NavLink from '../components/NavLink'
import { Link } from 'react-router-dom'

const contactChannels = [
  {
    label: 'Email',
    handle: 'amjad@saadeh.dev',
    href: 'mailto:amjad@saadeh.dev',
    description: 'Best for thoughtful questions, collaboration proposals, or anything that deserves a proper reply.',
    color: colors.accent,
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/amjad-saadeh',
    href: 'https://www.linkedin.com/in/amjad-saadeh',
    description: 'Good for professional enquiries, networking, or if you want to see my full work history.',
    color: colors.warm,
  },
  {
    label: 'GitHub',
    handle: 'github.com/amjadsaadeh',
    href: 'https://github.com/amjadsaadeh',
    description: 'Check out what I am building, open an issue, or just browse the code.',
    color: colors.green,
  },
]

function ChannelCard({ label, handle, href, description, color }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      style={{
        display: 'block',
        background: colors.surface,
        border: '1px solid ' + colors.border,
        borderRadius: 10,
        padding: '20px 24px',
        textDecoration: 'none',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={function(e) {
        e.currentTarget.style.borderColor = color + '55'
        e.currentTarget.style.background = colors.surfaceLight
      }}
      onMouseLeave={function(e) {
        e.currentTarget.style.borderColor = colors.border
        e.currentTarget.style.background = colors.surface
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 600, color: color }}>
          {label}
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.textMuted }}>
          {handle}
        </span>
      </div>
      <p style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted, margin: 0, lineHeight: 1.65 }}>
        {description}
      </p>
    </a>
  )
}

function ContactPage() {
  return (
    <div style={{ background: colors.bg, minHeight: '100vh', color: colors.text }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Navigation */}
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
          <Link
            to="/"
            style={{
              fontFamily: fonts.mono,
              fontSize: 15,
              fontWeight: 600,
              color: colors.accent,
              textDecoration: 'none',
            }}
          >
            saadeh<span style={{ color: colors.textMuted }}>.dev</span>
          </Link>
          <div style={{ display: 'flex', gap: 24 }}>
            <NavLink href="/">home</NavLink>
            <NavLink href="/about">about</NavLink>
            <NavLink href="/#projects">projects</NavLink>
            <NavLink href="/contact" active>contact</NavLink>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* Page header */}
        <FadeIn>
          <section style={{ paddingTop: 64, paddingBottom: 48 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>
              &gt; cat contact.md
            </div>
            <h1
              style={{
                fontFamily: fonts.sans,
                fontSize: 36,
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 10px 0',
                lineHeight: 1.15,
              }}
            >
              Get in touch
            </h1>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                color: colors.textMuted,
                margin: 0,
                lineHeight: 1.6,
                maxWidth: 560,
              }}
            >
              I am happy to hear from you - whether it is about Computer Vision, AI, tinkering software systems,
              or just a hello. Pick whichever channel works best for you.
            </p>
          </section>
        </FadeIn>

        {/* Channel cards */}
        <FadeIn delay={80}>
          <section style={{ marginBottom: 64 }}>
            <SectionLabel color={colors.warm}>reach me at</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactChannels.map(function(ch) {
                return (
                  <ChannelCard
                    key={ch.label}
                    label={ch.label}
                    handle={ch.handle}
                    href={ch.href}
                    description={ch.description}
                    color={ch.color}
                  />
                )
              })}
            </div>
          </section>
        </FadeIn>

        {/* Response time note */}
        <FadeIn delay={160}>
          <div
            style={{
              background: colors.accentDim,
              border: '1px solid ' + colors.accent + '22',
              borderRadius: 8,
              padding: '12px 18px',
              marginBottom: 80,
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.textMuted,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ color: colors.accent }}>note:</span>
            I typically respond within a few days. For time-sensitive matters, email is the most reliable.
          </div>
        </FadeIn>

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid ' + colors.border,
            padding: '20px 0 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.textMuted }}>
            &copy; {new Date().getFullYear()} Amjad Saadeh
          </span>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.textMuted }}>
            progress, not perfection
          </span>
        </footer>
      </div>
    </div>
  )
}

export default ContactPage
