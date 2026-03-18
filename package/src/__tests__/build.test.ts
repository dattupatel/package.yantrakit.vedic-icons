import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve(__dirname, '../../dist');

describe('build output', () => {
  it('should have vedic-icons.css in dist', () => {
    const exists = fs.existsSync(path.resolve(distDir, 'vedic-icons.css'));
    expect(exists).toBe(true);
  });

  it('should have woff2 font file in dist/fonts', () => {
    const exists = fs.existsSync(path.resolve(distDir, 'fonts/vedic-icons.woff2'));
    expect(exists).toBe(true);
  });

  it('should have ttf font file in dist/fonts', () => {
    const exists = fs.existsSync(path.resolve(distDir, 'fonts/vedic-icons.ttf'));
    expect(exists).toBe(true);
  });

  it('should include .vi base class in CSS', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).toContain('.vi');
    expect(css).toContain("font-family: 'vedic-icons'");
  });

  it('should include icon class for diya', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).toContain('.vi-diya');
  });

  it('should include utility classes', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).toContain('.vi-spin');
    expect(css).toContain('.vi-2x');
    expect(css).toContain('.vi-fw');
    expect(css).toContain('.vi-rotate-90');
    expect(css).toContain('.vi-flip-h');
  });

  it('should reference font files with correct path', () => {
    const css = fs.readFileSync(path.resolve(distDir, 'vedic-icons.css'), 'utf-8');
    expect(css).toContain('./fonts/vedic-icons.woff2');
  });
});
