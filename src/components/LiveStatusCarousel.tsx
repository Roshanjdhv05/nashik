'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Users, Sun, AlertOctagon, Bus, BellRing, ArrowRight, ShieldCheck } from 'lucide-react';

export const LiveStatusCarousel: React.FC = () => {
  const { t, setActiveTab, setSelectedLocation } = useApp();

  return (
    <section className="my-5">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>{t.liveStatus}</span>
        </h2>
        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          {t.verifiedSource}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 px-1">
        {/* Crowd Level Card */}
        <div 
          onClick={() => setActiveTab('map')}
          className="shrink-0 w-64 sm:w-72 bg-gradient-to-br from-rose-900 to-red-950 text-white rounded-2xl p-3.5 border border-rose-700/60 shadow-md hover:shadow-lg cursor-pointer transition relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-rose-200 text-xs font-bold">
              <Users className="w-4 h-4 text-rose-400" />
              <span>RAM KUND GHAT</span>
            </div>
            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              🔴 VERY HIGH
            </span>
          </div>
          <p className="text-xs text-rose-100 font-medium">Estimated wait: 45–60 min</p>
          <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-amber-300 group-hover:underline">
            <span>Alt: Muktidham / Kapaleshwar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Weather Card */}
        <div className="shrink-0 w-64 sm:w-72 bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 rounded-2xl p-3.5 shadow-md border border-amber-400 relative">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              <Sun className="w-4 h-4 fill-current text-slate-950" />
              <span>NASHIK WEATHER</span>
            </div>
            <span className="text-xl font-black">32°C</span>
          </div>
          <p className="text-xs font-bold text-slate-900">High Heat Expected</p>
          <p className="text-[11px] text-slate-900 font-medium mt-1">Carry water & seek shade at ghats.</p>
        </div>

        {/* Traffic Diversion Card */}
        <div 
          onClick={() => setActiveTab('transport')}
          className="shrink-0 w-64 sm:w-72 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-3.5 border border-slate-700 shadow-md cursor-pointer hover:border-amber-500 transition group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
              <AlertOctagon className="w-4 h-4" />
              <span>TRAFFIC DIVERSION</span>
            </div>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Panchavati
            </span>
          </div>
          <p className="text-xs text-slate-200 font-medium">Private cars restricted on Ram Kund road.</p>
          <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold text-amber-400 group-hover:underline">
            <span>View Shuttle Drop Points</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Shuttle Bus Card */}
        <div 
          onClick={() => setActiveTab('transport')}
          className="shrink-0 w-64 sm:w-72 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-3.5 border border-emerald-700/60 shadow-md cursor-pointer hover:border-emerald-400 transition group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
              <Bus className="w-4 h-4" />
              <span>KUMBH SHUTTLE</span>
            </div>
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
              RUNNING
            </span>
          </div>
          <p className="text-xs text-emerald-100 font-medium">Buses every 3 mins from Nashik Road.</p>
          <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold text-emerald-300 group-hover:underline">
            <span>Check Routes & Fare</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};
