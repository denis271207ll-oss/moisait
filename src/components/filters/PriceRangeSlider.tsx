'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: PriceRangeSliderProps) {
  const { t } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const minHandleRef = useRef<HTMLButtonElement>(null);
  const maxHandleRef = useRef<HTMLButtonElement>(null);
  const activeRangeRef = useRef<HTMLDivElement>(null);

  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const rafRef = useRef<number | null>(null);
  const minGap = 10;

  // Calculate percentages
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  // Sync with props
  useEffect(() => {
    if (!isDragging) {
      setMinValue(value[0]);
      setMaxValue(value[1]);
    }
  }, [value, isDragging]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Update slider value with requestAnimationFrame for smoothness
  const updateSlider = useCallback((clientX: number) => {
    if (!trackRef.current || !isDragging) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newValue = Math.round(min + percent * (max - min));

    // Cancel any pending animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    // Schedule update using requestAnimationFrame
    rafRef.current = requestAnimationFrame(() => {
      if (isDragging === 'min') {
        const newMin = Math.min(newValue, maxValue - minGap);
        setMinValue(newMin);
        onChange([newMin, maxValue]);
      } else if (isDragging === 'max') {
        const newMax = Math.max(newValue, minValue + minGap);
        setMaxValue(newMax);
        onChange([minValue, newMax]);
      }
      rafRef.current = null;
    });
  }, [min, max, minValue, maxValue, isDragging, onChange, minGap]);

  // Handle mouse down on handle
  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(handle);

    // Remove transition during drag for instant response
    if (activeRangeRef.current) {
      activeRangeRef.current.style.transition = 'none';
    }
    if (handle === 'min' && minHandleRef.current) {
      minHandleRef.current.style.transition = 'none';
    } else if (handle === 'max' && maxHandleRef.current) {
      maxHandleRef.current.style.transition = 'none';
    }

    // Attach document-level listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle touch start on handle
  const handleTouchStart = (handle: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(handle);

    // Remove transition during drag for instant response
    if (activeRangeRef.current) {
      activeRangeRef.current.style.transition = 'none';
    }
    if (handle === 'min' && minHandleRef.current) {
      minHandleRef.current.style.transition = 'none';
    } else if (handle === 'max' && maxHandleRef.current) {
      maxHandleRef.current.style.transition = 'none';
    }

    // Attach document-level listeners with passive: false to prevent scroll
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchUp);
  };

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSlider(e.clientX);
  };

  // Touch move handler - prevents page scroll while dragging
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent page scroll
    updateSlider(e.touches[0].clientX);
  };

  // Mouse up handler
  const handleMouseUp = () => {
    if (!isDragging) return;

    // Re-enable transitions
    setTimeout(() => {
      if (activeRangeRef.current) {
        activeRangeRef.current.style.transition = 'all 0.2s ease';
      }
      if (minHandleRef.current) {
        minHandleRef.current.style.transition = 'all 0.2s ease';
      }
      if (maxHandleRef.current) {
        maxHandleRef.current.style.transition = 'all 0.2s ease';
      }
    }, 0);

    setIsDragging(null);

    // Clean up listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchUp);
  };

  // Touch end handler
  const handleTouchUp = () => {
    handleMouseUp();
  };

  return (
    <div className="bg-[#121212] rounded-xl border border-white/10 p-4 shadow-lg select-none">
      {/* Price Display */}
      <div className="mb-4 text-center">
        <p className="text-sm text-white/60 mb-1">
          {t.fleet.priceRange || 'Price Range'}
        </p>
        <p className="text-lg font-bold text-white">
          {t.fleet.price || 'Price'}: <span className="text-primary">€{minValue}</span> – <span className="text-primary">€{maxValue}</span>
          <span className="text-white/60 font-normal text-sm ml-1">/{t.fleet.pricePerDay || 'day'}</span>
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative py-2">
        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-2 bg-white/10 rounded-full select-none"
          style={{ touchAction: 'none' }}
        >
          {/* Active Range */}
          <div
            ref={activeRangeRef}
            className="absolute h-full bg-gradient-to-r from-primary to-[#8A3FFC] rounded-full transition-all duration-200"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>

        {/* Min Handle */}
        <button
          ref={minHandleRef}
          type="button"
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleTouchStart('min')}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0D0D0D] border-2 border-[#8A3FFC] shadow-lg cursor-pointer hover:scale-110 active:scale-110 transition-all duration-200 flex items-center justify-center z-10"
          style={{ left: `calc(${minPercent}% - 16px)` }}
          aria-label="Minimum price"
        >
          <div
            className={`w-3 h-3 rounded-full bg-[#8A3FFC] transition-all duration-200 ${
              isDragging === 'min' ? 'scale-125 shadow-[0_0_12px_rgba(138,63,252,0.6)]' : ''
            }`}
          />
        </button>

        {/* Max Handle */}
        <button
          ref={maxHandleRef}
          type="button"
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleTouchStart('max')}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0D0D0D] border-2 border-[#8A3FFC] shadow-lg cursor-pointer hover:scale-110 active:scale-110 transition-all duration-200 flex items-center justify-center z-10"
          style={{ left: `calc(${maxPercent}% - 16px)` }}
          aria-label="Maximum price"
        >
          <div
            className={`w-3 h-3 rounded-full bg-[#8A3FFC] transition-all duration-200 ${
              isDragging === 'max' ? 'scale-125 shadow-[0_0_12px_rgba(138,63,252,0.6)]' : ''
            }`}
          />
        </button>
      </div>

      {/* Price Labels */}
      <div className="flex justify-between mt-4">
        <span className="text-sm text-white/40">€{min}</span>
        <span className="text-sm text-white/40">€{max}</span>
      </div>
    </div>
  );
}
