import { generateFonts } from 'fantasticon';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const fontsDir = path.resolve(root, 'dist/fonts');
fs.mkdirSync(fontsDir, { recursive: true });

const styles = ['solid', 'outlined', 'color'];

for (const style of styles) {
  const inputDir = path.resolve(root, `src/icons/${style}`);
  if (!fs.existsSync(inputDir)) continue;

  await generateFonts({
    inputDir,
    outputDir: fontsDir,
    name: `vedic-icons-${style}`,
    fontTypes: ['woff2', 'ttf'],
    assetTypes: ['css'],
    prefix: 'vi',
    tag: 'i',
    fontsUrl: './fonts',
    codepoints: {},
    formatOptions: {},
    templates: {},
    pathOptions: {
      css: path.resolve(root, `dist/vedic-icons-${style}-glyphs.css`),
    },
    normalize: true,
    round: 10e12,
    fontHeight: 1000,
    descent: 0,
  });

  console.log(`${style} font generated.`);
}
