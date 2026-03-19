import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve(__dirname, '../../dist');

describe('build output', () => {
  it('should have vedic-icons.css in dist', () => {
    expect(fs.existsSync(path.resolve(distDir, 'vedic-icons.css'))).toBe(true);
  });

  it('should have solid font files in dist/fonts', () => {
    expect(fs.existsSync(path.resolve(distDir, 'fonts/vedic-icons-solid.woff2'))).toBe(true);
    expect(fs.existsSync(path.resolve(distDir, 'fonts/vedic-icons-solid.ttf'))).toBe(true);
  });

  it('should have outlined font files in dist/fonts', () => {
    expect(fs.existsSync(path.resolve(distDir, 'fonts/vedic-icons-outlined.woff2'))).toBe(true);
    expect(fs.existsSync(path.resolve(distDir, 'fonts/vedic-icons-outlined.ttf'))).toBe(true);
  });

  it('should include .vi base class in CSS', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).toContain('.vi {');
    expect(css).toContain('display: inline-block');
  });

  it('should include solid style with diya icon', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).toContain('.vi-solid');
    expect(css).toContain('.vi-solid.vi-diya::before');
  });

  it('should include outlined style with diya icon', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).toContain('.vi-outlined');
    expect(css).toContain('.vi-outlined.vi-diya::before');
  });

  it('should have separate font-face for each style', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).toContain('font-family: "vedic-icons-solid"');
    expect(css).toContain('font-family: "vedic-icons-outlined"');
  });

  it('should not include any vi-* utility classes', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).not.toContain('.vi-spin');
    expect(css).not.toContain('.vi-2x');
    expect(css).not.toContain('.vi-fw');
    expect(css).not.toContain('.vi-rotate');
    expect(css).not.toContain('.vi-flip');
  });
});
