'use client';
import React, { useState, useEffect, useRef, TouchEvent } from 'react';

interface MobileCarouselProps {
  children: React.ReactNode[];
  desktopGridClasses?: string;
}

export default function MobileCarousel({
  children,
  desktopGridClasses = 'grid-cols-3 gap-6',
}: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const childArray = React.Children.toArray(children);
  const total = childArray.length;
  const shouldAutoplay = total >= 3;

  const goTo = (idx: number) => setCurrentIndex(idx);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % total);
  const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  useEffect(() => {
    if (shouldAutoplay && !isPaused) {
      timeoutRef.current = setTimeout(goNext, 3000);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused, shouldAutoplay, total]);

  const handleTouchStart = (e: TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const dist = touchStartX.current - touchEndX.current;
      if (dist > 50) goNext();
      else if (dist < -50) goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <div className="w-full relative">
      {/* ── Mobile: sliding carousel ── */}
      <div
        className="md:hidden w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden w-full">
          <div
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {childArray.map((child, idx) => (
              <div key={idx} className="min-w-full w-full flex-shrink-0 px-1">
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {childArray.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { goTo(idx); setIsPaused(true); setTimeout(() => setIsPaused(false), 3000); }}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-[#984300]' : 'w-2 bg-[#dcdad5]'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop: original grid ── */}
      <div className={`hidden md:grid ${desktopGridClasses}`}>
        {children}
      </div>
    </div>
  );
}
