const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

if (!content.includes('MobileCarousel')) {
  content = content.replace(/import Link from 'next\/link';/, "import Link from 'next/link';\nimport MobileCarousel from '../components/MobileCarousel';\nimport MobileBottomNav from '../components/MobileBottomNav';");
}

// 1. Recommended Stays grid
content = content.replace(
  /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\s*(\{hotels\.map\(\(h\) => \([\s\S]*?<\/div>\s*\)\)\})\s*<\/div>/,
  '<MobileCarousel desktopGridClasses="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n$1\n</MobileCarousel>'
);

// 2. Popular Destinations grid
content = content.replace(
  /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">\s*(\{destinations\.map\(\(dest\) => \([\s\S]*?<\/Link>\s*\)\)\})\s*<\/div>/,
  '<MobileCarousel desktopGridClasses="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">\n$1\n</MobileCarousel>'
);

// 3. Food & Annadan grid
content = content.replace(
  /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">\s*(\{foodSpots\.map\(\(spot\) => \([\s\S]*?<\/Link>\s*\)\)\})\s*<\/div>/,
  '<MobileCarousel desktopGridClasses="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">\n$1\n</MobileCarousel>'
);

// 4. Camps & Akhadas grid (if present, let's just do a generic replace for any .map return block that is a grid)
// Let's explicitly check the 4th grid on line 938
content = content.replace(
  /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">\s*(\{camps\.map\(\(camp\) => \([\s\S]*?<\/Link>\s*\)\)\})\s*<\/div>/,
  '<MobileCarousel desktopGridClasses="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">\n$1\n</MobileCarousel>'
);

// Quick Access Tiles (Line 358)
content = content.replace(
  /<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">\s*(\{tiles\.map\(\(t, i\) => \([\s\S]*?<\/Link>(\s*:\s*<div[\s\S]*?<\/div>)?\s*\)\)\})\s*<\/div>/,
  '<MobileCarousel desktopGridClasses="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">\n$1\n</MobileCarousel>'
);

// Add Bottom Nav
if (!content.includes('<MobileBottomNav')) {
  // Try to find the end of the main layout, before Footer
  content = content.replace(/(<\/div>\s*)(<Footer \/>)/, '<MobileBottomNav activeNav="home" />\n$1$2');
}

fs.writeFileSync('src/app/page.tsx', content);
console.log('Successfully updated page.tsx with responsive components.');
