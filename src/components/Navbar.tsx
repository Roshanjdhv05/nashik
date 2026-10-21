'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  activeNav?: string;
  setActiveNav?: (n: string) => void;
}

export function Topbar() {
  const [lang, setLang] = useState('en');

  return (
    <div className="hidden md:block bg-[#f6f3ee] border-b border-[#e5e2dd]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-9">
        <div className="flex items-center gap-2">
          <span className="bg-[#984300]/10 text-[#984300] text-[11px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
            Nashik–Trimbakeshwar 2027
          </span>
          <span className="text-[#564339] text-[11px]">Official Devotee Portal</span>
        </div>
        <div className="hidden lg:flex items-center gap-1 flex-1 max-w-xl mx-6">
          <span className="material-symbols-outlined text-[#984300] text-[15px] shrink-0">campaign</span>
          <p className="text-[11px] text-[#564339] truncate">
            <span className="text-[#984300] font-semibold">Alert:</span> Shahi Snan Schedule Released • Heavy traffic on Trimbak Road • Helpdesks active 24x7
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#564339]">
          <div className="flex items-center gap-1">
            <button onClick={() => setLang('mr')} className={`${lang === 'mr' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'}`}>मराठी</button>
            <span>|</span>
            <button onClick={() => setLang('hi')} className={`${lang === 'hi' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'}`}>हिंदी</button>
            <span>|</span>
            <button onClick={() => setLang('en')} className={`${lang === 'en' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'}`}>English</button>
          </div>
          <a href="tel:112" className="flex items-center gap-1 text-[#ba1a1a] font-semibold">
            <span className="material-symbols-outlined text-[14px]">call</span><span>112 / 108</span>
          </a>
          <a href="#" className="hover:text-[#984300]">Help Centre</a>
          <a href="#" className="hover:text-[#984300] font-medium">My Trip</a>
        </div>
      </div>
    </div>
  );
}

export function Navbar({ activeNav = 'home', setActiveNav }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'darshan', label: 'Darshan', href: '/darshan' },
    { id: 'map', label: 'Map', href: '/map' },
    { id: 'stay', label: 'Stay', href: '/stay' },
    { id: 'food', label: 'Food & Services', href: '/food' },
    { id: 'annadan', label: 'Annadan', href: '/annadan' },
    { id: 'camps', label: 'Camps & Akhadas', href: '/camps' },
    { id: 'emergency', label: 'Emergency', href: '/emergency' },
    { id: 'lost-and-found', label: 'Lost & Found', href: '/lost-found' },
  ];

  return (
    <>
      {/* ── MOBILE COMPACT TOP NAVBAR (phone screen) ── */}
      <div className="flex md:hidden items-center justify-between px-3 h-14 bg-white/95 backdrop-blur-md border-b border-[#e8e4df]">
        {/* Left: 3-Lines (Hamburger) button + Logo + Title */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="w-9 h-9 flex items-center justify-center text-[#3c2e28] active:bg-black/5 rounded-lg"
          >
            <span className="material-symbols-outlined text-[26px]">menu</span>
          </button>

          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-[15px] font-bold text-[#3c2e28] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Nashik Kumbh
                </span>
                <span className="text-[12px] font-bold text-[#b87635]">2027</span>
              </div>
              <span className="text-[9.5px] text-[#786d66] font-medium tracking-tight">Devotee Travel Companion</span>
            </div>
          </Link>
        </div>

        {/* Right: Search icon + SOS button */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-[#f4f0eb] flex items-center justify-center text-[#564339]">
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>
          <a href="tel:112" className="flex items-center gap-1.5 bg-[#ba1a1a] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>SOS</span>
          </a>
        </div>
      </div>

      {/* ── LEFT SIDE DRAWER (Opens from Left) ── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-[200] flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Left Slide-out Content */}
          <div className="relative w-72 max-w-[80vw] bg-[#fcf9f4] h-full shadow-2xl flex flex-col z-[210] animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="p-4 bg-white border-b border-[#e5e2dd] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                <div>
                  <div className="text-[14px] font-bold text-[#984300]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Nashik Kumbh Mela
                  </div>
                  <div className="text-[10px] text-[#897267]">Official Devotee Portal 2027</div>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#564339]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-2">
              {links.map(l => {
                const isActive = activeNav === l.id;
                return (
                  <Link
                    key={l.id}
                    href={l.href}
                    onClick={() => {
                      if (setActiveNav) setActiveNav(l.id);
                      setDrawerOpen(false);
                    }}
                    className={`flex items-center gap-3 px-5 py-3 text-[13.5px] font-medium transition-colors border-b border-[#f3efe8] ${isActive
                        ? 'text-[#984300] bg-[#fff3ea] border-l-4 border-l-[#984300] font-semibold'
                        : 'text-[#564339] hover:bg-[#f5f1ea]'
                      }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-white border-t border-[#e5e2dd] space-y-2.5">
              <a
                href="tel:112"
                className="w-full flex items-center justify-center gap-2 bg-[#ba1a1a] text-white py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-wider shadow"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                Emergency Hotline (112 / 108)
              </a>
              <a
                href="/#trip"
                className="w-full flex items-center justify-center gap-2 bg-[#984300] text-white py-2.5 rounded-lg text-[12px] font-semibold tracking-wide shadow"
              >
                Plan My Trip
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── DESKTOP FULL NAVBAR ── */}
      <div className="hidden md:flex bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#e5e2dd]">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0 py-1">
            <Link href="/">
              <img src="/logo.png" alt="Nashik Kumbh Mela 2027 Logo" className="h-14 lg:h-16 w-auto object-contain hover:scale-105 transition-transform" />
            </Link>
            <Link href="/">
              <span className="text-[20px] lg:text-[22px] font-bold text-[#984300] tracking-tight leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
                Nashik Kumbh Mela 2027
              </span>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-4 h-full">
            {links.map(l => (
              <Link
                key={l.id}
                href={l.href}
                onClick={() => setActiveNav && setActiveNav(l.id)}
                className={`h-full flex items-center px-1 text-[13px] transition-colors ${activeNav === l.id
                    ? 'text-[#984300] font-semibold border-b-2 border-[#984300]'
                    : 'text-[#564339] hover:text-[#1c1c19]'
                  }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/get-connected"
              className="flex items-center gap-1.5 bg-[#984300]/10 hover:bg-[#984300]/15 text-[#984300] px-3 py-2 rounded-lg text-[12px] font-bold transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px]">groups</span>
              <span>Get Connected</span>
            </Link>
            <button className="w-9 h-9 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#564339] hover:bg-[#ebe8e3] transition-colors">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <a
              href="tel:112"
              className="flex items-center gap-1.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white px-3 py-2 rounded-lg text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>SOS</span>
            </a>

          </div>
        </div>
      </div>
    </>
  );
}
