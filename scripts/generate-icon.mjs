#!/usr/bin/env node
// Regenerate images/logo.png from images/logo.svg — no AI, fully repeatable.
// Usage: npm run icon
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'images', 'logo.svg');
const out = path.join(root, 'images', 'logo.png');
const SIZE = 256;

const svg = await readFile(src);
const png = await sharp(svg, { density: 384 })
  .resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(out, png);
console.log(`wrote ${path.relative(root, out)} (${SIZE}x${SIZE}, ${png.length} bytes)`);
