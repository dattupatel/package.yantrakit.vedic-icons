# Changelog

All notable changes to this project will be documented here.

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
