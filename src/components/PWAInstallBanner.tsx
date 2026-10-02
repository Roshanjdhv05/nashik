'use client';

import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed in this session
    const wasDismissed = sessionStorage.getItem('pwa-banner-dismissed');
    if (wasDismissed) return;

    // Don't show if already installed (standalone)
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if ((window.navigator as Navigator & { standalone?: boolean }).standalone) return;

    // Check iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    if (ios) {
      // Show iOS guide banner after 3s
      setTimeout(() => setShowBanner(true), 3000);
      return;
    }

    // Listen for the native browser install event (Android/Desktop Chrome/Edge)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 2500);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Register Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      setShowBanner(false);
    } else {
      setInstalling(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    sessionStorage.setItem('pwa-banner-dismissed', '1');
  };

  if (!showBanner || dismissed) return null;

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        className="fixed inset-0 z-[900] bg-black/20 backdrop-blur-[2px]"
        onClick={handleDismiss}
      />

      {/* Banner — bottom sheet style */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[901] animate-slide-up"
        style={{
          animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        <div className="mx-3 mb-4 rounded-2xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.18)] border border-[#e8e4df] overflow-hidden">
          {/* Saffron accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#984300] via-[#e9c176] to-[#984300]" />

          <div className="p-4">
            {/* Header row */}
            <div className="flex items-start gap-3 mb-4">
              {/* App icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#fcf9f4] border border-[#e8e4df] flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Nashik Kumbh"
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.svg';
                  }}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#984300]">Official App</span>
                  <span className="w-1 h-1 rounded-full bg-[#984300]" />
                  <span className="text-[10px] font-medium text-[#786d66]">Free</span>
                </div>
                <h3 className="text-[16px] font-bold text-[#1c1c19] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Nashik Kumbh 2027
                </h3>
                <p className="text-[11px] text-[#786d66] mt-0.5 leading-snug">
                  Your complete Kumbh companion — Darshan, Stays, Map & SOS
                </p>
              </div>

              {/* Dismiss X */}
              <button
                onClick={handleDismiss}
                className="w-7 h-7 rounded-full bg-[#f4efe8] flex items-center justify-center shrink-0 -mt-0.5"
                aria-label="Dismiss"
              >
                <span className="material-symbols-outlined text-[16px] text-[#786d66]">close</span>
              </button>
            </div>

            {/* Feature pills */}
            <div className="flex gap-2 mb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {[
                { icon: 'temple_hindu', label: 'Darshan' },
                { icon: 'map', label: 'Live Map' },
                { icon: 'restaurant', label: 'Free Food' },
                { icon: 'emergency', label: 'SOS 112' },
              ].map(f => (
                <div key={f.label} className="flex-shrink-0 flex items-center gap-1.5 bg-[#fcf9f4] border border-[#e8e4df] px-2.5 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[13px] text-[#984300]">{f.icon}</span>
                  <span className="text-[11px] font-semibold text-[#564339]">{f.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            {isIOS ? (
              <div className="bg-[#fcf9f4] rounded-xl p-3 border border-[#e8e4df]">
                <p className="text-[12px] text-[#564339] leading-relaxed text-center">
                  Tap <strong className="text-[#007AFF]">Share</strong>{' '}
                  <span className="material-symbols-outlined text-[14px] align-middle text-[#007AFF]">ios_share</span>
                  {' '}then tap <strong>"Add to Home Screen"</strong>
                </p>
              </div>
            ) : (
              <button
                onClick={handleInstall}
                disabled={installing}
                className="w-full bg-[#984300] hover:bg-[#ba5814] disabled:bg-[#984300]/70 text-white font-bold py-3.5 rounded-xl text-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#984300]/30"
              >
                {installing ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    <span>Installing…</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Install App — Free</span>
                  </>
                )}
              </button>
            )}

            {/* Reassurance text */}
            <p className="text-center text-[10px] text-[#786d66] mt-2.5">
              Works offline • No account required • 0 MB mobile data during Kumbh
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
