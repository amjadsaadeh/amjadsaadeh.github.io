# CLAUDE.md

This file describes the codebase for AI assistants working on this project.

## Project Overview

Personal portfolio website for Amjad Saadeh (www.saadeh.dev). Built as a single-page React application using Vite, deployed to GitHub Pages.

## Tech Stack

- **Framework:** React 18 (JSX, no TypeScript despite `@types` packages being installed)
- **Build tool:** Vite 6
- **Package manager:** pnpm 9 (always use `pnpm`, not `npm` or `yarn`)
- **Deployment:** GitHub Pages via GitHub Actions

## Development Commands

```bash
pnpm install          # install dependencies
pnpm dev              # dev server at localhost:5173
pnpm build            # production build to dist/
pnpm preview          # preview production build locally
```

No linting, formatting, or testing commands exist — do not add them unless asked.

## Repository Structure

```
src/
  main.jsx            # React entry point, mounts <App /> to #root
  App.jsx             # Root component, renders <HomePage />
  theme.js            # Design tokens (colors, fonts) — single source of truth
  index.css           # Global CSS reset, scrollbar, selection styles
  components/
    FadeIn.jsx        # IntersectionObserver-based fade-in wrapper
    NavLink.jsx       # Nav link with hover underline animation
    Tag.jsx           # Inline badge/tag (accepts color prop)
    SectionLabel.jsx  # Section header with gradient line decoration
    ExpItem.jsx       # Work experience timeline entry
    ProjectCard.jsx   # Project showcase card with hover effect
    InterestCard.jsx  # Interest/skill card with emoji icon
  pages/
    HomePage.jsx      # Entire site content — single monolithic page component
public/
  logo.svg            # Site logo / favicon
index.html            # HTML shell
vite.config.js        # Vite config (base: '/')
.github/workflows/
  deploy.yml          # CI/CD: builds and deploys to GitHub Pages on push to main
```

## Styling Conventions

All styling is done with **inline styles** using plain JS objects — no CSS modules, no Tailwind, no styled-components.

Design tokens are centralized in `src/theme.js`:

```js
import { colors, fonts } from '../theme'

// colors: bg, surface, surfaceLight, border, text, textMuted,
//         accent (#22d3ee cyan), accentDim, warm (#f0abfc pink),
//         warmDim, green (#4ade80), greenDim
// fonts:  mono (IBM Plex Mono), sans (DM Sans)
```

Always import from `theme.js` rather than hardcoding hex values. The theme is dark-only — there is no light mode.

## Component Conventions

- All components are function components using JSX (`.jsx` extension)
- Styles defined as `const styles = { container: {...}, ... }` within the component file
- Components accept minimal, explicit props — no prop-types or TypeScript validation
- `FadeIn` wraps sections for scroll-triggered animation; use `delay` prop (ms) to stagger
- `Tag` accepts a `color` prop — pass a hex/rgba value from `theme.js`

## Content Structure (HomePage.jsx)

The entire site lives in `src/pages/HomePage.jsx`. Sections in order:

1. **Nav** — sticky top bar with logo and anchor links
2. **Hero** — name, title, blinking cursor animation
3. **Currently** — info box for current focus/exploration
4. **About** — short bio paragraph with external link
5. **Interests** — 6-item grid using `InterestCard`
6. **Experience** — timeline using `ExpItem` (4 positions, newest first)
7. **Projects** — 3-card grid using `ProjectCard`
8. **Contact** — email, GitHub, LinkedIn links
9. **Footer** — copyright and motto

To add or update content, edit the relevant section in `HomePage.jsx` directly.

## Deployment

- **Trigger:** Push to `main` branch automatically triggers GitHub Actions
- **Workflow:** `.github/workflows/deploy.yml` — installs pnpm, runs `pnpm build`, deploys `dist/` to GitHub Pages
- **Custom domain:** `www.saadeh.dev` configured via `CNAME` file (do not delete or modify)
- **Node version:** 24 (set in CI)
- **pnpm version:** 9 (set in CI)

## Key Constraints

- No TypeScript — write plain JSX only
- No CSS files for components — use inline styles with `theme.js` tokens
- No testing framework — do not add test files
- No linter config — do not add ESLint/Prettier config unless explicitly asked
- `pnpm-lock.yaml` must stay in sync — run `pnpm install` after any dependency change
- The `CNAME` file must not be deleted (it configures the custom domain)
- Do not change `vite.config.js` base path from `'/'`
