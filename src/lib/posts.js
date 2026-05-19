import { marked } from 'marked'

export function tagToSlug(tag) {
  return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function parseTags(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map(t => t.trim()).filter(Boolean)
  return value.split(',').map(t => t.trim()).filter(Boolean)
}

function parseFrontmatter(raw) {
  const lines = raw.split('\n')
  if (lines[0].trim() !== '---') return { data: {}, content: raw }

  const closeIndex = lines.findIndex((l, i) => i > 0 && l.trim() === '---')
  if (closeIndex === -1) return { data: {}, content: raw }

  const data = {}
  let lastKey = null
  for (const line of lines.slice(1, closeIndex)) {
    if (line.trim().startsWith('- ') && lastKey) {
      if (!Array.isArray(data[lastKey])) data[lastKey] = []
      data[lastKey].push(line.trim().slice(2).trim())
    } else {
      const colon = line.indexOf(':')
      if (colon === -1) continue
      lastKey = line.slice(0, colon).trim()
      data[lastKey] = line.slice(colon + 1).trim()
    }
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
      tags: parseTags(data.tags),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export const allTags = [...new Set(allPosts.flatMap(p => p.tags))].sort()

export function getPostsByTag(tagSlug) {
  return allPosts.filter(post => post.tags.some(t => tagToSlug(t) === tagSlug))
}

export function getTagLabel(tagSlug) {
  for (const post of allPosts) {
    const match = post.tags.find(t => tagToSlug(t) === tagSlug)
    if (match) return match
  }
  return tagSlug
}

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
    tags: parseTags(data.tags),
    html: marked.parse(content),
  }
}
