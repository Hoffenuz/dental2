import React, { useState } from 'react';
import { Calendar, Clock, User, AlertCircle, XCircle, CheckCircle, Clock4, RefreshCw } from 'lucide-react';
import { hapticImpact, hapticNotification } from '../telegram';
import { cancelAppointment, updateLocalBookingStatus } from '../supabase';

export default function MyBookingsView({ bookings, onRefresh, onGoToBooking }) {
  const [filter, setFilter] = useState('all');
  const [cancelingId, setCancelingId] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'tasdiqlandi':
        return {
          label: 'Tasdiqlangan',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle
        };
      case 'qabulda':
        return {
          label: 'Hozir qabulda',
          bg: 'bg-sky-50 text-sky-700 border-sky-200 animate-pulse',
          icon: Clock4
        };
      case 'yakunlandi':
        return {
          label: 'Yakunlangan',
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
          icon: CheckCircle
        };
      case 'bekor_qilindi':
        return {
          label: 'Bekor qilingan',
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: XCircle
        };
      case 'kutilmoqda':
      default:
        return {
          label: 'Kutilmoqda',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock
        };
    }
  };

  const handleCancelBooking = async (id) => {
    hapticImpact('heavy');
    await cancelAppointment(id);
    hapticNotification('success');
    setCancelingId(null);
    onRefresh();
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === 'active') return b.status === 'kutilmoqda' || b.status === 'tasdiqlandi' || b.status === 'qabulda';
    if (filter === 'completed') return b.status === 'yakunlandi';
    if (filter === 'cancelled') return b.status === 'bekor_qilindi';
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Mening navbatlarim</h2>
          <p className="text-xs text-slate-500">Qabul vaqtlari va holatini kuzatish</p>
        </div>
        <button
          onClick={() => {
            hapticImpact('light');
            onRefresh();
          }}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-cyan-600 shadow-2xs"
          title="Yangilash"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter tablar */}
      <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
        {[
          { id: 'all', label: 'Barchasi' },
          { id: 'active', label: 'Faol' },
          { id: 'completed', label: 'Yakunlangan' },
          { id: 'cancelled', label: 'Bekor' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              hapticImpact('light');
              setFilter(tab.id);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === tab.id
                ? 'bg-white text-cyan-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Navbatlar ro'yxati */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">Hozircha navbatlar mavjud emas</h3>
              <p className="text-xs text-slate-500 mt-0.5">Yangi qabul vaqtini tanlab, navbat oling</p>
            </div>
            <button
              onClick={onGoToBooking}
              className="py-2.5 px-4 bg-cyan-600 text-white font-bold text-xs rounded-xl shadow-xs inline-block"
            >
              Navbat olish
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const statusInfo = getStatusBadge(b.status);
            const StatusIcon = statusInfo.icon;
            const canCancel = b.status === 'kutilmoqda' || b.status === 'tasdiqlandi';

            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: #{b.id.slice(-6).toUpperCase()}
                    </span>
                    <h3 className="font-bold text-sm text-slate-800 mt-0.5">
                      {b.service_name || "Stomatologiya ko'rigi"}
                    </h3>
                    <p className="text-xs font-medium text-cyan-700">
                      {b.doctor_name}
                    </p>
                  </div>

                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 ${statusInfo.bg}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusInfo.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="font-semibold">{b.appointment_date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="font-semibold">{b.start_time}</span>
                  </div>
                </div>

                {b.patient_complaint && (
                  <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100 italic">
                    "{b.patient_complaint}"
                  </p>
                )}

                {canCancel && (
                  <div className="pt-1 flex justify-end">
                    {cancelingId === b.id ? (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-500 text-[11px]">Bekor qilasizmi?</span>
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold"
                        >
                          Ha, bekor qilish
                        </button>
                        <button
                          onClick={() => setCancelingId(null)}
                          className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                        >
                          Yo'q
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          hapticImpact('light');
                          setCancelingId(b.id);
                        }}
                        className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 py-1 px-2 rounded-lg hover:bg-rose-50"
                      >
                        Navbatni bekor qilish
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
