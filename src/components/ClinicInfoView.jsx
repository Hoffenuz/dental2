import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Navigation, 
  Award,
  Users
} from 'lucide-react';
import { hapticImpact } from '../telegram';

export default function ClinicInfoView({ clinic, doctors }) {
  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-gradient-to-tr from-cyan-900 via-cyan-800 to-teal-900 text-white p-5">
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30 inline-block">
            Zamonaviy Stomatologiya
          </span>
          <h2 className="text-xl font-black leading-tight">
            {clinic.name || 'DentaCare Markazi'}
          </h2>
          <p className="text-xs text-cyan-100/90 leading-relaxed">
            {clinic.tagline || "Sog'lom tabassum va og'riqsiz davolash standartlari"}
          </p>
        </div>
      </div>

      {/* Asosiy aloqa ma'lumotlari */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Aloqa va Ish vaqti
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-700 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-800 block">Manzil:</span>
              <p className="text-slate-600 mt-0.5">{clinic.address}</p>
              {clinic.landmark && (
                <span className="text-[11px] text-cyan-600 font-medium block mt-0.5">
                  Mo'ljal: {clinic.landmark}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-800 block">Qabul soatlari:</span>
              <p className="text-slate-600 mt-0.5">{clinic.working_hours}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-800 block">Qabulxona (Reception):</span>
              <a 
                href={`tel:${clinic.phone}`}
                onClick={() => hapticImpact('light')}
                className="text-cyan-700 font-bold mt-0.5 block hover:underline"
              >
                {clinic.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Afzalliklarimiz */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-800">100% Steril xavfsizlik</h4>
          <p className="text-[11px] text-slate-500 leading-snug">
            Eng zamonaviy avtoklav va barcha xalqaro antiseptik standartlar
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-800">Og'riqsiz anesteziya</h4>
          <p className="text-[11px] text-slate-500 leading-snug">
            Har bir muolaja yuqori sifatli zamonaviy og'riqsizlantirish vositalari bilan
          </p>
        </div>
      </div>

      {/* Shifokorlar tarkibi */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            Bizning Shifokorlarimiz ({doctors.length})
          </h3>
        </div>

        <div className="space-y-2">
          {doctors.map(d => (
            <div key={d.id} className="flex items-center gap-3 py-1.5 border-b border-slate-100 last:border-0">
              <img
                src={d.photo_url}
                alt={d.full_name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-800 truncate">{d.full_name}</h4>
                <p className="text-[11px] text-slate-500 truncate">{d.specialty}</p>
              </div>
              <span className="text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                ★ {d.rating}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
