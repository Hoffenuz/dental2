import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ServiceStep from './components/ServiceStep';
import DoctorStep from './components/DoctorStep';
import DateTimeStep from './components/DateTimeStep';
import PatientInfoStep from './components/PatientInfoStep';
import SuccessStep from './components/SuccessStep';
import MyBookingsView from './components/MyBookingsView';
import ClinicInfoView from './components/ClinicInfoView';

import { 
  initTelegramApp, 
  getTelegramUser, 
  hapticNotification, 
  hapticImpact 
} from './telegram';
import { 
  fetchClinicData, 
  fetchDoctors, 
  fetchServices, 
  createAppointment,
  fetchUserAppointments,
  getLocalBookings 
} from './supabase';
import { MOCK_CLINIC, MOCK_DOCTORS, MOCK_SERVICES, MOCK_CATEGORIES } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('booking'); // 'booking' | 'my-bookings' | 'clinic'
  const [bookingStep, setBookingStep] = useState(1); // 1: Service, 2: Doctor, 3: DateTime, 4: PatientInfo, 5: Success

  // Data states - darhol render bo'lishi va oq ekran bo'lmasligi uchun mock ma'lumotlar bilan initsializatsiya qilinadi
  const [clinic, setClinic] = useState(MOCK_CLINIC);
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const [services, setServices] = useState(MOCK_SERVICES);
  const [myBookings, setMyBookings] = useState(getLocalBookings());
  const [isSyncing, setIsSyncing] = useState(false);

  // Booking form states
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [complaint, setComplaint] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Telegram foydalanuvchi ma'lumotlari
  useEffect(() => {
    initTelegramApp();
    const tgUser = getTelegramUser();
    if (tgUser) {
      const fullName = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ');
      if (fullName && !patientName) setPatientName(fullName);
    }
  }, []);

  // Boshlang'ich ma'lumotlarni fonda yuklash (hech qachon oq ekranda qotib qolmaydi)
  const loadInitialData = async () => {
    setIsSyncing(true);
    try {
      const tgUser = getTelegramUser();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 4000)
      );

      const fetchPromise = Promise.all([
        fetchClinicData(),
        fetchDoctors(),
        fetchServices(),
        fetchUserAppointments(tgUser?.id, patientPhone)
      ]);

      const [clinicData, doctorsData, servicesData, userBookings] = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]);

      if (clinicData) setClinic(clinicData);
      if (Array.isArray(doctorsData) && doctorsData.length > 0) setDoctors(doctorsData);
      if (Array.isArray(servicesData) && servicesData.length > 0) setServices(servicesData);
      if (Array.isArray(userBookings)) setMyBookings(userBookings);
    } catch (e) {
      console.warn("Baza ma'lumotlarini yangilashda ogohlantirish (avtonom rejimda ishlamoqda):", e.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const refreshMyBookings = async () => {
    const tgUser = getTelegramUser();
    const bookings = await fetchUserAppointments(tgUser?.id, patientPhone);
    setMyBookings(bookings);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Wizard boshqaruvchilari
  const handleSelectService = (service) => {
    setSelectedService(service);
    setBookingStep(2);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingStep(3);
  };

  const handleConfirmDateTime = () => {
    if (!selectedDate || !selectedTime) {
      alert('Iltimos, qabul kuni va soatini tanlang');
      return;
    }
    setBookingStep(4);
  };

  const handleResetBooking = () => {
    setSelectedService(null);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setComplaint('');
    setBookingStep(1);
    setConfirmedBooking(null);
  };

  const handleSubmitBooking = async () => {
    setSubmitting(true);
    const tgUser = getTelegramUser();

    const bookingPayload = {
      doctor_id: selectedDoctor.id,
      doctor_name: selectedDoctor.full_name,
      doctor_specialty: selectedDoctor.specialty,
      service_id: selectedService.id,
      service_name: selectedService.name,
      service_price: selectedService.price_uzs,
      appointment_date: selectedDate,
      start_time: selectedTime,
      end_time: calculateEndTime(selectedTime, selectedService.duration_minutes || 30),
      patient_name: patientName,
      patient_phone: patientPhone,
      patient_telegram_id: tgUser?.id || null,
      patient_complaint: complaint,
      status: 'kutilmoqda',
      created_via: 'webapp'
    };

    const result = await createAppointment(bookingPayload);
    setSubmitting(false);

    if (result.success) {
      hapticNotification('success');
      setConfirmedBooking(result.data);
      setBookingStep(5);
      await refreshMyBookings();

      // Bot Edge Function orqali Telegram xabarnomasi yuborish
      try {
        const botApiUrl = import.meta.env.VITE_BOT_API_URL || 'https://jvzghreavlzjpxhnasxd.supabase.co/functions/v1/telegram-bot';
        fetch(botApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'notify-booking',
            booking: {
              ...result.data,
              patient_telegram_id: tgUser?.id || result.data.patient_telegram_id,
              doctor_name: selectedDoctor.full_name,
              service_name: selectedService.name
            }
          })
        }).catch((err) => console.warn('Bot bildirishnoma xatosi:', err));
      } catch (e) {}
    } else {
      hapticNotification('error');
      alert("Navbatni saqlashda xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  const calculateEndTime = (startTime, durationMinutes) => {
    if (!startTime) return '10:00';
    const [h, m] = startTime.split(':').map(Number);
    const totalMinutes = h * 60 + m + durationMinutes;
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        clinicPhone={clinic.phone} 
      />

      <main className="max-w-md mx-auto w-full px-4 pt-3 flex-1">
        {/* 1. NAVBAT OLISH TABI */}
        {activeTab === 'booking' && (
          <div className="space-y-4">
            {/* Qadamlar progress bari */}
            {bookingStep < 5 && (
              <div className="flex items-center justify-between px-2 pt-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      bookingStep === s
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : bookingStep > s
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {s}
                    </div>
                    {s < 4 && (
                      <div className={`w-12 h-1 mx-1 rounded-full ${
                        bookingStep > s ? 'bg-teal-500' : 'bg-slate-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            )}

                {bookingStep === 1 && (
                  <ServiceStep
                    services={services}
                    categories={MOCK_CATEGORIES}
                    selectedService={selectedService}
                    onSelectService={handleSelectService}
                  />
                )}

                {bookingStep === 2 && (
                  <DoctorStep
                    doctors={doctors}
                    selectedDoctor={selectedDoctor}
                    onSelectDoctor={handleSelectDoctor}
                    onBack={() => setBookingStep(1)}
                  />
                )}

                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <DateTimeStep
                      selectedDoctor={selectedDoctor}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      onBack={() => setBookingStep(2)}
                    />
                    {selectedDate && selectedTime && (
                      <button
                        onClick={() => {
                          hapticImpact('medium');
                          handleConfirmDateTime();
                        }}
                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                      >
                        Davom etish ({selectedDate}, {selectedTime})
                      </button>
                    )}
                  </div>
                )}

                {bookingStep === 4 && (
                  <PatientInfoStep
                    selectedService={selectedService}
                    selectedDoctor={selectedDoctor}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    patientName={patientName}
                    setPatientName={setPatientName}
                    patientPhone={patientPhone}
                    setPatientPhone={setPatientPhone}
                    complaint={complaint}
                    setComplaint={setComplaint}
                    onSubmitBooking={handleSubmitBooking}
                    submitting={submitting}
                    onBack={() => setBookingStep(3)}
                  />
                )}

                {bookingStep === 5 && confirmedBooking && (
                  <SuccessStep
                    booking={confirmedBooking}
                    onReset={handleResetBooking}
                    onViewMyBookings={() => {
                      setActiveTab('my-bookings');
                      setBookingStep(1);
                    }}
                  />
                )}
              </div>
            )}

            {/* 2. MENING NAVBATLARIM TABI */}
            {activeTab === 'my-bookings' && (
              <MyBookingsView
                bookings={myBookings}
                onRefresh={refreshMyBookings}
                onGoToBooking={() => {
                  handleResetBooking();
                  setActiveTab('booking');
                }}
              />
            )}

            {/* 3. KLINIKA MA'LUMOTLARI TABI */}
            {activeTab === 'clinic' && (
              <ClinicInfoView
                clinic={clinic}
                doctors={doctors}
              />
            )}
      </main>
    </div>
  );
}
