'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Topbar, Navbar } from '@/components/Navbar';
import { MobileBottomNav } from '@/components/MobileBottomNav';

/* ─── Tiny Icon Helper ─────────────────────────────────────────── */
const MS = ({ name, cls = '' }: { name: string; cls?: string }) => (
  <span className={`material-symbols-outlined ${cls}`}>{name}</span>
);

/* ─── DATA ─────────────────────────────────────────────────────── */
const TEMPLES = [
  {
    id: 't1',
    category: 'Jyotirlinga',
    categoryCls: 'bg-[#ffdea5] text-[#774400]',
    tag: 'Must Visit',
    tagCls: 'bg-[#ffdbca] text-[#984300]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg',
    name: 'Trimbakeshwar Jyotirlinga',
    dist: '28 km from Nashik',
    desc: 'One of the twelve sacred Jyotirlingas where Brahma, Vishnu & Shiva reside together. Origin point of the holy river Godavari.',
    openTime: '05:30 AM – 09:00 PM',
    aarti: '05:30 AM & 07:00 PM',
    wait: '~75 Min Queue',
    waitIcon: 'schedule',
    access: 'Shuttle #4 from Nashik Central',
    highlights: ['Brahmagiri Hills', 'Godavari Origin', 'Shahi Snan Axis'],
    rating: 5,
  },
  {
    id: 't2',
    category: 'Sacred Kund',
    categoryCls: 'bg-[#bee5fa] text-[#3e6374]',
    tag: 'Shahi Snan',
    tagCls: 'bg-[#bee5fa] text-[#3e6374]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe2iU1zFe4tdmgsvTfcRSQBTr1n1LMElnSCQgtUqYKoEN2-FZZ_D4q0rZ1KsKcP4t9Bh99orMw8kbVs8FvpCGg1v6BgEVGioyOLQ21pLM0Qfmia2_6g6UhEviVTbUA2Ft5lEZYcbTJFwBMXK3R3w9Vh0UyeciSWTHOjath1Mb3KmTLDMs3NQyw2hnwRzdSxo-EUNH0Ak6PPDlUODzC8cBWamuj1WiiiOEQ2HnpL6rqlISbytNDlrz5g',
    name: 'Ram Kund & Godavari Ghat',
    dist: 'Panchavati Heritage Zone',
    desc: 'The most sanctified bathing kund where Lord Rama performed shraddha rituals. Epicenter of Simhastha Shahi Snan.',
    openTime: '24 Hours Open',
    aarti: 'Maha Aarti: 06:45 PM',
    wait: 'Water Depth: 4.5 ft',
    waitIcon: 'water_drop',
    access: 'Ring Road Ghat #1',
    highlights: ['Shahi Snan Ghat #1', 'Lord Rama Heritage', 'Maha Aarti Venue'],
    rating: 5,
  },
  {
    id: 't3',
    category: 'Ramayana Heritage',
    categoryCls: 'bg-[#e8f5e9] text-[#2e7d32]',
    tag: 'Forest Hermitage',
    tagCls: 'bg-[#e8f5e9] text-[#2e7d32]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sXpDjmuwPtmIfzcD6BQW9ixUKQgcDJINrAP6EJKQLKw4wliezr3kTEQMX7w7pRga8IF7n6WRRIHGCt7mO4tVrwVLWxCWLdJPu0j-cKJAcAiilbSD4lOHjizgJsJfMwK_edX3vICEEWJbR_v5Vpva9thFgk1jWlIWEEVXU43EsGbwzN0LAV0OIYMx9utwf0JQAwxW-TMDtg9-j1-15kc5kRu58VJ58uf4GPQZxd1HSKJQ2nWIbxyreQ',
    name: 'Panchavati & Sita Gufa',
    dist: '0.8 km from Ram Kund',
    desc: 'The revered hermitage where Lord Rama, Sita, and Lakshmana stayed during their 14-year exile. Features the sacred cave sanctum.',
    openTime: '06:00 AM – 09:00 PM',
    aarti: '5 Sacred Banyan Trees',
    wait: '~25 Min Queue',
    waitIcon: 'timer',
    access: 'Walkable from Panchavati',
    highlights: ['Historic Cave Gufa', '5 Banyan Trees', 'Ramayana Site'],
    rating: 4,
  },
  {
    id: 't4',
    category: 'Historic Temple',
    categoryCls: 'bg-[#ede7f6] text-[#6a1b9a]',
    tag: 'Black Stone',
    tagCls: 'bg-[#ede7f6] text-[#6a1b9a]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMf7cw1FidMnJUlDTy5cMnPRtnQYSO7YTDs013uMW1LKEyRr8TRDkG5HtthE5pXyuAGeq19CXSld7XHQxIEOvyU0bFeEUbZK0mSmAD5cI_GDv-jNlQmvp2Rrjace7lkhfAePENFKb5fBzwgc4suzOkiNEd37aTmVaCAT22OHVL9zPbWlpT16xuafmmvCNK6jMO_0QPnl4GMVJKFVWN4J9_E60ehjZV0cHi4v2eYeWtNmXZdsWwJSelQ',
    name: 'Shree Kalaram Mandir',
    dist: '0.5 km from Panchavati',
    desc: 'Celebrated architectural marvel built entirely of black basalt stone by Sardar Rangrao Odhekar in 1792 CE.',
    openTime: '05:00 AM – 09:30 PM',
    aarti: 'Kakad Aarti: 05:00 AM',
    wait: '~40 Min Queue',
    waitIcon: 'group',
    access: 'Central Panchavati Area',
    highlights: ['1792 CE Black Basalt', 'Ram Murti', 'Bhimrao Ambedkar History'],
    rating: 4,
  },
  {
    id: 't5',
    category: 'Ancient Shrine',
    categoryCls: 'bg-[#fce4ec] text-[#c2185b]',
    tag: '2000+ Years Old',
    tagCls: 'bg-[#fce4ec] text-[#c2185b]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqG3E4VPiJN3jbxC5I-jMc6s-mH8Vz8u9-OzVp6sRN8hqJxS0XhfCfNT72Gd9vXbfVmL97TpRJj3rqPFzO90EKHlcSO_JO8cA_mPSHVHPvnqG2oWxaXkL1DJb6y-OJZEb6QJBdh6Kb4l5t5jqTvePFfp9mJVS6mN1kZJnFUBFfBmvJa2XA7t0XcHiREQrQ7kT4d02QVbJh2PD5VEiW_t1L_Uf3MefmGJjChXHhBrBzaSZhvKgfA',
    name: 'Kapaleshwar Mahadev Temple',
    dist: '1.2 km from Ram Kund',
    desc: 'One of the most ancient Shiva temples in Nashik, believed to date back over 2,000 years. Situated on the banks of Godavari.',
    openTime: '05:00 AM – 09:00 PM',
    aarti: 'Evening Aarti: 07:00 PM',
    wait: '~15 Min Queue',
    waitIcon: 'timer',
    access: 'Old City Ghat Road',
    highlights: ['Shiva Lingam', 'Godavari Banks', '2000+ Year History'],
    rating: 4,
  },
  {
    id: 't6',
    category: 'Devi Shrine',
    categoryCls: 'bg-[#fff3e0] text-[#e65100]',
    tag: 'Shakti Peeth',
    tagCls: 'bg-[#fff3e0] text-[#e65100]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPJsPr_BF3_vLSGWX5hBWEEKJNOzN6nDJqj2i_dQ2W3XPCDSjYPdmFbWcFz3wKFf3GJvnBxivrmVxv6ysJFuMG34qyOeiFdBvCfwE2BU6HbT8-VFQCMvI80S0NmLuM6LIWaMy0EEw_-x24CGOFaAoUm8G28zJQNv3ZHp8jnOY2FYK0v-A3tXI0wHqLFjIPTrJcQVCnM2LJYqJLXTX33FFBS_mIj0pVVN9pECIiE3e5U8EkqX_xSg8',
    name: 'Saptashringi Devi Temple',
    dist: '65 km from Nashik',
    desc: 'Sacred half-Shakti Peeth situated on the seven-peaked Sahyadri mountain. One of Maharashtra\'s most revered goddess shrines.',
    openTime: '05:00 AM – 08:00 PM',
    aarti: 'Abhishek: 06:00 AM',
    wait: 'Special Kumbh Shuttle',
    waitIcon: 'directions_bus',
    access: 'Day Trip from Nashik',
    highlights: ['Sahyadri Peaks', 'Shakti Peeth', 'Mahashivratri Fair'],
    rating: 5,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Shrines', icon: 'auto_awesome' },
  { id: 'jyotirlinga', label: 'Jyotirlinga', icon: 'temple_hindu' },
  { id: 'ghat', label: 'Holy Ghats', icon: 'water' },
  { id: 'ramayana', label: 'Ramayana Sites', icon: 'forest' },
  { id: 'devi', label: 'Devi Shrines', icon: 'brightness_5' },
];

const AARTI_SCHEDULE = [
  { time: '04:15 AM', name: 'Brahma Muhurta Aarti', place: 'Trimbakeshwar Temple', type: 'aarti', color: '#FF5722' },
  { time: '05:00 AM', name: 'Kakad Aarti', place: 'Shree Kalaram Mandir', type: 'aarti', color: '#FF9800' },
  { time: '05:30 AM', name: 'Mangala Aarti', place: 'Trimbakeshwar Jyotirlinga', type: 'aarti', color: '#FF5722' },
  { time: '06:45 AM', name: 'Godavari Surya Arghya', place: 'Ram Kund Ghat', type: 'snan', color: '#0288D1' },
  { time: '11:00 AM', name: 'Mahapooja & Rudrabhishek', place: 'Trimbakeshwar', type: 'pooja', color: '#7B1FA2' },
  { time: '12:00 PM', name: 'Madhyanha Aarti', place: 'Kapaleshwar Mahadev', type: 'aarti', color: '#FF9800' },
  { time: '06:45 PM', name: 'Godavari Maha Aarti', place: 'Ram Kund Ghat', type: 'aarti', color: '#E65100' },
  { time: '07:00 PM', name: 'Sandhya Aarti', place: 'Trimbakeshwar & Kalaram', type: 'aarti', color: '#C2185B' },
  { time: '08:30 PM', name: 'Shayan Aarti', place: 'All Major Temples', type: 'aarti', color: '#4527A0' },
];

/* ─── PAGE COMPONENT ────────────────────────────────────────────── */



export default function DarshanPage() {
  const [lang, setLang] = useState('en');
  const [activeNav, setActiveNav] = useState('darshan');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTemple, setSelectedTemple] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'guide' | 'schedule' | 'protocol'>('guide');

  const selected = TEMPLES.find(t => t.id === selectedTemple);

  return (
    <>
      <div className="min-h-screen bg-[#fcf9f4]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── Top Nav Bar ────────────────────────────────────── */}
              <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">
        <Topbar lang={lang} setLang={setLang} />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>

        {/* ── MOBILE BANNER ── */}
        <section className="md:hidden relative w-full overflow-hidden bg-[#1c1c19] pt-[60px]" style={{ minHeight: '340px', height: '100vw', maxHeight: '440px' }}>
          {/* Background image */}
          <div className="absolute inset-0 h-full w-full">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg" alt="Darshan" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-10 pt-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full mb-3 self-start">
              <span className="material-symbols-outlined text-[13px] text-[#e9c176]">temple_hindu</span>
              <span className="text-[10px] uppercase tracking-wider text-white font-bold">SACRED SHRINES & DARSHAN</span>
            </div>

            {/* Headline */}
            <h1
              className="text-[28px] sm:text-[34px] leading-[1.1] font-semibold text-white drop-shadow-md"
              style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 18px rgba(0,0,0,0.6)' }}
            >
              Darshan &<br />
              <em className="not-italic italic font-normal text-[#ffb68e]">Sacred Temples.</em>
            </h1>

            {/* Subtitle */}
            <p className="text-[12px] text-white/90 font-medium mt-2 max-w-[320px] leading-relaxed drop-shadow">
              14 verified sacred sites across Nashik & Trimbakeshwar — with live crowd status, darshan timings, and devotee protocols.
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 mt-3.5">
              <Link
                href="/map"
                className="bg-[#ba5814] hover:bg-[#984300] text-white px-4 py-2.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
              >
                <MS name="map" cls="text-[16px]" />
                <span>Open Live Map</span>
                <MS name="arrow_forward" cls="text-[14px]" />
              </Link>
            </div>
          </div>

          {/* ── SMOOTH MERGE EFFECT (Wave SVG curve at bottom fading into background) ── */}
          <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-9 sm:h-14 fill-[#fcf9f4]">
              <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        {/* ── DESKTOP Hero Banner ────────────────────────────────────── */}
        <section className="hidden md:flex relative w-full min-h-[380px] lg:min-h-[440px] items-end overflow-hidden pt-12 md:pt-[116px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19] via-[#1c1c19]/60 to-[#1c1c19]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#984300]/40 via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-10 lg:pb-14">
            <div className="inline-flex items-center gap-2 bg-[#984300]/80 backdrop-blur-sm border border-[#e9c176]/30 px-3 py-1 rounded-full mb-3">
              <MS name="temple_hindu" cls="text-[#e9c176] text-[14px]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#e9c176]">Sacred Shrines & Darshan</span>
            </div>
            <h1
              className="text-[42px] sm:text-[56px] lg:text-[64px] font-semibold text-white leading-[1.05] mb-4"
              style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Darshan &<br />
              <em className="not-italic italic font-normal" style={{ color: '#ffb68e' }}>Sacred Temples</em>
            </h1>
            <p className="text-[15px] sm:text-[17px] text-white/85 max-w-xl leading-relaxed">
              14 verified sacred sites across Nashik &amp; Trimbakeshwar — with live crowd status, darshan timings, and devotee protocols for Simhastha 2027.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              {[
                { icon: 'temple_hindu', text: '14 Sacred Shrines' },
                { icon: 'schedule', text: 'Live Wait Times' },
                { icon: 'verified', text: 'Authority Verified' },
                { icon: 'accessibility_new', text: 'Accessible Routes' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-white/90 text-[12px] font-medium">
                  <MS name={b.icon} cls="text-[15px] text-[#e9c176]" />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Info Strip ─────────────────────────────────────── */}
        <div className="hidden md:block w-full bg-[#984300]">
          <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-3 flex flex-wrap items-center gap-6">
            {[
              { icon: 'calendar_today', text: 'Today: Shravan Shukla Purnima — Most auspicious darshan day' },
              { icon: 'water_drop', text: 'Godavari: Grade A Pavitra • Safe for Snan' },
              { icon: 'groups', text: 'Current Crowd: Moderate at Panchavati Zone' },
            ].map(i => (
              <div key={i.text} className="flex items-center gap-2 text-white/90 text-[12px] font-medium">
                <MS name={i.icon} cls="text-[15px] text-[#ffdea5]" />
                <span>{i.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Content ────────────────────────────────────── */}
        <main className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-10">

          {/* ── Filter Bar ──────────────────────────────────── */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex-shrink-0 snap-start flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all border ${activeFilter === cat.id
                  ? 'bg-[#984300] text-white border-[#984300] shadow-md shadow-[#984300]/25'
                  : 'bg-white text-[#564339] border-[#e5e2dd] hover:border-[#984300] hover:text-[#984300]'
                  }`}
              >
                <MS name={cat.icon} cls="text-[16px]" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ── Temple Cards Grid ─────────────────────────── */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[11px] uppercase tracking-widest text-[#984300] font-bold hidden sm:inline-block">Simhastha 2027 Verified &bull;</span>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#1c1c19] whitespace-nowrap" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Sacred Pilgrimage Sites
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {TEMPLES.map(temple => (
                  <div
                    key={temple.id}
                    onClick={() => setSelectedTemple(selectedTemple === temple.id ? null : temple.id)}
                    className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${selectedTemple === temple.id
                      ? 'border-[#984300] shadow-xl shadow-[#984300]/15 ring-2 ring-[#984300]/20'
                      : 'border-[#e5e2dd] shadow-sm hover:shadow-lg hover:border-[#984300]/40'
                      }`}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={temple.img}
                        alt={temple.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${temple.categoryCls} backdrop-blur-sm`}>
                          {temple.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${temple.tagCls} bg-white/90`}>
                          {temple.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <MS key={i} name="star" cls={`text-[13px] ${i < temple.rating ? 'text-[#e9c176]' : 'text-white/30'}`} />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-[16px] font-semibold text-[#1c1c19] leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {temple.name}
                          </h3>
                          <span className="text-[11px] text-[#564339] font-medium">{temple.dist}</span>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${selectedTemple === temple.id ? 'bg-[#984300] text-white' : 'bg-[#f6f3ee] text-[#564339] group-hover:bg-[#ffdbca] group-hover:text-[#984300]'}`}>
                          <MS name={selectedTemple === temple.id ? 'expand_less' : 'expand_more'} cls="text-[18px]" />
                        </div>
                      </div>

                      <p className="text-[12px] text-[#564339] leading-relaxed mb-3 line-clamp-2">{temple.desc}</p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {temple.highlights.map(h => (
                          <span key={h} className="text-[10px] font-medium text-[#755717] bg-[#ffdea5]/60 px-2 py-0.5 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>

                      <div className="border-t border-[#f6f3ee] pt-3 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#564339]">
                          <MS name="schedule" cls="text-[14px] text-[#984300]" />
                          <span>{temple.openTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#564339]">
                          <MS name={temple.waitIcon} cls="text-[14px] text-[#3e6374]" />
                          <span>{temple.wait}</span>
                        </div>
                      </div>

                      {/* Expanded Detail */}
                      {selectedTemple === temple.id && (
                        <div className="mt-3 pt-3 border-t border-[#f6f3ee] space-y-2 animate-[fadeIn_0.2s_ease-in]">
                          <div className="flex items-center gap-2 text-[12px] text-[#1c1c19]">
                            <MS name="local_fire_department" cls="text-[15px] text-[#984300]" />
                            <span><strong>Aarti:</strong> {temple.aarti}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-[#1c1c19]">
                            <MS name="directions_bus" cls="text-[15px] text-[#3e6374]" />
                            <span><strong>Access:</strong> {temple.access}</span>
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button className="flex-1 bg-[#984300] hover:bg-[#ba5814] text-white text-[12px] font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                              <MS name="directions" cls="text-[15px]" />
                              Get Directions
                            </button>
                            <Link href="/map" className="flex-1 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#564339] hover:text-[#1c1c19] text-[12px] font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                              <MS name="map" cls="text-[15px]" />
                              View on Map
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coming Soon */}
              <div className="hidden md:flex mt-6 bg-[#ffdea5]/30 border border-[#ffdea5] rounded-xl p-4 items-center gap-4">
                <MS name="info" cls="text-[28px] text-[#755717] shrink-0" />
                <div>
                  <span className="text-[13px] font-bold text-[#755717] block">8 More Shrines Being Added</span>
                  <span className="text-[12px] text-[#564339]">
                    Godavari Ghat temples, Sundarnarayan Mandir, Muktidham Complex and more will be listed before Simhastha begins.
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right Panel: Sidebar ──────────────────────── */}
            <div className="lg:col-span-4 space-y-5">

              {/* Tab Switcher */}
              <div className="bg-white rounded-2xl border border-[#e5e2dd] shadow-sm overflow-hidden">
                <div className="flex border-b border-[#f6f3ee]">
                  {([
                    { id: 'guide', label: 'Darshan Guide', icon: 'menu_book' },
                    { id: 'schedule', label: 'Aarti Times', icon: 'schedule' },
                    { id: 'protocol', label: 'Protocol', icon: 'info' },
                  ] as const).map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-[11px] font-bold uppercase tracking-wide transition-colors ${activeTab === tab.id
                        ? 'text-[#984300] bg-[#ffdbca]/30 border-b-2 border-[#984300]'
                        : 'text-[#564339] hover:bg-[#f6f3ee]'
                        }`}
                    >
                      <MS name={tab.icon} cls="text-[18px]" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-4">
                  {/* Darshan Guide Tab */}
                  {activeTab === 'guide' && (
                    <div className="space-y-3">
                      <h3 className="text-[14px] font-bold text-[#1c1c19]" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Essential Darshan Tips
                      </h3>
                      {[
                        { icon: 'wb_twilight', tip: 'Arrive at dawn for Brahma Muhurta darshan — shortest queues, most spiritually potent time.' },
                        { icon: 'checkroom', tip: 'Wear saffron, white or cream attire. Avoid footwear inside temple precincts.' },
                        { icon: 'water_drop', tip: 'Carry Gangajal or Godavari Jal for abhishek offering. Plastic bottles not allowed in sanctum.' },
                        { icon: 'no_photography', tip: 'Photography strictly prohibited inside garbhagriha (sanctum). Allowed in outer courtyard.' },
                        { icon: 'elderly', tip: 'Senior pilgrims (65+) and differently-abled devotees get priority darshan lanes at all temples.' },
                        { icon: 'lock_clock', tip: 'Book timed-entry e-pass on Kumbh portal for Trimbakeshwar to skip 75-min walk-in queue.' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2.5 bg-[#fcf9f4] rounded-xl">
                          <MS name={item.icon} cls="text-[20px] text-[#984300] shrink-0 mt-0.5" />
                          <p className="text-[12px] text-[#564339] leading-relaxed">{item.tip}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Aarti Schedule Tab */}
                  {activeTab === 'schedule' && (
                    <div>
                      <h3 className="text-[14px] font-bold text-[#1c1c19] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Today&apos;s Aarti Schedule
                      </h3>
                      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-hide">
                        {AARTI_SCHEDULE.map((a, i) => (
                          <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#fcf9f4] hover:bg-[#f6f3ee] transition-colors cursor-pointer">
                            <div
                              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                              style={{ backgroundColor: a.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold text-[#1c1c19] truncate">{a.name}</span>
                                <span className="text-[10px] font-mono font-bold shrink-0" style={{ color: a.color }}>{a.time}</span>
                              </div>
                              <span className="text-[10px] text-[#564339] flex items-center gap-1 mt-0.5">
                                <MS name="location_on" cls="text-[11px]" />
                                {a.place}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Protocol Tab */}
                  {activeTab === 'protocol' && (
                    <div className="space-y-3">
                      <h3 className="text-[14px] font-bold text-[#1c1c19]" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Darshan Protocol 2027
                      </h3>
                      {[
                        {
                          title: 'Shahi Snan Days',
                          body: 'On Parva Snan dates, all temple queues extend 2–3x. Arrive 3+ hours before preferred aarti.',
                          icon: 'warning',
                          cls: 'text-[#e65100]',
                          bg: 'bg-[#fff3e0]',
                        },
                        {
                          title: 'Security Protocol',
                          body: 'Bags, electronics, and leather items not permitted inside sanctum. Free cloak rooms available.',
                          icon: 'security',
                          cls: 'text-[#3e6374]',
                          bg: 'bg-[#e1f5fe]',
                        },
                        {
                          title: 'VIP / Disabled Access',
                          body: 'Priority passes for senior citizens, pregnant women, and differently-abled devotees at authority booths.',
                          icon: 'accessibility_new',
                          cls: 'text-[#2e7d32]',
                          bg: 'bg-[#e8f5e9]',
                        },
                        {
                          title: 'Prasad & Offerings',
                          body: 'Only flowers, coconut, fruits accepted. No plastic, synthetic garlands or polyethylene bags.',
                          icon: 'spa',
                          cls: 'text-[#7b1fa2]',
                          bg: 'bg-[#f3e5f5]',
                        },
                      ].map((p, i) => (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${p.bg}`}>
                          <MS name={p.icon} cls={`text-[20px] ${p.cls} shrink-0 mt-0.5`} />
                          <div>
                            <span className="text-[12px] font-bold text-[#1c1c19] block mb-0.5">{p.title}</span>
                            <p className="text-[11px] text-[#564339] leading-relaxed">{p.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Helpline Card */}
              <div className="hidden md:block bg-gradient-to-br from-[#984300] to-[#773300] rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <MS name="support_agent" cls="text-[24px] text-[#ffdea5]" />
                  <h3 className="text-[15px] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Darshan Helpdesk
                  </h3>
                </div>
                <p className="text-[12px] text-white/80 mb-4 leading-relaxed">
                  Our devotee support team is available 24×7 during Simhastha Kumbh to assist with temple access, e-passes, and senior pilgrim services.
                </p>
                <a
                  href="tel:18002027000"
                  className="w-full flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold py-2.5 rounded-xl text-[13px] transition-colors"
                >
                  <MS name="call" cls="text-[18px] text-[#ffdea5]" />
                  1800-2027-00 (Toll Free)
                </a>
              </div>

              {/* Quick Links */}
              <div className="hidden md:block bg-white rounded-2xl border border-[#e5e2dd] shadow-sm p-4">
                <h3 className="text-[14px] font-bold text-[#1c1c19] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Quick Access</h3>
                <div className="space-y-2">
                  {[
                    { icon: 'map', label: 'Interactive Ghat Map', href: '/map', cls: 'text-[#3e6374]', bg: 'bg-[#bee5fa]/40' },
                    { icon: 'directions_bus', label: 'Temple Shuttle Routes', href: '#', cls: 'text-[#755717]', bg: 'bg-[#ffdea5]/40' },
                    { icon: 'download', label: 'Darshan PDF Guide', href: '#', cls: 'text-[#2e7d32]', bg: 'bg-[#e8f5e9]/60' },
                    { icon: 'emergency', label: 'Emergency & SOS', href: 'tel:112', cls: 'text-[#ba1a1a]', bg: 'bg-[#ffdad6]/60' },
                  ].map(l => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f6f3ee] transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg ${l.bg} flex items-center justify-center ${l.cls}`}>
                        <MS name={l.icon} cls="text-[18px]" />
                      </div>
                      <span className="text-[13px] font-medium text-[#1c1c19] group-hover:text-[#984300] transition-colors">{l.label}</span>
                      <MS name="chevron_right" cls="text-[16px] text-[#564339] ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Aarti Highlights Row ─────────────────────────── */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#984300] font-bold">Daily Sacred Rituals</span>
                <h2 className="text-[22px] font-semibold text-[#1c1c19]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Signature Aarti & Ceremonies
                </h2>
              </div>
              <button className="text-[12px] text-[#984300] font-bold hover:underline flex items-center gap-0.5">
                Full Schedule <MS name="chevron_right" cls="text-[16px]" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  time: '04:15 AM',
                  name: 'Brahma Muhurta Aarti',
                  place: 'Ram Kund, Godavari Ghat',
                  desc: 'The most sacred aarti of the day during Brahma Muhurta with floating oil lamps and Vedic chanting by Purohit Sangh.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe2iU1zFe4tdmgsvTfcRSQBTr1n1LMElnSCQgtUqYKoEN2-FZZ_D4q0rZ1KsKcP4t9Bh99orMw8kbVs8FvpCGg1v6BgEVGioyOLQ21pLM0Qfmia2_6g6UhEviVTbUA2Ft5lEZYcbTJFwBMXK3R3w9Vh0UyeciSWTHOjath1Mb3KmTLDMs3NQyw2hnwRzdSxo-EUNH0Ak6PPDlUODzC8cBWamuj1WiiiOEQ2HnpL6rqlISbytNDlrz5g',
                  crowd: 'Low Crowd',
                  crowdCls: 'bg-[#e8f5e9] text-[#2e7d32]',
                  color: '#FF5722',
                },
                {
                  time: '06:45 PM',
                  name: 'Godavari Maha Aarti',
                  place: 'Ram Kund Ghat',
                  desc: 'Grand evening aarti with 108 diyas, conch shells, and coordinated Vedic hymns. Iconic Simhastha ritual watched by thousands.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sXpDjmuwPtmIfzcD6BQW9ixUKQgcDJINrAP6EJKQLKw4wliezr3kTEQMX7w7pRga8IF7n6WRRIHGCt7mO4tVrwVLWxCWLdJPu0j-cKJAcAiilbSD4lOHjizgJsJfMwK_edX3vICEEWJbR_v5Vpva9thFgk1jWlIWEEVXU43EsGbwzN0LAV0OIYMx9utwf0JQAwxW-TMDtg9-j1-15kc5kRu58VJ58uf4GPQZxd1HSKJQ2nWIbxyreQ',
                  crowd: 'Very High Crowd',
                  crowdCls: 'bg-[#ffdad6] text-[#ba1a1a]',
                  color: '#E65100',
                },
                {
                  time: '11:00 AM',
                  name: 'Mahapooja & Rudrabhishek',
                  place: 'Trimbakeshwar Jyotirlinga',
                  desc: 'Sacred ritual including Rudrabhishek and Vedic homas, performed exclusively by trained Trimbakeshwar priests.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg',
                  crowd: 'Moderate Crowd',
                  crowdCls: 'bg-[#fff3e0] text-[#e65100]',
                  color: '#7B1FA2',
                },
              ].map((aarti, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-[#e5e2dd] shadow-sm hover:shadow-lg hover:border-[#984300]/30 transition-all duration-300 cursor-pointer">
                  <div className="relative h-40 overflow-hidden">
                    <img src={aarti.img} alt={aarti.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <span className="text-[18px] font-bold text-white" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
                        {aarti.time}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${aarti.crowdCls} bg-white/90`}>
                        {aarti.crowd}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: aarti.color }} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-semibold text-[#1c1c19] leading-snug mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {aarti.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#984300] font-medium mb-2">
                      <MS name="location_on" cls="text-[13px]" />
                      <span>{aarti.place}</span>
                    </div>
                    <p className="text-[12px] text-[#564339] leading-relaxed line-clamp-2">{aarti.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Trust Banner ─────────────────────────────────── */}
          <div className="mt-10 bg-gradient-to-r from-[#1c1c19] to-[#31302d] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#984300]/20 flex items-center justify-center shrink-0">
                <MS name="verified_user" cls="text-[30px] text-[#e9c176]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#e9c176] font-bold block">Official Source</span>
                <h3 className="text-[18px] font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Verified by Nashik-Trimbakeshwar Simhastha Kumbh Authority
                </h3>
                <p className="text-[12px] text-white/60 mt-0.5">
                  All darshan timings, crowd data & protocols updated in real-time via District Administration feeds.
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/map" className="bg-[#984300] hover:bg-[#ba5814] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold transition-colors flex items-center gap-1.5">
                <MS name="map" cls="text-[17px]" />
                Open Live Map
              </Link>
              <Link href="/" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-[13px] font-bold transition-colors flex items-center gap-1.5">
                <MS name="home" cls="text-[17px]" />
                Home
              </Link>
            </div>
          </div>
        </main>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="w-full bg-[#31302d] text-[#f3f0eb] mt-6">
          <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Kumbh Logo" className="h-8 w-auto object-contain brightness-200" />
              <span className="text-[14px] text-[#ffb68e] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Nashik Kumbh Mela 2027</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#e5e2dd]">
              <span>Kumbh Helpline: <strong className="text-[#ffb68e]">1800-2027-00</strong></span>
              <span>• Police: <strong className="text-[#ffb68e]">112</strong></span>
              <span>• Ambulance: <strong className="text-[#ffb68e]">108</strong></span>
            </div>
            <span className="text-[11px] text-[#e5e2dd]">© 2027 Kumbh Authority. Official Portal.</span>
          </div>
        </footer>
        <MobileBottomNav active="darshan" />
      </div>
    </>
  );
}
