// Stomatologiya xizmatlari, shifokorlar va boshlang'ich ma'lumotlar (Mock data)

export const MOCK_CLINIC = {
  id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  name: 'DentaCare Zamonaviy Stomatologiya Markazi',
  tagline: "Sog'lom tabassum va og'riqsiz davolash",
  phone: '+998 71 200 44 22',
  emergency_phone: '+998 90 123 45 67',
  address: "Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi, 45-uy",
  landmark: 'Minor metro bekati yaqinida',
  working_hours: '09:00 - 20:00 (Dushanba - Shanba)',
  rating: 4.9,
  reviews_count: 840
};

export const MOCK_DOCTORS = [
  {
    id: 'd1111111-1111-1111-1111-111111111111',
    full_name: 'Dr. Rustam Xoliqov',
    specialty: 'Bosh shifokor, Jarroh-Implantolog',
    experience_years: 14,
    room_number: 'Xona 1',
    phone: '+998 90 123 45 67',
    photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    bio: "Germaniya va Shveytsariya sertifikatlariga ega yuqori toifali jarroh-implantolog. 4000 dan ortiq muvaffaqiyatli amaliyotlar.",
    rating: 4.9,
    badge: 'Yetakchi mutaxassis'
  },
  {
    id: 'd2222222-2222-2222-2222-222222222222',
    full_name: 'Dr. Nilufar Karimova',
    specialty: 'Terapevt-Restavrator',
    experience_years: 9,
    room_number: 'Xona 2',
    phone: '+998 93 987 65 43',
    photo_url: 'https://images.unsplash.com/photo-1594824813576-919c0840b991?w=400&auto=format&fit=crop&q=80',
    bio: "Estetik tish restavratsiyasi va mikroskop ostida ildiz kanallarini og'riqsiz davolash bo'yicha yetakchi mutaxassis.",
    rating: 5.0,
    badge: "Eng ko'p tavsiya etilgan"
  },
  {
    id: 'd3333333-3333-3333-3333-333333333333',
    full_name: 'Dr. Jasur Bekmurodov',
    specialty: 'Ortodont (Breket va Eylaynerlar)',
    experience_years: 8,
    room_number: 'Xona 3',
    phone: '+998 97 555 12 34',
    photo_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    bio: "Tish qatorini to'g'rilash, zamonaviy metall va sapfir breketlar hamda shaffof eylaynerlar o'rnatish.",
    rating: 4.8,
    badge: 'Ortodontiya'
  },
  {
    id: 'd4444444-4444-4444-4444-444444444444',
    full_name: 'Dr. Madina Usmonova',
    specialty: 'Bolalar stomatologi',
    experience_years: 6,
    room_number: 'Xona 4',
    phone: '+998 99 888 77 66',
    photo_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    bio: "Bolalar bilan samimiy va do'stona muloqot, qo'rquvsiz og'riqsiz muolajalar va profilaktika.",
    rating: 4.9,
    badge: 'Bolalar sevimli shifokori'
  }
];

export const MOCK_CATEGORIES = [
  'Barchasi',
  'Konsultatsiya',
  'Gigiyena',
  'Davolash',
  'Jarrohlik',
  'Ortodontiya',
  'Implantatsiya',
  'Estetika',
  'Bolalar'
];

export const MOCK_SERVICES = [
  {
    id: 's1111111-0000-0000-0000-000000000001',
    category: 'Konsultatsiya',
    name: "Birlamchi ko'rik va konsultatsiya",
    description: "Shifokor ko'rigi, rentgen tahlili va individual davolash rejasini tuzish",
    price_uzs: 50000,
    duration_minutes: 20,
    icon: 'Stethoscope'
  },
  {
    id: 's1111111-0000-0000-0000-000000000002',
    category: 'Gigiyena',
    name: 'Professional tozalash (Ultrasonik + Air Flow)',
    description: "Tish toshlari va qoraygan dog'larni zararsiz olib tashlash, ftorlash",
    price_uzs: 350000,
    duration_minutes: 40,
    icon: 'Sparkles'
  },
  {
    id: 's1111111-0000-0000-0000-000000000003',
    category: 'Davolash',
    name: 'Svetovoy plomba (Germaniya kompoziti)',
    description: 'Kariyesni tozalash va tabiiy tish shakliga mos yuqori sifatli nurlanuvchi plomba',
    price_uzs: 280000,
    duration_minutes: 45,
    icon: 'ShieldCheck'
  },
  {
    id: 's1111111-0000-0000-0000-000000000004',
    category: 'Davolash',
    name: 'Kanal davolash (Pulpit/Periodontit)',
    description: 'Ildiz kanallarini mikroskopik tozalash, antiseptik ishlov berish va plombalash',
    price_uzs: 220000,
    duration_minutes: 50,
    icon: 'Activity'
  },
  {
    id: 's1111111-0000-0000-0000-000000000005',
    category: 'Jarrohlik',
    name: "Og'riqsiz tish sug'urish (Oddiy / Aql tishi)",
    description: 'Kuchli zamonaviy anesteziya bilan tishni travmasiz va tez olib tashlash',
    price_uzs: 200000,
    duration_minutes: 30,
    icon: 'Scissors'
  },
  {
    id: 's1111111-0000-0000-0000-000000000006',
    category: 'Ortodontiya',
    name: "Breket o'rnatish (Bitta jag' uchun)",
    description: 'AQSH va Koreya metall-ligatura tizimidagi sertifikatlangan breketlar',
    price_uzs: 3500000,
    duration_minutes: 60,
    icon: 'Smile'
  },
  {
    id: 's1111111-0000-0000-0000-000000000007',
    category: 'Implantatsiya',
    name: "Dental Implant o'rnatish (Osstem / Koreya)",
    description: 'Yuqori biologik moslashuvchan titan implant va jarrohlik amaliyoti',
    price_uzs: 3200000,
    duration_minutes: 60,
    icon: 'Award'
  },
  {
    id: 's1111111-0000-0000-0000-000000000008',
    category: 'Estetika',
    name: 'Tish oqartirish (Laser / Zoom tizimi)',
    description: 'Emalga zarar yetkazmasdan 4-8 tongacha oppoq qilish amaliyoti',
    price_uzs: 1200000,
    duration_minutes: 60,
    icon: 'Sun'
  },
  {
    id: 's1111111-0000-0000-0000-000000000009',
    category: 'Bolalar',
    name: 'Bolalar suti tishini plombalash',
    description: "Bolajonlar uchun qiziqarli, tezkor va mutlaqo og'riqsiz plombalash",
    price_uzs: 150000,
    duration_minutes: 30,
    icon: 'Heart'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'b1111111-1111-1111-1111-111111111111',
    doctor_name: 'Dr. Nilufar Karimova',
    doctor_specialty: 'Terapevt-Restavrator',
    service_name: 'Svetovoy plomba (Germaniya kompoziti)',
    service_price: 280000,
    appointment_date: new Date().toISOString().split('T')[0],
    start_time: '10:00',
    end_time: '10:45',
    status: 'tasdiqlandi',
    patient_name: 'Azamat Aliyev',
    patient_phone: '+998 90 111 22 33',
    patient_telegram_id: 12345678,
    patient_complaint: "Yuqori o'ng tishda shirin yeganda og'riq bor"
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    doctor_name: 'Dr. Jasur Bekmurodov',
    doctor_specialty: 'Ortodont (Breket va Eylaynerlar)',
    service_name: "Breket o'rnatish (Bitta jag' uchun)",
    service_price: 3500000,
    appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    start_time: '11:30',
    end_time: '12:30',
    status: 'kutilmoqda',
    patient_name: 'Shahnoza Normurodova',
    patient_phone: '+998 93 444 55 66',
    patient_telegram_id: 87654321,
    patient_complaint: 'Breket profilaktik tekshiruvi'
  }
];
