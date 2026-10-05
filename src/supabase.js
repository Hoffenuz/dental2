import { createClient } from '@supabase/supabase-js';
import { MOCK_CLINIC, MOCK_DOCTORS, MOCK_SERVICES, INITIAL_BOOKINGS } from './data/mockData';

const defaultUrl = 'https://jvzghreavlzjpxhnasxd.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2emdocmVhdmx6anB4aG5hc3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzMDI2OTcsImV4cCI6MjEwMDg3ODY5N30.bRCRxNOR32VEcI8Pd-0OpSvtfESC1UyTpeJ1TItA0Y4';

const cleanString = (val, fallback = '') => {
  if (!val) return fallback;
  const str = String(val).trim().replace(/^["']|["']$/g, '');
  if (!str || str === 'undefined' || str === 'null' || str.includes('placeholder')) {
    return fallback;
  }
  return str;
};

const rawUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultKey;

// Har qanday qo'shimcha qo'shtirnoq, probel yoki xato formatlarni tozalash
const cleanUrl = cleanString(rawUrl, defaultUrl).replace(/\/+$/, '');
const cleanKey = cleanString(rawKey, defaultKey);

let client = null;
if (cleanUrl && cleanKey && cleanUrl.startsWith('http')) {
  try {
    client = createClient(cleanUrl, cleanKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  } catch (err) {
    console.warn('Supabase createClient xatolik berdi, mock rejimda ishlanadi:', err);
    client = null;
  }
}

export const isSupabaseConfigured = Boolean(client);
export const supabase = client;

// Local storage orqali offline / demo navbatlarni saqlash
const STORAGE_KEY = 'dentacare_user_bookings';

export const getLocalBookings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_BOOKINGS;
  }
};

export const saveLocalBooking = (newBooking) => {
  const current = getLocalBookings();
  const updated = [newBooking, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const updateLocalBookingStatus = (id, status) => {
  const current = getLocalBookings();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// API Servislari (Supabase yoki Mock)
export const fetchClinicData = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('clinics').select('*').limit(1).single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase clinics yuklashda xatolik, mock data ishlatilmoqda', e);
    }
  }
  return MOCK_CLINIC;
};

export const fetchDoctors = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('doctors').select('*').eq('is_active', true);
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase doctors yuklashda xatolik, mock data ishlatilmoqda', e);
    }
  }
  return MOCK_DOCTORS;
};

export const fetchServices = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*').eq('is_active', true);
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase services yuklashda xatolik, mock data ishlatilmoqda', e);
    }
  }
  return MOCK_SERVICES;
};

export const fetchBookedSlots = async (doctorId, date) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('start_time, end_time, status')
        .eq('doctor_id', doctorId)
        .eq('appointment_date', date)
        .neq('status', 'bekor_qilindi');
      if (!error && data) {
        return data.map(d => d.start_time.slice(0, 5));
      }
    } catch (e) {
      console.warn('Band soatlarni olishda xatolik', e);
    }
  }

  // Local / mock band soatlar
  const local = getLocalBookings();
  return local
    .filter(b => b.appointment_date === date && b.status !== 'bekor_qilindi')
    .map(b => b.start_time);
};

export const createAppointment = async (bookingData) => {
  if (supabase) {
    try {
      const clinicId = bookingData.clinic_id || 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d';
      let patientId = null;

      // 1. Bemor mavjudligini tekshirish yoki yangi bemor yaratish
      try {
        let pQuery = supabase.from('patients').select('id');
        if (bookingData.patient_telegram_id) {
          pQuery = pQuery.eq('telegram_id', Number(bookingData.patient_telegram_id));
        } else if (bookingData.patient_phone) {
          pQuery = pQuery.eq('phone', bookingData.patient_phone);
        }

        const { data: existingP } = await pQuery.maybeSingle();

        if (existingP?.id) {
          patientId = existingP.id;
          await supabase.from('patients').update({
            full_name: bookingData.patient_name,
            phone: bookingData.patient_phone,
            updated_at: new Date().toISOString()
          }).eq('id', patientId);
        } else if (bookingData.patient_name && bookingData.patient_phone) {
          const { data: newP } = await supabase.from('patients').insert([{
            clinic_id: clinicId,
            full_name: bookingData.patient_name,
            phone: bookingData.patient_phone,
            telegram_id: bookingData.patient_telegram_id ? Number(bookingData.patient_telegram_id) : null,
            total_visits: 1
          }]).select('id').maybeSingle();
          if (newP?.id) patientId = newP.id;
        }
      } catch (pErr) {
        console.warn('Bemor bazada saqlash xatosi (davom etilmoqda):', pErr);
      }

      // 2. Aniq appointments jadvali sxemasiga moslashtirish
      const startTimeStr = bookingData.start_time
        ? (bookingData.start_time.length === 5 ? `${bookingData.start_time}:00` : bookingData.start_time)
        : '10:00:00';
      const endTimeStr = bookingData.end_time
        ? (bookingData.end_time.length === 5 ? `${bookingData.end_time}:00` : bookingData.end_time)
        : '10:30:00';

      const appointmentPayload = {
        clinic_id: clinicId,
        patient_id: patientId,
        doctor_id: bookingData.doctor_id,
        service_id: bookingData.service_id,
        patient_name: bookingData.patient_name,
        patient_phone: bookingData.patient_phone,
        patient_telegram_id: bookingData.patient_telegram_id ? Number(bookingData.patient_telegram_id) : null,
        appointment_date: bookingData.appointment_date,
        start_time: startTimeStr,
        end_time: endTimeStr,
        status: 'kutilmoqda',
        booking_source: 'telegram_webapp',
        notes: bookingData.patient_complaint || bookingData.notes || '',
        price_uzs: Number(bookingData.service_price || bookingData.price_uzs || 0),
        paid_status: false,
        reminder_sent: false
      };

      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentPayload])
        .select(`
          *,
          doctor:doctors (id, full_name, specialty, photo_url),
          service:services (id, name, price_uzs)
        `)
        .single();

      if (!error && data) {
        const enriched = {
          ...data,
          doctor_name: data.doctor?.full_name || bookingData.doctor_name,
          doctor_specialty: data.doctor?.specialty || bookingData.doctor_specialty,
          service_name: data.service?.name || bookingData.service_name,
          service_price: data.price_uzs,
          patient_complaint: data.notes
        };
        saveLocalBooking(enriched);
        return { success: true, data: enriched };
      }

      if (error) {
        console.error('Supabase appointments insert error:', error);
      }
    } catch (e) {
      console.error('Supabase navbat yaratish xatosi:', e);
    }
  }

  // Fallback / Mock yaratish (offline bo'lsa)
  const dummyId = 'b-' + Math.random().toString(36).substring(2, 9);
  const created = {
    id: dummyId,
    ...bookingData,
    status: 'kutilmoqda',
    created_at: new Date().toISOString()
  };
  saveLocalBooking(created);
  return { success: true, data: created };
};

// Foydalanuvchining navbatlarini olish (Supabase yoki Local)
export const fetchUserAppointments = async (telegramId, phone) => {
  if (supabase && (telegramId || phone)) {
    try {
      let query = supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctors (id, full_name, specialty, photo_url),
          service:services (id, name, price_uzs)
        `)
        .order('appointment_date', { ascending: false })
        .order('start_time', { ascending: false });

      if (telegramId) {
        query = query.eq('patient_telegram_id', Number(telegramId));
      } else if (phone) {
        query = query.eq('patient_phone', phone);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const formatted = data.map(item => ({
          ...item,
          doctor_name: item.doctor?.full_name || item.doctor_name || 'Shifokor',
          doctor_specialty: item.doctor?.specialty || '',
          service_name: item.service?.name || item.service_name || 'Konsultatsiya',
          service_price: item.price_uzs || item.service?.price_uzs || 0,
          patient_complaint: item.notes
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));
        return formatted;
      }
    } catch (e) {
      console.warn('Foydalanuvchi navbatlarini yuklashda xatolik:', e);
    }
  }

  return getLocalBookings();
};

// Navbatni bekor qilish
export const cancelAppointment = async (id) => {
  updateLocalBookingStatus(id, 'bekor_qilindi');
  if (supabase && id && !id.startsWith('b-')) {
    try {
      await supabase
        .from('appointments')
        .update({ status: 'bekor_qilindi', updated_at: new Date().toISOString() })
        .eq('id', id);
    } catch (e) {
      console.warn('Navbatni bekor qilishda Supabase xatosi:', e);
    }
  }
};
