'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Globe } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        TranslateElement: new (config: Record<string, any>, id: string) => void;
      };
    };
  }
}

export const GT_LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
] as const;

type LangCode = typeof GT_LANGS[number]['code'];

function getLangFromCookie(): LangCode {
  if (typeof document === 'undefined') return 'en';
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (!m) return 'en';
  const parts = decodeURIComponent(m[1]).split('/');
  const code = parts[2] as LangCode;
  return GT_LANGS.some((l) => l.code === code) ? code : 'en';
}

function clearGoogTransCookie() {
  const host = window.location.hostname;
  ['', `.${host}`, host].forEach((d) => {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${d ? `; domain=${d}` : ''}`;
  });
}

const SCRIPT_ID = 'kumbh-gt-script';
let scriptLoadCallbacks: Array<() => void> = [];
let scriptLoaded = false;

function loadGoogleTranslateScript(onReady: () => void) {
  if (scriptLoaded) {
    onReady();
    return;
  }
  scriptLoadCallbacks.push(onReady);
  if (document.getElementById(SCRIPT_ID)) return;

  window.googleTranslateElementInit = () => {
    scriptLoaded = true;
    scriptLoadCallbacks.forEach((cb) => cb());
    scriptLoadCallbacks = [];
  };

  const s = document.createElement('script');
  s.id = SCRIPT_ID;
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.head.appendChild(s);
}

let widgetInitialized = false;

interface Props {
  variant?: 'compact' | 'full';
}

export function GoogleTranslateWidget({ variant = 'compact' }: Props) {
  const [currentLang, setCurrentLang] = useState<LangCode>('en');
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLang(getLangFromCookie());

    loadGoogleTranslateScript(() => {
      if (!widgetInitialized && window.google?.translate?.TranslateElement) {
        widgetInitialized = true;
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: GT_LANGS.map((l) => l.code).join(','),
              layout: 0,
              autoDisplay: false,
            },
            'google_translate_element_hidden'
          );
        } catch {
          /* ignore double-init */
        }
      }
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLang = useCallback(
    (code: LangCode) => {
      setIsOpen(false);
      if (code === 'en') {
        clearGoogTransCookie();
        setCurrentLang('en');
        window.location.reload();
        return;
      }
      if (!isReady) return;
      const trySwitch = (n = 0) => {
        const sel = document.querySelector<HTMLSelectElement>(
          '#google_translate_element_hidden .goog-te-combo'
        );
        if (sel) {
          sel.value = code;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          setCurrentLang(code);
        } else if (n < 15) {
          setTimeout(() => trySwitch(n + 1), 300);
        }
      };
      trySwitch();
    },
    [isReady]
  );

  const label = GT_LANGS.find((l) => l.code === currentLang)?.label ?? 'English';

  if (variant === 'compact') {
    return (
      <div ref={dropdownRef} className="relative flex items-center">
        {/* Invisible mount container for Google Translate element */}
        <div
          id="google_translate_element_hidden"
          style={{ display: 'none', position: 'absolute', visibility: 'hidden' }}
        />
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Select language"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 hover:bg-white border border-[#e5e2dd] text-[12px] text-[#564339] hover:text-[#984300] transition-all font-medium shadow-sm hover:shadow"
        >
          <Globe className="w-3.5 h-3.5 text-[#984300]" />
          <span className="font-semibold">{label}</span>
          <ChevronDown
            className={`w-3 h-3 text-[#786d66] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isOpen && (
          <div
            role="listbox"
            className="absolute top-full right-0 mt-1.5 z-[300] bg-white border border-[#e5e2dd] rounded-xl shadow-xl overflow-hidden min-w-[150px] py-1 max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150"
          >
            {GT_LANGS.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={currentLang === lang.code}
                onClick={() => switchLang(lang.code)}
                className={`w-full text-left px-3.5 py-2 text-[12px] flex items-center justify-between gap-2 transition-colors ${
                  currentLang === lang.code
                    ? 'bg-[#984300]/10 text-[#984300] font-bold'
                    : 'text-[#3c2e28] hover:bg-[#fcf9f4]'
                }`}
              >
                <span>{lang.label}</span>
                {currentLang === lang.code && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#984300] shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-[#f3efe8]">
      <p className="text-[11px] font-bold text-[#786d66] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
        <Globe className="w-3.5 h-3.5 text-[#984300]" /> Language / भाषा
      </p>
      <div className="flex flex-wrap gap-1.5">
        {GT_LANGS.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => switchLang(lang.code)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors ${
              currentLang === lang.code
                ? 'bg-[#984300] text-white border-[#984300] shadow-sm font-semibold'
                : 'bg-[#fcf9f4] text-[#3c2e28] border-[#e5e2dd] hover:border-[#984300] hover:text-[#984300]'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
