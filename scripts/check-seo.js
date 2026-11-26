/**
 * Post-build regression check.
 *
 * For every <loc> in dist/sitemap.xml, opens the built HTML file and asserts
 *   canonical == og:url == sitemap URL
 * and that no non-root page canonicalizes to the homepage.
 * Also checks that dist/404.html carries no canonical / og:url.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SITE_URL } from './site.js'

const distPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const errors = []

const sitemap = fs.readFileSync(path.join(distPath, 'sitemap.xml'), 'utf-8')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (locs.length === 0) errors.push('sitemap.xml contains no URLs')

const tag = (html, re) => html.match(re)?.[1]
const unescape = (s) => s?.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&amp;/g, '&')

for (const loc of locs) {
  const rel = loc.startsWith(SITE_URL) ? loc.slice(SITE_URL.length) : null
  if (rel === null) {
    // Explicit front-matter canonical override pointing elsewhere: not checkable by path.
    errors.push(`${loc}: sitemap URL is not on ${SITE_URL}`)
    continue
  }
  const file = path.join(distPath, rel, 'index.html')
  if (!fs.existsSync(file)) {
    errors.push(`${loc}: built file missing (${path.relative(distPath, file)})`)
    continue
  }
  const html = fs.readFileSync(file, 'utf-8')
  const canonical = unescape(tag(html, /<link rel="canonical" href="([^"]*)"/))
  const ogUrl = unescape(tag(html, /<meta property="og:url" content="([^"]*)"/))
  if (!canonical) errors.push(`${loc}: no canonical`)
  if (!ogUrl) errors.push(`${loc}: no og:url`)
  if (canonical !== loc) errors.push(`${loc}: canonical is ${canonical}`)
  if (ogUrl !== loc) errors.push(`${loc}: og:url is ${ogUrl}`)
  if (rel !== '/' && canonical === `${SITE_URL}/`) errors.push(`${loc}: canonical points to the homepage`)
}

const notFound = path.join(distPath, '404.html')
if (fs.existsSync(notFound)) {
  const html = fs.readFileSync(notFound, 'utf-8')
  if (/rel="canonical"/.test(html) || /og:url/.test(html)) errors.push('404.html must not have canonical/og:url')
}

if (errors.length) {
  console.error(`SEO check failed (${errors.length}):\n  - ${errors.join('\n  - ')}`)
  process.exit(1)
}
console.log(`SEO check passed: ${locs.length} sitemap URLs, canonical == og:url == sitemap URL.`)
