import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Topbar, Navbar } from '@/components/Navbar';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { GetConnectedWrapper } from '@/components/connected/GetConnectedWrapper';

export const metadata: Metadata = {
  title: 'Get Connected — Live Devotee Group & Family Finder | Nashik Kumbh 2027',
  description:
    'Create private groups, share unguessable QR codes, and share live GPS location with your family and companions during Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans">
      <header className="fixed top-0 left-0 right-0 z-[60] shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar />
        <Navbar activeNav="get-connected" />
      </header>

      {/* mobile: pt-14 (navbar 56px), desktop: pt-[116px] (topbar 36 + navbar 80) */}
      <main className="w-full flex-1 pt-14 md:pt-[116px]" style={{ height: '100vh', overflow: 'hidden' }}>
        <div
          className="w-full flex flex-col"
          style={{ height: 'calc(100vh - 56px)' }}
        >
          <style>{`@media (min-width: 768px) { .gc-main-inner { height: calc(100vh - 116px) !important; } }`}</style>
          <div className="gc-main-inner w-full flex flex-col flex-1" style={{ height: 'calc(100vh - 56px)' }}>
            <Suspense
              fallback={
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                  <div className="w-10 h-10 rounded-full border-4 border-[#984300]/20 border-t-[#984300] animate-spin" />
                </div>
              }
            >
              <GetConnectedWrapper />
            </Suspense>
          </div>
        </div>
      </main>

      <MobileBottomNav active="connected" />
    </div>
  );
}
