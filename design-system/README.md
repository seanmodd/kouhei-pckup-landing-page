# Pckup Design System

## Figma File Structure

The Figma file "Pckup Website" should be organized into the following pages:

```
Figma Pages (in order):
├── 🎨 _Tokens          ← Color/type/spacing Figma Variables (source of truth)
├── 🔷 _Icons           ← Icon library frame
├── 🏷️  Logo & Brand    ← Logo component set (all variants)
├── 📐 Typography       ← Type scale specimens (desktop + mobile)
├── 🧩 Components       ← Atomic components (Button, Input, Card, Badge, Nav...)
├── 🖼️  Moodboard       ← Visual direction reference
├── 🏠 Homepage         ← Marketing landing page (1440px desktop)
├── 📦 Tracking         ← Live tracking page
├── 📊 Dashboard        ← B2B shipper portal
├── 💰 Pricing          ← Pricing tiers page
├── 📱 Mobile           ← 5 app screens (375px)
└── 🌙 Dark Mode        ← Dark variants
```

## Token Import

Use **Token Studio for Figma** plugin to import `tokens/tokens.json`.

Set mappings:
- `global` → Global token set
- `semantic` → Semantic token set (light theme)

Then create Figma Variables from these tokens for native Figma variable support.

## Grid System

- **Base unit:** 8px
- **Desktop (1440px):** 12-column grid, 24px gutter, 120px margin
- **Tablet (768px):** 8-column grid, 16px gutter, 40px margin
- **Mobile (375px):** 4-column grid, 16px gutter, 20px margin

## Component Naming Convention

```
ComponentName / Variant / State
Examples:
  Button / Primary / Default
  Button / Primary / Hover
  Button / Primary / Disabled
  Input / Text / Default
  Input / Text / Error
  Card / Shipment / Default
```

## Color Usage Guide

| Color | Token | Use Case |
|---|---|---|
| Teal `#084d53` | `color/action/primary/default` | CTA buttons, active nav, links |
| Orange `#f14108` | `color/action/accent/default` | Icon mark, highlights, badges, price |
| Charcoal `#2d2d2d` | `color/background/inverse` | Dark hero sections, dark mode bg |
| Off-white `#f6f6f6` | `color/background/secondary` | Section backgrounds, card surfaces |
| White `#ffffff` | `color/background/primary` | Default page background |

## Typography Guide

| Style | Font | Weight | Size (Desktop) | Use |
|---|---|---|---|---|
| Display 2XL | TASA Orbiter | 700 | 96px | Hero mega-headline |
| Display XL | TASA Orbiter | 700 | 72px | Hero headline |
| H1 | TASA Orbiter | 700 | 60px | Page title |
| H2 | TASA Orbiter | 700 | 48px | Section title |
| H3 | TASA Orbiter | 600 | 36px | Subsection |
| H4 | IBM Plex Sans | 600 | 30px | Card title |
| Body XL | IBM Plex Sans | 400 | 18px | Lead paragraph |
| Body LG | IBM Plex Sans | 400 | 16px | Default body |
| Body MD | IBM Plex Sans | 400 | 13px | Small body |
| Label LG | IBM Plex Sans | 500 | 16px | Form labels |
| Button LG | IBM Plex Sans | 600 | 16px | CTA button text |
| Caption | IBM Plex Sans | 400 | 11px | Hints, timestamps |

## Animation Tokens

| Token | Value | Use |
|---|---|---|
| `transition/fast` | 150ms ease-in-out | Micro-interactions, hover color |
| `transition/normal` | 200ms ease-in-out | Button hover, card hover |
| `transition/slow` | 400ms ease-in-out | Panel open/close, page transitions |
| `transition/spring` | 300ms cubic-bezier spring | Elastic reveals, drawer open |

## Breakpoints

```
Mobile:  375px  (4-col grid)
Tablet:  768px  (8-col grid)
Desktop: 1440px (12-col grid)
Wide:    1920px (12-col grid, centered at 1440px max-width)
```
