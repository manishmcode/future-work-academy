/**
 * Renders brand logos from public/favicon.svg + the "FutureWorkAcademy" wordmark (Inter Bold, as in the navbar):
 *   public/images/logo.webp       horizontal logo (icon + wordmark), used for schema.org Organization.logo
 *   public/images/logo-icon.webp  512x512 icon only
 * Usage: npm run build:logo
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const iconSource = path.join(root, 'public/favicon.svg');
const fontFile = path.join(__dirname, 'fonts/Inter-Bold.otf');
const imagesDir = path.join(root, 'public/images');

const ICON_SIZE = 240;
const GAP = 64;
const PADDING = 40;
const TEXT_COLOR = '#0f172a';

const renderIcon = (size) => sharp(iconSource, { density: 1200 }).resize(size, size).png().toBuffer();

const report = async (file) => {
  const meta = await sharp(file).metadata();
  console.log(`Wrote ${file} (${meta.width}x${meta.height}, ${(fs.statSync(file).size / 1024).toFixed(1)} KiB)`);
};

const iconOut = path.join(imagesDir, 'logo-icon.webp');
await sharp(await renderIcon(512)).webp({ quality: 95, alphaQuality: 100 }).toFile(iconOut);
await report(iconOut);

const wordmark = await sharp({
  text: {
    text: `<span foreground="${TEXT_COLOR}" letter_spacing="-2048">FutureWorkAcademy</span>`,
    font: 'Inter Bold',
    fontfile: fontFile,
    dpi: 620,
    rgba: true,
  },
})
  .png()
  .toBuffer();
const wordmarkMeta = await sharp(wordmark).metadata();

const width = PADDING * 2 + ICON_SIZE + GAP + wordmarkMeta.width;
const height = PADDING * 2 + Math.max(ICON_SIZE, wordmarkMeta.height);

const logoOut = path.join(imagesDir, 'logo.webp');
await sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: await renderIcon(ICON_SIZE), left: PADDING, top: Math.round((height - ICON_SIZE) / 2) },
    { input: wordmark, left: PADDING + ICON_SIZE + GAP, top: Math.round((height - wordmarkMeta.height) / 2) },
  ])
  .webp({ quality: 95, alphaQuality: 100 })
  .toFile(logoOut);
await report(logoOut);
