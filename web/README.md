# Vedic Icons — Web

Public-facing website for browsing, searching, and previewing Vedic Icons.

## URLs

| Environment | URL |
|-------------|-----|
| Production | https://vedic-icons.yantrakit.com |
| Local | http://vedic-icons.local:31470 |

## Prerequisites

Add the following to `/etc/hosts`:

```
127.0.0.1     vedic-icons.local # port 31470
```

## Development

```bash
pnpm dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.
