# Vedic Icons - Usage Guide

## Installation

```bash
pnpm add @yantrakit/vedic-icons
```

## Import CSS

```html
<!-- Via link tag -->
<link rel="stylesheet" href="path/to/vedic-icons.css" />
```

```js
// Via JS import (bundlers)
import '@yantrakit/vedic-icons/css';
```

## Basic Usage

```html
<i class="vi vi-diya"></i>
<i class="vi vi-yantra"></i>
<i class="vi vi-lotus"></i>
```

## Sizing

### Built-in Size Classes

```html
<i class="vi vi-diya vi-xs"></i>     <!-- 0.75em -->
<i class="vi vi-diya vi-sm"></i>     <!-- 0.875em -->
<i class="vi vi-diya"></i>           <!-- 1em (default) -->
<i class="vi vi-diya vi-lg"></i>     <!-- 1.25em -->
<i class="vi vi-diya vi-xl"></i>     <!-- 1.5em -->
<i class="vi vi-diya vi-2x"></i>     <!-- 2em -->
<i class="vi vi-diya vi-3x"></i>     <!-- 3em -->
<i class="vi vi-diya vi-4x"></i>     <!-- 4em -->
<i class="vi vi-diya vi-5x"></i>     <!-- 5em -->
```

### Tailwind CSS

Since icons are font glyphs, Tailwind's `text-*` sizing works naturally:

```html
<i class="vi vi-diya text-2xl"></i>
<i class="vi vi-diya text-5xl"></i>
```

## Color

Icons inherit the CSS `color` property. Any color method works:

### Built-in (inherits parent color)

```html
<span style="color: red;">
  <i class="vi vi-diya"></i>
</span>
```

### Tailwind CSS

```html
<i class="vi vi-diya text-red-500"></i>
<i class="vi vi-diya text-amber-400 text-3xl"></i>
```

### Inline Style

```html
<i class="vi vi-diya" style="color: #f59e0b;"></i>
```

## Utility Classes

```html
<i class="vi vi-chakra vi-spin"></i>      <!-- Spinning animation -->
<i class="vi vi-diya vi-fw"></i>          <!-- Fixed width (for alignment in lists) -->
<i class="vi vi-lotus vi-rotate-90"></i>  <!-- Rotate 90 degrees -->
<i class="vi vi-lotus vi-rotate-180"></i> <!-- Rotate 180 degrees -->
<i class="vi vi-lotus vi-rotate-270"></i> <!-- Rotate 270 degrees -->
<i class="vi vi-lotus vi-flip-h"></i>     <!-- Flip horizontal -->
<i class="vi vi-lotus vi-flip-v"></i>     <!-- Flip vertical -->
```

## Accessibility

Add `aria-hidden="true"` for decorative icons, or `role="img"` with `aria-label` for meaningful icons:

```html
<!-- Decorative (next to text) -->
<i class="vi vi-diya" aria-hidden="true"></i> Diwali Sale

<!-- Meaningful (standalone) -->
<i class="vi vi-namaste" role="img" aria-label="Greeting"></i>
```
