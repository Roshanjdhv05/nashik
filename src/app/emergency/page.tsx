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

export default function EmergencyPage() {
  const [lang, setLang] = useState('English');
  const [activeNav, setActiveNav] = useState('emergency');
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>
      <main className="w-full pt-[116px] bg-surface min-h-[calc(100vh-116px)]">
        <div className="flex flex-col w-full">
<div className="flex flex-col w-full">
{/* Top Advisory & Breadcrumb Bar */}
<div className="w-full bg-surface-container-low shadow-sm">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
<div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant flex-wrap">
<a className="hover:text-primary transition-colors" data-path="home" href="#">Home</a>
<span className="text-outline">/</span>
<span className="text-on-surface-variant">Pilgrim Support</span>
<span className="text-outline">/</span>
<span className="text-primary font-semibold">Emergency & Safety</span>
</div>
<div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm shadow-sm w-fit">
<span className="w-2.5 h-2.5 rounded-full bg-error animate-soft-pulse shrink-0"></span>
<span className="font-semibold tracking-wide uppercase">Unified Command Grid Active</span>
<span className="text-on-error-container/60 hidden sm:inline">•</span>
<span className="hidden sm:inline">Dispatch Dispatchers Online (24x7)</span>
<span className="text-on-error-container/60">•</span>
<span className="font-bold">Avg. Response: {`<`} 3 Mins</span>
</div>
</div>
</div>
{/* Page Header */}
<div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin pt-8 pb-10">
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
<div className="max-w-3xl space-y-3">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-error/10 text-error font-label-sm text-label-sm tracking-widest uppercase font-bold">
<span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
          24x7 DEVOTEE SAFETY COMMAND & EMERGENCY RESPONSE
        </div>
<h1 className="font-headline-xl text-headline-xl md:font-display-lg md:text-display-lg text-on-surface tracking-tight leading-tight">
          Emergency, Medical & Pilgrim Safety
        </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Immediate one-tap emergency dispatch, field-ready medical triage units, rapid diver rescue, and lost family tracing across Ram Kund, Panchavati, Sadhu Gram, and Trimbakeshwar.
        </p>
</div>
{/* Quick Incident Summary Pill Strip */}
<div className="flex items-center gap-3 shrink-0 flex-wrap">
<div className="px-4 py-2.5 rounded-lg bg-surface-container flex items-center gap-3">
<div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
<div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Active Ambulances</div>
<div className="font-title-md text-title-md text-on-surface font-semibold leading-none">100 (84 ICU + 16 River)</div>
</div>
</div>
<div className="px-4 py-2.5 rounded-lg bg-surface-container flex items-center gap-3">
<div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
<div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Ghat Marshals</div>
<div className="font-title-md text-title-md text-on-surface font-semibold leading-none">12,400+ On Grid</div>
</div>
</div>
</div>
</div>
{/* ONE-TAP EMERGENCY ACTION HUB (4 High-Impact Grid Cards) */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter mt-2">
{/* Card 1: Police Assistance (112) */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
<div className="absolute top-0 left-0 right-0 h-1.5 bg-error"></div>
<div className="space-y-4">
<div className="flex items-start justify-between">
<div className="w-12 h-12 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_police</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-error-container text-error font-label-sm text-label-sm font-bold uppercase">Priority Red</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Police Assistance</h2>
<div className="text-error font-title-md text-title-md font-bold mt-0.5 tracking-wide">Toll-Free: 112</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            12,000+ deployed personnel, tactical Quick Response Teams (QRT) positioned every 150m. Shahi Snan crowd control, anti-stampede barricades, and security marshals.
          </p>
</div>
<div className="pt-6 space-y-2.5">
<a className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded bg-error text-on-error font-label-md text-label-md tracking-wider uppercase font-bold hover:bg-on-error-container transition-colors shadow-sm" href="tel:112">
<span className="material-symbols-outlined text-[18px]">call</span>
<span>Call Police (112)</span>
</a>
<button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors" onClick={() => {}}>
<span className="material-symbols-outlined text-[17px] text-error">my_location</span>
<span>Nearest Police Booth (GPS)</span>
</button>
</div>
</div>
{/* Card 2: Cardiac & River Ambulance (108) */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
<div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-container"></div>
<div className="space-y-4">
<div className="flex items-start justify-between">
<div className="w-12 h-12 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>ambulance</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold uppercase">Medical ICU</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Ambulance & Cardiac Care</h2>
<div className="text-primary font-title-md text-title-md font-bold mt-0.5 tracking-wide">Toll-Free: 108</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            84 Advanced Life Support Mobile ICUs with oxygen & defibrillators. 16 high-speed river rescue boats cruising the Godavari stream for immediate wet extraction.
          </p>
</div>
<div className="pt-6 space-y-2.5">
<a className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded bg-primary text-on-primary font-label-md text-label-md tracking-wider uppercase font-bold hover:bg-primary-container transition-colors shadow-sm" href="tel:108">
<span className="material-symbols-outlined text-[18px]">call</span>
<span>Call Ambulance (108)</span>
</a>
<button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors" onClick={() => {}}>
<span className="material-symbols-outlined text-[17px] text-primary">emergency</span>
<span>Request Rapid Medic</span>
</button>
</div>
</div>
{/* Card 3: Central Helpline (1800-2027-00) */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
<div className="absolute top-0 left-0 right-0 h-1.5 bg-tertiary"></div>
<div className="space-y-4">
<div className="flex items-start justify-between">
<div className="w-12 h-12 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold uppercase">Multilingual</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Kumbh Central Helpline</h2>
<div className="text-tertiary font-title-md text-title-md font-bold mt-0.5 tracking-wide">1800-2027-00</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Live 24x7 multi-language control desk (Marathi, Hindi, Gujarati, English, Telugu, Kannada, Bengali, Tamil). Route guidance, Ghat congestion, and emergency referrals.
          </p>
</div>
<div className="pt-6 space-y-2.5">
<a className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded bg-tertiary text-on-tertiary font-label-md text-label-md tracking-wider uppercase font-bold hover:bg-tertiary-container transition-colors shadow-sm" href="tel:1800202700">
<span className="material-symbols-outlined text-[18px]">call</span>
<span>Call 1800-2027-00</span>
</a>
<button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors" onClick={() => {}}>
<span className="material-symbols-outlined text-[17px] text-tertiary">translate</span>
<span>Select Regional Speaker</span>
</button>
</div>
</div>
{/* Card 4: Women & Senior Citizen Safety (1091 / 14567) */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
<div className="absolute top-0 left-0 right-0 h-1.5 bg-secondary"></div>
<div className="space-y-4">
<div className="flex items-start justify-between">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>elderly_woman</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold uppercase">Dedicated Care</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Women & Senior Desk</h2>
<div className="text-secondary font-title-md text-title-md font-bold mt-0.5 tracking-wide">1091 & 14567</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Female safety task force (Damini Squads), protected resting lounges, breastfeeding shelters, wheelchair assistance, and rapid recovery for separated elderly pilgrims.
          </p>
</div>
<div className="pt-6 space-y-2.5">
<a className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded bg-secondary text-on-secondary font-label-md text-label-md tracking-wider uppercase font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-sm" href="tel:1091">
<span className="material-symbols-outlined text-[18px]">call</span>
<span>Dial Women Safety (1091)</span>
</a>
<a className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors" href="tel:14567">
<span className="material-symbols-outlined text-[17px] text-secondary">elderly</span>
<span>Elder Helpline (14567)</span>
</a>
</div>
</div>
</div>
</div>
{/* INTERACTIVE EMERGENCY MAP & GROUND LOCATOR SECTION */}
<div className="w-full bg-surface-container-low py-12">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-6">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Tactical Real-Time Sector Grid</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-1">Live Ground Emergency Locator</h2>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-soft-pulse"></span>
<span>Telemetry refreshed 18 seconds ago via District Command & Control Centre</span>
</div>
</div>
{/* Split Layout: 62% Map Screen / 38% Station Directory */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
{/* Map Canvas Container (7 cols desktop) */}
<div className="lg:col-span-7 flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-md relative min-h-[560px]">
{/* Real Static Location Map Anchor */}
<div className="w-full h-full min-h-[480px] bg-cover bg-center relative" data-location="Ram Kund, Panchavati, Nashik, Maharashtra" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ52_qXPBEs7Z45BupYWYUiYBPbFCKR_HD3qLdAU5y6pwNljiaMKjy52TJvJlkJTfz5HoaVSZba7q0lmwrDV3Kc_gRptE113gvJuUTezPIn3WZwNjhyJxpD8R1ouyu7Os2IzS7vf_3rd2BCZVr3XQlai0QVHeQQ6Xzn6duCG8XqHxQ93PJuKPM30_GUoPaJg5GCwidEY1ch7tbnth6aXWn0-6v1iLsk0QEBBU5xJ6BkcesTDyPDa1iSg')" }}>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-inverse-surface/30"></div>
{/* Map Top Overlay: Sector Quick Toggles */}
<div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
<div className="bg-surface/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-2 text-on-surface">
<span className="material-symbols-outlined text-primary text-[18px]">place</span>
<span className="font-label-md text-label-md font-semibold">Active Sector: Ram Kund & Panchavati Zone</span>
</div>
<div className="bg-surface/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
<span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
<span>42 Units Active in View</span>
</div>
</div>
{/* Pulsing Pins & Interactive Markers on Map Canvas */}
<div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer group" onClick={() => {}}>
<div className="relative flex items-center justify-center">
<div className="w-10 h-10 rounded-full bg-error/20 animate-ping absolute"></div>
<div className="w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center shadow-lg border-2 border-white relative z-10 transition-transform group-hover:scale-125">
<span className="material-symbols-outlined text-[16px]">local_hospital</span>
</div>
<div className="hidden group-hover:block absolute bottom-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2.5 py-1 rounded text-label-sm font-label-sm whitespace-nowrap shadow-xl z-20">
                  Ram Kund Central ICU (120m)
                </div>
</div>
</div>
<div className="absolute top-2/5 right-1/3 -translate-x-1/2 -translate-y-1/2 cursor-pointer group" onClick={() => {}}>
<div className="relative flex items-center justify-center">
<div className="w-10 h-10 rounded-full bg-secondary/30 animate-pulse absolute"></div>
<div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg border-2 border-white relative z-10 transition-transform group-hover:scale-125">
<span className="material-symbols-outlined text-[16px]">scuba_diving</span>
</div>
<div className="hidden group-hover:block absolute bottom-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2.5 py-1 rounded text-label-sm font-label-sm whitespace-nowrap shadow-xl z-20">
                  Godavari Water Rescue Post #2
                </div>
</div>
</div>
<div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group" onClick={() => {}}>
<div className="relative flex items-center justify-center">
<div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shadow-md border border-error relative z-10 transition-transform group-hover:scale-125">
<span className="material-symbols-outlined text-[16px]">security</span>
</div>
<div className="hidden group-hover:block absolute bottom-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2.5 py-1 rounded text-label-sm font-label-sm whitespace-nowrap shadow-xl z-20">
                  Ghat Security Watch Tower 4
                </div>
</div>
</div>
<div className="absolute bottom-1/4 right-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer group" onClick={() => {}}>
<div className="relative flex items-center justify-center">
<div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg border-2 border-white relative z-10 transition-transform group-hover:scale-125">
<span className="material-symbols-outlined text-[17px]">medical_services</span>
</div>
<div className="hidden group-hover:block absolute bottom-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2.5 py-1 rounded text-label-sm font-label-sm whitespace-nowrap shadow-xl z-20">
                  Tapovan Field Hospital (650m)
                </div>
</div>
</div>
{/* Map Floating Bottom Legend Bar */}
<div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md p-3.5 rounded-lg shadow-lg flex flex-wrap items-center justify-between gap-3 text-on-surface">
<div className="flex items-center gap-4 text-label-sm font-label-sm">
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-error"></span>
<span>Mini-OT / ICU (18)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span>River Divers & Boats (6)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-on-error-container"></span>
<span>Police Posts (14)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-tertiary"></span>
<span>Lost Persons (8)</span>
</div>
</div>
<button className="text-secondary font-label-sm font-bold flex items-center gap-1 hover:underline">
<span className="material-symbols-outlined text-[16px]">fullscreen</span>
<span>Open Fullscreen Grid</span>
</button>
</div>
</div>
</div>
{/* Locator Search & Interactive Directory Sidebar (5 cols desktop) */}
<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between">
<div className="space-y-4">
{/* Search Field */}
<div className="relative">
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input className="w-full h-[48px] bg-surface-container-low pl-11 pr-4 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all" id="emergencySearchInput" placeholder="Find nearest medical camp, police post, or water rescue..." type="text"/>
</div>
{/* Categorical Filter Chips */}
<div className="flex items-center gap-2 overflow-x-auto pb-1" id="filterChipsContainer">
<button className="filter-btn px-3 py-1.5 rounded-full text-label-sm font-label-sm bg-secondary text-on-secondary font-semibold shrink-0" data-filter="all">All (42)</button>
<button className="filter-btn px-3 py-1.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors" data-filter="medical">Medical (18)</button>
<button className="filter-btn px-3 py-1.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors" data-filter="police">Police (14)</button>
<button className="filter-btn px-3 py-1.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors" data-filter="divers">River Rescue (6)</button>
<button className="filter-btn px-3 py-1.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors" data-filter="lost">Lost Person (8)</button>
</div>
{/* Facilities List */}
<div className="space-y-3 pt-2 max-h-[360px] overflow-y-auto pr-1" id="stationList">
{/* Item 1: Ram Kund Central ICU */}
<div className="station-card bg-surface-container-low hover:bg-surface-container p-3.5 rounded-lg transition-colors cursor-pointer group" data-category="medical" id="station-ramkund-icu">
<div className="flex items-start justify-between gap-3">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">Ram Kund Central Emergency Camp</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                      4 Doctors, 8 Paramedics, Minor Operation Theatre, High-flow Oxygen, ECG & Anti-Venom.
                    </p>
<div className="flex items-center gap-3 pt-1 text-label-sm font-label-sm text-outline">
<span className="text-error font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">directions_walk</span> 120m away
                      </span>
<span>•</span>
<span className="text-tertiary font-semibold">Ghat Pier 4A</span>
<span>•</span>
<span className="text-secondary">Open 24/7</span>
</div>
</div>
<a className="shrink-0 px-3 py-1.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors flex items-center gap-1" href="https://maps.google.com" target="_blank">
<span>Navigate</span>
<span className="material-symbols-outlined text-[14px]">navigation</span>
</a>
</div>
</div>
{/* Item 2: Tapovan Sector 3 Field Hospital */}
<div className="station-card bg-surface-container-low hover:bg-surface-container p-3.5 rounded-lg transition-colors cursor-pointer group" data-category="medical" id="station-tapovan-field">
<div className="flex items-start justify-between gap-3">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">Tapovan Sector 3 Field Hospital</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                      100 inpatient beds, massive heat-stroke hydration ward, ultrasound, blood storage & pharmacy.
                    </p>
<div className="flex items-center gap-3 pt-1 text-label-sm font-label-sm text-outline">
<span className="text-primary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">directions_walk</span> 650m away
                      </span>
<span>•</span>
<span>Sadhu Gram Sector 3</span>
<span>•</span>
<span className="text-secondary">32 Beds Free</span>
</div>
</div>
<a className="shrink-0 px-3 py-1.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold hover:bg-secondary hover:text-on-secondary transition-colors flex items-center gap-1" href="https://maps.google.com" target="_blank">
<span>Navigate</span>
<span className="material-symbols-outlined text-[14px]">navigation</span>
</a>
</div>
</div>
{/* Item 3: River Diver Rescue Base #2 */}
<div className="station-card bg-surface-container-low hover:bg-surface-container p-3.5 rounded-lg transition-colors cursor-pointer group" data-category="divers" id="station-godavari-divers">
<div className="flex items-start justify-between gap-3">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">Godavari Deep Water Rescue & Lifeboat Base</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                      NDRF certified deep sea divers, motorized patrol zodiac boats, floating life buoys, wet stretcher extraction.
                    </p>
<div className="flex items-center gap-3 pt-1 text-label-sm font-label-sm text-outline">
<span className="text-secondary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">directions_walk</span> 280m away
                      </span>
<span>•</span>
<span>Victoria Bridge Ghat</span>
<span>•</span>
<span className="text-error font-semibold">2 Boats on River</span>
</div>
</div>
<a className="shrink-0 px-3 py-1.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold hover:bg-secondary hover:text-on-secondary transition-colors flex items-center gap-1" href="https://maps.google.com" target="_blank">
<span>Navigate</span>
<span className="material-symbols-outlined text-[14px]">navigation</span>
</a>
</div>
</div>
{/* Item 4: Trimbakeshwar East Gate Fast Clinic */}
<div className="station-card bg-surface-container-low hover:bg-surface-container p-3.5 rounded-lg transition-colors cursor-pointer group" data-category="medical" id="station-trimbak-gate">
<div className="flex items-start justify-between gap-3">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">Trimbakeshwar East Gate Fast Clinic</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                      2 Cardiac Ambulances standby, queue-side first-aid stations, hydration fluids, senior resting bay.
                    </p>
<div className="flex items-center gap-3 pt-1 text-label-sm font-label-sm text-outline">
<span className="font-bold flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[14px]">location_on</span> Trimbak Jyotirlinga
                      </span>
<span>•</span>
<span className="text-tertiary">Immediate Deployment</span>
</div>
</div>
<a className="shrink-0 px-3 py-1.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold hover:bg-secondary hover:text-on-secondary transition-colors flex items-center gap-1" href="https://maps.google.com" target="_blank">
<span>Navigate</span>
<span className="material-symbols-outlined text-[14px]">navigation</span>
</a>
</div>
</div>
</div>
</div>
{/* Bottom Status Pill */}
<div className="pt-4 border-t border-surface-variant flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-tertiary">medical_information</span>
<span>All posts equipped with automated cardiac defibrillators (AEDs)</span>
</span>
<span className="text-outline">Sector Nashik-01</span>
</div>
</div>
</div>
</div>
</div>
{/* MISSING PERSON / LOST & FOUND CROSS-NAV BANNER */}
<div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-8">
<div className="bg-gradient-to-r from-secondary to-[#183947] text-on-secondary rounded-xl p-space-lg md:p-space-xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
<div className="space-y-2 max-w-2xl">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase font-bold tracking-wider">
<span className="material-symbols-outlined text-[15px]">person_search</span>
          Privacy-First Pilgrim Registry
        </div>
<h3 className="font-headline-lg text-headline-lg text-white font-medium">Looking to report or locate a missing family member or child?</h3>
<p className="font-body-md text-body-md text-secondary-fixed-dim leading-relaxed">
          The authorized Lost & Found Bureau operates 48 facial-recognition scanning kiosks, child safety RFID wristband cross-matching, and 24x7 loudspeaker announcement stations along all 24 Ghats.
        </p>
</div>
<div className="shrink-0 w-full md:w-auto">
<a className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded bg-surface text-on-surface font-label-md text-label-md font-bold uppercase tracking-wider hover:bg-surface-container-high transition-colors shadow-md" data-path="lost-and-found" href="#">
<span className="material-symbols-outlined text-[20px] text-primary">family_restroom</span>
<span>Open Lost & Found Portal</span>
</a>
</div>
</div>
</div>
{/* "STAY SAFE DURING SIMHASTHA" DEVOTEE PROTOCOLS (4 Columns) */}
<div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-10 space-y-8">
<div className="max-w-2xl space-y-2">
<span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">Standard Safety Guidelines</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Stay Safe During Simhastha Kumbh 2027</h2>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
        Adhere strictly to the pilgrim protocols outlined by the Nashik-Trimbakeshwar Kumbh Authority and District Administration.
      </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/* Protocol 1 */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
<div className="space-y-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">turn_sharp_right</span>
</div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Crowd Flow & Shahi Snan Navigation</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Never attempt counter-flow against marching crowds. Follow designated unidirectional pedestrian corridors. When crossing high-density bridges, maintain uniform pace and avoid sudden stops for photography.
          </p>
</div>
<div className="pt-2 text-label-sm font-label-sm text-primary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">check_circle</span>
<span>Adhere to 1-way cordons</span>
</div>
</div>
{/* Protocol 2 */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
<div className="space-y-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[22px]">water_bottle</span>
</div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Hydration, Heat & ORS Booths</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Drink only from sealed RO filtration points or green municipal tankers. Free oral rehydration salts (ORS) are available at every police watch tower. Avoid eating unpeeled roadside fruit or unboiled river sweets.
          </p>
</div>
<div className="pt-2 text-label-sm font-label-sm text-secondary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">check_circle</span>
<span>1,200 Certified Water Points</span>
</div>
</div>
{/* Protocol 3 */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
<div className="space-y-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[22px]">pin_drop</span>
</div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Family Meeting Points (Landmarking)</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Upon entering any Sector or Ghat, immediately establish a specific numbered color-coded pillar (e.g., "Pillar Blue-14") with your party. Mobile signals fluctuate during peak Snan; physical rendezvous points are essential.
          </p>
</div>
<div className="pt-2 text-label-sm font-label-sm text-tertiary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">check_circle</span>
<span>Agree on a Landmark First</span>
</div>
</div>
{/* Protocol 4 */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
<div className="space-y-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[22px]">pool</span>
</div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Ghat Safety Chains & River Depth</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Never cross brass safety chains or yellow water buoys in Ram Kund or Kushavarta Kund. River undertows increase during dam release hours. Ensure young children and seniors wear the issued waterproof wristbands.
          </p>
</div>
<div className="pt-2 text-label-sm font-label-sm text-error font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">check_circle</span>
<span>Stay Behind Safety Buoys</span>
</div>
</div>
</div>
</div>
{/* DISASTER MANAGEMENT CONTROL ROOM CONTACTS & SMS BROADCAST REGISTRATION */}
<div className="w-full bg-surface-container-low py-12 mb-0">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
<div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-md">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
{/* Left: Official Control Directory */}
<div className="lg:col-span-7 space-y-6">
<div>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">Government Apex Body</span>
<h3 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Disaster Management Command Network</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                Direct lines to district magistrates, fire operations, river water flow controllers, and medical directors stationed at the Integrated Command & Control Centre (ICCC), Nashik.
              </p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="p-3.5 rounded-lg bg-surface-container-low">
<div className="font-label-sm text-label-sm text-outline">District Disaster Cell</div>
<div className="font-title-md text-title-md text-on-surface font-semibold mt-0.5">1077 (Toll-Free)</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Direct line to Nashik Collectorate</div>
</div>
<div className="p-3.5 rounded-lg bg-surface-container-low">
<div className="font-label-sm text-label-sm text-outline">Fire & Structural Rescue</div>
<div className="font-title-md text-title-md text-on-surface font-semibold mt-0.5">101 / 0253-2575555</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">32 Quick Fire Responders active</div>
</div>
<div className="p-3.5 rounded-lg bg-surface-container-low">
<div className="font-label-sm text-label-sm text-outline">Trimbakeshwar Emergency Cell</div>
<div className="font-title-md text-title-md text-on-surface font-semibold mt-0.5">02594-233215</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Kushavarta Kund Safety Desk</div>
</div>
<div className="p-3.5 rounded-lg bg-surface-container-low">
<div className="font-label-sm text-label-sm text-outline">Godavari Flood & Dam Discharge</div>
<div className="font-title-md text-title-md text-on-surface font-semibold mt-0.5">0253-2317800</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Gangapur Dam Flow Monitoring</div>
</div>
</div>
</div>
{/* Right: SMS Broadcast & Live Emergency Advisory Sign-Up */}
<div className="lg:col-span-5 bg-surface-container p-space-lg rounded-xl flex flex-col justify-between space-y-4">
<div className="space-y-2">
<div className="flex items-center gap-2 text-primary font-label-md text-label-md uppercase font-bold">
<span className="material-symbols-outlined text-[18px]">cell_tower</span>
<span>Cell-Broadcast Emergency Alerts</span>
</div>
<h4 className="font-headline-md text-headline-md text-on-surface font-semibold">Subscribe for Ghat & Weather SMS</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Receive instant warning notifications on Shahi Snan crowd diversions, bridge closures, river water discharge alerts, and sudden weather alerts directly on your mobile device (works without internet).
              </p>
</div>
<form className="space-y-3" id="smsAlertForm" onSubmit={(e) => e.preventDefault()}>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="pilgrimPhone">Enter Pilgrim Mobile Number</label>
<div className="flex gap-2">
<span className="inline-flex items-center px-3 bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    +91
                  </span>
<input className="flex-1 h-[44px] bg-surface-container-lowest px-3.5 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" id="pilgrimPhone" pattern="[0-9]{10}" placeholder="98765 43210" required type="tel"/>
</div>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="prefLang">Preferred SMS Language</label>
<select className="w-full h-[44px] bg-surface-container-lowest px-3 rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" id="prefLang">
<option value="mr">मराठी (Marathi)</option>
<option  value="hi">हिंदी (Hindi)</option>
<option value="en">English</option>
<option value="gu">ગુજરાતી (Gujarati)</option>
<option value="te">తెలుగు (Telugu)</option>
</select>
</div>
<button className="w-full py-3 px-4 rounded bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2" type="submit">
<span className="material-symbols-outlined text-[18px]">notifications_active</span>
<span>Activate Free SMS Safety Broadcast</span>
</button>
</form>
<div className="hidden p-3 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm text-center" id="smsSuccessMsg">
              ✓ Registered successfully. You will receive real-time Kumbh safety broadcasts in your selected language.
            </div>
</div>
</div>
</div>
</div>
</div>
{/* Interactive Client-side Scripting */}

</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
