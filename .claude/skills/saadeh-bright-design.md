---
name: saadeh-bright-design
description: Use this skill to generate well-branded interfaces and assets for saadeh.dev in BRIGHT (light paper-terminal) mode — for production or throwaway prototypes/mocks. Contains light-mode colors, type, fonts, assets, and a Home-page UI kit. The light sibling of the saadeh.dev terminal system.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

This is the **bright / light-mode** variant of the saadeh.dev terminal design system: warm off-white paper, ink text, the same categorical hue-per-topic accents (darkened for light), the same mono-forward "terminal" voice (`> section` labels, `$ shell` motifs, `▸` callouts), and depth carried by **soft shadows** instead of dark-mode borders.

Key files:
- `colors_and_type.css` — all light tokens (color, type, spacing, radii, shadow, motion). Single source of truth.
- `ui_kits/website/` — the Home page recreated in bright mode. `HomeVariant.jsx` is themeable via a single `t` token object, so you can re-skin it.
- `assets/` — logo + favicon.
- `preview/` — token/component specimen cards.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to design accurately with this brand.

If invoked without other guidance, ask what the user wants to build, ask a few questions, and act as an expert designer who outputs HTML artifacts or production code as needed. Keep the terminal cues and the categorical hue system intact — the brightening is purely visual.
