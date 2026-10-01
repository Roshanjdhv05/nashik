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

export default function CampsPage() {
  const [lang, setLang] = useState('English');
  const [activeNav, setActiveNav] = useState('camps-and-akhadas');
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>
      <main className="w-full pt-[116px] bg-surface min-h-[calc(100vh-116px)]">
        <div className="flex flex-col w-full">
<div className="flex flex-col w-full">
{/* Live Telemetry & Breadcrumb Strip */}
<section className="w-full bg-surface-container-low">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-3 flex flex-wrap items-center justify-between gap-y-2">
<nav className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
<a className="hover:text-primary transition-colors" data-path="home" href="#">Home</a>
<span className="text-outline-variant">/</span>
<span className="hover:text-primary transition-colors cursor-pointer">Devotee Services</span>
<span className="text-outline-variant">/</span>
<span className="text-primary font-semibold">Camps & Akhadas</span>
</nav>
<div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-1.5 rounded-full shadow-sm">
<span className="relative flex h-2.5 w-2.5">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
</span>
<span className="font-label-sm text-label-sm tracking-wide text-on-surface">
<strong className="text-primary font-semibold">Live Encampment:</strong> Sadhu Gram Tapovan & Trimbak Active • 13 Traditional Akhadas In Residence
        </span>
</div>
</div>
</section>
{/* Editorial Section Banner */}
<section className="w-full bg-gradient-to-b from-surface-container-low via-surface to-surface pt-space-xl pb-space-lg">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
<div className="max-w-4xl space-y-space-sm">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-widest font-semibold">
<span className="material-symbols-outlined text-[16px]">local_fire_department</span>
          Simhastha Sadhu Gram & Ashram Shibir
        </div>
<h1 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg text-on-surface tracking-tight leading-tight">
          Camps, Akhadas & Sacred Gatherings
        </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed pt-1">
          Explore the historic Shaiva, Vaishnava, and Udasin Akhadas, encampments of venerable ascetics, sacred Dhunis, daily spiritual discourses (Pravachan), and expansive Yatri tent cities across Tapovan and Trimbakeshwar.
        </p>
</div>
{/* Search & Sector Filtering Toolbar */}
<div className="mt-space-lg bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col lg:flex-row gap-space-md items-stretch lg:items-center justify-between">
{/* Search Field */}
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input className="w-full h-[52px] bg-surface-container-low pl-12 pr-4 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none transition-all" id="campSearchInput" placeholder="Search Akhadas, Sadhus, camps, pravachans, or ashram shibirs..." type="text"/>
</div>
{/* Sector Filters */}
<div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none" id="sectorFilterChips">
<button className="sector-chip active px-4 py-2.5 rounded-full font-label-md text-label-md bg-secondary text-on-secondary whitespace-nowrap transition-all shadow-sm" data-filter="all">
            All Sectors
          </button>
<button className="sector-chip px-4 py-2.5 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap transition-all" data-filter="tapovan">
            Tapovan Sadhu Gram (Nashik)
          </button>
<button className="sector-chip px-4 py-2.5 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap transition-all" data-filter="trimbak">
            Trimbakeshwar Akhada Marg
          </button>
<button className="sector-chip px-4 py-2.5 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap transition-all" data-filter="nilgiri">
            Nilgiri Baug Zone
          </button>
</div>
{/* GPS Action */}
<a className="h-[52px] px-6 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 shrink-0 transition-colors shadow-sm" data-path="map" href="#">
<span className="material-symbols-outlined text-[18px]">explore</span>
<span>Camp Map (GPS)</span>
</a>
</div>
</div>
</section>
{/* Category View Switcher Tabs */}
<section className="w-full bg-surface">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
<div className="flex items-center gap-space-lg">
<button className="py-4 font-title-md text-title-md text-primary font-semibold relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" id="tabAkhadas">
          Traditional Akhadas (13 Sacred Sansthas)
        </button>
<button className="py-4 font-title-md text-title-md text-on-surface-variant hover:text-on-surface font-semibold transition-colors" id="tabCamps">
          Pilgrim Camps & Yatri Shibir
        </button>
</div>
</div>
</section>
{/* Main Directory: Akhada & Camp Visual Cards */}
<section className="w-full bg-surface py-space-xl">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
{/* Akhada Cards Grid */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg" id="akhadaGrid">
{/* Card 1: Juna Akhada (Spans 7 cols on desktop for asymmetric editorial prominence) */}
<article className="akhada-item lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col justify-between" data-sector="tapovan">
<div className="space-y-space-md">
<div className="relative w-full h-72 md:h-80 rounded-lg overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Ancient holy Naga Sadhus and ascetics seated by a continuous sacred ceremonial fire dhuni at Shri Panch Dashnam Juna Akhada in Tapovan Nashik, surrounded by tridents trishula with brass rings, saffron flags fluttering against the morning sun, ochre robes, stone temple encampment background, warm amber and godavari river mist atmospheric light, museum documentary photography." loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4WsmfFLo8umolqONFG09_rSQ0RxFJaAlNqJHKpA4KjEimAXaLRGim3DnOd0196QW1J8VlE5CTCMwMsjjQBuc1uS4MvEIiYz2TtnrCQj6Yi5vqhVqmOoEb6DeNVRoHcdawTon7VpQb-HZVP0Nzl9cl4NzRGhbwy2q7UGmN0_v0TgYm-QJYfn_a8TnoFrfzuPjpLi2ZXt67e5X2PW_qcBm5HRt_cedUY-HGZbz5jBQO7uUmmAsRbyYOug"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
<span className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Shaiva Akhada • Tapovan Sector 1, Sadhu Gram
                </span>
<span className="px-3 py-1 rounded bg-surface-container-lowest/90 backdrop-blur text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-primary text-[15px]">verified</span> Prime Akhada #1
                </span>
</div>
</div>
<div className="space-y-2">
<h2 className="font-headline-lg text-headline-lg text-on-surface font-headline-lg">
                Shri Panch Dashnam Juna Akhada (Bhairav Akhada)
              </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
                The largest and most ancient monastic warrior order of Shaiva ascetics. Revered for its primordial Akhand Dhuni (sacred embers active for centuries), veneration of Bhagwan Dattatreya, and sacred Naga Sadhu initiation initiatory rituals.
              </p>
</div>
{/* Meta details row */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-2">
<div className="bg-surface-container-low p-space-sm rounded-lg flex items-start gap-space-xs">
<span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">schedule</span>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block">Darshan & Puja</span>
<p className="font-body-sm text-body-sm text-on-surface">Darshan: 06:00 AM – 09:00 PM<br/>Daily Maha Hawan: 07:30 AM</p>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex items-start gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">festival</span>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block">Shahi Snan Route</span>
<p className="font-body-sm text-body-sm text-on-surface">Procession starts 05:30 AM via Tapovan Marg directly into Ram Kund.</p>
</div>
</div>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-md pt-space-md mt-space-md bg-surface-container-low -mx-space-md -mb-space-md p-space-md rounded-b-xl">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Gate #4 Entrance • Access Pass Open</span>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-4 py-2 rounded bg-surface-container-highest hover:bg-surface-dim text-on-surface font-label-md text-label-md font-semibold transition-colors">
                View Akhada Schedule
              </button>
<a className="px-4 py-2 rounded bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-1 transition-colors" data-path="map" href="#">
<span className="material-symbols-outlined text-[16px]">navigation</span>
<span>Directions (Gate #4)</span>
</a>
</div>
</div>
</article>
{/* Card 2: Niranjani Akhada (Spans 5 cols) */}
<article className="akhada-item lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col justify-between" data-sector="trimbak">
<div className="space-y-space-md">
<div className="relative w-full h-56 rounded-lg overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Vedic symposium tent with scholarly saints in ochre shawls gathered under silk yellow canopies at Shri Niranjani Akhada in Trimbakeshwar, illuminated with brass lanterns, open manuscripts, and temple stone pillars in background, early dawn misty sacred serenity, authentic archival photography." loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAem_kBSBmiHOPQ_O1aup2XwM3j7bCCP5R_5UibNAM79nMDFS04YuWgwneyEwBvq_27p-YQd-OcuJ1QbN5w-w1q24YHt87dM5-P3d9qePMOe9c1CdN-nay7BOZRNLvoIM4ocw4vD1AtQghT-6yRnhP_Lwjij1YpXFYFzxlLWDjXWuJMT8KBNgjde6X24iNjC7fTVzWeQE9QDX3MH4axxeV7qtiG_p1iAcuyFPfDd_Ln4K-fZyGkGO88_w"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute bottom-3 left-3">
<span className="px-3 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Shaiva Akhada • Sector 2, Trimbakeshwar Road
                </span>
</div>
</div>
<div className="space-y-2">
<h2 className="font-headline-lg text-headline-lg text-on-surface">
                Shri Niranjani Akhada
              </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
                Home to distinguished Sanskrit scholars, Mahamandaleshwars, and philosophical monastic seats. Housing the sacred Kartikeya Bhagwan temple camp alongside daily philosophical dialogues.
              </p>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg space-y-1">
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold block">Vedic Pravachan Sessions</span>
<p className="font-body-sm text-body-sm text-on-surface">
                Daily discourses: 04:00 PM – 07:00 PM by Acharya Mahamandaleshwar Swami Punyanand Giri Ji Maharaj.
              </p>
</div>
</div>
<div className="flex items-center justify-between pt-space-md mt-space-md">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-tertiary">menu_book</span> Daily Shastra Sabha
            </span>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-dim transition-colors">
                Pravachan Schedule
              </button>
<a className="px-3 py-1.5 rounded bg-secondary text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-1 hover:bg-on-secondary-container transition-colors" data-path="map" href="#">
<span className="material-symbols-outlined text-[14px]">near_me</span>
<span>Directions</span>
</a>
</div>
</div>
</article>
{/* Card 3: Mahanirvani Akhada (Spans 4 cols) */}
<article className="akhada-item lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col justify-between" data-sector="tapovan">
<div className="space-y-space-md">
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Kapil Mahamuni sacred sanctum within Shri Panchayati Akhada Mahanirvani camp in Tapovan, featuring carved silver lamps, offerings of marigold garlands, sacred Godavari river breeze, and pilgrims quietly observing evening Sandhya Aarti, warm golden hour natural lighting." loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-0KUWF7rILU3y9qICql6anCPHp7u6anY0uF7gTtENTPFAGqMaC0PvYlQ2DE-0KqRRJHmBW3XPIEPcjjK5Rkyv7BaHMDJT2ygWDB9hI45xBMw6pNaa-fgW2GSibljZU_zYs1mIi0dOtGqvQtZZQ00YQeFKGmUt3jeF2VpokjnpmCgKzfa4IQ18DSscHWt3F3xvPOXsX9C7eIMPfSHRBB32D5IE-IXfPGhzP7ClhrsQi8LcawXVYDq3cQ"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute bottom-3 left-3">
<span className="px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
                  Shaiva Akhada • Tapovan Enclave
                </span>
</div>
</div>
<div className="space-y-1.5">
<h2 className="font-headline-md text-headline-md text-on-surface">
                Shri Panchayati Akhada Mahanirvani
              </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Encompassing the ancient Kapil Mahamuni shrine, continuous Vedic chanting, and majestic evening Godavari Sandhya Aarti accompanied by traditional brass nagadas.
              </p>
</div>
<div className="space-y-1 text-body-sm font-body-sm text-on-surface bg-surface-container-low p-2.5 rounded">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-semibold">Annadan Bhandara:</span>
<span>11:30 AM – 03:00 PM</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-semibold">Sandhya Aarti:</span>
<span className="text-primary font-semibold">06:45 PM Daily</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-md mt-space-md">
<button className="font-label-md text-label-md text-primary hover:underline font-semibold">
              Camp Details
            </button>
<a className="px-3 py-1.5 rounded bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-dim transition-colors flex items-center gap-1" data-path="map" href="#">
<span className="material-symbols-outlined text-[14px]">turn_sharp_right</span>
<span>Directions</span>
</a>
</div>
</article>
{/* Card 4: Digambar Ani Akhada (Spans 4 cols) */}
<article className="akhada-item lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col justify-between" data-sector="tapovan">
<div className="space-y-space-md">
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Vaishnava Bairagi devotees and sadhus at Shri Digambar Ani Akhada on the Godavari banks, chanting Sankirtan with cymbals and mridangam drums, elevated consecrated Hanumanji dhwaja flags in deep saffron, decorated floral pavilion in Tapovan, sacred divine joy." loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeJUEVxQ6JU61BQTy9Ap1xIkBwjdhvfqKh6L4jZ73AV53btxyKVWP79r4QA5NqenPYXPQZkdbR-oK-Nw3KWE8YLU3rZAWWuGCo5GJjLUX4Bvpn155NcWedFt8lmXgFNpAGFxzUG3dIKmG1Xudm8DvIONC3xVu2gpExoCAjOAtaSstTfFkYannPM7VB6tQT2rKg-sK6lwK3FHHXLrJOVrxS_F_7cxZbQX9h4u0ALNBN7IPCXUOxdgNK5w"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute bottom-3 left-3">
<span className="px-2.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                  Vaishnava Akhada • Tapovan Sector 4
                </span>
</div>
</div>
<div className="space-y-1.5">
<h2 className="font-headline-md text-headline-md text-on-surface">
                Shri Digambar Ani Akhada (Bairagi)
              </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                The premier Vaishnava Bairagi order. Celebrated for non-stop Akhand Ram Naam Sankirtan, elaborate discourses on Valmiki Ramayana, and consecrated Hanuman flag ceremonies.
              </p>
</div>
<div className="space-y-1 text-body-sm font-body-sm text-on-surface bg-surface-container-low p-2.5 rounded">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-semibold">Ram Naam Kirtan:</span>
<span className="text-tertiary font-semibold">24 Hours Continuous</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-semibold">Sant Katha:</span>
<span>10:00 AM – 01:00 PM</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-md mt-space-md">
<button className="font-label-md text-label-md text-primary hover:underline font-semibold">
              Discourse Timings
            </button>
<a className="px-3 py-1.5 rounded bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-dim transition-colors flex items-center gap-1" data-path="map" href="#">
<span className="material-symbols-outlined text-[14px]">turn_sharp_right</span>
<span>Directions</span>
</a>
</div>
</article>
{/* Card 5: Nirmal Akhada (Spans 4 cols) */}
<article className="akhada-item lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col justify-between" data-sector="trimbak">
<div className="space-y-space-md">
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Peaceful white and ivory draped meditation tent shibir of Shri Nirmal Akhada at Trimbakeshwar camp enclave, serene sikh and udasin sadhus in quiet contemplation, pristine spotless community langar hall serving hot fresh dal and rotis to all yatris without distinction, calm spiritual radiance." loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQRlM5K819VVV_kS5E-VjlPZvyBNrdA70CJwYkoJeRrBhpid3k_3P-ySWx4bG1YjJIwwD9cyvGq-r99R5hkIHUCE6zmr8F7oieEBGs3RVYma04yWnP6CmuSJqW9rhnWFCoWq8JcHXWdyYqr4JaVI03y_m8SWgY63IMrZd04AFuaI3AwBWWn2AcIjgtRrv1YQLCMwPXeD29NCUmhg7JuRbpYUu3pwL8aj3cz02-qHaY-U57eb2wtsCnEQ"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
<div className="absolute bottom-3 left-3">
<span className="px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                  Udasin Sampradaya • Trimbakeshwar
                </span>
</div>
</div>
<div className="space-y-1.5">
<h2 className="font-headline-md text-headline-md text-on-surface">
                Shri Nirmal Akhada
              </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Rooted in the contemplative teachings of Sri Guru Nanak Dev and Baba Sri Chand. Famed for its peaceful meditation pandals, Gurbani recitations, and open Nishkam Chabeel & Langar.
              </p>
</div>
<div className="space-y-1 text-body-sm font-body-sm text-on-surface bg-surface-container-low p-2.5 rounded">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-semibold">Nishkam Langar:</span>
<span className="text-secondary font-semibold">08:00 AM – 10:00 PM</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant font-semibold">Asa Di Var:</span>
<span>05:00 AM Daily</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-space-md mt-space-md">
<button className="font-label-md text-label-md text-primary hover:underline font-semibold">
              Langar Schedule
            </button>
<a className="px-3 py-1.5 rounded bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-dim transition-colors flex items-center gap-1" data-path="map" href="#">
<span className="material-symbols-outlined text-[14px]">turn_sharp_right</span>
<span>Directions</span>
</a>
</div>
</article>
</div>
{/* Quick Interactive Stats / Telemetry Mosaic */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
<div className="bg-surface-container-low p-space-md rounded-xl">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Total Akhadas</span>
<span className="font-headline-xl text-headline-xl text-primary font-bold">13</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">7 Shaiva, 3 Vaishnava, 2 Udasin, 1 Nirmal</p>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Sadhu Gram Acreage</span>
<span className="font-headline-xl text-headline-xl text-secondary font-bold">350+</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tapovan Nashik & Trimbak foothills</p>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Continuous Langars</span>
<span className="font-headline-xl text-headline-xl text-tertiary font-bold">96</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Free Annadan kitchens operational</p>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Sadhus in Residence</span>
<span className="font-headline-xl text-headline-xl text-on-surface font-bold">85,000+</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Across primary sectors during Parva</p>
</div>
</div>
</div>
</section>
{/* Sacred Pravachan & Spiritual Programs Calendar */}
<section className="w-full bg-surface-container-low py-space-xl">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin space-y-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div className="space-y-1">
<div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
<span className="material-symbols-outlined text-[16px]">record_voice_over</span>
            Satsang & Discourses
          </div>
<h2 className="font-headline-xl text-headline-xl text-on-surface">
            Spiritual Programs & Pravachan Calendar
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Immerse yourself in authentic Vedic philosophy, ancient Upanishadic commentaries, and katha sessions delivered by revered spiritual luminaries.
          </p>
</div>
<a className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-md text-label-md font-semibold transition-colors" href="#">
<span>Download 7-Day Katha PDF</span>
<span className="material-symbols-outlined text-[16px]">download</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
{/* Katha Card 1 */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                Daily Katha
              </span>
<span className="font-label-sm text-label-sm text-outline">Pandal #3</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">
                Shrimad Bhagwat Mahapuran Katha
              </h3>
<p className="font-body-sm text-body-sm text-primary font-semibold mt-0.5">
                Pujya Swami Chidanand Saraswati Ji
              </p>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Exposition on Krishna Leela and spiritual Bhakti yoga. Special musical rendition by Vrindavan kirtankars.
            </p>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between">
<div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary">nest_clock_farsight_analog</span>
<span>03:30 PM – 07:00 PM</span>
</div>
<button className="px-3 py-1.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold hover:bg-surface-container-high transition-colors">
              Set Reminder
            </button>
</div>
</div>
{/* Katha Card 2 */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                Morning Sadhana
              </span>
<span className="font-label-sm text-label-sm text-outline">Trimbak Foothills</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">
                Dhyan & Kundalini Sadhana Camp
              </h3>
<p className="font-body-sm text-body-sm text-secondary font-semibold mt-0.5">
                Senior Acharyas of Bihar School of Yoga
              </p>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Classical Pranayama, Ajapa Japa, and guided Godavari river meditation for inner equilibrium and focus.
            </p>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between">
<div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">nest_clock_farsight_analog</span>
<span>06:00 AM – 08:30 AM</span>
</div>
<button className="px-3 py-1.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold hover:bg-surface-container-high transition-colors">
              Set Reminder
            </button>
</div>
</div>
{/* Katha Card 3 */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
                Conclave
              </span>
<span className="font-label-sm text-label-sm text-outline">Central Amphitheatre</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">
                Sant Sammelan & Dharma Sabha
              </h3>
<p className="font-body-sm text-body-sm text-primary font-semibold mt-0.5">
                All-India Akhada Parishad Joint Panel
              </p>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Deliberation on preservation of Sanatana traditions, clean Godavari initiatives, and youth spiritual upliftment.
            </p>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between">
<div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px] text-primary">nest_clock_farsight_analog</span>
<span>05:00 PM – 08:00 PM</span>
</div>
<button className="px-3 py-1.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold hover:bg-surface-container-high transition-colors">
              Set Reminder
            </button>
</div>
</div>
</div>
</div>
</section>
{/* Akhada Maryada & Devotee Etiquette Guide */}
<section className="w-full bg-surface py-space-xl">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
<div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-sm space-y-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="space-y-1">
<div className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
<span className="material-symbols-outlined text-[18px]">verified_user</span>
              Sacred Observance
            </div>
<h2 className="font-headline-xl text-headline-xl text-on-surface">
              Akhada Maryada & Devotee Etiquette Guide
            </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
              Akhadas are ancient monastic sanctuaries of deep tapasya (austerity). Devotees are kindly urged to maintain decorum and sanctity.
            </p>
</div>
<span className="px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm font-semibold inline-flex items-center gap-1.5 self-start md:self-auto">
<span className="material-symbols-outlined text-primary text-[16px]">info</span>
            Enforced by Volunteer Sevadals
          </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/* Protocol 1 */}
<div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-sm">
<span className="material-symbols-outlined text-[20px]">no_photography</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface">Photography Sanctions</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Always request permission before photographing ascetics or sacred dhunis. Drones and close-range flash photography are strictly prohibited inside akhada compounds.
            </p>
</div>
{/* Protocol 2 */}
<div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary mb-space-sm">
<span className="material-symbols-outlined text-[20px]">checkroom</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface">Modest Attire</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Devotees are requested to wear traditional modest clothing covering shoulders and knees (dhoti, kurta, sarees, or salwar kameez). Footwear must be removed at camp entry portals.
            </p>
</div>
{/* Protocol 3 */}
<div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
<div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-space-sm">
<span className="material-symbols-outlined text-[20px]">spa</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface">Offerings & Prasad</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Single-use plastics are forbidden. Offer fresh flowers, fruits, or dry nuts in paper or leaf dona. Charansparsh should be made with polite distance and humility.
            </p>
</div>
{/* Protocol 4 */}
<div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface mb-space-sm">
<span className="material-symbols-outlined text-[20px]">accessible</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface">Senior & Care Queues</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Dedicated shaded seated queues and wheelchair-friendly lanes are maintained at Gates 2 and 4 of each major Akhada. Sevadals assist elderly pilgrims during darshan.
            </p>
</div>
</div>
</div>
</div>
</section>
{/* Retreat Callout Card */}
<section className="w-full bg-surface pb-space-xl">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
<div className="bg-gradient-to-r from-secondary to-on-secondary-container rounded-2xl p-space-lg md:p-space-xl text-on-secondary flex flex-col lg:flex-row items-center justify-between gap-space-lg shadow-sm">
<div className="space-y-space-xs max-w-2xl">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-widest font-semibold block">
            Long-Term Pilgrim Stay
          </span>
<h2 className="font-headline-xl text-headline-xl text-on-secondary">
            Planning an extended ashram retreat or Kalpavas?
          </h2>
<p className="font-body-md text-body-md text-surface-container-low leading-relaxed">
            Reserve verified tent accommodations in the Govardhan Yatri City, book quiet cottage stays in Tapovan ashrams, or verify your Kalpavas registration for the full month of Simhastha.
          </p>
</div>
<div className="flex flex-wrap items-center gap-space-sm shrink-0">
<a className="px-6 py-3 rounded-lg bg-surface-container-lowest text-secondary hover:bg-surface-container-low font-label-md text-label-md font-semibold tracking-wide transition-colors shadow-sm" data-path="stay" href="#">
            View Bhakt Niwas & Camps
          </a>
<a className="px-6 py-3 rounded-lg bg-transparent hover:bg-white/10 text-on-secondary font-label-md text-label-md font-semibold tracking-wide transition-colors" data-path="darshan" href="#">
            Kalpavas Rules & Schedule
          </a>
</div>
</div>
</div>
</section>
{/* Client-side Interactive Filtering Script */}

</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
