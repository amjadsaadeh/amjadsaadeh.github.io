# saadeh.dev

Personal website for Amjad Saadeh. Built with Vite + React, deployed via GitHub Pages.

## Setup

    npm install
    npm run dev       # dev server at localhost:5173
    npm run build     # production build to dist/
    npm run preview   # preview production build

## Deploy

GitHub Actions auto-deploys on push to the relaunch branch.
Go to repo Settings, Pages, set source to GitHub Actions.

## Structure

    src/components/   Reusable UI (FadeIn, Tag, ProjectCard, etc.)
    src/pages/        Page components (HomePage)
    src/theme.js      Design tokens (colors, fonts)
    src/index.css     Global reset and styles
