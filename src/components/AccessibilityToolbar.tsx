'use client';

import React, { useEffect, useRef } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import {
  Volume2,
  VolumeX,
  Contrast,
  Link as LinkIcon,
  Sparkles,
  Palette,
  Type,
  MoveHorizontal,
  AlignJustify,
  ImageOff,
  MousePointer,
  Underline,
  ZapOff,
  Keyboard,
  RotateCcw,
  X,
  Check,
  SlidersHorizontal,
  PlayCircle,
  StopCircle,
} from 'lucide-react';

export function AccessibilityToolbar() {
  const {
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
  } = useAccessibility();

  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        setIsPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, setIsPanelOpen]);

  // Click outside to close panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('#a11y-toggle-btn')
      ) {
        setIsPanelOpen(false);
      }
    };
    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPanelOpen, setIsPanelOpen]);

  return (
    <>
      {/* Skip to Main Content Link for screen readers & keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:bg-[#984300] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-2xl focus:font-bold focus:outline-none focus:ring-4 focus:ring-amber-300"
      >
        Skip to main content / मुख्य सामग्रीवर जा
      </a>

      {/* Slide-out / Dropdown Accessibility Panel */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 z-[400] bg-black/40 backdrop-blur-xs flex justify-center items-start pt-2 sm:pt-6 px-2 sm:px-4 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-dialog-title"
        >
          <div
            ref={panelRef}
            id="a11y-toolbar-panel"
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#e5e2dd] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div className="bg-[#fcf9f4] border-b border-[#e5e2dd] px-4 sm:px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#984300]/10 text-[#984300] flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="a11y-dialog-title" className="text-[15px] sm:text-[16px] font-bold text-[#1c1c19] flex items-center gap-2">
                    <span>Accessibility Grid</span>
                    {activeFeaturesCount > 0 && (
                      <span className="text-[11px] font-semibold bg-[#984300] text-white px-2 py-0.5 rounded-full">
                        {activeFeaturesCount} Active
                      </span>
                    )}
                  </h2>
                  <p className="text-[11px] text-[#786d66]">Personalize your reading, vision, and browsing experience</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeFeaturesCount > 0 && (
                  <button
                    type="button"
                    onClick={resetAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e2dd] bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-[#564339] text-[12px] font-semibold transition-colors"
                    title="Reset all settings to default"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset All</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f0ede9] hover:bg-[#e4dfd8] text-[#564339] flex items-center justify-center transition-colors"
                  aria-label="Close accessibility panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* ── GROUP 1: VOICE OVER (BETA) ── */}
              <section className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-extrabold uppercase tracking-wider text-[#984300]">
                        Voice Over (Beta)
                      </span>
                      {isSpeaking && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-200/70 px-2 py-0.5 rounded-full animate-pulse">
                          <Volume2 className="w-3 h-3" /> Speaking...
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#564339] font-medium mt-0.5">
                      Hover or tap text to read aloud.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSpeaking && (
                      <button
                        type="button"
                        onClick={stopSpeaking}
                        className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-sm transition"
                      >
                        <StopCircle className="w-3.5 h-3.5" />
                        <span>Stop</span>
                      </button>
                    )}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={settings.voiceOver}
                      onClick={() => toggleSetting('voiceOver')}
                      className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#984300] ${
                        settings.voiceOver ? 'bg-[#984300]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          settings.voiceOver ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {settings.voiceOver && (
                  <div className="pt-3 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200">
                    {/* Voice Speed Controls */}
                    <div>
                      <label className="text-[11px] font-bold text-[#564339] block mb-1.5">
                        Reading Speed / गती
                      </label>
                      <div className="flex gap-1.5">
                        {[0.75, 1, 1.25, 1.5].map((rate) => (
                          <button
                            key={rate}
                            type="button"
                            onClick={() => updateSetting('voiceRate', rate)}
                            className={`flex-1 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                              settings.voiceRate === rate
                                ? 'bg-[#984300] text-white border-[#984300]'
                                : 'bg-white text-[#564339] border-[#e5e2dd] hover:border-[#984300]'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Voice Selection (if available) */}
                    <div>
                      <label className="text-[11px] font-bold text-[#564339] block mb-1.5">
                        Synthesizer Voice / आवाज
                      </label>
                      <select
                        value={settings.voiceURI}
                        onChange={(e) => updateSetting('voiceURI', e.target.value)}
                        className="w-full bg-white border border-[#e5e2dd] rounded-lg px-2.5 py-1.5 text-[11px] text-[#3c2e28] focus:outline-none focus:ring-2 focus:ring-[#984300]"
                      >
                        <option value="">Browser Default Voice</option>
                        {availableVoices.map((v) => (
                          <option key={v.voiceURI} value={v.voiceURI}>
                            {v.name} ({v.lang})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </section>

              {/* ── GROUP 2: COLOR & CONTRAST ── */}
              <section>
                <h3 className="text-[12px] font-extrabold uppercase tracking-wider text-[#786d66] mb-3 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#984300]" />
                  <span>Color & Contrast</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* High Contrast */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('highContrast')}
                    aria-pressed={settings.highContrast}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.highContrast
                        ? 'bg-[#1c1c19] text-white border-[#1c1c19] ring-2 ring-amber-400'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <Contrast className="w-5 h-5 mb-1.5 text-[#984300] group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">High Contrast</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.highContrast ? 'Active' : 'Off'}
                    </span>
                  </button>

                  {/* Highlight Links */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('highlightLinks')}
                    aria-pressed={settings.highlightLinks}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.highlightLinks
                        ? 'bg-amber-100 text-amber-950 border-amber-400 ring-2 ring-amber-500 font-bold'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <LinkIcon className="w-5 h-5 mb-1.5 text-amber-700 group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Highlight Links</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.highlightLinks ? 'Active' : 'Off'}
                    </span>
                  </button>

                  {/* Invert Colors */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('invertColors')}
                    aria-pressed={settings.invertColors}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.invertColors
                        ? 'bg-indigo-900 text-white border-indigo-700 ring-2 ring-indigo-400'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 mb-1.5 text-indigo-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Invert Colors</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.invertColors ? 'Active' : 'Off'}
                    </span>
                  </button>

                  {/* Grayscale */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('grayscale')}
                    aria-pressed={settings.grayscale}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.grayscale
                        ? 'bg-slate-800 text-white border-slate-700 ring-2 ring-slate-400'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-slate-400 bg-gradient-to-r from-slate-400 to-slate-700 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Grayscale</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.grayscale ? 'Active' : 'Off'}
                    </span>
                  </button>
                </div>
              </section>

              {/* ── GROUP 3: TEXT ADJUSTMENTS ── */}
              <section>
                <h3 className="text-[12px] font-extrabold uppercase tracking-wider text-[#786d66] mb-3 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#984300]" />
                  <span>Text Adjustments</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Font Size (+ / - / Reset) */}
                  <div className="bg-[#fcf9f4] p-3 rounded-xl border border-[#e5e2dd] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11.5px] font-bold text-[#3c2e28]">Font Size</span>
                      <span className="text-[11px] font-bold text-[#984300] bg-white px-2 py-0.5 rounded border border-[#e5e2dd]">
                        {settings.fontSizeStep > 0
                          ? `+${settings.fontSizeStep}`
                          : settings.fontSizeStep === 0
                          ? '0 (Default)'
                          : `${settings.fontSizeStep}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={decreaseFontSize}
                        disabled={settings.fontSizeStep <= -2}
                        className="flex-1 py-1 bg-white hover:bg-[#f4efe8] disabled:opacity-40 border border-[#e5e2dd] rounded-lg text-sm font-bold text-[#3c2e28]"
                        title="Decrease font size"
                      >
                        A-
                      </button>
                      <button
                        type="button"
                        onClick={resetFontSize}
                        className="px-2.5 py-1 bg-white hover:bg-[#f4efe8] border border-[#e5e2dd] rounded-lg text-xs font-semibold text-[#564339]"
                        title="Reset font size"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={increaseFontSize}
                        disabled={settings.fontSizeStep >= 4}
                        className="flex-1 py-1 bg-white hover:bg-[#f4efe8] disabled:opacity-40 border border-[#e5e2dd] rounded-lg text-sm font-bold text-[#3c2e28]"
                        title="Increase font size"
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  {/* Text Spacing */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('textSpacing')}
                    aria-pressed={settings.textSpacing}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.textSpacing
                        ? 'bg-[#984300]/10 text-[#984300] border-[#984300] font-bold ring-2 ring-[#984300]'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <MoveHorizontal className="w-5 h-5 mb-1.5 text-[#984300] group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Text Spacing</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.textSpacing ? 'Increased' : 'Standard'}
                    </span>
                  </button>

                  {/* Line Height */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('lineHeight')}
                    aria-pressed={settings.lineHeight}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.lineHeight
                        ? 'bg-[#984300]/10 text-[#984300] border-[#984300] font-bold ring-2 ring-[#984300]'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <AlignJustify className="w-5 h-5 mb-1.5 text-[#984300] group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Line Height</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.lineHeight ? 'Spacious (1.8x)' : 'Standard'}
                    </span>
                  </button>
                </div>
              </section>

              {/* ── GROUP 4: OTHER CONTROLS ── */}
              <section>
                <h3 className="text-[12px] font-extrabold uppercase tracking-wider text-[#786d66] mb-3 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#984300]" />
                  <span>Other Controls</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {/* Hide Images */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('hideImages')}
                    aria-pressed={settings.hideImages}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.hideImages
                        ? 'bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-400 font-bold'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <ImageOff className="w-5 h-5 mb-1.5 text-rose-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Hide Images</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.hideImages ? 'Hidden' : 'Visible'}
                    </span>
                  </button>

                  {/* Big Cursor */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('bigCursor')}
                    aria-pressed={settings.bigCursor}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.bigCursor
                        ? 'bg-blue-50 text-blue-900 border-blue-300 ring-2 ring-blue-400 font-bold'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <MousePointer className="w-5 h-5 mb-1.5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Big Cursor</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.bigCursor ? 'Active' : 'Normal'}
                    </span>
                  </button>

                  {/* Underline Links */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('underlineLinks')}
                    aria-pressed={settings.underlineLinks}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.underlineLinks
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-2 ring-emerald-400 font-bold'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <Underline className="w-5 h-5 mb-1.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Underline Links</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.underlineLinks ? 'Underlined' : 'Default'}
                    </span>
                  </button>

                  {/* Reduce Motion */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('reduceMotion')}
                    aria-pressed={settings.reduceMotion}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition group min-h-[82px] ${
                      settings.reduceMotion
                        ? 'bg-purple-50 text-purple-900 border-purple-300 ring-2 ring-purple-400 font-bold'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <ZapOff className="w-5 h-5 mb-1.5 text-purple-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Reduce Motion</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.reduceMotion ? 'Paused' : 'Normal'}
                    </span>
                  </button>

                  {/* Keyboard Nav */}
                  <button
                    type="button"
                    onClick={() => toggleSetting('keyboardNav')}
                    aria-pressed={settings.keyboardNav}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition group min-h-[82px] col-span-2 sm:col-span-1 ${
                      settings.keyboardNav
                        ? 'bg-orange-50 text-orange-950 border-orange-300 ring-2 ring-orange-400 font-bold'
                        : 'bg-[#fcf9f4] hover:bg-white text-[#3c2e28] border-[#e5e2dd]'
                    }`}
                  >
                    <Keyboard className="w-5 h-5 mb-1.5 text-orange-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[11.5px] font-bold">Keyboard Nav</span>
                    <span className="text-[9.5px] opacity-75 mt-0.5">
                      {settings.keyboardNav ? 'Enhanced' : 'Default'}
                    </span>
                  </button>
                </div>
              </section>
            </div>

            {/* Footer with Quick Info */}
            <div className="bg-[#fcf9f4] border-t border-[#e5e2dd] px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] text-[#786d66]">
              <span>Settings are saved automatically to your device</span>
              <button
                type="button"
                onClick={() => setIsPanelOpen(false)}
                className="px-3 py-1 rounded bg-[#984300] hover:bg-[#7e3700] text-white font-bold transition shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Compact Accessibility Trigger button for Topbar / Navigation headers.
 */
export function AccessibilityTrigger({ className = '' }: { className?: string }) {
  const { isPanelOpen, setIsPanelOpen, activeFeaturesCount } = useAccessibility();

  return (
    <button
      id="a11y-toggle-btn"
      type="button"
      onClick={() => setIsPanelOpen((prev) => !prev)}
      aria-haspopup="dialog"
      aria-expanded={isPanelOpen}
      aria-label="Open accessibility toolbar"
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white border border-[#e5e2dd] text-[11.5px] font-medium text-[#564339] hover:text-[#984300] transition-all shadow-xs ${className}`}
    >
      <SlidersHorizontal className="w-3.5 h-3.5 text-[#984300]" />
      <span className="font-semibold">Accessibility</span>
      {activeFeaturesCount > 0 && (
        <span className="w-4 h-4 rounded-full bg-[#984300] text-white text-[9.5px] font-bold flex items-center justify-center leading-none">
          {activeFeaturesCount}
        </span>
      )}
    </button>
  );
}
