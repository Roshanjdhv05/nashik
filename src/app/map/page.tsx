'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Topbar, Navbar } from '@/components/Navbar';
import { MobileBottomNav } from '@/components/MobileBottomNav';

import Link from 'next/link';

const KumbhSmartMap = dynamic(() => import('@/components/KumbhSmartMap').then(mod => mod.KumbhSmartMap), { ssr: false });

export default function SmartMapPage() {
  const [activeNav, setActiveNav] = useState('map');

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans">
      <header className="fixed top-0 left-0 right-0 z-[60] shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>

      {/* mobile: pt-12 (navbar 48px), desktop: pt-[116px] (topbar 36 + navbar 80) */}
      <main className="w-full flex-1 pt-12 md:pt-[116px] relative" style={{ height: '100vh' }}>
        {/* mobile: subtract navbar(48) + bottomnav(54) = 102px; desktop: subtract header(116px) */}
        <div className="w-full h-[calc(100vh-102px)] md:h-[calc(100vh-116px)]">
          <KumbhSmartMap />
        </div>

        {/* Floating action button: Get Connected */}
        <Link
          href="/get-connected"
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 bg-[#984300] hover:bg-[#803800] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs md:text-sm font-bold border-2 border-white transition active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">groups</span>
          <span>Find My Group</span>
        </Link>
      </main>

      <MobileBottomNav active="map" />
    </div>
  );
}
