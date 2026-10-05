import React from 'react';
import { Star, Award, MapPin, ChevronRight, Check, User } from 'lucide-react';
import { hapticImpact } from '../telegram';

export default function DoctorStep({ doctors, selectedDoctor, onSelectDoctor, onBack }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">2. Shifokorni tanlang</h2>
          <p className="text-xs text-slate-500">Mutaxassis ko'rigi va amaliyoti uchun</p>
        </div>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg"
        >
          Ortga
        </button>
      </div>

      <div className="space-y-3">
        {doctors.map((doctor) => {
          const isSelected = selectedDoctor?.id === doctor.id;
          const hasPhoto = Boolean(doctor.photo_url);

          return (
            <div
              key={doctor.id}
              onClick={() => {
                hapticImpact('light');
                onSelectDoctor(doctor);
              }}
              className={`p-3.5 rounded-2xl bg-white border cursor-pointer transition-all ${
                isSelected
                  ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-sm bg-cyan-50/20'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  {hasPhoto ? (
                    <img
                      src={doctor.photo_url}
                      alt={doctor.full_name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextElementSibling) {
                          e.target.nextElementSibling.style.display = 'flex';
                        }
                      }}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-xs"
                    />
                  ) : null}

                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-700 text-white flex flex-col items-center justify-center border border-cyan-500/30 shadow-xs ${
                      hasPhoto ? 'hidden' : 'flex'
                    }`}
                  >
                    <User className="w-7 h-7 text-white" />
                  </div>

                  <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-bold px-1 rounded-md flex items-center gap-0.5 shadow-xs">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {doctor.rating || 5.0}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-sm text-slate-800 leading-tight">
                      {doctor.full_name}
                    </h3>
                  </div>

                  <p className="text-xs font-medium text-cyan-700 mt-0.5">
                    {doctor.specialty}
                  </p>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1 font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded">
                      📞 {doctor.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-cyan-600" />
                      {doctor.experience_years} yillik tajriba
                    </span>
                  </div>
                </div>

                <div className="self-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-cyan-600 text-white' : 'border border-slate-200 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
