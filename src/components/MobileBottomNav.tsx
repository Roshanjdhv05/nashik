'use client';
import React from 'react';
import Link from 'next/link';

interface NavItem {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: 'home', label: 'Home', href: '/' },
  { icon: 'explore', label: 'Explore', href: '/darshan' },
  { icon: 'map', label: 'Map', href: '/map' },
  { icon: 'luggage', label: 'My Trip', href: '/#trip' },
  { icon: 'menu', label: 'More', href: '#more' },
];

export default function MobileBottomNav({ activeNav = 'home' }: { activeNav?: string }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e2dd] pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-[64px] px-2">
        {navItems.map((item) => {
          const isActive = activeNav === item.label.toLowerCase() || (activeNav === 'darshan' && item.label === 'Explore') || (activeNav === 'home' && item.href === '/');
          
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-[#984300]' : 'text-[#564339]'
              }`}
            >
              <div className={`flex items-center justify-center w-14 h-8 rounded-full ${isActive ? 'bg-[#ffb68e]/30' : 'bg-transparent'}`}>
                <span className={`material-symbols-outlined ${isActive ? 'font-bold' : ''}`}>
                  {item.icon}
                </span>
              </div>
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'text-[#984300]' : 'text-[#564339]'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
