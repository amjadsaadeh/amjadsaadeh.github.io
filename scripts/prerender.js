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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distPath = path.join(root, 'dist')
const serverOutDir = path.join(distPath, '_server')

const routes = [
  { url: '/', outFile: 'index.html' },
  { url: '/about', outFile: 'about/index.html' },
]

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

  // 2. Import the render function from the SSR bundle
  const { render } = await import(
    pathToFileURL(path.join(serverOutDir, 'entry-server.js')).href
  )

  // 3. Read Vite's HTML template (already has asset hashes injected)
  const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8')

  // 4. Render each route and write the output file
  for (const { url, outFile } of routes) {
    const appHtml = render(url)
    const html = template.replace('<!--ssr-outlet-->', appHtml)
    const outPath = path.join(distPath, outFile)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, html)
    console.log(`Pre-rendered: ${url}  →  dist/${outFile}`)
  }

  // 5. Remove the server bundle (not needed at runtime)
  fs.rmSync(serverOutDir, { recursive: true, force: true })

  console.log('Pre-rendering complete.')
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
