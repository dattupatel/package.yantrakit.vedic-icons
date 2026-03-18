# Vedic Icons - Project Vision

## Overview

Vedic Icons is a pure CSS, class-based icon library inspired by Indian art, culture, and sacred geometry. It follows the same usage pattern as Font Awesome — framework-agnostic, works anywhere HTML and CSS work.

## Package

- **npm package**: `@yantrakit/vedic-icons`
- **CSS prefix**: `vi`
- **License**: MIT (free tier)
- **GitHub Repo**: https://github.com/dattupatel/package.yantrakit.vedic-icons

## Repository Structure

```
package.yantrakit.vedic-icons/
├── docs/                      # Internal project documentation
├── package/                   # npm package (@yantrakit/vedic-icons)
│   ├── src/
│   ├── .storybook/
│   └── dist/
└── web/                       # Public-facing website (like fontawesome.com)
    └── src/
```

## URLs

| Environment | App | URL |
|-------------|-----|-----|
| Production | Web | https://vedic-icons.yantrakit.com |
| Production | Storybook | https://vedic-icons.yantrakit.com/storybook/ |
| Local | Web | http://vedic-icons.local:31470 |
| Local | Storybook | http://vedic-icons-storybook.local:21470 |

### /etc/hosts Entries

```
# vedic-icons ->            vedic-icons.yantrakit.com
127.0.0.1                   vedic-icons.local # port 31470
# vedic-icons-storybook ->  vedic-icons.yantrakit.com/storybook
127.0.0.1                   vedic-icons-storybook.local # port 21470
```

## Deployment (Vercel)

- **Vercel app**: `vedic-icons.yantrakit.com`
- **Web app** (`/`): Public website for browsing icons, search, copy-paste usage, documentation
- **Storybook** (`/storybook/`): Interactive icon component demos from the package
- Deploy via PR to master (Vercel auto-deploys)

## Goals

1. Build a comprehensive, culturally authentic icon set rooted in Indian/Vedic aesthetics
2. Pure CSS, class-based — no JavaScript required, works in any framework or plain HTML
3. Tailwind-compatible out of the box (color via `text-*`, size via `text-*`)
4. Compete with Font Awesome and Lucide as a primary icon library
5. 400+ icons minimum for v1 to be useful as a standalone icon set

## Free vs Pro Model

1. **vedic-icons-free** — open source, ~200-400 icons, one style (outline/regular)
2. **vedic-icons-pro** (future) — paid, 1000+ icons, multiple styles:
   - `vi-light` (thin strokes)
   - `vi-regular` (default)
   - `vi-solid` (filled)
   - `vi-duotone` (two-tone)

## Design Principles

1. Clean, minimal line-based design
2. Stroke-only rendering (consistent stroke width)
3. Geometric and symmetrical
4. Culturally authentic but simplified for UI use
5. Scalable to any size (icon font approach)
6. Consistent grid, corner radius, and stroke weight across all icons
