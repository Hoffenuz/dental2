import React from 'react';
import { Calendar, UserCheck, Info, PhoneCall } from 'lucide-react';
import { hapticImpact } from '../telegram';

export default function Navbar({ activeTab, setActiveTab, clinicPhone }) {
  const navItems = [
    { id: 'booking', label: 'Navbat olish', icon: Calendar },
    { id: 'my-bookings', label: 'Navbatlarim', icon: UserCheck },
    { id: 'clinic', label: 'Klinika', icon: Info }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            🦷
          </div>
          <div>
            <h1 className="font-extrabold text-sm leading-tight text-slate-800 tracking-tight">ISMAILOV <span className="text-cyan-600">DENTAL</span></h1>
            <p className="text-[10px] text-teal-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
              09:00 - 19:00 Ochiq
            </p>
          </div>
        </div>

        <a
          href={`tel:${clinicPhone || '+998974229992'}`}
          onClick={() => hapticImpact('light')}
          className="flex items-center gap-1.5 text-xs font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-1.5 rounded-full border border-cyan-200/60 hover:bg-cyan-100 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-cyan-600" />
          <span>Qo'ng'iroq</span>
        </a>
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto px-4 pb-2 pt-1 flex gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                hapticImpact('light');
                setActiveTab(item.id);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
