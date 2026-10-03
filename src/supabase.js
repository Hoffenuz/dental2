import { createClient } from '@supabase/supabase-js';
import { MOCK_CLINIC, MOCK_DOCTORS, MOCK_SERVICES, INITIAL_BOOKINGS } from './data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

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
      const { data, error } = await supabase.from('appointments').insert([bookingData]).select().single();
      if (!error && data) {
        saveLocalBooking(data);
        return { success: true, data };
      }
      if (error) {
        console.error('Supabase navbat saqlashda xato:', error);
      }
    } catch (e) {
      console.error('Supabase navbat yaratish xatosi:', e);
    }
  }

  // Fallback / Mock yaratish
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
