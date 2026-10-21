/**
 * Builds the 1200x630 social share (Open Graph / X) image: hero screenshot with headline and CTA overlay.
 * Usage: node scripts/build-og-image.mjs [source-image]
 * Default source: public/images/futurework-learning-hero.webp
 *
 * Social platforms cache images by URL, so bump the output filename (and COMPANY.ogImageUrl / index.html)
 * whenever the design changes.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const defaultSource = path.join(root, 'public/images/futurework-learning-hero.webp');
const source = path.resolve(root, process.argv[2] ?? defaultSource);
const output = path.join(root, 'public/images/og-image-v2.webp');

const WIDTH = 1200;
const HEIGHT = 630;
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const overlay = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0f172a" stop-opacity="0.97"/>
      <stop offset="0.5" stop-color="#0f172a" stop-opacity="0.9"/>
      <stop offset="0.78" stop-color="#0f172a" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0f172a" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fade)"/>

  <text x="72" y="104" font-family="${FONT}" font-size="26" font-weight="700" fill="#ffffff">FutureWork<tspan fill="#ec4899">Academy</tspan></text>

  <rect x="72" y="150" width="252" height="38" rx="19" fill="none" stroke="#ec4899" stroke-opacity="0.7" stroke-width="2"/>
  <text x="198" y="175" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="700" letter-spacing="2.5" fill="#f9a8d4">VIDEO + LIVE CLASSES</text>

  <text font-family="${FONT}" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-1">
    <tspan x="72" y="272">Learn AI &amp;</tspan>
    <tspan x="72" y="346">Productivity Skills</tspan>
  </text>

  <text x="72" y="408" font-family="${FONT}" font-size="25" font-weight="500" fill="#cbd5e1">Practical courses for remote work, freelancing</text>
  <text x="72" y="442" font-family="${FONT}" font-size="25" font-weight="500" fill="#cbd5e1">and online business.</text>

  <rect x="72" y="486" width="282" height="66" rx="16" fill="#db2777"/>
  <text x="213" y="528" text-anchor="middle" font-family="${FONT}" font-size="25" font-weight="700" fill="#ffffff">Start Learning  →</text>

  <text x="380" y="528" font-family="${FONT}" font-size="21" font-weight="600" fill="#94a3b8">futureworkacademy.net</text>
</svg>`;

const meta = await sharp(source).metadata();
console.log(`Source: ${source} (${meta.width}×${meta.height})`);

const background = await sharp(source)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
  .toBuffer();

await sharp(background)
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .webp({ quality: 85 })
  .toFile(output);

const outMeta = await sharp(output).metadata();
console.log(`Wrote ${output} (${outMeta.width}×${outMeta.height}, ${(fs.statSync(output).size / 1024).toFixed(1)} KiB)`);
