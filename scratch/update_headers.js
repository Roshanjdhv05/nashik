const fs = require('fs');

// Read standard components from camps/page.tsx
const campsContent = fs.readFileSync('src/app/camps/page.tsx', 'utf8');
const topbarMatch = campsContent.match(/function Topbar[\s\S]*?\n\}\n/);
const navbarMatch = campsContent.match(/function Navbar[\s\S]*?\n\}\n/);

const topbarCode = topbarMatch[0];
const navbarCode = navbarMatch[0];

function fixPage(filePath, navId) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert Topbar and Navbar before the default export
  if (!content.includes('function Topbar')) {
    content = content.replace(/export default function/, `${topbarCode}\n${navbarCode}\n\nexport default function`);
  }

  // Add state variables
  if (!content.includes('const [lang, setLang]')) {
    content = content.replace(/export default function[^{]+\{\n/, `$&  const [lang, setLang] = useState('en');\n  const [activeNav, setActiveNav] = useState('${navId}');\n`);
  }

  // Replace <header>...</header> with the standardized header
  content = content.replace(/<header[\s\S]*?<\/header>/, 
`      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>`);

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

fixPage('src/app/darshan/page.tsx', 'darshan');
fixPage('src/app/map/page.tsx', 'map');
