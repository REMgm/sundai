# SundAI Motivation design system

Light theme, locked site-wide. Tokens live in `design/tokens.json` and are
mirrored in `app/globals.css` under `@theme`. If you change a value, change it
in both places.

## Color

One accent, split into tiers:

| Token | Hex | Use |
|---|---|---|
| `paper` | `#f9f7f3` | Page ground |
| `surface` | `#ffffff` | Cards, panels, media surrounds |
| `ink` | `#14191b` | Primary text |
| `ink-muted` | `#545e62` | Secondary text |
| `ink-faint` | `#758084` | Small metadata only |
| `line` | `#e7e3da` | Hairlines |
| `teal-ink` | `#00727c` | Accent, interactive tier: links, buttons, labels |
| `teal-deep` | `#00565e` | Accent hover tier |
| `teal-bright` | `#00c2cc` | Brand cyan, graphic tier only (aura arcs, progress bar, logo details). Never as text on paper: it fails contrast |
| `teal-wash` | `#e6f3ef` | Tinted band and content panels |

Rules:

- The teal family is the only UI accent. Amber (`#f5a623`) survives from the
  legacy brand inside photography and the logo world, never as a UI color.
- No gradients on text, no glows, no glass. Depth comes from hairlines,
  surface steps, and a single soft shadow on the featured card hover.
- Text contrast: AA minimum everywhere; `ink-faint` only at metadata sizes.

## Type

- **Sora** (600/700/800): wordmark, headlines, section titles, article subheads.
- **Geist** (400/500/600): everything readable.
- **Geist Mono** (400/500): numerals, week labels, dates, read times.

All self-hosted. Emphasis inside a headline uses weight or the accent color,
never a second family.

## Shape

- Media, cards, panels: 16px radius (`rounded-2xl`).
- Interactive elements (buttons, share pills, menu button): full pill.
- Nothing else. No mixed radii.

## Motion

House easing `cubic-bezier(0.16, 1, 0.3, 1)` for every entrance.

| Moment | Motion | Reason |
|---|---|---|
| Hero wordmark | Lines rise from an overflow mask, 0.12s stagger | Brand entrance |
| Hero media | Scale settle + slow scroll parallax | Depth |
| Sections | Fade-rise on first view, once | Hierarchy |
| Stats | Count up from 0 on view (real value server-rendered) | Emphasis |
| Subscribe CTA | Magnetic lean toward pointer | Feedback |
| Article | Top progress bar tied to scroll | Feedback |

Rules: animate `transform`/`opacity` only; no scroll event listeners (Motion
`useScroll` or IntersectionObserver); everything collapses to static under
`prefers-reduced-motion`; no infinite loops.

## Logo

`components/Logo.tsx` (standalone copy: `public/logo.svg`): geometric owl mark,
teal head, aqua aura arc, on the 64-unit grid. Lockup pairs the mark with
"SundAI" in Sora Bold; the "AI" carries `teal-ink`. Clear space: half the mark
width on all sides. Do not recolor, outline, or rotate the mark.

## Voice

Short declarative headlines. Second person. No jargon, no hype. No em-dashes
anywhere, use commas, colons, or two sentences.
