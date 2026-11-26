/**
 * Build-time pre-render script.
 *
 * Runs after `vite build` to generate static HTML for each route.
 * The rendered HTML is injected into the <!--ssr-outlet--> placeholder
 * in dist/index.html, producing fully-populated pages for search crawlers.
 *
 * Routes rendered:
 *   /       → dist/index.html
 *   /about  → dist/about/index.html
 */

import { build } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { canonicalFor } from './site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distPath = path.join(root, 'dist')
const serverOutDir = path.join(distPath, '_server')

const DEFAULT_TITLE = 'Amjad Saadeh — saadeh.dev'

const routes = [
  { url: '/', outFile: 'index.html' },
  {
    url: '/about', outFile: 'about/index.html',
    title: 'About — saadeh.dev',
    description: 'About Amjad Saadeh — software engineer in Berlin working on image processing, video systems and AI.',
  },
  {
    url: '/projects', outFile: 'projects/index.html',
    title: 'Projects — saadeh.dev',
    description: 'Projects by Amjad Saadeh: the doorbell detector, pyMUSIC and more.',
  },
  {
    url: '/contact', outFile: 'contact/index.html',
    title: 'Contact — saadeh.dev',
    description: 'Get in touch with Amjad Saadeh.',
  },
]

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Replace one tag in the template; fail loudly if the template changed.
function swap(html, re, replacement) {
  if (!re.test(html)) throw new Error(`Template is missing a tag matching ${re}`)
  return html.replace(re, () => replacement)
}

// Fill per-route head tags (title, description, canonical, og:*, twitter:*).
function applyHead(template, { url, title, description, canonical, ogType }) {
  let html = template
  const canon = canonical || canonicalFor(url)
  html = swap(html, /<!--seo-canonical-->/, `<link rel="canonical" href="${canon}" />`)
  html = swap(html, /<!--seo-og-url-->/, `<meta property="og:url" content="${canon}" />`)
  if (title) {
    const t = escAttr(title)
    html = swap(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`)
    html = swap(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    html = swap(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
  }
  if (description) {
    const d = escAttr(description)
    html = swap(html, /(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    html = swap(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    html = swap(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
  }
  if (ogType) html = swap(html, /(<meta property="og:type" content=")[^"]*(")/, `$1${ogType}$2`)
  return html
}

async function prerender() {
  // 1. Build the SSR bundle
  console.log('Building SSR bundle...')
  await build({
    root,
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: serverOutDir,
      emptyOutDir: true,
    },
  })

  // 2. Import the render function and post/tag lists from the SSR bundle
  const { render, allPosts, allTags, tagToSlug } = await import(
    pathToFileURL(path.join(serverOutDir, 'entry-server.js')).href
  )

  // 2a. Append blog routes dynamically from the post and tag lists
  routes.push({
    url: '/blog', outFile: 'blog/index.html',
    title: 'Blog — saadeh.dev',
    description: 'Posts by Amjad Saadeh about machine learning, smart home projects and software engineering.',
  })
  for (const post of allPosts) {
    routes.push({
      url: `/blog/${post.slug}`,
      outFile: `blog/${post.slug}/index.html`,
      title: `${post.title} — saadeh.dev`,
      description: post.description || undefined,
      canonical: post.canonical || undefined,
      ogType: 'article',
    })
  }
  for (const tag of allTags) {
    const slug = tagToSlug(tag)
    routes.push({
      url: `/blog/tag/${slug}`,
      outFile: `blog/tag/${slug}/index.html`,
      title: `Posts tagged "${tag}" — saadeh.dev`,
    })
  }

  // 3. Read Vite's HTML template (already has asset hashes injected)
  const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8')

  // 4. Render each route and write the output file
  for (const route of routes) {
    const { url, outFile } = route
    const appHtml = render(url)
    const html = applyHead(template, route).replace('<!--ssr-outlet-->', appHtml)
    const outPath = path.join(distPath, outFile)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, html)
    console.log(`Pre-rendered: ${url}  →  dist/${outFile}`)
  }

  // 4a. GitHub Pages serves dist/404.html (with a 404 status) for unknown paths.
  // The client router hydrates at the real URL and the catch-all route matches.
  // No canonical / og:url here: a 404 page must not claim to be any real URL.
  const notFoundHtml = template
    .replace('<!--seo-canonical-->', '')
    .replace('<!--seo-og-url-->', '')
    .replace('<!--ssr-outlet-->', render('/404'))
    .replace(`<title>${DEFAULT_TITLE}</title>`, '<title>Page not found — saadeh.dev</title>')
    .replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>')
  fs.writeFileSync(path.join(distPath, '404.html'), notFoundHtml)
  console.log('Pre-rendered: 404  →  dist/404.html')

  // 5. Remove the server bundle (not needed at runtime)
  fs.rmSync(serverOutDir, { recursive: true, force: true })

  console.log('Pre-rendering complete.')
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
