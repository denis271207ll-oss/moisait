'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangeCalendarProps {
  onDateRangeChange: (start: Date | null, end: Date | null) => void;
  unavailableDates?: Date[];
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export default function DateRangeCalendar({
  onDateRangeChange,
  unavailableDates = [],
  initialStartDate = null,
  initialEndDate = null,
}: DateRangeCalendarProps) {
  const { t } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  const isUnavailable = (date: Date): boolean => {
    return unavailableDates.some(
      (unavailableDate) =>
        new Date(unavailableDate).toDateString() === date.toDateString()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!startDate) return false;
    const dateStr = date.toDateString();
    const startStr = startDate.toDateString();
    const endStr = endDate?.toDateString();

    if (endStr) {
      const current = new Date(startDate);
      while (current <= endDate) {
        if (current.toDateString() === dateStr) return true;
        current.setDate(current.getDate() + 1);
      }
    }
    return dateStr === startStr || dateStr === endStr;
  };

  const isInRange = (date: Date): boolean => {
    if (!startDate || !endDate) return false;
    const dateStr = date.toDateString();
    const startStr = startDate.toDateString();
    const endStr = endDate.toDateString();
    return dateStr === startStr || dateStr === endStr || (
      date > startDate && date < endDate
    );
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handleDateClick = (date: Date) => {
    if (isPast(date) || isUnavailable(date)) return;

    const dateStr = date.toDateString();

    // If clicking on already selected date, clear selection
    if (startDate?.toDateString() === dateStr) {
      setStartDate(null);
      setEndDate(null);
      onDateRangeChange(null, null);
      return;
    }

    // If clicking on selected end date, clear to start
    if (endDate?.toDateString() === dateStr) {
      setEndDate(null);
      onDateRangeChange(startDate, null);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
      onDateRangeChange(date, null);
    } else {
      // Set end date
      if (date < startDate) {
        // Swap dates if end is before start
        setStartDate(date);
        setEndDate(startDate);
        onDateRangeChange(date, startDate);
      } else {
        setEndDate(date);
        onDateRangeChange(startDate, date);
      }
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust for Monday start (day 0 = Monday)
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    const days: Date[] = [];
    
    // Add empty cells for days before the first day
    for (let i = 0; i < startDay; i++) {
      days.push(new Date(0, 0, 0));
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  }, [currentMonth]);

  const monthName = t.calendar.monthNames[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  return (
    <div className="bg-[#121212] rounded-xl border border-white/10 p-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-110 text-white/60 hover:text-white disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-center">
          <h3 className="text-lg font-bold text-white">{monthName}</h3>
          <p className="text-sm text-white/60">{year}</p>
        </div>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-110 text-white/60 hover:text-white disabled:opacity-30"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {t.calendar.dayNamesShort.map((day) => (
          <div key={day} className="text-xs font-semibold text-white/40 text-center py-2 uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, index) => {
          const dayNum = date.getDate();
          const isEmpty = dayNum === 0;
          const past = !isEmpty && isPast(date);
          const unavailable = !isEmpty && isUnavailable(date);
          const today = !isEmpty && isToday(date);
          const selected = !isEmpty && isSelected(date);
          const inRange = !isEmpty && isInRange(date);

          return (
            <button
              key={index}
              onClick={() => !isEmpty && handleDateClick(date)}
              disabled={isEmpty || past || unavailable}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all duration-300
                ${isEmpty ? 'cursor-default' : 'cursor-pointer'}
                ${past ? 'opacity-30 cursor-not-allowed' : ''}
                ${unavailable ? 'opacity-30 cursor-not-allowed line-through decoration-white/50' : ''}
                ${today ? 'border-2 border-primary' : ''}
                ${selected ? 'bg-primary text-white shadow-lg badge-glow transform scale-110' : ''}
                ${inRange && !selected ? 'bg-primary/50 text-white' : ''}
                ${!isEmpty && !past && !unavailable && !selected && !inRange && !today ? 'hover:bg-white/10 hover:text-primary hover:scale-105 text-white/80' : 'text-white/80'}
              `}
              aria-label={isEmpty ? '' : `${dayNum} ${monthName} ${year}`}
            >
              {!isEmpty && dayNum}
            </button>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary/50" />
            <span>{t.calendar.selected}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded opacity-30 line-through decoration-white/50" />
            <span>{t.calendar.unavailable}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-primary" />
            <span>{t.calendar.today}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
