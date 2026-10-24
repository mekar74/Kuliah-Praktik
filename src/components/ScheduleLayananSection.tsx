import React, { useState } from 'react';
import { SCHEDULES } from '../data/hospitalData';
import { DoctorSchedule } from '../types';
import {
  Search,
  Calendar,
  Printer,
  Ambulance,
} from 'lucide-react';

interface ScheduleLayananSectionProps {
  schedules?: DoctorSchedule[];
  onOpenBookingWithDoctor?: (doctorId: string) => void;
  onOpenBooking: () => void;
  onOpenAmbulance: () => void;
}

export const ScheduleLayananSection: React.FC<ScheduleLayananSectionProps> = ({
  schedules = SCHEDULES,
  onOpenBookingWithDoctor,
  onOpenBooking,
  onOpenAmbulance,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPoli, setSelectedPoli] = useState<string>('Semua');

  const poliklinikList = [
    'Semua',
    'Poli Mata',
    'Poli Kebidanan',
    'Poli Jantung',
    'Poli Bedah',
    'Bedah Saraf',
    'Urologi',
    'Onkologi',
    'Poli Kedokteran Jiwa',
    'Poli Rehab Medik',
    'Poli Paru',
    'Poli Penyakit Dalam',
    'Poli THT - KL',
    'Poli Saraf',
    'Poli Anak',
    'Poli Kulit & Kelamin',
    'Radiologi',
    'Poli Ortopedi',
    'Poli Gigi',
  ];

  // Filter for Interactive Table View
  const filteredSchedules = schedules.filter((item) => {
    const matchesPoli =
      selectedPoli === 'Semua' ||
      item.specialty.toLowerCase().includes(selectedPoli.toLowerCase()) ||
      item.room.toLowerCase().includes(selectedPoli.toLowerCase()) ||
      (selectedPoli === 'Poli Kebidanan' && item.specialty.includes('Kebidanan')) ||
      (selectedPoli === 'UGD' && item.category === 'Layanan UGD');

    const matchesSearch =
      item.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.room.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPoli && matchesSearch;
  });

  const handlePrintSchedule = () => {
    window.print();
  };

  return (
    <section id="layanan" className="py-12 max-w-7xl mx-auto px-3 sm:px-6">
      {/* Section Header */}
<div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Ambulance className="w-3.5 h-3.5" />
          <span>Fasilitas & jadwal praktik</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
          JADWAL PRAKTIK DOKTER SPESIALIS
        </h2>
        <p className="text-slate-600 text-sm mt-2.5 leading-relaxed">
          Informasi resmi jadwal konsultasi dan jam praktik seluruh dokter spesialis RS MMH terupdate.
        </p>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center">
          {/* Search Box */}
          <div className="w-full lg:flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama dokter spesialis atau poliklinik (misal: dr. Cecep, Mata, Kebidanan, Anak)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Poli Filter Dropdown */}
          <div className="w-full lg:w-auto flex items-center gap-2">
            <select
              value={selectedPoli}
              onChange={(e) => setSelectedPoli(e.target.value)}
              className="w-full lg:w-auto bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              {poliklinikList.map((p) => (
                <option key={p} value={p}>
                  {p === 'Semua' ? 'Filter Semua Poliklinik' : p}
                </option>
              ))}
            </select>

            <button
              onClick={handlePrintSchedule}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold p-2.5 rounded-xl border border-slate-200 transition shrink-0 hidden sm:flex items-center gap-1.5 cursor-pointer"
              title="Cetak Jadwal Praktik"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE TABLE MODE */}
      <div className="w-full bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-12">
        <div className="bg-[#002F74] text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-blue-900">
          <div>
            <h3 className="font-bold text-lg sm:text-xl flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-300" />
              <span>Tabel Jadwal Dokter & Poliklinik</span>
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              Menampilkan {filteredSchedules.length} jadwal dokter terdaftar
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="bg-[#FFFB7E] hover:bg-yellow-300 text-slate-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>+ Booking Online via WhatsApp</span>
          </button>
        </div>

        {/* Desktop Table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Nama Dokter / Layanan</th>
                <th className="py-3.5 px-6">Spesialisasi</th>
                <th className="py-3.5 px-6">Hari Praktik</th>
                <th className="py-3.5 px-6">Jam Praktik</th>
                <th className="py-3.5 px-6">Ruangan Poli</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#002F74]">
                      {sch.doctorName}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold">
                        {sch.specialty}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">{sch.day}</td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-700">
                      {sch.morningHours && <div>Pagi: {sch.morningHours}</div>}
                      {sch.afternoonHours && <div>Siang: {sch.afternoonHours}</div>}
                      {!sch.morningHours && !sch.afternoonHours && <div>24 Jam</div>}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">{sch.room}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Tidak ada jadwal dokter yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y divide-slate-100 p-4 space-y-4">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((sch) => (
              <div key={sch.id} className="pt-3 first:pt-0 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-[#002F74] text-base">{sch.doctorName}</h4>
                </div>
                <p className="text-xs font-semibold text-blue-700">{sch.specialty}</p>
                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Hari:</strong> {sch.day}</div>
                  {sch.morningHours && <div><strong>Pagi:</strong> {sch.morningHours}</div>}
                  {sch.afternoonHours && <div><strong>Siang:</strong> {sch.afternoonHours}</div>}
                  <div><strong>Lokasi:</strong> {sch.room}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-slate-500 text-sm">
              Jadwal tidak ditemukan.
            </div>
          )}
        </div>
      </div>

      {/* Cards Layanan Utama */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {/* Card UGD */}
        <div className="bg-[#99C2FF]/40 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition border border-blue-100">
          <div className="w-16 h-16 bg-[#002F74] text-white rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-md">
            🚑
          </div>
          <h3 className="text-xl font-bold text-[#002F74] mb-2">UGD 24 JAM</h3>
          <p className="text-sm text-[#002F74] mb-6 min-h-[48px]">
            Layanan UGD 24 Jam dengan dokter dan tim medis gawat darurat yang siaga melayani setiap saat.
          </p>
          <button
            onClick={onOpenAmbulance}
            className="mt-auto px-6 py-2.5 bg-white text-slate-900 font-semibold rounded-xl border border-white hover:bg-[#FFFB7E] transition shadow-xs cursor-pointer"
          >
            Hubungi UGD
          </button>
        </div>

        {/* Card Poliklinik */}
        <div className="bg-[#99C2FF]/40 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition border border-blue-100">
          <div className="w-16 h-16 bg-[#002F74] text-white rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-md">
            🏥
          </div>
          <h3 className="text-xl font-bold text-[#002F74] mb-2">Poliklinik Spesialis</h3>
          <p className="text-sm text-[#002F74] mb-6 min-h-[48px]">
            Layanan poliklinik spesialis terlengkap untuk menjamin kesehatan pasien yang didampingi oleh dokter spesialis profesional.
          </p>
          <button
            onClick={onOpenBooking}
            className="mt-auto px-6 py-2.5 bg-white text-slate-900 font-semibold rounded-xl border border-white hover:bg-[#FFFB7E] transition shadow-xs cursor-pointer"
          >
            Daftar Poliklinik
          </button>
        </div>

        {/* Card Antar Jemput */}
        <div className="bg-[#99C2FF]/40 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition border border-blue-100">
          <div className="w-16 h-16 bg-[#002F74] text-white rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-md">
            🚐
          </div>
          <h3 className="text-xl font-bold text-[#002F74] mb-2">Layanan Antar Jemput</h3>
          <p className="text-sm text-[#002F74] mb-6 min-h-[48px]">
            Armada Bakti Mulia Untuk Lampung yang siap antar jemput pasien sekitar rumah sakit dengan aman.
          </p>
          <button
            onClick={onOpenAmbulance}
            className="mt-auto px-6 py-2.5 bg-white text-slate-900 font-semibold rounded-xl border border-white hover:bg-[#FFFB7E] transition shadow-xs cursor-pointer"
          >
            Minta Antar Jemput
          </button>
        </div>
      </div>
    </section>
  );
};

