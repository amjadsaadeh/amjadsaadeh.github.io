import { useParams, Link } from 'react-router-dom'
import { colors, fonts } from '../theme'
import FadeIn from '../components/FadeIn'
import Navbar from '../components/Navbar'
import { getPostBySlug, tagToSlug } from '../lib/posts'

function TagPill({ label }) {
  return (
    <Link
      to={`/blog/tag/${tagToSlug(label)}`}
      style={{
        fontFamily: fonts.mono,
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: colors.accent,
        border: '1px solid ' + colors.accent + '44',
        borderRadius: 3,
        padding: '2px 6px',
        textDecoration: 'none',
      }}
    >
      {label}
    </Link>
  )
}

function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', color: colors.text }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Navbar activePage="blog" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {!post ? (
          <FadeIn>
            <section style={{ paddingTop: 64, paddingBottom: 48 }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.textMuted, marginBottom: 16 }}>
                Post not found.
              </p>
              <a
                href="/blog"
                style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.accent, textDecoration: 'none' }}
              >
                ← back to writing
              </a>
            </section>
          </FadeIn>
        ) : (
          <>
            <FadeIn>
              <section style={{ paddingTop: 64, paddingBottom: 32 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted, marginBottom: 12 }}>
                  &gt; cat blog/{slug}
                </div>

                {post.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {post.tags.map(tag => (
                      <TagPill key={tag} label={tag} />
                    ))}
                  </div>
                )}

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
                  {post.title}
                </h1>

                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.textMuted, marginBottom: 10 }}>
                  {post.date}
                </div>

                {post.description && (
                  <p
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: 16,
                      color: colors.textMuted,
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {post.description}
                  </p>
                )}
              </section>
            </FadeIn>

            <FadeIn delay={80}>
              <div style={{ maxWidth: 720, paddingBottom: 64 }}>
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>
            </FadeIn>

            <div style={{ marginBottom: 32 }}>
              <a
                href="/blog"
                style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.accent, textDecoration: 'none' }}
              >
                ← back to writing
              </a>
            </div>
          </>
        )}

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

export default BlogPostPage
