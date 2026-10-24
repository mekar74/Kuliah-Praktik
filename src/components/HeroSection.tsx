import React from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { PhoneCall, Navigation, Clock, ShieldCheck, HeartPulse, Award, Users } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onNavigateToLocation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onNavigateToLocation,
}) => {
  return (
    <section id="tentang" className="relative min-h-[600px] flex items-center justify-center bg-blue-100/50 overflow-hidden py-12 md:py-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-85 scale-105 transform transition-transform duration-1000"
        style={{ 
          backgroundImage: `url('/menu.jpg')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#002F74]/80 via-[#99C2FF]/50 to-blue-950/75 mix-blend-multiply" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-16 grid lg:grid-cols-12 gap-8 items-center">
        {/* Main Card */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-white/80 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#002F74] text-xs md:text-sm font-semibold border border-blue-200 shadow-xs">
            <HeartPulse className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Rumah Sakit Umum Bandar Jaya Timur</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002F74] leading-tight tracking-tight">
            “Mulia Hatinya, Ramah Pelayanannya”
          </h2>

          <p className="text-slate-700 leading-relaxed text-base md:text-lg">
            Rumah Sakit Mitra Mulia Husada senantiasa berkomitmen memberikan pelayanan kesehatan holistik, cepat, dan terjangkau bagi seluruh lapisan masyarakat Lampung Tengah. Didukung oleh tim dokter spesialis berpengalaman, perawat ramah, serta fasilitas medis modern 24 jam nonstop.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#002F74] hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 text-sm md:text-base shadow-md transition active:scale-95 cursor-pointer"
            >
              <Clock className="w-5 h-5 text-yellow-300" />
              <span>Daftar / Booking Online</span>
            </button>

            <button
              onClick={onNavigateToLocation}
              className="bg-[#FFFB7E] hover:bg-yellow-300 text-slate-900 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 text-sm md:text-base shadow-md transition active:scale-95 cursor-pointer"
            >
              <Navigation className="w-5 h-5 text-slate-900" />
              <span>Navigasi Otomatis Ke Lokasi</span>
            </button>
          </div>

          {/* Quick Badges */}
          <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-3 text-center">
            <div className="p-2 bg-blue-50/60 rounded-xl">
              <span className="block text-xl font-bold text-[#002F74]">24 Jam</span>
              <span className="text-xs text-slate-600 font-medium">UGD & Ambulans</span>
            </div>
            <div className="p-2 bg-blue-50/60 rounded-xl">
              <span className="block text-xl font-bold text-[#002F74]">15+</span>
              <span className="text-xs text-slate-600 font-medium">Dokter Spesialis</span>
            </div>
            <div className="p-2 bg-blue-50/60 rounded-xl">
              <span className="block text-xl font-bold text-[#002F74]">BPJS</span>
              <span className="text-xs text-slate-600 font-medium">& Asuransi Melayani</span>
            </div>
          </div>
        </div>

        {/* Right Side Quick Info Box */}
        <div className="lg:col-span-5 bg-[#002F74]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-blue-400/30 space-y-5">
          <h3 className="text-xl font-bold flex items-center gap-2 border-b border-blue-700/60 pb-3">
            <ShieldCheck className="w-6 h-6 text-yellow-400" />
            <span>Informasi Kontak Cepat UGD</span>
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3 bg-blue-900/60 p-3.5 rounded-xl border border-blue-700/50">
              <PhoneCall className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs text-blue-200">Call Center UGD Utama (24 Jam)</span>
                <a href={`tel:${HOSPITAL_INFO.phoneUGD1}`} className="text-lg font-bold text-yellow-300 hover:underline">
                  {HOSPITAL_INFO.phoneUGD1}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-blue-900/60 p-3.5 rounded-xl border border-blue-700/50">
              <PhoneCall className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs text-blue-200">UGD Alternatif / WA Respon Cepat</span>
                <a href={`tel:${HOSPITAL_INFO.phoneUGD2}`} className="text-base font-bold text-emerald-300 hover:underline">
                  {HOSPITAL_INFO.phoneUGD2}
                </a>
              </div>
            </div>

            <div className="text-xs text-blue-200 bg-blue-950/40 p-3 rounded-xl leading-relaxed">
              📍 <strong>Alamat:</strong> {HOSPITAL_INFO.address}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
