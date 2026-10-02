'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const MS = ({ name, cls = '' }: { name: string; cls?: string }) => (
  <span className={`material-symbols-outlined ${cls}`}>{name}</span>
);

/* ─── COMPONENT: Topbar ─────────────────────────────────────────── */

function Topbar({ lang, setLang }: { lang: string; setLang: (l: string) => void }) {
  return (
    <div className="bg-[#f6f3ee] border-b border-[#e5e2dd]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-9">
        <div className="flex items-center gap-2">
          <span className="bg-[#984300]/10 text-[#984300] text-[11px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold leading-none">Nashik–Trimbakeshwar 2027</span>
          <span className="text-[#897267] text-[11px] hidden md:inline">•</span>
          <span className="text-[#564339] text-[11px] hidden md:inline">Official Devotee Portal</span>
        </div>
        <div className="hidden lg:flex items-center gap-1 flex-1 max-w-xl mx-6">
          <MS name="campaign" cls="text-[#984300] text-[15px] shrink-0" />
          <p className="text-[11px] text-[#564339] truncate">
            <span className="text-[#984300] font-semibold">Alert:</span> Shahi Snan Schedule Released • Heavy traffic expected on Trimbak Road • Helpdesks active 24x7
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#564339]">
          <div className="flex items-center gap-1">
            <button onClick={() => setLang('mr')} className={`${lang === 'mr' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'} transition-colors`}>मराठी</button>
            <span>|</span>
            <button onClick={() => setLang('hi')} className={`${lang === 'hi' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'} transition-colors`}>हिंदी</button>
            <span>|</span>
            <button onClick={() => setLang('en')} className={`${lang === 'en' ? 'text-[#984300] font-semibold' : 'hover:text-[#984300]'} transition-colors`}>English</button>
          </div>
          <span className="text-[#ddc1b3]">|</span>
          <a href="tel:112" className="flex items-center gap-1 text-[#ba1a1a] hover:text-[#1c1c19] transition-colors font-semibold">
            <MS name="call" cls="text-[14px]" /><span>112 / 108</span>
          </a>
          <span className="text-[#ddc1b3] hidden sm:inline">|</span>
          <a href="#" className="hover:text-[#984300] transition-colors hidden sm:inline">Help Centre</a>
          <span className="text-[#ddc1b3] hidden sm:inline">|</span>
          <a href="#" className="hover:text-[#984300] transition-colors hidden sm:inline font-medium">My Trip</a>
        </div>
      </div>
    </div>
  );
}

/* ─── COMPONENT: Navbar ─────────────────────────────────────────── */

function Navbar({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (n: string) => void }) {
  const links = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'darshan', label: 'Darshan', href: '/darshan' },
    { id: 'map', label: 'Map', href: '/map' },
    { id: 'stay', label: 'Stay', href: '/stay' },
    { id: 'food', label: 'Food', href: '/food' },
    { id: 'annadan', label: 'Annadan', href: '/annadan' },
    { id: 'camps', label: 'Camps & Akhadas', href: '/camps' },
    { id: 'emergency', label: 'Emergency', href: '/emergency' },
    { id: 'lost-and-found', label: 'Lost & Found', href: '/lost-found' },
  ];

  return (
    <div className="bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#e5e2dd]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0 py-1">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Nashik Kumbh Mela 2027 Logo"
              className="h-14 lg:h-16 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>
          <Link href="/">
            <span className="text-[20px] lg:text-[22px] font-bold text-[#984300] tracking-tight leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nashik Kumbh Mela 2027
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-4 h-full">
          {links.map(l => (
            <Link
              key={l.id}
              href={l.href}
              onClick={() => setActiveNav(l.id)}
              className={`h-full flex items-center px-1 text-[13px] transition-colors ${activeNav === l.id
                  ? 'text-[#984300] font-semibold border-b-2 border-[#984300]'
                  : 'text-[#564339] hover:text-[#1c1c19]'
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-9 h-9 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#564339] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors">
            <MS name="search" cls="text-[20px]" />
          </button>
          <a
            href="tel:112"
            className="flex items-center gap-1.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white px-3 py-2 rounded-lg text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-soft-pulse" />
            <span>SOS</span>
          </a>
          <a
            href="/#trip"
            className="bg-[#984300] hover:bg-[#ba5814] text-white px-4 py-2 rounded-lg text-[12px] font-semibold tracking-wide transition-colors shadow-sm hidden sm:inline-flex items-center"
          >
            Plan My Trip
          </a>
          <div className="w-8 h-8 rounded-full bg-[#984300] flex items-center justify-center">
            <MS name="person" cls="text-white text-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default function LostFoundPage() {
  const [lang, setLang] = useState('English');
  const [activeNav, setActiveNav] = useState('lost-and-found');
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>
      <main className="w-full pt-12 md:pt-[116px] bg-surface min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-116px)]">
        <div className="flex flex-col w-full">
<div className="flex flex-col w-full">
{/* Top Utility Ribbon / Trust Anchor */}
<section className="w-full bg-surface-container-low border-b-0 py-space-sm px-margin-mobile md:px-margin">
<div className="max-w-[1320px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm text-label-sm font-label-sm">
<a className="text-on-surface-variant hover:text-primary transition-colors" data-path="home" href="#">Home</a>
<span className="text-outline-variant">/</span>
<span className="text-on-surface-variant">Pilgrim Support</span>
<span className="text-outline-variant">/</span>
<span className="text-primary font-semibold">Khoya-Paya Bureau (Lost & Found)</span>
</div>
<div className="flex items-center gap-space-xs self-start md:self-auto bg-surface px-space-md py-1 rounded-full shadow-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-soft-pulse"></span>
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
          Official Police & District Administration Network • 22 Sectors Connected
        </span>
</div>
</div>
</section>
{/* Bureau Editorial Banner */}
<section className="relative w-full bg-surface py-space-xl px-margin-mobile md:px-margin overflow-hidden">
<div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
<div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
<div className="relative max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
<div className="lg:col-span-8 space-y-space-md">
<div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded bg-primary/10 text-primary font-label-sm text-label-sm font-bold tracking-widest uppercase">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span>Authorized Pilgrim Reunification Bureau • Simhastha 2027</span>
</div>
<h1 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg text-on-surface tracking-tight">
          Devotee Khoya-Paya Portal
        </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          A dignified, privacy-protected reunification sanctuary for separated family members, vulnerable elders, and pilgrims. Reports dispatch instantly to 28 on-ground welfare kiosks, 350+ mobile police marshals, and central multi-lingual public address towers.
        </p>
{/* Privacy Shield Declaration */}
<div className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-low shadow-sm">
<span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
<div>
<span className="font-title-md text-body-sm font-semibold text-on-surface block">Privacy Safeguard Guarantee</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              To safeguard children and women pilgrims, no photographs or sensitive dossiers are published into public searchable feeds. All information is confidential and monitored strictly by sworn police officers, Child Welfare Committee (CWC) volunteers, and accredited health desks.
            </p>
</div>
</div>
</div>
{/* Quick Metrics Telemetry Card */}
<div className="lg:col-span-4 bg-surface-container rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md">
<div className="flex items-center justify-between pb-space-sm border-b border-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">24-Hour Bureau Status</span>
<span className="px-space-xs py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">Live System</span>
</div>
<div className="grid grid-cols-2 gap-space-md">
<div className="p-space-sm bg-surface-container-lowest rounded-lg">
<span className="block font-headline-lg text-headline-lg text-primary">1,482</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Pilgrims Reunited</span>
</div>
<div className="p-space-sm bg-surface-container-lowest rounded-lg">
<span className="block font-headline-lg text-headline-lg text-secondary">28</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Active Sector Booths</span>
</div>
<div className="p-space-sm bg-surface-container-lowest rounded-lg">
<span className="block font-headline-lg text-headline-lg text-tertiary">420</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Loudspeaker Nodes</span>
</div>
<div className="p-space-sm bg-surface-container-lowest rounded-lg">
<span className="block font-headline-lg text-headline-lg text-on-surface">11 min</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Avg. First Response</span>
</div>
</div>
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-on-surface-variant pt-space-xs">
<span className="material-symbols-outlined text-primary text-[16px]">sensors</span>
<span>Automated broadcast grid active across Godavari riverside</span>
</div>
</div>
</div>
</section>
{/* Primary Action Choice Grid */}
<section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
<div className="max-w-[1320px] mx-auto space-y-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
<div>
<span className="font-label-md text-label-md text-primary uppercase font-bold tracking-widest">Immediate Registration</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface">Choose Your Report Type</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
          Please select the category matching your immediate situation for accurate routing to field personnel.
        </p>
</div>
{/* Action Cards Trio */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
{/* Card 1: Missing Person (Active Primary) */}
<button className="group text-left p-space-lg rounded-xl bg-surface-container-lowest shadow-md transition-all duration-300 ring-2 ring-primary relative overflow-hidden flex flex-col justify-between" id="btnTabMissing" type="button">
<div className="space-y-space-md">
<div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
</div>
<div>
<div className="flex items-center justify-between">
<h3 className="font-headline-md text-headline-md text-on-surface">Missing Family Member</h3>
<span className="w-3 h-3 rounded-full bg-primary"></span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Have you lost contact with a travel companion, child, or elderly relative in the crowd or bathing ghats?
              </p>
</div>
</div>
<div className="pt-space-lg flex items-center justify-between text-label-md font-label-md text-primary font-bold">
<span>Fill Registration Form</span>
<span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</button>
{/* Card 2: Found Person / Child */}
<button className="group text-left p-space-lg rounded-xl bg-surface-container shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between" id="btnTabFound" type="button">
<div className="space-y-space-md">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
</div>
<div>
<div className="flex items-center justify-between">
<h3 className="font-headline-md text-headline-md text-on-surface">Found Person / Child</h3>
<span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold">Urgent Care</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Have you found an unaccompanied child, separated senior citizen, or disoriented devotee needing shelter?
              </p>
</div>
</div>
<div className="pt-space-lg flex items-center justify-between text-label-md font-label-md text-secondary font-bold">
<span>Alert Nearby Rescue Team</span>
<span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</button>
{/* Card 3: Belongings & Documents */}
<button className="group text-left p-space-lg rounded-xl bg-surface-container shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between" id="btnTabBelonging" type="button">
<div className="space-y-space-md">
<div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
</div>
<div>
<div className="flex items-center justify-between">
<h3 className="font-headline-md text-headline-md text-on-surface">Lost Belongings / ID</h3>
<span className="font-label-sm text-label-sm bg-tertiary-fixed-dim/40 text-tertiary px-2 py-0.5 rounded-full font-bold">Locker Grid</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Report misplaced identification (Aadhaar, Passport), travel bags, wallets, phones, or holy items.
              </p>
</div>
</div>
<div className="pt-space-lg flex items-center justify-between text-label-md font-label-md text-tertiary font-bold">
<span>Report Valuables</span>
<span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</button>
</div>
</div>
</section>
{/* Interactive Form Workspace (Split Screen Layout) */}
<section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin">
<div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
{/* Form Body Column (7 Cols) */}
<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm">
<div className="border-b border-surface-variant pb-space-md mb-space-lg">
<div className="flex items-center gap-space-xs text-primary font-label-md text-label-md font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-[18px]">emergency_home</span>
<span>Emergency Case Registration</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-1" id="formHeaderTitle">
            Report a Missing Family Member
          </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Information entered here triggers immediate alerts on the Kumbh Police intranet and sends broadcast prompts to the selected sector's announcement podium.
          </p>
</div>
<form className="space-y-space-xl" id="khoyaPayaForm" onSubmit={(e) => e.preventDefault()}>
{/* Section 1: Missing Person Details */}
<div className="space-y-space-md">
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">1</span>
<h3 className="font-title-md text-title-md text-on-surface">Separated Person Profile</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Full Name (as pronounced)</label>
<input className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all" placeholder="e.g., Shrimati Savita Devi Patil" required type="text"/>
</div>
<div className="grid grid-cols-2 gap-space-sm">
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Gender</label>
<select className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary">
<option>Female</option>
<option>Male</option>
<option>Child (Boy)</option>
<option>Child (Girl)</option>
<option>Other / Transgender</option>
</select>
</div>
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Approx. Age</label>
<input className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary" max="110" min="1" placeholder="e.g., 68" required type="number"/>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Primary Languages Spoken</label>
<input className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="e.g., Marathi, Hindi, Bundelkhandi" type="text"/>
</div>
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Height / Complexion / Posture</label>
<input className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="e.g., 5'2&quot;, fair, uses bamboo walking stick" type="text"/>
</div>
</div>
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Clothing & Visual Identifiers When Last Seen</label>
<textarea className="w-full p-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="e.g., Yellow Nauvari sari with red border, brown chappals, rudraksha mala around neck, carrying small green cloth bag with copper kalash." rows={2}></textarea>
</div>
{/* Secure Photo Upload Slot (Facial verification) */}
<div className="p-space-md bg-surface-container-low rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[24px]">add_a_photo</span>
</div>
<div>
<span className="font-title-md text-body-sm font-semibold text-on-surface block">Upload Recent Photograph (Optional)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Encrypted directly to Police facial recognition matching cameras. Never made public.</span>
</div>
</div>
<label className="px-space-md py-2 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md cursor-pointer hover:bg-on-secondary-container transition-colors shrink-0">
<span>Select Photo</span>
<input accept="image/*" className="hidden" onChange={() => {}} type="file"/>
</label>
</div>
<div className="font-label-sm text-label-sm text-secondary hidden" id="photoStatusText">File attached: encrypted and pending review.</div>
</div>
{/* Section 2: Location & Timing Details */}
<div className="space-y-space-md pt-space-md border-t border-surface-variant">
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm flex items-center justify-center font-bold">2</span>
<h3 className="font-title-md text-title-md text-on-surface">Separation Circumstances</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Last Known Sector / Ghat</label>
<select className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary">
<option>Ram Kund Main Snan Ghat (Nashik)</option>
<option>Tapovan Akhada Marg & Sadhu Gram</option>
<option>Trimbakeshwar Mandir North Gate Line</option>
<option>Kushavarta Kund Precincts (Trimbak)</option>
<option>Godavari Laxman Rekha Bridge Sector</option>
<option>Panchavati Sita Gufa Approach</option>
<option>Nilgiri Satellite Bus Holding Ground</option>
<option>Nashik Road Railway Station Yatri Shelter</option>
<option>CBS Central Bus Stand Corridor</option>
<option>Other / Unsure of Sector Name</option>
</select>
</div>
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Date & Time Last Contacted</label>
<div className="grid grid-cols-2 gap-space-xs">
<input className="w-full h-[52px] bg-surface-container-low px-space-sm rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary" type="date" defaultValue="2027-08-14"/>
<input className="w-full h-[52px] bg-surface-container-low px-space-sm rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary" type="time" defaultValue="09:30"/>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Medical Condition / Urgency</label>
<select className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary">
<option>No known acute condition</option>
<option>Diabetic (Needs insulin/meals)</option>
<option>Dementia / Memory Loss</option>
<option>Cardiac / Blood Pressure Prescriptions</option>
<option>Hearing / Speech Impairment</option>
<option>Vulnerable Young Child ({`<`} 8 yrs)</option>
</select>
</div>
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Does person have an ID Wristband?</label>
<select className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary">
<option>Yes — Kumbh QR Band / NFC tag</option>
<option>No Wristband</option>
<option>Has written phone number in pocket/bag</option>
</select>
</div>
</div>
</div>
{/* Section 3: Complainant / Reporting Devotee Details */}
<div className="space-y-space-md pt-space-md border-t border-surface-variant">
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm flex items-center justify-center font-bold">3</span>
<h3 className="font-title-md text-title-md text-on-surface">Your Current Contact Information</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div className="space-y-1 md:col-span-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Your Name</label>
<input className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Your name" required type="text"/>
</div>
<div className="space-y-1 md:col-span-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Relationship</label>
<select className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary">
<option>Son / Daughter</option>
<option>Spouse</option>
<option>Parent</option>
<option>Tour / Ashram Group Leader</option>
<option>Fellow Pilgrim / Friend</option>
</select>
</div>
<div className="space-y-1 md:col-span-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Active Mobile Number</label>
<input className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="+91 98765 43210" required type="tel"/>
</div>
</div>
<div className="space-y-1">
<label className="font-label-md text-label-md text-on-surface-variant block font-medium">Your Current Wait Location / Base Camp / Ashram</label>
<input className="w-full h-[52px] bg-surface-container-low px-space-md rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="e.g., Waiting near Ram Kund Police Booth #4 / staying at Geeta Bhavan Ashram Room 12" type="text"/>
</div>
</div>
{/* Submission Action Bar */}
<div className="pt-space-md border-t border-surface-variant space-y-space-md">
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-on-surface-variant">
<span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
<span>An instant SMS confirmation with unique tracking token (e.g. KP-2027-8492) will be sent to your phone.</span>
</div>
<div className="flex flex-col sm:flex-row items-center gap-space-md">
<button className="w-full sm:w-auto px-space-xl h-12 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-space-xs shadow-md" type="submit">
<span className="material-symbols-outlined text-[20px]">send_time_extension</span>
<span>Submit & Broadcast Missing Alert</span>
</button>
<a className="w-full sm:w-auto px-space-lg h-12 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-colors flex items-center justify-center gap-space-xs" href="tel:1912">
<span className="material-symbols-outlined text-error text-[20px]">phone_in_talk</span>
<span>Direct Police Desk 1912</span>
</a>
</div>
</div>
</form>
{/* Simulated Success Modal Overlay (Hidden initially) */}
<div className="mt-space-lg hidden p-space-lg bg-surface-container-low rounded-xl" id="submissionSuccessBanner">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[24px]">verified</span>
</div>
<div className="space-y-space-xs">
<span className="font-headline-md text-headline-md text-on-surface">Report Registered Successfully</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Token <span className="font-bold text-primary">#NK-KP-2027-9411</span> has been dispatched to sector officers at Ram Kund, Panchavati, and mobile rapid squads.
              </p>
<div className="pt-space-xs flex flex-wrap gap-space-sm text-label-sm font-label-sm">
<span className="bg-surface px-space-sm py-1 rounded">Status: Broadcasting Audio</span>
<span className="bg-surface px-space-sm py-1 rounded">Marshal Alert: 14 Active</span>
<span className="bg-surface px-space-sm py-1 rounded">SMS Sent to Registered Phone</span>
</div>
</div>
</div>
</div>
</div>
{/* Supportive Sidebar (5 Cols) */}
<div className="lg:col-span-5 space-y-space-lg">
{/* Live Physical Khoya-Paya Desk Locator */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[22px]">storefront</span>
<h3 className="font-title-md text-title-md text-on-surface">Physical Khoya-Paya Booths</h3>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold">28 Available 24x7</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            If you have lost someone or found a separated pilgrim, escort them safely to any marked bureau booth equipped with shade, water, doctors, and multi-lingual announcers.
          </p>
<div className="space-y-space-sm">
{/* Booth Item 1 */}
<div className="p-space-md bg-surface-container-low rounded-lg flex items-start justify-between gap-space-sm hover:bg-surface-container transition-colors">
<div className="space-y-0.5">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-body-md font-semibold text-on-surface">Ram Kund Central Gate #1</span>
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Near Ahilyabai Holkar Bridge entrance</p>
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-outline pt-1">
<span className="material-symbols-outlined text-[14px]">volume_up</span>
<span>Marathi • Hindi • Gujarati Announcer on site</span>
</div>
</div>
<span className="px-space-xs py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shrink-0">Sector A</span>
</div>
{/* Booth Item 2 */}
<div className="p-space-md bg-surface-container-low rounded-lg flex items-start justify-between gap-space-sm hover:bg-surface-container transition-colors">
<div className="space-y-0.5">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-body-md font-semibold text-on-surface">Tapovan Sadhu Gram Sector 2</span>
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Main Akhada Camp Intersection Pandal</p>
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-outline pt-1">
<span className="material-symbols-outlined text-[14px]">medical_services</span>
<span>First Aid + Senior resting cots available</span>
</div>
</div>
<span className="px-space-xs py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shrink-0">Sector D</span>
</div>
{/* Booth Item 3 */}
<div className="p-space-md bg-surface-container-low rounded-lg flex items-start justify-between gap-space-sm hover:bg-surface-container transition-colors">
<div className="space-y-0.5">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-body-md font-semibold text-on-surface">Trimbakeshwar Temple Line Booth</span>
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Near Jyotirlinga East Darshan Q-Complex</p>
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-outline pt-1">
<span className="material-symbols-outlined text-[14px]">child_friendly</span>
<span>Special Child Care & feeding corner</span>
</div>
</div>
<span className="px-space-xs py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shrink-0">Trimbak #1</span>
</div>
{/* Booth Item 4 */}
<div className="p-space-md bg-surface-container-low rounded-lg flex items-start justify-between gap-space-sm hover:bg-surface-container transition-colors">
<div className="space-y-0.5">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-body-md font-semibold text-on-surface">Nilgiri Satellite Bus Terminal</span>
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Platform 3 Devotee Assembly Hall</p>
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-outline pt-1">
<span className="material-symbols-outlined text-[14px]">cell_tower</span>
<span>Direct link to ST bus dispatches</span>
</div>
</div>
<span className="px-space-xs py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shrink-0">Hub #4</span>
</div>
</div>
<a className="w-full py-2.5 bg-surface-container hover:bg-surface-container-high rounded-lg text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors" data-path="map" href="#">
<span className="material-symbols-outlined text-[18px]">map</span>
<span>View All 28 Booths on Interactive Map</span>
</a>
</div>
{/* Preventive Free RFID / QR Safety Band Card */}
<div className="relative bg-secondary text-on-secondary rounded-xl p-space-lg shadow-md overflow-hidden">
<div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl"></div>
<div className="relative space-y-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary-fixed text-[24px]">qr_code_scanner</span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed font-bold">Preventive Care</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-secondary">
                Free RFID & QR Wristbands for Children & Seniors
              </h3>
<p className="font-body-sm text-body-sm text-secondary-container mt-1">
                Before entering dense bathing ghats, pick up a waterproof emergency QR band containing the guardian's contact number at any of the 8 railway & highway entry points.
              </p>
</div>
<div className="pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary-fixed">Available 24x7 at All Entry Gates</span>
<a className="px-space-md py-1.5 bg-on-secondary text-secondary font-label-md text-label-md rounded font-semibold hover:bg-secondary-fixed transition-colors" data-path="help" href="#">
                Kiosk Locations
              </a>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Editorial Section: How the Reunification Machinery Functions */}
<section className="w-full bg-surface-container-low py-space-xl px-margin-mobile md:px-margin">
<div className="max-w-[1320px] mx-auto space-y-space-xl">
<div className="max-w-2xl">
<span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Protocol & Transparency</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">How Devotees Are Safely Reunited</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">
          During peak Shahi Snan days when millions gather on the Godavari banks, our integrated humanitarian and policing workflow ensures calm, swift reunion without panic.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
{/* Step 1 */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md flex flex-col justify-between">
<div className="space-y-space-sm">
<span className="font-headline-xl text-headline-xl text-primary font-serif">01</span>
<h3 className="font-title-md text-title-md text-on-surface">Immediate Handheld Sync</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              The moment your report is submitted online or at a booth, encrypted data alerts trigger on 350+ mobile devices held by police marshals, boat rescue teams, and Boy Scout volunteers.
            </p>
</div>
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-secondary">
<span className="material-symbols-outlined text-[16px]">sync_saved_locally</span>
<span>Real-time sector distribution</span>
</div>
</div>
{/* Step 2 */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md flex flex-col justify-between">
<div className="space-y-space-sm">
<span className="font-headline-xl text-headline-xl text-primary font-serif">02</span>
<h3 className="font-title-md text-title-md text-on-surface">Targeted Sector Broadcast</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Specially trained multilingual announcers broadcast gentle messages through the 420-speaker sound grid, guiding the separated person to stay in place or approach the nearest yellow tent.
            </p>
</div>
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-secondary">
<span className="material-symbols-outlined text-[16px]">record_voice_over</span>
<span>Marathi, Hindi, Gujarati, Telugu</span>
</div>
</div>
{/* Step 3 */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md flex flex-col justify-between">
<div className="space-y-space-sm">
<span className="font-headline-xl text-headline-xl text-primary font-serif">03</span>
<h3 className="font-title-md text-title-md text-on-surface">Dignified Care Pandals</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Separated children and elders rest inside safe, air-cooled humanitarian pandals with warm food, clean drinking water, and professional counselors until family identity is verified.
            </p>
</div>
<div className="flex items-center gap-space-xs text-label-sm font-label-sm text-secondary">
<span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
<span>Supervised by Child Welfare Officers</span>
</div>
</div>
</div>
</div>
</section>
{/* Photo & Location Documentary Feature */}
<section className="w-full bg-surface py-space-xl px-margin-mobile md:px-margin">
<div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
<div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-md h-80">
<img className="w-full h-full object-cover" data-alt="A peaceful and well-organized pilgrim assistance booth by the ancient stone steps of Godavari River at Nashik Kumbh Mela. Warm natural morning sunlight illuminates caring female police officers and volunteers offering water and reassurance to elderly pilgrims and families. Saffron and deep blue canvas banners with official insignia, sacred temple spires visible in the soft background haze." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4lf7otSK35bmgmrYLXvI33zEMM92TmLbXwh0I1S0Mt0T68_UjRw0m0nVGYM9DZIzpY3CUbCMCkc1I6NNFeps3TG9yYYOvKqWrDCUjYRlqs-SiWjKm3tnvZRNy4Qg-T_vsonnK8fdxQQxXolFt-rF3V_Ml_jgGJylvoS3joiS13Ca-E7_ttPQ8jqp-Ti_t1np5MF5x-Qeh_o95rVTUs4H4uTeSxncizeTn_cvaWAzNUSToo0gHcSIEAg"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent flex items-end p-space-lg">
<div className="text-on-primary space-y-1">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed font-bold">Safe Assembly Sanctuaries</span>
<h4 className="font-title-md text-title-md">Ram Kund Central Care Pandal #1</h4>
<p className="font-body-sm text-body-sm text-surface-variant">Equipped with resting cots, baby nursing cabins, and dedicated ambulance standby.</p>
</div>
</div>
</div>
<div className="lg:col-span-6 space-y-space-md">
<span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Compassionate Devotion</span>
<h3 className="font-headline-xl text-headline-xl text-on-surface">
          What To Do If You Are Separated From Your Group
        </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
          Crowd movements during holy bathing hours can separate groups within seconds. Remember these 3 vital rules:
        </p>
<ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface">
<li className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">location_on</span>
<div>
<span className="font-semibold block">Freeze in Place at a Tall Landmark</span>
<span>Do not rush against crowd currents. Look for numbered loudspeaker poles or sector flags and wait there.</span>
</div>
</li>
<li className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">badge</span>
<div>
<span className="font-semibold block">Approach Khaki Uniform or Yellow Jacket Marshals</span>
<span>Every 50 meters on the ghats, authorized Kumbh Sewa volunteers and police officers can immediately check registry tokens.</span>
</div>
</li>
<li className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">lock_person</span>
<div>
<span className="font-semibold block">Avoid Leaving Sector Boundaries With Strangers</span>
<span>Always verify that someone accompanying a lost child or elder escorts them strictly into an official government marquee.</span>
</div>
</li>
</ul>
</div>
</div>
</section>
{/* Emergency Hotlines Band */}
<section className="w-full bg-surface-container-highest py-space-lg px-margin-mobile md:px-margin">
<div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[26px]">support_agent</span>
</div>
<div>
<span className="font-title-md text-title-md text-on-surface block">Need Immediate Voice Assistance?</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Speak to a dedicated Lost & Found coordinator right now. Operates in 6 regional languages.</p>
</div>
</div>
<div className="flex flex-wrap items-center gap-space-md">
<a className="px-space-lg py-2.5 bg-surface text-on-surface hover:bg-surface-container-low rounded-lg font-title-md text-body-md font-bold flex items-center gap-space-xs shadow-sm transition-colors" href="tel:1912">
<span className="material-symbols-outlined text-error text-[18px]">phone_enabled</span>
<span>Toll-Free Helpline: 1912</span>
</a>
<a className="px-space-lg py-2.5 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-title-md text-body-md font-bold flex items-center gap-space-xs shadow-sm transition-colors" href="https://wa.me/919422020270" target="_blank">
<span className="material-symbols-outlined text-[18px]">chat</span>
<span>WhatsApp Desk: +91 94220 20270</span>
</a>
</div>
</div>
</section>
</div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
