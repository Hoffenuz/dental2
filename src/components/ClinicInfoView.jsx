import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Navigation, 
  Award,
  Users,
  User,
  ExternalLink
} from 'lucide-react';
import { hapticImpact } from '../telegram';

export default function ClinicInfoView({ clinic, doctors }) {
  const mapUrl = clinic.map_url || "https://maps.app.goo.gl/sbZqccuTv1p9bKdK6";

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-gradient-to-tr from-cyan-900 via-cyan-800 to-teal-900 text-white p-5">
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30 inline-block">
            Zamonaviy Stomatologiya
          </span>
          <h2 className="text-xl font-black leading-tight">
            {clinic.name || 'Ismailov Dental Clinic'}
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
              <p className="text-slate-700 mt-0.5 font-medium">
                Qo'shko'pir tumani, Al-Beruniy ko'chasi (Park oldida)
              </p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => hapticImpact('light')}
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs transition shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                Google Xaritada ochish
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-800 block">Qabul soatlari:</span>
              <p className="text-slate-600 mt-0.5">{clinic.working_hours || '09:00 - 19:00 (Dushanba - Shanba)'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-800 block">Bog'lanish uchun telefonlar:</span>
              <a 
                href="tel:+998974229992"
                onClick={() => hapticImpact('light')}
                className="text-cyan-700 font-bold mt-0.5 block hover:underline"
              >
                📞 +998 97 422 99 92 (Dr. Ismailov Mansurbek)
              </a>
              <a 
                href="tel:+998331212131"
                onClick={() => hapticImpact('light')}
                className="text-cyan-700 font-bold mt-1 block hover:underline"
              >
                📞 +998 33 121 21 31 (Dr. Ismailov Muhammad)
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
          {doctors.map(d => {
            const hasPhoto = Boolean(d.photo_url);

            return (
              <div key={d.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                {hasPhoto ? (
                  <img
                    src={d.photo_url}
                    alt={d.full_name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = 'flex';
                      }
                    }}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0"
                  />
                ) : null}

                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-700 text-white flex items-center justify-center shrink-0 border border-cyan-500/20 shadow-xs ${hasPhoto ? 'hidden' : 'flex'}`}>
                  <User className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-800 truncate">{d.full_name}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{d.specialty}</p>
                </div>
                <span className="text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                  ★ {d.rating || 5.0}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
