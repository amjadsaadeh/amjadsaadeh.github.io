import { marked } from 'marked'

function parseFrontmatter(raw) {
  const lines = raw.split('\n')
  if (lines[0].trim() !== '---') return { data: {}, content: raw }

  const closeIndex = lines.findIndex((l, i) => i > 0 && l.trim() === '---')
  if (closeIndex === -1) return { data: {}, content: raw }

  const data = {}
  for (const line of lines.slice(1, closeIndex)) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim()
    data[key] = value
  }

  return { data, content: lines.slice(closeIndex + 1).join('\n').trimStart() }
}

const modules = import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' })

export const allPosts = Object.entries(modules)
  .map(([key, raw]) => {
    const slug = key.replace('../posts/', '').replace('.md', '')
    const { data } = parseFrontmatter(raw)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description || '',
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export function getPostBySlug(slug) {
  const key = `../posts/${slug}.md`
  const raw = modules[key]
  if (!raw) return null
  const { data, content } = parseFrontmatter(raw)
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    html: marked.parse(content),
  }
}
