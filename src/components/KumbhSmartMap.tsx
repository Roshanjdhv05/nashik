'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─── DATA ────────────────────────────────────────────────────── */
const KUMBH_LOCATIONS = [
  {
    id: 't1', cat: 'ghat', catLabel: 'Holy Ghat', crowdLabel: 'High Crowd',
    name: 'Ram Kund Sacred Bathing Ghat', sub: 'Main Snan Tirtha • Panchavati Riverfront',
    lat: 20.0059, lng: 73.7918, emoji: '🛕', crowd: 'High', wait: '~35 min',
    open: 'Open 24 Hours', dist: '1.2 km', walkTime: '15 min walk',
    amenities: ['Cloakroom', 'Changing Rooms', 'Wheelchair Ramp', 'Life Guards & Divers', 'Filtered Jal Mandir'],
    event: 'Maha Godavari Aarti — Today at 7:00 PM (Sunset Muhurta)',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0ybb2xj7pGOdhqqIh1qLsJ2jv2c9fozuBYsoGgBslQ1IeaKNCdF3aT7KRaTyWlr_c5cD2ax9AAvZfqssMoVb6mIjNtVqVpsDBAFiJm68H4quinU_I8Z02N1lWC7kwfi0_QAOMtATEVVEuClIr5N-wgsGcDZ5QdAXv44rr5TQT_sPZgZOoOCpiv1ayYooCVNDRafU_hOO0uTxAQW9UMnGIQSu7HRFyY72R-EgZlLaxuRPmqfnFekdSsg',
  },
  {
    id: 't2', cat: 'temple', catLabel: 'Jyotirlinga Temple', crowdLabel: 'Bus Shuttle Route #4',
    name: 'Trimbakeshwar Jyotirlinga Temple', sub: 'Brahmagiri Hills • Origin of River...',
    lat: 19.9329, lng: 73.5300, emoji: '🛕', crowd: 'Very High', wait: '~75 min',
    open: '05:00–21:00', dist: '28 km', walkTime: 'Direct Bus',
    amenities: ['Prasad Counter', 'Lockers', 'E-Pass Required', 'Wheelchair Access'],
    event: 'Rudrabhishek — Daily 08:00 AM',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bW97jLPddr37r8mSOP0xd_pDkK_w9N6LYebKnviI9BsaiN8ofHDg8Lplvi8Ot0wMlxqrEQVwtFhjwCsOboiq-ucrXytmrY-HiFAZuvTjtx538Yoi8o11VeVYTEdbQ_ikLgwptXzxjE-qvxalg5IG9BatrM3M4rCA6n9I4bzd0kL0g7J3Wmf-ltVATuM9nBaUfzUouxZMTBdLQM_YcVWyv2og4uJCqd8ryRNqagbtnEPqk_DqgWhmcg',
  },
  {
    id: 't3', cat: 'temple', catLabel: 'Ramayana Site', crowdLabel: 'Low Crowd',
    name: 'Panchavati & Sita Gufa', sub: '0.8 km from Ram Kund • 5 Sacred Banyans',
    lat: 20.0054, lng: 73.7910, emoji: '🛕', crowd: 'Low', wait: '~25 min',
    open: '06:00–21:00', dist: '0.8 km', walkTime: '10 min walk',
    amenities: ['Guided Tours', 'Photography Zone', 'Water Point'],
    event: 'Evening Aarti — 07:30 PM Daily',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sXpDjmuwPtmIfzcD6BQW9ixUKQgcDJINrAP6EJKQLKw4wliezr3kTEQMX7w7pRga8IF7n6WRRIHGCt7mO4tVrwVLWxCWLdJPu0j-cKJAcAiilbSD4lOHjizgJsJfMwK_edX3vICEEWJbR_v5Vpva9thFgk1jWlIWEEVXU43EsGbwzN0LAV0OIYMx9utwf0JQAwxW-TMDtg9-j1-15kc5kRu58VJ58uf4GPQZxd1HSKJQ2nWIbxyreQ',
  },
  {
    id: 't4', cat: 'temple', catLabel: 'Black Stone Temple', crowdLabel: 'Moderate Crowd',
    name: 'Shree Kalaram Mandir', sub: '0.5 km from Panchavati • Ram Murti in Basalt',
    lat: 20.0048, lng: 73.7895, emoji: '🛕', crowd: 'Moderate', wait: '~40 min',
    open: '05:00–22:00', dist: '0.5 km', walkTime: '6 min walk',
    amenities: ['Darshan Queue', 'Prasad Counter', 'Lockers'],
    event: 'Kakad Aarti — 05:00 AM Daily',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMf7cw1FidMnJUlDTy5cMnPRtnQYSO7YTDs013uMW1LKEyRr8TRDkG5HtthE5pXyuAGeq19CXSld7XHQxIEOvyU0bFeEUbZK0mSmAD5cI_GDv-jNlQmvp2Rrjace7lkhfAePENFKb5fBzwgc4suzOkiNEd37aTmVaCAT22OHVL9zPbWlpT16xuafmmvCNK6jMO_0QPnl4GMVJKFVWN4J9_E60ehjZV0cHi4v2eYeWtNmXZdsWwJSelQ',
  },
  {
    id: 't5', cat: 'ghat', catLabel: 'Serene Ghat', crowdLabel: 'Low Crowd',
    name: 'Someshwar Ghat & Temple', sub: '7.5 km upstream from Ram Kund',
    lat: 20.0290, lng: 73.7840, emoji: '🛕', crowd: 'Low', wait: '~10 min',
    open: '24 Hours', dist: '7.5 km', walkTime: 'Shuttle Route #4',
    amenities: ['Peaceful Snan', 'Family Ghat', 'Senior Friendly'],
    event: 'Dudhsagar Waterfall view from ghat',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7VH7ZTIw_ECpQt006uUQC4Gu0SIEBorGzClP0_yFQazxbsDbs9wrQjxXfxa9A1zi0DToHgA0j1YWQ22YmuPcIO7qzNXgKcGqUcda2CLYpoOhfsCBSXZVs3M49OiyK5OeJWQCGk6QW5EFuS20E-WPh6sckfiSDQzRw6XM5IjerjA6dpLgX5qfPGerM9dTxjeTNBhlPSe0lX7_PzhQoghv1yRa9gRA2IUefZ1DxzY8EBzDnTrDPvB1pCw',
  },
  {
    id: 'c1', cat: 'camp', catLabel: 'Akhada Camp', crowdLabel: 'Tapovan Sector 2',
    name: 'Shri Panch Dashnam Juna Akhada', sub: 'Naga Sadhu Shibir • Hawan & Darshan ...',
    lat: 20.0082, lng: 73.7960, emoji: '⛺', crowd: 'Open', wait: 'Satsang Live',
    open: 'Gate #4 Entrance', dist: '3.4 km', walkTime: 'Free E-Cart',
    amenities: ['Hawan Kund', 'Pravachan Hall', 'Langar', 'Photography Allowed'],
    event: 'Holy Satsang — Live Daily 09:00–18:00',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sXpDjmuwPtmIfzcD6BQW9ixUKQgcDJINrAP6EJKQLKw4wliezr3kTEQMX7w7pRga8IF7n6WRRIHGCt7mO4tVrwVLWxCWLdJPu0j-cKJAcAiilbSD4lOHjizgJsJfMwK_edX3vICEEWJbR_v5Vpva9thFgk1jWlIWEEVXU43EsGbwzN0LAV0OIYMx9utwf0JQAwxW-TMDtg9-j1-15kc5kRu58VJ58uf4GPQZxd1HSKJQ2nWIbxyreQ',
  },
  {
    id: 'f1', cat: 'food', catLabel: 'Verified Free Bhandara', crowdLabel: '100% Hygienic',
    name: 'Tapovan Mahaprasad Annadan #7', sub: 'Hot satvik thali • 12,000+ fed/hr',
    lat: 20.0067, lng: 73.7945, emoji: '🍲', crowd: 'Moderate', wait: 'Continuous',
    open: 'Free Seva 24x7', dist: '2.1 km', walkTime: 'Continuous',
    amenities: ['Free Thali', 'RO Water', 'Seating Area', 'Take Away Packs'],
    event: 'Special Prasad on Ekadashi days',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlG1XW6Qi5I3k9AXm3JgxXCi04uXpNvhLRmD8E1U7Kj6kTbRYboN0RtKbgac5w4QbjKRvh0_DhxklD2OTf838faCggwSW6Bx_rUBxeqT1XICCcuRMUaxJKSUQlLn8NAkvWbmhigPupTgTK7eP-Ju-DbZ8yIxp0Mqr7EA-XNZVkkjGNYgJHcfUrFEuQS2xcLu8_LUFGt4qLGPd8ft6X8QwhYMblr-HSnUc_E5GGwHRMxmKa1aOJbSSXCg',
  },
  {
    id: 'f2', cat: 'food', catLabel: 'Jain Bhandara', crowdLabel: 'Low Crowd',
    name: 'Shree Mahavir Free Annadan', sub: 'Ram Kund Gate • Pure Jain Satvik',
    lat: 20.0055, lng: 73.7905, emoji: '🍲', crowd: 'Low', wait: '0 min wait',
    open: '07:00–22:00', dist: '0.1 km', walkTime: '2 min walk',
    amenities: ['Jain Menu', 'Pure Ghee', 'No Onion No Garlic'],
    event: 'Paryushan Special Menu — Aug 27–Sep 4',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlG1XW6Qi5I3k9AXm3JgxXCi04uXpNvhLRmD8E1U7Kj6kTbRYboN0RtKbgac5w4QbjKRvh0_DhxklD2OTf838faCggwSW6Bx_rUBxeqT1XICCcuRMUaxJKSUQlLn8NAkvWbmhigPupTgTK7eP-Ju-DbZ8yIxp0Mqr7EA-XNZVkkjGNYgJHcfUrFEuQS2xcLu8_LUFGt4qLGPd8ft6X8QwhYMblr-HSnUc_E5GGwHRMxmKa1aOJbSSXCg',
  },
  {
    id: 'm1', cat: 'medical', catLabel: '50-Bed Field ICU', crowdLabel: 'Sector Hospital A',
    name: 'Kumbh Central Emergency Medical Center', sub: 'Adjacent to Ram Kund Bridge',
    lat: 20.0063, lng: 73.7900, emoji: '🏥', crowd: 'Ready', wait: '18 Doctors',
    open: '24 Hours', dist: '800 m', walkTime: '6 min walk',
    amenities: ['Emergency ICU', 'Mobile ECG Unit', 'Oxygen Bank', 'Blood Bank', 'Ambulance On-Call'],
    event: 'Direct Line: 108 | Command: 1077',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMf7cw1FidMnJUlDTy5cMnPRtnQYSO7YTDs013uMW1LKEyRr8TRaDkG5HtthE5pXyuAGeq19CXSld7XHQxIEOvyU0bFeEUbZK0mSmAD5cI_GDv-jNlQmvp2Rrjace7lkhfAePENFKb5fBzwgc4suzOkiNEd37aTmVaCAT22OHVL9zPbWlpT16xuafmmvCNK6jMO_0QPnl4GMVJKFVWN4J9_E60ehjZV0cHi4v2eYeWtNmXZdsWwJSelQ',
  },
  {
    id: 'p1', cat: 'parking', catLabel: 'Electric Bus Terminal', crowdLabel: 'Hub 01',
    name: 'Nashik Road Station – Panchavati Shuttle', sub: 'Frequent transfers to Ramwadi & Tapovan',
    lat: 20.0020, lng: 73.7850, emoji: '🅿️', crowd: 'Low', wait: 'Departs every 5 min',
    open: '24 Hours Fleet', dist: '8.5 km', walkTime: 'Free EV Bus',
    amenities: ['Free EV Shuttle', 'Real-time Tracking', 'AC Buses', 'Wheelchair Ramp'],
    event: 'Last Bus: 11:30 PM from Panchavati',
    navigate: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUe2iU1zFe4tdmgsvTfcRSQBTr1n1LMElnSCQgtUqYKoEN2-FZZ_D4q0rZ1KsKcP4t9Bh99orMw8kbVs8FvpCGg1v6BgEVGioyOLQ21pLM0Qfmia2_6g6UhEviVTbUA2Ft5lEZYcbTJFwBMXK3R3w9Vh0UyeciSWTHOjath1Mb3KmTLDMs3NQyw2hnwRzdSxo-EUNH0Ak6PPDlUODzC8cBWamuj1WiiiOEQ2HnpL6rqlISbytNDlrz5g',
  },
];

const CATS = [
  { id: 'all', label: 'All Points' },
  { id: 'temple', label: 'Temples & Shrines' },
  { id: 'ghat', label: 'Holy Ghats' },
  { id: 'camp', label: 'Camps & Akhadás' },
  { id: 'food', label: 'Bhandara & Food' },
  { id: 'medical', label: 'Medical' },
  { id: 'parking', label: 'Parking & Bus' },
];

const CROWD_COLOR: Record<string, string> = {
  'Very High': '#ba1a1a', High: '#e65100', Moderate: '#755717',
  Low: '#2e7d32', Open: '#3e6374', Ready: '#1565c0',
};
const CROWD_BG: Record<string, string> = {
  'Very High': '#ffdad6', High: '#ffdbca', Moderate: '#ffdea5',
  Low: '#d4edda', Open: '#bee5fa', Ready: '#dbeafe',
};

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type LocItem = typeof KUMBH_LOCATIONS[0];

const MS = ({ name, cls = '' }: { name: string; cls?: string }) => (
  <span className={`material-symbols-outlined ${cls}`}>{name}</span>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export const KumbhSmartMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const routeLayerRef = useRef<any>(null);

  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoc, setSelectedLoc] = useState<LocItem | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Location
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [locLoading, setLocLoading] = useState(false);

  // Route
  const [showRoute, setShowRoute] = useState(false);
  const [travelMode, setTravelMode] = useState<'walking' | 'driving'>('walking');
  const [routeInfo, setRouteInfo] = useState<{ km: number; mins: number } | null>(null);

  const filtered = KUMBH_LOCATIONS.filter(loc => {
    const catOk = selectedCat === 'all' || loc.cat === selectedCat;
    const q = searchQuery.toLowerCase();
    const searchOk = !q || loc.name.toLowerCase().includes(q) || loc.sub.toLowerCase().includes(q) || loc.catLabel.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  // ── Init Leaflet ──
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;
    let destroyed = false;

    import('leaflet').then((L) => {
      if (destroyed || !mapContainerRef.current || mapRef.current) return;
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      const map = L.map(mapContainerRef.current, { center: [20.0059, 73.7918], zoom: 14, zoomControl: false });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 19 }).addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapRef.current = map;
      setMapReady(true);
    });

    return () => {
      destroyed = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  // ── Auto-request Location on mount ──
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
        },
        () => {}, // Ignore errors silently on mount
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // ── Update markers ──
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    import('leaflet').then((L) => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      filtered.forEach(loc => {
        const isSelected = selectedLoc?.id === loc.id;
        const color = CROWD_COLOR[loc.crowd] || '#984300';
        const size = isSelected ? 46 : 36;
        const ring = isSelected ? `box-shadow:0 0 0 4px ${color}44,0 3px 14px rgba(0,0,0,0.4);` : 'box-shadow:0 2px 8px rgba(0,0,0,0.3);';
        const html = `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:3px solid white;${ring}display:flex;align-items:center;justify-content:center;font-size:${isSelected ? 22 : 17}px;cursor:pointer;transition:all 0.2s;">${loc.emoji}</div>`;
        const icon = L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size] });
        const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(mapRef.current);
        marker.on('click', () => { handleSelectLoc(loc); });
        markersRef.current.push(marker);
      });
    });
  }, [mapReady, selectedCat, searchQuery, selectedLoc?.id]);

  const handleSelectLoc = (loc: LocItem) => {
    setSelectedLoc(loc);
    setRouteInfo(null);
    mapRef.current?.flyTo([loc.lat, loc.lng], 15, { duration: 0.7 });
  };

  // ── Locate Me ──
  const locateMe = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation) {
        console.error('Geolocation not supported');
        reject();
        return;
      }
      setLocLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          setUserLat(lat); setUserLng(lng); setLocLoading(false);
          import('leaflet').then((L) => {
            if (!mapRef.current) return;
            userMarkerRef.current?.remove();
            const html = `<div style="width:18px;height:18px;border-radius:50%;background:#1a73e8;border:3px solid white;box-shadow:0 0 0 6px rgba(26,115,232,0.2);"></div>`;
            const icon = L.divIcon({ html, className: '', iconSize: [18, 18], iconAnchor: [9, 9] });
            userMarkerRef.current = L.marker([lat, lng], { icon }).bindPopup('<b>Your Location</b>').addTo(mapRef.current);
            mapRef.current.flyTo([lat, lng], 15, { duration: 0.9 });
          });
          resolve();
        },
        (err) => { 
          console.error('Location access denied'); 
          setLocLoading(false); 
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  }, []);

  // ── Get Directions → Map Polyline + Google Maps Link ──
  const getDirections = useCallback(async (loc: LocItem, mode: 'walking' | 'driving' = travelMode) => {
    let currentLat = userLat;
    let currentLng = userLng;

    if (!currentLat || !currentLng) {
      try {
        await locateMe();
        // The state isn't immediately updated in this closure, but we can get it via another locateMe call if we want, or just rely on the fallback below for this first click.
        alert("Location found! Please click navigate again to draw route.");
        return;
      } catch {
        alert("Could not get your location. Using Nashik center as start point.");
        currentLat = 20.0059;
        currentLng = 73.7918;
      }
    }

    const fromLat = currentLat ?? 20.0059;
    const fromLng = currentLng ?? 73.7918;

    // Fetch real road route from OSRM Public API
    const profile = mode === 'walking' ? 'foot' : 'driving';
    try {
      const res = await fetch(`https://router.project-osrm.org/route/v1/${profile}/${fromLng},${fromLat};${loc.lng},${loc.lat}?overview=full&geometries=geojson`);
      const data = await res.json();
      
      if (data.routes && data.routes[0]) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]); // OSRM gives [lng, lat], Leaflet needs [lat, lng]
        
        import('leaflet').then((L) => {
          routeLayerRef.current?.remove();
          const color = mode === 'walking' ? '#984300' : '#1565c0';
          routeLayerRef.current = L.polyline(coordinates, { color, weight: 6, opacity: 0.8, dashArray: mode === 'walking' ? '10 8' : undefined }).addTo(mapRef.current);
          mapRef.current.fitBounds(L.latLngBounds(coordinates), { padding: [60, 60] });
        });

        // Use real distance and duration from OSRM
        setRouteInfo({ km: Math.round((route.distance / 1000) * 10) / 10, mins: Math.round(route.duration / 60) });
      } else {
        throw new Error("No route found");
      }
    } catch (err) {
      console.error("OSRM Routing failed, falling back to straight line:", err);
      // Fallback straight line
      import('leaflet').then((L) => {
        routeLayerRef.current?.remove();
        const color = mode === 'walking' ? '#984300' : '#1565c0';
        routeLayerRef.current = L.polyline([[fromLat, fromLng], [loc.lat, loc.lng]], { color, weight: 5, opacity: 0.85, dashArray: mode === 'walking' ? '10 6' : undefined }).addTo(mapRef.current);
        mapRef.current.fitBounds(L.latLngBounds([[fromLat, fromLng], [loc.lat, loc.lng]]), { padding: [80, 80] });
      });
      const km = haversineKm(fromLat, fromLng, loc.lat, loc.lng);
      const speed = mode === 'walking' ? 5 : 40;
      setRouteInfo({ km: Math.round(km * 10) / 10, mins: Math.round((km / speed) * 60) });
    }
  }, [userLat, userLng, travelMode, locateMe]);

  return (
    <div className="flex w-full h-full overflow-hidden">

      {/* ══════════════════════════════════════════════════════════ */}
      {/* LEFT SIDEBAR                                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <aside className="w-[300px] xl:w-[320px] shrink-0 h-full flex flex-col bg-white border-r border-[#e5e2dd] shadow-md z-10">

        {/* ── Header ── */}
        <div className="px-4 pt-4 pb-3 border-b border-[#f0ede9]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#984300] animate-pulse" />
            <span className="text-[10px] uppercase font-bold text-[#984300] tracking-widest">Live Kumbh Telemetry</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-[17px] font-bold text-[#1c1c19] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Kumbh Navigation & Smart Map
              </h1>
              <p className="text-[11px] text-[#564339] mt-0.5">Real-time navigation across Nashik, Panchavati & Trimbakeshwar</p>
            </div>
            <button onClick={() => window.location.reload()} className="shrink-0 w-7 h-7 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#564339] hover:bg-[#ebe8e3] transition-colors mt-0.5">
              <MS name="sync" cls="text-[16px]" />
            </button>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="px-3 py-2.5 border-b border-[#f0ede9]">
          <div className="relative">
            <MS name="search" cls="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#897267] text-[18px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search temples, ghats, camps, parking, med"
              className="w-full h-9 pl-9 pr-8 bg-[#f6f3ee] rounded-lg text-[12px] text-[#1c1c19] placeholder:text-[#897267] focus:outline-none focus:ring-1 focus:ring-[#984300] focus:bg-white transition-colors"
            />
            {searchQuery
              ? <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2"><MS name="close" cls="text-[16px] text-[#ba1a1a]" /></button>
              : <button className="absolute right-2.5 top-1/2 -translate-y-1/2"><MS name="tune" cls="text-[16px] text-[#897267]" /></button>
            }
          </div>
        </div>

        {/* ── Category chips ── */}
        <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-b border-[#f0ede9]" style={{ scrollbarWidth: 'none' }}>
          {CATS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                selectedCat === cat.id
                  ? 'bg-[#1c1c19] text-white border-[#1c1c19]'
                  : 'bg-white text-[#564339] border-[#e5e2dd] hover:border-[#984300]'
              }`}
            >
              {cat.id === 'all' && <MS name="my_location" cls="text-[13px]" />}
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Stats bar ── */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-[#f0ede9] bg-[#fcf9f4]">
          <span className="text-[11px] text-[#564339]">
            Showing <span className="font-bold text-[#1c1c19]">{filtered.length}</span> verified places in Panchavati
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]" />
            <span className="text-[10px] font-semibold text-[#2e7d32]">Traffic: Parva Flow</span>
          </div>
        </div>

        {/* ── Locate Me button ── */}
        <div className="px-3 py-2 border-b border-[#f0ede9]">
          <button
            onClick={locateMe}
            className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold border transition-all ${
              userLat ? 'bg-[#1565c0] text-white border-[#1565c0]' : 'bg-white text-[#1565c0] border-[#1565c0] hover:bg-[#1565c0] hover:text-white'
            }`}
          >
            {locLoading
              ? <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
              : <MS name="my_location" cls="text-[16px]" />
            }
            {userLat ? 'Location Active — Re-Locate' : locLoading ? 'Getting Location...' : 'Show My Location on Map'}
          </button>
        </div>

        {/* ── Location Cards List ── */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map(loc => {
            const isSelected = selectedLoc?.id === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => handleSelectLoc(loc)}
                className={`px-4 py-3 border-b border-[#f0ede9] cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#fff8f3] border-l-4 border-l-[#984300]' : 'hover:bg-[#fcf9f4] border-l-4 border-l-transparent'
                }`}
              >
                {/* Row 1: badges + distance */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: CROWD_BG[loc.crowd] || '#f0ede9', color: CROWD_COLOR[loc.crowd] || '#984300' }}>
                      {loc.catLabel}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: CROWD_BG[loc.crowd] || '#f0ede9', color: CROWD_COLOR[loc.crowd] || '#984300' }}>
                      {loc.crowdLabel}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[13px] font-bold text-[#1c1c19]">{loc.dist}</div>
                    <div className="text-[10px] text-[#564339]">{loc.walkTime}</div>
                  </div>
                </div>

                {/* Row 2: Name */}
                <h3 className="text-[14px] font-bold text-[#1c1c19] leading-snug mb-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {loc.name}
                </h3>

                {/* Row 3: Sub */}
                <p className="text-[11px] text-[#564339] truncate mb-1.5">{loc.sub}</p>

                {/* Row 4: Status row */}
                <div className="flex items-center gap-3 text-[10px] text-[#564339]">
                  <span className="flex items-center gap-0.5">
                    <MS name="schedule" cls="text-[12px] text-[#755717]" />
                    Wait: {loc.wait}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MS name="door_open" cls="text-[12px] text-[#3e6374]" />
                    {loc.open}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); getDirections(loc); }}
                    className="ml-auto flex items-center gap-0.5 text-[#3e6374] hover:text-[#984300] font-bold transition-colors"
                  >
                    Navigate <MS name="arrow_forward" cls="text-[12px]" />
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <MS name="search_off" cls="text-[48px] text-[#e5e2dd] mb-3" />
              <p className="text-[13px] font-semibold text-[#564339]">No locations match</p>
              <p className="text-[11px] text-[#897267] mt-1">Try a different search or category</p>
            </div>
          )}
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* RIGHT MAP PANEL                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="flex-1 relative flex flex-col">

        {/* ── Top Filter Bar ── */}
        <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-3 pb-2 flex items-center gap-2 flex-wrap">
          {/* Filter pills */}
          {[
            { icon: 'thermostat', label: 'Crowd Density Heatmap', active: true },
            { icon: 'remove_road', label: 'Road Closures & Barricades' },
            { icon: 'directions_walk', label: 'Shaded Snan Walkways' },
            { icon: 'contrast', label: 'Pilgrim High-Contrast' },
          ].map(btn => (
            <button
              key={btn.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all shadow-sm ${
                btn.active ? 'bg-white text-[#984300] border-[#984300]' : 'bg-white/90 backdrop-blur-md text-[#564339] border-[#e5e2dd] hover:border-[#984300]'
              }`}
            >
              <MS name={btn.icon} cls="text-[14px]" />
              {btn.label}
            </button>
          ))}

          {/* SOS */}
          <a
            href="tel:112"
            className="ml-auto flex items-center gap-1.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white px-4 py-1.5 rounded-xl text-[12px] font-bold shadow-md transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            SOS Nearest Aid
          </a>

          {/* My location */}
          <button
            onClick={locateMe}
            className="w-9 h-9 bg-white rounded-xl shadow-md flex items-center justify-center text-[#1565c0] border border-[#e5e2dd] hover:bg-[#f0f4ff] transition-colors"
            title="My Location"
          >
            {locLoading
              ? <span className="w-4 h-4 rounded-full border-2 border-[#1565c0] border-t-transparent animate-spin" />
              : <MS name="my_location" cls="text-[18px]" />
            }
          </button>
        </div>

        {/* ── The Map ── */}
        <div ref={mapContainerRef} className="absolute inset-0 z-0" />

        {/* Loading overlay */}
        {!mapReady && (
          <div className="absolute inset-0 z-10 bg-[#f0ede9] flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-[#984300] border-t-transparent animate-spin" />
            <span className="text-[#564339] font-semibold">Loading Nashik Map...</span>
          </div>
        )}

        {/* ── Bottom Legend ── */}
        <div className="absolute bottom-5 left-4 z-20 flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-[#e5e2dd]">
          {[['Heavy Crowd', '#ba1a1a'], ['Moderate Flow', '#755717'], ['Free Movement', '#2e7d32'], ['Shaded Corridor', '#3e6374']].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
              <span className="text-[10px] font-semibold text-[#1c1c19]">{label}</span>
            </div>
          ))}
        </div>

        {/* ══ ACTIVE SELECTION DETAIL CARD (Right Overlay) ══ */}
        {selectedLoc && (
          <div
            className="absolute top-14 right-4 z-30 w-[300px] bg-white rounded-2xl shadow-2xl border border-[#e5e2dd] overflow-hidden"
            style={{ animation: 'kumbhFadeSlide 0.22s ease-out' }}
          >
            {/* Image header */}
            <div className="relative h-44 bg-gray-100">
              <img src={selectedLoc.img} alt={selectedLoc.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <button
                onClick={() => { setSelectedLoc(null); routeLayerRef.current?.remove(); setRouteInfo(null); }}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <MS name="close" cls="text-[16px]" />
              </button>
              <div className="absolute bottom-2.5 left-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] uppercase font-bold text-[#ffb68e] tracking-widest bg-black/30 px-1.5 py-0.5 rounded">ACTIVE SELECTION</span>
                  <span className="text-[9px] text-white/70">Panchavati Sector 1</span>
                </div>
                <h3 className="text-[16px] font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {selectedLoc.name}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-3 space-y-2.5">
              {/* Access + Queue */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#f6f3ee] rounded-xl p-2.5">
                  <div className="text-[10px] text-[#564339] mb-0.5 flex items-center gap-1">
                    <MS name="directions_walk" cls="text-[13px]" /> Pedestrian Access
                  </div>
                  <div className="text-[13px] font-bold text-[#1c1c19]">{selectedLoc.dist}</div>
                  <div className="text-[10px] text-[#564339]">{selectedLoc.walkTime}</div>
                </div>
                <div className="bg-[#f6f3ee] rounded-xl p-2.5">
                  <div className="text-[10px] text-[#564339] mb-0.5 flex items-center gap-1">
                    <MS name="trending_up" cls="text-[13px]" /> Current Queue Speed
                  </div>
                  <div className="text-[12px] font-bold" style={{ color: CROWD_COLOR[selectedLoc.crowd] || '#984300' }}>
                    {selectedLoc.crowd} ({selectedLoc.wait})
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="text-[10px] font-bold text-[#564339] uppercase tracking-wider mb-1.5">Amenities & Safety:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedLoc.amenities.map(a => (
                    <span key={a} className="flex items-center gap-0.5 px-2 py-0.5 bg-[#f0ede9] rounded-lg text-[10px] font-semibold text-[#1c1c19]">
                      <MS name="check_small" cls="text-[12px] text-[#2e7d32]" /> {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Event */}
              <div className="flex items-start justify-between gap-2 bg-[#fff8f3] rounded-xl px-2.5 py-2 border border-[#ffdbca]">
                <div className="flex items-center gap-1.5">
                  <MS name="event" cls="text-[16px] text-[#984300]" />
                  <span className="text-[11px] font-semibold text-[#1c1c19]">{selectedLoc.event}</span>
                </div>
                <span className="text-[10px] font-bold text-[#984300] shrink-0 mt-0.5">Timetable</span>
              </div>

              {/* Route info if available */}
              {routeInfo && (
                <div className="flex items-center gap-3 bg-[#e8f5e9] rounded-xl px-3 py-2 border border-[#2e7d32]/20">
                  <MS name="straighten" cls="text-[16px] text-[#2e7d32]" />
                  <span className="text-[12px] font-bold text-[#2e7d32]">{routeInfo.km} km</span>
                  <MS name="schedule" cls="text-[16px] text-[#2e7d32]" />
                  <span className="text-[12px] font-bold text-[#2e7d32]">~{routeInfo.mins} min {travelMode}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-0.5">
                {/* Mode toggle */}
                <div className="flex rounded-xl overflow-hidden border border-[#e5e2dd] shrink-0">
                  <button
                    onClick={() => setTravelMode('walking')}
                    className={`px-2.5 py-1.5 text-[11px] font-bold flex items-center gap-1 transition-colors ${travelMode === 'walking' ? 'bg-[#984300] text-white' : 'bg-white text-[#564339]'}`}
                  >
                    <MS name="directions_walk" cls="text-[13px]" /> Walk
                  </button>
                  <button
                    onClick={() => setTravelMode('driving')}
                    className={`px-2.5 py-1.5 text-[11px] font-bold flex items-center gap-1 border-l border-[#e5e2dd] transition-colors ${travelMode === 'driving' ? 'bg-[#984300] text-white' : 'bg-white text-[#564339]'}`}
                  >
                    <MS name="directions_car" cls="text-[13px]" /> Drive
                  </button>
                </div>

                <button
                  onClick={() => getDirections(selectedLoc, travelMode)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#984300] hover:bg-[#ba5814] text-white py-2 rounded-xl text-[12px] font-bold transition-colors shadow-sm"
                >
                  <MS name="navigation" cls="text-[15px]" />
                  {travelMode === 'walking' ? 'Walking Route' : 'Driving Route'}
                </button>
                <button
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${selectedLoc.lat},${selectedLoc.lng}`;
                    window.open(url, '_blank');
                  }}
                  className="w-9 h-9 shrink-0 rounded-xl border border-[#e5e2dd] bg-white flex items-center justify-center text-[#564339] hover:bg-[#f0ede9] transition-colors"
                >
                  <MS name="share" cls="text-[16px]" />
                </button>
                <button className="w-9 h-9 shrink-0 rounded-xl border border-[#e5e2dd] bg-white flex items-center justify-center text-[#564339] hover:bg-[#f0ede9] transition-colors">
                  <MS name="bookmark" cls="text-[16px]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes kumbhFadeSlide {
          from { opacity: 0; transform: translateY(-12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
