const fs = require('fs');

const annadanPage = fs.readFileSync('c:/Users/241031/Desktop/nashik/src/app/annadan/page.tsx', 'utf8');

const msStart = annadanPage.indexOf('const MS =');
const msEnd = annadanPage.indexOf('function Topbar', msStart);

const topbarStart = annadanPage.indexOf('function Topbar');
const topbarEnd = annadanPage.indexOf('function Navbar', topbarStart);

const navbarStart = annadanPage.indexOf('function Navbar');
const navbarEnd = annadanPage.indexOf('function Footer', navbarStart);

const footerStart = annadanPage.indexOf('function Footer');
const footerEnd = annadanPage.indexOf('export default function AnnadanPage', footerStart);

const MS = annadanPage.substring(msStart, msEnd);
const Topbar = annadanPage.substring(topbarStart, topbarEnd);
const Navbar = annadanPage.substring(navbarStart, navbarEnd);
const Footer = annadanPage.substring(footerStart, footerEnd);

let html = `
      <main className="w-full pt-[116px] bg-[#fcf9f4] min-h-[calc(100vh-116px)]">
        {/* Page Header */}
        <div className="bg-white border-b border-[#e5e2dd] pb-8 pt-6">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <nav className="flex items-center gap-2 text-[11px] text-[#897267] mb-4">
              <Link href="/" className="hover:text-[#984300] transition-colors uppercase tracking-wider font-semibold">Home</Link>
              <span>/</span>
              <span className="text-[#984300] font-semibold uppercase tracking-wider">Pure Veg &amp; Satvik Restaurants</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#ffdbca] text-[#984300] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                  <MS name="restaurant" cls="text-[14px]" />
                  Satvik &amp; Pure Veg Dining
                </div>
                <h1 className="text-[32px] sm:text-[40px] leading-tight font-semibold text-[#1c1c19] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Nashik Culinary Guide
                </h1>
                <p className="text-[#564339] mt-2 max-w-xl text-[14px] leading-relaxed">
                  Discover highly-rated authentic Maharashtrian Thali, Misal Pav hotspots, and 100% pure vegetarian restaurants safe for pilgrims.
                </p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mt-8 relative max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MS name="search" cls="text-[#897267] text-[24px]" />
              </div>
              <input
                type="text"
                placeholder="Search by restaurant name, cuisine (e.g., Thali, Misal), or location..."
                className="w-full pl-12 pr-4 py-4 bg-[#f6f3ee] border border-[#e5e2dd] rounded-xl text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#984300] focus:bg-white transition-all shadow-sm"
              />
              <button className="absolute inset-y-2 right-2 bg-[#984300] hover:bg-[#ba5814] text-white px-6 rounded-lg font-semibold text-[13px] transition-colors shadow-sm">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[#ffdea5] rounded-full mx-auto flex items-center justify-center text-[#755717]">
                <MS name="ramen_dining" cls="text-[40px]" />
              </div>
              <h2 className="text-[#1c1c19] text-[24px] font-semibold">Restaurant Directory Coming Soon</h2>
              <p className="text-[#564339] max-w-md mx-auto">We are currently verifying the FSSAI licenses and satvik compliance for all listed restaurants. Check back shortly before the Kumbh begins.</p>
            </div>
          </div>
        </div>
      </main>
`;

let output = `'use client';\n\nimport React, { useState } from 'react';\nimport Link from 'next/link';\n\n${MS}\n\n${Topbar}\n\n${Navbar}\n\n${Footer}\n\nexport default function FoodPage() {\n  const [lang, setLang] = useState('English');\n  const [activeNav, setActiveNav] = useState('food');\n  return (\n    <div className="bg-[#fcf9f4] font-body text-[#1c1c19] antialiased min-h-screen flex flex-col">\n      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">\n        <Topbar lang={lang} setLang={setLang} />\n        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />\n      </header>\n      ${html}\n      <Footer />\n    </div>\n  );\n}\n`;

fs.writeFileSync('c:/Users/241031/Desktop/nashik/src/app/food/page.tsx', output);
console.log('Done generating food/page.tsx');
