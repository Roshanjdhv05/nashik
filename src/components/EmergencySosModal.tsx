'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  AlertTriangle, 
  Phone, 
  ShieldAlert, 
  Ambulance, 
  UserX, 
  Search, 
  X, 
  MapPin, 
  HeartHandshake,
  CheckCircle2,
  Users
} from 'lucide-react';

export const EmergencySosModal: React.FC = () => {
  const { isSosOpen, setIsSosOpen, t, lostReports, addLostReport } = useApp();
  const [activeTab, setActiveTab] = useState<'call' | 'reportLost' | 'lostFeed'>('call');

  // New Lost Person Form State
  const [personName, setPersonName] = useState('');
  const [age, setAge] = useState('');
  const [clothing, setClothing] = useState('');
  const [lastSeen, setLastSeen] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isSosOpen) return null;

  const handleSubmitLost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName || !contact) return;

    addLostReport({
      personName,
      age: Number(age) || 30,
      gender: 'Male',
      clothingDetails: clothing,
      lastSeenLocation: lastSeen || 'Panchavati / Ram Kund Ghat',
      reportedBy: 'Devotee App User',
      contactNumber: contact,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPersonName('');
      setAge('');
      setClothing('');
      setLastSeen('');
      setContact('');
      setActiveTab('lostFeed');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-rose-500/50 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white leading-tight">
                {t.emergencySos} — KUMBH HELP
              </h2>
              <p className="text-xs text-rose-100 font-medium">
                24/7 Police, Ambulance & Emergency Assistance
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSosOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1.5 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('call')}
            className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'call' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1-Tap Call</span>
          </button>
          <button
            onClick={() => setActiveTab('reportLost')}
            className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'reportLost' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Report Lost</span>
          </button>
          <button
            onClick={() => setActiveTab('lostFeed')}
            className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'lostFeed' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Lost & Found ({lostReports.length})</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'call' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                In case of immediate danger, medical crisis, or missing family members, tap below to contact direct emergency control towers:
              </p>

              {/* Police 112 */}
              <a
                href="tel:112"
                className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3.5 rounded-2xl transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-blue-300">{t.callPolice}</h3>
                    <p className="text-xs text-slate-400">Nashik Kumbh Police Control & Crowd Safety</p>
                  </div>
                </div>
                <span className="bg-blue-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow">
                  CALL 112
                </span>
              </a>

              {/* Ambulance 108 */}
              <a
                href="tel:108"
                className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3.5 rounded-2xl transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Ambulance className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-rose-300">{t.callAmbulance}</h3>
                    <p className="text-xs text-slate-400">Medical Field Hospital & Rapid Ambulance Dispatch</p>
                  </div>
                </div>
                <span className="bg-rose-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow">
                  CALL 108
                </span>
              </a>

              {/* Kumbh Helpline 1912 */}
              <a
                href="tel:1912"
                className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3.5 rounded-2xl transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-amber-300">{t.callHelpCenter}</h3>
                    <p className="text-xs text-slate-400">Lost Person Booth & Multilingual Pilgrims Help</p>
                  </div>
                </div>
                <span className="bg-amber-500 text-slate-950 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow">
                  CALL 1912
                </span>
              </a>

              {/* Location Share & GPS Assist */}
              <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-200">Your Current GPS Coordinates:</p>
                    <p className="text-[11px] font-mono text-slate-400">20.0059° N, 73.7918° E (Ram Kund Gate 2)</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Location link copied to clipboard to share with emergency contacts!")}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded-xl border border-slate-700 font-semibold"
                >
                  Share GPS
                </button>
              </div>
            </div>
          )}

          {activeTab === 'reportLost' && (
            <form onSubmit={handleSubmitLost} className="space-y-3 text-xs">
              {submitted ? (
                <div className="p-6 text-center bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="font-extrabold text-sm text-emerald-300">Report Broadcasted to Control Towers</h3>
                  <p className="text-slate-300">
                    Kumbh Lost & Found Booths at Ram Kund, Panchavati & Tapovan have received your report.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-slate-300">
                    Enter details of the missing family member or pilgrim. Reports are immediately relayed to official help booths:
                  </p>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Missing Person Full Name *</label>
                    <input
                      type="text"
                      required
                      value={personName}
                      onChange={(e) => setPersonName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar Kulkarni"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 68"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Contact Mobile *</label>
                      <input
                        type="tel"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="e.g. 98220 12345"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Clothing / Visual Identification</label>
                    <input
                      type="text"
                      value={clothing}
                      onChange={(e) => setClothing(e.target.value)}
                      placeholder="e.g. Yellow Kurta, White Dhoti, Specs, Silver watch"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Last Known Location</label>
                    <input
                      type="text"
                      value={lastSeen}
                      onChange={(e) => setLastSeen(e.target.value)}
                      placeholder="e.g. Near Kalaram Temple Entrance Gate"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3 rounded-xl shadow-lg transition text-xs uppercase tracking-wider"
                  >
                    Broadcast Lost Person Alert
                  </button>
                </>
              )}
            </form>
          )}

          {activeTab === 'lostFeed' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Reports ({lostReports.length})</span>
                <span className="text-[10px] text-emerald-400 font-mono">Realtime Sync with Police Booths</span>
              </div>

              {lostReports.map((report) => (
                <div key={report.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-amber-400 text-sm">{report.personName} ({report.age} yrs)</h4>
                    <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {report.status}
                    </span>
                  </div>
                  <p className="text-slate-300"><strong className="text-slate-400">Clothing:</strong> {report.clothingDetails}</p>
                  <p className="text-slate-300"><strong className="text-slate-400">Last Seen:</strong> {report.lastSeenLocation}</p>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-700/60 text-slate-400">
                    <span>Reported by {report.reportedBy} ({report.reportedAt})</span>
                    <a href={`tel:${report.contactNumber}`} className="text-amber-400 font-bold hover:underline">
                      📞 {report.contactNumber}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
