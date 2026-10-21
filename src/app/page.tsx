'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import MobileCarousel from '../components/MobileCarousel';
import { Topbar, Navbar } from '@/components/Navbar';
import { MobileBottomNav } from '@/components/MobileBottomNav';

/* ─── Tiny helpers ─────────────────────────────────────────────── */
const MS = ({ name, cls = '' }: { name: string; cls?: string }) => (
  <span className={`material-symbols-outlined ${cls}`}>{name}</span>
);

const CROWD_COLOR: Record<string, string> = {
  'Very High': 'text-red-600',
  High: 'text-orange-500',
  Moderate: 'text-amber-600',
  Low: 'text-green-600',
};

/* ─── DATA ──────────────────────────────────────────────────────── */
const SACRED_SITES = [
  {
    id: 's1',
    badge: 'Jyotirlinga Shrine',
    badgeCls: 'text-[#755717]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg',
    info1: '28 km from Nashik Central',
    info2: 'Kushavarta Kund Origin',
    info2Cls: 'text-[#984300]',
    title: 'Trimbakeshwar Jyotirlinga',
    desc: 'One of the twelve sacred Jyotirlingas where Brahma, Vishnu, and Shiva reside together. Origin point of the holy river Godavari.',
    extra: 'Aarti: 05:30 AM / 07:00 PM',
    wait: '~75 Mins',
    waitIcon: 'schedule',
    link: 'Darshan Guide',
  },
  {
    id: 's2',
    badge: 'Prime Snan Kund',
    badgeCls: 'text-[#984300]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe2iU1zFe4tdmgsvTfcRSQBTr1n1LMElnSCQgtUqYKoEN2-FZZ_D4q0rZ1KsKcP4t9Bh99orMw8kbVs8FvpCGg1v6BgEVGioyOLQ21pLM0Qfmia2_6g6UhEviVTbUA2Ft5lEZYcbTJFwBMXK3R3w9Vh0UyeciSWTHOjath1Mb3KmTLDMs3NQyw2hnwRzdSxo-EUNH0Ak6PPDlUODzC8cBWamuj1WiiiOEQ2HnpL6rqlISbytNDlrz5g',
    info1: 'Panchavati Heritage Zone',
    info2: 'Shahi Snan Ghat #1',
    info2Cls: 'text-[#3e6374]',
    title: 'Ram Kund & Godavari Ghat',
    desc: 'The most sanctified bathing pond where Lord Rama bathed and performed shraddha rituals. Epicenter of Simhastha Shahi Snan.',
    extra: 'Maha Aarti: 06:45 PM Daily',
    wait: 'Water Depth: 4.5 ft',
    waitIcon: 'water_drop',
    link: 'Ghat Protocol',
  },
  {
    id: 's3',
    badge: 'Ramayana Epic Site',
    badgeCls: 'text-[#3e6374]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sXpDjmuwPtmIfzcD6BQW9ixUKQgcDJINrAP6EJKQLKw4wliezr3kTEQMX7w7pRga8IF7n6WRRIHGCt7mO4tVrwVLWxCWLdJPu0j-cKJAcAiilbSD4lOHjizgJsJfMwK_edX3vICEEWJbR_v5Vpva9thFgk1jWlIWEEVXU43EsGbwzN0LAV0OIYMx9utwf0JQAwxW-TMDtg9-j1-15kc5kRu58VJ58uf4GPQZxd1HSKJQ2nWIbxyreQ',
    info1: '0.8 km from Ram Kund',
    info2: '5 Sacred Banyan Trees',
    info2Cls: 'text-[#755717]',
    title: 'Panchavati & Sita Gufa',
    desc: 'The revered hermitage where Lord Rama, Sita, and Lakshmana stayed during their 14-year exile. Features historic cave sanctum.',
    extra: 'Visiting: 06:00 AM – 09:00 PM',
    wait: '~25 Mins',
    waitIcon: 'timer',
    link: 'Visitor Info',
  },
  {
    id: 's4',
    badge: '1792 CE Black Stone',
    badgeCls: 'text-[#755717]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMf7cw1FidMnJUlDTy5cMnPRtnQYSO7YTDs013uMW1LKEyRr8TRDkG5HtthE5pXyuAGeq19CXSld7XHQxIEOvyU0bFeEUbZK0mSmAD5cI_GDv-jNlQmvp2Rrjace7lkhfAePENFKb5fBzwgc4suzOkiNEd37aTmVaCAT22OHVL9zPbWlpT16xuafmmvCNK6jMO_0QPnl4GMVJKFVWN4J9_E60ehjZV0cHi4v2eYeWtNmXZdsWwJSelQ',
    info1: '0.5 km from Panchavati',
    info2: 'Lord Rama Murti in Black Basalt',
    info2Cls: 'text-[#984300]',
    title: 'Shree Kalaram Mandir',
    desc: 'Celebrated architectural marvel built entirely of black stone by Sardar Rangrao Odhekar. Deeply sacred center of devotional bhakti.',
    extra: 'Kakad Aarti: 05:00 AM',
    wait: '~40 Mins',
    waitIcon: 'group',
    link: 'Darshan Timings',
  },
  {
    id: 's5',
    badge: 'Unique Temple Without Nandi',
    badgeCls: 'text-[#3e6374]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlG1XW6Qi5I3k9AXm3JgxXCi04uXpNvhLRmD8E1U7Kj6kTbRYboN0RtKbgac5w4QbjKRvh0_DhxklD2OTf838faCggwSW6Bx_rUBxeqT1XICCcuRMUaxJKSUQlLn8NAkvWbmhigPupTgTK7eP-Ju-DbZ8yIxp0Mqr7EA-XNZVkkjGNYgJHcfUrFEuQS2xcLu8_LUFGt4qLGPd8ft6X8QwhYMblr-HSnUc_E5GGwHRMxmKa1aOJbSSXCg',
    info1: 'Opposite Ram Kund',
    info2: 'Panchamrit Abhishek',
    info2Cls: 'text-[#3e6374]',
    title: 'Kapaleshwar Mahadev',
    desc: 'A rare Shiva temple where Nandi is absent because Lord Shiva accepted Nandi as his Guru here to absolve a Brahma-hatya dosha.',
    extra: 'Darshan: Open 05:00 AM – 10:00 PM',
    wait: '~15 Mins',
    waitIcon: 'timer',
    link: 'Explore History',
  },
  {
    id: 's6',
    badge: 'Serene Godavari Snan',
    badgeCls: 'text-[#984300]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7VH7ZTIw_ECpQt006uUQC4Gu0SIEBorGzClP0_yFQazxbsDbs9wrQjxXfxa9A1zi0DToHgA0j1YWQ22YmuPcIO7qzNXgKcGqUcda2CLYpoOhfsCBSXZVs3M49OiyK5OeJWQCGk6QW5EFuS20E-WPh6sckfiSDQzRw6XM5IjerjA6dpLgX5qfPGerM9dTxjeTNBhlPSe0lX7_PzhQoghv1yRa9gRA2IUefZ1DxzY8EBzDnTrDPvB1pCw',
    info1: '7.5 km upstream from Ram Kund',
    info2: 'Dudhsagar Waterfall',
    info2Cls: 'text-[#755717]',
    title: 'Someshwar & Ghats',
    desc: 'Idyllic riverbank dedicated to Lord Someshwar. Recommended for peaceful family rituals, holy dips, and senior citizen visits.',
    extra: 'Shuttle: Green Route #4 Every 10m',
    wait: 'Less Crowded Snan Option',
    waitIcon: 'nature_people',
    link: 'Route Details',
  },
];

const NEAR_ME_ITEMS = [
  {
    id: 'nm1', cat: 'food', badge: 'Free Annadan', badgeBg: 'bg-[#ba5d1a]', badgeIcon: 'restaurant',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtPoyfL92rWIDz-c3jFvW59u2XwX0OQo5q8XmYcT3G9u_L_x3P8-K80R0mI2JvQ3H95S8l4R2Kx_bU6_Z830gG1zQy6s_tQ0tQ4x1p_U0lXq9-Dqf5w5I_Xk0H1rJ8G6Q4R5W1R-Fz4lJ3uK8zQ1_y9Z4O6H2N1L8kQ9P2X4Y8W3M4R7C0L6B5N8T1Y9_Q4U',
    distLabel: '0.1 km • Free', crowdLabel: 'Moderate Crowd', crowdDot: 'bg-amber-400', crowdBg: 'bg-[#ba5d1a]',
    category: 'ANNADAN / BHANDARA', catColor: 'text-[#ba5d1a]', title: 'Shree Mahavir Annadan',
    time: '07:00 AM – 10:00 PM', desc: 'Hot satvik khichdi & mahaprasad served daily for all devotees at Ram Kund Gate.'
  },
  {
    id: 'nm2', cat: 'toilet', badge: 'Clean Toilets', badgeBg: 'bg-[#3e6374]', badgeIcon: 'wc',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjZtF_Q9yY5bM3I8vL8rJ6aT5uK0xH6sV2P9cN3G0bQ1X4fD8mB7vH5cT4kP9wZ2nJ8sL1mR7uY4lF1eI6xQ3G9_tX5P8Z4uY9vB7wV2cM1T0nL6qR3F9kJ2eH5mC8xT1_F7B4R0Q9N6W3H2K1M8T5_4z',
    distLabel: '0.2 km • Free', crowdLabel: 'Low Crowd', crowdDot: 'bg-green-400', crowdBg: 'bg-[#3e6374]',
    category: 'SANITATION BLOCK', catColor: 'text-[#3e6374]', title: 'Ram Kund Public Toilet',
    time: '24 Hours (Continuous)', desc: 'Modern Western and Indian style facilities with continuous cleaning and maintenance.'
  },
  {
    id: 'nm3', cat: 'water', badge: 'RO Water', badgeBg: 'bg-[#0369a1]', badgeIcon: 'water_drop',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg',
    distLabel: '0.3 km • Free', crowdLabel: 'Low Crowd', crowdDot: 'bg-green-400', crowdBg: 'bg-[#0369a1]',
    category: 'DRINKING WATER', catColor: 'text-[#0369a1]', title: 'RO Water Stall',
    time: '24 Hours', desc: 'Chilled RO filtered drinking water available free for all pilgrims.'
  },
  {
    id: 'nm4', cat: 'medical', badge: 'Medical Camp', badgeBg: 'bg-[#be123c]', badgeIcon: 'local_hospital',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe2iU1zFe4tdmgsvTfcRSQBTr1n1LMElnSCQgtUqYKoEN2-FZZ_D4q0rZ1KsKcP4t9Bh99orMw8kbVs8FvpCGg1v6BgEVGioyOLQ21pLM0Qfmia2_6g6UhEviVTbUA2Ft5lEZYcbTJFwBMXK3R3w9Vh0UyeciSWTHOjath1Mb3KmTLDMs3NQyw2hnwRzdSxo-EUNH0Ak6PPDlUODzC8cBWamuj1WiiiOEQ2HnpL6rqlISbytNDlrz5g',
    distLabel: '0.4 km • Free', crowdLabel: 'Moderate Crowd', crowdDot: 'bg-amber-400', crowdBg: 'bg-[#be123c]',
    category: 'EMERGENCY & FIRST AID', catColor: 'text-[#be123c]', title: 'Field Medical Tent 2',
    time: '24 Hours', desc: 'First aid, generic medicines, and ambulance standby for emergencies.'
  },
  {
    id: 'nm5', cat: 'police', badge: 'Police Booth', badgeBg: 'bg-[#1d4ed8]', badgeIcon: 'local_police',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sXpDjmuwPtmIfzcD6BQW9ixUKQgcDJINrAP6EJKQLKw4wliezr3kTEQMX7w7pRga8IF7n6WRRIHGCt7mO4tVrwVLWxCWLdJPu0j-cKJAcAiilbSD4lOHjizgJsJfMwK_edX3vICEEWJbR_v5Vpva9thFgk1jWlIWEEVXU43EsGbwzN0LAV0OIYMx9utwf0JQAwxW-TMDtg9-j1-15kc5kRu58VJ58uf4GPQZxd1HSKJQ2nWIbxyreQ',
    distLabel: '0.3 km • Free', crowdLabel: 'Low Crowd', crowdDot: 'bg-green-400', crowdBg: 'bg-[#1d4ed8]',
    category: 'SECURITY & HELP', catColor: 'text-[#1d4ed8]', title: 'Godavari Ghat Police',
    time: '24 Hours', desc: 'Police assistance centre for lost and found, crowd management, and safety.'
  },
  {
    id: 'nm6', cat: 'parking', badge: 'EV Shuttle', badgeBg: 'bg-[#047857]', badgeIcon: 'local_parking',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMf7cw1FidMnJUlDTy5cMnPRtnQYSO7YTDs013uMW1LKEyRr8TRDkG5HtthE5pXyuAGeq19CXSld7XHQxIEOvyU0bFeEUbZK0mSmAD5cI_GDv-jNlQmvp2Rrjace7lkhfAePENFKb5fBzwgc4suzOkiNEd37aTmVaCAT22OHVL9zPbWlpT16xuafmmvCNK6jMO_0QPnl4GMVJKFVWN4J9_E60ehjZV0cHi4v2eYeWtNmXZdsWwJSelQ',
    distLabel: '1.1 km • Free', crowdLabel: 'Low Crowd', crowdDot: 'bg-green-400', crowdBg: 'bg-[#047857]',
    category: 'PARKING / SHUTTLE DROP', catColor: 'text-[#047857]', title: 'Outer Ring Depot P4',
    time: '06:00 AM – 10:00 PM', desc: 'Free EV shuttle drop point for devotees coming from the outer ring parking.'
  },
  {
    id: 'nm7', cat: 'help', badge: 'Help Centre', badgeBg: 'bg-[#b45309]', badgeIcon: 'support_agent',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtPoyfL92rWIDz-c3jFvW59u2XwX0OQo5q8XmYcT3G9u_L_x3P8-K80R0mI2JvQ3H95S8l4R2Kx_bU6_Z830gG1zQy6s_tQ0tQ4x1p_U0lXq9-Dqf5w5I_Xk0H1rJ8G6Q4R5W1R-Fz4lJ3uK8zQ1_y9Z4O6H2N1L8kQ9P2X4Y8W3M4R7C0L6B5N8T1Y9_Q4U',
    distLabel: '0.5 km • Free', crowdLabel: 'Low Crowd', crowdDot: 'bg-green-400', crowdBg: 'bg-[#b45309]',
    category: 'PILGRIM ASSISTANCE', catColor: 'text-[#b45309]', title: 'Central Help Tower',
    time: '24 Hours', desc: 'Multilingual help desk for directions, inquiries, and emergency coordination.'
  },
  {
    id: 'nm8', cat: 'senior', badge: 'Wheelchair', badgeBg: 'bg-[#6d28d9]', badgeIcon: 'accessible',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjZtF_Q9yY5bM3I8vL8rJ6aT5uK0xH6sV2P9cN3G0bQ1X4fD8mB7vH5cT4kP9wZ2nJ8sL1mR7uY4lF1eI6xQ3G9_tX5P8Z4uY9vB7wV2cM1T0nL6qR3F9kJ2eH5mC8xT1_F7B4R0Q9N6W3H2K1M8T5_4z',
    distLabel: '0.8 km • Free', crowdLabel: 'Low Crowd', crowdDot: 'bg-green-400', crowdBg: 'bg-[#6d28d9]',
    category: 'SENIOR CITIZEN AID', catColor: 'text-[#6d28d9]', title: 'Wheelchair Cart Stand',
    time: '06:00 AM – 09:00 PM', desc: 'Wheelchairs and golf-carts available for senior citizens and differently-abled devotees.'
  },
];

const NM_CATS = [
  { id: 'all',     label: 'All Essentials', icon: 'my_location' },
  { id: 'food',    label: 'Free Food',      icon: 'restaurant'  },
  { id: 'toilet',  label: 'Toilets',        icon: 'wc'          },
  { id: 'water',   label: 'Water',          icon: 'water_drop'  },
  { id: 'medical', label: 'Medical',        icon: 'local_hospital' },
  { id: 'police',  label: 'Police',         icon: 'local_police' },
  { id: 'parking', label: 'Parking',        icon: 'local_parking' },
  { id: 'help',    label: 'Help Centre',    icon: 'support_agent' },
  { id: 'senior',  label: 'Wheelchair',     icon: 'accessible'  },
];



/* ─── COMPONENT: Hero ───────────────────────────────────────────── */
function Hero({ onPlanTrip }: { onPlanTrip: () => void }) {
  const [slide, setSlide] = React.useState(0);
  const slides = ['/banner.jpg', '/banner.jpg', '/banner.jpg', '/banner.jpg'];
  const total = slides.length;

  return (
    <>
      {/* ── MOBILE BANNER (Matching reference screenshot design) ── */}
      <section className="md:hidden relative w-full overflow-hidden bg-[#1c1c19]" style={{ minHeight: '340px', height: '100vw', maxHeight: '440px' }}>
        {/* Slides */}
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${slide * 100}%)`,
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            width: `${total * 100}%`,
          }}
        >
          {slides.map((src, i) => (
            <div key={i} className="relative h-full" style={{ width: `${100 / total}%` }}>
              <img src={src} alt="Nashik Kumbh 2027" className="w-full h-full object-cover" />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
            </div>
          ))}
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-10 pt-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full mb-3 self-start">
            <span className="material-symbols-outlined text-[13px] text-white">location_on</span>
            <span className="text-[10px] uppercase tracking-wider text-white font-bold">SIMHASTHA KUMBH MELA 2027</span>
          </div>

          {/* Headline */}
          <h1
            className="text-[28px] sm:text-[34px] leading-[1.1] font-semibold text-white drop-shadow-md"
            style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 18px rgba(0,0,0,0.6)' }}
          >
            Your Complete<br />
            <em className="not-italic italic font-normal text-[#ffb68e]">Kumbh Companion.</em>
          </h1>

          {/* Subtitle */}
          <p className="text-[12px] text-white/90 font-medium mt-2 max-w-[320px] leading-relaxed drop-shadow">
            Plan your darshan, stay, food, travel and Kumbh experience in one place.
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 mt-3.5">
            <button
              onClick={onPlanTrip}
              className="bg-[#ba5814] hover:bg-[#984300] text-white px-4 py-2.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
            >
              <MS name="explore" cls="text-[16px]" />
              <span>Plan My Trip</span>
              <MS name="arrow_forward" cls="text-[14px]" />
            </button>
            <Link
              href="/map"
              className="bg-white/15 backdrop-blur-md border border-white/40 text-white px-4 py-2.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
            >
              <MS name="map" cls="text-[16px]" />
              <span>Explore Map</span>
              <MS name="arrow_forward" cls="text-[14px]" />
            </Link>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-1.5 mt-4 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === slide ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── SMOOTH MERGE EFFECT (Wave SVG curve at bottom fading into Quick Access background) ── */}
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-9 sm:h-14 fill-[#fcf9f4]">
            <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* ── DESKTOP HERO ── */}
      <section className="hidden md:flex relative w-full min-h-[580px] lg:h-[650px] items-start overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/banner.jpg')", backgroundPosition: 'center 30%' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-[#fcf9f4]" />

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-4 lg:left-8 flex items-center z-20">
          <button className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all">
            <MS name="chevron_left" cls="text-[32px]" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 lg:right-8 flex items-center z-20">
          <button className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all">
            <MS name="chevron_right" cls="text-[32px]" />
          </button>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-12 flex flex-col justify-between">
          <div className="max-w-3xl space-y-4 flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb68e] animate-soft-pulse" />
              <span className="text-[12px] uppercase tracking-wider text-white font-bold">Simhastha Kumbh Mela 2027 • Nashik &amp; Trimbakeshwar</span>
              <span className="text-white/40 text-[11px]">|</span>
              <span className="text-[11px] text-white/80 font-medium">Sacred Godavari Snan Parva</span>
            </div>

            {/* Headline */}
            <h1
              className="text-[48px] sm:text-[60px] lg:text-[68px] leading-[1.05] tracking-[-0.025em] font-semibold text-white drop-shadow-lg"
              style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
            >
              Your Complete<br />
              <em className="not-italic italic font-normal" style={{ color: '#ffb68e' }}>Kumbh Companion.</em>
            </h1>

            <p className="text-[16px] sm:text-[18px] leading-[28px] text-white/90 max-w-xl font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
              Plan sacred darshan, verified ashram stays, mahaprasad, live ghat crowd guidance &amp; emergency assistance — all in one trusted portal.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/get-connected"
                className="bg-[#ffb68e] hover:bg-[#ffc5a5] text-[#3c1e05] px-6 py-3.5 rounded-xl text-[15px] font-bold transition-all flex items-center gap-2 shadow-lg hover:scale-105"
              >
                <MS name="groups" cls="text-[20px] text-[#984300]" />
                <span>Get Connected (Live Tracker)</span>
              </Link>
              <Link
                href="/map"
                className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 rounded-xl text-[15px] font-semibold transition-all flex items-center gap-2"
              >
                <MS name="distance" cls="text-[20px] text-[#ffb68e]" />
                <span>Live Ghat Map</span>
              </Link>
              <a
                href="tel:112"
                className="bg-[#ba1a1a]/90 hover:bg-[#ba1a1a] text-white px-5 py-3.5 rounded-xl text-[15px] font-bold transition-all flex items-center gap-2 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-soft-pulse" />
                <span>SOS 112</span>
              </a>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-2 text-white/70 text-[12px] pt-1">
              <MS name="verified_user" cls="text-[16px] text-[#e9c176]" />
              <span>100% Official — Nashik District Administration &amp; Kumbh Mela Authority Verified Portal</span>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8 lg:mt-16 pb-4 z-20">
            <span className="w-8 h-2 rounded-full bg-[#ffb68e]" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </div>
      </section>
    </>
  );
}


/* ─── COMPONENT: Quick Access ───────────────────────────────────── */
function QuickAccess() {
  const desktopTiles = [
    { icon: 'groups',          label: 'Get Connected',        sub: 'Family Live GPS Tracker',   bg: 'bg-[#ffeedb]',   ic: 'text-[#984300]', labelCls: 'text-[#984300] font-bold', href: '/get-connected' },
    { icon: 'temple_hindu',    label: 'Darshan & Temples',    sub: '14 Sacred Shrines',         bg: 'bg-[#ffdbca]',   ic: 'text-[#984300]', href: '/darshan' },
    { icon: 'hotel',           label: 'Stays & Ashrams',      sub: 'Verified Bhakt Niwas',      bg: 'bg-[#c1e8fc]',   ic: 'text-[#3e6374]', href: '/stay' },
    { icon: 'restaurant',      label: 'Pure Veg & Bhojan',    sub: 'Maharashtrian Satvik',      bg: 'bg-[#ffdea5]',   ic: 'text-[#755717]', href: '/food' },
    { icon: 'soup_kitchen',    label: 'Annadan & Bhandara',   sub: 'Free Daily Meals',          bg: 'bg-[#ffb68e]/40', ic: 'text-[#ba5814]', href: '/annadan' },
    { icon: 'cabin',           label: 'Camps & Akhadas',      sub: 'Sadhu Grams & Pravachan',   bg: 'bg-[#e5e2dd]',   ic: 'text-[#564339]', href: '/camps' },
    { icon: 'map',             label: 'Smart Ghat Map',        sub: 'Live Density & Routes',     bg: 'bg-[#a5cce0]/40', ic: 'text-[#3e6374]', href: '/map' },
    { icon: 'emergency',       label: 'Emergency & SOS',      sub: 'Command & Medical',         bg: 'bg-[#ffdad6]',   ic: 'text-[#ba1a1a]', labelCls: 'text-[#ba1a1a]', href: '/emergency' },
  ];

  const mobileTiles = [
    { icon: 'groups',              label: 'Get\nConnected',         bg: 'bg-[#fff3e0]', ic: 'text-[#984300]', href: '/get-connected' },
    { icon: 'temple_hindu',        label: 'Darshan &\nTemples',     bg: 'bg-[#ffeee0]', ic: 'text-[#984300]', href: '/darshan' },
    { icon: 'bed',                 label: 'Stays',                  bg: 'bg-[#e3f2fd]', ic: 'text-[#1565c0]', href: '/stay' },
    { icon: 'restaurant',          label: 'Food &\nRestaurants',    bg: 'bg-[#fff8e1]', ic: 'text-[#b78103]', href: '/food' },
    { icon: 'rice_bowl',           label: 'Annadan',                bg: 'bg-[#ffebee]', ic: 'text-[#c62828]', href: '/annadan' },
    { icon: 'forest',              label: 'Camps &\nAkhadas',       bg: 'bg-[#e8f5e9]', ic: 'text-[#2e7d32]', href: '/camps' },
    { icon: 'distance',            label: 'Smart Map',              bg: 'bg-[#f3e5f5]', ic: 'text-[#7b1fa2]', href: '/map' },
    { icon: 'health_and_safety',   label: 'Emergency',              bg: 'bg-[#ffebee]', ic: 'text-[#c62828]', href: '/emergency' },
  ];

  return (
    <section className="relative z-30 w-full max-w-[1440px] mx-auto md:px-6 lg:px-12 md:-mt-20 lg:-mt-28 mb-6 md:mb-10">
      {/* ── MOBILE QUICK ACCESS (Matching reference design) ── */}
      <div className="md:hidden px-3 pt-2 pb-4">
        {/* Centered header with gold lines */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-9 bg-[#c59a68]/50" />
          <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#755717]">QUICK ACCESS</span>
          <div className="h-[1px] w-9 bg-[#c59a68]/50" />
        </div>

        {/* 4 columns x 2 rows grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {mobileTiles.map(t => (
            <Link
              key={t.label}
              href={t.href}
              className="bg-white rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#f0ece5] active:scale-95 transition-transform min-h-[96px]"
            >
              <div className={`w-11 h-11 rounded-2xl ${t.bg} flex items-center justify-center mb-1.5 shadow-sm`}>
                <MS name={t.icon} cls={`text-[22px] ${t.ic}`} />
              </div>
              <span className="text-[10.5px] font-bold text-[#2d2521] leading-tight text-center whitespace-pre-line">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── DESKTOP QUICK ACCESS ── */}
      <div className="hidden md:block md:bg-white/95 md:backdrop-blur-xl md:rounded-2xl md:p-6 lg:p-8 md:shadow-[0_20px_50px_rgba(28,26,23,0.12)] md:border md:border-white/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-6 gap-2 px-4 md:px-0 pt-5 md:pt-0">
          <div>
            <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-[#984300] font-semibold">Devotee Services Directory</span>
            <h2 className="text-[20px] md:text-[28px] md:leading-[36px] font-semibold text-[#1c1c19] mt-0.5 md:mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>Quick Access</h2>
          </div>
          <p className="hidden md:block text-[13px] text-[#564339] max-w-md">
            Direct access to verified logistical and spiritual touchpoints endorsed by the Simhastha Kumbh Mela Authority.
          </p>
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 px-3 md:px-0">
          {desktopTiles.map(t => (
            <Link
              key={t.icon}
              href={t.href}
              className="group bg-white transition-all duration-200 p-2 sm:p-3 rounded-xl flex flex-col items-center justify-center text-center border border-[#e5e2dd]/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-[#984300]/30 min-h-[85px] sm:min-h-[100px]"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${t.bg} flex items-center justify-center ${t.ic} group-hover:scale-105 transition-transform mb-1.5 sm:mb-2`}>
                <MS name={t.icon} cls="text-[20px] sm:text-[22px]" />
              </div>
              <h3 className={`text-[10px] sm:text-[13px] font-semibold ${t.labelCls || 'text-[#0e274a]'}`}>{t.label.split(' & ')[0]}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: Today at Kumbh ─────────────────────────────────── */
function TodayAtKumbh() {
  const programmes = [
    {
      timeStart: '04:15 AM',
      timeEnd: '05:50 AM',
      title: 'Godavari Maha Aarti at Ram Kund',
      desc: 'Traditional early morning aarti at the Sacred Ram Kund with Vedic chants and rituals.',
      tag: 'Aarti',
      tagCls: 'bg-[#FFF3E0] text-[#E65100]',
      iconBg: 'bg-[#FFF3E0]',
      iconCls: 'text-[#E65100]',
      iconName: 'temple_hindu',
      loc1: 'Dashashwamedh Ghat',
      loc2: 'Sankat Mochan, Aundh',
    },
    {
      timeStart: '06:15 AM',
      timeEnd: '07:15 AM',
      title: 'Juni Akhada Sacred Shobha Yatra',
      desc: 'Grand ceremonial procession of Naga Sadhus and Mahamandaleshwar with divine chants from Tapovan towards Panchavati.',
      tag: 'Procession',
      tagCls: 'bg-[#E8F5E9] text-[#2E7D32]',
      iconBg: 'bg-[#E8F5E9]',
      iconCls: 'text-[#2E7D32]',
      iconName: 'spa',
      loc1: 'Tapovan – Godavari Marg',
      loc2: 'Dindayal Vardig Galleria',
    },
    {
      timeStart: '08:10 AM',
      timeEnd: '10:00 AM',
      title: 'Trimbakeshwar Mahapooja & Rudrabhishek',
      desc: 'Sacred rituals including Abhishek, Rudrabhishek and Vedic homas at the Trimbakeshwar Temple.',
      tag: 'Pooja',
      tagCls: 'bg-[#F3E5F5] text-[#7B1FA2]',
      iconBg: 'bg-[#F3E5F5]',
      iconCls: 'text-[#7B1FA2]',
      iconName: 'cleaning_services',
      loc1: 'Ghat Road Ring Road',
      loc2: 'Priority Service Queue Open',
    },
    {
      timeStart: '12:00 PM',
      timeEnd: '01:00 PM',
      title: 'Maha Aarti at Tapovan',
      desc: 'Coordinated Maha Aarti with Vedic chanting and collective prayers by saints and devotees.',
      tag: 'Aarti',
      tagCls: 'bg-[#E1F5FE] text-[#0288D1]',
      iconBg: 'bg-[#E1F5FE]',
      iconCls: 'text-[#0288D1]',
      iconName: 'groups',
      loc1: 'Riverside, Tapovan',
      loc2: '50000 Devotees Capacity',
    },
    {
      timeStart: '06:45 PM',
      timeEnd: '08:30 PM',
      title: 'Ganga-Godavari Deepotsav (10,008 Diyas)',
      desc: 'A divine evening with illumination of 10,008 diyas along the riverbank with spiritual chants.',
      tag: 'Deepotsav',
      tagCls: 'bg-[#FCE4EC] text-[#C2185B]',
      iconBg: 'bg-[#FCE4EC]',
      iconCls: 'text-[#C2185B]',
      iconName: 'sailing',
      loc1: 'Ram Kund Ghat',
      loc2: 'LED Screen Telecast',
    },
  ];

  const calendarDays = [
    { day: 1 }, { day: 2, dot: '#FF9800' }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 },
    { day: 8, dot: '#FF5722' }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12, dot: '#0288D1' }, { day: 13 }, { day: 14, dot: '#FF9800' },
    { day: 15 }, { day: 16 }, { day: 17 }, { day: 18, active: true }, { day: 19, dot: '#2E7D32' }, { day: 20 }, { day: 21 },
    { day: 22 }, { day: 23 }, { day: 24, dot: '#0288D1' }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 },
    { day: 29 }, { day: 30 }, { day: 31 }, { day: 1, next: true }, { day: 2, next: true }, { day: 3, next: true }, { day: 4, next: true },
  ];

  const upcomingDays = [
    { date: '19 Aug 2027', day: 'Thursday', bg: 'bg-[#E8F5E9] text-[#2E7D32]' },
    { date: '20 Aug 2027', day: 'Friday', bg: 'bg-[#E1F5FE] text-[#0288D1]' },
    { date: '21 Aug 2027', day: 'Saturday', bg: 'bg-[#FCE4EC] text-[#C2185B]' },
    { date: '22 Aug 2027', day: 'Sunday', bg: 'bg-[#FFF3E0] text-[#E65100]' },
  ];

  return (
    <section className="relative w-full py-4 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/programme-bg.png')" }}>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

          {/* LEFT PANEL: Calendar & Upcoming Days */}
          <div className="lg:col-span-4 bg-white/95 rounded-xl p-3.5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <MS name="calendar_month" cls="text-[#E65100] text-[16px]" />
                  <h3 className="text-[16px] font-bold text-[#1E293B]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    August 2027
                  </h3>
                </div>
                <div className="flex items-center gap-0.5 text-[#64748B]">
                  <button className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <MS name="chevron_left" cls="text-[14px]" />
                  </button>
                  <button className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <MS name="chevron_right" cls="text-[14px]" />
                  </button>
                </div>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 text-center text-[9.5px] font-semibold text-[#64748B] mb-0.5">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-7 gap-y-0.5 text-center text-[11px] font-medium text-[#334155]">
                {calendarDays.map((d, idx) => (
                  <div key={idx} className="h-5 flex flex-col items-center justify-center relative cursor-pointer hover:bg-slate-50 rounded transition-colors">
                    {d.active ? (
                      <span className="w-5 h-5 rounded-full bg-[#FF5722] text-white font-bold flex items-center justify-center shadow-xs text-[10px]">
                        {d.day}
                      </span>
                    ) : (
                      <span className={d.next ? 'text-slate-300' : ''}>{d.day}</span>
                    )}
                    {d.dot && !d.active && (
                      <span className="w-1 h-1 rounded-full absolute bottom-0" style={{ backgroundColor: d.dot }} />
                    )}
                  </div>
                ))}
              </div>

              <hr className="my-2 border-slate-100" />

              {/* Upcoming Days List */}
              <div className="grid grid-cols-2 gap-1.5">
                {upcomingDays.slice(0, 2).map((u, i) => (
                  <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50/80 cursor-pointer">
                    <div className={`w-6 h-6 rounded ${u.bg} flex items-center justify-center shrink-0`}>
                      <MS name="event" cls="text-[12px]" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-bold text-[#1E293B] block leading-tight truncate">{u.date}</span>
                      <span className="text-[9.5px] text-[#64748B] block truncate">{u.day}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Quote */}
            <div className="mt-2 pt-1.5 border-t border-slate-100 text-center">
              <p className="text-[10.5px] italic font-medium text-[#475569]" style={{ fontFamily: 'Playfair Display, serif' }}>
                "Faith brings you here, The Kumbh binds us all."
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: Today's Sacred Programmes */}
          <div className="lg:col-span-8 bg-white/95 rounded-xl p-3.5 shadow-sm border border-slate-100">
            {/* Right Panel Header */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[#FF5722] text-[16px]">🔱</span>
                <h2 className="text-[17px] font-bold text-[#1E293B]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Today's Sacred Programmes
                </h2>
              </div>
              <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-soft-pulse" />
                <span>Auto-refreshes Live</span>
              </div>
            </div>

            {/* Programme Cards List - Scrollable max height */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {programmes.map((p, idx) => (
                <div key={idx} className="bg-white border border-slate-100 hover:border-slate-200 rounded-lg p-2.5 shadow-2xs hover:shadow-xs transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">

                  {/* Time + Avatar Icon + Title & Desc */}
                  <div className="flex items-start gap-2.5 flex-1">
                    {/* Time Column */}
                    <div className="flex items-center gap-1 text-[#64748B] text-[11px] font-semibold min-w-[78px] pt-0.5">
                      <MS name="schedule" cls="text-[13px] text-[#E65100]" />
                      <div>
                        <span className="block text-[#1E293B] font-bold text-[11px]">{p.timeStart}</span>
                        <span className="text-[9.5px] text-[#94A3B8]">to {p.timeEnd}</span>
                      </div>
                    </div>

                    {/* Circular Avatar Icon */}
                    <div className={`w-8 h-8 rounded-full ${p.iconBg} ${p.iconCls} flex items-center justify-center shrink-0 mt-0.5`}>
                      <MS name={p.iconName} cls="text-[16px]" />
                    </div>

                    {/* Content */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-[13px] font-bold text-[#1E293B]">{p.title}</h3>
                        <span className={`px-1.5 py-0.2 rounded-full text-[9.5px] font-bold ${p.tagCls}`}>
                          {p.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748B] leading-tight max-w-xl">
                        {p.desc}
                      </p>

                      {/* Metadata row */}
                      <div className="flex items-center gap-3 text-[10px] text-[#64748B] pt-0.5 flex-wrap">
                        <span className="flex items-center gap-0.5 font-medium">
                          <MS name="location_on" cls="text-[11px] text-slate-400" />
                          {p.loc1}
                        </span>
                        <span className="flex items-center gap-0.5 font-medium">
                          <MS name="account_balance" cls="text-[11px] text-slate-400" />
                          {p.loc2}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: Sacred Sites ───────────────────────────────────── */
const MOBILE_SHRINES = [
  {
    id: 'ms1',
    badge: '1 of 12 Jyotirlingas',
    badgeBg: 'bg-[#7a3a0f]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg',
    waitLabel: 'Wait: ~45 mins',
    passLabel: 'E-Pass Slot 2 open',
    title: 'Trimbakeshwar Shiva',
    desc: 'The sacred origin of River Godavari. Experience Rudrabhishek and profound…',
    dist: '28 km from Ram Kund',
  },
  {
    id: 'ms2',
    badge: 'Shahi Snan Ghat',
    badgeBg: 'bg-[#3e6374]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe2iU1zFe4tdmgsvTfcRSQBTr1n1LMElnSCQgtUqYKoEN2-FZZ_D4q0rZ1KsKcP4t9Bh99orMw8kbVs8FvpCGg1v6BgEVGioyOLQ21pLM0Qfmia2_6g6UhEviVTbUA2Ft5lEZYcbTJFwBMXK3R3w9Vh0UyeciSWTHOjath1Mb3KmTLDMs3NQyw2hnwRzdSxo-EUNH0Ak6PPDlUODzC8cBWamuj1WiiiOEQ2HnpL6rqlISbytNDlrz5g',
    waitLabel: 'Water Depth: 4.5 ft',
    passLabel: 'Pavitra Grade A',
    title: 'Ram Kund Ghat',
    desc: 'The revered bathing kund where Lord Rama performed shraddha. Centerstage of Kumbh…',
    dist: 'Central Kumbh Zone',
  },
  {
    id: 'ms3',
    badge: 'Ramayana Epic Site',
    badgeBg: 'bg-[#755717]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sXpDjmuwPtmIfzcD6BQW9ixUKQgcDJINrAP6EJKQLKw4wliezr3kTEQMX7w7pRga8IF7n6WRRIHGCt7mO4tVrwVLWxCWLdJPu0j-cKJAcAiilbSD4lOHjizgJsJfMwK_edX3vICEEWJbR_v5Vpva9thFgk1jWlIWEEVXU43EsGbwzN0LAV0OIYMx9utwf0JQAwxW-TMDtg9-j1-15kc5kRu58VJ58uf4GPQZxd1HSKJQ2nWIbxyreQ',
    waitLabel: '~25 Mins Wait',
    passLabel: '5 Sacred Banyan Trees',
    title: 'Panchavati & Sita Gufa',
    desc: 'Where Lord Rama, Sita & Lakshmana stayed during their 14-year exile…',
    dist: '0.8 km from Ram Kund',
  },
  {
    id: 'ms4',
    badge: '1792 CE Black Stone',
    badgeBg: 'bg-[#2c2218]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMf7cw1FidMnJUlDTy5cMnPRtnQYSO7YTDs013uMW1LKEyRr8TRDkG5HtthE5pXyuAGeq19CXSld7XHQxIEOvyU0bFeEUbZK0mSmAD5cI_GDv-jNlQmvp2Rrjace7lkhfAePENFKb5fBzwgc4suzOkiNEd37aTmVaCAT22OHVL9zPbWlpT16xuafmmvCNK6jMO_0QPnl4GMVJKFVWN4J9_E60ehjZV0cHi4v2eYeWtNmXZdsWwJSelQ',
    waitLabel: '~40 Mins Wait',
    passLabel: 'Kakad Aarti 05:00 AM',
    title: 'Shree Kalaram Mandir',
    desc: 'Celebrated black stone temple by Sardar Rangrao Odhekar. Center of devotional bhakti…',
    dist: '0.5 km from Panchavati',
  },
];

function SacredSites() {
  return (
    <section className="w-full bg-[#fcf9f4]">

      {/* ── MOBILE: Horizontal scroll cards ── */}
      <div className="md:hidden py-5">
        {/* Header */}
        <div className="flex items-start justify-between px-4 mb-4">
          <div>
            <h2 className="text-[18px] font-bold text-[#1c1c19] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Sacred Shrines &amp; Ghats
            </h2>
            <p className="text-[12px] text-[#786d66] mt-0.5">Live telemetry and pilgrimage wait times</p>
          </div>
          <Link href="/darshan" className="text-[12px] font-bold text-[#984300] tracking-wide uppercase flex items-center gap-0.5 pt-1 shrink-0">
            EXPLORE <MS name="chevron_right" cls="text-[16px]" />
          </Link>
        </div>

        {/* Snap-scroll horizontal cards */}
        <div
          className="flex gap-3.5 overflow-x-auto px-4 pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {MOBILE_SHRINES.map(card => (
            <Link
              key={card.id}
              href="/darshan"
              className="flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden shadow-[0_3px_18px_rgba(0,0,0,0.09)] border border-[#ede9e2] active:scale-[0.97] transition-transform"
              style={{ width: '73vw', maxWidth: '275px' }}
            >
              {/* Image block */}
              <div className="relative overflow-hidden" style={{ height: '175px' }}>
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {/* Top-left badge pill */}
                <div className={`absolute top-3 left-3 ${card.badgeBg} px-3 py-1 rounded-full`}>
                  <span className="text-[10.5px] font-bold text-white tracking-wide">{card.badge}</span>
                </div>

                {/* Bottom chips row */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1 bg-black/55 backdrop-blur-sm px-2 py-[3px] rounded-full">
                    <MS name="schedule" cls="text-[11px] text-white" />
                    <span className="text-[10px] text-white font-semibold">{card.waitLabel}</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-[3px] rounded-full">
                    <span className="text-[10px] font-bold text-[#3c2e28]">{card.passLabel}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-3.5">
                <h3
                  className="text-[16px] font-semibold text-[#1c1c19] leading-snug mb-1.5"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {card.title}
                </h3>
                <p className="text-[11.5px] text-[#786d66] leading-relaxed line-clamp-2 mb-3.5">
                  {card.desc}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#786d66] font-medium shrink-0">{card.dist}</span>
                  <span className="bg-[#7a3a0f] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm">
                    Book E-Pass
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: Unchanged grid ── */}
      <div className="hidden md:block py-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
            <div>
              <span className="text-[12px] uppercase tracking-widest text-[#984300] font-semibold">Spiritual Geography</span>
              <h2 className="text-[28px] leading-[36px] font-semibold text-[#1c1c19] mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>Sacred Sites of Nashik &amp; Trimbakeshwar</h2>
            </div>
            <button className="text-[15px] text-[#984300] font-semibold flex items-center gap-1 hover:underline">
              <span>View All 14 Sacred Shrines</span>
              <MS name="arrow_forward" cls="text-[18px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SACRED_SITES.map(s => (
              <div key={s.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold">
                    <span className={s.badgeCls}>{s.badge}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                    <MS name={s.waitIcon} cls="text-[13px] text-[#ffdbca]" />
                    <span>{s.wait}</span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[#564339] text-[11px] mb-1">
                      <span>{s.info1}</span>
                      <span className={`font-semibold ${s.info2Cls}`}>{s.info2}</span>
                    </div>
                    <h3 className="text-[20px] font-semibold text-[#1c1c19]" style={{ fontFamily: 'Playfair Display, serif' }}>{s.title}</h3>
                    <p className="text-[13px] text-[#564339] mt-2 line-clamp-2">{s.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-[#564339] text-[12px]">
                      <span className="font-semibold text-[#1c1c19]">{s.extra.split(':')[0]}:</span>{s.extra.split(':').slice(1).join(':')}
                    </div>
                    <button className="text-[12px] text-[#984300] font-bold hover:underline flex items-center gap-0.5">
                      <span>{s.link}</span>
                      <MS name="chevron_right" cls="text-[15px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: Near Me Essentials ────────────────────────────── */
function NearMeEssentials() {
  const [cat, setCat] = useState('all');
  const [radius, setRadius] = useState('1.5');
  const filtered = cat === 'all' ? NEAR_ME_ITEMS : NEAR_ME_ITEMS.filter(i => i.cat === cat);

  const renderCard = (card: any, isMobile = false) => (
    <div
      key={card.id}
      className={`bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#ede9e2] active:scale-[0.98] transition-transform ${isMobile ? 'flex-shrink-0 snap-start' : 'flex flex-col h-full'}`}
      style={isMobile ? { width: '80vw', maxWidth: '300px' } : undefined}
    >
      {/* Image */}
      <div className="relative h-[160px] overflow-hidden">
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
            (e.target as HTMLElement).parentElement!.classList.add('bg-slate-200');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        
        {/* Top-left pill */}
        <div className={`absolute top-3 left-3 ${card.badgeBg} flex items-center gap-1 px-2.5 py-1 rounded-full`}>
          <MS name={card.badgeIcon} cls="text-[12px] text-white" />
          <span className="text-[11px] font-bold text-white tracking-wide">{card.badge}</span>
        </div>

        {/* Bottom chips */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="text-[11px] text-white font-bold">{card.distLabel}</span>
          </div>
          <div className={`${card.crowdBg} flex items-center gap-1.5 px-2.5 py-1 rounded-full`}>
            <div className={`w-1.5 h-1.5 rounded-full ${card.crowdDot}`} />
            <span className="text-[11px] font-bold text-white">{card.crowdLabel}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${card.catColor}`}>
          {card.category}
        </span>
        <h3 className="text-[20px] font-semibold text-[#1c1c19] mt-1 mb-1.5 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
          {card.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-[#564339] mb-2.5">
          <MS name="schedule" cls="text-[14px]" />
          <span className="text-[12px]">{card.time}</span>
        </div>
        
        <p className="text-[12.5px] text-[#786d66] leading-relaxed line-clamp-2 mb-4 flex-1">
          {card.desc}
        </p>
        
        <button className="w-full bg-[#1c1c19] text-white text-[13px] font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:bg-[#333]">
          <MS name="near_me" cls="text-[16px]" />
          Get Directions
        </button>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#fcf9f4]">

      {/* ── MOBILE VERSION ── */}
      <div className="md:hidden py-5 pb-8">
        {/* Header */}
        <div className="px-4 mb-4">
          <h2 className="text-[20px] font-bold text-[#1c1c19] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Near Me — Essential Facilities
          </h2>
        </div>

        {/* Category Chips - scrollable */}
        <div className="flex gap-2 overflow-x-auto px-4 mb-4" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          {NM_CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-colors border ${
                cat === c.id
                  ? 'bg-[#1c1c19] text-white border-[#1c1c19]'
                  : 'bg-[#f4efe8] text-[#564339] border-transparent hover:bg-[#eae3db]'
              }`}
            >
              <MS name={c.icon} cls="text-[15px]" />
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Snap-scroll horizontal cards */}
        <div
          className="flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {filtered.map(card => renderCard(card, true))}
        </div>
      </div>

      {/* ── DESKTOP VERSION ── */}
      <div className="hidden md:block py-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-[12px] uppercase tracking-widest text-[#984300] font-semibold">Location-Based Pilgrim Services</span>
              <h2 className="text-[28px] leading-[36px] font-semibold text-[#1c1c19] mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Near Me — Essential Facilities
              </h2>
              <p className="text-[13px] text-[#564339] mt-1">
                Verified facilities within <strong className="text-[#984300]">{radius} km</strong> of Ram Kund, Panchavati
              </p>
            </div>
            {/* Radius Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#564339] font-semibold uppercase tracking-wider">Radius:</span>
              {['0.5', '1.0', '1.5', '3.0'].map(r => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition ${
                    radius === r
                      ? 'bg-[#984300] text-white shadow'
                      : 'bg-[#f6f3ee] text-[#564339] hover:bg-[#ebe8e3]'
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {NM_CATS.map(c => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition border ${
                  cat === c.id
                    ? 'bg-[#1c1c19] text-white border-[#1c1c19] shadow'
                    : 'bg-white text-[#564339] border-[#e5e2dd] hover:border-[#984300] hover:text-[#984300]'
                }`}
              >
                <MS name={c.icon} cls="text-[16px]" />
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(card => renderCard(card, false))}
          </div>

          {/* Trust note */}
          <div className="mt-6 flex items-center justify-between bg-[#f6f3ee] rounded-xl px-5 py-3">
            <div className="flex items-center gap-2 text-[13px] text-[#564339]">
              <MS name="verified_user" cls="text-[18px] text-[#755717]" />
              <span>All facility listings verified by <strong className="text-[#1c1c19]">Nashik Kumbh Operations Command</strong> — updated every 30 minutes</span>
            </div>
            <span className="text-[11px] text-[#564339] font-medium hidden sm:block">Last sync: 8 min ago</span>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── COMPONENT: Live Dashboard ─────────────────────────────────── */
function LiveDashboard() {
  const metrics = [
    { label: 'Crowd Density Index', badge: 'Normal / Moderate', badgeCls: 'bg-[#ebe8e3] text-[#1c1c19]', val: '48%', sub: '+3% past hour', subCls: 'text-[#755717]', subIcon: 'trending_up', bar: 48, barCls: 'bg-[#3e6374]', note: 'Ram Kund Ghats: 42% capacity • Tapovan Mela: 54%' },
    { label: 'River Gauge & Flow', badge: 'Safe Snan', badgeCls: 'bg-[#bee5fa] text-[#3e6374]', val: '568.2 m', sub: 'Bathing datum', subCls: 'text-[#564339]', bar: 62, barCls: 'bg-[#755717]', note: 'Darna Dam release: Stable (3,200 cusecs) • All life-chains secure' },
    { label: 'Ring Parking Slots', badge: 'Lots P1 – P8', badgeCls: 'bg-[#e5e2dd] text-[#564339]', val: '7,420', sub: 'Vacant spots', subCls: 'text-[#984300]', bar: 29, barCls: 'bg-[#984300]', note: 'Trimbak Road Lot P3 full • Adgaon P6 85% free' },
    { label: 'Pilgrim Feeder Buses', badge: 'Frequency 6 Min', badgeCls: 'bg-[#ffdea5] text-[#755717]', val: '240 EV', sub: 'Active in fleet', subCls: 'text-[#3e6374]', bar: 88, barCls: 'bg-[#3e6374]', note: 'Connecting Nashik Road Railway Stn directly to Ghat hubs' },
  ];

  const bulletins = [
    { source: 'District Traffic Police', time: '18m ago', text: 'Heavy vehicle diversions active on NH-848 (Nashik - Mumbai corridor) to prioritize yatri buses.' },
    { source: 'Trimbakeshwar Devasthan', time: '42m ago', text: 'VIP Protocol queue temporarily suspended between 2:00 PM - 4:00 PM for general pilgrim darshan clearance.' },
    { source: 'Nashik Municipal Health Corp', time: '1h ago', text: '28 new ORS & drinking water kiosks operational across Panchavati Ring Road promenade.' },
  ];

  return (
    <section id="map" className="w-full py-10 bg-[#fcf9f4]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <span className="text-[12px] uppercase tracking-widest text-[#3e6374] font-semibold">City Real-Time Telemetry</span>
            <h2 className="text-[28px] leading-[36px] font-semibold text-[#1c1c19] mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>Live Crowd & Infrastructure Dashboard</h2>
          </div>
          <div className="flex items-center gap-2 text-[#564339] text-[11px] bg-[#f6f3ee] px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#984300] animate-soft-pulse" />
            <span>Feed updated 4 minutes ago via Nashik Police Command</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(m => (
            <div key={m.label} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider text-[#564339] font-bold">{m.label}</span>
                <span className={`px-2 py-0.5 rounded ${m.badgeCls} text-[11px] font-semibold`}>{m.badge}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-bold text-[#1c1c19] leading-none">{m.val}</span>
                {m.sub && (
                  <span className={`text-[12px] font-semibold flex items-center ${m.subCls}`}>
                    {m.subIcon && <MS name={m.subIcon} cls="text-[14px]" />}
                    {m.sub}
                  </span>
                )}
              </div>
              <div className="w-full bg-[#f6f3ee] h-2 rounded-full overflow-hidden mt-3">
                <div className={`${m.barCls} h-full rounded-full`} style={{ width: `${m.bar}%` }} />
              </div>
              <p className="text-[12px] text-[#564339] mt-2">{m.note}</p>
            </div>
          ))}
        </div>

        {/* Map + Bulletins */}
        <div className="mt-6 bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 relative min-h-[360px] lg:h-[420px]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIzSa9gEqYYAmzuEgmIsi_pgJ-9MVwVWEAiWgdXW3SPra4sUT_33giOtInuPQujkjALwuu25ughScQoZzTMNpJ0Zht8lIcW3J1hqTcMgHUo3CTIiMn2HCovSMk1uy9YA9ZyZu84M6aYSWhqA5F3VX8i0XKvHmu8e_8PLcDR4Sb-DrjHuuZdcp3q2-8m2MjqpPlrWiKHDtnDgeGIhVd9Kkn8xDJivNhhXAuiM17uIQY3wnVCauaNIBc2Q')" }}
              />
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#fcf9f4]/95 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-sm">
                <span className="text-[11px] uppercase tracking-wider text-[#984300] font-bold block mb-1">Interactive Map Telemetry</span>
                <div className="space-y-1 text-[12px] text-[#1c1c19]">
                  {[
                    { dot: 'bg-[#3e6374]', label: 'Ram Kund Snan Zone', status: 'Open', sc: 'text-[#3e6374]' },
                    { dot: 'bg-[#984300]', label: 'Tapovan Sadhu Gram', status: 'High Density', sc: 'text-[#984300]' },
                    { dot: 'bg-[#755717]', label: 'Trimbakeshwar Corridor', status: '2-Way Smooth', sc: 'text-[#755717]' },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${r.dot}`} />{r.label}
                      </span>
                      <span className={`font-bold ${r.sc}`}>{r.status}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 inline-flex items-center gap-1 text-[13px] text-[#984300] font-bold hover:underline">
                  <span>Open Fullscreen Tactical Navigation Map</span>
                  <MS name="open_in_new" cls="text-[15px]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-[#f6f3ee]">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MS name="campaign" cls="text-[20px] text-[#984300]" />
                  <span className="text-[18px] font-bold text-[#1c1c19]">Official Kumbh Bulletins</span>
                </div>
                <div className="space-y-3">
                  {bulletins.map(b => (
                    <div key={b.source} className="bg-white p-3 rounded-lg">
                      <div className="flex items-center justify-between text-[#564339] text-[11px] mb-1">
                        <span>{b.source}</span><span>{b.time}</span>
                      </div>
                      <p className="text-[13px] text-[#1c1c19] font-semibold">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-[12px] py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                  <MS name="notifications" cls="text-[16px] text-[#984300]" />
                  <span>Subscribe to WhatsApp Live Alerts</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: Emergency Hub ──────────────────────────────────── */
function EmergencyHub() {
  const cards = [
    { icon: 'medical_services', bg: 'bg-[#ffdad6]', ic: 'text-[#ba1a1a]', title: 'Emergency Ambulance', body: 'Dial <strong class="text-[#ba1a1a] text-[14px]">108</strong> • 84 Mobile ICU Ambulances & River Rescue Boats deployed.', note: 'Tapovan Field Hospital: 500 Beds Active' },
    { icon: 'local_police', bg: 'bg-[#bee5fa]', ic: 'text-[#3e6374]', title: 'Police Assistance', body: 'Dial <strong class="text-[#3e6374] text-[14px]">112</strong> • 12,000 personnel, rapid intervention teams & CCTV command.', note: 'Quick Help Booths at every 150m' },
    { icon: 'person_search', bg: 'bg-[#ffdea5]', ic: 'text-[#755717]', title: 'Khoya-Paya (Lost & Found)', body: 'AI Face-Match facial registry kiosks & loudspeaker network connected in 6 regional languages.', note: 'Central Desk: Ram Kund Main Gate' },
    { icon: 'elderly_woman', bg: 'bg-[#ffdbca]', ic: 'text-[#984300]', title: 'Women & Elder Helpline', body: 'Dial <strong class="text-[#984300] text-[14px]">1091</strong> • Mahila Seva Dal volunteers, wheelchair escorts & baby-care booths.', note: 'Private changing rooms at all 22 ghats' },
  ];

  return (
    <section className="w-full py-10 bg-[#f6f3ee] pb-24">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-md border-l-4 border-l-[#ba1a1a]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-soft-pulse" />
                <span className="text-[12px] uppercase tracking-wider text-[#ba1a1a] font-bold">Pilgrim Rapid Response Network</span>
              </div>
              <h2 className="text-[28px] leading-[36px] font-semibold text-[#1c1c19]" style={{ fontFamily: 'Playfair Display, serif' }}>24/7 Safety, Medical & Emergency Hub</h2>
              <p className="text-[13px] text-[#564339] mt-1">Dedicated response units stationed every 300 meters across Ram Kund, Trimbak, and Tapovan grounds.</p>
            </div>
            <a href="tel:112" className="bg-[#ba1a1a] hover:bg-[#93000a] text-white px-10 py-3 rounded-lg text-[15px] font-bold tracking-wide transition-all shadow flex items-center gap-2 shrink-0">
              <MS name="sos" cls="text-[20px]" />
              <span>Open Emergency Center</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map(c => (
              <div key={c.title} className="bg-[#f6f3ee] p-4 rounded-xl">
                <div className={`w-10 h-10 rounded-full ${c.bg} ${c.ic} flex items-center justify-center mb-3`}>
                  <MS name={c.icon} cls="text-[22px]" />
                </div>
                <h3 className="text-[15px] font-bold text-[#1c1c19]">{c.title}</h3>
                <p className="text-[12px] text-[#564339] mt-1" dangerouslySetInnerHTML={{ __html: c.body }} />
                <div className="mt-3 pt-2 text-[11px] text-[#564339]">{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: Footer ─────────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: 'Pilgrimage & Darshan', links: ['Trimbakeshwar Jyotirlinga', 'Ram Kund & Panchavati', 'Shahi Snan Timetable', 'Daily Godavari Aarti', 'Kapaleshwar & Kalaram'] },
    { title: 'Devotee Services', links: ['Accommodations & Ashrams', 'Verified Annadan & Bhandara', 'Akhadas & Yatri Camps', 'Ghat Accessibility Status', 'Wheelchair & Senior Care'] },
    { title: 'Safety & Support', links: ['Kumbh Command Center', 'Lost & Found Registry', '24x7 Medical Booths', 'Traffic & Parking Updates', 'Emergency Contacts'] },
    { title: 'Languages & Offline', links: ['मराठी आवृत्ती (Marathi)', 'हिंदी संस्करण (Hindi)', 'English Version', 'Download Ghat Maps (PDF)', 'Pilgrim Guidelines 2027'] },
  ];

  return (
    <footer className="w-full bg-[#31302d] text-[#f3f0eb]">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-10 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Nashik Kumbh Mela 2027 Logo"
                className="h-9 w-auto object-contain brightness-200"
              />
              <span className="text-[20px] text-[#ffb68e] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Nashik Kumbh Mela 2027</span>
            </div>
            <p className="text-[13px] text-[#e5e2dd] leading-relaxed">Nashik–Trimbakeshwar Simhastha Kumbh 2027 Devotee Companion. Built with devotion and precision for pilgrims of the sacred convergence.</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2 py-0.5 rounded bg-white/10 text-[#e9c176] text-[11px]">Godavari Pavitra Snan</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[#e9c176] text-[11px]">Simhastha Parva</span>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.title}>
              <h3 className="text-[18px] font-semibold text-[#fcf9f4] mb-4">{c.title}</h3>
              <ul className="space-y-2 text-[13px] text-[#e5e2dd]">
                {c.links.map(l => (
                  <li key={l}><a href="#" className="hover:text-[#ffb68e] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#e5e2dd]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#ffb68e] font-semibold">Helplines:</span>
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

/* ─── PAGE: Main Export ─────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState('en');
  const [activeNav, setActiveNav] = useState('home');

  const scrollToTrip = () => {
    document.getElementById('trip')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)]">
        <Topbar />
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </header>

      <main className="w-full pt-14 md:pt-[116px] bg-[#fcf9f4] pb-16 md:pb-0">
        <div className="flex flex-col w-full">
          <Hero onPlanTrip={scrollToTrip} />
          <QuickAccess />
          <TodayAtKumbh />
          <SacredSites />
          <NearMeEssentials />
          <LiveDashboard />
          <EmergencyHub />
        </div>
      </main>

      <Footer />
      <MobileBottomNav active="home" />
    </>
  );
}
