/**
 * Shared URL rules for prerender, sitemap and the SEO check.
 *
 * Canonical form (GitHub Pages serves dist/<route>/index.html and 301s the
 * slash-less URL to the slash form, so the slash form is the only 200 URL):
 *   https://www.saadeh.dev/            (root)
 *   https://www.saadeh.dev/about/      (every other page, trailing slash)
 * No .html, no query string, no fragment, lowercase host.
 */
export const SITE_URL = 'https://www.saadeh.dev'

export function canonicalFor(routePath) {
  let p = routePath.split('#')[0].split('?')[0]
  p = p.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
  if (!p.startsWith('/')) p = '/' + p
  p = p.replace(/\/+/g, '/')
  if (!p.endsWith('/')) p += '/'
  return SITE_URL + p
}
