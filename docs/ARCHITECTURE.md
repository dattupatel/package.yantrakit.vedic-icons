# Vedic Icons - Technical Architecture

## Approach: Icon Font

Each icon is a glyph in a custom font file (.woff2, .ttf). This is the same approach Font Awesome originally used.

### How It Works

1. SVG icons are designed on a consistent grid (e.g., 24x24 or 1000x1000 units)
2. SVGs are converted into font glyphs using a build tool (e.g., fantasticon, svgicons2svgfont)
3. Each glyph is assigned a unicode code point in the Private Use Area (PUA)
4. CSS maps class names to unicode code points via `content` property on `::before` pseudo-element

### Generated Output

```
dist/
├── vedic-icons.woff2          # Primary font (modern browsers)
├── vedic-icons.ttf            # Fallback font
├── vedic-icons.css            # Full CSS (all icons + utilities)
├── vedic-icons.min.css        # Minified CSS
└── vedic-icons.scss           # SCSS source (optional)
```

### CSS Structure

```css
/* Base class */
.vi {
  font-family: 'vedic-icons';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}

/* Icon classes */
.vi-diya::before { content: '\e001'; }
.vi-yantra::before { content: '\e002'; }
.vi-lotus::before { content: '\e003'; }
/* ... */

/* Size classes */
.vi-xs  { font-size: 0.75em; }
.vi-sm  { font-size: 0.875em; }
.vi-lg  { font-size: 1.25em; }
.vi-xl  { font-size: 1.5em; }
.vi-2x  { font-size: 2em; }
.vi-3x  { font-size: 3em; }
.vi-4x  { font-size: 4em; }
.vi-5x  { font-size: 5em; }

/* Utility classes */
.vi-fw      { width: 1.25em; text-align: center; }
.vi-spin    { animation: vi-spin 2s infinite linear; }
.vi-rotate-90  { transform: rotate(90deg); }
.vi-rotate-180 { transform: rotate(180deg); }
.vi-rotate-270 { transform: rotate(270deg); }
.vi-flip-h  { transform: scaleX(-1); }
.vi-flip-v  { transform: scaleY(-1); }

@keyframes vi-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Why Icon Font (Not SVG Sprites)

| Factor | Icon Font | SVG Sprites |
|--------|-----------|-------------|
| Color | Inherits CSS `color` naturally | Requires `fill` or `currentColor` setup |
| Size | Inherits `font-size` naturally | Requires explicit width/height |
| Tailwind compat | `text-*` classes work automatically | Needs custom utilities |
| Payload | Very small (.woff2 compresses well) | Larger (XML overhead) |
| Multi-color | Single color only | Supports multi-color |
| Simplicity | Just CSS, no JS | May need JS for injection |

Single-color limitation is acceptable for the free tier. Multi-color (duotone) can be achieved with the pro tier using a layered font technique (two glyphs per icon).

## Build Pipeline

1. **Source**: Individual SVG files in `src/icons/` (one per icon)
2. **Optimize**: SVGO to clean up SVGs
3. **Generate font**: fantasticon or similar to convert SVGs → .woff2 + .ttf
4. **Generate CSS**: Auto-generate CSS with icon classes from font metadata
5. **Bundle**: Output to `dist/`

## Repository Structure

```
package.yantrakit.vedic-icons/
├── docs/                        # Internal project documentation
│   ├── PROJECT_VISION.md        # Goals, free/pro model, design principles
│   ├── ARCHITECTURE.md          # Technical approach (this file)
│   ├── USAGE.md                 # End-user usage guide
│   └── ICON_SET.md              # Icon inventory and planned categories
│
├── package/                     # npm package: @yantrakit/vedic-icons
│   ├── package.json
│   ├── tsup.config.ts
│   ├── vitest.config.ts
│   ├── eslint.config.mjs
│   ├── .storybook/              # Storybook config
│   │   └── main.ts              # STORYBOOK_BASE=/storybook/
│   ├── src/
│   │   ├── icons/               # Source SVG files (one per icon)
│   │   │   ├── diya.svg
│   │   │   ├── yantra.svg
│   │   │   ├── lotus.svg
│   │   │   └── ...
│   │   ├── css/
│   │   │   ├── vedic-icons.css  # Generated icon classes
│   │   │   └── utilities.css    # Size, spin, rotate, flip classes
│   │   ├── __stories__/         # Storybook stories for icon demos
│   │   ├── __tests__/           # Unit tests
│   │   └── index.ts             # Entry point (exports CSS path, icon list metadata)
│   ├── dist/                    # Build output
│   │   ├── vedic-icons.woff2
│   │   ├── vedic-icons.ttf
│   │   ├── vedic-icons.css
│   │   └── vedic-icons.min.css
│   └── scripts/
│       └── build-font.ts        # Font generation script
│
└── web/                         # Public website (Next.js)
    ├── package.json             # port 31470
    ├── src/
    │   ├── app/                 # Next.js app router
    │   ├── components/
    │   │   ├── shadcn/          # shadcn/ui primitives
    │   │   └── ui/              # Shared pure client components
    │   └── features/            # Feature modules
    └── .env.example
```

## Deployment

- **Vercel app**: `vedic-icons.yantrakit.com`
- **Web app** (`/`): Next.js public-facing site for browsing icons, searching, copy-paste usage, documentation
- **Storybook** (`/storybook/`): Interactive icon component demos from the package
- Deploy via PR to master (Vercel auto-deploys)

## Git Workflow

- **Branches**: master → staging → feature branches
- **Branch naming**: `feat/XXXX-description` (4-digit padded GitHub issue number)
- **PR flow**: feature branch → staging → master
- **Repo**: https://github.com/dattupatel/package.yantrakit.vedic-icons

## Package Publishing

1. Update version in `package/package.json`
2. Build: `pnpm build`
3. Publish: `pnpm publish --access public --no-git-checks`
4. Update version in `com.yantrakit/web/src/data/products.ts`

## Storybook Deployment

Storybook is deployed as part of the Vercel app at `/storybook/` path.

### Storybook Base Path Config

```typescript
// package/.storybook/main.ts
const basePath = process.env.STORYBOOK_BASE || '/';
```

### Local Development

```bash
# Web app
cd web && pnpm dev          # http://vedic-icons.local:31470

# Storybook
cd package && pnpm storybook  # http://vedic-icons-storybook.local:21470
```

## Tech Stack

### Package (`package/`)
- **Build**: tsup (CJS + ESM output)
- **Font generation**: fantasticon
- **Testing**: Vitest
- **Linting**: ESLint
- **Docs**: Storybook

### Web (`web/`)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Testing**: Vitest + Playwright
- **TypeScript**: Strict mode, `i` prefix types, `Class` suffix classes
