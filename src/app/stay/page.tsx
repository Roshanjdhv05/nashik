'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/* ─── Tiny helpers ─────────────────────────────────────────────── */
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
    { id: 'lost', label: 'Lost & Found', href: '/lost' },
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
              className={`h-full flex items-center px-1 text-[13px] transition-colors ${
                activeNav === l.id
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
              <li><Link href="#" className="hover:text-[#ffdea5] transition-colors">Verified Annadan &amp; Bhandara</Link></li>
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

export default function StayPage() {
  const [lang, setLang] = useState('en');
  const [activeNav, setActiveNav] = useState('stay');
  
  const [activeZone, setActiveZone] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('p2');
  const [selectedDists, setSelectedDists] = useState<string[]>(['d1', 'd2']);
  const [sortBy, setSortBy] = useState('proximity');

  const toggleDist = (id: string) => {
    setSelectedDists(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredProps = properties.filter(p => {
    if (activeZone !== 'all' && p.zoneKey !== activeZone) return false;
    const pr = priceRanges.find(r => r.id === selectedPrice);
    const prevPr = priceRanges[priceRanges.findIndex(r => r.id === selectedPrice) - 1];
    if (pr) {
      const minPrice = prevPr ? prevPr.max + 1 : 0;
      if (p.price < minPrice || p.price > pr.max) return false;
    }
    if (selectedDists.length > 0) {
      const allowedMaxKm = Math.max(
        ...selectedDists.map(id => distanceFilters.find(d => d.id === id)?.max ?? 10)
      );
      if (p.distKm > allowedMaxKm) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] font-sans selection:bg-[#984300] selection:text-white">
      {/* ── Top navbar layout ── */}
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)]">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>

      <main className="w-full pt-[116px]">
        {/* ── Page Header ── */}
        <div className="bg-white border-b border-[#e5e2dd] pb-8 pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] text-[#897267] mb-4">
              <Link href="/" className="hover:text-[#984300] transition-colors uppercase tracking-wider font-semibold">Home</Link>
              <span>/</span>
              <span className="text-[#984300] font-semibold uppercase tracking-wider">Stays & Ashrams</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#ffdbca] text-[#984300] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                  <MS name="hotel_class" cls="text-[14px]" />
                  Simhastha Certified Accommodations
                </div>
                <h1 className="text-[32px] sm:text-[40px] leading-tight font-semibold text-[#1c1c19] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Stays & Ashrams
                </h1>
                <p className="text-[#564339] mt-2 max-w-xl text-[14px] leading-relaxed">
                  Verified pilgrim hotels, sacred ashrams, dharamshalas, trust bhakt niwas, and official luxury tent cities across Nashik, Trimbakeshwar &amp; Tapovan.
                </p>
              </div>

              {/* Trust badge */}
              <div className="flex items-center gap-3 bg-[#f6f3ee] border border-[#e5e2dd] px-4 py-3 rounded-xl shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#c1e8fc] flex items-center justify-center text-[#3e6374]">
                  <MS name="verified_user" cls="text-[22px]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#1c1c19]">100% Rate-Capped Tariff</div>
                  <div className="text-[11px] text-[#564339]">Nashik Collectorate Approved</div>
                </div>
              </div>
            </div>

            {/* Zone pills */}
            <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 no-scrollbar">
              <span className="text-[11px] text-[#897267] font-semibold uppercase tracking-wider shrink-0 mr-2">Sacred Sectors:</span>
              {zones.map(z => (
                <button
                  key={z.key}
                  onClick={() => setActiveZone(z.key)}
                  className={`px-4 py-2 rounded-full text-[12px] font-semibold shrink-0 transition-all ${
                    activeZone === z.key
                      ? 'bg-[#984300] text-white shadow-md'
                      : 'bg-[#f0ede9] text-[#564339] hover:bg-[#e5e2dd] hover:text-[#1c1c19]'
                  }`}
                >
                  {z.label} ({z.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Layout: Sidebar + Results ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ── Sidebar Filters ── */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white border border-[#e5e2dd] rounded-2xl p-5 sticky top-32 shadow-sm">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#f0ede9]">
                  <h2 className="font-bold text-[#1c1c19] flex items-center gap-2 text-[14px]">
                    <MS name="filter_list" cls="text-[#984300] text-[18px]" />
                    Filters
                  </h2>
                  <button
                    onClick={() => { setSelectedDists(['d1', 'd2']); setSelectedPrice('p2'); setActiveZone('all'); }}
                    className="text-[11px] text-[#897267] hover:text-[#984300] font-semibold transition"
                  >
                    Reset All
                  </button>
                </div>

                {/* Distance filter */}
                <div className="mb-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#564339] mb-3">Distance to Sacred Ghats</h3>
                  <div className="space-y-3">
                    {distanceFilters.map(d => (
                      <label key={d.id} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={selectedDists.includes(d.id)}
                            onChange={() => toggleDist(d.id)}
                            className="accent-[#984300] w-4 h-4 rounded border-[#ddc1b3] cursor-pointer"
                          />
                          <span className="text-[13px] text-[#564339] group-hover:text-[#1c1c19] transition">{d.label}</span>
                        </div>
                        <span className="text-[11px] text-[#897267] font-semibold">{d.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div className="border-t border-[#f0ede9] pt-5">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#564339] mb-3">Nightly Contribution (₹)</h3>
                  <div className="space-y-3">
                    {priceRanges.map(pr => (
                      <label key={pr.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPrice === pr.id}
                          onChange={() => setSelectedPrice(pr.id)}
                          className="accent-[#984300] w-4 h-4 border-[#ddc1b3] cursor-pointer"
                        />
                        <span className="text-[13px] text-[#564339] group-hover:text-[#1c1c19] transition">{pr.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Results ── */}
            <div className="flex-1 min-w-0">
              {/* Sort bar */}
              <div className="bg-white border border-[#e5e2dd] rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 shadow-sm">
                <div>
                  <div className="text-[14px] font-bold text-[#1c1c19]">
                    Showing {filteredProps.length} Verified Stays
                  </div>
                  <div className="text-[12px] text-[#564339] mt-0.5">
                    Available for check-in: 18 Aug 2027 – 22 Aug 2027
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-[#897267] font-semibold uppercase tracking-wider">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="bg-[#f0ede9] border border-[#ddc1b3] text-[#1c1c19] px-3 py-1.5 rounded-lg text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#984300] cursor-pointer"
                  >
                    <option value="proximity">Proximity to Holy Ghats</option>
                    <option value="rating">Devotee Rating (Highest)</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="certified">Fair-Price Certified</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProps.length === 0 ? (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white border border-[#e5e2dd] rounded-2xl p-12 text-center shadow-sm">
                    <MS name="search_off" cls="text-[48px] text-[#a59d95]" />
                    <p className="text-[#564339] mt-3 text-[14px]">No properties match your current filters.</p>
                    <button
                      onClick={() => { setSelectedDists(['d1', 'd2', 'd3', 'd4']); setSelectedPrice('p3'); setActiveZone('all'); }}
                      className="mt-4 bg-[#984300] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#ba5814] transition shadow-md shadow-[#984300]/20"
                    >
                      Widen Filters
                    </button>
                  </div>
                ) : (
                  filteredProps.map(p => (
                    <article
                      key={p.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Color Area Replacement for Image */}
                      <div className="relative w-full shrink-0" style={{ height: '200px', backgroundColor: p.colorHex }}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <MS name="hotel_class" cls="text-[80px] text-[#1c1c19]" />
                        </div>
                        <div className="absolute bottom-4 left-4 bg-white text-[#1e3a8a] text-[12px] font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                          {p.badge}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1 bg-white">
                        {/* Title & Info */}
                        <h3 className="text-[20px] font-bold text-[#1c1c19] mb-2 leading-snug">
                          {p.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-[14px] text-gray-700 mb-4 font-medium">
                          <MS name="calendar_today" cls="text-[18px]" />
                          <span>₹{p.price.toLocaleString()} {p.priceTag} • {p.distance}</span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-[14px] text-gray-600 leading-relaxed mb-6 flex-1">
                          {p.desc}
                        </p>
                        
                        {/* Actions */}
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <button className="text-[#1e3a8a] hover:text-[#1e40af] text-[14px] font-bold flex items-center gap-1 transition">
                            View Details <MS name="arrow_forward" cls="text-[18px]" />
                          </button>

                          {/* Contact Options */}
                          <div className="flex items-center gap-2">
                            <a 
                              href="tel:+910000000000" 
                              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
                              title="Call Now"
                            >
                              <MS name="call" cls="text-[18px]" />
                            </a>
                            <a 
                              href="https://wa.me/910000000000" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition border border-green-200"
                              title="WhatsApp"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>

              {/* Pagination */}
              {filteredProps.length > 0 && (
                <div className="flex items-center justify-between mt-8 bg-white border border-[#e5e2dd] rounded-xl px-5 py-3 shadow-sm">
                  <span className="text-[12px] text-[#564339]">
                    Showing <span className="font-bold text-[#1c1c19]">1–{filteredProps.length}</span> of 48 properties
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button className="w-8 h-8 rounded-lg bg-[#f0ede9] text-[#a59d95] flex items-center justify-center cursor-not-allowed" disabled>
                      <MS name="chevron_left" cls="text-[18px]" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[#984300] text-white font-bold text-[13px] shadow-sm">1</button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-[#e5e2dd] text-[#564339] hover:bg-[#f0ede9] text-[13px] font-semibold transition">2</button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-[#e5e2dd] text-[#564339] hover:bg-[#f0ede9] text-[13px] font-semibold transition">3</button>
                    <span className="text-[#a59d95] px-1">…</span>
                    <button className="w-8 h-8 rounded-lg bg-white border border-[#e5e2dd] text-[#564339] hover:bg-[#f0ede9] text-[13px] font-semibold transition">10</button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-[#e5e2dd] text-[#564339] hover:bg-[#f0ede9] flex items-center justify-center transition">
                      <MS name="chevron_right" cls="text-[18px]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
