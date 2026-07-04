# SundAI Motivation

The weekly Sunday briefing that gives business leaders a 6-month head start on AI.
By Remco Vroom, Global EVP MarTech AI Transformation at Monks.

This is the redesigned site: light theme, motion-driven, built with Next.js
(App Router), Tailwind v4, and Motion. It replaces the legacy static site at
`REMgm/sundai-motivation`.

## Stack

- Next.js App Router, static generation for all pages
- Tailwind v4 design tokens in `app/globals.css` (light theme, locked)
- Motion (`motion/react`) for all animation, gated behind `prefers-reduced-motion`
- Sora (display) + Geist (body) + Geist Mono (data), all self-hosted

## Content

Article bodies live in `content/articles/*.html` as verbatim fragments migrated
from the legacy site. Metadata (week, dates, titles, descriptions, header
images) lives in `lib/articles-data.json`. Articles publish by date: an issue
with a future `publishDate` stays hidden until the next build after that date.

To add a new issue:

1. Drop the header image in `public/assets/headers/<slug>.jpg`
2. Add the body fragment as `content/articles/<slug>.html`
3. Add its metadata entry to `lib/articles-data.json`

## SEO

- Clean URLs (`/articles/<slug>`) with permanent redirects from every legacy
  `.html` path (see `lib/redirects.json`, wired in `next.config.ts`)
- Open Graph + Twitter cards on every page, canonical URLs
- JSON-LD: `Person` + `WebSite` site-wide, `Article` per issue
- `sitemap.xml`, `robots.txt`, and `llms.txt` generated from content

## Develop

```bash
npm install
npm run dev
```
