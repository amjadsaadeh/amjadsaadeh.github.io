import { fonts, colors } from '../theme'
import Navbar from '../components/Navbar'
import BlackHole from '../components/BlackHole'

function NotFoundPage() {
  return (
    <div style={{ background: colors.bg, minHeight: '100vh', color: colors.text }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Navbar />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ paddingTop: 64, paddingBottom: 96 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>
            &gt; cd ./this-page
          </div>
          <h1
            style={{
              fontFamily: fonts.sans,
              fontSize: 36,
              fontWeight: 700,
              color: colors.textStrong,
              margin: '0 0 10px 0',
              lineHeight: 1.15,
            }}
          >
            Not found
          </h1>
          <p
            style={{
              fontFamily: fonts.sans,
              fontSize: 16,
              color: colors.textMuted,
              margin: '0 0 28px 0',
              lineHeight: 1.6,
              maxWidth: 560,
            }}
          >
            You are lost in the void or got everything you were searching for. However, here is no content, just a black hole :)
          </p>
          
          <BlackHole />

          <a
            href="/"
            style={{
              display: 'inline-block',
              fontFamily: fonts.mono,
              fontSize: 13,
              fontWeight: 500,
              color: colors.accentInk,
              background: colors.accentDim,
              border: '1px solid ' + colors.accent + '33',
              borderRadius: 8,
              padding: '10px 18px',
              textDecoration: 'none',
            }}
          >
            &larr; back home
          </a>
        </section>

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

export default NotFoundPage
