const fs = require('fs');

const raw = fs.readFileSync('c:/Users/241031/Desktop/nashik/scratch/food_raw.html', 'utf8');

const startSearch = '<div class="flex flex-wrap items-center gap-2 px-4 md:px-6 pt-6 pb-2">';
let startIdx = raw.indexOf(startSearch);

const endSearch = '</main>';
let endIdx = raw.indexOf(endSearch, startIdx) + endSearch.length;

let bodyHtml = raw.substring(startIdx, endIdx);

// Convert class=" to className="
bodyHtml = bodyHtml.replace(/class="/g, 'className="');
// Fix self-closing tags
bodyHtml = bodyHtml.replace(/<input([^>]*?)>/g, (match, inner) => {
    if (inner.endsWith('/')) return match;
    return `<input${inner}/>`;
});
bodyHtml = bodyHtml.replace(/<img([^>]*?)>/g, (match, inner) => {
    if (inner.endsWith('/')) return match;
    return `<img${inner}/>`;
});

// For path and rect, if the original had </path>, let's just restore them to <path ...></path>
// But wait, it's easier to just strip </path> if we already self-closed it.
// Actually, earlier I did: 
// return `<path${inner}/>`;
// Which means I can just remove `</path>` and `</rect>` completely.
bodyHtml = bodyHtml.replace(/<path([^>]*?)>/g, (match, inner) => {
    if (inner.endsWith('/')) return match;
    return `<path${inner}/>`;
});
bodyHtml = bodyHtml.replace(/<\/path>/g, '');

bodyHtml = bodyHtml.replace(/<rect([^>]*?)>/g, (match, inner) => {
    if (inner.endsWith('/')) return match;
    return `<rect${inner}/>`;
});
bodyHtml = bodyHtml.replace(/<\/rect>/g, '');


// HTML comments to JSX comments
bodyHtml = bodyHtml.replace(/<!--(.*?)-->/g, '{/* $1 */}');

// Fix selected=""
bodyHtml = bodyHtml.replace(/selected=""/g, 'defaultValue="something"');

// Fix inline styles like style="font-variation-settings: 'FILL' 1;"
bodyHtml = bodyHtml.replace(/style="([^"]+)"/g, (match, styleString) => {
    if (styleString.includes('FILL')) {
        return 'style={{ fontVariationSettings: "\\\'FILL\\\' 1" }}';
    }
    return match;
});
// Fix viewBox
bodyHtml = bodyHtml.replace(/viewbox=/g, 'viewBox=');
// Fix disabled=""
bodyHtml = bodyHtml.replace(/disabled=""/g, 'disabled');

// Extract Topbar, Navbar, Footer from annadan
const annadanPage = fs.readFileSync('c:/Users/241031/Desktop/nashik/src/app/annadan/page.tsx', 'utf8');

const msStart = annadanPage.indexOf('const MS =');
const msEnd = annadanPage.indexOf('function Topbar', msStart);
const MS = annadanPage.substring(msStart, msEnd);

const topbarStart = annadanPage.indexOf('function Topbar');
const topbarEnd = annadanPage.indexOf('function Navbar', topbarStart);
const Topbar = annadanPage.substring(topbarStart, topbarEnd);

const navbarStart = annadanPage.indexOf('function Navbar');
const navbarEnd = annadanPage.indexOf('function Footer', navbarStart);
const Navbar = annadanPage.substring(navbarStart, navbarEnd);

const footerStart = annadanPage.indexOf('function Footer');
const footerEnd = annadanPage.indexOf('export default function AnnadanPage', footerStart);
const Footer = annadanPage.substring(footerStart, footerEnd);

let output = `'use client';\n\nimport React, { useState } from 'react';\nimport Link from 'next/link';\n\n${MS}\n\n${Topbar}\n\n${Navbar}\n\n${Footer}\n\nexport default function FoodPage() {\n  const [lang, setLang] = useState('English');\n  const [activeNav, setActiveNav] = useState('food');\n  return (\n    <div className="bg-[#fcf9f4] font-body text-[#1c1c19] antialiased min-h-screen flex flex-col">\n      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">\n        <Topbar lang={lang} setLang={setLang} />\n        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />\n      </header>\n      <div className="pt-[116px]">\n        <div className="w-full max-w-[1440px] mx-auto">\n${bodyHtml}\n        </div>\n      </div>\n      <Footer />\n    </div>\n  );\n}\n`;

fs.writeFileSync('c:/Users/241031/Desktop/nashik/src/app/food/page.tsx', output);
console.log('Done generating food/page.tsx');
