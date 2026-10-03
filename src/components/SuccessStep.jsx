import React from 'react';
import { CheckCircle, Calendar, Clock, User, Stethoscope, MapPin, Share2, ArrowRight } from 'lucide-react';
import { getTelegram, hapticImpact } from '../telegram';

export default function SuccessStep({ booking, onReset, onViewMyBookings }) {
  const tg = getTelegram();

  const handleCloseTelegram = () => {
    hapticImpact('light');
    if (tg && tg.close) {
      tg.close();
    } else {
      onViewMyBookings();
    }
  };

  return (
    <div className="space-y-4 py-2">
      <div className="text-center space-y-1.5">
        <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-bounce">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800">
          Navbatingiz qabul qilindi!
        </h2>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Qabul vaqti va shifokor ma'lumotlari muvaffaqiyatli saqlandi
        </p>
      </div>

      {/* Elektron Chipta (Digital Ticket) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden relative">
        {/* Yuqori qism */}
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-4">
          <div className="flex items-center justify-between text-xs opacity-90">
            <span>DentaCare Klinika Chiptasi</span>
            <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-[10px]">
              ID: #{booking.id.slice(-6).toUpperCase()}
            </span>
          </div>
          <h3 className="text-base font-bold mt-2">
            {booking.service_name || 'Stomatologiya Qabuli'}
          </h3>
          <p className="text-xs opacity-80 mt-0.5">
            {booking.doctor_name}
          </p>
        </div>

        {/* Chipta tishlari (Ticket cutouts) */}
        <div className="relative h-4 bg-slate-100/50 flex items-center justify-between px-2">
          <div className="w-4 h-4 rounded-full bg-slate-50 -ml-4 border-r border-slate-200"></div>
          <div className="border-b border-dashed border-slate-300 w-full mx-2"></div>
          <div className="w-4 h-4 rounded-full bg-slate-50 -mr-4 border-l border-slate-200"></div>
        </div>

        {/* Chipta tafsilotlari */}
        <div className="p-4 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cyan-600" /> Sana:
              </span>
              <span className="font-bold text-slate-800 mt-0.5 block">
                {booking.appointment_date}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-600" /> Soat:
              </span>
              <span className="font-bold text-slate-800 mt-0.5 block">
                {booking.start_time}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-1 text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Bemor:</span>
              <span className="font-semibold text-slate-800">{booking.patient_name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Telefon:</span>
              <span className="font-semibold text-slate-800">{booking.patient_phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Holati:</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                Kutilmoqda (Admin tasdiqlashi)
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Manzil:</span>
              <span className="font-medium text-slate-800 text-right">Minor metro, Amir Temur 45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tugmalar */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleCloseTelegram}
          className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Telegram Botga Qaytish</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onViewMyBookings}
          className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"
        >
          Mening navbatlarimni ko'rish
        </button>

        <button
          onClick={onReset}
          className="w-full py-2 text-center text-[11px] text-slate-400 hover:text-slate-600 font-medium"
        >
          Yana boshqa qabulga yozilish
        </button>
      </div>
    </div>
  );
}
