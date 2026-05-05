---
title: Hello World
date: 2026-05-04
description: A first post introducing the blog and what to expect here — notes on embedded systems, machine learning, and the things I build.
tags: general, meta
---

## Why a blog?

I have been meaning to start writing for a while. Not to publish polished essays, but to have a place where I can think out loud — about things I am building, approaches I am experimenting with, and ideas that do not fit neatly into a README or a LinkedIn post.

The name of this site already says it: *progress, not perfection*. So here goes.

## What to expect

Most posts will be technical. Topics I expect to come back to again and again:

- **Edge AI and embedded systems** — running inference on constrained hardware, real-world tradeoffs
- **Image and signal processing** — the kind of problems that are harder than they look
- **MLOps and tooling** — getting models from prototype to production
- **Home lab and self-hosting** — because tinkering at home is how I stay sharp

Occasionally something less structured — a tool I discovered, a mistake worth documenting, or a rabbit hole that turned out to be worth it.

## A note on format

Posts here will be short. I would rather ship something readable in an hour than spend a week on something perfect. If a post is useful to one person besides me, that is a win.

## Setup

This blog is built into my portfolio site. Posts are plain Markdown files — no CMS, no database. Just files, `marked`, and a Vite prerender pipeline that generates static HTML at build time. The source is on [GitHub](https://github.com/amjadsaadeh/amjadsaadeh.github.io).

```bash
# New post = new file
touch src/posts/YYYY-MM-DD-title.md
```

That is the entire authoring workflow. Simple enough that I might actually use it.
