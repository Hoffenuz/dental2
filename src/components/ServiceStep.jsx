import React, { useState } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Scissors, 
  Smile, 
  Award, 
  Sun, 
  Heart, 
  Clock, 
  ChevronRight,
  Search
} from 'lucide-react';
import { hapticImpact } from '../telegram';

const iconMap = {
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Activity,
  Scissors,
  Smile,
  Award,
  Sun,
  Heart
};

export default function ServiceStep({ services, categories, selectedService, onSelectService }) {
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'Barchasi' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-800">1. Kerakli xizmatni tanlang</h2>
        <p className="text-xs text-slate-500">Stomatologik muolaja turini tanlab, davom eting</p>
      </div>

      {/* Qidiruv */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Xizmat nomi bo'yicha qidirish..."
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Kategoriya tugmalari */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              hapticImpact('light');
              setSelectedCategory(cat);
            }}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Xizmatlar ro'yxati */}
      <div className="space-y-2.5">
        {filteredServices.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 p-4">
            <p className="text-xs text-slate-400">Ushbu so'rov bo'yicha xizmat topilmadi</p>
          </div>
        ) : (
          filteredServices.map((service) => {
            const isSelected = selectedService?.id === service.id;
            const IconComponent = iconMap[service.icon] || Stethoscope;

            return (
              <div
                key={service.id}
                onClick={() => {
                  hapticImpact('light');
                  onSelectService(service);
                }}
                className={`p-3.5 rounded-2xl bg-white border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-sm bg-cyan-50/20'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-cyan-600 text-white' : 'bg-cyan-50 text-cyan-700'}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">
                        {service.category}
                      </span>
                      <span className="text-xs font-bold text-slate-900 whitespace-nowrap">
                        {formatPrice(service.price_uzs)}
                      </span>
                    </div>

                    <h3 className="font-semibold text-sm text-slate-800 mt-1 leading-snug">
                      {service.name}
                    </h3>
                    
                    {service.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        ~{service.duration_minutes} daqiqa
                      </span>
                    </div>
                  </div>

                  <div className="self-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-cyan-600 text-white' : 'text-slate-300'
                    }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
