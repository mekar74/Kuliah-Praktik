import React, { useState } from 'react';
import { Doctor, DoctorSchedule, NewsItem, Ticket, CareerItem } from '../types';
import { HOSPITAL_INFO } from '../data/hospitalData';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Users,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  LogOut,
  Search,
  Check,
  UserPlus,
  Newspaper,
  Printer,
  Sparkles,
  AlertCircle,
  Globe,
  Briefcase,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
  doctors: Doctor[];
  schedules: DoctorSchedule[];
  news: NewsItem[];
  tickets: Ticket[];
  careers: CareerItem[];
  onAddDoctor: (doctor: Doctor) => void;
  onUpdateDoctor: (doctor: Doctor) => void;
  onDeleteDoctor: (id: string) => void;
  onAddSchedule: (schedule: DoctorSchedule) => void;
  onUpdateSchedule: (schedule: DoctorSchedule) => void;
  onDeleteSchedule: (id: string) => void;
  onAddNews: (news: NewsItem) => void;
  onDeleteNews: (id: string) => void;
  onUpdateTicketStatus: (ticketId: string, status: Ticket['status']) => void;
  onAddTicket: (ticket: Ticket) => void;
  onAddCareer: (career: CareerItem) => void;
  onDeleteCareer: (id: string) => void;
  onToggleCareerStatus: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onLogout,
  doctors,
  schedules,
  news,
  tickets,
  careers,
  onAddDoctor,
  onUpdateDoctor,
  onDeleteDoctor,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  onAddNews,
  onDeleteNews,
  onUpdateTicketStatus,
  onAddTicket,
  onAddCareer,
  onDeleteCareer,
  onToggleCareerStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'schedules' | 'news' | 'tickets' | 'careers'>('overview');

  // Sub-state for Add Career Poster Form
  const [isAddingCareer, setIsAddingCareer] = useState(false);
  const [newCareerForm, setNewCareerForm] = useState({
    title: '',
    department: 'Keperawatan',
    type: 'Full Time' as 'Full Time' | 'Part Time' | 'Kontrak' | 'Magang',
    posterUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    description: '',
    requirementsRaw: 'Pendidikan minimal D3/S1 Keperawatan\nMemiliki STR Aktif\nMemiliki sertifikat BTCLS',
    deadline: '31 Agustus 2026',
  });

  // Sub-state for Add Doctor Form
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: '',
    specialty: '',
    category: 'Penyakit Dalam',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80',
    sip: '449/SIP/LT/2026',
    experience: '5+ Tahun',
    scheduleDays: 'Senin - Sabtu',
    morningShift: '08:00 - 12:00 WIB',
    afternoonShift: '15:00 - 18:00 WIB',
    status: 'Pagi',
    availableToday: true,
    education: 'Universitas Indonesia',
  });

  // Sub-state for Add News Form
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
    title: '',
    category: 'Seputar RS',
    date: new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    summary: '',
    content: '',
    author: 'Humas RS MMH',
  });

  // Sub-state for Add Manual Ticket Form
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [manualTicket, setManualTicket] = useState({
    patientName: '',
    doctorName: doctors[0]?.name || 'dr. H. Ahmad Wijaya, Sp.PD',
    specialty: doctors[0]?.specialty || 'Spesialis Penyakit Dalam',
    insuranceType: 'BPJS',
    phone: '',
    timeSlot: '09:00 - 11:00 WIB',
  });

  const [ticketSearchQuery, setTicketSearchQuery] = useState('');

  // Sub-state for Schedule CRUD
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DoctorSchedule | null>(null);
  const [scheduleSearchQuery, setScheduleSearchQuery] = useState('');
  const [newSchedule, setNewSchedule] = useState<Partial<DoctorSchedule>>({
    doctorId: '',
    doctorName: '',
    specialty: '',
    day: 'Senin, Rabu, Jumat',
    morningHours: 'Pukul 09.00 s/d 12.00',
    afternoonHours: 'Pukul 14.00 s/d 17.00',
    room: 'Poliklinik Spesialis Lt. 1',
    category: 'Praktik Pagi',
    status: 'Tersedia',
  });

  if (!isOpen) return null;

  const handleCreateScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchedule.doctorName || !newSchedule.specialty) {
      alert('Mohon lengkapi Nama Dokter/Layanan dan Spesialisasi.');
      return;
    }
    const scheduleToSave: DoctorSchedule = {
      id: `sch-${Date.now()}`,
      doctorId: newSchedule.doctorId || `doc-custom-${Date.now()}`,
      doctorName: newSchedule.doctorName || '',
      specialty: newSchedule.specialty || '',
      day: newSchedule.day || 'Senin - Sabtu',
      morningHours: newSchedule.morningHours || '',
      afternoonHours: newSchedule.afternoonHours || '',
      room: newSchedule.room || 'Poliklinik Utama',
      category: (newSchedule.category as DoctorSchedule['category']) || 'Praktik Pagi',
      status: (newSchedule.status as DoctorSchedule['status']) || 'Tersedia',
    };
    onAddSchedule(scheduleToSave);
    setIsAddingSchedule(false);
    setNewSchedule({
      doctorId: '',
      doctorName: '',
      specialty: '',
      day: 'Senin, Rabu, Jumat',
      morningHours: 'Pukul 09.00 s/d 12.00',
      afternoonHours: 'Pukul 14.00 s/d 17.00',
      room: 'Poliklinik Spesialis Lt. 1',
      category: 'Praktik Pagi',
      status: 'Tersedia',
    });
    alert(`Berhasil menambahkan jadwal praktik untuk ${scheduleToSave.doctorName}!`);
  };

  const handleUpdateScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchedule || !editingSchedule.doctorName) return;
    onUpdateSchedule(editingSchedule);
    setEditingSchedule(null);
    alert(`Berhasil memperbarui jadwal ${editingSchedule.doctorName}!`);
  };

  const handleCreateDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialty) return;
    const docToSave: Doctor = {
      id: `doc-${Date.now()}`,
      name: newDoctor.name || '',
      specialty: newDoctor.specialty || '',
      category: (newDoctor.category as Doctor['category']) || 'Penyakit Dalam',
      photo: newDoctor.photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80',
      sip: newDoctor.sip || '449/SIP/LT/2026',
      experience: newDoctor.experience || '5+ Tahun',
      scheduleDays: newDoctor.scheduleDays || 'Senin - Sabtu',
      morningShift: newDoctor.morningShift || '08:00 - 12:00 WIB',
      afternoonShift: newDoctor.afternoonShift || '15:00 - 18:00 WIB',
      status: (newDoctor.status as Doctor['status']) || 'Pagi',
      availableToday: newDoctor.availableToday ?? true,
      education: newDoctor.education || 'Universitas Indonesia',
    };
    onAddDoctor(docToSave);

    // Also auto-add a corresponding Schedule entry
    const schToSave: DoctorSchedule = {
      id: `sch-${Date.now()}`,
      doctorId: docToSave.id,
      doctorName: docToSave.name,
      specialty: docToSave.specialty,
      day: docToSave.scheduleDays,
      morningHours: docToSave.morningShift,
      afternoonHours: docToSave.afternoonShift,
      room: `Poli ${docToSave.category} (Lantai 1)`,
      category: 'Praktik Pagi',
      status: 'Tersedia',
    };
    onAddSchedule(schToSave);

    setIsAddingDoctor(false);
    alert(`Berhasil menambahkan ${docToSave.name} ke sistem database RS MMH!`);
  };

  const handleCreateNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title || !newNews.summary) return;
    const newsToSave: NewsItem = {
      id: `news-${Date.now()}`,
      title: newNews.title || '',
      category: (newNews.category as NewsItem['category']) || 'Seputar RS',
      date: newNews.date || 'Hari ini',
      image: newNews.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
      summary: newNews.summary || '',
      content: newNews.content || newNews.summary || '',
      author: newNews.author || 'Humas RS MMH',
    };
    onAddNews(newsToSave);
    setIsAddingNews(false);
    alert('Artikel berita baru berhasil dipublikasikan!');
  };

  const handleCreateManualTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTicket.patientName) return;
    const tNum = `MMH-ADM-${Math.floor(100 + Math.random() * 900)}`;
    const createdTicket: Ticket = {
      id: `t-${Date.now()}`,
      ticketNumber: tNum,
      doctorName: manualTicket.doctorName,
      specialty: manualTicket.specialty,
      date: new Date().toISOString().split('T')[0],
      timeSlot: manualTicket.timeSlot,
      patientName: manualTicket.patientName,
      nik: 'Manual Admisi',
      phone: manualTicket.phone || 'Loket Offsite',
      insuranceType: manualTicket.insuranceType,
      qrCodeValue: `TICKET:${tNum}:${manualTicket.patientName}`,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'Menunggu',
    };
    onAddTicket(createdTicket);
    setIsAddingTicket(false);
    alert(`Antrean Baru Berhasil Ditambahkan: No. Tiket ${tNum}`);
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.patientName.toLowerCase().includes(ticketSearchQuery.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(ticketSearchQuery.toLowerCase()) ||
      t.doctorName.toLowerCase().includes(ticketSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Top Bar Header */}
        <div className="bg-[#002F74] text-white px-6 py-4 flex flex-wrap justify-between items-center border-b border-blue-900 gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-md">
              MMH
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight">PANEL ADMINISTRATOR RS MITRA MULIA HUSADA</h2>
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Active
                </span>
                <span className="bg-blue-800 text-blue-200 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border border-blue-700">
                  URL: /admin
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">Bandar Jaya Timur, Lampung Tengah • Database Management Realtime</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer border border-white/20"
              title="Lihat Tampilan Website Utama Pasien"
            >
              <Globe className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">Website Utama</span>
            </button>

            <button
              onClick={() => {
                if (onLogout) {
                  onLogout();
                } else {
                  onClose();
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Admin</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex gap-2 overflow-x-auto text-xs sm:text-sm font-semibold text-slate-600 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#002F74] text-[#002F74] font-bold bg-white rounded-t-xl'
                : 'hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'doctors'
                ? 'border-[#002F74] text-[#002F74] font-bold bg-white rounded-t-xl'
                : 'hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Kelola Dokter ({doctors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schedules')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'schedules'
                ? 'border-[#002F74] text-[#002F74] font-bold bg-white rounded-t-xl'
                : 'hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Jadwal Praktik ({schedules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'tickets'
                ? 'border-[#002F74] text-[#002F74] font-bold bg-white rounded-t-xl'
                : 'hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-purple-600" />
            <span>Antrean Booking Pasien ({tickets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'news'
                ? 'border-[#002F74] text-[#002F74] font-bold bg-white rounded-t-xl'
                : 'hover:text-slate-900'
            }`}
          >
            <Newspaper className="w-4 h-4 text-rose-600" />
            <span>Kelola Berita ({news.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('careers')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'careers'
                ? 'border-[#002F74] text-[#002F74] font-bold bg-white rounded-t-xl'
                : 'hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span>Kelola Karir & Lowongan ({careers?.length || 0})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">Total Dokter Aktif</span>
                    <span className="text-3xl font-extrabold text-[#002F74]">{doctors.length}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                    👨‍⚕️
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">Antrean Booking</span>
                    <span className="text-3xl font-extrabold text-purple-700">{tickets.length}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                    🎫
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">Berita RS Dipublikasi</span>
                    <span className="text-3xl font-extrabold text-rose-600">{news.length}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
                    📰
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">UGD & Inap Status</span>
                    <span className="text-lg font-bold text-emerald-600">SIAGA 24 JAM</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                    🚑
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Aksi Cepat Admin</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => { setActiveTab('doctors'); setIsAddingDoctor(true); }}
                    className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#002F74] font-bold text-xs flex items-center gap-3 transition border border-blue-200"
                  >
                    <UserPlus className="w-5 h-5 text-blue-600" />
                    <span>+ Tambah Dokter Baru</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('tickets'); setIsAddingTicket(true); }}
                    className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-3 transition border border-purple-200"
                  >
                    <Plus className="w-5 h-5 text-purple-600" />
                    <span>+ Buat Antrean Manual Pasien</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('news'); setIsAddingNews(true); }}
                    className="p-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs flex items-center gap-3 transition border border-rose-200"
                  >
                    <Newspaper className="w-5 h-5 text-rose-600" />
                    <span>+ Tulis Artikel Berita Baru</span>
                  </button>
                </div>
              </div>

              {/* Recent Incoming Tickets Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-base">Tiket Pendaftaran Pasien Terbaru</h3>
                  <button
                    onClick={() => setActiveTab('tickets')}
                    className="text-xs font-semibold text-blue-700 hover:underline"
                  >
                    Kelola Semua ➔
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {tickets.slice(0, 4).map((t) => (
                    <div key={t.id || t.ticketNumber} className="py-3 flex flex-wrap justify-between items-center gap-2 text-xs">
                      <div>
                        <span className="font-bold text-purple-900 font-mono mr-2 bg-purple-100 px-2 py-0.5 rounded">
                          {t.ticketNumber}
                        </span>
                        <strong className="text-slate-900">{t.patientName}</strong> — {t.doctorName}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">{t.date} ({t.timeSlot})</span>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          t.status === 'Melayani' ? 'bg-amber-100 text-amber-800' :
                          t.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KELOLA DOKTER */}
          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Daftar Dokter Spesialis RS MMH</h3>
                <button
                  onClick={() => setIsAddingDoctor(!isAddingDoctor)}
                  className="bg-[#002F74] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingDoctor ? 'Batal Tambah' : 'Tambah Dokter Baru'}</span>
                </button>
              </div>

              {/* Form Tambah Dokter Baru */}
              {isAddingDoctor && (
                <form onSubmit={handleCreateDoctorSubmit} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md space-y-4 animate-in fade-in">
                  <h4 className="font-bold text-[#002F74] text-base border-b border-slate-100 pb-2">Form Tambah Dokter Spesialis Baru</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                      <input
                        type="text"
                        placeholder="Contoh: dr. Agung Wijaya, Sp.PD"
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Spesialisasi *</label>
                      <input
                        type="text"
                        placeholder="Spesialis Penyakit Dalam"
                        value={newDoctor.specialty}
                        onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Kategori Poliklinik *</label>
                      <select
                        value={newDoctor.category}
                        onChange={(e) => setNewDoctor({ ...newDoctor, category: e.target.value as Doctor['category'] })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      >
                        {['Penyakit Dalam', 'Anak', 'Obgyn', 'Bedah', 'Syaraf', 'Gigi', 'Mata', 'THT'].map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hari Praktik</label>
                      <input
                        type="text"
                        placeholder="Senin - Sabtu"
                        value={newDoctor.scheduleDays}
                        onChange={(e) => setNewDoctor({ ...newDoctor, scheduleDays: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nomor SIP</label>
                      <input
                        type="text"
                        placeholder="449/SIP.D/DS/LT/2026"
                        value={newDoctor.sip}
                        onChange={(e) => setNewDoctor({ ...newDoctor, sip: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">URL Foto Profil</label>
                      <input
                        type="text"
                        value={newDoctor.photo}
                        onChange={(e) => setNewDoctor({ ...newDoctor, photo: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingDoctor(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-[#002F74] text-white font-bold text-xs shadow-sm hover:bg-blue-900"
                    >
                      Simpan Dokter
                    </button>
                  </div>
                </form>
              )}

              {/* Table Dokter */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-800 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Dokter</th>
                      <th className="p-3.5">Spesialisasi</th>
                      <th className="p-3.5">Kategori</th>
                      <th className="p-3.5">Hari Praktik</th>
                      <th className="p-3.5 text-center">Tersedia Hari Ini</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {doctors.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-bold text-[#002F74] flex items-center gap-2">
                          <img src={doc.photo} alt={doc.name} className="w-8 h-8 rounded-full object-cover" />
                          <span>{doc.name}</span>
                        </td>
                        <td className="p-3.5 text-slate-700 font-medium">{doc.specialty}</td>
                        <td className="p-3.5">
                          <span className="bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded">
                            {doc.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600">{doc.scheduleDays}</td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() =>
                              onUpdateDoctor({ ...doc, availableToday: !doc.availableToday })
                            }
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
                              doc.availableToday
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {doc.availableToday ? '✓ Ya (Hadir)' : '✕ Cuti / Off'}
                          </button>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Hapus data ${doc.name} dari database RS MMH?`)) {
                                onDeleteDoctor(doc.id);
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Hapus Dokter"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: JADWAL PRAKTIK */}
          {activeTab === 'schedules' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Kelola Tabel Jadwal Praktik Poliklinik</h3>
                  <p className="text-xs text-slate-500">
                    Tambah, edit jam/hari praktik, ubah status kehadiran, atau hapus entri jadwal poliklinik.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingSchedule(!isAddingSchedule)}
                  className="bg-[#002F74] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>{isAddingSchedule ? 'Tutup Form' : 'Tambah Jadwal Baru'}</span>
                </button>
              </div>

              {/* Form Tambah Jadwal Baru */}
              {isAddingSchedule && (
                <form
                  onSubmit={handleCreateScheduleSubmit}
                  className="bg-amber-50/60 border border-amber-200 p-5 rounded-2xl space-y-4 shadow-sm"
                >
                  <div className="flex justify-between items-center border-b border-amber-200/80 pb-2">
                    <h4 className="font-bold text-sm text-[#002F74] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span>Form Tambah Jadwal Praktik Poliklinik Baru</span>
                    </h4>
                    <span className="text-xs text-slate-500">Isi detail jadwal dokter di bawah</span>
                  </div>

                  {/* Quick Select From Registered Doctor */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                    <label className="block font-bold text-slate-700 mb-1">
                      Pilih dari Dokter Terdaftar (Opsional):
                    </label>
                    <select
                      onChange={(e) => {
                        const selectedDoc = doctors.find((d) => d.id === e.target.value);
                        if (selectedDoc) {
                          setNewSchedule((prev) => ({
                            ...prev,
                            doctorId: selectedDoc.id,
                            doctorName: selectedDoc.name,
                            specialty: selectedDoc.specialty,
                            day: selectedDoc.scheduleDays,
                            morningHours: selectedDoc.morningShift,
                            afternoonHours: selectedDoc.afternoonShift,
                            room: `Poli ${selectedDoc.category} (Lt. 1)`,
                          }));
                        }
                      }}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    >
                      <option value="">-- Pilih Dokter Terdaftar atau Ketik Manual di Bawah --</option>
                      {doctors.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.specialty})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nama Dokter / Layanan *</label>
                      <input
                        type="text"
                        required
                        placeholder="misal: dr. Budi Santoso, Sp.A"
                        value={newSchedule.doctorName || ''}
                        onChange={(e) => setNewSchedule({ ...newSchedule, doctorName: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Spesialisasi *</label>
                      <input
                        type="text"
                        required
                        placeholder="misal: Spesialis Anak"
                        value={newSchedule.specialty || ''}
                        onChange={(e) => setNewSchedule({ ...newSchedule, specialty: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hari Praktik</label>
                      <input
                        type="text"
                        placeholder="misal: Senin, Rabu & Jumat"
                        value={newSchedule.day || ''}
                        onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Jam Shift Pagi</label>
                      <input
                        type="text"
                        placeholder="misal: Pukul 09.00 s/d 12.00"
                        value={newSchedule.morningHours || ''}
                        onChange={(e) => setNewSchedule({ ...newSchedule, morningHours: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Jam Shift Siang / Sore</label>
                      <input
                        type="text"
                        placeholder="misal: Pukul 14.00 s/d 17.00"
                        value={newSchedule.afternoonHours || ''}
                        onChange={(e) => setNewSchedule({ ...newSchedule, afternoonHours: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Ruangan / Poli</label>
                      <input
                        type="text"
                        placeholder="misal: Poliklinik Anak Lt. 1"
                        value={newSchedule.room || ''}
                        onChange={(e) => setNewSchedule({ ...newSchedule, room: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Kategori Layanan</label>
                      <select
                        value={newSchedule.category || 'Praktik Pagi'}
                        onChange={(e) => setNewSchedule({ ...newSchedule, category: e.target.value as DoctorSchedule['category'] })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                      >
                        <option value="Praktik Pagi">Praktik Pagi</option>
                        <option value="Praktik Siang">Praktik Siang</option>
                        <option value="Layanan Penunjang">Layanan Penunjang</option>
                        <option value="Layanan UGD">Layanan UGD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Status Kehadiran</label>
                      <select
                        value={newSchedule.status || 'Tersedia'}
                        onChange={(e) => setNewSchedule({ ...newSchedule, status: e.target.value as DoctorSchedule['status'] })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-bold text-slate-800"
                      >
                        <option value="Tersedia">Tersedia</option>
                        <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                        <option value="Cuti">Cuti</option>
                        <option value="Penuh">Penuh</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingSchedule(false)}
                      className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-[#002F74] text-white font-bold text-xs shadow-sm hover:bg-blue-900 transition flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>Simpan Jadwal Praktik</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Modal / Form Edit Jadwal */}
              {editingSchedule && (
                <form
                  onSubmit={handleUpdateScheduleSubmit}
                  className="bg-blue-50/80 border-2 border-blue-400 p-5 rounded-2xl space-y-4 shadow-md"
                >
                  <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                    <h4 className="font-bold text-sm text-[#002F74] flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-blue-700" />
                      <span>Edit Jadwal Dokter: {editingSchedule.doctorName}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingSchedule(null)}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      ✕ Batal
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nama Dokter / Layanan</label>
                      <input
                        type="text"
                        required
                        value={editingSchedule.doctorName}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, doctorName: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Spesialisasi</label>
                      <input
                        type="text"
                        required
                        value={editingSchedule.specialty}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, specialty: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hari Praktik</label>
                      <input
                        type="text"
                        value={editingSchedule.day}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, day: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Jam Shift Pagi</label>
                      <input
                        type="text"
                        value={editingSchedule.morningHours || ''}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, morningHours: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Jam Shift Siang / Sore</label>
                      <input
                        type="text"
                        value={editingSchedule.afternoonHours || ''}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, afternoonHours: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Ruangan Poli</label>
                      <input
                        type="text"
                        value={editingSchedule.room}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, room: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                      <select
                        value={editingSchedule.category}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, category: e.target.value as DoctorSchedule['category'] })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                      >
                        <option value="Praktik Pagi">Praktik Pagi</option>
                        <option value="Praktik Siang">Praktik Siang</option>
                        <option value="Layanan Penunjang">Layanan Penunjang</option>
                        <option value="Layanan UGD">Layanan UGD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Status Kehadiran</label>
                      <select
                        value={editingSchedule.status}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, status: e.target.value as DoctorSchedule['status'] })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-bold text-slate-800"
                      >
                        <option value="Tersedia">Tersedia</option>
                        <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                        <option value="Cuti">Cuti</option>
                        <option value="Penuh">Penuh</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingSchedule(null)}
                      className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-[#002F74] text-white font-bold text-xs shadow-sm hover:bg-blue-900 transition flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Update Perubahan Jadwal</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Search Bar for Schedule Table */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari jadwal berdasarkan nama dokter, spesialis, hari, atau ruangan..."
                  value={scheduleSearchQuery}
                  onChange={(e) => setScheduleSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {/* Table List Schedules */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-800 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Dokter / Layanan</th>
                      <th className="p-3.5">Spesialis</th>
                      <th className="p-3.5">Hari</th>
                      <th className="p-3.5">Jam Praktik</th>
                      <th className="p-3.5">Ruangan Poli</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-right">Aksi CRUD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schedules
                      .filter((sch) => {
                        if (!scheduleSearchQuery) return true;
                        const q = scheduleSearchQuery.toLowerCase();
                        return (
                          sch.doctorName.toLowerCase().includes(q) ||
                          sch.specialty.toLowerCase().includes(q) ||
                          sch.day.toLowerCase().includes(q) ||
                          sch.room.toLowerCase().includes(q)
                        );
                      })
                      .map((sch) => (
                        <tr key={sch.id} className="hover:bg-slate-50">
                          <td className="p-3.5 font-bold text-[#002F74]">{sch.doctorName}</td>
                          <td className="p-3.5 text-slate-700 font-medium">{sch.specialty}</td>
                          <td className="p-3.5 text-slate-600">{sch.day}</td>
                          <td className="p-3.5 font-mono text-[11px] text-slate-700">
                            {sch.morningHours && <div>Pagi: {sch.morningHours}</div>}
                            {sch.afternoonHours && <div>Siang: {sch.afternoonHours}</div>}
                            {!sch.morningHours && !sch.afternoonHours && <div>24 Jam</div>}
                          </td>
                          <td className="p-3.5 text-slate-500">{sch.room}</td>
                          <td className="p-3.5 text-center">
                            <select
                              value={sch.status}
                              onChange={(e) =>
                                onUpdateSchedule({
                                  ...sch,
                                  status: e.target.value as DoctorSchedule['status'],
                                })
                              }
                              className="p-1 border border-slate-200 rounded bg-slate-50 text-[11px] font-bold text-slate-800"
                            >
                              <option value="Tersedia">Tersedia</option>
                              <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                              <option value="Cuti">Cuti</option>
                              <option value="Penuh">Penuh</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setEditingSchedule(sch)}
                                className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition"
                                title="Edit Detail Jadwal Ini"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Hapus jadwal praktik ${sch.doctorName}?`)) {
                                    onDeleteSchedule(sch.id);
                                  }
                                }}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                title="Hapus Jadwal"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ANTREAN BOOKING PASIEN */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Manajemen Tiket Antrean Pasien</h3>
                  <p className="text-xs text-slate-500">
                    Update status panggilan admisi pasien yang mendaftar online via website RS MMH.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsAddingTicket(!isAddingTicket)}
                    className="bg-[#002F74] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Antrean Manual Offsite</span>
                  </button>
                </div>
              </div>

              {/* Form Manual Ticket */}
              {isAddingTicket && (
                <form onSubmit={handleCreateManualTicketSubmit} className="bg-white p-6 rounded-2xl border border-purple-200 shadow-md space-y-4">
                  <h4 className="font-bold text-purple-900 text-base border-b border-slate-100 pb-2">Registrasi Pasien Baru (Manual Loket RS MMH)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nama Pasien *</label>
                      <input
                        type="text"
                        placeholder="Nama pasien..."
                        value={manualTicket.patientName}
                        onChange={(e) => setManualTicket({ ...manualTicket, patientName: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">No. HP / WA Pasien</label>
                      <input
                        type="tel"
                        placeholder="0812..."
                        value={manualTicket.phone}
                        onChange={(e) => setManualTicket({ ...manualTicket, phone: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pilihan Dokter Tujuan</label>
                      <select
                        value={manualTicket.doctorName}
                        onChange={(e) => {
                          const doc = doctors.find(d => d.name === e.target.value);
                          setManualTicket({
                            ...manualTicket,
                            doctorName: e.target.value,
                            specialty: doc ? doc.specialty : 'Spesialis',
                          });
                        }}
                        className="w-full p-2.5 border rounded-xl bg-slate-50 font-semibold"
                      >
                        {doctors.map((d) => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setIsAddingTicket(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold">Batal</button>
                    <button type="submit" className="px-5 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold">Cetak & Simpan Antrean</button>
                  </div>
                </form>
              )}

              {/* Ticket Search Bar */}
              <div className="max-w-md relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nomor antrean atau nama pasien..."
                  value={ticketSearchQuery}
                  onChange={(e) => setTicketSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Ticket Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTickets.map((t) => (
                  <div
                    key={t.id || t.ticketNumber}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Nomor Antrean</span>
                        <span className="text-xl font-black text-[#002F74] font-mono">{t.ticketNumber}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        t.status === 'Melayani' ? 'bg-amber-100 text-amber-800' :
                        t.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                        t.status === 'Batal' ? 'bg-rose-100 text-rose-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 text-slate-700">
                      <p><strong>Pasien:</strong> {t.patientName}</p>
                      <p><strong>Dokter:</strong> {t.doctorName}</p>
                      <p><strong>Jadwal:</strong> {t.date} ({t.timeSlot})</p>
                      <p><strong>Penjamin:</strong> <span className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold text-slate-800">{t.insuranceType}</span></p>
                      {t.phone && <p><strong>WA / Telp:</strong> {t.phone}</p>}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[10px]">Ubah Status:</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onUpdateTicketStatus(t.id || t.ticketNumber, 'Melayani')}
                          className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[10px] font-bold"
                        >
                          Dipanggil
                        </button>
                        <button
                          onClick={() => onUpdateTicketStatus(t.id || t.ticketNumber, 'Selesai')}
                          className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-[10px] font-bold"
                        >
                          Selesai
                        </button>
                        <button
                          onClick={() => onUpdateTicketStatus(t.id || t.ticketNumber, 'Batal')}
                          className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-lg text-[10px] font-bold"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KELOLA BERITA */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Publikasi Berita & Artikel RS MMH</h3>
                <button
                  onClick={() => setIsAddingNews(!isAddingNews)}
                  className="bg-[#002F74] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingNews ? 'Batal Tulis' : 'Tulis Artikel Berita Baru'}</span>
                </button>
              </div>

              {/* Form Tulis Berita */}
              {isAddingNews && (
                <form onSubmit={handleCreateNewsSubmit} className="bg-white p-6 rounded-2xl border border-rose-200 shadow-md space-y-4">
                  <h4 className="font-bold text-rose-900 text-base border-b border-slate-100 pb-2">Buat Artikel Berita Baru</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Judul Berita *</label>
                      <input
                        type="text"
                        placeholder="Judul artikel pengumuman atau tips..."
                        value={newNews.title}
                        onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                      <select
                        value={newNews.category}
                        onChange={(e) => setNewNews({ ...newNews, category: e.target.value as NewsItem['category'] })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      >
                        <option value="Seputar RS">Seputar RS</option>
                        <option value="Tips Kesehatan">Tips Kesehatan</option>
                        <option value="Fasilitas Baru">Fasilitas Baru</option>
                        <option value="Event">Event</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">URL Gambar Sampul</label>
                      <input
                        type="text"
                        value={newNews.image}
                        onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat *</label>
                      <textarea
                        rows={2}
                        placeholder="Ringkasan 1-2 kalimat..."
                        value={newNews.summary}
                        onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Isi Artikel Lengkap</label>
                      <textarea
                        rows={4}
                        placeholder="Tuliskan isi berita lengkap di sini..."
                        value={newNews.content}
                        onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setIsAddingNews(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold">Batal</button>
                    <button type="submit" className="px-5 py-2 bg-rose-700 text-white rounded-xl text-xs font-bold">Publikasikan Berita</button>
                  </div>
                </form>
              )}

              {/* Grid Berita */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((n) => (
                  <div key={n.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <img src={n.image} alt={n.title} className="w-full h-36 object-cover rounded-xl" />
                      <span className="inline-block px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px]">
                        {n.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{n.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{n.summary}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="text-[10px] text-slate-400">{n.date}</span>
                      <button
                        onClick={() => onDeleteNews(n.id)}
                        className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg flex items-center gap-1 font-semibold text-[11px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: KELOLA KARIR & LOWONGAN KERJA */}
          {activeTab === 'careers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-amber-600" />
                    <span>Manajemen Poster & Flyer Lowongan Kerja RS MMH</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tambahkan flyer/poster rekrutmen terbaru, atur status aktif, dan kelola kualifikasi pekerjaan.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingCareer(!isAddingCareer)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingCareer ? 'Tutup Form' : 'Tambah Poster Lowongan Baru'}</span>
                </button>
              </div>

              {/* Form Tambah Career */}
              {isAddingCareer && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCareerForm.title || !newCareerForm.description) return;
                    const reqList = newCareerForm.requirementsRaw
                      .split('\n')
                      .map((r) => r.trim())
                      .filter((r) => r.length > 0);

                    const newPoster: CareerItem = {
                      id: `car-${Date.now()}`,
                      title: newCareerForm.title,
                      department: newCareerForm.department,
                      type: newCareerForm.type,
                      posterPhoto: newCareerForm.posterUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
                      description: newCareerForm.description,
                      requirements: reqList.length > 0 ? reqList : ['Pendidikan sesuai bidang', 'Memiliki STR aktif'],
                      postedDate: 'Hari ini',
                      deadline: newCareerForm.deadline || '31 Agustus 2026',
                      isActive: true,
                    };

                    onAddCareer(newPoster);
                    setIsAddingCareer(false);
                    setNewCareerForm({
                      title: '',
                      department: 'Keperawatan',
                      type: 'Full Time',
                      posterUrl: '/oprecGigi.jpeg',
                      description: '',
                      requirementsRaw: 'Pendidikan minimal D3/S1 Keperawatan\nMemiliki STR Aktif\nMemiliki sertifikat BTCLS',
                      deadline: '31 Agustus 2026',
                    });
                  }}
                  className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-md space-y-4"
                >
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b pb-2">
                    <Plus className="w-4 h-4 text-amber-600" />
                    <span>Form Posting Flyer / Lowongan Kerja Baru</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Judul Lowongan / Posisi *</label>
                      <input
                        type="text"
                        placeholder="Contoh: Lowongan Perawat Pelaksana UGD"
                        value={newCareerForm.title}
                        onChange={(e) => setNewCareerForm({ ...newCareerForm, title: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Departemen / Unit</label>
                      <input
                        type="text"
                        placeholder="Contoh: Keperawatan / Farmasi / Rekam Medis"
                        value={newCareerForm.department}
                        onChange={(e) => setNewCareerForm({ ...newCareerForm, department: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tipe Pekerjaan</label>
                      <select
                        value={newCareerForm.type}
                        onChange={(e) => setNewCareerForm({ ...newCareerForm, type: e.target.value as any })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Kontrak">Kontrak</option>
                        <option value="Magang">Magang</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Batas Akhir (Deadline)</label>
                      <input
                        type="text"
                        placeholder="Contoh: 31 Agustus 2026"
                        value={newCareerForm.deadline}
                        onChange={(e) => setNewCareerForm({ ...newCareerForm, deadline: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">URL Gambar Poster / Flyer Lowongan</label>
                      <input
                        type="text"
                        placeholder="URL foto flyer poster (https://...)"
                        value={newCareerForm.posterUrl}
                        onChange={(e) => setNewCareerForm({ ...newCareerForm, posterUrl: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat Pekerjaan *</label>
                      <textarea
                        rows={2}
                        placeholder="Tuliskan uraian singkat posisi pekerjaan ini..."
                        value={newCareerForm.description}
                        onChange={(e) => setNewCareerForm({ ...newCareerForm, description: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Syarat / Kualifikasi (Pisahkan dengan baris baru Enter)</label>
                      <textarea
                        rows={3}
                        placeholder="Pendidikan D3/S1 Keperawatan&#10;Memiliki STR Aktif&#10;Sertifikat BTCLS"
                        value={newCareerForm.requirementsRaw}
                        onChange={(e) => setNewCareerForm({ ...newCareerForm, requirementsRaw: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingCareer(false)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold"
                    >
                      Simpan Poster Lowongan
                    </button>
                  </div>
                </form>
              )}

              {/* Grid Posters Lowongan */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careers.map((c) => (
                  <div
                    key={c.id}
                    className={`bg-white rounded-2xl border p-4 shadow-xs flex flex-col justify-between space-y-3 ${
                      c.isActive ? 'border-slate-200' : 'border-amber-200 bg-amber-50/30 opacity-75'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 border">
                        <img src={c.posterPhoto} alt={c.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {c.department}
                        </span>
                        <span className={`absolute top-2 right-2 text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          c.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-slate-900'
                        }`}>
                          {c.isActive ? 'AKTIF' : 'NONAKTIF'}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{c.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
                      
                      <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                        <p>🗓️ Diposting: <strong>{c.postedDate}</strong></p>
                        <p>⏳ Deadline: <strong>{c.deadline || '-'}</strong></p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                      <button
                        onClick={() => onToggleCareerStatus(c.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                          c.isActive
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                        title="Klik untuk ubah status tayang"
                      >
                        {c.isActive ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
                        <span>Status: {c.isActive ? 'Tayang' : 'Sembunyi'}</span>
                      </button>

                      <button
                        onClick={() => onDeleteCareer(c.id)}
                        className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg flex items-center gap-1 font-semibold text-[11px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
