# @yantrakit/vedic-icons

A pure CSS, class-based icon library inspired by Indian art, culture, and sacred geometry.

**[Documentation & Examples](https://vedic-icons.yantrakit.com)** | **[GitHub](https://github.com/yantrakitinc/package.yantrakit.vedic-icons)** | **[npm](https://www.npmjs.com/package/@yantrakit/vedic-icons)**

## Installation

```bash
npm install @yantrakit/vedic-icons
# or
yarn add @yantrakit/vedic-icons
# or
pnpm add @yantrakit/vedic-icons
```

## Setup

Import the CSS in your project:

```js
// In your entry file (e.g., app.tsx, main.ts, layout.tsx)
import '@yantrakit/vedic-icons';
```

Or via a link tag:

```html
<link rel="stylesheet" href="node_modules/@yantrakit/vedic-icons/dist/vedic-icons.css" />
```

## Usage

```html
<!-- Solid style -->
<i class="vi vi-solid vi-diya"></i>

<!-- Outlined style -->
<i class="vi vi-outlined vi-diya"></i>

<!-- With Tailwind classes for size and color -->
<i class="vi vi-solid vi-diya text-3xl text-red-500"></i>
```

## How It Works

Vedic Icons is a CSS icon font. Include the CSS, add the classes, done. No JavaScript required.

1. `vi` — base class (required)
2. `vi-solid` or `vi-outlined` — style (required)
3. `vi-{name}` — icon name (required)

Size, color, rotation, and animation come from your own CSS framework (Tailwind, Bootstrap, etc.).

## Hindi aliases

Most icons also answer to a Hindi name. `vi-baagh` and `vi-tiger` render the same glyph — an alias
is a second class rule pointing at the same codepoint, so it costs nothing in the font.

```html
<i class="vi vi-solid vi-baagh"></i>    <!-- identical to vi-tiger -->
<i class="vi vi-outlined vi-haathi"></i><!-- identical to vi-elephant -->
```

Aliases are additive; no published class name changed. An alias exists only where the Hindi name
genuinely differs, so an icon already called `biryani` has none. Names that are icons in their own
right — `ladoo`, `thali`, `dhanush`, `toran` — are never used as aliases.

```js
import { aliases, resolveIcon } from '@yantrakit/vedic-icons';

resolveIcon('baagh');   // 'tiger'
resolveIcon('tiger');   // 'tiger'
resolveIcon('nonsense');// undefined
```

## Categories

Every icon belongs to one category, for rendering a grouped icon list.

```js
import { categories, categoryNames, getCategory } from '@yantrakit/vedic-icons';

categoryNames;              // ['Deities', 'Sacred Symbols', 'Devanagari Script', …]
categories['Deities'];      // ['aditi', 'agni-dev', 'alamelu', …]
getCategory('baagh');       // 'Nature & Animals'  (aliases resolve too)
```

## Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/yantrakitinc/package.yantrakit.vedic-icons/issues).

## Credits

Most icon designs in this library are sourced from [Flaticon.com](https://www.flaticon.com).

## License

MIT
