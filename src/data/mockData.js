// Ismailov Dental Clinic — Bemorlar uchun sodda va tushunarli ma'lumotlar

export const MOCK_CLINIC = {
  id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  name: 'Ismailov Dental Clinic',
  tagline: "Zamonaviy stomatologiya va ortodontiya markazi",
  phone: '+998 97 422 99 92',
  secondary_phone: '+998 33 121 21 31',
  emergency_phone: '+998 97 422 99 92',
  address: "Qo'shko'pir tumani, Al-Beruniy ko'chasi (Mo'ljal: Park oldida)",
  landmark: "Qo'shko'pir tumani, Al-Beruniy ko'chasi, park oldida",
  map_url: "https://maps.app.goo.gl/sbZqccuTv1p9bKdK6",
  working_hours: '09:00 - 19:00 (Dushanba - Shanba)',
  rating: 5.0,
  reviews_count: 520
};

export const MOCK_DOCTORS = [
  {
    id: 'd1111111-1111-1111-1111-111111111111',
    full_name: 'Dr. Ismailov Mansurbek',
    specialty: 'Bosh shifokor, Ortodont',
    experience_years: 12,
    room_number: '1-xona',
    phone: '+998 97 422 99 92',
    photo_url: null,
    bio: "Bosh shifokor, malakali ortodont. Barcha turdagi metall, keramik breketlar va zamonaviy tish qatorini to'g'rilash bo'yicha mutaxassis.",
    rating: 5.0,
    badge: 'Bosh shifokor / Ortodont'
  },
  {
    id: 'd2222222-2222-2222-2222-222222222222',
    full_name: 'Dr. Ismailov Muhammad',
    specialty: 'Stomatolog-Terapevt',
    experience_years: 8,
    room_number: '2-xona',
    phone: '+998 33 121 21 31',
    photo_url: '/dr-muhammad.png',
    bio: "Estetik tish davolash, nurlanuvchi svetovoy plomba, og'riqsiz tish sug'urish va tish toshlarini tozalash bo'yicha mutaxassis.",
    rating: 4.9,
    badge: 'Terapevt-Stomatolog'
  }
];

export const MOCK_CATEGORIES = [
  'Barchasi',
  'Breket',
  'Plomba',
  "Tish qo'ydirish",
  'Tish oldirish',
  'Tish tozalash',
  'Konsultatsiya'
];

export const MOCK_SERVICES = [
  {
    id: 'c6666666-6666-6666-6666-666666666666',
    category: 'Breket',
    name: "Breket o'rnatish",
    description: "AQSH va Koreya breket tizimlari (bitta jag' uchun)",
    price_uzs: 3500000,
    duration_minutes: 60,
    icon: 'Sparkles'
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    category: 'Plomba',
    name: 'Svetovoy plomba',
    description: "Germaniya kompozit materiali, og'riqsiz va tabiiy tish rangi",
    price_uzs: 280000,
    duration_minutes: 40,
    icon: 'ShieldCheck'
  },
  {
    id: 'c7777777-7777-7777-7777-777777777777',
    category: "Tish qo'ydirish",
    name: "Tish qo'ydirish (Implant)",
    description: "Titan dental implant o'rnatish (Osstem, Koreya)",
    price_uzs: 3200000,
    duration_minutes: 60,
    icon: 'Activity'
  },
  {
    id: 'c5555555-5555-5555-5555-555555555555',
    category: 'Tish oldirish',
    name: "Tish oldirish (Sug'urish)",
    description: "Zamonaviy anesteziya bilan og'riqsiz va tez sug'urish",
    price_uzs: 200000,
    duration_minutes: 30,
    icon: 'Check'
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    category: 'Tish tozalash',
    name: 'Tish tozalash (Air Flow)',
    description: "Tish toshlari va kofe dog'larini tozalash, sayqallash",
    price_uzs: 300000,
    duration_minutes: 30,
    icon: 'Sparkles'
  },
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    category: 'Konsultatsiya',
    name: "Ko'rik va konsultatsiya",
    description: "Shifokor ko'rigi, tashxis va davolash rejasini tuzish",
    price_uzs: 50000,
    duration_minutes: 20,
    icon: 'Stethoscope'
  }
];

export const INITIAL_BOOKINGS = [];
