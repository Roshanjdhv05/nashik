'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  MapPin, 
  Utensils, 
  Heart, 
  ShieldCheck, 
  Navigation, 
  CheckCircle2, 
  Droplets, 
  Cross, 
  SquareParking, 
  Info,
  Filter
} from 'lucide-react';

export const NearMeSection: React.FC = () => {
  const { t, selectedLocation, setSelectedLocation, setActiveTab } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [radiusKm, setRadiusKm] = useState<number>(1.5);

  const categories = [
    { id: 'all', label: 'All Essentials', icon: '📍' },
    { id: 'bhandara', label: 'Free Food / Bhandara', icon: '🍲' },
    { id: 'toilet', label: 'Clean Toilets', icon: '🚻' },
    { id: 'water', label: 'Drinking Water', icon: '💧' },
    { id: 'medical', label: 'Medical Camp', icon: '🏥' },
    { id: 'police', label: 'Police Booth', icon: '👮' },
    { id: 'parking', label: 'Parking Space', icon: '🅿️' },
  ];

  const nearMeItems = [
    { id: 'nm1', name: 'Ram Kund Public RO Water & Toilet Complex', category: 'toilet', distance: '0.2 km', area: 'Ram Kund Gate 1', open: '24 Hours', icon: '🚻', isFree: true },
    { id: 'nm2', name: 'Shree Mahavir Free Annadan Bhandara', category: 'bhandara', distance: '0.3 km', area: 'Panchavati Temple Road', open: 'Continuous', icon: '🍲', isFree: true },
    { id: 'nm3', name: 'Kumbh Emergency Field Medical Tent 2', category: 'medical', distance: '0.4 km', area: 'Ghat Gate 2', open: '24 Hours', icon: '🏥', isFree: true },
    { id: 'nm4', name: 'Outer Ring Depot Senior Golf Cart & Parking', category: 'parking', distance: '1.1 km', area: 'Adgaon Highway', open: '24 Hours', icon: '🅿️', isFree: false },
    { id: 'nm5', name: 'Godavari Ghat Police Assistance Center', category: 'police', distance: '0.3 km', area: 'Ram Kund Steps', open: '24 Hours', icon: '👮', isFree: true },
  ];

  const filteredItems = nearMeItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section className="my-6 bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 p-4 rounded-3xl border border-amber-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="p-1.5 bg-amber-500 text-slate-950 rounded-xl shadow-xs text-xs">📍</span>
            <span>{t.nearMe} — ESSENTIAL SERVICES</span>
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Showing verified facilities within <strong className="text-amber-800 font-bold">{radiusKm} km</strong> of {selectedLocation}
          </p>
        </div>

        {/* Distance Filter Selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs text-slate-500 font-bold">Radius:</span>
          {[0.5, 1.5, 3.0].map((r) => (
            <button
              key={r}
              onClick={() => setRadiusKm(r)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                radiusKm === r
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              activeCategory === c.id
                ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Near Me Items Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xl p-2 rounded-xl bg-amber-50 shrink-0">{item.icon}</span>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                    {item.distance}
                  </span>
                  {item.isFree && (
                    <span className="ml-1 bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-md">
                      FREE
                    </span>
                  )}
                </div>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{item.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{item.area} • {item.open}</p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified
              </span>
              <button
                onClick={() => setActiveTab('map')}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition shadow-xs"
              >
                <Navigation className="w-3 h-3 text-amber-400" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
