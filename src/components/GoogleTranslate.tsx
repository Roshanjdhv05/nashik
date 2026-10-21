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

/**
 * Ensures icons, technical symbols, and map controls are protected from Google Translate.
 */
export function protectAllIconsFromTranslation() {
  if (typeof document === 'undefined') return;

  // 1. Material Symbols & Material Icons
  const iconElements = document.querySelectorAll<HTMLElement>(
    '.material-symbols-outlined, .material-symbols, .material-icons, [data-icon]'
  );
  iconElements.forEach((el) => {
    if (!el.classList.contains('notranslate')) el.classList.add('notranslate');
    if (el.getAttribute('translate') !== 'no') el.setAttribute('translate', 'no');
    if (!el.getAttribute('aria-hidden')) el.setAttribute('aria-hidden', 'true');
  });

  // 2. SVG elements (Lucide icons, custom vector graphics)
  const svgs = document.querySelectorAll<SVGElement>('svg');
  svgs.forEach((svg) => {
    if (!svg.classList.contains('notranslate')) svg.classList.add('notranslate');
    if (svg.getAttribute('translate') !== 'no') svg.setAttribute('translate', 'no');
    if (!svg.getAttribute('aria-hidden')) svg.setAttribute('aria-hidden', 'true');
  });

  // 3. Map controls & interactive map canvases
  const mapElements = document.querySelectorAll<HTMLElement>(
    '.leaflet-container, .leaflet-control-container, .leaflet-pane, .mapboxgl-map'
  );
  mapElements.forEach((el) => {
    if (!el.classList.contains('notranslate')) el.classList.add('notranslate');
    if (el.getAttribute('translate') !== 'no') el.setAttribute('translate', 'no');
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

  protectAllIconsFromTranslation();

  window.googleTranslateElementInit = () => {
    scriptLoaded = true;
    protectAllIconsFromTranslation();
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
  className?: string;
}

export function GoogleTranslateWidget({ variant = 'compact', className = '' }: Props) {
  const [currentLang, setCurrentLang] = useState<LangCode>('en');
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Active icon protection observer: protects icons across client-side page transitions
  useEffect(() => {
    protectAllIconsFromTranslation();

    const observer = new MutationObserver(() => {
      protectAllIconsFromTranslation();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    return () => observer.disconnect();
  }, []);

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
        protectAllIconsFromTranslation();
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
      <div ref={dropdownRef} className={`relative flex items-center ${className}`}>
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
          aria-label="Select translation language"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white border border-[#e5e2dd] text-[11.5px] text-[#564339] hover:text-[#984300] transition-all font-medium shadow-xs"
        >
          <span className="notranslate inline-flex items-center" translate="no" aria-hidden="true">
            <Globe className="w-3.5 h-3.5 text-[#984300]" />
          </span>
          <span className="font-semibold">{label}</span>
          <span className="notranslate inline-flex items-center" translate="no" aria-hidden="true">
            <ChevronDown
              className={`w-3 h-3 text-[#786d66] transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </span>
        </button>
        {isOpen && (
          <div
            role="listbox"
            className="absolute top-full right-0 mt-1.5 z-[350] bg-white border border-[#e5e2dd] rounded-xl shadow-xl overflow-hidden min-w-[150px] py-1 max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150 notranslate"
            translate="no"
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
    <div className={`px-4 py-3 border-b border-[#f3efe8] ${className}`}>
      <p className="text-[11px] font-bold text-[#786d66] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
        <span className="notranslate inline-flex items-center" translate="no" aria-hidden="true">
          <Globe className="w-3.5 h-3.5 text-[#984300]" />
        </span>
        <span>Language / भाषा (Translate)</span>
      </p>
      <div className="flex flex-wrap gap-1.5 notranslate" translate="no">
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
