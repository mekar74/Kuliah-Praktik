import React, { useState, useEffect } from 'react';
import { DOCTORS, SCHEDULES, NEWS, INITIAL_TICKETS, INITIAL_CAREERS } from './data/hospitalData';
import { CareerItem, Doctor, DoctorSchedule, NewsItem, Ticket } from './types';

//Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScheduleLayananSection } from './components/ScheduleLayananSection';
import { NewsSection } from './components/NewsSection';
import { CareerSection } from './components/CareerSection';
import { DoctorSection } from './components/DoctorSection';
import { ContactMapSection } from './components/ContactSection';
import { Footer } from './components/Footer';

//Modals
import { BookingModal } from './components/BookingModal';
import { DoctorSearchModal } from './components/DoctorSearchModal';
import { AmbulanceModal } from './components/AmbulanceModal';
import { NewsModal } from './components/NewsModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';

import { openWhatsAppBooking } from './utils/whatsapp';

export default function App() {
  // Master persistent state with localStorage initializers
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('rs_mmh_doctors');
    return saved ? JSON.parse(saved) : DOCTORS;
  });

  const [schedules, setSchedules] = useState<DoctorSchedule[]>(() => {
    const saved = localStorage.getItem('rs_mmh_schedules');
    return saved ? JSON.parse(saved) : SCHEDULES;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('rs_mmh_news');
    return saved ? JSON.parse(saved) : NEWS;
  });

  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('rs_mmh_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [careers, setCareers] = useState<CareerItem[]>(() => {
    const saved = localStorage.getItem('rs_mmh_careers');
    return saved ? JSON.parse(saved) : INITIAL_CAREERS;
  });

  // Save to localStorage whenever states change
  useEffect(() => {
    localStorage.setItem('rs_mmh_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('rs_mmh_schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('rs_mmh_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('rs_mmh_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('rs_mmh_careers', JSON.stringify(careers));
  }, [careers]);
  
  // UI Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedDoctorId, setPreSelectedDoctorId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAmbulanceOpen, setIsAmbulanceOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  // Admin Modal States
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // URL #admin
  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminLoginOpen(true);
      }
    };

    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
    return () => window.removeEventListener('hashchange', checkAdminHash);
  }, []);

  const handleOpenBooking = (doctorId?: string) => {
    if (doctorId) {
      const doc = doctors.find((d) => d.id === doctorId);
      openWhatsAppBooking(doc?.name, doc?.specialty);
    } else {
      openWhatsAppBooking();
    }
  };

  const handleNavigateToLocation = () => {
    const el = document.getElementById('kontak');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Doctor CRUD
  const handleAddDoctor = (newDoc: Doctor) => {
    setDoctors((prev) => [newDoc, ...prev]);
  };
  const handleUpdateDoctor = (updatedDoc: Doctor) => {
    setDoctors((prev) => prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d)));
  };
  const handleDeleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    setSchedules((prev) => prev.filter((s) => s.doctorId !== id));
  };

  //Schedule CRUD
  const handleAddSchedule = (newSch: DoctorSchedule) => {
    setSchedules((prev) => [newSch, ...prev]);
  };
  const handleUpdateSchedule = (updatedSch: DoctorSchedule) => {
    setSchedules((prev) => prev.map((s) => (s.id === updatedSch.id ? updatedSch : s)));
  };
  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  //News CURD
  const handleAddNews = (newArticle: NewsItem) => {
    setNews((prev) => [newArticle, ...prev]);
  };
  const handleDeleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  //Ticket Updates
  const handleUpdateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets((prev) =>
      prev.map((t) => ((t.id === ticketId || t.ticketNumber === ticketId) ? { ...t, status } : t))
    );
  };
  const handleAddTicket = (newTicket: Ticket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  //Career SRUD
  const handleAddCareer = (newCareer: CareerItem) => {
    setCareers((prev) => [newCareer, ...prev]);
  };
  const handleDeleteCareer = (id: string) => {
    setCareers((prev) => prev.filter((c) => c.id !== id));
  };
  const handleToggleCareerStatus = (id: string) => {
    setCareers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // TAMPILAN LANDING PAGE PUBLIK USER
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-yellow-200">
      {/* 1. Header & Navigation Bar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAmbulance={() => setIsAmbulanceOpen(true)}
      />

      {/* 2. Hero Section (Tentang) */}
      <main className="flex-1">
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onNavigateToLocation={handleNavigateToLocation}
        />

        {/* Jadwal & Layanan */}
        <ScheduleLayananSection
          schedules={schedules}
          onOpenBookingWithDoctor={(docId) => handleOpenBooking(docId)}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAmbulance={() => setIsAmbulanceOpen(true)}
        />

        {/* Dokter Spesialis */}
        <DoctorSection
          doctors={doctors}
          onOpenBookingWithDoctor={(docId) => handleOpenBooking(docId)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Berita RS MMH */}
        <NewsSection news={news} onSelectNews={(n) => setSelectedNews(n)} />
        
        {/* Karir & Lowongan Kerja */}
        <CareerSection careers={careers} />

        {/* Kontak Kami & Fitur Navigasi Otomatis */}
        <ContactMapSection />
      </main>

      {/* 3. Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAmbulance={() => setIsAmbulanceOpen(true)}
        onOpenAdmin={() => setIsAdminLoginOpen(true)}
      />

      {/* 4. Interactive Modals */}
      {/* Booking Anteran Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedDoctorId={preSelectedDoctorId}
        doctors={doctors}
        onTicketCreated={handleAddTicket}
      />

      {/* Cari Dokter Modal */}
      <DoctorSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDoctorToBook={(docId) => handleOpenBooking(docId)}
        doctors={doctors}
      />

      {/* Panggil Ambulans UGD */}
      <AmbulanceModal
        isOpen={isAmbulanceOpen}
        onClose={() => setIsAmbulanceOpen(false)}
      />

      <NewsModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
          window.location.hash = '';
        }}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Admin Panel Management */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onLogout={() => setIsAdminPanelOpen(false)}
        doctors={doctors}
        schedules={schedules}
        news={news}
        tickets={tickets}
        careers={careers}
        onAddDoctor={handleAddDoctor}
        onUpdateDoctor={handleUpdateDoctor}
        onDeleteDoctor={handleDeleteDoctor}
        onAddSchedule={handleAddSchedule}
        onUpdateSchedule={handleUpdateSchedule}
        onDeleteSchedule={handleDeleteSchedule}
        onAddNews={handleAddNews}
        onDeleteNews={handleDeleteNews}
        onUpdateTicketStatus={handleUpdateTicketStatus}
        onAddTicket={handleAddTicket}
        onAddCareer={handleAddCareer}
        onDeleteCareer={handleDeleteCareer}
        onToggleCareerStatus={handleToggleCareerStatus}
      />
    </div>
  );
}

