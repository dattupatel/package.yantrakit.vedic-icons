# Changelog

All notable changes to this project will be documented here.

---

## [0.3.0] - 2026-08-23

### Added — 292 icons, taking the library from 161 to 453

Sourced as **pack pairs** (an outline pack and its matching fill pack) rather than icon by icon,
so every addition arrives with both variants already matched. Each pair was checked before it was
kept: filenames aligned by index — never by slug, because slugs repeat within a pack and would
mispair — then colour purity, then a rendered outline-beside-fill sheet reviewed by eye.

The largest single addition is the **complete Devanagari varnamala**, 62 glyphs: every vowel and
consonant including the nukta forms क़ ख़ ग़ ड़ ढ़ फ़ य़ and ळ ऴ ऱ ष ॠ ऌ. Also added: Indian
monuments and landscapes (Ganges, Pangong Tso, Lake Pichola, Jaisalmer Fort, Humayun's Tomb, Jama
Masjid, Jantar Mantar, Rashtrapati Bhavan), Indian food and spices, instruments, and cricket.

### Added — Hindi aliases (346 of them)

`vi-baagh` and `vi-tiger` render the same glyph. An alias is a second CSS class rule pointing at
the same codepoint, so it costs nothing in the font.

```html
<i class="vi vi-solid vi-baagh"></i>   <!-- identical to vi-tiger -->
```

Aliases are **additive — no published class name changed.** An alias exists only where the Hindi
name genuinely differs; an icon already called `biryani` gets none, because a second identical
name is noise. Three rules are enforced at build time:

- an alias may never **shadow a real icon** — `ladoo`, `thali`, `dhanush` and `toran` are icons in
  their own right, so they are not aliases of anything;
- **no alias is claimed by two icons** — `gaay` and `naag` both collided during authoring and were
  given to the longer-published icon;
- `build-css.mjs` **throws if aliases are defined but none are emitted**, and warns per alias that
  points at an icon with no glyph. A silent zero would ship a stylesheet where every `vi-baagh`
  renders nothing.

New exports: `aliases`, `aliasNames`, `resolveIcon()`.

### Added — categories (12)

Every icon now carries a category, so a full icon list can be rendered grouped instead of as one
undifferentiated grid. New exports: `categories`, `categoryNames`, `iIconCategory`,
`getCategory()`. The website's `icons.ts` carries a matching `category` field on every entry.

Categories: Deities · Sacred Symbols · Devanagari Script · Temples & Architecture · Landscapes ·
Festivals & Rituals · Food & Drink · Music & Dance · People & Attire · Ritual & Everyday Objects ·
Nature & Animals · Cricket.

### Fixed

- **45 incoming icons carried a `clipPath`** that `process-icons.mjs` correctly refuses. They were
  Inkscape no-ops — `M 0,512 H 512 V 0 H 0 Z`, a full-canvas rectangle clipping nothing. Stripped
  at source, each one verified lossless by re-rendering before and after: **max pixel difference 2
  across all 45.** No icon was added under a clip the font could not represent.
- **12 files used `fill="rgb(0,0,0)"` or a masked `white`**, neither of which `cleanSvg` converts.
  They would have rendered hard black and ignored `currentColor` in every theme. Normalised to
  `#000000`, same lossless check.
- **`@types/node` was missing**, so `pnpm typecheck` failed on `build.test.ts` with
  `Cannot find module 'fs'`. Added; typecheck is clean.

### Note

`gyan-mudra`, `mudra`, `naan`, `turban`, `zodiac-wheel` and `dhoti` remain withdrawn, as in 0.2.12.
Stale glyph files for four of them exist under `src/icons/` and are excluded by name, not by
their presence on disk.

453 icons.

---

## [0.2.12] - 2026-08-23

### Removed

**Six icons shipped in 0.2.11 that do not render as glyphs.** Each was checked on the live site,
not inferred: `gyan-mudra`, `mudra`, `naan`, `turban`, `zodiac-wheel`, `dhoti`.

Two causes:

- **Four use `clipPath`.** `cleanSvg` strips `id="…"`, which silently breaks every
  `clip-path="url(#…)"` reference — the clip is lost, the full shapes render, and the glyph becomes
  a filled square with the artwork knocked out of it. `gyan-mudra`, `mudra`, `naan` and `turban`.
- **Two are the wrong kind of artwork.** `zodiac-wheel` is 46 paths of fine detail that collapse
  into a speckled disc at icon size; `dhoti` reads as an angular block.

### Fixed — `process-icons.mjs`

- **It now refuses any source using `clipPath` or `<mask>`.** A font glyph is one flat filled
  outline; clipping cannot survive the conversion even with the ids intact. Refusing beats
  producing something that looks correct in a browser and wrong in the font.
- **`zodiac-wheel` and `dhoti` are on a `withdrawn` list**, so a re-run cannot quietly bring them
  back. Returning either means new artwork, not a re-run.

161 icons.

---

## [0.2.11] - 2026-08-23

### Added

**30 icons**, bringing the set to **167**. Every one was already drawn and sitting in the private
repo's `icons-svg/`; four bugs in `process-icons.mjs` had been quietly dropping them.

- `anklet`
- `anklet-02`
- `ayurveda`
- `bangles`
- `chakra-02`
- `dangle-earrings`
- `dangle-earrings-02`
- `dhoti`
- `guru`
- `gyan-mudra`
- `herbal-leaf`
- `karma`
- `mangalsutra` — outlined only
- `meditation`
- `meditation-02`
- `mudra`
- `naan`
- `naans`
- `palm-leaf-manuscript`
- `sari` — outlined only
- `scroll-quill` — outlined only
- `shirodhara`
- `shree`
- `surya-dev`
- `third-eye`
- `turban`
- `turban-02`
- `yagna`
- `yagna-02`
- `zodiac-wheel` — outlined only

### Fixed — `process-icons.mjs`, and each of these had been silently losing work

- **Colour variants were still being written** to `src/icons/color/`, a directory removed by an
  earlier decision. The whole run died on the first colour file, which is why nothing new had been
  processed in months.
- **`stroke-width="1"` was corrupted into a dangling `stroke-`** — the width stripper matched inside
  the attribute name. It took the font build down and the damage is invisible in the file.
- **The skip list matched substrings**, so `om` silently skipped `Calendar OM` and `Granth Om`,
  both of which are published icons.
- **Every capital was split**, turning `Calendar - OM` into `calendar-o-m`, a duplicate of the
  published `calendar-om`.

The processor is now **additive**: it never rewrites an icon already in the package. Re-cleaning the
existing set produced SVGs the font builder rejects, so overwriting them would have broken 137 icons
to add 30.

**No published class name changed.** `male-sikh02` and `scroll-rolled02` keep their joined spelling
— it is ugly and it is the contract.

---
