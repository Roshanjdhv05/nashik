'use client';

import React from 'react';
import { useApp, DevoteeTab } from '@/context/AppContext';
import { 
  Home, 
  Compass, 
  Map, 
  Briefcase, 
  User, 
  AlertTriangle, 
  Calendar, 
  Utensils, 
  Bus, 
  Hotel,
  Users,
  Wallet
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t, setIsSosOpen } = useApp();

  const navItems: { id: DevoteeTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.navHome, icon: <Home className="w-5 h-5" /> },
    { id: 'temples', label: t.navExplore, icon: <Compass className="w-5 h-5" /> },
    { id: 'map', label: t.navMap, icon: <Map className="w-5 h-5" /> },
    { id: 'trips', label: t.navTrips, icon: <Briefcase className="w-5 h-5" /> },
    { id: 'wallet', label: t.wallet, icon: <Wallet className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 text-slate-300 md:hidden shadow-2xl">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                isActive 
                  ? 'text-amber-400 font-bold bg-slate-800/80 scale-105' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* SOS Action Button in Mobile Bottom Nav */}
        <button
          onClick={() => setIsSosOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl bg-rose-600/90 text-white font-bold animate-pulse shadow-md shadow-rose-600/40"
        >
          <AlertTriangle className="w-5 h-5 fill-current" />
          <span className="text-[10px] mt-0.5 uppercase tracking-wider">SOS</span>
        </button>
      </div>
    </nav>
  );
};
