'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Topbar, Navbar } from '@/components/Navbar';
import { MobileBottomNav } from '@/components/MobileBottomNav';

const MS = ({ name, cls = '' }: { name: string; cls?: string }) => (
  <span className={`material-symbols-outlined ${cls}`}>{name}</span>
);

/* ─── COMPONENT: Footer ─────────────────────────────────────────── */




function Footer() {
  return (
    <footer className="w-full bg-[#1c1c19] text-[#e5e2dd]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#3e3a35]">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#984300] flex items-center justify-center">
                <MS name="water_drop" cls="text-white text-[18px]" />
              </div>
              <span className="text-[20px] text-[#ffdea5]" style={{ fontFamily: 'Playfair Display, serif' }}>Kumbh 2027</span>
            </div>
            <p className="text-[13px] text-[#a59d95] leading-relaxed">
              Nashik–Trimbakeshwar Simhastha Kumbh 2027 Devotee Companion. Built with devotion and precision for pilgrims.
            </p>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-white mb-4">Pilgrimage &amp; Darshan</h3>
            <ul className="space-y-2 text-[13px] text-[#a59d95]">
              <li><Link href="/darshan" className="hover:text-[#ffdea5] transition-colors">Trimbakeshwar Jyotirlinga</Link></li>
              <li><Link href="/darshan" className="hover:text-[#ffdea5] transition-colors">Ram Kund &amp; Panchavati</Link></li>
              <li><Link href="/darshan" className="hover:text-[#ffdea5] transition-colors">Shahi Snan Timetable</Link></li>
              <li><Link href="/darshan" className="hover:text-[#ffdea5] transition-colors">Daily Godavari Aarti</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-white mb-4">Devotee Services</h3>
            <ul className="space-y-2 text-[13px] text-[#a59d95]">
              <li><Link href="/stay" className="hover:text-[#ffdea5] transition-colors">Accommodations &amp; Ashrams</Link></li>
              <li><Link href="/annadan" className="hover:text-[#ffdea5] transition-colors">Verified Annadan &amp; Bhandara</Link></li>
              <li><Link href="#" className="hover:text-[#ffdea5] transition-colors">Akhadas &amp; Yatri Camps</Link></li>
              <li><Link href="/map" className="hover:text-[#ffdea5] transition-colors">Ghat Accessibility Status</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-white mb-4">Safety &amp; Support</h3>
            <ul className="space-y-2 text-[13px] text-[#a59d95]">
              <li><Link href="#" className="hover:text-[#ffdea5] transition-colors">Kumbh Command Center</Link></li>
              <li><Link href="#" className="hover:text-[#ffdea5] transition-colors">Lost &amp; Found Registry</Link></li>
              <li><Link href="#" className="hover:text-[#ffdea5] transition-colors">24x7 Medical Booths</Link></li>
              <li><Link href="/map" className="hover:text-[#ffdea5] transition-colors">Traffic &amp; Parking Updates</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-white mb-4">Languages &amp; Offline</h3>
            <ul className="space-y-2 text-[13px] text-[#a59d95]">
              <li><Link href="#" className="hover:text-[#ffdea5] transition-colors">मराठी आवृत्ती (Marathi)</Link></li>
              <li><Link href="#" className="hover:text-[#ffdea5] transition-colors">हिंदी संस्करण (Hindi)</Link></li>
              <li><Link href="#" className="hover:text-[#ffdea5] transition-colors">English Version</Link></li>
              <li><Link href="/map" className="hover:text-[#ffdea5] transition-colors">Download Ghat Maps (PDF)</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#a59d95]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#ffdea5] font-semibold">Helplines:</span>
            <span>Kumbh Helpline: 1800-2027-00</span>
            <span>• Police: 112</span>
            <span>• Ambulance: 108</span>
            <span>• Disaster Mgmt: 1077</span>
          </div>
          <div>© 2027 Nashik-Trimbakeshwar Simhastha Kumbh Authority. Official Devotee Portal.</div>
        </div>
      </div>
    </footer>
  );
}

const properties = [
  {
    id: 1,
    name: 'Shri Swami Samarth Gurupeeth Ashram',
    zone: 'Trimbakeshwar Bypass Zone',
    zoneKey: 'trimbak',
    type: 'ashram',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#ffb68e]/40 text-[#ba5814]',
    rating: 4.8,
    reviews: '2,410',
    distance: '15 min walk to Jyotirlinga',
    price: 850,
    priceTag: '/ night (Quad)',
    priceNote: 'AC Rooms available at ₹1,400',
    strikePrice: 'Govt Ceiling: ₹1,200',
    colorHex: '#ffdbca',
    desc: 'Tranquil spiritual center with daily Gayatri recitation, Nitya aarti, and pure satvik dining halls.',
    amenities: [
      { icon: 'restaurant', label: 'Morning Mahaprasad' },
      { icon: 'electric_rickshaw', label: 'Free E-Rickshaw' },
      { icon: 'self_improvement', label: 'Meditation Hall' },
      { icon: 'water_drop', label: 'RO Water Station' },
    ],
    ctaLabel: 'Book Ashram Stay',
    distKm: 1,
  },
  {
    id: 2,
    name: 'Tapovan Simhastha Vedic Tent City',
    zone: 'Tapovan Sacred Woods',
    zoneKey: 'tapovan',
    type: 'tents',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#a5cce0]/40 text-[#3e6374]',
    rating: 4.9,
    reviews: 'Partner',
    distance: 'Inside Tapovan Sector 3',
    price: 4800,
    priceTag: '/ night (Twin)',
    priceNote: 'Includes meals & havan pass',
    strikePrice: 'All-Inclusive Package',
    colorHex: '#c1e8fc',
    desc: 'Premier tent township next to historic Sadhu Gram. AC Swiss cottages, private baths, state security.',
    amenities: [
      { icon: 'restaurant', label: 'Maharashtrian Satvik' },
      { icon: 'security', label: '24/7 CCTV & Security' },
      { icon: 'local_fire_department', label: 'Vedic Havan Access' },
      { icon: 'airport_shuttle', label: 'VIP Snan Access' },
    ],
    ctaLabel: 'Select Cottage',
    distKm: 3,
  },
  {
    id: 3,
    name: 'Panchavati Maheshwari Bhakt Niwas',
    zone: 'Panchavati Ghat Core',
    zoneKey: 'panchavati',
    type: 'dharamshala',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#ffdad6] text-[#ba1a1a]',
    rating: 4.7,
    reviews: '1,890',
    distance: 'Wheelchair & Lift',
    price: 1100,
    priceTag: '/ night (Triple)',
    priceNote: 'Strict ID verification',
    strikePrice: 'Standard Pilgrim Tariff',
    colorHex: '#ffdea5',
    desc: 'Historic devotee rest house at Sita Gufa. Ideal for families with elderly parents — near Godavari aartis.',
    amenities: [
      { icon: 'elevator', label: 'Elevator Access' },
      { icon: 'hot_tub', label: 'Solar Warm Water' },
      { icon: 'soup_kitchen', label: 'Subsidized Dining' },
      { icon: 'luggage', label: 'Day-Use Lockers' },
    ],
    ctaLabel: 'Book Room',
    distKm: 1,
  },
  {
    id: 4,
    name: 'Godavari Heritage Retreat & Suites',
    zone: 'Gangapur Road Promenade',
    zoneKey: 'city',
    type: 'hotels',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#c1e8fc] text-[#3e6374]',
    rating: 4.6,
    reviews: '3,120',
    distance: '3.8 km to Ram Kund',
    price: 3200,
    priceTag: '/ night (Deluxe)',
    priceNote: 'Free cancellation 48 hrs prior',
    strikePrice: 'Instant Confirmation',
    colorHex: '#e9c176',
    desc: 'Full-service retreat along peaceful waters. Private family suites, multi-cuisine dining, Kumbh concierge.',
    amenities: [
      { icon: 'directions_car', label: 'Secure Parking' },
      { icon: 'ev_station', label: 'EV Charging Stations' },
      { icon: 'deck', label: 'Morning Yoga Deck' },
      { icon: 'bolt', label: 'DG Power Backup' },
    ],
    ctaLabel: 'Reserve Now',
    distKm: 5,
  },
  {
    id: 5,
    name: 'Shree Gajanan Maharaj Bhakt Niwas',
    zone: 'Trimbakeshwar Sanctum',
    zoneKey: 'trimbak',
    type: 'dharamshala',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#e5e2dd] text-[#564339]',
    rating: 4.9,
    reviews: '5,200',
    distance: '700m from Kushavarta Kund',
    price: 600,
    priceTag: '/ night (Standard)',
    priceNote: 'Max 3 nights limit',
    strikePrice: 'Subsidized Contribution',
    colorHex: '#e5e2dd',
    desc: 'Exemplary cleanliness and selfless sewa. Mahaprasad counters, senior citizen rooms, silent curfews.',
    amenities: [
      { icon: 'volunteer_activism', label: 'Sansthan Prasad Sewa' },
      { icon: 'cleaning_services', label: 'Hygiene Audit (99%)' },
      { icon: 'family_restroom', label: 'Family Registry' },
      { icon: 'lock_clock', label: '10:00 PM Curfew' },
    ],
    ctaLabel: 'Request Booking',
    distKm: 1,
  },
  {
    id: 6,
    name: 'Govardhan Eco Village Simhastha Camp',
    zone: 'Tapovan Eco Zone',
    zoneKey: 'tapovan',
    type: 'tents',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#a5cce0]/40 text-[#3e6374]',
    rating: 4.8,
    reviews: '950',
    distance: '2.5 km from Tapovan',
    price: 3500,
    priceTag: '/ night (Eco Tent)',
    priceNote: 'Includes Sattvic Meals',
    strikePrice: 'Green Pilgrim Package',
    colorHex: '#a5cce0',
    desc: 'Sustainable luxury tents built with eco-friendly materials. Features organic dining, yoga sessions, and guided Kumbh tours.',
    amenities: [
      { icon: 'eco', label: 'Zero Waste Facility' },
      { icon: 'self_improvement', label: 'Daily Yoga Classes' },
      { icon: 'restaurant', label: 'Organic Sattvic Food' },
      { icon: 'directions_bus', label: 'Shuttle to Ghats' },
    ],
    ctaLabel: 'Book Eco Tent',
    distKm: 3,
  },
  {
    id: 7,
    name: 'Kalaram Trust Dharamshala',
    zone: 'Panchavati Heritage Hub',
    zoneKey: 'panchavati',
    type: 'dharamshala',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#ffb68e]/40 text-[#ba5814]',
    rating: 4.5,
    reviews: '3,800',
    distance: '200m from Kalaram Temple',
    price: 500,
    priceTag: '/ night (Dormitory)',
    priceNote: 'Advance booking only',
    strikePrice: 'Trust Subsidized',
    colorHex: '#ffb68e',
    desc: 'Centrally located trust property offering basic, clean accommodations right next to the historic Kalaram Temple.',
    amenities: [
      { icon: 'bed', label: 'Clean Dormitories' },
      { icon: 'local_dining', label: 'Subsidized Canteen' },
      { icon: 'wc', label: 'Shared Bathrooms' },
      { icon: 'security', label: '24/7 Security' },
    ],
    ctaLabel: 'Check Availability',
    distKm: 1,
  },
  {
    id: 8,
    name: 'Nashik Gateway Business Hotel',
    zone: 'City Commercial Center',
    zoneKey: 'city',
    type: 'hotels',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#e5e2dd] text-[#564339]',
    rating: 4.3,
    reviews: '1,200',
    distance: '6 km from Ram Kund',
    price: 4500,
    priceTag: '/ night (Executive)',
    priceNote: 'Corporate discounts apply',
    strikePrice: 'Standard Rate',
    colorHex: '#ddc1b3',
    desc: 'Modern hotel away from the core crowd but with easy access via ring road. High-speed Wi-Fi, business center, and multi-cuisine restaurant.',
    amenities: [
      { icon: 'wifi', label: 'High-Speed Wi-Fi' },
      { icon: 'room_service', label: '24/7 Room Service' },
      { icon: 'meeting_room', label: 'Business Center' },
      { icon: 'local_taxi', label: 'Travel Desk' },
    ],
    ctaLabel: 'Book Hotel',
    distKm: 6,
  },
  {
    id: 9,
    name: 'Sita Gufa Pilgrim Rest',
    zone: 'Panchavati Core',
    zoneKey: 'panchavati',
    type: 'dharamshala',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#ffdbca] text-[#984300]',
    rating: 4.2,
    reviews: '4,500',
    distance: '100m from Sita Gufa',
    price: 400,
    priceTag: '/ night (Basic Room)',
    priceNote: 'First come first serve',
    strikePrice: 'Subsidized',
    colorHex: '#ffdbca',
    desc: 'Very basic accommodation right at the heart of Panchavati. Ideal for pilgrims wanting to stay exactly where the history happened.',
    amenities: [
      { icon: 'bed', label: 'Basic Bedding' },
      { icon: 'water_drop', label: 'Drinking Water' },
      { icon: 'wc', label: 'Common Toilets' },
      { icon: 'store', label: 'Near Markets' },
    ],
    ctaLabel: 'Walk-in Only',
    distKm: 1,
  },
  {
    id: 10,
    name: 'Trimbak Luxury Resort & Spa',
    zone: 'Trimbakeshwar Outskirts',
    zoneKey: 'trimbak',
    type: 'hotels',
    badge: 'SEPT 2026',
    badgeCls: 'bg-[#c1e8fc] text-[#3e6374]',
    rating: 4.8,
    reviews: '850',
    distance: '4 km from Jyotirlinga',
    price: 8500,
    priceTag: '/ night (Suite)',
    priceNote: 'Spa access included',
    strikePrice: 'Premium Package',
    colorHex: '#f0ede9',
    desc: 'A premium resort offering a peaceful escape from the Kumbh crowds. Includes a world-class spa, infinity pool, and fine dining.',
    amenities: [
      { icon: 'spa', label: 'Ayurvedic Spa' },
      { icon: 'pool', label: 'Infinity Pool' },
      { icon: 'restaurant', label: 'Fine Dining' },
      { icon: 'airport_shuttle', label: 'Helicopter Transfer' },
    ],
    ctaLabel: 'Reserve Suite',
    distKm: 4,
  },
];

const zones = [
  { key: 'all', label: 'All Sectors', count: 142 },
  { key: 'trimbak', label: 'Trimbakeshwar', count: 38 },
  { key: 'panchavati', label: 'Ram Kund & Panchavati', count: 44 },
  { key: 'tapovan', label: 'Tapovan Akhada', count: 26 },
  { key: 'city', label: 'Nashik City', count: 22 },
];

const priceRanges = [
  { id: 'p1', label: 'Subsidized Sewa (₹300 – ₹800)', max: 800 },
  { id: 'p2', label: 'Modest Comfort (₹1,000 – ₹2,500)', max: 2500 },
  { id: 'p3', label: 'Premium Pilgrim (₹3,000 – ₹6,500)', max: 6500 },
  { id: 'p4', label: 'Luxury Swiss Tents (₹7,000+)', max: Infinity },
];

const distanceFilters = [
  { id: 'd1', label: 'Walking (< 1 km from Ram Kund)', count: 18, max: 1 },
  { id: 'd2', label: '1 to 3 km (Shuttle zone)', count: 42, max: 3 },
  { id: 'd3', label: '3 to 5 km (Quiet Ashrams)', count: 35, max: 5 },
  { id: 'd4', label: '5 to 10 km (Highway Hubs)', count: 47, max: 10 },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-[#ba5814]">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}





export default function FoodPage() {
  const [lang, setLang] = useState('English');
  const [activeNav, setActiveNav] = useState('food');
  return (
    <div className="bg-[#fcf9f4] font-body text-[#1c1c19] antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>
      <div className="pt-12 md:pt-[116px]">
        <div className="w-full max-w-[1440px] mx-auto">
<div className="flex flex-wrap items-center gap-2 px-4 md:px-6 pt-6 pb-2">
<a className="text-[#966c4f] text-sm md:text-base font-medium leading-normal hover:underline" href="#">Home</a>
<span className="text-[#966c4f] text-sm md:text-base font-medium leading-normal">/</span>
<a className="text-[#966c4f] text-sm md:text-base font-medium leading-normal hover:underline" href="#">Devotee Services</a>
<span className="text-[#966c4f] text-sm md:text-base font-medium leading-normal">/</span>
<span className="text-[#1b130e] text-sm md:text-base font-medium leading-normal">Food &amp; Dining</span>
</div><div className="px-4 md:px-6 pt-4 pb-8">
<div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-surface-variant pb-6">
<div className="max-w-3xl">
<div className="flex items-center gap-2 mb-2">
<span className="h-0.5 w-6 bg-primary"></span>
<span className="text-xs font-bold uppercase tracking-wider text-primary">SIMHASTHA YATRI BHOJAN</span>
<span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed border border-outline-variant/50">NMC &amp; FDA Certified</span>
</div>
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display-lg font-bold text-on-surface tracking-tight leading-tight">
        Sacred Flavors &amp; Trusted Food for Every Devotee
      </h1>
<p className="mt-3 text-sm md:text-base text-on-surface-variant leading-relaxed">
        Discover verified pure vegetarian, Jain satvik, and traditional Maharashtrian bhojanalayas across Nashik, Panchavati, and Trimbakeshwar. Real-time open/closed status, distance to ghats, and pilgrim hygiene ratings.
      </p>
</div>
<div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant shadow-sm">
<div className="text-center px-2 py-1">
<div className="text-lg md:text-xl font-bold text-primary">86+</div>
<div className="text-[11px] text-on-surface-variant font-medium">Monitored Kitchens</div>
</div>
<div className="text-center px-2 py-1 border-x border-outline-variant/60">
<div className="text-lg md:text-xl font-bold text-secondary">100%</div>
<div className="text-[11px] text-on-surface-variant font-medium">RO Tested Water</div>
</div>
<div className="text-center px-2 py-1">
<div className="text-lg md:text-xl font-bold text-tertiary">₹140</div>
<div className="text-[11px] text-on-surface-variant font-medium">Govt Thali Cap</div>
</div>
</div>
</div>
</div>
{/*  Main Devotee Experience Container  */}
<main className="w-full max-w-[1360px] mx-auto px-4 md:px-8 pb-16 flex-1">
{/*  Top Search & Interactive Filter Bar  */}
<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-6 mb-8 shadow-sm">
<div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pb-4 border-b border-surface-variant">
{/*  Search Input  */}
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" data-icon="search">search</span>
<input className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="Search restaurants, bhojanalayas, or dishes (e.g. Maharashtrian Thali, Misal, Jain Bhojan, Sabudana Khichdi)..." type="text"/>
</div>
{/*  Zone Selector Dropdown  */}
<div className="relative min-w-[280px]">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary" data-icon="location_on">location_on</span>
<select className="w-full pl-10 pr-9 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none">
<option defaultValue="something">All Zones (Ram Kund, Trimbak, College Rd, Panchavati)</option>
<option>Ram Kund &amp; Godavari Ghats (Nashik Core)</option>
<option>Panchavati &amp; Sita Gufa Area</option>
<option>Trimbakeshwar Temple &amp; Kushavarta</option>
<option>Nashik Road Railway Station Corridor</option>
<option>College Road &amp; Mahatma Nagar Hub</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
{/*  View Toggle & Quick Actions  */}
<div className="flex items-center gap-2 shrink-0">
<div className="bg-surface-container p-1 rounded-lg flex items-center border border-outline-variant">
<button className="px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 bg-surface-container-lowest text-primary shadow-sm" title="Grid View">
<span className="material-symbols-outlined text-base" data-icon="grid_view">grid_view</span>
<span className="">Grid View</span>
</button>
<button className="px-3 py-1.5 rounded text-xs font-medium text-on-surface-variant hover:text-on-surface flex items-center gap-1.5" title="List &amp; Map Split">
<span className="material-symbols-outlined text-base" data-icon="splitscreen">splitscreen</span>
<span className="">Map Split</span>
</button>
</div>
</div>
</div>
{/*  Quick Filter Chips Scrollable Row  */}
<div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none text-xs">
<span className="text-outline uppercase font-semibold text-[11px] tracking-wider shrink-0 mr-1 flex items-center gap-1">
<span className="material-symbols-outlined text-sm" data-icon="filter_alt">filter_alt</span> Quick:
        </span>
<button className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-medium shrink-0 flex items-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-sm" data-icon="check">check</span> All Pure Veg (86)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-medium shrink-0 transition-colors">
          Jain Satvik (No Onion/Garlic) (34)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-medium shrink-0 transition-colors">
          Authentic Maharashtrian Thali (28)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-medium shrink-0 transition-colors">
          Upvas &amp; Fasting Specials (19)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-medium shrink-0 transition-colors">
          South Indian Pilgrim Breakfast (15)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-medium shrink-0 transition-colors">
          Budget Devotee Bhojanalaya (&lt; ₹150) (42)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-medium shrink-0 transition-colors flex items-center gap-1">
<span className="size-2 rounded-full bg-green-600"></span> Open Now (71)
        </button>
</div>
</section>
{/*  Main Content Grid: 25% Sidebar Filter + 75% Results Area  */}
<div className="grid grid-cols-1 gap-8 items-start">
{/*  Left Filter Sidebar (25% on desktop)  */}
{/*  Right Results Section (75% on desktop)  */}
<section className="space-y-6 w-full">{/*  Header Bar of Results with Sort Controls  */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-variant">
<div>
<h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
      Verified Satvik Bhojanalayas
      <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">48 Found</span>
</h2>
<p className="text-xs text-on-surface-variant">Showing active certified kitchens with verified water quality &amp; price controls</p>
</div>
<div className="flex items-center gap-2 text-xs">
<span className="text-outline font-medium shrink-0">Sort By:</span>
<select className="bg-surface-container-low border border-outline-variant text-on-surface rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary">
<option defaultValue="something">Proximity to Ram Kund / Current Location</option>
<option>Highest Pilgrim Rating</option>
<option>Price: Low to High</option>
<option>Shortest Queue Wait Time</option>
</select>
</div>
</div>
{/*  3 Cards in One Row (3-Column Grid)  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/*  CARD 1  */}
<article className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
{/*  Image Banner  */}
<div className="relative h-48 w-full overflow-hidden">
<img alt="Shree Krishna Vijay Maharashtrian Bhojanalaya" className="w-full h-full object-cover" data-alt="Authentic Maharashtrian traditional bronze thali served with piping hot jowar bhakri, fragrant pitla curry, spicy green thecha, steamed varan bhat rice, and sweet puran poli bathed in pure golden cow ghee. The rustic tabletop is illuminated by warm morning ambient light with copper vessels nearby, emphasizing sacred pilgrim purity and heritage hospitality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXjJhSHKG_mFbDh-7nRlLtRKkcQS8KfaHpb1bHGV9BDzbU9Bia4NHMFi0zcu-6pbBt0UanQ0c5Iyh0bcZm1tJwjUfVj0wANvRTqxLbUEsAlyiKhrOmZzrtswkR_SFvT06mQT2wz48ya2yHo_sbhDoktZZazGU6q_feGCaqSq0SEsCXbxVL9Wlp9GpRaH0yC5bSDV2SEu62NyaN93_nvJ_dIMcTeHYtBblm8hZkASjiNr8VEpNmZjlWrQ"/>
<div className="absolute top-2.5 left-2.5 bg-surface/95 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-outline-variant shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="restaurant">restaurant</span> 100% Satvik
        </div>
<div className="absolute top-2.5 right-2.5 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold text-on-surface shadow-sm border border-outline-variant/60">
          ₹140 Thali
        </div>
<div className="absolute bottom-2.5 left-2.5 bg-inverse-surface/90 text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[11px] text-tertiary-fixed" data-icon="schedule">schedule</span> Open · Wait: ~8 min
        </div>
</div>
{/*  Content Body  */}
<div className="p-4">
<div className="flex items-start justify-between gap-1">
<div>
<span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Heritage Thali Since 1968</span>
<h3 className="text-base font-headline-md font-bold text-on-surface leading-snug mt-0.5 line-clamp-1">Shree Krishna Vijay Bhojanalaya</h3>
</div>
<div className="flex items-center gap-0.5 bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant shrink-0">
<span className="material-symbols-outlined text-xs text-tertiary" data-icon="star" style={{ fontVariationSettings: "\'FILL\' 1" }}>star</span>
<span className="text-xs font-bold text-on-surface">4.8</span>
<span className="text-[10px] text-outline">(3.4k)</span>
</div>
</div>
{/*  Badges / Locality  */}
<div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-on-surface-variant">
<span className="flex items-center gap-1 text-primary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="near_me">near_me</span> 500m to Ram Kund
          </span>
<span className="text-outline">•</span>
<span className="flex items-center gap-1 text-secondary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="water_drop">water_drop</span> Certified RO
          </span>
<span className="text-outline">•</span>
<span className="text-[10px] font-medium text-outline">Panchavati Core</span>
</div>
{/*  Description  */}
<p className="text-xs text-on-surface mt-2.5 leading-relaxed bg-surface-container-low p-2 rounded border border-outline-variant/40 line-clamp-2">
<strong className="font-semibold text-primary">Pilgrim Highlights:</strong> Unlimited feast (Puran Poli, Kothimbir Vadi, Pitla Bhakri) &amp; Gir cow ghee in brass thalis.
        </p>
</div>
</div>
{/*  Bottom Action Bar with Location, Call & WhatsApp  */}
<div className="p-3 pt-0 border-t border-surface-variant/70 mt-2 flex items-center gap-2">
<a className="flex-1 py-1.5 px-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="#">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span> Location
      </a>
<a className="py-1.5 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="tel:+912532512345" title="Call Bhojanalaya">
<span className="material-symbols-outlined text-sm text-secondary" data-icon="call">call</span> Call
      </a>
<a className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors" href="https://wa.me/919822012345?text=Hare%20Krishna%20inquiring%20about%20bhojan" target="_blank" title="Chat on WhatsApp">
<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
        WhatsApp
      </a>
</div>
</article>
{/*  CARD 2  */}
<article className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
{/*  Image Banner  */}
<div className="relative h-48 w-full overflow-hidden">
<img alt="Trimbak Anandam Jain &amp; Satvik Bhojanalaya" className="w-full h-full object-cover" data-alt="A luminous and spotless Jain satvik dining hall near Trimbakeshwar temple featuring pristine stainless steel thalis filled with non-root satvik dishes, steamed white sabudana khichdi, aromatic golden kadhi, and tender phulka flatbreads. Soft filtered afternoon sunlight illuminates the calm spiritual setting with devotees peacefully honoring their meal." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtQlDLW3VFmEi564Dnv3anRgGP7c06KK_62jrOTcrAyQl_ApPt35pV8Pt1bK1rSXLupqUM1o7g4ejyHItmVyMAM13yt8CnAEWpgJwx5nnxBKbPXpgXsIY7w0vGDi3V51hD0XSpQkCUrqdScXF-t0WdvsrzYSrljmYibe7a6t7H_pkbiroT1oSk_TJ1Ka8qfSqEZ1YA10Dyi3sTOUx2oapGYx8nyTsE-FoEZSPSz99HE-8YLARHEw9L6A"/>
<div className="absolute top-2.5 left-2.5 bg-surface/95 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-secondary border border-outline-variant shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="eco">eco</span> Jain Maryada
        </div>
<div className="absolute top-2.5 right-2.5 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold text-on-surface shadow-sm border border-outline-variant/60">
          ₹120 Thali
        </div>
<div className="absolute bottom-2.5 left-2.5 bg-inverse-surface/90 text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[11px] text-tertiary-fixed" data-icon="bolt">bolt</span> Fast Seating · Chauvihar
        </div>
</div>
{/*  Content Body  */}
<div className="p-4">
<div className="flex items-start justify-between gap-1">
<div>
<span className="text-[10px] font-bold uppercase tracking-wider text-secondary">No Root Veg • Strict Maryada</span>
<h3 className="text-base font-headline-md font-bold text-on-surface leading-snug mt-0.5 line-clamp-1">Trimbak Anandam Jain Satvik</h3>
</div>
<div className="flex items-center gap-0.5 bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant shrink-0">
<span className="material-symbols-outlined text-xs text-tertiary" data-icon="star" style={{ fontVariationSettings: "\'FILL\' 1" }}>star</span>
<span className="text-xs font-bold text-on-surface">4.9</span>
<span className="text-[10px] text-outline">(2.2k)</span>
</div>
</div>
{/*  Badges / Locality  */}
<div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-on-surface-variant">
<span className="flex items-center gap-1 text-primary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="near_me">near_me</span> 300m Trimbak Gate
          </span>
<span className="text-outline">•</span>
<span className="flex items-center gap-1 text-secondary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="clean_hands">clean_hands</span> 5-Star NMC
          </span>
<span className="text-outline">•</span>
<span className="text-[10px] font-medium text-outline">Trimbakeshwar</span>
</div>
{/*  Description  */}
<p className="text-xs text-on-surface mt-2.5 leading-relaxed bg-surface-container-low p-2 rounded border border-outline-variant/40 line-clamp-2">
<strong className="font-semibold text-secondary">Pilgrim Highlights:</strong> Hot Phulkas with Gir Cow Ghee, fasting parva menu &amp; boiled medicinal herbal water.
        </p>
</div>
</div>
{/*  Bottom Action Bar with Location, Call & WhatsApp  */}
<div className="p-3 pt-0 border-t border-surface-variant/70 mt-2 flex items-center gap-2">
<a className="flex-1 py-1.5 px-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="#">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span> Location
      </a>
<a className="py-1.5 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="tel:+912532598765" title="Call Bhojanalaya">
<span className="material-symbols-outlined text-sm text-secondary" data-icon="call">call</span> Call
      </a>
<a className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors" href="https://wa.me/919822098765?text=Pranam%20requesting%20Jain%20thali%20timings" target="_blank" title="Chat on WhatsApp">
<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
        WhatsApp
      </a>
</div>
</article>
{/*  CARD 3  */}
<article className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
{/*  Image Banner  */}
<div className="relative h-48 w-full overflow-hidden">
<img alt="Panchavati Gaurav Thali &amp; Upvas Bhavan" className="w-full h-full object-cover" data-alt="A sumptuous family vegetarian feast with an assortment of small katori bowls containing rich yellow dal, paneer in tomato satvik gravy, puffed hot puris, golden shrikhand sweet, and cold spiced chaas buttermilk. Beautiful clean indoor air-conditioned hall with warm ambient ceiling chandeliers and neat linen-covered tables." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpMZeXM0xBQF7Sblc1c2vqif6h7Ymyid6CZ_bFzhMKC_tDvfZCTcQqvPNGF6sReN2mk95YJSZoqC1jcv8M7ork1K9cJ70INOJlKj-nXUBuutLMReU6nrkB00NSYqc5M9mbWz53PaWpZtdMf9Kf7jPwcoI-_bgzrOmFNpkagwctXxwxtLgExAGuO28jmE4PAGoL_j8TxuYc_IEYo7Gdk7ny9_5e_HcUJO_3AbRzItIgNNlM07LWgwAvVw"/>
<div className="absolute top-2.5 left-2.5 bg-surface/95 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-outline-variant shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="ac_unit">ac_unit</span> AC Hall &amp; Lift
        </div>
<div className="absolute top-2.5 right-2.5 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold text-on-surface shadow-sm border border-outline-variant/60">
          ₹220 Thali
        </div>
<div className="absolute bottom-2.5 left-2.5 bg-inverse-surface/90 text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[11px] text-tertiary-fixed" data-icon="family_restroom">family_restroom</span> Senior &amp; Wheelchair Friendly
        </div>
</div>
{/*  Content Body  */}
<div className="p-4">
<div className="flex items-start justify-between gap-1">
<div>
<span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Family &amp; Elder Pilgrim Care</span>
<h3 className="text-base font-headline-md font-bold text-on-surface leading-snug mt-0.5 line-clamp-1">Panchavati Gaurav Upvas Bhavan</h3>
</div>
<div className="flex items-center gap-0.5 bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant shrink-0">
<span className="material-symbols-outlined text-xs text-tertiary" data-icon="star" style={{ fontVariationSettings: "\'FILL\' 1" }}>star</span>
<span className="text-xs font-bold text-on-surface">4.7</span>
<span className="text-[10px] text-outline">(1.9k)</span>
</div>
</div>
{/*  Badges / Locality  */}
<div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-on-surface-variant">
<span className="flex items-center gap-1 text-primary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="near_me">near_me</span> Near Sita Gufa (400m)
          </span>
<span className="text-outline">•</span>
<span className="flex items-center gap-1 text-secondary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="accessible">accessible</span> Wheelchair Lift
          </span>
<span className="text-outline">•</span>
<span className="text-[10px] font-medium text-outline">Panchavati</span>
</div>
{/*  Description  */}
<p className="text-xs text-on-surface mt-2.5 leading-relaxed bg-surface-container-low p-2 rounded border border-outline-variant/40 line-clamp-2">
<strong className="font-semibold text-primary">Pilgrim Highlights:</strong> Dedicated Ekadashi vrat section (Rajgira Puri, Sabudana Vada, Shengdana Amti) &amp; cushioned seating.
        </p>
</div>
</div>
{/*  Bottom Action Bar with Location, Call & WhatsApp  */}
<div className="p-3 pt-0 border-t border-surface-variant/70 mt-2 flex items-center gap-2">
<a className="flex-1 py-1.5 px-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="#">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span> Location
      </a>
<a className="py-1.5 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="tel:+912532533445" title="Call Bhojanalaya">
<span className="material-symbols-outlined text-sm text-secondary" data-icon="call">call</span> Call
      </a>
<a className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors" href="https://wa.me/919822033445?text=Namaskar%20inquiring%20about%20senior%20thali%20booking" target="_blank" title="Chat on WhatsApp">
<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
        WhatsApp
      </a>
</div>
</article>
{/*  CARD 4  */}
<article className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
{/*  Image Banner  */}
<div className="relative h-48 w-full overflow-hidden">
<img alt="Shri Someshwar Satvik Uphar &amp; Misal Kendra" className="w-full h-full object-cover" data-alt="Authentic Nashik pilgrim-style yellow tarri misal served in a clean bowl garnished with crisp golden sev farsan, fresh coriander, and lemon slice, flanked by warm pav bread and a glass of steaming filter coffee. The setting is an open-air riverfront veranda overlooking the sacred Godavari ghats during early dawn." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkHixirR7-ryAYxLg2DqXbBSQW7yyPjq0xd57clxlxDZyk7ROy57wHcgjrzc3nERAh1EibSyjZDWpdIjXi80J6XMWHVsvTtEeRBUkaAy0tmnaQ-dKOsVNgVz6vXvUxqKQtOQlSGiH31dlgRszEMRF8uExNnviRqEYNIy-C1k1otU0wO382tex1tXSbB1vXNnoX-tpZQlpUyYc1MMr-0MqZPgvUUNutXBJjOIxAoytMFNOWfAZYAgrjwQ"/>
<div className="absolute top-2.5 left-2.5 bg-surface/95 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-outline-variant shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="wb_sunny">wb_sunny</span> Open 6:30 AM
        </div>
<div className="absolute top-2.5 right-2.5 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold text-on-surface shadow-sm border border-outline-variant/60">
          ₹70 - ₹110
        </div>
<div className="absolute bottom-2.5 left-2.5 bg-inverse-surface/90 text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[11px] text-tertiary-fixed" data-icon="waves">waves</span> Godavari River View
        </div>
</div>
{/*  Content Body  */}
<div className="p-4">
<div className="flex items-start justify-between gap-1">
<div>
<span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Iconic Breakfast &amp; Snacks</span>
<h3 className="text-base font-headline-md font-bold text-on-surface leading-snug mt-0.5 line-clamp-1">Shri Someshwar Satvik Misal</h3>
</div>
<div className="flex items-center gap-0.5 bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant shrink-0">
<span className="material-symbols-outlined text-xs text-tertiary" data-icon="star" style={{ fontVariationSettings: "\'FILL\' 1" }}>star</span>
<span className="text-xs font-bold text-on-surface">4.6</span>
<span className="text-[10px] text-outline">(4.1k)</span>
</div>
</div>
{/*  Badges / Locality  */}
<div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-on-surface-variant">
<span className="flex items-center gap-1 text-primary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="near_me">near_me</span> 700m Someshwar
          </span>
<span className="text-outline">•</span>
<span className="flex items-center gap-1 text-secondary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="verified">verified</span> Low-Spice Satvik
          </span>
<span className="text-outline">•</span>
<span className="text-[10px] font-medium text-outline">Gangapur Rd</span>
</div>
{/*  Description  */}
<p className="text-xs text-on-surface mt-2.5 leading-relaxed bg-surface-container-low p-2 rounded border border-outline-variant/40 line-clamp-2">
<strong className="font-semibold text-primary">Pilgrim Highlights:</strong> Mild satvik misal crafted without onion-garlic for pilgrims, steaming Kanda-less Poha &amp; filter coffee.
        </p>
</div>
</div>
{/*  Bottom Action Bar with Location, Call & WhatsApp  */}
<div className="p-3 pt-0 border-t border-surface-variant/70 mt-2 flex items-center gap-2">
<a className="flex-1 py-1.5 px-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="#">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span> Location
      </a>
<a className="py-1.5 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="tel:+912532545566" title="Call Bhojanalaya">
<span className="material-symbols-outlined text-sm text-secondary" data-icon="call">call</span> Call
      </a>
<a className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors" href="https://wa.me/919822045566?text=Jai%20Bholenath%20checking%20morning%20misal%20queue" target="_blank" title="Chat on WhatsApp">
<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
        WhatsApp
      </a>
</div>
</article>
{/*  CARD 5  */}
<article className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
{/*  Image Banner  */}
<div className="relative h-48 w-full overflow-hidden">
<img alt="Sant Tukaram Seva Trust Bhojanalaya" className="w-full h-full object-cover" data-alt="Spiritual community dining hall where sadhus and Hindu devotees sit side by side in peaceful communal harmony, being served hot wholesome dal, soft chapati rotis, and fresh seasonal vegetable curry from traditional copper buckets under soft golden temple pendant lights. The ambiance conveys profound humility, devotion, and cleanliness." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC90yQ8X8XwZW5sL4noZFEPZYlkgzyPhC8_WhmGwa2AvIwM5Requ5xIn4B9CUc5MFTfyAv9DhnEYN8_xBIqmJhx6tTej5lKdaf4dWTHvlTU8Ju_6atMlxF9Q9rS6cTVncuSUpvOhMvm0q29vzhkAsBirbGB6hPHfmxqmjSRp7LG4V_qz9bH16PDlwR-qeCjd_oAGfMA817Hj_Gy05XcnlcaMU3ZJ_8-Thdu39y0qpIKbORMa5WFdo35sA"/>
<div className="absolute top-2.5 left-2.5 bg-surface/95 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-outline-variant shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="volunteer_activism">volunteer_activism</span> Community Seva
        </div>
<div className="absolute top-2.5 right-2.5 bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 rounded text-[11px] font-bold shadow-sm">
          ₹50 Seva Token
        </div>
<div className="absolute bottom-2.5 left-2.5 bg-inverse-surface/90 text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[11px] text-tertiary-fixed" data-icon="confirmation_number">confirmation_number</span> Digital &amp; Offline Token
        </div>
</div>
{/*  Content Body  */}
<div className="p-4">
<div className="flex items-start justify-between gap-1">
<div>
<span className="text-[10px] font-bold uppercase tracking-wider text-primary">Devotional Non-Profit Kitchen</span>
<h3 className="text-base font-headline-md font-bold text-on-surface leading-snug mt-0.5 line-clamp-1">Sant Tukaram Seva Trust</h3>
</div>
<div className="flex items-center gap-0.5 bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant shrink-0">
<span className="material-symbols-outlined text-xs text-tertiary" data-icon="star" style={{ fontVariationSettings: "\'FILL\' 1" }}>star</span>
<span className="text-xs font-bold text-on-surface">4.9</span>
<span className="text-[10px] text-outline">(5.8k)</span>
</div>
</div>
{/*  Badges / Locality  */}
<div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-on-surface-variant">
<span className="flex items-center gap-1 text-primary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="near_me">near_me</span> 150m Kushavarta
          </span>
<span className="text-outline">•</span>
<span className="flex items-center gap-1 text-secondary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="health_and_safety">health_and_safety</span> Doctor Inspected
          </span>
<span className="text-outline">•</span>
<span className="text-[10px] font-medium text-outline">Trimbak Kund</span>
</div>
{/*  Description  */}
<p className="text-xs text-on-surface mt-2.5 leading-relaxed bg-surface-container-low p-2 rounded border border-outline-variant/40 line-clamp-2">
<strong className="font-semibold text-primary">Pilgrim Highlights:</strong> Subsidized sacred nourishment operated by Warkari Sampradaya. Dal-bhat, ghee chapatis &amp; chaas.
        </p>
</div>
</div>
{/*  Bottom Action Bar with Location, Call & WhatsApp  */}
<div className="p-3 pt-0 border-t border-surface-variant/70 mt-2 flex items-center gap-2">
<a className="flex-1 py-1.5 px-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="#">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span> Location
      </a>
<a className="py-1.5 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="tel:+912532578899" title="Call Bhojanalaya">
<span className="material-symbols-outlined text-sm text-secondary" data-icon="call">call</span> Call
      </a>
<a className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors" href="https://wa.me/919822078899?text=Ram%20Krishna%20Hari%20need%20seva%20token%20info" target="_blank" title="Chat on WhatsApp">
<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
        WhatsApp
      </a>
</div>
</article>
{/*  CARD 6  */}
<article className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
<div>
{/*  Image Banner  */}
<div className="relative h-48 w-full overflow-hidden">
<img alt="Samarth Satvik Bhojanalaya &amp; Annakshetra" className="w-full h-full object-cover" data-alt="Traditional Indian pilgrim dining hall with devotees partaking in satvik jowar bhakri, varan bhat rice, spicy roasted peanut thecha, and seasonal gourd curry in brass bowls with clean drinking copper water jugs on the tables." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXjJhSHKG_mFbDh-7nRlLtRKkcQS8KfaHpb1bHGV9BDzbU9Bia4NHMFi0zcu-6pbBt0UanQ0c5Iyh0bcZm1tJwjUfVj0wANvRTqxLbUEsAlyiKhrOmZzrtswkR_SFvT06mQT2wz48ya2yHo_sbhDoktZZazGU6q_feGCaqSq0SEsCXbxVL9Wlp9GpRaH0yC5bSDV2SEu62NyaN93_nvJ_dIMcTeHYtBblm8hZkASjiNr8VEpNmZjlWrQ"/>
<div className="absolute top-2.5 left-2.5 bg-surface/95 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-outline-variant shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="verified">verified</span> Unlimited Thali
        </div>
<div className="absolute top-2.5 right-2.5 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold text-on-surface shadow-sm border border-outline-variant/60">
          ₹110 Thali
        </div>
<div className="absolute bottom-2.5 left-2.5 bg-inverse-surface/90 text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[11px] text-tertiary-fixed" data-icon="schedule">schedule</span> Open All Day · No Break
        </div>
</div>
{/*  Content Body  */}
<div className="p-4">
<div className="flex items-start justify-between gap-1">
<div>
<span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Tapovan Devotee Hub</span>
<h3 className="text-base font-headline-md font-bold text-on-surface leading-snug mt-0.5 line-clamp-1">Samarth Satvik &amp; Annakshetra</h3>
</div>
<div className="flex items-center gap-0.5 bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant shrink-0">
<span className="material-symbols-outlined text-xs text-tertiary" data-icon="star" style={{ fontVariationSettings: "\'FILL\' 1" }}>star</span>
<span className="text-xs font-bold text-on-surface">4.8</span>
<span className="text-[10px] text-outline">(2.8k)</span>
</div>
</div>
{/*  Badges / Locality  */}
<div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-on-surface-variant">
<span className="flex items-center gap-1 text-primary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="near_me">near_me</span> 650m Tapovan Ghat
          </span>
<span className="text-outline">•</span>
<span className="flex items-center gap-1 text-secondary font-medium">
<span className="material-symbols-outlined text-xs" data-icon="water_drop">water_drop</span> UV Pure Water
          </span>
<span className="text-outline">•</span>
<span className="text-[10px] font-medium text-outline">Tapovan Marg</span>
</div>
{/*  Description  */}
<p className="text-xs text-on-surface mt-2.5 leading-relaxed bg-surface-container-low p-2 rounded border border-outline-variant/40 line-clamp-2">
<strong className="font-semibold text-primary">Pilgrim Highlights:</strong> Khandeshi jowar bhakri, varan bhat rice, fresh koshimbir salad &amp; aromatic Godavari saar.
        </p>
</div>
</div>
{/*  Bottom Action Bar with Location, Call & WhatsApp  */}
<div className="p-3 pt-0 border-t border-surface-variant/70 mt-2 flex items-center gap-2">
<a className="flex-1 py-1.5 px-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="#">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span> Location
      </a>
<a className="py-1.5 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors" href="tel:+912532587711" title="Call Bhojanalaya">
<span className="material-symbols-outlined text-sm text-secondary" data-icon="call">call</span> Call
      </a>
<a className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors" href="https://wa.me/919822087711?text=Jay%20Shree%20Ram%20inquiring%20about%20Tapovan%20annakshetra" target="_blank" title="Chat on WhatsApp">
<svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
        WhatsApp
      </a>
</div>
</article>
</div>
{/*  Pagination Bar  */}
<div className="flex items-center justify-between pt-4 border-t border-surface-variant">
<p className="text-xs text-on-surface-variant">Showing 1 to 6 of 48 bhojanalayas</p>
<div className="flex items-center gap-1">
<button className="px-3 py-1.5 rounded border border-outline-variant text-xs text-outline disabled:opacity-50" disabled>Previous</button>
<button className="px-3 py-1.5 rounded bg-primary text-on-primary text-xs font-bold">1</button>
<button className="px-3 py-1.5 rounded border border-outline-variant hover:bg-surface-container text-xs font-medium">2</button>
<button className="px-3 py-1.5 rounded border border-outline-variant hover:bg-surface-container text-xs font-medium">3</button>
<span className="px-1 text-xs text-outline">...</span>
<button className="px-3 py-1.5 rounded border border-outline-variant hover:bg-surface-container text-xs font-medium">8</button>
<button className="px-3 py-1.5 rounded border border-outline-variant text-xs text-on-surface font-semibold hover:bg-surface-container">Next</button>
</div>
</div></section>
</div>
{/*  Curated Specialty Guide Section: Nashik Kumbh Culinary Traditions  */}
{/*  Devotee Guidance & Drinking Water Quality Map preview  */}
</main>
        </div>
      </div>
      <Footer />
      <MobileBottomNav active="food" />
    </div>
  );
}
