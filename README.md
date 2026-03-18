# @yantrakit/vedic-icons

A pure CSS, class-based icon library inspired by Indian art, culture, and sacred geometry.

**GitHub Repo:** https://github.com/dattupatel/package.yantrakit.vedic-icons

**[View Documentation & Examples →](https://vedic-icons.yantrakit.com)**

## URLs

| Environment | App | URL |
|-------------|-----|-----|
| Production | Web | https://vedic-icons.yantrakit.com |
| Production | Storybook | https://vedic-icons.yantrakit.com/storybook/ |
| Local | Web | http://vedic-icons.local:31470 |
| Local | Storybook | http://vedic-icons-storybook.local:21470 |

## Prerequisites

Add the following to `/etc/hosts`:

```
# vedic-icons ->            vedic-icons.yantrakit.com
127.0.0.1                   vedic-icons.local # port 31470
# vedic-icons-storybook ->  vedic-icons.yantrakit.com/storybook
127.0.0.1                   vedic-icons-storybook.local # port 21470
```

## Development

```bash
# Web app
cd web && pnpm install && pnpm dev

# Storybook (package)
cd package && pnpm install && pnpm storybook
```

## Project Structure

```
package.yantrakit.vedic-icons/
├── docs/       # Internal project documentation
├── package/    # npm package (@yantrakit/vedic-icons)
└── web/        # Public website (vedic-icons.yantrakit.com)
```

## Installation

```bash
pnpm add @yantrakit/vedic-icons
```

## Usage

```html
<i class="vi vi-diya"></i>
<i class="vi vi-diya text-red-500 text-3xl"></i>
<i class="vi vi-diya vi-spin"></i>
```

## License

MIT
