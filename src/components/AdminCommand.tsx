'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldAlert, 
  Users, 
  AlertTriangle, 
  Bus, 
  CheckCircle2, 
  Bell, 
  Activity, 
  Lock, 
  Search, 
  SlidersHorizontal,
  MapPin,
  Radio,
  FileText
} from 'lucide-react';

export const AdminCommand: React.FC = () => {
  const { temples, updateCrowdStatus, lostReports } = useApp();
  const [selectedRole, setSelectedRole] = useState<'superAdmin' | 'safetyAdmin' | 'transportAdmin' | 'operationsAdmin'>('superAdmin');
  const [alertText, setAlertText] = useState('');
  const [alertBroadcasted, setAlertBroadcasted] = useState(false);

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertText.trim()) return;
    setAlertBroadcasted(true);
    setTimeout(() => {
      setAlertBroadcasted(false);
      setAlertText('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Command Center Header */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-rose-600/40">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                NASHIK KUMBH 2027 OPERATIONS COMMAND
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                LIVE FEED ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              District Administration & Police Joint Control Dashboard
            </p>
          </div>
        </div>

        {/* RBAC Role Selector */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-bold px-2">Role:</span>
          {(['superAdmin', 'safetyAdmin', 'transportAdmin', 'operationsAdmin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-2.5 py-1 rounded-xl font-bold capitalize transition ${
                selectedRole === r
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.replace('Admin', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Operational Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-400 font-bold">Est. Total Visitors Today</p>
          <p className="text-2xl font-black text-amber-400 mt-1">1.48 Million</p>
          <span className="text-[10px] text-emerald-400 font-bold">Peak Snan Flow</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-400 font-bold">Ram Kund Crowd Level</p>
          <p className="text-2xl font-black text-rose-500 mt-1">🔴 VERY HIGH</p>
          <span className="text-[10px] text-slate-400">Wait: 45–60 min</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-400 font-bold">Parking Occupancy</p>
          <p className="text-2xl font-black text-amber-400 mt-1">78%</p>
          <span className="text-[10px] text-slate-400">Outer Depots Active</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-400 font-bold">Active Lost Person Cases</p>
          <p className="text-2xl font-black text-rose-400 mt-1">{lostReports.length}</p>
          <span className="text-[10px] text-slate-400">Control Booths Relay ON</span>
        </div>
      </div>

      {/* Live Crowd Controller (Admin Override) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-600" />
          <span>Real-time Crowd Level Controller (Manual Override)</span>
        </h3>
        <p className="text-xs text-slate-500">
          Admin updates instantly reflect on all pilgrim apps, AI assistants, and map overlays.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {temples.map((temple) => (
            <div key={temple.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900 truncate max-w-[150px]">{temple.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  temple.crowdLevel === 'Very High' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {temple.crowdLevel}
                </span>
              </div>

              <div className="flex items-center gap-1 pt-1">
                {(['Low', 'Moderate', 'High', 'Very High'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => updateCrowdStatus(temple.id, lvl, lvl === 'Very High' ? 60 : lvl === 'High' ? 30 : 10)}
                    className={`flex-1 py-1 rounded text-[10px] font-extrabold transition ${
                      temple.crowdLevel === lvl
                        ? 'bg-slate-900 text-amber-400 shadow'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Emergency Alert Form */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-3">
        <h3 className="font-extrabold text-base text-amber-400 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <span>Broadcast Official Push Alert to Devotee Mobile Apps</span>
        </h3>

        {alertBroadcasted ? (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold text-center">
            ✓ Push Alert Broadcasted Successfully to 1.48M Mobile Devotee PWAs
          </div>
        ) : (
          <form onSubmit={handleBroadcastAlert} className="space-y-3">
            <input
              type="text"
              required
              value={alertText}
              onChange={(e) => setAlertText(e.target.value)}
              placeholder="e.g. Traffic Diversion Active: Panchavati Inner Ring closed for private cars."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
            >
              SEND BROADCAST ALERT
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
