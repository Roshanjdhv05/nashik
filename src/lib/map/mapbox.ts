/**
 * Mapbox configuration and initialization helpers
 * All token/secret handling is done here, never in components
 */

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

/** Default map center: Nashik / Panchavati (Ram Kund area) */
export const NASHIK_CENTER: [number, number] = [73.7918, 20.0059];

/** Default zoom level for the Nashik Kumbh area */
export const NASHIK_DEFAULT_ZOOM = 14;

/** Mapbox style - light, clean, good for POI overlays */
export const MAPBOX_STYLE = 'mapbox://styles/mapbox/light-v11';

/** Bounds around Nashik-Trimbakeshwar Kumbh area */
export const KUMBH_BOUNDS: [[number, number], [number, number]] = [
  [73.45, 19.87], // SW
  [73.92, 20.08], // NE
];

export type MapCrowdLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';

export type MapCategory =
  | 'TEMPLE'
  | 'GHAT'
  | 'AKHADA'
  | 'CAMP'
  | 'HOTEL'
  | 'RESTAURANT'
  | 'ANNADAN'
  | 'HOSPITAL'
  | 'POLICE'
  | 'FIRE_STATION'
  | 'TOILET'
  | 'PARKING'
  | 'BUS_STOP'
  | 'RAILWAY'
  | 'WATER'
  | 'HELP_CENTRE'
  | 'PHARMACY'
  | 'ATM'
  | 'PETROL';

export interface MapLocation {
  id: string;
  name: string;
  slug: string;
  category: MapCategory;
  subcategory?: string;
  latitude: number;
  longitude: number;
  address?: string;
  description?: string;
  image_url?: string;
  phone?: string;
  website?: string;
  opening_time?: string;
  closing_time?: string;
  crowd_level?: MapCrowdLevel;
  crowd_updated_at?: string;
  facilities?: string[];
  amenities?: string[];
  is_verified: boolean;
  verified_at?: string;
  is_active: boolean;
  active_from?: string;
  active_until?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryConfig {
  id: MapCategory;
  label: string;
  icon: string; // Material Symbols icon name
  color: string; // Tailwind CSS color (hex)
  markerColor: string; // hex for map marker bg
  markerTextColor: string; // hex for marker icon/text
}

export const CATEGORY_CONFIG: Record<MapCategory, CategoryConfig> = {
  TEMPLE: {
    id: 'TEMPLE',
    label: 'Temples',
    icon: 'temple_hindu',
    color: '#984300',
    markerColor: '#984300',
    markerTextColor: '#ffffff',
  },
  GHAT: {
    id: 'GHAT',
    label: 'Holy Ghats',
    icon: 'water',
    color: '#3e6374',
    markerColor: '#3e6374',
    markerTextColor: '#ffffff',
  },
  AKHADA: {
    id: 'AKHADA',
    label: 'Akhadas',
    icon: 'account_balance',
    color: '#755717',
    markerColor: '#755717',
    markerTextColor: '#ffffff',
  },
  CAMP: {
    id: 'CAMP',
    label: 'Camps',
    icon: 'holiday_village',
    color: '#ba5814',
    markerColor: '#ba5814',
    markerTextColor: '#ffffff',
  },
  HOTEL: {
    id: 'HOTEL',
    label: 'Hotels',
    icon: 'hotel',
    color: '#426879',
    markerColor: '#426879',
    markerTextColor: '#ffffff',
  },
  RESTAURANT: {
    id: 'RESTAURANT',
    label: 'Food',
    icon: 'restaurant',
    color: '#5d4201',
    markerColor: '#5d4201',
    markerTextColor: '#ffffff',
  },
  ANNADAN: {
    id: 'ANNADAN',
    label: 'Annadan',
    icon: 'soup_kitchen',
    color: '#90702e',
    markerColor: '#90702e',
    markerTextColor: '#ffffff',
  },
  HOSPITAL: {
    id: 'HOSPITAL',
    label: 'Hospitals',
    icon: 'local_hospital',
    color: '#ba1a1a',
    markerColor: '#ba1a1a',
    markerTextColor: '#ffffff',
  },
  POLICE: {
    id: 'POLICE',
    label: 'Police',
    icon: 'local_police',
    color: '#254b5c',
    markerColor: '#254b5c',
    markerTextColor: '#ffffff',
  },
  FIRE_STATION: {
    id: 'FIRE_STATION',
    label: 'Fire Station',
    icon: 'local_fire_department',
    color: '#93000a',
    markerColor: '#93000a',
    markerTextColor: '#ffffff',
  },
  TOILET: {
    id: 'TOILET',
    label: 'Toilets',
    icon: 'wc',
    color: '#564339',
    markerColor: '#564339',
    markerTextColor: '#ffffff',
  },
  PARKING: {
    id: 'PARKING',
    label: 'Parking',
    icon: 'local_parking',
    color: '#1c1c19',
    markerColor: '#1c1c19',
    markerTextColor: '#ffffff',
  },
  BUS_STOP: {
    id: 'BUS_STOP',
    label: 'Bus Stops',
    icon: 'directions_bus',
    color: '#3e6374',
    markerColor: '#3e6374',
    markerTextColor: '#ffffff',
  },
  RAILWAY: {
    id: 'RAILWAY',
    label: 'Railway',
    icon: 'train',
    color: '#31302d',
    markerColor: '#31302d',
    markerTextColor: '#ffffff',
  },
  WATER: {
    id: 'WATER',
    label: 'Water Points',
    icon: 'water_drop',
    color: '#426879',
    markerColor: '#426879',
    markerTextColor: '#ffffff',
  },
  HELP_CENTRE: {
    id: 'HELP_CENTRE',
    label: 'Help Centres',
    icon: 'support_agent',
    color: '#773300',
    markerColor: '#773300',
    markerTextColor: '#ffffff',
  },
  PHARMACY: {
    id: 'PHARMACY',
    label: 'Pharmacy',
    icon: 'local_pharmacy',
    color: '#ba1a1a',
    markerColor: '#ba1a1a',
    markerTextColor: '#ffffff',
  },
  ATM: {
    id: 'ATM',
    label: 'ATMs',
    icon: 'atm',
    color: '#897267',
    markerColor: '#897267',
    markerTextColor: '#ffffff',
  },
  PETROL: {
    id: 'PETROL',
    label: 'Petrol',
    icon: 'local_gas_station',
    color: '#331200',
    markerColor: '#331200',
    markerTextColor: '#ffffff',
  },
};

export const CROWD_LEVEL_CONFIG = {
  LOW: { label: 'Low Crowd', color: '#3e6374', bg: '#bee5fa', textColor: '#001f2a' },
  MODERATE: { label: 'Moderate Crowd', color: '#755717', bg: '#ffdea5', textColor: '#261900' },
  HIGH: { label: 'High Crowd', color: '#ba5814', bg: '#ffb68e', textColor: '#331200' },
  VERY_HIGH: { label: 'Very High Crowd', color: '#ba1a1a', bg: '#ffdad6', textColor: '#93000a' },
};

/** Filter categories shown in the UI (subset for quick access) */
export const FILTER_CATEGORIES: Array<{ id: 'all' | MapCategory; label: string; icon: string }> = [
  { id: 'all', label: 'All', icon: 'explore' },
  { id: 'GHAT', label: 'Ghats', icon: 'water' },
  { id: 'TEMPLE', label: 'Temples', icon: 'temple_hindu' },
  { id: 'AKHADA', label: 'Akhadas', icon: 'account_balance' },
  { id: 'ANNADAN', label: 'Annadan', icon: 'soup_kitchen' },
  { id: 'RESTAURANT', label: 'Food', icon: 'restaurant' },
  { id: 'HOTEL', label: 'Hotels', icon: 'hotel' },
  { id: 'CAMP', label: 'Camps', icon: 'holiday_village' },
  { id: 'HOSPITAL', label: 'Medical', icon: 'local_hospital' },
  { id: 'POLICE', label: 'Police', icon: 'local_police' },
  { id: 'TOILET', label: 'Toilets', icon: 'wc' },
  { id: 'PARKING', label: 'Parking', icon: 'local_parking' },
  { id: 'HELP_CENTRE', label: 'Help', icon: 'support_agent' },
  { id: 'BUS_STOP', label: 'Bus', icon: 'directions_bus' },
];
