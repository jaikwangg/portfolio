const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const files = fs.readdirSync(publicDir).filter(f => f.startsWith('project-') && f.endsWith('.png'));

async function optimizeImages() {
  console.log('🖼️  Optimizing images...\n');
  
  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const stats = fs.statSync(inputPath);
    const sizeBefore = (stats.size / 1024 / 1024).toFixed(2);
    
    try {
      await sharp(inputPath)
        .resize(1200, null, { // Max width 1200px
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 85 }) // Convert to WebP with 85% quality
        .toFile(inputPath.replace('.png', '.webp'));
      
      // 2400px variant for the full-bleed project detail hero (1440px wide at 2x).
      await sharp(inputPath)
        .resize(2400, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 80 })
        .toFile(inputPath.replace(/\.png$/, '@2x.webp'));

      const webpStats = fs.statSync(inputPath.replace('.png', '.webp'));
      const sizeAfter = (webpStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - webpStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`✓ ${file}`);
      console.log(`  ${sizeBefore}MB → ${sizeAfter}MB (${reduction}% reduction)\n`);
    } catch (error) {
      console.error(`✗ Failed to optimize ${file}:`, error.message);
    }
  }
  
  console.log('✨ Done!');
}

optimizeImages();
