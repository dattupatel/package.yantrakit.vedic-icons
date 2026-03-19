import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.resolve(root, 'package.json'), 'utf-8'));

const errors = [];
const warnings = [];

// Run checks first
const distExists = fs.existsSync(path.resolve(root, 'dist/vedic-icons.css'));
if (!distExists) errors.push('dist/vedic-icons.css not found. Run: pnpm build');

const fontsDir = path.resolve(root, 'dist/fonts');
if (!fs.existsSync(fontsDir)) {
  errors.push('dist/fonts/ not found. Run: pnpm build');
} else {
  const fonts = fs.readdirSync(fontsDir);
  if (!fonts.some(f => f.endsWith('.woff2'))) {
    errors.push('No .woff2 font files in dist/fonts/');
  }
}

let testsPass = true;
try {
  execSync('pnpm test:run', { cwd: root, stdio: 'pipe' });
} catch {
  testsPass = false;
  errors.push('Tests failed. Run: pnpm test:run');
}

let gitClean = true;
try {
  const status = execSync('git status --porcelain', { cwd: root, encoding: 'utf-8' }).trim();
  if (status) {
    gitClean = false;
    errors.push('Git working directory is not clean. Commit changes first.');
  }
} catch {
  warnings.push('Could not check git status.');
}

// Show report
console.log('\n═══════════════════════════════════════════');
console.log('  PREPUBLISH CHECK — @yantrakit/vedic-icons');
console.log('═══════════════════════════════════════════\n');
console.log(`  Version:    ${pkg.version}`);
console.log(`  Build:      ${distExists ? '✅ OK' : '❌ MISSING'}`);
console.log(`  Tests:      ${testsPass ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  Git clean:  ${gitClean ? '✅ YES' : '❌ NO'}`);
console.log('');

if (errors.length > 0) {
  console.error('❌ ERRORS:\n');
  errors.forEach((e, i) => console.error(`  ${i + 1}. ${e}`));
  console.error('');
}

if (warnings.length > 0) {
  console.warn('⚠️  WARNINGS:\n');
  warnings.forEach((w, i) => console.warn(`  ${i + 1}. ${w}`));
  console.warn('');
}

// Check --confirmed flag
if (!process.env.CONFIRMED) {
  console.log('─────────────────────────────────────────');
  console.log('');
  if (errors.length === 0) {
    console.log('  All checks passed.');
  }
  console.log('  BEFORE PUBLISHING, verify:');
  console.log(`    1. Version ${pkg.version} is correct (patch bump only unless approved)`);
  console.log('    2. README.md is up to date');
  console.log('    3. CHANGELOG is updated (if applicable)');
  console.log('');
  console.log('  Once confirmed, publish with:');
  console.log('    CONFIRMED=1 pnpm publish --access public --no-git-checks');
  console.log('');
  process.exit(1);
}

// If --confirmed but has errors, still block
if (errors.length > 0) {
  console.error('❌ Cannot publish — fix errors above first.\n');
  process.exit(1);
}

console.log('✅ All checks passed. Publishing...\n');
