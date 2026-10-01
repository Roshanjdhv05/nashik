'use client';

import React, { useState } from 'react';
import { useApp, DevoteeTab } from '@/context/AppContext';
import { 
  Calendar, 
  Compass, 
  Hotel, 
  Train, 
  Plane, 
  Bus, 
  Car, 
  Utensils, 
  Heart, 
  ShieldAlert, 
  Tent, 
  Map, 
  LifeBuoy, 
  AlertTriangle, 
  Briefcase, 
  Calculator, 
  Users, 
  Wallet, 
  Sparkles,
  Grid,
  X,
  Star
} from 'lucide-react';

interface ShortcutItem {
  id: string;
  tabId: DevoteeTab;
  titleKey: string;
  icon: React.ReactNode;
  bgColor: string;
  isCustomShortcut?: boolean;
}

export const QuickAccessGrid: React.FC = () => {
  const { t, setActiveTab, setIsSosOpen, setIsAiChatOpen } = useApp();
  const [showAllModal, setShowAllModal] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<string[]>([
    'calendar', 'temples', 'hotels', 'trains', 'buses', 'food', 'annadan', 'map', 'emergency', 'ai'
  ]);

  const allShortcuts: ShortcutItem[] = [
    { id: 'calendar', tabId: 'calendar', titleKey: t.calendar, icon: <Calendar className="w-6 h-6 text-amber-600" />, bgColor: 'bg-amber-100/70 border-amber-200' },
    { id: 'temples', tabId: 'temples', titleKey: t.temples, icon: <Compass className="w-6 h-6 text-orange-600" />, bgColor: 'bg-orange-100/70 border-orange-200' },
    { id: 'hotels', tabId: 'hotels', titleKey: t.hotels, icon: <Hotel className="w-6 h-6 text-blue-600" />, bgColor: 'bg-blue-100/70 border-blue-200' },
    { id: 'trains', tabId: 'transport', titleKey: t.trains, icon: <Train className="w-6 h-6 text-indigo-600" />, bgColor: 'bg-indigo-100/70 border-indigo-200' },
    { id: 'flights', tabId: 'transport', titleKey: t.flights, icon: <Plane className="w-6 h-6 text-sky-600" />, bgColor: 'bg-sky-100/70 border-sky-200' },
    { id: 'buses', tabId: 'transport', titleKey: t.buses, icon: <Bus className="w-6 h-6 text-emerald-600" />, bgColor: 'bg-emerald-100/70 border-emerald-200' },
    { id: 'cabs', tabId: 'transport', titleKey: t.cabs, icon: <Car className="w-6 h-6 text-yellow-600" />, bgColor: 'bg-yellow-100/70 border-yellow-200' },
    { id: 'food', tabId: 'food', titleKey: t.food, icon: <Utensils className="w-6 h-6 text-rose-600" />, bgColor: 'bg-rose-100/70 border-rose-200' },
    { id: 'annadan', tabId: 'annadan', titleKey: t.annadan, icon: <Heart className="w-6 h-6 text-red-600" />, bgColor: 'bg-red-100/70 border-red-200' },
    { id: 'akhadas', tabId: 'akhadas', titleKey: t.akhadas, icon: <ShieldAlert className="w-6 h-6 text-amber-700" />, bgColor: 'bg-amber-100/70 border-amber-300' },
    { id: 'camps', tabId: 'akhadas', titleKey: t.camps, icon: <Tent className="w-6 h-6 text-teal-600" />, bgColor: 'bg-teal-100/70 border-teal-200' },
    { id: 'map', tabId: 'map', titleKey: t.map, icon: <Map className="w-6 h-6 text-emerald-700" />, bgColor: 'bg-emerald-100/70 border-emerald-300' },
    { id: 'nearbyHelp', tabId: 'emergency', titleKey: t.nearbyHelp, icon: <LifeBuoy className="w-6 h-6 text-cyan-600" />, bgColor: 'bg-cyan-100/70 border-cyan-200' },
    { id: 'emergency', tabId: 'emergency', titleKey: t.emergency, icon: <AlertTriangle className="w-6 h-6 text-rose-700" />, bgColor: 'bg-rose-200/80 border-rose-300' },
    { id: 'tripPlanner', tabId: 'trips', titleKey: t.tripPlanner, icon: <Briefcase className="w-6 h-6 text-purple-600" />, bgColor: 'bg-purple-100/70 border-purple-200' },
    { id: 'budgetPlanner', tabId: 'trips', titleKey: t.budgetPlanner, icon: <Calculator className="w-6 h-6 text-emerald-600" />, bgColor: 'bg-emerald-100/70 border-emerald-200' },
    { id: 'familyGroup', tabId: 'family', titleKey: t.familyGroup, icon: <Users className="w-6 h-6 text-indigo-600" />, bgColor: 'bg-indigo-100/70 border-indigo-200' },
    { id: 'wallet', tabId: 'wallet', titleKey: t.wallet, icon: <Wallet className="w-6 h-6 text-amber-600" />, bgColor: 'bg-amber-100/70 border-amber-200' },
    { id: 'ai', tabId: 'ai', titleKey: t.aiAssistant, icon: <Sparkles className="w-6 h-6 text-purple-700" />, bgColor: 'bg-purple-200/80 border-purple-300' },
  ];

  const handleShortcutClick = (item: ShortcutItem) => {
    if (item.id === 'emergency') {
      setIsSosOpen(true);
    } else if (item.id === 'ai') {
      setIsAiChatOpen(true);
    } else {
      setActiveTab(item.tabId);
    }
    if (showAllModal) setShowAllModal(false);
  };

  const visibleShortcuts = allShortcuts.filter((s) => pinnedIds.includes(s.id)).slice(0, 10);

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
          <span>⚡</span>
          <span>QUICK ACCESS SERVICES</span>
        </h2>
        <button
          onClick={() => setShowAllModal(true)}
          className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-xl border border-amber-300 flex items-center gap-1 transition"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>{t.viewAll} (19)</span>
        </button>
      </div>

      {/* Grid Layout on Mobile & Desktop */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2.5 sm:gap-3">
        {visibleShortcuts.map((item) => (
          <button
            key={item.id}
            onClick={() => handleShortcutClick(item)}
            className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border ${item.bgColor} shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition group text-center min-h-[90px]`}
          >
            <div className="p-2 rounded-xl bg-white shadow-xs mb-1 group-hover:rotate-6 transition-transform">
              {item.icon}
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 line-clamp-2 leading-tight">
              {item.titleKey}
            </span>
          </button>
        ))}
      </div>

      {/* View All Services Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <Grid className="w-5 h-5 text-amber-600" />
                All 19 Kumbh Travel Companion Services
              </h3>
              <button
                onClick={() => setShowAllModal(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
              {allShortcuts.map((item) => {
                const isPinned = pinnedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border ${item.bgColor} cursor-pointer hover:shadow-md transition text-center group`}
                    onClick={() => handleShortcutClick(item)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPinnedIds((prev) =>
                          isPinned ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                        );
                      }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full text-slate-400 hover:text-amber-600"
                      title={isPinned ? 'Unpin from homepage' : 'Pin to homepage'}
                    >
                      <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                    <div className="p-2.5 rounded-xl bg-white shadow-xs mb-2">
                      {item.icon}
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 leading-snug">
                      {item.titleKey}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
