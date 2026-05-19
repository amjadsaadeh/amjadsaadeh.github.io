/**
 * Build-time sitemap generator.
 *
 * Runs after `vite build` to generate dist/sitemap.xml listing every
 * crawlable route on the site, including blog posts discovered from
 * src/posts/*.md frontmatter.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distPath = path.join(root, 'dist')
const postsPath = path.join(root, 'src', 'posts')

const SITE_URL = 'https://www.saadeh.dev'

function tagToSlug(tag) {
  return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const staticRoutes = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'yearly', priority: '0.5' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
]

function parseFrontmatter(raw) {
  const lines = raw.split('\n')
  if (lines[0].trim() !== '---') return { date: '', tags: [] }
  const closeIndex = lines.findIndex((l, i) => i > 0 && l.trim() === '---')
  if (closeIndex === -1) return { date: '', tags: [] }
  let date = ''
  let tags = []
  for (const line of lines.slice(1, closeIndex)) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim()
    if (key === 'date') date = value
    if (key === 'tags') tags = value.split(',').map(t => t.trim()).filter(Boolean)
  }
  return { date, tags }
}

function collectPosts() {
  if (!fs.existsSync(postsPath)) return []
  return fs
    .readdirSync(postsPath)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsPath, file), 'utf-8')
      const slug = file.replace(/\.md$/, '')
      const { date, tags } = parseFrontmatter(raw)
      return { slug, date, tags }
    })
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [`    <loc>${loc}</loc>`]
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`)
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`)
  if (priority) parts.push(`    <priority>${priority}</priority>`)
  return `  <url>\n${parts.join('\n')}\n  </url>`
}

function generate() {
  const today = new Date().toISOString().slice(0, 10)
  const posts = collectPosts()
  const latestPostDate = posts.reduce((max, p) => (p.date > max ? p.date : max), '')

  const entries = []

  for (const route of staticRoutes) {
    const lastmod = route.path === '/blog' && latestPostDate ? latestPostDate : today
    entries.push(
      urlEntry({
        loc: `${SITE_URL}${route.path}`,
        lastmod,
        changefreq: route.changefreq,
        priority: route.priority,
      })
    )
  }

  for (const post of posts) {
    entries.push(
      urlEntry({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: post.date || today,
        changefreq: 'yearly',
        priority: '0.7',
      })
    )
  }

  const uniqueTags = [...new Set(posts.flatMap(p => p.tags))].sort()
  for (const tag of uniqueTags) {
    entries.push(
      urlEntry({
        loc: `${SITE_URL}/blog/tag/${tagToSlug(tag)}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.6',
      })
    )
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`

  if (!fs.existsSync(distPath)) {
    throw new Error(`dist/ not found at ${distPath} — run vite build first.`)
  }

  const outPath = path.join(distPath, 'sitemap.xml')
  fs.writeFileSync(outPath, xml)
  console.log(`Sitemap generated: dist/sitemap.xml (${staticRoutes.length + posts.length + uniqueTags.length} URLs)`)
}

generate()
