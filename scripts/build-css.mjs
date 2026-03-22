import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const utilitiesCss = fs.readFileSync(path.resolve(root, 'src/css/utilities.css'), 'utf-8');

const styles = ['solid', 'outlined', 'color'];
const allFontFaces = [];
const allStyleBlocks = [];
let totalIcons = 0;

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

  totalIcons += iconRules.length;

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

console.log(`Combined CSS generated with ${totalIcons} icons across ${styles.length} styles.`);
