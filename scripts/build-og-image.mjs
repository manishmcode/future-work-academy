/**
 * Builds 1200×630 WebP OG image (1.91:1) via center cover crop — no stretch.
 * Usage: node scripts/build-og-image.mjs [source.webp]
 * Default source: public/images/live-class-mockup.webp (use a wide master if you have one)
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const defaultSource = path.join(root, 'public/images/live-class-mockup.webp');
const source = path.resolve(root, process.argv[2] ?? defaultSource);
const outputs = [
  path.join(root, 'public/images/og-image.webp'),
  path.join(root, 'public/images/live-class-mockup.webp'),
];

const meta = await sharp(source).metadata();
console.log(`Source: ${source} (${meta.width}×${meta.height})`);

const buffer = await sharp(source)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .webp({ quality: 85 })
  .toBuffer();

for (const out of outputs) {
  fs.writeFileSync(out, buffer);
  const outMeta = await sharp(out).metadata();
  console.log(`Wrote ${out} (${outMeta.width}×${outMeta.height}, ${buffer.length} bytes)`);
}
