'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { QuickAccessGrid } from '@/components/QuickAccessGrid';
import { LiveStatusCarousel } from '@/components/LiveStatusCarousel';
import { NearMeSection } from '@/components/NearMeSection';
import { TripPlannerWizard } from '@/components/TripPlannerWizard';
import dynamic from 'next/dynamic';
const KumbhSmartMap = dynamic(() => import('@/components/KumbhSmartMap').then((mod) => mod.KumbhSmartMap), { ssr: false });
import { 
  Calendar as CalendarIcon, 
  Compass, 
  Hotel, 
  Train, 
  Plane, 
  Bus, 
  Utensils, 
  Heart, 
  ShieldAlert, 
  MapPin, 
  Briefcase, 
  Users, 
  Wallet, 
  Sparkles, 
  Clock, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Navigation,
  QrCode,
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';

export const DevoteeApp: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    t, 
    temples, 
    events, 
    accommodations, 
    restaurants, 
    transports, 
    emergencies,
    savedItemIds,
    toggleSaveItem,
    currentTrip,
    familyMembers,
    addFamilyMember,
    walletTickets,
    setIsAiChatOpen,
    setIsSosOpen,
    seniorMode
  } = useApp();

  // Filters for Temples & Hotels
  const [templeFilter, setTempleFilter] = useState<'all' | 'open' | 'lowCrowd' | 'wheelchair'>('all');
  const [hotelArea, setHotelArea] = useState<string>('all');
  const [transportMode, setTransportMode] = useState<'all' | 'bus' | 'train' | 'flight'>('all');

  // Countdown timer math for Nashik Kumbh 2027 (Starts ~July 14, 2027)
  const targetDate = new Date('2027-07-14T00:00:00').getTime();
  const now = new Date('2026-09-30T19:30:00').getTime();
  const daysRemaining = Math.max(0, Math.floor((targetDate - now) / (1000 * 60 * 60 * 24)));

  return (
    <div className="pb-24 pt-3 max-w-7xl mx-auto px-3 sm:px-4 space-y-6">
      {/* ---------------- HOME TAB ---------------- */}
      {activeTab === 'home' && (
        <>
          {/* Hero Banner Section */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl border border-slate-800 p-6 sm:p-8">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80')` }}
            />

            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>NASHIK KUMBH MELA 2027</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Your Complete Kumbh Companion
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Everything a devotee needs before, during, and after visiting Nashik Kumbh — accessible from one easy platform.
              </p>

              {/* Countdown & Highlights */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="bg-slate-950/80 border border-slate-700/80 px-4 py-2 rounded-2xl flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-amber-400">{daysRemaining}</span>
                  <span className="text-[11px] text-slate-300 font-bold uppercase leading-tight">
                    Days To<br />Kumbh 2027
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-700/80 px-4 py-2 rounded-2xl flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-[11px]">
                    <p className="text-slate-400 font-medium">Next Shahi Snan</p>
                    <p className="font-bold text-white">Aug 02, 2027 (Amavasya)</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3">
                <button
                  onClick={() => setActiveTab('trips')}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-amber-500/30 flex items-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.planTripBtn}</span>
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className="bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl border border-slate-700 flex items-center gap-2 transition"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{t.exploreMapBtn}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Access Services Grid (19 Items) */}
          <QuickAccessGrid />

          {/* Live Status Carousel (Crowd, Weather, Traffic, Transport) */}
          <LiveStatusCarousel />

          {/* Near Me Essentials Finder */}
          <NearMeSection />

          {/* Today at Kumbh Section */}
          <section className="my-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <span>🗓️</span>
                <span>MAJOR SHAHI SNAN & EVENTS</span>
              </h2>
              <button
                onClick={() => setActiveTab('calendar')}
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                Full Calendar ➔
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {events.slice(0, 2).map((evt) => (
                <div key={evt.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                        {evt.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{evt.date} • {evt.time}</span>
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{evt.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{evt.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">📍 {evt.location}</span>
                    <button
                      onClick={() => toggleSaveItem(evt.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl transition ${
                        savedItemIds.includes(evt.id) ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {savedItemIds.includes(evt.id) ? 'Saved ✓' : 'Save Event'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Smart Map Preview */}
          <section className="my-6">
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
              <span>🗺️</span>
              <span>KUMBH SMART MAP & NAVIGATION</span>
            </h2>
            <KumbhSmartMap />
          </section>

          {/* AI Kumbh Mitr Banner Callout */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-5 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-amber-400">Have a Question About Nashik Kumbh?</h3>
                <p className="text-xs text-slate-300">
                  Ask our AI Mitr about Jain food, wheelchair routes, hotel availability, or toilet locations.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAiChatOpen(true)}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl transition shadow-md shrink-0"
            >
              ASK KUMBH AI MITR
            </button>
          </div>
        </>
      )}

      {/* ---------------- CALENDAR TAB ---------------- */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Kumbh Mela 2027 Official Calendar</h2>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
              Verified Dates
            </span>
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div key={evt.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded uppercase">
                    {evt.category}
                  </span>
                  <span className="font-mono font-bold text-xs text-slate-600">{evt.date} • {evt.time}</span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-500">{evt.description}</p>
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>📍 {evt.location}</span>
                  <button
                    onClick={() => toggleSaveItem(evt.id)}
                    className="text-amber-700 hover:underline"
                  >
                    {savedItemIds.includes(evt.id) ? 'Saved in Itinerary ✓' : '+ Add to Itinerary'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TEMPLES TAB ---------------- */}
      {activeTab === 'temples' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-900">Temples & Holy Darshan</h2>
              <p className="text-xs text-slate-500">Live wait times, Aarti timings, and wheelchair accessibility</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(['all', 'open', 'lowCrowd', 'wheelchair'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTempleFilter(f)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition border ${
                    templeFilter === f
                      ? 'bg-slate-900 text-amber-400 border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {f === 'all' ? 'All Temples' : f === 'open' ? 'Open Now' : f === 'lowCrowd' ? 'Low Crowd' : 'Wheelchair Ready'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {temples.map((temple) => (
              <div key={temple.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                <div 
                  className="h-44 bg-cover bg-center relative p-3 flex flex-col justify-between"
                  style={{ backgroundImage: `url('${temple.image}')` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-slate-950/80 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-xl backdrop-blur-md">
                      {temple.distanceKm} km away
                    </span>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl uppercase ${
                      temple.crowdLevel === 'Very High' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {temple.crowdLevel} Crowd
                    </span>
                  </div>

                  <div className="bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-700/60 text-white">
                    <h3 className="font-extrabold text-sm">{temple.name}</h3>
                    <p className="text-[11px] text-amber-300 font-medium">{temple.marathiName}</p>
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs text-slate-700">
                  <p className="text-slate-600 line-clamp-2">{temple.description}</p>
                  
                  <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 font-medium">
                    <p>⏰ <strong>Aarti:</strong> {temple.aartiTimings.join(' | ')}</p>
                    <p>⏳ <strong>Wait Time:</strong> Approx {temple.waitTimeMinutes} mins</p>
                    <p>♿ <strong>Ramp:</strong> {temple.wheelchairRamp ? 'Yes (Accessible)' : 'Steps only'}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('map')}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1"
                    >
                      <Navigation className="w-3 h-3 text-amber-400" />
                      <span>Directions</span>
                    </button>
                    <button
                      onClick={() => alert(`Official Darshan Booking Portal Redirect for ${temple.name}`)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs"
                    >
                      Book Darshan Slot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- HOTELS TAB ---------------- */}
      {activeTab === 'hotels' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-900">Hotels, Dharamshalas & Camps</h2>
              <p className="text-xs text-slate-500">Stay near Ram Kund, Trimbakeshwar, or Panchavati</p>
            </div>

            {/* Destination Selector */}
            <select
              value={hotelArea}
              onChange={(e) => setHotelArea(e.target.value)}
              className="bg-white border border-slate-300 font-extrabold text-xs px-3 py-2 rounded-xl"
            >
              <option value="all">Stay Anywhere in Nashik</option>
              <option value="Ram Kund">Near Ram Kund</option>
              <option value="Trimbakeshwar">Near Trimbakeshwar</option>
              <option value="Panchavati">Near Panchavati</option>
              <option value="Nashik Road">Near Railway Station</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accommodations.map((acc) => (
              <div key={acc.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                <div 
                  className="h-40 bg-cover bg-center relative p-3 flex items-start justify-between"
                  style={{ backgroundImage: `url('${acc.image}')` }}
                >
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                    {acc.category}
                  </span>
                  {acc.verified && (
                    <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{acc.name}</h3>
                      <p className="text-slate-500">{acc.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-black text-amber-700">₹{acc.pricePerNight}</p>
                      <p className="text-[10px] text-slate-400">{t.perNight}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {acc.amenities.map((am, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 font-semibold text-[10px] px-2 py-0.5 rounded-md">
                        {am}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-700 font-bold">
                      🛏️ {acc.availableBeds} Beds Available
                    </span>
                    <button
                      onClick={() => alert(`Redirecting to vendor booking portal for ${acc.name}...`)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-xs"
                    >
                      {t.bookHotel}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TRANSPORT TAB ---------------- */}
      {activeTab === 'transport' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">Buses, Trains & Shuttles</h2>
              <p className="text-xs text-slate-500">MSRTC Kumbh Specials & "How Do I Reach?" Route Finder</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transports.map((tr) => (
              <div key={tr.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase">
                    {tr.mode}
                  </span>
                  <span className="font-bold text-xs text-slate-500">Freq: {tr.frequency}</span>
                </div>

                <div>
                  <h3 className="font-black text-base text-slate-900">{tr.origin} ➔ {tr.destination}</h3>
                  <p className="text-xs text-slate-600 mt-1">{tr.details}</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <p className="text-slate-400 font-medium">Estimated Time & Fare</p>
                    <p className="font-bold text-slate-800">{tr.estimatedMinutes} mins • Fare: {tr.fare === 0 ? 'FREE' : `₹${tr.fare}`}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="bg-slate-900 text-amber-400 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>View Route</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- FOOD & ANNADAN TAB ---------------- */}
      {(activeTab === 'food' || activeTab === 'annadan') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">Free Food / Annadan & Restaurants</h2>
              <p className="text-xs text-slate-500">Pure Veg & Jain Meals Verified continuously</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.map((res) => (
              <div key={res.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`font-black text-[10px] px-2.5 py-0.5 rounded uppercase ${
                    res.isFree ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-950'
                  }`}>
                    {res.type}
                  </span>
                  {res.verifiedAt && (
                    <span className="text-[10px] text-emerald-700 font-bold">
                      ✓ {res.verifiedAt}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{res.name}</h3>
                  <p className="text-xs text-slate-500">{res.address}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {res.cuisine.map((c, i) => (
                    <span key={i} className="bg-amber-50 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">
                    {res.isFree ? 'FREE BHANDARA' : `Price for 2: ₹${res.priceForTwo}`}
                  </span>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl"
                  >
                    Directions ➔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- MAP TAB ---------------- */}
      {activeTab === 'map' && (
        <div className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">Kumbh Smart Interactive Map</h2>
          <KumbhSmartMap />
        </div>
      )}

      {/* ---------------- TRIPS TAB ---------------- */}
      {activeTab === 'trips' && (
        <div className="space-y-6">
          <TripPlannerWizard />
        </div>
      )}

      {/* ---------------- FAMILY GROUP TAB ---------------- */}
      {activeTab === 'family' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              <span>MY KUMBH GROUP — FAMILY TRACKER</span>
            </h2>
            <p className="text-xs text-slate-600">
              Share live GPS locations and set an emergency meeting point at Ram Kund Ghat.
            </p>

            <div className="space-y-2 pt-2">
              {familyMembers.map((fm) => (
                <div key={fm.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{fm.name}</h4>
                    <p className="text-slate-500">📍 {fm.location} • Battery: {fm.battery}%</p>
                  </div>
                  <a href={`tel:${fm.phone}`} className="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-xl">
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- WALLET TAB ---------------- */}
      {activeTab === 'wallet' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">MY KUMBH WALLET</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              Offline Accessible
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {walletTickets.map((wt) => (
              <div key={wt.id} className="bg-slate-900 text-white p-4 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                    {wt.category}
                  </span>
                  <span className="font-mono text-xs text-amber-400">{wt.referenceNo}</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base">{wt.title}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{wt.details}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{wt.date}</span>
                  <button
                    onClick={() => alert(`Showing QR Code Barcode for ${wt.referenceNo}`)}
                    className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Show QR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
