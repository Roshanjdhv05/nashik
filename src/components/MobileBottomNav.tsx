'use client';

import React from 'react';
import Link from 'next/link';

interface MobileBottomNavProps {
  active: string;
}

export function MobileBottomNav({ active }: MobileBottomNavProps) {
  const tabs = [
    { id: 'home',     href: '/',        icon: 'home',          label: 'Home' },
    { id: 'explore',  href: '/darshan', icon: 'explore',       label: 'Explore' },
    { id: 'map',      href: '/map',     icon: 'location_on',   label: 'Map' },
    { id: 'trip',     href: '/stay',    icon: 'person',        label: 'My Trip' },
    { id: 'more',     href: '/food',    icon: 'more_horiz',    label: 'More' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white/95 backdrop-blur-md border-t border-[#e8e4df] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-stretch h-[60px] pb-1">
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive ? 'text-[#984300]' : 'text-[#786d66]'
            }`}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#984300] rounded-b-full" />
            )}
            <span className={`material-symbols-outlined text-[22px] leading-none ${isActive ? 'text-[#984300]' : 'text-[#786d66]'}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] ${isActive ? 'font-bold text-[#984300]' : 'font-medium text-[#786d66]'} leading-none`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

