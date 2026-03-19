# @yantrakit/vedic-icons

A pure CSS, class-based icon library inspired by Indian art, culture, and sacred geometry.

**[View Documentation & Examples →](https://vedic-icons.yantrakit.com)**

## Installation

```bash
pnpm add @yantrakit/vedic-icons
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

## URLs

| Environment | App | URL |
|-------------|-----|-----|
| Production | Storybook | https://vedic-icons.yantrakit.com/storybook/ |
| Production | Website | https://vedic-icons.yantrakit.com |
| Production | npm | https://www.npmjs.com/package/@yantrakit/vedic-icons |
| Local | Storybook | http://vedic-icons-storybook.local:21470 |

## Local Development

### Prerequisites

Add the following to `/etc/hosts`:

```
# vedic-icons-storybook ->  vedic-icons.yantrakit.com/storybook
127.0.0.1                   vedic-icons-storybook.local # port 21470
```

### Storybook

```bash
pnpm install && pnpm storybook
```

### Build

```bash
pnpm build
```

### Tests

```bash
pnpm test:run
```

## Contributing

Issues and pull requests are welcome.

## License

MIT
