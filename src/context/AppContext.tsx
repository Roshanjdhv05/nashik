'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, i18n } from '@/lib/i18n';
import { Temple, Event, Accommodation, Restaurant, TransportRoute, EmergencyCenter, TEMPLES_DATA, EVENTS_DATA, ACCOMMODATIONS_DATA, RESTAURANTS_DATA, TRANSPORT_ROUTES, EMERGENCY_CENTERS } from '@/lib/kumbhData';

export type ActiveView = 'devotee' | 'vendor' | 'admin';
export type DevoteeTab = 
  | 'home' 
  | 'calendar' 
  | 'temples' 
  | 'hotels' 
  | 'transport' 
  | 'food' 
  | 'annadan'
  | 'map' 
  | 'emergency' 
  | 'trips' 
  | 'family' 
  | 'wallet' 
  | 'ai' 
  | 'lost-found'
  | 'akhadas';

export interface TripPlan {
  id: string;
  comingFrom: string;
  travelDate: string;
  peopleCount: number;
  days: number;
  budgetCategory: 'Budget' | 'Moderate' | 'Comfort';
  savedTemples: string[];
  savedEvents: string[];
  savedHotels: string[];
  totalEstimatedCost: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  location: string;
  battery: number;
  lastUpdated: string;
  isSafe: boolean;
}

export interface WalletTicket {
  id: string;
  title: string;
  category: 'Train' | 'Flight' | 'Hotel' | 'Darshan Pass' | 'Kumbh Digital ID';
  referenceNo: string;
  date: string;
  details: string;
  qrCodeData: string;
}

export interface LostReport {
  id: string;
  personName: string;
  age: number;
  gender: string;
  clothingDetails: string;
  lastSeenLocation: string;
  reportedBy: string;
  contactNumber: string;
  reportedAt: string;
  status: 'Searching' | 'Found' | 'Resolved';
  image?: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof i18n['en'];
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  activeTab: DevoteeTab;
  setActiveTab: (tab: DevoteeTab) => void;
  seniorMode: boolean;
  setSeniorMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  accessibilityMode: boolean;
  setAccessibilityMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  
  // User Data
  savedItemIds: string[];
  toggleSaveItem: (id: string) => void;
  currentTrip: TripPlan | null;
  setCurrentTrip: React.Dispatch<React.SetStateAction<TripPlan | null>>;
  familyMembers: FamilyMember[];
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  walletTickets: WalletTicket[];
  addWalletTicket: (ticket: Omit<WalletTicket, 'id'>) => void;
  lostReports: LostReport[];
  addLostReport: (report: Omit<LostReport, 'id' | 'reportedAt' | 'status'>) => void;

  // Emergency & Assistant Modals
  isSosOpen: boolean;
  setIsSosOpen: (open: boolean) => void;
  isAiChatOpen: boolean;
  setIsAiChatOpen: (open: boolean) => void;

  // Data
  temples: Temple[];
  events: Event[];
  accommodations: Accommodation[];
  restaurants: Restaurant[];
  transports: TransportRoute[];
  emergencies: EmergencyCenter[];
  
  // Admin & Vendor Dynamic Actions
  updateCrowdStatus: (templeId: string, level: 'Low' | 'Moderate' | 'High' | 'Very High', waitTime: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<ActiveView>('devotee');
  const [activeTab, setActiveTab] = useState<DevoteeTab>('home');
  const [seniorMode, setSeniorMode] = useState<boolean>(false);
  const [accessibilityMode, setAccessibilityMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('Ram Kund, Panchavati');
  
  // Modals
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);

  // Dynamic Data
  const [temples, setTemples] = useState<Temple[]>(TEMPLES_DATA);
  const [events] = useState<Event[]>(EVENTS_DATA);
  const [accommodations] = useState<Accommodation[]>(ACCOMMODATIONS_DATA);
  const [restaurants] = useState<Restaurant[]>(RESTAURANTS_DATA);
  const [transports] = useState<TransportRoute[]>(TRANSPORT_ROUTES);
  const [emergencies] = useState<EmergencyCenter[]>(EMERGENCY_CENTERS);

  // User States
  const [savedItemIds, setSavedItemIds] = useState<string[]>(['t1', 'e2', 'h2']);
  const [currentTrip, setCurrentTrip] = useState<TripPlan | null>({
    id: 'trip1',
    comingFrom: 'Mumbai CST',
    travelDate: '2027-08-01',
    peopleCount: 4,
    days: 3,
    budgetCategory: 'Moderate',
    savedTemples: ['t1', 't2', 't3'],
    savedEvents: ['e2', 'e4'],
    savedHotels: ['h2'],
    totalEstimatedCost: 14500
  });

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 'fm1',
      name: 'Ramesh Sharma (Father)',
      relation: 'Father',
      phone: '+91 98220 44556',
      location: 'Near Kalaram Temple',
      battery: 78,
      lastUpdated: '2 min ago',
      isSafe: true
    },
    {
      id: 'fm2',
      name: 'Sunita Sharma (Mother)',
      relation: 'Mother',
      phone: '+91 98220 44557',
      location: 'Ram Kund Bathing Pavilion',
      battery: 62,
      lastUpdated: 'Just now',
      isSafe: true
    }
  ]);

  const [walletTickets, setWalletTickets] = useState<WalletTicket[]>([
    {
      id: 'w1',
      title: 'Kumbh Pilgrims Special Train 01024',
      category: 'Train',
      referenceNo: 'PNR: 2415890214',
      date: '2027-08-01 06:15 AM',
      details: 'Coach S4, Seat 23, 24, 25, 26 (Mumbai CSMT to Nashik Road)',
      qrCodeData: 'KUMBH-TRAIN-2415890214'
    },
    {
      id: 'w2',
      title: 'Kalaram Temple VIP Darshan Pass',
      category: 'Darshan Pass',
      referenceNo: 'DARSHAN-2027-9941',
      date: '2027-08-02 10:30 AM',
      details: 'Gate 2 Priority Entry - 4 Pilgrims',
      qrCodeData: 'KUMBH-DARSHAN-9941'
    }
  ]);

  const [lostReports, setLostReports] = useState<LostReport[]>([
    {
      id: 'lr1',
      personName: 'Anand Kulkarni',
      age: 68,
      gender: 'Male',
      clothingDetails: 'White Kurta Pyjama, Golden Shawl, Wooden Walking Stick',
      lastSeenLocation: 'Gate 3, Sadhugram Tapovan',
      reportedBy: 'Mahesh Kulkarni (Son)',
      contactNumber: '+91 98700 12345',
      reportedAt: 'Today, 02:15 PM',
      status: 'Searching'
    }
  ]);

  // Load / Save localStorage preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('kumbh_lang') as Language;
    if (savedLang && ['en', 'mr', 'hi'].includes(savedLang)) setLanguage(savedLang);

    const savedSenior = localStorage.getItem('kumbh_senior');
    if (savedSenior === 'true') setSeniorMode(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('kumbh_lang', lang);
  };

  const handleSetSeniorMode = (val: boolean | ((prev: boolean) => boolean)) => {
    setSeniorMode((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem('kumbh_senior', String(next));
      return next;
    });
  };

  const toggleSaveItem = (id: string) => {
    setSavedItemIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: 'fm_' + Date.now()
    };
    setFamilyMembers((prev) => [...prev, newMember]);
  };

  const addWalletTicket = (ticket: Omit<WalletTicket, 'id'>) => {
    const newTicket: WalletTicket = {
      ...ticket,
      id: 'w_' + Date.now()
    };
    setWalletTickets((prev) => [...prev, newTicket]);
  };

  const addLostReport = (report: Omit<LostReport, 'id' | 'reportedAt' | 'status'>) => {
    const newReport: LostReport = {
      ...report,
      id: 'lr_' + Date.now(),
      reportedAt: 'Just now',
      status: 'Searching'
    };
    setLostReports((prev) => [newReport, ...prev]);
  };

  const updateCrowdStatus = (templeId: string, level: 'Low' | 'Moderate' | 'High' | 'Very High', waitTime: number) => {
    setTemples((prev) => 
      prev.map((t) => (t.id === templeId ? { ...t, crowdLevel: level, waitTimeMinutes: waitTime } : t))
    );
  };

  const t = i18n[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        activeView,
        setActiveView,
        activeTab,
        setActiveTab,
        seniorMode,
        setSeniorMode: handleSetSeniorMode,
        accessibilityMode,
        setAccessibilityMode,
        searchQuery,
        setSearchQuery,
        selectedLocation,
        setSelectedLocation,
        savedItemIds,
        toggleSaveItem,
        currentTrip,
        setCurrentTrip,
        familyMembers,
        addFamilyMember,
        walletTickets,
        addWalletTicket,
        lostReports,
        addLostReport,
        isSosOpen,
        setIsSosOpen,
        isAiChatOpen,
        setIsAiChatOpen,
        temples,
        events,
        accommodations,
        restaurants,
        transports,
        emergencies,
        updateCrowdStatus
      }}
    >
      <div className={`${seniorMode ? 'senior-mode' : ''} ${accessibilityMode ? 'high-contrast' : ''}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
