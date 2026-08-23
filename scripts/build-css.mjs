import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const utilitiesCss = fs.readFileSync(path.resolve(root, 'src/css/utilities.css'), 'utf-8');

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
