'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Calendar, 
  Star, 
  TrendingUp, 
  ShieldCheck, 
  BedDouble, 
  Utensils, 
  Plus,
  SlidersHorizontal
} from 'lucide-react';

export const VendorPortal: React.FC = () => {
  const [vendorType, setVendorType] = useState<'hotel' | 'restaurant' | 'transport'>('hotel');
  const [availableRooms, setAvailableRooms] = useState(18);
  const [pricePerNight, setPricePerNight] = useState(3500);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Vendor Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">Godavari Grand Riverside Hotel</h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Vendor
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Panchavati Road, Nashik • Registration ID: VEND-2027-8841</p>
          </div>
        </div>

        <button 
          onClick={() => alert("Vendor details saved successfully.")}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition shadow"
        >
          Save Changes
        </button>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-bold">Total Inquiries / Bookings</p>
          <p className="text-2xl font-black text-slate-900 mt-1">142</p>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +24% this week</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-bold">Active Beds / Capacity</p>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="number"
              value={availableRooms}
              onChange={(e) => setAvailableRooms(Number(e.target.value))}
              className="w-16 bg-slate-100 border border-slate-300 rounded-lg p-1 font-black text-lg text-slate-900 text-center"
            />
            <span className="text-xs text-slate-500 font-medium">Beds</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-bold">Current Rate / Night</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-lg font-black text-slate-900">₹</span>
            <input
              type="number"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(Number(e.target.value))}
              className="w-20 bg-slate-100 border border-slate-300 rounded-lg p-1 font-black text-lg text-slate-900 text-center"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-bold">Rating & Reviews</p>
          <p className="text-2xl font-black text-amber-600 mt-1 flex items-center gap-1">
            <span>4.8</span>
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
          </p>
          <span className="text-[10px] text-slate-500">From 412 verified devotees</span>
        </div>
      </div>

      {/* Customer Booking Requests List */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Recent Devotee Booking Requests</h3>
        
        <div className="space-y-2.5 text-xs">
          {[
            { id: 'b1', name: 'Amitabh Joshi', dates: 'Aug 01 - Aug 03, 2027', guests: '4 Guests (2 Adults, 2 Seniors)', status: 'Pending Confirmation', amount: 7000 },
            { id: 'b2', name: 'Priya Agarwal', dates: 'Aug 02, 2027', guests: '2 Guests', status: 'Confirmed', amount: 3500 }
          ].map((req) => (
            <div key={req.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{req.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    req.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-slate-500 mt-0.5">{req.dates} • {req.guests}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900 mr-2">₹{req.amount}</span>
                <button 
                  onClick={() => alert(`Accepted booking request for ${req.name}`)}
                  className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl shadow-xs"
                >
                  Accept Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
