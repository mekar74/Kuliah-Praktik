import React from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { Phone, MapPin, Mail, Clock, ShieldCheck, HeartPulse } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAmbulance: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAmbulance, onOpenAdmin }) => {
  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 p-0.5 flex items-center justify-center overflow-hidden">
                <img
                  src="/logoBaru.jpg"
                  alt="RS MMH Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  RUMAH SAKIT MITRA MULIA HUSADA
                </h3>
                <p className="text-xs text-yellow-400 font-semibold tracking-wide">
                  BANDAR JAYA TIMUR - LAMPUNG TENGAH
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              “Mulia Hatinya, Ramah Pelayanannya”. Memberikan pelayanan kesehatan komprehensif 24 Jam dengan profesionalisme, empati, dan teknologi medis modern demi keselamatan serta kenyamanan pasien.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-[#FFFB7E] hover:bg-yellow-300 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition">
                Booking Online
              </button>

              <button
                onClick={onOpenAmbulance}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition">
                Panggil UGD
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => scrollTo('tentang')} className="hover:text-yellow-300 transition cursor-pointer">
                  • Profil & Visi Misi RS
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('layanan')} className="hover:text-yellow-300 transition cursor-pointer">
                  • Fasilitas & Jadwal Praktik
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('dokter')} className="hover:text-yellow-300 transition cursor-pointer">
                  • Semua Dokter Spesialis
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('berita')} className="hover:text-yellow-300 transition cursor-pointer">
                  • Berita & Edukasi Kesehatan
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('kontak')} className="hover:text-yellow-300 transition cursor-pointer">
                  • Kontak & Fitur Navigasi GPS
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('karir')} className="hover:text-amber-300 font-bold text-amber-400 transition cursor-pointer">
                  • Karir & Lowongan Kerja RS MMH
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Layanan Informasi 24 Jam
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-300 shrink-0" />
                <span>UGD 1: <strong className="text-white">{HOSPITAL_INFO.phoneUGD1}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UGD 2: <strong className="text-white">{HOSPITAL_INFO.phoneUGD2}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{HOSPITAL_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>UGD & Rawat Inap: <strong className="text-emerald-400">24 JAM NONSTOP</strong></span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Rumah Sakit Mitra Mulia Husada Bandar Jaya Timur. Mekar Cendra Narwastu.</p>
          <div className="flex items-center gap-4">
            <a href="#kontak" className="hover:underline">Lokasi & Maps</a>
            <span>•</span>
            {/* <button
              onClick={onOpenAdmin}
              className="hover:text-yellow-300 text-slate-400 font-semibold flex items-center gap-1 cursor-pointer transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
              <span>Portal Admin RS</span>
            </button> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
