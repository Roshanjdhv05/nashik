const fs = require('fs');

const path = 'src/app/map/page.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Replace the main area
const startStr = "{/* ─── MAIN CONTENT AREA: 30% Sidebar & 70% Map Canvas ─────── */}";
const startIndex = content.indexOf(startStr);
const endStr = "</footer>";
const endIndex = content.lastIndexOf(endStr) + endStr.length;

const newMain = `{/* ─── MAIN CONTENT AREA ─────── */}
      <main className="w-full pt-[116px] bg-[#fcf9f4] flex-1 min-h-[calc(100vh-116px)]">
        <div className="w-full h-full lg:h-[calc(100vh-116px)] flex flex-col p-4 max-w-7xl mx-auto">
          <KumbhSmartMap />
        </div>
      </main>

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer className="w-full bg-[#31302d] text-[#f3f0eb] border-t border-[#42403c]">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#e5e2dd]">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain brightness-200" />
            <span className="font-semibold text-white">Nashik Kumbh Mela 2027 — Smart Map Navigation</span>
          </div>
          <div className="flex items-center gap-4 text-[#ffb68e]">
            <span>Helpline: 1800-2027-00</span>
            <span>• Police: 112</span>
            <span>• Medical: 108</span>
          </div>
        </div>
      </footer>`;

content = content.substring(0, startIndex) + newMain + content.substring(endIndex);

// Add import
if (!content.includes("KumbhSmartMap")) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { KumbhSmartMap } from '@/components/KumbhSmartMap';");
}

fs.writeFileSync(path, content);
console.log('Done!');
