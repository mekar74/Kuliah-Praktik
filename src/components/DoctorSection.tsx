import React, { useState } from 'react';
import { DOCTORS } from '../data/hospitalData';
import { Doctor } from '../types';
import { Stethoscope, Calendar, Clock, Award } from 'lucide-react';

interface DoctorSectionProps {
  doctors?: Doctor[];
  onOpenBookingWithDoctor: (doctorId: string) => void;
  onOpenSearch: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({
  doctors = DOCTORS,
  onOpenBookingWithDoctor,
  onOpenSearch,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Semua');

  const specialties = ['Semua', 'Penyakit Dalam', 'Anak', 'Bedah', 'Syaraf', 'Gigi', 'Mata', 'THT', 'Anestesi', 'Jantung', 'Radiologi', 'Rehab Medik', 'Kebidanan', 'Paru', 'Kedokteran Jiwa', 'Kulit & Kelamin'];

  const filteredDoctors = doctors.filter(
    (doc) => selectedSpecialty === 'Semua' || doc.category === selectedSpecialty
  );

  return (
    <section id="dokter" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Dokter Spesialis</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          SEMUA DOKTER SPESIALIS
        </h2>
        <p className="text-slate-600 text-sm mt-2.5 leading-relaxed">
          Tim dokter spesialis profesional dan ramah di RS Mitra Mulia Husada yang siap melayani Anda.
        </p>
      </div>

      {/* Filter Badges */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
              selectedSpecialty === spec
                ? 'bg-[#002F74] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Grid Dokter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 flex flex-col group">
            <div className="h-64 sm:h-72 bg-slate-100 overflow-hidden relative">
              <img
                src={doc.photo}
                alt={doc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold tracking-wide uppercase mb-1">
                  {doc.category}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white leading-tight">
                  {doc.name}
                </h3>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium text-blue-900">
                  <Stethoscope className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="line-clamp-1">{doc.specialty}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{doc.scheduleDays}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Pengalaman {doc.experience}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBookingWithDoctor(doc.id)}
                className="w-full mt-3 bg-blue-50 hover:bg-[#002F74] text-[#002F74] hover:text-white font-semibold py-2 px-3 rounded-xl border border-blue-200 text-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5">
                <span>Booking Jadwal</span>
                <Calendar className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onOpenSearch}
          className="bg-[#99C2FF] hover:bg-blue-300 text-[#002F74] font-bold px-8 py-3 rounded-xl inline-flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer">
          <span>Semua Dokter & Cari Spesialis</span>
          <span>👨‍⚕️</span>
        </button>
      </div>
    </section>
  );
};
