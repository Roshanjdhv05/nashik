'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  MapPin, 
  Globe, 
  Search, 
  Bell, 
  User, 
  AlertTriangle, 
  HeartHandshake, 
  ShieldCheck, 
  Building2, 
  SlidersHorizontal,
  Compass,
  Sparkles
} from 'lucide-react';
import { Language } from '@/lib/i18n';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    activeView, 
    setActiveView, 
    seniorMode, 
    setSeniorMode, 
    accessibilityMode, 
    setAccessibilityMode,
    searchQuery, 
    setSearchQuery,
    setIsSosOpen,
    setIsAiChatOpen,
    setActiveTab
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-lg border-b border-slate-800">
      {/* Top Utility Announcement & Senior Mode Bar */}
      <div className="bg-amber-600 px-3 py-1 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="bg-amber-800 text-amber-100 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
            LIVE 2027
          </span>
          <span className="truncate">
            {t.verifiedSource}: Ram Kund Shahi Bath Registration Open
          </span>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          {/* Senior Mode Toggle */}
          <button
            onClick={() => setSeniorMode(!seniorMode)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition ${
              seniorMode ? 'bg-amber-100 text-amber-900 shadow' : 'bg-amber-700/60 text-white hover:bg-amber-700'
            }`}
            title="Enlarge text and simplify interface"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{seniorMode ? '👴 Senior Mode ON' : '👴 Senior Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => { setActiveTab('home'); setActiveView('devotee'); }}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 ring-2 ring-amber-300/30">
            <span className="text-xl">🛕</span>
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-amber-400 tracking-tight leading-none flex items-center gap-1.5">
              {t.appName}
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono font-medium border border-slate-700">
                PWA
              </span>
            </h1>
            <div className="flex items-center gap-1 text-slate-300 text-xs mt-0.5">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-[200px] font-medium">Nashik & Trimbak</span>
            </div>
          </div>
        </div>

        {/* Search Bar (Desktop / Tablet) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-800/90 border border-slate-700 text-white pl-9 pr-3 py-1.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-400"
          />
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* AI Mitr Floating Trigger */}
          <button
            onClick={() => setIsAiChatOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-2.5 py-1.5 rounded-xl font-bold text-xs shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Mitr</span>
          </button>

          {/* Product View Switcher (Devotee / Vendor / Admin) */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700 text-xs">
            <button
              onClick={() => setActiveView('devotee')}
              className={`px-2 py-1 rounded-lg font-medium transition ${
                activeView === 'devotee' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
              title="Devotee Pilgrimage App"
            >
              Devotee
            </button>
            <button
              onClick={() => setActiveView('vendor')}
              className={`px-2 py-1 rounded-lg font-medium transition ${
                activeView === 'vendor' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
              title="Hotel & Business Portal"
            >
              Vendor
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`px-2 py-1 rounded-lg font-medium transition ${
                activeView === 'admin' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
              title="Admin Command Dashboard"
            >
              Admin
            </button>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold px-2 py-1.5 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="en">EN</option>
              <option value="mr">मराठी</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 relative transition"
              title="Kumbh Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 text-slate-100 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 font-bold text-amber-400">
                  <span>Kumbh Live Alerts (3)</span>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                    <p className="font-bold text-[11px] text-amber-400">🚨 Traffic Diversion Active</p>
                    <p className="text-[11px] text-slate-300">Panchavati vehicles diverted towards Outer Parking Ring Road.</p>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                    <p className="font-bold text-[11px] text-emerald-400">🚌 Shuttle Frequency Increased</p>
                    <p className="text-[11px] text-slate-300">Nashik Road to Ram Kund electric buses running every 2 mins.</p>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200">
                    <p className="font-bold text-[11px] text-blue-400">☀️ High Heat Advisory</p>
                    <p className="text-[11px] text-slate-300">Stay hydrated! Free water booths available every 100 meters on Ghats.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Persistent SOS Button */}
          <button
            onClick={() => setIsSosOpen(true)}
            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-2.5 py-1.5 rounded-xl shadow-md shadow-rose-600/30 active:scale-95 transition"
          >
            <AlertTriangle className="w-3.5 h-3.5 fill-current" />
            <span>SOS</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-3 pb-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-800 border border-slate-700 text-white pl-9 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400"
          />
        </div>
      </div>
    </header>
  );
};
