import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const logoDir = join(publicDir, 'logo');
const appDir = join(__dirname, '..', 'app');

// Read the source icon PNG (512x512)
const iconBuffer = readFileSync(join(logoDir, 'icon-512.png'));

async function generateFavicons() {
  console.log('Generating favicon variants from icon-512.png...');

  // Generate PNG variants in logo directory
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
  ];

  for (const { name, size } of sizes) {
    await sharp(iconBuffer)
      .resize(size, size)
      .png()
      .toFile(join(logoDir, name));
    console.log(`  ✓ logo/${name}`);
  }

  // Generate ICO file (contains 16x16 and 32x32) - place in app directory for Next.js
  const png16 = await sharp(iconBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(iconBuffer).resize(32, 32).png().toBuffer();
  
  const icoBuffer = await pngToIco([png16, png32]);
  // Place favicon.ico in app directory for Next.js 13+ automatic handling
  writeFileSync(join(appDir, 'favicon.ico'), icoBuffer);
  console.log('  ✓ app/favicon.ico');
  // Also place in public for legacy support
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('  ✓ public/favicon.ico');

  // Generate OG image (1200x630)
  const ogSvg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFFFFF"/>
          <stop offset="50%" style="stop-color:#FFF7ED"/>
          <stop offset="100%" style="stop-color:#FFEDE0"/>
        </linearGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#FF5F1F"/>
          <stop offset="100%" style="stop-color:#FF7A45"/>
        </linearGradient>
      </defs>
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGrad)"/>
      <!-- Subtle grid pattern -->
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1" fill="rgba(0,0,0,0.05)"/>
      </pattern>
      <rect width="1200" height="630" fill="url(#grid)"/>
      <!-- Logo circle -->
      <circle cx="600" cy="240" r="100" fill="url(#textGrad)"/>
      <path d="M640 208c0-22.1-17.9-40-40-40h-36c-6.6 0-12 5.4-12 12s5.4 12 12 12h36c8.8 0 16 7.2 16 16s-7.2 16-16 16h-24c-22.1 0-40 17.9-40 40s17.9 40 40 40h36c6.6 0 12-5.4 12-12s-5.4-12-12-12h-36c-8.8 0-16-7.2-16-16s7.2-16 16-16h24c22.1 0 40-17.9 40-40z" fill="white" transform="translate(0, 16)"/>
      <!-- Text -->
      <text x="600" y="420" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="64" fill="#1a1a1a">Splat Labs</text>
      <text x="600" y="480" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="28" fill="#6B7280">Host &amp; Share Gaussian Splats in the Cloud</text>
      <!-- ROCK Robotic branding -->
      <text x="600" y="580" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="20" fill="#FF5F1F">by ROCK Robotic</text>
    </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .jpeg({ quality: 90 })
    .toFile(join(publicDir, 'og', 'default.jpg'));
  console.log('  ✓ og/default.jpg');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
