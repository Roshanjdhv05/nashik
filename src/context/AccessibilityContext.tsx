'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface AccessibilitySettings {
  voiceOver: boolean;
  voiceRate: number; // 0.75, 1, 1.25, 1.5
  voiceURI: string;
  highContrast: boolean;
  highlightLinks: boolean;
  invertColors: boolean;
  grayscale: boolean;
  fontSizeStep: number; // -2 to +4, default 0
  textSpacing: boolean;
  lineHeight: boolean;
  hideImages: boolean;
  bigCursor: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
  keyboardNav: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  voiceOver: false,
  voiceRate: 1,
  voiceURI: '',
  highContrast: false,
  highlightLinks: false,
  invertColors: false,
  grayscale: false,
  fontSizeStep: 0,
  textSpacing: false,
  lineHeight: false,
  hideImages: false,
  bigCursor: false,
  underlineLinks: false,
  reduceMotion: false,
  keyboardNav: false,
};

const STORAGE_KEY = 'kumbh_a11y_preferences_v1';

interface VoiceOption {
  name: string;
  lang: string;
  voiceURI: string;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  toggleSetting: (key: keyof AccessibilitySettings) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  resetAll: () => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  availableVoices: VoiceOption[];
  activeFeaturesCount: number;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentHighlightedElRef = useRef<HTMLElement | null>(null);
  const isTouchRef = useRef(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore JSON parse or storage errors
    }
  }, []);

  // Save persistent preferences (excluding temporary speech states)
  const saveSettings = useCallback((newSettings: AccessibilitySettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // ignore storage errors
    }
  }, []);

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
      setSettings((prev) => {
        const updated = { ...prev, [key]: value };
        saveSettings(updated);
        return updated;
      });
    },
    [saveSettings]
  );

  const toggleSetting = useCallback(
    (key: keyof AccessibilitySettings) => {
      setSettings((prev) => {
        const updated = { ...prev, [key]: !prev[key] };
        saveSettings(updated);
        return updated;
      });
    },
    [saveSettings]
  );

  const increaseFontSize = useCallback(() => {
    setSettings((prev) => {
      const nextStep = Math.min(prev.fontSizeStep + 1, 4);
      const updated = { ...prev, fontSizeStep: nextStep };
      saveSettings(updated);
      return updated;
    });
  }, [saveSettings]);

  const decreaseFontSize = useCallback(() => {
    setSettings((prev) => {
      const nextStep = Math.max(prev.fontSizeStep - 1, -2);
      const updated = { ...prev, fontSizeStep: nextStep };
      saveSettings(updated);
      return updated;
    });
  }, [saveSettings]);

  const resetFontSize = useCallback(() => {
    setSettings((prev) => {
      const updated = { ...prev, fontSizeStep: 0 };
      saveSettings(updated);
      return updated;
    });
  }, [saveSettings]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    if (currentHighlightedElRef.current) {
      currentHighlightedElRef.current.classList.remove('a11y-speaking-target');
      currentHighlightedElRef.current = null;
    }
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const resetAll = useCallback(() => {
    stopSpeaking();
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [stopSpeaking]);

  // Load available speech synthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const populateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const mapped = voices.map((v) => ({
          name: v.name,
          lang: v.lang,
          voiceURI: v.voiceURI,
        }));
        setAvailableVoices(mapped);
      }
    };

    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Synchronize CSS classes and variables on documentElement
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // High Contrast
    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    // Highlight Links
    root.classList.toggle('a11y-highlight-links', settings.highlightLinks);
    // Invert Colors
    root.classList.toggle('a11y-invert-colors', settings.invertColors);
    // Grayscale
    root.classList.toggle('a11y-grayscale', settings.grayscale);
    // Text Spacing
    root.classList.toggle('a11y-text-spacing', settings.textSpacing);
    // Line Height
    root.classList.toggle('a11y-line-height', settings.lineHeight);
    // Hide Images
    root.classList.toggle('a11y-hide-images', settings.hideImages);
    // Big Cursor
    root.classList.toggle('a11y-big-cursor', settings.bigCursor);
    // Underline Links
    root.classList.toggle('a11y-underline-links', settings.underlineLinks);
    // Reduce Motion
    root.classList.toggle('a11y-reduce-motion', settings.reduceMotion);
    // Keyboard Nav
    root.classList.toggle('a11y-keyboard-nav', settings.keyboardNav);

    // Font size scaling
    if (settings.fontSizeStep !== 0) {
      const scale = 1 + settings.fontSizeStep * 0.08;
      root.style.setProperty('--a11y-font-scale', `${scale}`);
      root.classList.add('a11y-scaled-font');
    } else {
      root.style.removeProperty('--a11y-font-scale');
      root.classList.remove('a11y-scaled-font');
    }
  }, [settings]);

  // Voice Over: Speech Synthesis Handler
  const speakText = useCallback(
    (text: string, targetEl: HTMLElement) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      const trimmed = text.replace(/\s+/g, ' ').trim();
      if (!trimmed || trimmed.length < 2) return;

      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      if (currentHighlightedElRef.current) {
        currentHighlightedElRef.current.classList.remove('a11y-speaking-target');
      }

      // Highlight target element
      targetEl.classList.add('a11y-speaking-target');
      currentHighlightedElRef.current = targetEl;

      const utterance = new SpeechSynthesisUtterance(trimmed);
      utterance.rate = settings.voiceRate;

      // Select matching voice if specified
      if (settings.voiceURI) {
        const voices = window.speechSynthesis.getVoices();
        const found = voices.find((v) => v.voiceURI === settings.voiceURI);
        if (found) utterance.voice = found;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        if (currentHighlightedElRef.current === targetEl) {
          targetEl.classList.remove('a11y-speaking-target');
          currentHighlightedElRef.current = null;
        }
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        if (currentHighlightedElRef.current === targetEl) {
          targetEl.classList.remove('a11y-speaking-target');
          currentHighlightedElRef.current = null;
        }
      };

      activeUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [settings.voiceRate, settings.voiceURI]
  );

  // Helper to extract clean readable text from an element, ignoring icons and hidden content
  const getReadableText = (el: HTMLElement): string => {
    // Clone node to strip icons, scripts, and aria-hidden elements
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(
      '.material-symbols-outlined, .material-symbols, .material-icons, [aria-hidden="true"], svg, script, style, noscript, .notranslate'
    ).forEach((node) => node.remove());

    return clone.innerText || clone.textContent || '';
  };

  // Find candidate element to speak
  const findReadableTarget = (eventTarget: EventTarget | null): HTMLElement | null => {
    if (!eventTarget || !(eventTarget instanceof HTMLElement)) return null;

    // Do not trigger speech inside inputs, textareas, selects, or accessibility panel itself
    if (
      eventTarget.closest(
        'input, textarea, select, #a11y-toolbar-panel, #a11y-toggle-btn, [data-a11y-ignore]'
      )
    ) {
      return null;
    }

    // Check if target is an interactive or semantic text element
    const candidate = eventTarget.closest<HTMLElement>(
      'h1, h2, h3, h4, h5, h6, p, a, button, label, li, th, td, [role="button"], [role="link"], [role="heading"], blockquote, span, div'
    );

    if (!candidate) return null;

    // Verify it contains meaningful non-empty text
    const text = getReadableText(candidate);
    if (!text || text.trim().length < 2) return null;

    return candidate;
  };

  // Attach hover and touch listeners when Voice Over is active
  useEffect(() => {
    if (!settings.voiceOver) {
      stopSpeaking();
      return;
    }

    const handleTouchStart = () => {
      isTouchRef.current = true;
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }

      const target = findReadableTarget(e.target);
      if (!target) return;

      // 400ms dwell time on desktop
      hoverTimerRef.current = setTimeout(() => {
        const text = getReadableText(target);
        speakText(text, target);
      }, 400);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Tap on touch devices
      if (!isTouchRef.current) return;
      const target = findReadableTarget(e.target);
      if (!target) return;

      const text = getReadableText(target);
      speakText(text, target);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      stopSpeaking();
    };
  }, [settings.voiceOver, speakText, stopSpeaking]);

  // Count how many non-default features are active
  const activeFeaturesCount =
    (settings.voiceOver ? 1 : 0) +
    (settings.highContrast ? 1 : 0) +
    (settings.highlightLinks ? 1 : 0) +
    (settings.invertColors ? 1 : 0) +
    (settings.grayscale ? 1 : 0) +
    (settings.fontSizeStep !== 0 ? 1 : 0) +
    (settings.textSpacing ? 1 : 0) +
    (settings.lineHeight ? 1 : 0) +
    (settings.hideImages ? 1 : 0) +
    (settings.bigCursor ? 1 : 0) +
    (settings.underlineLinks ? 1 : 0) +
    (settings.reduceMotion ? 1 : 0) +
    (settings.keyboardNav ? 1 : 0);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        toggleSetting,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        resetAll,
        isPanelOpen,
        setIsPanelOpen,
        isSpeaking,
        stopSpeaking,
        availableVoices,
        activeFeaturesCount,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
