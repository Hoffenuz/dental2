import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { hapticImpact } from '../telegram';
import { fetchBookedSlots } from '../supabase';

export default function DateTimeStep({ 
  selectedDoctor, 
  selectedDate, 
  setSelectedDate, 
  selectedTime, 
  setSelectedTime, 
  onBack 
}) {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Keyingi 7 kunlik sanalarni hosil qilish
  const getNextDays = () => {
    const days = [];
    const weekdays = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
    const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

    for (let i = 0; i < 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      // Yakshanba dam olish kuni bo'lsa (0)
      const dayOfWeek = d.getDay();
      const isSunday = dayOfWeek === 0;

      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = i === 0 ? 'Bugun' : i === 1 ? 'Ertaga' : weekdays[dayOfWeek];
      const formattedDate = `${d.getDate()} ${months[d.getMonth()]}`;

      days.push({
        dateStr,
        dayLabel,
        formattedDate,
        isSunday
      });
    }
    return days;
  };

  const availableDays = getNextDays();

  // Standart qabul vaqtlari (09:00 dan 18:00 gacha, 13:00-14:00 tushlik)
  const allTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Tanlangan sana yoki shifokor o'zgarganda band vaqtlarni yuklash
  useEffect(() => {
    if (!selectedDate || !selectedDoctor) return;

    let isMounted = true;
    setLoadingSlots(true);

    fetchBookedSlots(selectedDoctor.id, selectedDate)
      .then((slots) => {
        if (isMounted) {
          setBookedSlots(slots || []);
          setLoadingSlots(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => { isMounted = false; };
  }, [selectedDoctor, selectedDate]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">3. Qabul kuni va soatini tanlang</h2>
          <p className="text-xs text-slate-500">
            Shifokor: <span className="font-semibold text-slate-700">{selectedDoctor?.full_name}</span>
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg"
        >
          Ortga
        </button>
      </div>

      {/* Kunlar karuseli */}
      <div>
        <label className="text-xs font-bold text-slate-700 mb-1.5 block">
          Qabul sanasi:
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          {availableDays.map((day) => {
            const isSelected = selectedDate === day.dateStr;
            const disabled = day.isSunday;

            return (
              <button
                key={day.dateStr}
                disabled={disabled}
                onClick={() => {
                  hapticImpact('light');
                  setSelectedDate(day.dateStr);
                  setSelectedTime(''); // Yangi kunda soatni qayta tanlash
                }}
                className={`min-w-[76px] py-2 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  disabled
                    ? 'bg-slate-100 text-slate-300 opacity-60 cursor-not-allowed'
                    : isSelected
                    ? 'bg-cyan-600 text-white shadow-sm ring-2 ring-cyan-500/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <span className={`text-[11px] font-semibold ${isSelected ? 'text-cyan-100' : 'text-slate-500'}`}>
                  {day.dayLabel}
                </span>
                <span className="text-xs font-bold mt-0.5 whitespace-nowrap">
                  {day.formattedDate}
                </span>
                {disabled && (
                  <span className="text-[9px] text-red-400 mt-0.5 font-medium">Dam olish</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Soatlar to'ri */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-600" />
            Mavjud bo'sh soatlar:
          </label>
          <span className="text-[11px] text-slate-400">13:00 - 14:00 Tushlik</span>
        </div>

        {loadingSlots ? (
          <div className="py-8 text-center text-xs text-slate-400">
            Bo'sh soatlar tekshirilmoqda...
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {allTimeSlots.map((time) => {
              const isBooked = bookedSlots.includes(time);
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => {
                    hapticImpact('light');
                    setSelectedTime(time);
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all ${
                    isBooked
                      ? 'bg-slate-100 text-slate-300 border border-slate-200/50 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-cyan-600 text-white ring-2 ring-cyan-500/20 shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50/30'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500 justify-center">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300"></span>
            <span>Bo'sh</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span>
            <span>Tanlangan</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span className="line-through text-slate-400">Band</span>
          </div>
        </div>
      </div>
    </div>
  );
}
