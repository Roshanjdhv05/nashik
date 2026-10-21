'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { SanitizedMember } from '@/lib/connectedStore';
import { Locate, Navigation, Layers, Compass } from 'lucide-react';

interface ConnectedMapProps {
  members: SanitizedMember[];
  currentMemberId: string;
  onSelectMember?: (member: SanitizedMember) => void;
  selectedMemberId?: string | null;
}

const KUMBH_LANDMARKS = [
  { name: 'Ram Kund Sacred Ghat', lat: 20.0059, lng: 73.7918, icon: '🛕' },
  { name: 'Shree Kalaram Mandir', lat: 20.0048, lng: 73.7895, icon: '🛕' },
  { name: 'Panchavati & Sita Gufa', lat: 20.0054, lng: 73.7910, icon: '🛕' },
  { name: 'Tapovan Akhada Camps', lat: 20.0082, lng: 73.7960, icon: '⛺' },
  { name: 'Trimbakeshwar Temple', lat: 19.9329, lng: 73.5300, icon: '🔱' },
  { name: 'Someshwar Ghat', lat: 20.0290, lng: 73.7840, icon: '🌊' },
];

function formatTimeAgo(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 15) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  return `${diffHr}h ago`;
}

function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

export function ConnectedMap({
  members,
  currentMemberId,
  onSelectMember,
  selectedMemberId,
}: ConnectedMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const landmarksLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accuracyLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionLinesLayerRef = useRef<any>(null);

  const [showLandmarks, setShowLandmarks] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  // Sharing members with valid coordinates
  const sharingMembers = members.filter(
    (m) => m.isSharing && m.location && typeof m.location.lat === 'number' && typeof m.location.lng === 'number'
  );

  const currentMember = members.find((m) => m.id === currentMemberId);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isCancelled = false;

    import('leaflet').then((L) => {
      if (isCancelled || !mapContainerRef.current) return;

      // Default center: Ram Kund, Nashik
      const defaultCenter: [number, number] = [20.0059, 73.7918];

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      // Warm spiritual themed map tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Attribution bottom right
      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

      // Layer groups
      landmarksLayerRef.current = L.layerGroup().addTo(map);
      accuracyLayerRef.current = L.layerGroup().addTo(map);
      connectionLinesLayerRef.current = L.layerGroup().addTo(map);
      markersLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      setMapReady(true);

      // Force recalculation of container dimensions
      setTimeout(() => {
        if (!isCancelled && map) {
          map.invalidateSize();
        }
      }, 100);
      setTimeout(() => {
        if (!isCancelled && map) {
          map.invalidateSize();
        }
      }, 400);

      try {
        const ro = new ResizeObserver(() => {
          if (!isCancelled && map) {
            map.invalidateSize();
          }
        });
        if (mapContainerRef.current) {
          ro.observe(mapContainerRef.current);
        }
      } catch {
        // ResizeObserver optional
      }
    });

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render Landmarks
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !landmarksLayerRef.current) return;

    import('leaflet').then((L) => {
      landmarksLayerRef.current.clearLayers();

      if (!showLandmarks) return;

      KUMBH_LANDMARKS.forEach((lm) => {
        const iconHtml = `
          <div class="kumbh-landmark-marker flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full border border-[#984300]/30 shadow-md text-[11px] font-bold text-[#1c1c19] whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2">
            <span class="text-sm">${lm.icon}</span>
            <span>${lm.name}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: '',
          iconSize: [0, 0],
        });

        const marker = L.marker([lm.lat, lm.lng], { icon: customIcon });
        marker.bindPopup(`
          <div class="p-1 text-xs">
            <p class="font-bold text-sm text-[#984300]">${lm.name}</p>
            <p class="text-slate-500 mt-0.5">Key Kumbh Mela Assembly Landmark</p>
          </div>
        `);
        landmarksLayerRef.current.addLayer(marker);
      });
    });
  }, [mapReady, showLandmarks]);

  // 3. Render Sharing Members Markers & Accuracy Halos
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !markersLayerRef.current) return;

    import('leaflet').then((L) => {
      markersLayerRef.current.clearLayers();
      accuracyLayerRef.current.clearLayers();
      connectionLinesLayerRef.current.clearLayers();

      const myLoc = currentMember?.location;

      sharingMembers.forEach((member) => {
        if (!member.location) return;
        const { lat, lng, accuracy } = member.location;
        const isMe = member.id === currentMemberId;
        const isSelected = member.id === selectedMemberId;

        // Render accuracy circle
        if (accuracy && accuracy < 500) {
          const circle = L.circle([lat, lng], {
            radius: Math.max(accuracy, 12),
            color: isMe ? '#0284c7' : member.avatarColor || '#984300',
            fillColor: isMe ? '#0284c7' : member.avatarColor || '#984300',
            fillOpacity: 0.12,
            weight: 1,
            dashArray: '4, 4',
          });
          accuracyLayerRef.current.addLayer(circle);
        }

        // Draw dotted line between me and selected member
        if (!isMe && isSelected && myLoc) {
          const polyline = L.polyline(
            [
              [myLoc.lat, myLoc.lng],
              [lat, lng],
            ],
            {
              color: '#984300',
              weight: 3,
              dashArray: '6, 8',
              opacity: 0.8,
            }
          );
          connectionLinesLayerRef.current.addLayer(polyline);
        }

        // Distance from current user
        let distanceLabel = '';
        if (!isMe && myLoc) {
          const distM = calculateDistanceMeters(myLoc.lat, myLoc.lng, lat, lng);
          distanceLabel = distM < 1000 ? `${distM}m away` : `${(distM / 1000).toFixed(1)}km away`;
        }

        const initial = (member.name || 'M').charAt(0).toUpperCase();
        const timeAgo = formatTimeAgo(member.lastUpdated);

        // Marker HTML
        const markerHtml = `
          <div class="group cursor-pointer flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
            <!-- Pulsing outer halo -->
            <div class="relative flex items-center justify-center">
              <span class="absolute w-12 h-12 rounded-full animate-ping opacity-35" style="background-color: ${isMe ? '#0284c7' : member.avatarColor};"></span>
              <div class="relative w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-xl border-2 ${
                isSelected ? 'border-amber-300 scale-110 ring-4 ring-amber-400/50' : 'border-white'
              }" style="background-color: ${isMe ? '#0284c7' : member.avatarColor};">
                ${initial}
                ${isMe ? '<span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>' : ''}
              </div>
            </div>

            <!-- Label pill -->
            <div class="mt-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full border border-slate-200 shadow-md flex items-center gap-1 whitespace-nowrap text-[11px] font-bold text-slate-800">
              <span>${isMe ? 'You' : member.name}</span>
              ${distanceLabel ? `<span class="text-[9.5px] font-semibold text-[#984300]">(${distanceLabel})</span>` : ''}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: '',
          iconSize: [0, 0],
        });

        const marker = L.marker([lat, lng], { icon: customIcon });

        marker.on('click', () => {
          if (onSelectMember) {
            onSelectMember(member);
          }
        });

        marker.bindPopup(`
          <div class="p-2 min-w-[180px] text-xs font-sans">
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-7 h-7 rounded-full text-white font-bold flex items-center justify-center text-xs" style="background-color: ${member.avatarColor || '#984300'};">
                ${initial}
              </div>
              <div>
                <h4 class="font-bold text-sm text-[#1c1c19] leading-tight">${member.name}</h4>
                <p class="text-[10px] text-emerald-600 font-semibold">🟢 Live Sharing</p>
              </div>
            </div>
            ${distanceLabel ? `<p class="text-[#984300] font-bold mt-1">📍 Distance: ${distanceLabel}</p>` : ''}
            <p class="text-slate-500 text-[10px] mt-0.5">Updated: ${timeAgo}</p>
            ${member.phone ? `<a href="tel:${member.phone}" class="mt-2 block w-full py-1 text-center bg-[#984300] text-white rounded-lg font-bold text-xs">Call Member</a>` : ''}
          </div>
        `);

        markersLayerRef.current.addLayer(marker);
      });
    });
  }, [mapReady, sharingMembers, currentMemberId, selectedMemberId, onSelectMember]);

  // Center on Me
  const handleCenterOnMe = useCallback(() => {
    if (!mapInstanceRef.current) return;
    const myLoc = currentMember?.location;
    if (myLoc && typeof myLoc.lat === 'number') {
      mapInstanceRef.current.flyTo([myLoc.lat, myLoc.lng], 17, { duration: 1.2 });
    }
  }, [currentMember]);

  // Fit all sharing members in view
  const handleFitGroup = useCallback(() => {
    if (!mapInstanceRef.current || sharingMembers.length === 0) return;

    import('leaflet').then((L) => {
      const bounds = L.latLngBounds(
        sharingMembers.map((m) => [m.location!.lat, m.location!.lng])
      );
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 17,
      });
    });
  }, [sharingMembers]);

  return (
    <div
      className="relative w-full h-full min-h-[420px] bg-[#f2ede4] overflow-hidden"
      style={{ width: '100%', height: '100%', minHeight: '420px' }}
    >
      {/* Leaflet map DOM element */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-0"
        style={{ width: '100%', height: '100%', minHeight: '420px' }}
      />

      {/* Loading state until Leaflet initializes */}
      {!mapReady && (
        <div className="absolute inset-0 z-10 bg-[#f7f4ed] flex flex-col items-center justify-center gap-2">
          <div className="w-9 h-9 rounded-full border-3 border-[#984300]/20 border-t-[#984300] animate-spin" />
          <p className="text-xs font-bold text-[#564339]">Loading Kumbh Sacred Map...</p>
        </div>
      )}

      {/* Floating Action Controls */}
      <div className="absolute top-3 right-3 z-[100] flex flex-col gap-2">
        {/* Fit Group button */}
        {sharingMembers.length > 0 && (
          <button
            onClick={handleFitGroup}
            title="Fit All Members on Map"
            className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-[#e5e2dd] text-[#3c2e28] flex items-center justify-center hover:bg-white active:scale-95 transition"
          >
            <Compass className="w-5 h-5 text-[#984300]" />
          </button>
        )}

        {/* Center on Me button */}
        {currentMember?.isSharing && (
          <button
            onClick={handleCenterOnMe}
            title="Center on My Location"
            className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-[#e5e2dd] text-[#3c2e28] flex items-center justify-center hover:bg-white active:scale-95 transition"
          >
            <Locate className="w-5 h-5 text-sky-600" />
          </button>
        )}

        {/* Toggle Landmarks button */}
        <button
          onClick={() => setShowLandmarks((prev) => !prev)}
          title={showLandmarks ? 'Hide Landmarks' : 'Show Holy Landmarks'}
          className={`w-10 h-10 rounded-2xl backdrop-blur-md shadow-lg border flex items-center justify-center active:scale-95 transition ${
            showLandmarks
              ? 'bg-[#984300] text-white border-[#984300]'
              : 'bg-white/95 text-[#786d66] border-[#e5e2dd]'
          }`}
        >
          <Layers className="w-5 h-5" />
        </button>
      </div>

      {/* No one sharing overlay banner */}
      {sharingMembers.length === 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-[90] md:left-auto md:right-4 md:max-w-sm">
          <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-amber-200 shadow-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-800 font-bold">
              📍
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900 leading-tight">No live locations shared yet</p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Tap <b>&ldquo;Share My Live Location&rdquo;</b> above to broadcast your position to your group.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
