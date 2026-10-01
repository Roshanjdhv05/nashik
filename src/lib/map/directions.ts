/**
 * Mapbox Directions API wrapper
 * Uses the Mapbox Directions API for real routing
 */

import { MAPBOX_TOKEN } from './mapbox';

export type RouteProfile = 'walking' | 'driving';

export interface RouteResult {
  geometry: GeoJSON.LineString;
  distanceMeters: number;
  durationSeconds: number;
  distanceKm: number;
  durationMinutes: number;
}

/**
 * Fetch a real route between two points using Mapbox Directions API
 * Returns null if routing fails (no route found, network error, etc.)
 */
export async function fetchRoute(
  fromLng: number,
  fromLat: number,
  toLng: number,
  toLat: number,
  profile: RouteProfile = 'walking'
): Promise<RouteResult | null> {
  if (!MAPBOX_TOKEN) {
    console.warn('Mapbox token not set – cannot fetch route');
    return null;
  }

  const coordinates = `${fromLng},${fromLat};${toLng},${toLat}`;
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Directions API error:', res.status);
      return null;
    }
    const data = await res.json();
    if (!data.routes || data.routes.length === 0) return null;

    const route = data.routes[0];
    return {
      geometry: route.geometry,
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      distanceKm: Math.round(route.distance / 100) / 10,
      durationMinutes: Math.ceil(route.duration / 60),
    };
  } catch (err) {
    console.error('Directions fetch error:', err);
    return null;
  }
}
