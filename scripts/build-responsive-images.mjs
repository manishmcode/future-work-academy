/**
 * Generates width-based WebP variants for homepage hero images (used via srcset).
 * Usage: npm run build:responsive-images
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public/images');

const jobs = [
  { name: 'futurework-learning-hero', widths: [480, 800, 1200], quality: 78 },
  { name: 'collaborative-learning', widths: [400, 700, 1000], quality: 72 },
];

for (const { name, widths, quality } of jobs) {
  const source = path.join(imagesDir, `${name}.webp`);
  const meta = await sharp(source).metadata();

  for (const width of widths) {
    const targetWidth = Math.min(width, meta.width);
    const out = path.join(imagesDir, `${name}-${width}.webp`);
    await sharp(source).resize({ width: targetWidth }).webp({ quality, effort: 6 }).toFile(out);
    const outMeta = await sharp(out).metadata();
    console.log(`${path.basename(out)}  ${outMeta.width}x${outMeta.height}  ${(fs.statSync(out).size / 1024).toFixed(1)} KiB`);
  }
}
