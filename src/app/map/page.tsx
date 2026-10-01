'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const KumbhSmartMap = dynamic(() => import('@/components/KumbhSmartMap').then(mod => mod.KumbhSmartMap), { ssr: false });

/* ─── Tiny Icon Helper ─────────────────────────────────────────── */
const MS = ({ name, cls = '' }: { name: string; cls?: string }) => (
  <span className={`material-symbols-outlined ${cls}`}>{name}</span>
);

/* ─── MAP DATA ─────────────────────────────────────────────────── */
const LOCATIONS = [
  {
    id: 'ram-kund',
    name: 'Ram Kund Sacred Bathing Ghat',
    type: 'Holy Ghat',
    badgeCls: 'bg-[#bee5fa] text-[#426879]',
    crowd: 'High Crowd',
    crowdCls: 'bg-[#ffdbca] text-[#331200]',
    sub: 'Main Snan Tirtha • Panchavati Riverfront',
    dist: '1.2 km',
    time: '15 min walk',
    wait: '~35 min',
    open: 'Open 24 Hours',
    pinPos: { left: '44%', top: '37%' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0ybb2xj7pGOdhqqIh1qLsJ2jv2c9fozuBYsoGgBslQ1IeaKNCdF3aT7KRaTyWlr_c5cD2ax9AAvZfqssMoVb6mIjNtVqVpsDBAFiJm68H4quinU_I8Z02N1lWC7kwfi0_QAOMtATEVVEuClIr5N-wgsGcDZ5QdAXv44rr5TQT_sPZgZOoOCpiv1ayYooCVNDRafU_hOO0uTxAQW9UMnGIQSu7HRFyY72R-EgZlLaxuRPmqfnFekdSsg',
    category: 'ghat',
  },
  {
    id: 'trimbak',
    name: 'Trimbakeshwar Jyotirlinga Temple',
    type: 'Jyotirlinga Temple',
    badgeCls: 'bg-[#ffdea5] text-[#261900]',
    crowd: 'Bus Shuttle Route #4',
    crowdCls: 'bg-[#f0ede9] text-[#564339]',
    sub: 'Brahmagiri Hills • Origin of River Godavari',
    dist: '28 km',
    time: 'Direct Bus',
    wait: 'Pass Required',
    open: '05:00 AM – 09:00 PM',
    pinPos: { left: '15%', top: '48%' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg',
    category: 'temple',
  },
  {
    id: 'juna-akhada',
    name: 'Shri Panch Dashnam Juna Akhada',
    type: 'Akhada Camp',
    badgeCls: 'bg-[#ffb68e] text-[#773300]',
    crowd: 'Tapovan Sector 2',
    crowdCls: 'bg-[#bee5fa] text-[#426879]',
    sub: 'Naga Sadhu Shibir • Hawan & Darshan 9 AM–6 PM',
    dist: '3.4 km',
    time: 'Free E-Cart',
    wait: 'Satsang Live',
    open: 'Gate #4 Entrance',
    pinPos: { left: '64%', top: '39%' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sXpDjmuwPtmIfzcD6BQW9ixUKQgcDJINrAP6EJKQLKw4wliezr3kTEQMX7w7pRga8IF7n6WRRIHGCt7mO4tVrwVLWxCWLdJPu0j-cKJAcAiilbSD4lOHjizgJsJfMwK_edX3vICEEWJbR_v5Vpva9thFgk1jWlIWEEVXU43EsGbwzN0LAV0OIYMx9utwf0JQAwxW-TMDtg9-j1-15kc5kRu58VJ58uf4GPQZxd1HSKJQ2nWIbxyreQ',
    category: 'camp',
  },
  {
    id: 'bhandara-7',
    name: 'Tapovan Mahaprasad Annadan #7',
    type: 'Verified Free Bhandara',
    badgeCls: 'bg-[#ffdea5] text-[#261900]',
    crowd: '100% Hygienic',
    crowdCls: 'bg-[#e5e2dd] text-[#3e6374]',
    sub: 'Hot satvik thali, filtered drinking water & resting shamiana',
    dist: '2.1 km',
    time: 'Continuous',
    wait: '12,000+ fed/hr',
    open: 'Free Seva 24x7',
    pinPos: { left: '56%', top: '45%' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlG1XW6Qi5I3k9AXm3JgxXCi04uXpNvhLRmD8E1U7Kj6kTbRYboN0RtKbgac5w4QbjKRvh0_DhxklD2OTf838faCggwSW6Bx_rUBxeqT1XICCcuRMUaxJKSUQlLn8NAkvWbmhigPupTgTK7eP-Ju-DbZ8yIxp0Mqr7EA-XNZVkkjGNYgJHcfUrFEuQS2xcLu8_LUFGt4qLGPd8ft6X8QwhYMblr-HSnUc_E5GGwHRMxmKa1aOJbSSXCg',
    category: 'food',
  },
  {
    id: 'medical-center',
    name: 'Kumbh Central Emergency Medical Center',
    type: '50-Bed Field ICU',
    badgeCls: 'bg-[#ffdad6] text-[#93000a]',
    crowd: 'Sector Hospital A',
    crowdCls: 'bg-[#f0ede9] text-[#564339]',
    sub: 'Adjacent to Ram Kund Bridge • Dedicated Cardiac Mobile Unit',
    dist: '800 m',
    time: '6 min walk',
    wait: '18 Doctors',
    open: 'Direct Line: 108',
    pinPos: { left: '37%', top: '32%' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMf7cw1FidMnJUlDTy5cMnPRtnQYSO7YTDs013uMW1LKEyRr8TRDkG5HtthE5pXyuAGeq19CXSld7XHQxIEOvyU0bFeEUbZK0mSmAD5cI_GDv-jNlQmvp2Rrjace7lkhfAePENFKb5fBzwgc4suzOkiNEd37aTmVaCAT22OHVL9zPbWlpT16xuafmmvCNK6jMO_0QPnl4GMVJKFVWN4J9_E60ehjZV0cHi4v2eYeWtNmXZdsWwJSelQ',
    category: 'medical',
  },
  {
    id: 'shuttle-terminal',
    name: 'Nashik Road Station — Panchavati Shuttle',
    type: 'Electric Bus Terminal',
    badgeCls: 'bg-[#bee5fa] text-[#426879]',
    crowd: 'Hub 01',
    crowdCls: 'bg-[#f0ede9] text-[#564339]',
    sub: 'Frequent direct transfers to Ramwadi & Tapovan Outer Ring',
    dist: '8.5 km',
    time: 'Departs every 5 min',
    wait: 'Continuous',
    open: '24 Hours Fleet',
    pinPos: { left: '20%', top: '28%' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe2iU1zFe4tdmgsvTfcRSQBTr1n1LMElnSCQgtUqYKoEN2-FZZ_D4q0rZ1KsKcP4t9Bh99orMw8kbVs8FvpCGg1v6BgEVGioyOLQ21pLM0Qfmia2_6g6UhEviVTbUA2Ft5lEZYcbTJFwBMXK3R3w9Vh0UyeciSWTHOjath1Mb3KmTLDMs3NQyw2hnwRzdSxo-EUNH0Ak6PPDlUODzC8cBWamuj1WiiiOEQ2HnpL6rqlISbytNDlrz5g',
    category: 'parking',
  },
];

function Topbar({ lang, setLang }: { lang: string; setLang: (l: string) => void }) {
  return (
    <div className="bg-[#f6f3ee] border-b border-[#e5e2dd]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-9">
        <div className="flex items-center gap-2">
          <span className="bg-[#984300]/10 text-[#984300] text-[11px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold leading-none">Nashik–Trimbakeshwar 2027</span>
          <span className="text-[#897267] text-[11px] hidden md:inline">•</span>
          <span className="text-[#564339] text-[11px] hidden md:inline">Official Devotee Portal</span>
        </div>
        <div className="hidden lg:flex items-center gap-1 flex-1 max-w-xl mx-6">
          <MS name="campaign" cls="text-[#984300] text-[15px] shrink-0" />
          <p className="text-[11px] text-[#564339] truncate">
            <span className="text-[#984300] font-semibold">Alert:</span> Shahi Snan Schedule Released • Heavy traffic expected on Trimbak Road • Helpdesks active 24x7
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#564339]">
          <div className="flex items-center gap-1">
            <button onClick={() => setLang('mr')} className={`${lang === 'mr' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'} transition-colors`}>मराठी</button>
            <span>|</span>
            <button onClick={() => setLang('hi')} className={`${lang === 'hi' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'} transition-colors`}>हिंदी</button>
            <span>|</span>
            <button onClick={() => setLang('en')} className={`${lang === 'en' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'} transition-colors`}>English</button>
          </div>
          <span className="text-[#ddc1b3]">|</span>
          <a href="tel:112" className="flex items-center gap-1 text-[#ba1a1a] hover:text-[#1c1c19] transition-colors font-semibold">
            <MS name="call" cls="text-[14px]" /><span>112 / 108</span>
          </a>
          <span className="text-[#ddc1b3] hidden sm:inline">|</span>
          <a href="#" className="hover:text-[#984300] transition-colors hidden sm:inline">Help Centre</a>
          <span className="text-[#ddc1b3] hidden sm:inline">|</span>
          <a href="#" className="hover:text-[#984300] transition-colors hidden sm:inline font-medium">My Trip</a>
        </div>
      </div>
    </div>
  );
}

function Navbar({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (n: string) => void }) {
  const links = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'darshan', label: 'Darshan', href: '/darshan' },
    { id: 'map', label: 'Map', href: '/map' },
    { id: 'stay', label: 'Stay', href: '/stay' },
    { id: 'food', label: 'Food', href: '/food' },
    { id: 'annadan', label: 'Annadan', href: '/annadan' },
    { id: 'camps', label: 'Camps & Akhadas', href: '/camps' },
    { id: 'emergency', label: 'Emergency', href: '/emergency' },
    { id: 'lost-and-found', label: 'Lost & Found', href: '/lost-found' },
  ];

  return (
    <div className="bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#e5e2dd]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0 py-1">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Nashik Kumbh Mela 2027 Logo"
              className="h-14 lg:h-16 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>
          <Link href="/">
            <span className="text-[20px] lg:text-[22px] font-bold text-[#984300] tracking-tight leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nashik Kumbh Mela 2027
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-4 h-full">
          {links.map(l => (
            <Link
              key={l.id}
              href={l.href}
              onClick={() => setActiveNav(l.id)}
              className={`h-full flex items-center px-1 text-[13px] transition-colors ${activeNav === l.id
                  ? 'text-[#984300] font-semibold border-b-2 border-[#984300]'
                  : 'text-[#564339] hover:text-[#1c1c19]'
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-9 h-9 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#564339] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors">
            <MS name="search" cls="text-[20px]" />
          </button>
          <a
            href="tel:112"
            className="flex items-center gap-1.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white px-3 py-2 rounded-lg text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-soft-pulse" />
            <span>SOS</span>
          </a>
          <a
            href="/#trip"
            className="bg-[#984300] hover:bg-[#ba5814] text-white px-4 py-2 rounded-lg text-[12px] font-semibold tracking-wide transition-colors shadow-sm hidden sm:inline-flex items-center"
          >
            Plan My Trip
          </a>
          <div className="w-8 h-8 rounded-full bg-[#984300] flex items-center justify-center">
            <MS name="person" cls="text-white text-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
}


export default function SmartMapPage() {
  const [lang, setLang] = useState('en');
  const [activeNav, setActiveNav] = useState('map');
  const [selectedId, setSelectedId] = useState('ram-kund');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [heatmapActive, setHeatmapActive] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const selectedLoc = LOCATIONS.find(l => l.id === selectedId) || LOCATIONS[0];

  const filteredLocations = LOCATIONS.filter(loc => {
    const matchesCat = activeCategory === 'all' || loc.category === activeCategory;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans">
      {/* ─── HEADER BAR ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>

      {/* ─── FULL VIEWPORT MAP LAYOUT ─────── */}
      <main className="w-full pt-[116px] flex-1" style={{ height: '100vh' }}>
        <div className="w-full h-[calc(100vh-116px)]">
          <KumbhSmartMap />
        </div>
      </main>
    </div>
  );
}
