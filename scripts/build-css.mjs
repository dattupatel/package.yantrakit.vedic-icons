import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const utilitiesCss = fs.readFileSync(path.resolve(root, 'src/css/utilities.css'), 'utf-8');

// Hindi aliases, read from the package's own source of truth so CSS and TS cannot disagree.
const indexTs = fs.readFileSync(path.resolve(root, 'src/index.ts'), 'utf-8');
const aliasBlock = indexTs.match(/export const aliases[^=]*= \{([\s\S]*?)\n\};/);
const aliasMap = {};
if (aliasBlock) {
  for (const m of aliasBlock[1].matchAll(/'([^']+)':\s*'([^']+)'/g)) aliasMap[m[1]] = m[2];
}
const aliasEmitted = new Set();
const perStyleAliases = {};

const styles = ['solid', 'outlined'];
const allFontFaces = [];
const allStyleBlocks = [];
// Counted separately on purpose. A style variant is a GLYPH; an icon is a name that may exist in
// one style or both. Summing glyphs and calling the total "icons" is what this used to do, and it
// was read as an icon count and acted on — see #29.
let totalGlyphs = 0;
const perStyle = {};
const distinctIcons = new Set();

for (const style of styles) {
  const glyphsPath = path.resolve(root, `dist/vedic-icons-${style}-glyphs.css`);
  if (!fs.existsSync(glyphsPath)) continue;

  const glyphsCss = fs.readFileSync(glyphsPath, 'utf-8');

  // Extract @font-face block
  const fontFaceMatch = glyphsCss.match(/@font-face \{[^}]+\}/s);
  if (fontFaceMatch) allFontFaces.push(fontFaceMatch[0]);

  // Extract icon content rules
  const iconRules = [];
  const iconRegex = /\.(vi-[\w-]+):before \{\s*content: "([^"]+)";\s*\}/g;
  let match;
  while ((match = iconRegex.exec(glyphsCss)) !== null) {
    iconRules.push({ className: match[1], content: match[2] });
  }

  totalGlyphs += iconRules.length;
  perStyle[style] = iconRules.length;
  for (const rule of iconRules) distinctIcons.add(rule.className);

  // Style-specific block: .vi-solid .vi-diya::before or .vi-solid.vi-diya::before
  allStyleBlocks.push(`/* ${style} style */`);
  allStyleBlocks.push(`.vi-${style} {`);
  allStyleBlocks.push(`    font-family: 'vedic-icons-${style}' !important;`);
  allStyleBlocks.push(`}`);
  allStyleBlocks.push('');
  allStyleBlocks.push(
    ...iconRules.map(({ className, content }) => `.vi-${style}.${className}::before { content: "${content}"; }`)
  );

  // Hindi aliases render the SAME codepoint — an alias is a second class rule, not a second glyph,
  // so this costs nothing in the font. Built from src/index.ts so the CSS and the exported
  // `aliases` map can never drift apart.
  const aliasRules = [];
  for (const [alias, canonical] of Object.entries(aliasMap)) {
    const rule = iconRules.find((r) => r.className === `vi-${canonical}`);
    // A glyph missing in THIS style is normal (many icons are solid-only); skip quietly here and
    // let the totals below report it. An alias pointing at a name that exists in NEITHER style is
    // a real error and is caught by the reconciliation after the loop.
    if (!rule) continue;
    aliasRules.push(`.vi-${style}.vi-${alias}::before { content: "${rule.content}"; }`);
    aliasEmitted.add(alias);
  }
  allStyleBlocks.push(...aliasRules);
  perStyleAliases[style] = aliasRules.length;
  allStyleBlocks.push('');

  // Clean up glyphs file
  fs.unlinkSync(glyphsPath);
}

const lines = [
  ...allFontFaces,
  '',
  `.vi {`,
  `    display: inline-block;`,
  `    font-style: normal;`,
  `    font-weight: normal !important;`,
  `    font-variant: normal;`,
  `    text-transform: none;`,
  `    line-height: 1;`,
  `    -webkit-font-smoothing: antialiased;`,
  `    -moz-osx-font-smoothing: grayscale;`,
  `}`,
  '',
  ...allStyleBlocks,
  utilitiesCss,
];

// Zero aliases emitted when the map is non-empty means the wiring broke — say so loudly rather
// than shipping a stylesheet where every vi-baagh silently renders nothing.
const aliasTotal = Object.keys(aliasMap).length;
if (aliasTotal > 0 && aliasEmitted.size === 0) {
  throw new Error(`build-css: ${aliasTotal} aliases defined but none emitted — alias wiring is broken`);
}
const orphanAliases = Object.entries(aliasMap)
  .filter(([a]) => !aliasEmitted.has(a))
  .map(([a, c]) => `${a} -> ${c}`);
if (orphanAliases.length) {
  console.warn(`build-css: ${orphanAliases.length} alias(es) point at an icon with no glyph in any style:`);
  for (const o of orphanAliases) console.warn(`   ${o}`);
}
console.log(`build-css: aliases defined ${aliasTotal}, emitted ${aliasEmitted.size}` +
  Object.entries(perStyleAliases).map(([k, v]) => `, ${k} ${v}`).join(''));

const output = lines.join('\n');

fs.writeFileSync(path.resolve(root, 'dist/vedic-icons.css'), output);

// Zero examined is a failure, never a pass. Without this, a missing glyph file makes the loop above
// `continue` for every style and the script writes a 369-byte stylesheet containing no icons at all
// — exits 0, prints a cheerful count of nothing, and the defect surfaces in a consumer's browser as
// missing glyphs. It fooled me while fixing #29, which is how it was found.
if (distinctIcons.size === 0) {
  console.error(
    'x build-css: no glyph files found in dist/. Run build-font first. Refusing to write an empty stylesheet.',
  );
  process.exit(1);
}

const breakdown = styles
  .filter((style) => perStyle[style] !== undefined)
  .map((style) => `${style} ${perStyle[style]}`)
  .join(', ');

console.log(
  `Combined CSS generated — ${distinctIcons.size} icons, ` +
    `${totalGlyphs} glyphs across ${Object.keys(perStyle).length} styles (${breakdown}).`,
);
