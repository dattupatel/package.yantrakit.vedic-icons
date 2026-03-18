import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const glyphsCss = fs.readFileSync(path.resolve(root, 'dist/vedic-icons-glyphs.css'), 'utf-8');
const utilitiesCss = fs.readFileSync(path.resolve(root, 'src/css/utilities.css'), 'utf-8');

// Extract @font-face block
const fontFaceMatch = glyphsCss.match(/@font-face \{[^}]+\}/s);
const fontFace = fontFaceMatch ? fontFaceMatch[0] : '';

// Extract individual icon content rules (e.g., .vi-diya:before { content: "\f102"; })
const iconRules = [];
const iconRegex = /\.(vi-[\w-]+):before \{\s*content: "([^"]+)";\s*\}/g;
let match;
while ((match = iconRegex.exec(glyphsCss)) !== null) {
  iconRules.push({ className: match[1], content: match[2] });
}

// Build clean CSS
const lines = [
  fontFace,
  '',
  `.vi {`,
  `    display: inline-block;`,
  `    font-family: 'vedic-icons' !important;`,
  `    font-style: normal;`,
  `    font-weight: normal !important;`,
  `    font-variant: normal;`,
  `    text-transform: none;`,
  `    line-height: 1;`,
  `    -webkit-font-smoothing: antialiased;`,
  `    -moz-osx-font-smoothing: grayscale;`,
  `}`,
  '',
  ...iconRules.map(({ className, content }) => `.${className}::before { content: "${content}"; }`),
  '',
  utilitiesCss,
];

const output = lines.join('\n');

fs.writeFileSync(path.resolve(root, 'dist/vedic-icons.css'), output);
fs.unlinkSync(path.resolve(root, 'dist/vedic-icons-glyphs.css'));

console.log(`Combined CSS generated with ${iconRules.length} icons.`);
