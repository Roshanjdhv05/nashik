'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake, 
  Train, 
  Hotel, 
  Utensils, 
  ShieldCheck,
  Plus
} from 'lucide-react';

export const TripPlannerWizard: React.FC = () => {
  const { t, setCurrentTrip, setActiveTab } = useApp();

  const [comingFrom, setComingFrom] = useState('Mumbai CSMT');
  const [travelDate, setTravelDate] = useState('2027-08-01');
  const [days, setDays] = useState(3);
  const [adults, setAdults] = useState(2);
  const [seniors, setSeniors] = useState(1);
  const [children, setChildren] = useState(1);
  const [wheelchair, setWheelchair] = useState(false);
  const [budgetCategory, setBudgetCategory] = useState<'Budget' | 'Moderate' | 'Comfort'>('Moderate');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const totalPeople = adults + seniors + children;
    const baseCostPerPersonPerDay = budgetCategory === 'Budget' ? 800 : budgetCategory === 'Moderate' ? 1800 : 4500;
    const estimatedTotal = totalPeople * days * baseCostPerPersonPerDay;

    setCurrentTrip({
      id: 'trip_' + Date.now(),
      comingFrom,
      travelDate,
      peopleCount: totalPeople,
      days,
      budgetCategory,
      savedTemples: ['t1', 't2', 't3'],
      savedEvents: ['e2', 'e4'],
      savedHotels: ['h2'],
      totalEstimatedCost: estimatedTotal
    });

    setIsGenerated(true);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-sm">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
            {t.planTripBtn} — SMART ITINERARY GENERATOR
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Get personalized routes, hotel recommendations, daily schedule, and cost breakdown
          </p>
        </div>
      </div>

      {!isGenerated ? (
        <form onSubmit={handleGenerate} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Coming From (Origin)</label>
              <input
                type="text"
                required
                value={comingFrom}
                onChange={(e) => setComingFrom(e.target.value)}
                placeholder="e.g. Mumbai, Pune, Delhi..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Travel Date</label>
              <input
                type="date"
                required
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Number of Days</label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value={1}>1 Day (Express Snan)</option>
                <option value={2}>2 Days (Standard Pilgrimage)</option>
                <option value={3}>3 Days (Complete Kumbh & Trimbak)</option>
                <option value={5}>5 Days (Extended Cultural & Akhada)</option>
              </select>
            </div>
          </div>

          {/* Passenger Breakdown */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">Group Passengers & Accessibility</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-500 font-medium">Adults</span>
                <input
                  type="number"
                  min={1}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full mt-1 bg-white border border-slate-300 rounded-xl p-2 font-bold text-slate-900"
                />
              </div>
              <div>
                <span className="text-slate-500 font-medium">Senior Citizens</span>
                <input
                  type="number"
                  min={0}
                  value={seniors}
                  onChange={(e) => setSeniors(Number(e.target.value))}
                  className="w-full mt-1 bg-white border border-slate-300 rounded-xl p-2 font-bold text-slate-900"
                />
              </div>
              <div>
                <span className="text-slate-500 font-medium">Children</span>
                <input
                  type="number"
                  min={0}
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full mt-1 bg-white border border-slate-300 rounded-xl p-2 font-bold text-slate-900"
                />
              </div>
              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="wc"
                  checked={wheelchair}
                  onChange={(e) => setWheelchair(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="wc" className="font-bold text-slate-700 cursor-pointer">
                  Wheelchair User in Group
                </label>
              </div>
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Budget Preference</label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(['Budget', 'Moderate', 'Comfort'] as const).map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setBudgetCategory(b)}
                  className={`p-3 rounded-2xl border text-center font-extrabold transition ${
                    budgetCategory === b
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-sm">{b}</p>
                  <p className="text-[10px] opacity-80 font-normal mt-0.5">
                    {b === 'Budget' ? 'Dharamshala & Buses' : b === 'Moderate' ? '3★ Hotel & Shuttles' : 'Luxury Resort & Taxi'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-5 h-5" />
            <span>CREATE MY KUMBH PLAN</span>
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h3 className="font-black text-sm text-emerald-950">Your {days}-Day Itinerary is Ready!</h3>
                <p className="text-xs text-emerald-800">
                  {comingFrom} ➔ Nashik ({adults + seniors + children} Passengers • {budgetCategory} Budget)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsGenerated(false)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 underline"
            >
              Modify Plan
            </button>
          </div>

          {/* Generated Day Breakdown */}
          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
              <span className="bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase">
                DAY 1 — HOLY SNAN & TEMPLE DARSHAN
              </span>
              <ul className="mt-2 space-y-1.5 text-slate-700">
                <li className="flex items-center gap-2">⏰ <strong>06:00 AM:</strong> Arrive at Nashik Road Station. Take MSRTC Shuttle to Panchavati.</li>
                <li className="flex items-center gap-2">🌊 <strong>07:30 AM:</strong> Holy Dip at Ram Kund Godavari Ghat (Wheelchair Ramp Entry).</li>
                <li className="flex items-center gap-2">🛕 <strong>10:30 AM:</strong> Kalaram & Sita Gufa Darshan.</li>
                <li className="flex items-center gap-2">🍲 <strong>01:00 PM:</strong> Free Satvik Prasad at Shree Mahavir Annadan Bhandara.</li>
                <li className="flex items-center gap-2">🪔 <strong>07:00 PM:</strong> Sit at Ram Kund Ghat for Godavari Sandhya Maha Aarti.</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
              <span className="bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase">
                DAY 2 — TRIMBAKESHWAR & AKHADA SADHUGRAM
              </span>
              <ul className="mt-2 space-y-1.5 text-slate-700">
                <li className="flex items-center gap-2">🚌 <strong>07:00 AM:</strong> Take AC Highway Shuttle to Trimbakeshwar Jyotirlinga.</li>
                <li className="flex items-center gap-2">🔱 <strong>09:30 AM:</strong> Trimbakeshwar Temple VIP Darshan & Kushavarta Kund.</li>
                <li className="flex items-center gap-2">⛺ <strong>03:00 PM:</strong> Visit Sadhugram Akhada Camps (Juna & Mahanirvani Akhada).</li>
              </ul>
            </div>
          </div>

          {/* Estimated Budget Table */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <p className="text-slate-400 font-bold">Estimated Total Budget</p>
              <p className="text-xl font-black text-amber-400">
                ₹{((adults + seniors + children) * days * (budgetCategory === 'Budget' ? 800 : budgetCategory === 'Moderate' ? 1800 : 4500)).toLocaleString('en-IN')}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('trips')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
            >
              <span>SAVE TO MY TRIPS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
