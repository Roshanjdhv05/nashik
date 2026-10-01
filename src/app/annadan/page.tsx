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



export default function AnnadanPage() {
  const [lang, setLang] = useState('English');
  const [activeNav, setActiveNav] = useState('annadan');
  return (
    <div className="bg-[#fcf9f4] font-body text-[#1c1c19] antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>

      <main className="w-full pt-[116px] bg-[#fcf9f4] min-h-[calc(100vh-116px)]">
        <div className="flex flex-col w-full">
          {/* Devotional Header Banner */}
          <section className="w-full bg-gradient-to-b from-[#f6f3ee] via-[#fcf9f4] to-[#fcf9f4] pb-6">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
              {/* Breadcrumb & Indicator */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-2">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-semibold text-[12px] text-[#564339]">
                  <Link className="hover:text-[#984300] transition-colors" href="/">Home</Link>
                  <span className="text-[#897267] font-normal">/</span>
                  <span className="text-[#564339]">Devotee Services</span>
                  <span className="text-[#897267] font-normal">/</span>
                  <span className="text-[#984300] font-semibold">Annadan &amp; Bhandara</span>
                </nav>
                <div className="flex items-center gap-1 bg-[#ffdea5]/30 px-3 py-1 rounded-full text-[#755717] font-semibold text-[11px]">
                  <MS name="volunteer_activism" cls="text-[15px]" />
                  <span className="">100% Nishkam Sewa • Free Maha Prasad</span>
                </div>
              </div>

              {/* Hero Mainstage */}
              <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-1">
                <div className="max-w-2xl space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#984300] animate-pulse"></span>
                    <span className="font-bold text-[11px] tracking-widest uppercase text-[#984300]">SIMHASTHA MAHA ANNADAN 2027</span>
                  </div>
                  <h1 className="font-bold text-[32px] md:text-[56px] text-[#1c1c19] tracking-tight leading-tight">Free Annadan, Mahaprasad &amp; Sacred Water</h1>
                  <p className="text-[14px] text-[#564339] leading-relaxed mt-2">Explore verified charitable kitchens, temple bhandaras, and 24/7 drinking water points across Nashik and Trimbakeshwar.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button className="bg-[#984300] hover:bg-[#ba5814] text-white font-semibold text-[12px] px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors">
                    <MS name="near_me" cls="text-[18px]" />
                    <span className="">Find Annadan Near Me</span>
                  </button>
                  <button className="bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#3e6374] font-semibold text-[12px] px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors">
                    <MS name="water_drop" cls="text-[18px]" />
                    <span className="">Drinking Water</span>
                  </button>
                  <button className="bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#755717] font-semibold text-[12px] px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors">
                    <MS name="handshake" cls="text-[18px]" />
                    <span className="">Sponsor Sewa</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Filter & Hub Selector Bar */}
          <section className="w-full bg-[#fcf9f4] pt-4 pb-2">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#f6f3ee] p-2 rounded-xl">
                {/* Interactive Category Toggle Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button className="px-4 py-2 rounded-lg font-semibold text-[12px] transition-all bg-[#3e6374] text-white shadow-sm">
                    All Sacred Meals (128)
                  </button>
                  <button className="px-4 py-2 rounded-lg font-semibold text-[12px] transition-all bg-[#f0ede9] text-[#564339] hover:text-[#1c1c19]">
                    Continuous Maha Bhandara (46)
                  </button>
                  <button className="px-4 py-2 rounded-lg font-semibold text-[12px] transition-all bg-[#f0ede9] text-[#564339] hover:text-[#1c1c19]">
                    Akhada &amp; Sadhu Pandals (32)
                  </button>
                  <button className="px-4 py-2 rounded-lg font-semibold text-[12px] transition-all bg-[#f0ede9] text-[#564339] hover:text-[#1c1c19]">
                    RO Drinking Water (180+)
                  </button>
                </div>
                {/* Area Filter Selector */}
                <div className="flex items-center gap-1 shrink-0">
                  <span className="font-semibold text-[11px] text-[#564339]">Zone:</span>
                  <div className="relative inline-block">
                    <select defaultValue="All Yatra Hubs" className="bg-white text-[#1c1c19] text-[13px] px-3 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3e6374] appearance-none cursor-pointer border border-[#e5e2dd]">
                      <option value="All Yatra Hubs">All Yatra Hubs (Tapovan, Ram Kund, Trimbak)</option>
                      <option>Tapovan Sadhu Gram (Sector 1–4)</option>
                      <option>Ram Kund &amp; Panchavati Ghats</option>
                      <option>Trimbakeshwar Temple &amp; Bypass</option>
                      <option>Nilgiri Baug Yatra Holding Area</option>
                      <option>Nashik Road Railway Transit Camp</option>
                    </select>
                    <MS name="expand_more" cls="absolute right-2 top-2.5 pointer-events-none text-[#564339] text-[18px]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Split Canvas */}
          <section className="w-full bg-[#fcf9f4] py-4">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-[18px] text-[#1c1c19]">Verified Annakshetras &amp; Bhandara Pandals</h2>
                  <span className="bg-[#3e6374]/10 text-[#3e6374] text-[11px] px-2.5 py-0.5 rounded-full font-bold">4 Active Pandals</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[11px] text-[#564339]">
                  <MS name="check_circle" cls="text-[16px] text-green-500" />
                  <span className="">All FSSAI Satvik Certified</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">

                {/* Card 1 */}
                <article className="bg-[#f6f3ee] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between border border-[#e5e2dd]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvtuCEd6VnhgC72Ot2mPYkz5GY9hRQOjz3Rx0V88w0P-q6JVH25p7-2gWd7lTYHm5SoYBgrchCZN6NR6kxSaCAVAGpym2qXx-OLfVWOK6aTQLuXH48679PGrrEqPWOkVtZfjaMID805JPmH5XbI3kc_41TOZcKFH9xjk7v3pdSNTelUY0rxZaHFu368FwwsARoyzWqInzb-__83A2K8SbHS98rdtH7jKfIRYAxN6yMEK5XkFYa_Gih7w" alt="" />
                    <div className="absolute top-2 left-2 bg-[#984300] text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow">Major Hub</div>
                    <div className="absolute bottom-2 left-2 right-2 bg-[#31302d]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="font-bold">LIVE NOW</span></span>
                      <span className="">Est. Wait: ~10 min</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="bg-[#3e6374]/10 text-[#3e6374] px-2 py-0.5 rounded text-[11px] font-semibold">Verified 25m ago</span>
                        <span className="text-[#755717] bg-[#ffdea5]/30 px-2 py-0.5 rounded text-[11px] font-bold">50,000+ Daily Servings</span>
                      </div>
                      <h3 className="font-semibold text-[20px] text-[#1c1c19] leading-tight">Tapovan Sadhu Gram Maha Annakshetra</h3>
                      <p className="text-[11px] text-[#564339]">Organizer: All India Akhada Parishad &amp; Simhastha Sewa Samiti</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg space-y-1.5 border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 text-[#1c1c19]"><MS name="schedule" cls="text-[#984300] text-[17px]" /><span className="font-semibold text-[12px]">10:00 AM – 3:30 PM &amp; 6:00 PM – 10:30 PM</span></div>
                      <div className="flex items-center gap-2 text-[#564339]"><MS name="pin_drop" cls="text-[#3e6374] text-[17px]" /><span className="text-[13px]">Gate #4, Tapovan Sadhu Gram (Adjacent Juna Akhada Camp)</span></div>
                      <div className="pt-1">
                        <span className="font-semibold text-[11px] text-[#984300] block">Today's Mahaprasad:</span>
                        <p className="text-[13px] text-[#1c1c19] leading-snug">Moong Dal Khichdi with cow ghee, Batata Rassa Bhaji, Fresh Poori, Bundi Prasad, Masala Chaas.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[#564339] pt-2">
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="accessible" cls="text-[13px] text-[#984300]" /> Elder Seating</span>
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="mode_fan" cls="text-[13px] text-[#3e6374]" /> Air-Coolers</span>
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="water_drop" cls="text-[13px] text-[#3e6374]" /> RO Water</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#e5e2dd] grid grid-cols-4 gap-2">
                      <button className="bg-[#984300] hover:bg-[#ba5814] text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 shadow-sm transition-colors text-center"><MS name="directions_walk" cls="text-[16px]" /><span className="hidden sm:inline">Route</span></button>
                      <button className="bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#3e6374] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="map" cls="text-[16px]" /><span className="hidden sm:inline">Map</span></button>
                      <a href="tel:+912532501001" className="bg-white border border-[#e5e2dd] hover:bg-[#f0ede9] text-[#1c1c19] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="call" cls="text-[#984300] text-[16px]" /><span className="hidden sm:inline">Call</span></a>
                      <a href="#" className="bg-green-500 hover:bg-green-600 text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm text-center"><MS name="chat" cls="text-[16px]" /><span className="hidden sm:inline">WhatsApp</span></a>
                    </div>
                  </div>
                </article>

                {/* Card 2 */}
                <article className="bg-[#f6f3ee] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between border border-[#e5e2dd]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuiDOBKs-uxXDhIJGX3TaRQRX4yRYkId1WRAEoFbHP9uVHfF6OGJLM9mjpAO8UVPzjcSdtktVMK0TjtiRYVenHao_eP7sbgSkngvtb-Y_xoaVNhxs-Z9Y5qOEOgJ_l37CT79KCeGGolubWOMuZJRHE6UyxMv4og7lPaDiPOZy__CKN4lva8yl_UCJJNijMrfoWpuXZxpnhoFxN7THDjGbqyPKWjXrHpi-sU_2UgIsiaBzLggMxYIen6w" alt="" />
                    <div className="absolute top-2 left-2 bg-[#3e6374] text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow">Trimbak Sector</div>
                    <div className="absolute bottom-2 left-2 right-2 bg-[#31302d]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="font-bold">CONTINUOUS SEVA</span></span>
                      <span className="">Queue: ~5 min</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="bg-[#3e6374]/10 text-[#3e6374] px-2 py-0.5 rounded text-[11px] font-semibold">Verified 40m ago</span>
                        <span className="text-[#755717] bg-[#ffdea5]/30 px-2 py-0.5 rounded text-[11px] font-bold">40,000 Devotees</span>
                      </div>
                      <h3 className="font-semibold text-[20px] text-[#1c1c19] leading-tight">Shree Gajanan Maharaj Sansthan</h3>
                      <p className="text-[11px] text-[#564339]">Organizer: Shegaon Sansthan Devotee Trust</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg space-y-1.5 border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 text-[#1c1c19]"><MS name="schedule" cls="text-[#984300] text-[17px]" /><span className="font-semibold text-[12px]">10:30 AM – 8:30 PM (Continuous)</span></div>
                      <div className="flex items-center gap-2 text-[#564339]"><MS name="pin_drop" cls="text-[#3e6374] text-[17px]" /><span className="text-[13px]">Trimbakeshwar Bypass Road (700m from Kund)</span></div>
                      <div className="pt-1">
                        <span className="font-semibold text-[11px] text-[#984300] block">Today's Mahaprasad:</span>
                        <p className="text-[13px] text-[#1c1c19] leading-snug">Traditional Varan-Bhat (Toor dal rice), Jowar Bhakri, Shengdana Chutney, Seasonal Methi Sabzi, Pithla.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[#564339] pt-2">
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="sanitizer" cls="text-[13px] text-[#984300]" /> 100% Steam-Sterilized Thalis</span>
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="recycling" cls="text-[13px] text-[#3e6374]" /> Zero Waste Eco Mandap</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#e5e2dd] grid grid-cols-4 gap-2">
                      <button className="bg-[#984300] hover:bg-[#ba5814] text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 shadow-sm transition-colors text-center"><MS name="directions_walk" cls="text-[16px]" /><span className="hidden sm:inline">Route</span></button>
                      <button className="bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#3e6374] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="info" cls="text-[16px]" /><span className="hidden sm:inline">Guide</span></button>
                      <a href="tel:+912542252002" className="bg-white border border-[#e5e2dd] hover:bg-[#f0ede9] text-[#1c1c19] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="call" cls="text-[#984300] text-[16px]" /><span className="hidden sm:inline">Call</span></a>
                      <a href="#" className="bg-green-500 hover:bg-green-600 text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm text-center"><MS name="chat" cls="text-[16px]" /><span className="hidden sm:inline">WhatsApp</span></a>
                    </div>
                  </div>
                </article>

                {/* Card 3 */}
                <article className="bg-[#f6f3ee] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between border border-[#e5e2dd]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoXB7aYU9ykdNLb48Q_QSM7ikkHD1PaEW3v3p4s3Mv6CQKTqHs8tJnqL775dnLKx5YKc6HZLM2iTYE91LteEXc0aeaHASocM3wQoQEET3IjKFdUZm8-CSZjCI72ifX5yeGEHUmj6xeNMhOdz3w9EptJpwes7lDdJaHcXiphR9K3WKIKp9XzbXfOgcK4iRDD20K_oMlqu9dHo52c76k4PoU0KXAEX2m3pf7WPu23J5fxCCQE9x-FJJ82w" alt="" />
                    <div className="absolute top-2 left-2 bg-[#ba5814] text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow">Snan Ghats</div>
                    <div className="absolute bottom-2 left-2 right-2 bg-[#31302d]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400"></span><span className="font-bold">MODERATE RUSH</span></span>
                      <span className="">Moving Quick</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="bg-[#3e6374]/10 text-[#3e6374] px-2 py-0.5 rounded text-[11px] font-semibold">Verified 1 hr ago</span>
                        <span className="text-[#755717] bg-[#ffdea5]/30 px-2 py-0.5 rounded text-[11px] font-bold">Fast-Transit Feeding</span>
                      </div>
                      <h3 className="font-semibold text-[20px] text-[#1c1c19] leading-tight">Ram Kund Pavitra Snanarthi Bhandara</h3>
                      <p className="text-[11px] text-[#564339]">Organizer: Panchavati Purohit Sangh &amp; Godavari Seva Trust</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg space-y-1.5 border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 text-[#1c1c19]"><MS name="schedule" cls="text-[#984300] text-[17px]" /><span className="font-semibold text-[12px]">06:00 AM – 11:30 PM (Snan Nourishment)</span></div>
                      <div className="flex items-center gap-2 text-[#564339]"><MS name="pin_drop" cls="text-[#3e6374] text-[17px]" /><span className="text-[13px]">Ahilyabai Holkar Bridge Approach, 150m from Ram Kund</span></div>
                      <div className="pt-1">
                        <span className="font-semibold text-[11px] text-[#984300] block">Prasad &amp; Refreshments:</span>
                        <p className="text-[13px] text-[#1c1c19] leading-snug">Warm Gur-Chana, Masale Bhat, Upwas Sabudana Khichdi, hot Lemongrass Herbal Kadha.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[#564339] pt-2">
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="takeout_dining" cls="text-[13px] text-[#984300]" /> Dry Prasad Packets</span>
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="spa" cls="text-[13px] text-[#3e6374]" /> Tulsi Herbal Kadha Booth</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#e5e2dd] grid grid-cols-4 gap-2">
                      <button className="bg-[#984300] hover:bg-[#ba5814] text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 shadow-sm transition-colors text-center"><MS name="navigation" cls="text-[16px]" /><span className="hidden sm:inline">Route</span></button>
                      <button className="bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#3e6374] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="schedule" cls="text-[16px]" /><span className="hidden sm:inline">Timing</span></button>
                      <a href="tel:+912532513003" className="bg-white border border-[#e5e2dd] hover:bg-[#f0ede9] text-[#1c1c19] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="call" cls="text-[#984300] text-[16px]" /><span className="hidden sm:inline">Call</span></a>
                      <a href="#" className="bg-green-500 hover:bg-green-600 text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm text-center"><MS name="chat" cls="text-[16px]" /><span className="hidden sm:inline">WhatsApp</span></a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Cross-Link Navigation Banner */}

        </div>
      </main>

      <Footer />
    </div>
  );
}
