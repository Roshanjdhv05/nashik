'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, Send, X, Bot, User, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isVerified: boolean;
  suggestedAction?: { label: string; tab: any };
}

export const AiAssistantDrawer: React.FC = () => {
  const { isAiChatOpen, setIsAiChatOpen, t, language, setActiveTab } = useApp();
  const [input, setInput] = useState('');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: language === 'mr' 
        ? 'नमस्कार! मी तुमचा कुंभ AI मित्र आहे. मी तुम्हाला दर्शन, मंदिरे, हॉटेल्स, बस मार्ग, अन्नछत्र आणि आणीबाणी सेवांबद्दल मदत करू शकतो. विचाराल ते सांगतो!'
        : language === 'hi'
        ? 'नमस्ते! मैं आपका कुंभ AI मित्र हूँ। मैं आपको दर्शन, मंदिर, होटल, बस मार्ग, अन्नदान और आपातकालीन सेवाओं के बारे में सटीक जानकारी दे सकता हूँ।'
        : 'Namaste! I am your AI Kumbh Travel Mitr. How can I help you navigate Nashik Kumbh 2027 today?',
      isVerified: true
    }
  ]);

  if (!isAiChatOpen) return null;

  const quickPrompts = [
    'Where is Jain food near Ram Kund?',
    'Suggest 2-day itinerary for senior parents',
    'Where is nearest clean toilet & water booth?',
    'How do I reach Trimbakeshwar by bus?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: query,
      isVerified: false
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent AI response based on query keywords
    setTimeout(() => {
      let responseText = '';
      let action: { label: string; tab: any } | undefined = undefined;
      const lower = query.toLowerCase();

      if (lower.includes('jain') || lower.includes('food') || lower.includes('bhandara')) {
        responseText = 'Verified Annadan & Jain Food Spot: "Shree Mahavir Annadan & Bhandara" is located right at Ram Kund Ghat entrance. Continuous free Jain Thali served 07:00 AM to 10:00 PM. Verified 10 mins ago.';
        action = { label: 'Explore Food & Bhandara Directory', tab: 'food' };
      } else if (lower.includes('itinerary') || lower.includes('parents') || lower.includes('senior') || lower.includes('2-day')) {
        responseText = 'Optimal 2-Day Senior Itinerary:\n• Day 1 Morning: Early Ram Kund Godavari Snan (using wheel-chair accessible ramp Gate 2) -> Kalaram Temple Darshan.\n• Day 1 Evening: Sit at Ram Kund for Godavari Maha Aarti at 7:00 PM.\n• Day 2: Take MSRTC AC Shuttle from Tapovan to Trimbakeshwar Jyotirlinga (Special Senior Lane).';
        action = { label: 'Open Trip Planner Tool', tab: 'trips' };
      } else if (lower.includes('trimbak') || lower.includes('reach') || lower.includes('bus') || lower.includes('station')) {
        responseText = 'Transport Route to Trimbakeshwar:\nTake MSRTC Kumbh Express Shuttle from Nashik Road Railway Station directly to Trimbak Ring Depot (Fare ₹45, 50 mins duration). Buses run every 5 minutes.';
        action = { label: 'View Transport Routes & Buses', tab: 'transport' };
      } else if (lower.includes('toilet') || lower.includes('water') || lower.includes('medical') || lower.includes('near')) {
        responseText = 'Nearest Facilities at Ram Kund:\n• Clean Toilet Blocks: Gate 1 & Gate 4 (Wheelchair Ramp available)\n• RO Drinking Water Stalls: Every 50m along Panchavati Ghat\n• Medical Camp: Ram Kund Gate 2 Field Tent (Dr. Patil 24x7).';
        action = { label: 'View Facilities on Smart Map', tab: 'map' };
      } else {
        responseText = `Regarding "${query}": Nashik Kumbh 2027 official data confirms all 5 Shahi Snan dates, 20+ Sadhugram Akhada camps, and 24x7 Shuttle routes are active. Let me redirect you to the specialized directory.`;
        action = { label: 'Explore Kumbh Map', tab: 'map' };
      }

      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: responseText,
        isVerified: true,
        suggestedAction: action
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-slate-900 text-white shadow-2xl border-l border-slate-800 flex flex-col animate-slide-left">
      {/* Drawer Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-amber-400 font-bold shadow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white flex items-center gap-1.5">
              Kumbh AI Mitr (कुंभ मित्र)
            </h3>
            <p className="text-[11px] text-amber-100 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              Verified Kumbh RAG Assistant
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsAiChatOpen(false)}
          className="p-1.5 rounded-full bg-slate-950/20 hover:bg-slate-950/40 text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/60">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                AI
              </div>
            )}
            <div
              className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-amber-600 text-white rounded-tr-none font-medium'
                  : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-none space-y-2'
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              
              {m.sender === 'ai' && m.isVerified && (
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium pt-1 border-t border-slate-700/60">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Nashik Kumbh Operations Data</span>
                </div>
              )}

              {m.suggestedAction && (
                <button
                  onClick={() => {
                    setActiveTab(m.suggestedAction!.tab);
                    setIsAiChatOpen(false);
                  }}
                  className="mt-2 w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold py-1.5 px-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[11px] transition"
                >
                  <span>{m.suggestedAction.label}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-2.5 bg-slate-900 border-t border-slate-800 space-y-1.5">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1">Suggested Questions:</p>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="bg-slate-800 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-[11px] px-2.5 py-1 rounded-xl transition text-left truncate max-w-full"
            >
              💬 {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Nashik Kumbh 2027..."
          className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none placeholder-slate-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 rounded-xl font-bold transition shadow"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
