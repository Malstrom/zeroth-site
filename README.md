# zeroth-site — design system

This is the landing page for the zeroth ecosystem. This README documents the visual rules agreed during the initial design session. Every future change to `zeroth.html` must respect these rules. When a rule needs to change, update this file first in a PR.

---

## Purpose & tone

The site is the public face of the zeroth ecosystem: a foundational law that governs every AI-native framework built by Malstrom. The tone is **minimal, editorial, and philosophical** — closer to Anthropic or Notion than to a typical SaaS landing page. No gradients, no glowing orbs, no generic hero copy.

---

## Palette — Nexus warm beige

All colour values come from the **Nexus design system**. Never hardcode hex values; always reference CSS custom properties.

### Light mode

| Role | Variable | Value |
|---|---|---|
| Page background | `--color-bg` | `#f7f6f2` |
| Card surface | `--color-surface` | `#f9f8f5` |
| Offset surface | `--color-surface-offset` | `#f0ede8` |
| Dividers | `--color-divider` | `#dcd9d5` |
| Borders | `--color-border` | `#d4d1ca` |
| Primary text | `--color-text` | `#28251d` |
| Muted text | `--color-text-muted` | `#6b6860` |
| Faint text | `--color-text-faint` | `#b0aea9` |
| Primary accent | `--color-primary` | `#01696f` (Hydra Teal) |
| Primary hover | `--color-primary-hover` | `#0c4e54` |

### Dark mode

| Role | Variable | Value |
|---|---|---|
| Page background | `--color-bg` | `#171614` |
| Card surface | `--color-surface` | `#1c1b19` |
| Primary text | `--color-text` | `#cdccca` |
| Primary accent | `--color-primary` | `#4f98a3` |

**Rule:** one accent colour only. No gradient buttons. No coloured borders on cards. Cards use surface elevation (shadow or background shift) not coloured side borders.

---

## Typography

### Fonts loaded

- **Instrument Serif** (Google Fonts) — display/italic use only
- **Geist** (Google Fonts) — body, UI, all functional text
- **Geist Mono** (Google Fonts) — labels, eyebrows, monospace terminal blocks

### Rules

| Context | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Asimov quote (hero only) | Instrument Serif italic | `--text-2xl` | 400 | Only place where display italic is appropriate |
| Section headings | Geist | `--text-xl` | 300 | Light weight, generous letter-spacing — *not* bold |
| Framework card questions | Geist | `--text-base` | 400 | Normal weight, muted colour — a reflection, not a title |
| Body copy | Geist | `--text-base` | 400 | `max-width: 60ch` |
| Eyebrows / labels | Geist Mono | `--text-xs` | 400–500 | Uppercase, `letter-spacing: 0.12em`, faint colour |
| Nav & buttons | Geist | `--text-sm` | 500 | |
| Code / terminal | Geist Mono | `--text-xs` | 400 | |

**Rule:** Instrument Serif italic appears **only** in the hero blockquote. Everywhere else use Geist. No italic headings in section titles or card titles.

**Rule:** Section headings (e.g. "Built on the zeroth law") use `font-weight: 300` and are deliberately understated. They orient the reader; the content carries the weight.

---

## Layout & spacing

- All spacing via the **4px token system** (`--space-1` through `--space-24`).
- Content max-widths: `--content-narrow` 640 px, `--content-default` 920 px, `--content-wide` 1160 px.
- Section padding: `clamp(var(--space-12), 8vw, var(--space-20))`.
- Cards use `padding: var(--space-8)` internally — generous, not tight.
- Prose `max-width: 60ch` for readability.
- Framework card grid: `repeat(auto-fill, minmax(min(280px, 100%), 1fr))`.

**Rule:** every card must have more vertical breathing room than the version before. If text feels compact, the answer is more padding — not smaller font.

---

## Framework card identities

Each card must be visually distinct. The shared structure (name → guiding question → description → link) stays the same, but each card has its own **visual motif** expressed as a subtle inline SVG or decorative element.

### dojo — zen / study

- **Motif:** sumi-e brushstroke, ensō segment, or tatami grid geometry
- **Feel:** stillness, precision, the gap between what you know and what you don't
- **Visual rule:** more empty space than the other cards; the emptiness is intentional
- **Colour accent:** none beyond the shared palette — let the whitespace speak

### aurora — professional memory / Asimov orientation

- **Motif:** orbital arc or sparse star-map dots — navigational, not decorative sci-fi
- **Feel:** a navigator finding direction in a dark space; memory as infrastructure
- **Visual rule:** subtle dot pattern or arc at low opacity; never cartoon-galaxy kitsch
- **Colour accent:** none — the motif works in monochrome

### sudo-hire-me — strategic direction

- **Motif:** compass rose, minimal — cardinal directions, no decoration
- **Feel:** clarity and direction in a chaotic search; strategic moves not random applications
- **Visual rule:** compass drawn in `currentColor`, single line weight, fits in 48×48 px
- **Colour accent:** none — same palette as the others

---

## Visual rules (non-negotiable)

1. **No gradient buttons.** Primary button: solid `--color-text` background.
2. **No coloured card borders.** Cards use shadow or surface shift only.
3. **No stock photography.** Visuals are inline SVG motifs, never raster images.
4. **No centred body text.** Hero tagline can be centred; all other body copy is left-aligned.
5. **No emoji as design elements.**
6. **No icons in coloured circles.** Icon backgrounds are `--color-surface-offset` only.
7. **One accent colour** per viewport. No multi-hue UI.
8. **Instrument Serif italic** reserved exclusively for the Asimov blockquote.
9. **Light/dark mode toggle** is always present in the nav.
10. **GA4 placeholder** stays in `<head>` until the tracking ID is activated.

---

## `data-` hooks (for future work)

| Attribute | Values | Purpose |
|---|---|---|
| `data-framework` | `dojo`, `aurora`, `sudo-hire-me` | Per-framework styling or JS targeting |
| `data-i18n` | key string | Future i18n layer (e.g. `hero.tagline`) |

---

## GitHub Pages deployment

- **Repo:** `Malstrom/zeroth-site` (public)
- **Branch:** `main`
- **Source:** root `/`, file `zeroth.html`
- **URL (after Pages activation):** `malstrom.github.io/zeroth-site/zeroth.html`

To activate: Settings → Pages → Deploy from branch → `main` / `/ (root)` → Save.

---

## What comes next

- [ ] Add SVG motifs to each framework card (dojo, aurora, sudo-hire-me)
- [ ] Reduce card text density — more padding, lighter section heading weights
- [ ] Activate GA4 when tracking ID is ready
- [ ] Add i18n JSON file when Italian/English toggle is needed
