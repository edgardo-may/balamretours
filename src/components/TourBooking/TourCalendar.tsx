import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import type { TourDateAvailability } from '../../hooks/useTourDates';

interface TourCalendarProps {
  dates: TourDateAvailability[];
  loading: boolean;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function TourCalendar({ dates, loading, selectedDate, onSelectDate }: TourCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [currentMonth]);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (loading) {
    return (
      <div className="w-full bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-teal-600 mb-3" />
        <p className="text-sm text-slate-500 font-medium">Buscando disponibilidad...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-2 bg-white shadow-sm hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-black text-slate-800 capitalize">
          {currentMonth.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 bg-white shadow-sm hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-slate-400 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {daysInMonth.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className="p-2" />;

          // Use local time for formatting to avoid timezone offset issues
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const dateStr = `${year}-${month}-${day}`;
          
          const isPast = date < today;
          
          // Compatibilidad robusta: extraer solo YYYY-MM-DD sea timestamp, datetime o string simple
          const availability = dates.find(d => {
            if (!d.fecha) return false;
            const dbDate = d.fecha.split('T')[0].split(' ')[0];
            return dbDate === dateStr;
          });

          // Requisito: Ocultar completamente fechas anteriores
          if (isPast) {
            return <div key={dateStr} className="p-2" />;
          }

          // Requisito: Mantener visibles únicamente fechas existentes en la base
          if (!availability) {
            return (
              <div key={dateStr} className="relative w-full aspect-square flex items-center justify-center text-sm font-bold text-slate-200">
                {date.getDate()}
              </div>
            );
          }

          const isAvailable = availability.cupos_disponibles > 0;
          const isFull = availability.cupos_disponibles <= 0;
          const isSelected = selectedDate === dateStr;

          let buttonClass = "relative w-full aspect-square flex items-center justify-center text-sm font-bold rounded-xl transition-all duration-200 ";
          
          if (isAvailable) {
            buttonClass += isSelected 
              ? "bg-teal-600 text-white shadow-md shadow-teal-200 scale-105 " 
              : "bg-white text-teal-700 hover:bg-teal-50 hover:scale-105 shadow-sm cursor-pointer ";
          } else if (isFull) {
            buttonClass += "bg-red-50 text-red-400 cursor-not-allowed border border-red-100 ";
          }

          return (
            <div key={dateStr} className="relative group">
              <button
                type="button"
                disabled={!isAvailable}
                onClick={() => isAvailable && onSelectDate(dateStr)}
                className={buttonClass}
              >
                {date.getDate()}
              </button>
              
              {/* Tooltip */}
              {availability && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2.5 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 shadow-xl">
                  {isAvailable 
                    ? `${availability.cupos_disponibles} cupos libres`
                    : 'Agotado'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
