export interface Temple {
  id: string;
  name: string;
  marathiName: string;
  hindiName: string;
  category: string;
  image: string;
  distanceKm: number;
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'Open' | 'Closed';
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  waitTimeMinutes: number;
  accessibility: boolean;
  wheelchairRamp: boolean;
  aartiTimings: string[];
  description: string;
  parkingAvailable: boolean;
  nearbyFacilities: { toilets: boolean; drinkingWater: boolean; medicalCamp: boolean; freeFood: boolean };
}

export interface Event {
  id: string;
  title: string;
  marathiTitle: string;
  category: 'Shahi Snan' | 'Snan' | 'Religious' | 'Akhada' | 'Cultural' | 'Aarti';
  date: string;
  time: string;
  location: string;
  coordinates: { lat: number; lng: number };
  crowdLevel: 'Moderate' | 'High' | 'Very High';
  isImportant: boolean;
  description: string;
}

export interface Accommodation {
  id: string;
  name: string;
  category: 'Hotel' | 'Budget Hotel' | 'Dharamshala' | 'Ashram' | 'Camp/Tent' | 'Bhakt Niwas';
  destinationArea: 'Ram Kund' | 'Trimbakeshwar' | 'Panchavati' | 'Sadhugram' | 'Nashik Road';
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  distanceFromGhatKm: number;
  address: string;
  image: string;
  amenities: string[];
  availableBeds: number;
  verified: boolean;
  contactNumber: string;
}

export interface Restaurant {
  id: string;
  name: string;
  type: 'Restaurant' | 'Bhandara / Free Food' | 'Prasad Counter';
  cuisine: string[];
  isPureVeg: boolean;
  isJainAvailable: boolean;
  priceForTwo: number;
  isFree: boolean;
  verifiedAt?: string;
  distanceKm: number;
  address: string;
  locationArea: string;
  timings: string;
  rating?: number;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  image: string;
}

export interface TransportRoute {
  id: string;
  mode: 'Bus Shuttle' | 'Auto / Cab' | 'Walking Route' | 'Special Train' | 'Airport Shuttle';
  origin: string;
  destination: string;
  fare: number;
  estimatedMinutes: number;
  frequency: string;
  status: 'Running' | 'Diverted' | 'Crowded';
  details: string;
  routeHighlights: string[];
}

export interface EmergencyCenter {
  id: string;
  name: string;
  type: 'Police' | 'Hospital' | 'Medical Camp' | 'Fire Station' | 'Help Centre' | 'Lost & Found Booth';
  phone: string;
  address: string;
  locationArea: string;
  coordinates: { lat: number; lng: number };
  openHours: string;
  bedsAvailable?: number;
  is24x7: boolean;
}

export interface Akhada {
  id: string;
  name: string;
  marathiName: string;
  sect: 'Shaiva' | 'Vaishnava' | 'Udasin';
  mahantName: string;
  locationArea: string;
  coordinates: { lat: number; lng: number };
  darshanTimings: string;
  description: string;
  image: string;
}

// Full Mock Dataset
export const TEMPLES_DATA: Temple[] = [
  {
    id: 't1',
    name: 'Ram Kund & Godavari Ghat',
    marathiName: 'रामकुंड आणि गोदावरी घाट',
    hindiName: 'रामकुण्ड एवं गोदावरी घाट',
    category: 'Holy Ghat / River',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    distanceKm: 0.2,
    location: 'Panchavati, Nashik',
    coordinates: { lat: 20.0059, lng: 73.7918 },
    status: 'Open',
    crowdLevel: 'Very High',
    waitTimeMinutes: 45,
    accessibility: true,
    wheelchairRamp: true,
    aartiTimings: ['06:00 AM (Prabhat)', '07:00 PM (Maha Aarti)'],
    description: 'The sacred bathing ghat where Lord Rama bathed during exile. The central epicenter of Kumbh Mela Snan.',
    parkingAvailable: false,
    nearbyFacilities: { toilets: true, drinkingWater: true, medicalCamp: true, freeFood: true }
  },
  {
    id: 't2',
    name: 'Trimbakeshwar Jyotirlinga Temple',
    marathiName: 'त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर',
    hindiName: 'त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर',
    category: 'Jyotirlinga Temple',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
    distanceKm: 28.5,
    location: 'Trimbak, Nashik',
    coordinates: { lat: 19.9322, lng: 73.5307 },
    status: 'Open',
    crowdLevel: 'High',
    waitTimeMinutes: 90,
    accessibility: true,
    wheelchairRamp: true,
    aartiTimings: ['05:30 AM', '12:00 PM (Madhyahna)', '07:30 PM (Evening)'],
    description: 'One of the 12 sacred Jyotirlingas of Lord Shiva. Source of the holy Godavari River at Brahmagiri hill.',
    parkingAvailable: true,
    nearbyFacilities: { toilets: true, drinkingWater: true, medicalCamp: true, freeFood: true }
  },
  {
    id: 't3',
    name: 'Kalaram Temple',
    marathiName: 'काळाराम मंदिर',
    hindiName: 'कालाराम मंदिर',
    category: 'Historic Temple',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    distanceKm: 0.6,
    location: 'Panchavati, Nashik',
    coordinates: { lat: 20.0084, lng: 73.7946 },
    status: 'Open',
    crowdLevel: 'Moderate',
    waitTimeMinutes: 20,
    accessibility: true,
    wheelchairRamp: true,
    aartiTimings: ['06:30 AM', '12:30 PM', '08:00 PM'],
    description: 'Famous 18th century black stone temple dedicated to Lord Rama, Lakshmana, and Goddess Sita.',
    parkingAvailable: true,
    nearbyFacilities: { toilets: true, drinkingWater: true, medicalCamp: true, freeFood: false }
  },
  {
    id: 't4',
    name: 'Muktidham Temple Complex',
    marathiName: 'मुक्तीधाम मंदिर संकुल',
    hindiName: 'मुक्तिधाम मंदिर',
    category: 'Marble Temple',
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=800&q=80',
    distanceKm: 7.2,
    location: 'Nashik Road, Nashik',
    coordinates: { lat: 19.9535, lng: 73.8344 },
    status: 'Open',
    crowdLevel: 'Low',
    waitTimeMinutes: 10,
    accessibility: true,
    wheelchairRamp: true,
    aartiTimings: ['07:00 AM', '07:00 PM'],
    description: 'Pristine pure white marble temple depicting replicas of the 12 Jyotirlingas and Bhagavad Gita chapters.',
    parkingAvailable: true,
    nearbyFacilities: { toilets: true, drinkingWater: true, medicalCamp: true, freeFood: true }
  },
  {
    id: 't5',
    name: 'Sita Gufa & Panchavati',
    marathiName: 'सीता गुफा आणि पंचवटी',
    hindiName: 'सीता गुफा एवं पंचवटी',
    category: 'Sacred Cave & Trees',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    distanceKm: 0.7,
    location: 'Panchavati, Nashik',
    coordinates: { lat: 20.009, lng: 73.7952 },
    status: 'Open',
    crowdLevel: 'High',
    waitTimeMinutes: 35,
    accessibility: false,
    wheelchairRamp: false,
    aartiTimings: ['06:00 AM to 07:00 PM'],
    description: 'The ancient cave where Goddess Sita stayed during Panchavati exile, surrounded by 5 sacred Banyan trees.',
    parkingAvailable: false,
    nearbyFacilities: { toilets: true, drinkingWater: true, medicalCamp: false, freeFood: false }
  }
];

export const EVENTS_DATA: Event[] = [
  {
    id: 'e1',
    title: 'First Flag Hoisting (Dhwajarohan) - Trimbakeshwar',
    marathiTitle: 'ध्वजारोहण सोहळा - त्र्यंबकेश्वर',
    category: 'Shahi Snan',
    date: '2027-07-14',
    time: '08:30 AM',
    location: 'Trimbakeshwar Temple & Kushavarta Kund',
    coordinates: { lat: 19.9322, lng: 73.5307 },
    crowdLevel: 'Very High',
    isImportant: true,
    description: 'Official commencement of Nashik Kumbh Mela 2027 marked by the ceremonial flag hoisting by Akhada Parishad.'
  },
  {
    id: 'e2',
    title: 'First Shahi Snan (Royal Holy Bath) - Ram Kund',
    marathiTitle: 'प्रथम शाही स्नान - रामकुंड, नाशिक',
    category: 'Shahi Snan',
    date: '2027-08-02',
    time: '03:30 AM Onwards',
    location: 'Ram Kund & Godavari Ghats',
    coordinates: { lat: 20.0059, lng: 73.7918 },
    crowdLevel: 'Very High',
    isImportant: true,
    description: 'Grand Royal Procession of Sadhus & Mahants followed by holy dip in Godavari River on Shravan Amavasya.'
  },
  {
    id: 'e3',
    title: 'Second Shahi Snan (Bhadrapada Amavasya)',
    marathiTitle: 'द्वितीय शाही स्नान - भाद्रपद अमावास्या',
    category: 'Shahi Snan',
    date: '2027-08-31',
    time: '03:00 AM Onwards',
    location: 'Ram Kund & Kushavarta Kund',
    coordinates: { lat: 20.0059, lng: 73.7918 },
    crowdLevel: 'Very High',
    isImportant: true,
    description: 'Peak holy bath day attended by millions of pilgrims and saintly orders from across the nation.'
  },
  {
    id: 'e4',
    title: 'Grand Godavari Sandhya Aarti',
    marathiTitle: 'भव्य गोदावरी संध्या आरती',
    category: 'Aarti',
    date: 'Daily',
    time: '07:00 PM',
    location: 'Ram Kund Ghat',
    coordinates: { lat: 20.0059, lng: 73.7918 },
    crowdLevel: 'High',
    isImportant: false,
    description: 'Mesmerizing evening oil lamp worship ceremony on the banks of Godavari with traditional chanting.'
  },
  {
    id: 'e5',
    title: 'Akhada Peshwai Cultural Procession',
    marathiTitle: 'अखाडा पेशवाई भव्य शोभायात्रा',
    category: 'Akhada',
    date: '2027-07-28',
    time: '09:00 AM',
    location: 'Sadhugram, Tapovan to Ram Kund',
    coordinates: { lat: 20.002, lng: 73.808 },
    crowdLevel: 'High',
    isImportant: true,
    description: 'Royal grand parade of Mahamন্ডaleshwars on elephants, horses, and silver chariots entering Sadhugram.'
  }
];

export const ACCOMMODATIONS_DATA: Accommodation[] = [
  {
    id: 'h1',
    name: 'Godavari Grand Riverside Resort',
    category: 'Hotel',
    destinationArea: 'Panchavati',
    pricePerNight: 3500,
    rating: 4.6,
    reviewsCount: 412,
    distanceFromGhatKm: 0.8,
    address: 'Near CBS, Panchavati Road, Nashik',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['AC', 'Free WiFi', 'Pure Veg Restaurant', 'Parking', 'Family Suites', 'Elevator'],
    availableBeds: 18,
    verified: true,
    contactNumber: '+91 98230 11223'
  },
  {
    id: 'h2',
    name: 'Shree Kalaram Bhakt Niwas & Ashram',
    category: 'Bhakt Niwas',
    destinationArea: 'Ram Kund',
    pricePerNight: 650,
    rating: 4.8,
    reviewsCount: 890,
    distanceFromGhatKm: 0.3,
    address: 'Behind Kalaram Temple, Panchavati, Nashik',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Hot Water', 'Wheelchair Access', 'Free Prasad', '24/7 Security', 'Elevator'],
    availableBeds: 42,
    verified: true,
    contactNumber: '+91 253 2511400'
  },
  {
    id: 'h3',
    name: 'Trimbak Pilgrims Luxury Tent City',
    category: 'Camp/Tent',
    destinationArea: 'Trimbakeshwar',
    pricePerNight: 2100,
    rating: 4.5,
    reviewsCount: 215,
    distanceFromGhatKm: 1.2,
    address: 'Sadhugram Road, Trimbakeshwar',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    amenities: ['Attached Washroom', 'AC Tent', 'Security Guards', 'Dining Hall', 'Power Backup'],
    availableBeds: 60,
    verified: true,
    contactNumber: '+91 94222 55890'
  },
  {
    id: 'h4',
    name: 'Maheshwari Dharamshala Trust',
    category: 'Dharamshala',
    destinationArea: 'Nashik Road',
    pricePerNight: 400,
    rating: 4.4,
    reviewsCount: 310,
    distanceFromGhatKm: 6.5,
    address: 'Opposite Railway Station, Nashik Road',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    amenities: ['Clean Beds', 'Purified Water', 'Jain Dining', 'Lockers'],
    availableBeds: 85,
    verified: true,
    contactNumber: '+91 253 2465210'
  }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'r1',
    name: 'Shree Mahavir Annadan & Bhandara',
    type: 'Bhandara / Free Food',
    cuisine: ['Maharashtrian Pithla Bhakri', 'Khichdi Prasad', 'Puri Bhaji'],
    isPureVeg: true,
    isJainAvailable: true,
    priceForTwo: 0,
    isFree: true,
    verifiedAt: 'Updated 10 min ago',
    distanceKm: 0.1,
    address: 'Adjacent to Ram Kund Ghat, Panchavati',
    locationArea: 'Ram Kund',
    timings: '07:00 AM - 10:00 PM (Continuous)',
    crowdLevel: 'Moderate',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'r2',
    name: 'Panchavati Gaurav Thali Restaurant',
    type: 'Restaurant',
    cuisine: ['Special Maharashtrian Thali', 'Gujarati Thali', 'Jain Thali'],
    isPureVeg: true,
    isJainAvailable: true,
    priceForTwo: 450,
    isFree: false,
    distanceKm: 0.7,
    address: 'CBS Circle, MG Road, Nashik',
    locationArea: 'Panchavati',
    timings: '11:00 AM - 04:00 PM, 07:00 PM - 11:00 PM',
    rating: 4.7,
    crowdLevel: 'High',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'r3',
    name: 'Tapovan Sadhu Seva Annachhatra',
    type: 'Bhandara / Free Food',
    cuisine: ['Satvik Bhojan', 'Sheera Prasad', 'Tea & Milk'],
    isPureVeg: true,
    isJainAvailable: true,
    priceForTwo: 0,
    isFree: true,
    verifiedAt: 'Updated 25 min ago',
    distanceKm: 1.4,
    address: 'Gate No. 3, Sadhugram, Tapovan',
    locationArea: 'Tapovan',
    timings: '06:00 AM - 11:00 PM',
    crowdLevel: 'Low',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  }
];

export const TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: 'tr1',
    mode: 'Bus Shuttle',
    origin: 'Nashik Road Railway Station',
    destination: 'Panchavati (Ram Kund)',
    fare: 15,
    estimatedMinutes: 25,
    frequency: 'Every 3 minutes',
    status: 'Running',
    details: 'MSRTC Kumbh Special Electric Shuttle Buses. Direct express route with priority lane access.',
    routeHighlights: ['Nashik Road', 'Dwarka Circle', 'CBS Central Bus Stand', 'Panchavati Drop']
  },
  {
    id: 'tr2',
    mode: 'Bus Shuttle',
    origin: 'Panchavati / Tapovan',
    destination: 'Trimbakeshwar Temple',
    fare: 45,
    estimatedMinutes: 50,
    frequency: 'Every 5 minutes',
    status: 'Running',
    details: 'Dedicated Kumbh Highway Shuttle connecting Nashik City to Trimbakeshwar.',
    routeHighlights: ['Tapovan Hub', 'Satpur Colony', 'Trimbak Ring Road', 'Trimbak Bus Stand']
  },
  {
    id: 'tr3',
    mode: 'Airport Shuttle',
    origin: 'Ozar Nashik Airport (ISK)',
    destination: 'Ram Kund Ghat',
    fare: 120,
    estimatedMinutes: 35,
    frequency: 'Hourly',
    status: 'Running',
    details: 'Air-conditioned express coach bus service directly sync\'d with daily flights.',
    routeHighlights: ['Ozar Terminal', 'Adgaon Naka', 'Panchavati Ring Depot']
  },
  {
    id: 'tr4',
    mode: 'Walking Route',
    origin: 'Outer Parking Depot 1 (Adgaon)',
    destination: 'Ghat Area',
    fare: 0,
    estimatedMinutes: 15,
    frequency: 'Continuous E-Rickshaws for Seniors',
    status: 'Diverted',
    details: 'Pedestrianized green corridor with shade structures, drinking water stalls, and free senior citizen golf carts.',
    routeHighlights: ['Shaded Walkway', 'Water Points', 'Medical Tent 2', 'Ram Kund Entry Gate 4']
  }
];

export const EMERGENCY_CENTERS: EmergencyCenter[] = [
  {
    id: 'em1',
    name: 'Ram Kund Central Medical & First Aid Camp',
    type: 'Medical Camp',
    phone: '108 / +91 253 2570001',
    address: 'Ghat Gate 2, Panchavati, Nashik',
    locationArea: 'Ram Kund',
    coordinates: { lat: 20.0061, lng: 73.7922 },
    openHours: '24 Hours Open',
    bedsAvailable: 45,
    is24x7: true
  },
  {
    id: 'em2',
    name: 'Nashik City Central Police Control Room',
    type: 'Police',
    phone: '112 / 100',
    address: 'Commissioner of Police Office, Gangapur Road, Nashik',
    locationArea: 'Panchavati',
    coordinates: { lat: 20.008, lng: 73.785 },
    openHours: '24 Hours Open',
    is24x7: true
  },
  {
    id: 'em3',
    name: 'Kumbh Central Lost & Found Control Booth',
    type: 'Lost & Found Booth',
    phone: '1912 / +91 253 25001912',
    address: 'Main Help Tower, Ram Kund Ghat',
    locationArea: 'Ram Kund',
    coordinates: { lat: 20.0055, lng: 73.7915 },
    openHours: '24 Hours Open',
    is24x7: true
  },
  {
    id: 'em4',
    name: 'District Civil Hospital Nashik',
    type: 'Hospital',
    phone: '+91 253 2572038',
    address: 'Trimbak Road, Near CBS, Nashik',
    locationArea: 'CBS',
    coordinates: { lat: 19.998, lng: 73.782 },
    openHours: '24 Hours Open',
    bedsAvailable: 220,
    is24x7: true
  }
];

export const AKHADAS_DATA: Akhada[] = [
  {
    id: 'ak1',
    name: 'Shree Panchayati Akhada Mahanirvani',
    marathiName: 'श्री पंचायती आखाडा महानिर्वाणी',
    sect: 'Shaiva',
    mahantName: 'Mahant Ravindragiri Ji Maharaj',
    locationArea: 'Sadhugram, Tapovan',
    coordinates: { lat: 20.003, lng: 73.805 },
    darshanTimings: '08:00 AM - 08:00 PM',
    description: 'One of the ancient Shaivite martial saint sects with legendary history and sadhu camps.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ak2',
    name: 'Shri Niranjani Akhada',
    marathiName: 'श्री निरंजनी आखाडा',
    sect: 'Shaiva',
    mahantName: 'Mahant Narendra Giri Ji',
    locationArea: 'Sadhugram, Tapovan',
    coordinates: { lat: 20.004, lng: 73.807 },
    darshanTimings: '07:00 AM - 09:00 PM',
    description: 'Prominent Shaiva saint order known for strict monastic discipline and spiritual discourses.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ak3',
    name: 'All India Akhada Parishad Bada Udasin',
    marathiName: 'बडा उदासी आखाडा',
    sect: 'Udasin',
    mahantName: 'Mahant Durgadas Ji Maharaj',
    locationArea: 'Trimbakeshwar Camp Sector B',
    coordinates: { lat: 19.935, lng: 73.535 },
    darshanTimings: '06:00 AM - 07:00 PM',
    description: 'Established order dedicated to the teachings of Sri Chand Bhagwan.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80'
  }
];
