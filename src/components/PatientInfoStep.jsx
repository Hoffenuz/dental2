import React, { useState } from 'react';
import { User, Phone, MessageSquare, ShieldAlert, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { hapticImpact, hapticNotification } from '../telegram';

export default function PatientInfoStep({
  selectedService,
  selectedDoctor,
  selectedDate,
  selectedTime,
  patientName,
  setPatientName,
  patientPhone,
  setPatientPhone,
  complaint,
  setComplaint,
  onSubmitBooking,
  submitting,
  onBack
}) {
  const [error, setError] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!patientName.trim()) {
      setError('Iltimos, ism va familiyangizni kiriting');
      hapticNotification('error');
      return;
    }

    if (!patientPhone.trim() || patientPhone.length < 9) {
      setError("Iltimos, to'g'ri telefon raqam kiriting (masalan: +998 90 123 45 67)");
      hapticNotification('error');
      return;
    }

    hapticImpact('heavy');
    onSubmitBooking();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">4. Ma'lumotlaringizni tasdiqlang</h2>
          <p className="text-xs text-slate-500">Shifokor siz bilan bog'lanishi uchun zarur</p>
        </div>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg"
        >
          Ortga
        </button>
      </div>

      {/* Navbat xulosasi (Booking Summary) */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-white border border-cyan-200/80 shadow-xs space-y-2.5">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-cyan-800 bg-cyan-100/70 px-2 py-0.5 rounded-md">
              {selectedService?.category}
            </span>
            <h3 className="font-bold text-sm text-slate-900 mt-1">
              {selectedService?.name}
            </h3>
          </div>
          <span className="text-sm font-extrabold text-cyan-700">
            {formatPrice(selectedService?.price_uzs || 0)}
          </span>
        </div>

        <div className="pt-2 border-t border-cyan-100/80 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Shifokor:</span>
            <span className="font-semibold text-slate-800">{selectedDoctor?.full_name}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Xona:</span>
            <span className="font-semibold text-slate-800">{selectedDoctor?.room_number || 'Xona 1'}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Sana:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-600" />
              {selectedDate}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Vaqt:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-600" />
              {selectedTime}
            </span>
          </div>
        </div>
      </div>

      {/* Bemor anketasi formasi */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-slate-700 mb-1 block">
            Ism va Familiyangiz *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Masalan: Aziz Rahimov"
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 mb-1 block">
            Telefon raqamingiz *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="tel"
              required
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Band qilingan navbat haqida SMS va eslatma shu raqamga yuboriladi
          </p>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 mb-1 block">
            Shikoyat yoki qo'shimcha izoh (ixtiyoriy)
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <textarea
              rows={2}
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Qaysi tish bezovta qilayotgani haqida yozing..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
        >
          {submitting ? (
            <span>Navbat rasmiylashtirilmoqda...</span>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Navbatni band qilish</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
