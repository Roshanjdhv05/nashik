const fs = require('fs');
const path = require('path');

// Helper: Convert HTML body content to JSX
function htmlToJsx(html) {
  let jsx = html;

  // Remove HTML comments (inline)
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, (match, inner) => {
    const clean = inner.replace(/\n/g, ' ').trim();
    return `{/* ${clean} */}`;
  });

  // class= -> className=
  jsx = jsx.replace(/ class="/g, ' className="');

  // Self-close void tags
  jsx = jsx.replace(/<input([^>]*?)>/g, (m, inner) => inner.trim().endsWith('/') ? m : `<input${inner}/>`);
  jsx = jsx.replace(/<img([^>]*?)>/g, (m, inner) => inner.trim().endsWith('/') ? m : `<img${inner}/>`);
  jsx = jsx.replace(/<br([^>]*?)>/g, (m, inner) => `<br${inner}/>`);
  jsx = jsx.replace(/<hr([^>]*?)>/g, (m, inner) => `<hr${inner}/>`);

  // Self-close SVG void tags
  jsx = jsx.replace(/<path([^>]*?)>/g, (m, inner) => inner.trim().endsWith('/') ? m : `<path${inner}/>`);
  jsx = jsx.replace(/<\/path>/g, '');
  jsx = jsx.replace(/<rect([^>]*?)>/g, (m, inner) => inner.trim().endsWith('/') ? m : `<rect${inner}/>`);
  jsx = jsx.replace(/<\/rect>/g, '');
  jsx = jsx.replace(/<circle([^>]*?)>/g, (m, inner) => inner.trim().endsWith('/') ? m : `<circle${inner}/>`);
  jsx = jsx.replace(/<\/circle>/g, '');
  jsx = jsx.replace(/<line([^>]*?)>/g, (m, inner) => inner.trim().endsWith('/') ? m : `<line${inner}/>`);
  jsx = jsx.replace(/<\/line>/g, '');

  // Fix SVG attribute cases
  jsx = jsx.replace(/viewbox=/g, 'viewBox=');
  jsx = jsx.replace(/clippath/g, 'clipPath');
  jsx = jsx.replace(/clipPath id=/g, 'clipPath id=');
  jsx = jsx.replace(/clip-path=/g, 'clipPath=');

  // Fix HTML entities in text content (not in attributes)
  jsx = jsx.replace(/&amp;/g, '&');
  jsx = jsx.replace(/&lt;/g, '{`<`}');
  jsx = jsx.replace(/&gt;/g, '›');  // replace > with safe unicode
  jsx = jsx.replace(/&nbsp;/g, '\u00a0');

  // Remove inline <script> blocks (not valid in JSX)
  jsx = jsx.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Fix <br//> -> <br/>
  jsx = jsx.replace(/<br\/\/>/g, '<br/>');

  // Fix boolean attributes
  jsx = jsx.replace(/disabled=""/g, 'disabled');
  jsx = jsx.replace(/selected=""/g, '');
  jsx = jsx.replace(/checked=""/g, 'defaultChecked');
  jsx = jsx.replace(/required=""/g, 'required');
  jsx = jsx.replace(/crossorigin=""/g, 'crossOrigin=""');

  // Fix inline style with single quotes (font-variation-settings)
  jsx = jsx.replace(/style="font-variation-settings: '([^']+)' ([^;]+);?"/g, (match, prop, val) => {
    return `style={{ fontVariationSettings: "'${prop}' ${val.trim()}" }}`;
  });

  // Fix for= -> htmlFor=
  jsx = jsx.replace(/ for="/g, ' htmlFor="');

  // Fix tabindex -> tabIndex
  jsx = jsx.replace(/tabindex=/g, 'tabIndex=');

  // Fix event handlers: onclick -> onClick, onsubmit -> onSubmit, onchange -> onChange
  jsx = jsx.replace(/ onclick=/g, ' onClick=');
  jsx = jsx.replace(/ onsubmit=/g, ' onSubmit=');
  jsx = jsx.replace(/ onchange=/g, ' onChange=');
  jsx = jsx.replace(/ oninput=/g, ' onInput=');
  jsx = jsx.replace(/ onfocus=/g, ' onFocus=');
  jsx = jsx.replace(/ onblur=/g, ' onBlur=');

  // Replace string onclick/onsubmit values with empty arrow functions to avoid TS errors
  jsx = jsx.replace(/ onClick="[^"]*"/g, ' onClick={() => {}}');
  jsx = jsx.replace(/ onSubmit="[^"]*"/g, ' onSubmit={(e) => e.preventDefault()}');
  jsx = jsx.replace(/ onChange="[^"]*"/g, ' onChange={() => {}}');

  // Fix rowspan/colspan -> rowSpan/colSpan
  jsx = jsx.replace(/ rowspan=/g, ' rowSpan=');
  jsx = jsx.replace(/ colspan=/g, ' colSpan=');

  // Fix numeric HTML attributes that need curly braces (rows, cols, maxLength, size, tabIndex, etc.)
  jsx = jsx.replace(/ (rows|cols|maxlength|size|tabIndex|width|height|span)="(\d+)"/g, (match, attr, val) => {
    const camel = attr === 'maxlength' ? 'maxLength' : attr;
    return ` ${camel}={${val}}`;
  });

  // Fix style="string" that's not font-variation-settings into style={{}}
  // Already handled font-variation-settings above; fix remaining string styles
  jsx = jsx.replace(/style="([^"]+)"/g, (match, styleStr) => {
    if (styleStr.startsWith('{{')) return match; // Already JSX
    // Convert CSS string to JS object
    const props = styleStr.split(';').filter(s => s.trim()).map(prop => {
      const [key, ...vals] = prop.split(':');
      if (!key || !vals.length) return null;
      const cssKey = key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const cssVal = vals.join(':').trim();
      return `${cssKey}: "${cssVal}"`;
    }).filter(Boolean);
    return `style={{ ${props.join(', ')} }}`;
  });

  // Fix stroke-width, stroke-linecap etc. (hyphenated SVG attrs)
  jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
  jsx = jsx.replace(/clip-rule=/g, 'clipRule=');

  // Remove data-path, data-active-classes attributes (not needed in React)
  // Keep them as they don't cause errors

  return jsx;
}

// Read annadan page to extract Topbar/Navbar/Footer
const annadanPage = fs.readFileSync('c:/Users/241031/Desktop/nashik/src/app/annadan/page.tsx', 'utf8');

const msStart = annadanPage.indexOf('const MS =');
const msEnd = annadanPage.indexOf('function Topbar', msStart);
const MS = annadanPage.substring(msStart, msEnd).trim();

const topbarStart = annadanPage.indexOf('function Topbar');
const topbarEnd = annadanPage.indexOf('function Navbar', topbarStart);
const Topbar = annadanPage.substring(topbarStart, topbarEnd).trim();

const navbarStart = annadanPage.indexOf('function Navbar');
const navbarEnd = annadanPage.indexOf('function Footer', navbarStart);
const Navbar = annadanPage.substring(navbarStart, navbarEnd).trim();

const footerStart = annadanPage.indexOf('function Footer');
const footerEnd = annadanPage.indexOf('export default function AnnadanPage', footerStart);
const Footer = annadanPage.substring(footerStart, footerEnd).trim();

const sharedComponents = `${MS}\n\n${Topbar}\n\n${Navbar}\n\n${Footer}`;

// Pages config
const pages = [
  {
    file: 'C:/Users/241031/.gemini/antigravity-ide/brain/56cb416c-d5d6-4a6a-849d-3e1fdad7e18a/.system_generated/steps/490/content.md',
    outDir: 'c:/Users/241031/Desktop/nashik/src/app/lost-found',
    componentName: 'LostFoundPage',
    activeNav: 'lost-and-found',
    // The <main> content starts after </header>
    startMarker: '<main class=',
    endMarker: '</main>',
  },
  {
    file: 'C:/Users/241031/.gemini/antigravity-ide/brain/56cb416c-d5d6-4a6a-849d-3e1fdad7e18a/.system_generated/steps/492/content.md',
    outDir: 'c:/Users/241031/Desktop/nashik/src/app/emergency',
    componentName: 'EmergencyPage',
    activeNav: 'emergency',
    startMarker: '<main class=',
    endMarker: '</main>',
  },
  {
    file: 'C:/Users/241031/.gemini/antigravity-ide/brain/56cb416c-d5d6-4a6a-849d-3e1fdad7e18a/.system_generated/steps/494/content.md',
    outDir: 'c:/Users/241031/Desktop/nashik/src/app/camps',
    componentName: 'CampsPage',
    activeNav: 'camps-and-akhadas',
    startMarker: '<main class=',
    endMarker: '</main>',
  },
];

for (const page of pages) {
  // Read the file (it's markdown with HTML inside)
  let rawContent = fs.readFileSync(page.file, 'utf8');

  // Strip markdown header
  const htmlStart = rawContent.indexOf('<!DOCTYPE html>');
  if (htmlStart === -1) {
    console.error(`Could not find HTML in ${page.file}`);
    continue;
  }
  let html = rawContent.substring(htmlStart);

  // Extract the main body section
  const startIdx = html.indexOf(page.startMarker);
  let endIdx = html.indexOf(page.endMarker, startIdx) + page.endMarker.length;

  if (startIdx === -1) {
    console.error(`Could not find ${page.startMarker} in ${page.file}`);
    continue;
  }

  // Get the class value from the main tag
  let mainContent = html.substring(startIdx, endIdx);

  // Replace the outer <main> tag with just its inner content wrapped in a div
  // Extract inner content of main
  const mainTagEnd = mainContent.indexOf('>') + 1;
  const mainInner = mainContent.substring(mainTagEnd, mainContent.lastIndexOf('</main>'));

  // Convert to JSX
  let jsxContent = htmlToJsx(mainInner);

  // Create output directory
  if (!fs.existsSync(page.outDir)) {
    fs.mkdirSync(page.outDir, { recursive: true });
  }

  const output = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

${sharedComponents}

export default function ${page.componentName}() {
  const [lang, setLang] = useState('English');
  const [activeNav, setActiveNav] = useState('${page.activeNav}');
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>
      <main className="w-full pt-[116px] bg-surface min-h-[calc(100vh-116px)]">
        <div className="flex flex-col w-full">
${jsxContent}
        </div>
      </main>
      <Footer />
    </div>
  );
}
`;

  const outPath = path.join(page.outDir, 'page.tsx');
  fs.writeFileSync(outPath, output);
  console.log(`Generated: ${outPath}`);
}

console.log('All pages generated!');
