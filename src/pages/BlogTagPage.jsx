import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { colors, fonts } from '../theme'
import FadeIn from '../components/FadeIn'
import Navbar from '../components/Navbar'
import { getPostsByTag, getTagLabel, tagToSlug } from '../lib/posts'

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

function PostCard({ post }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? colors.surfaceLight : colors.surface,
        border: '1px solid ' + (hovered ? colors.accent + '66' : colors.border),
        borderRadius: 8,
        padding: '20px 24px',
        marginBottom: 16,
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.textMuted,
          marginBottom: 8,
        }}
      >
        {post.date}
      </div>

      <a
        href={`/blog/${post.slug}`}
        style={{
          fontFamily: fonts.sans,
          fontSize: 18,
          fontWeight: 600,
          color: hovered ? colors.accent : colors.textStrong,
          textDecoration: 'none',
          display: 'block',
          marginBottom: 8,
          transition: 'color 0.2s',
        }}
      >
        {post.title}
      </a>

      {post.description && (
        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.65,
            margin: '0 0 12px',
          }}
        >
          {post.description}
        </p>
      )}

      {post.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {post.tags.map(tag => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
      )}

      <a
        href={`/blog/${post.slug}`}
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.accent,
          textDecoration: 'none',
        }}
      >
        read more →
      </a>
    </div>
  )
}

function BlogTagPage() {
  const { tag } = useParams()
  const posts = getPostsByTag(tag)
  const label = getTagLabel(tag)

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', color: colors.text }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Navbar activePage="blog" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <FadeIn>
          <section style={{ paddingTop: 64, paddingBottom: 48 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>
              &gt; cat blog/tag/{tag}
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
              {label}
            </h1>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                color: colors.textMuted,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {posts.length === 0
                ? 'No posts found for this tag.'
                : `${posts.length} post${posts.length === 1 ? '' : 's'} tagged with this topic.`}
            </p>
          </section>
        </FadeIn>

        <div style={{ paddingBottom: 48 }}>
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 60}>
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <a
            href="/blog"
            style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.accent, textDecoration: 'none' }}
          >
            ← all posts
          </a>
        </div>

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

export default BlogTagPage
