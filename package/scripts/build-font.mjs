import { generateFonts } from 'fantasticon';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const fontsDir = path.resolve(root, 'dist/fonts');
fs.mkdirSync(fontsDir, { recursive: true });

await generateFonts({
  inputDir: path.resolve(root, 'src/icons'),
  outputDir: path.resolve(root, 'dist/fonts'),
  name: 'vedic-icons',
  fontTypes: ['woff2', 'ttf'],
  assetTypes: ['css'],
  prefix: 'vi',
  tag: 'i',
  fontsUrl: './fonts',
  codepoints: {},
  formatOptions: {},
  templates: {},
  pathOptions: {
    css: path.resolve(root, 'dist/vedic-icons-glyphs.css'),
  },
  normalize: true,
  round: 10e12,
  fontHeight: 1000,
  descent: 0,
});

console.log('Font files generated successfully.');
