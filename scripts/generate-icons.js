/**
 * Generate app icons from SVG source
 *
 * This script converts the SVG icon to various PNG sizes needed for:
 * - iOS (icon.png)
 * - Android (adaptive-icon.png, foreground, background, monochrome)
 * - Web (favicon.png)
 *
 * Requires: sharp package
 * Install: npm install --save-dev sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = {
  'icon.png': 1024,
  'icon-512.png': 512,
  'adaptive-icon.png': 1024,
  'favicon.png': 48,
  'splash-icon.png': 1024,
};

const assetsDir = path.join(__dirname, '..', 'assets');
const imagesDir = path.join(assetsDir, 'images');
const svgPath = path.join(imagesDir, 'icon-source.svg');

async function generateIcons() {
  console.log('🎨 Generating app icons from SVG...\n');

  if (!fs.existsSync(svgPath)) {
    console.error('❌ Error: icon-source.svg not found at:', svgPath);
    process.exit(1);
  }

  // Read SVG
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate main icons
  for (const [filename, size] of Object.entries(SIZES)) {
    const outputPath = path.join(assetsDir, filename);

    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated: ${filename} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${filename}:`, error.message);
    }
  }

  // Generate Android Adaptive Icon Foreground (with safe zone)
  const foregroundSize = 432; // 432/1024 = 42.2% (center safe zone for adaptive icons)
  const foregroundCanvas = 1024;
  const foregroundPadding = (foregroundCanvas - foregroundSize) / 2;

  try {
    await sharp(svgBuffer)
      .resize(foregroundSize, foregroundSize)
      .extend({
        top: Math.floor(foregroundPadding),
        bottom: Math.ceil(foregroundPadding),
        left: Math.floor(foregroundPadding),
        right: Math.ceil(foregroundPadding),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(assetsDir, 'adaptive-icon-foreground.png'));

    console.log(`✅ Generated: adaptive-icon-foreground.png (1024x1024 with padding)`);
  } catch (error) {
    console.error('❌ Failed to generate adaptive-icon-foreground.png:', error.message);
  }

  // Generate Android Adaptive Icon Background (solid color)
  try {
    await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: 255, g: 107, b: 107, alpha: 1 } // #FF6B6B
      }
    })
      .png()
      .toFile(path.join(assetsDir, 'adaptive-icon-background.png'));

    console.log(`✅ Generated: adaptive-icon-background.png (1024x1024 solid color)`);
  } catch (error) {
    console.error('❌ Failed to generate adaptive-icon-background.png:', error.message);
  }

  // Generate monochrome version (for Android 13+)
  try {
    await sharp(svgBuffer)
      .resize(1024, 1024)
      .greyscale()
      .threshold(128) // Convert to pure black and white
      .png()
      .toFile(path.join(assetsDir, 'adaptive-icon-monochrome.png'));

    console.log(`✅ Generated: adaptive-icon-monochrome.png (1024x1024 monochrome)`);
  } catch (error) {
    console.error('❌ Failed to generate adaptive-icon-monochrome.png:', error.message);
  }

  console.log('\n✨ Icon generation complete!');
  console.log('\n📦 Generated files:');
  console.log('   - icon.png (1024x1024) - Main app icon');
  console.log('   - icon-512.png (512x512) - Google Play');
  console.log('   - adaptive-icon.png (1024x1024) - Android adaptive base');
  console.log('   - adaptive-icon-foreground.png - Android foreground layer');
  console.log('   - adaptive-icon-background.png - Android background layer');
  console.log('   - adaptive-icon-monochrome.png - Android monochrome (13+)');
  console.log('   - favicon.png (48x48) - Web favicon');
  console.log('   - splash-icon.png (1024x1024) - Splash screen');
  console.log('\n💡 Next steps:');
  console.log('   1. Review generated icons in assets/ folder');
  console.log('   2. Test on device: npx expo start');
  console.log('   3. Build: eas build');
}

generateIcons().catch(console.error);
