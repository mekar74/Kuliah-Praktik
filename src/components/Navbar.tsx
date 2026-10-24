import React, { useState } from 'react';
import { Search, Clock, Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBooking: () => void;
  onOpenAmbulance: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenBooking,
  onOpenAmbulance,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      
      {/* Top emergency announcement bar for mobile & desktop */}
      <div className="bg-[#002F74] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Layanan UGD & Gawat Darurat 24 Jam Nonstop</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
            <button 
              onClick={onOpenAmbulance}
              className="hover:underline flex items-center gap-1 text-yellow-300 font-semibold cursor-pointer">🚑 UGD 1: 0812-7171-7197
            </button>
            <span>|</span>
            <a href="tel:087792945777" className="hover:underline">UGD 2: 0877-9294-5777</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-[73px] flex items-center justify-between">
        
        {/* Logo & Name */}
        <div 
          onClick={() => scrollToSection('tentang')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden bg-gradient-to-tr from-blue-700 via-blue-600 to-yellow-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img 
                src="/logoBaru.jpg" 
                alt="Logo RS Mitra Mulia Husada" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-slate-700 bg-clip-text text-transparent max-w-[200px] leading-snug tracking-tight">
              RUMAH SAKIT MITRA MULIA HUSADA
            </h1>
            <p className="text-[10px] text-blue-800 font-medium tracking-wide">BANDAR JAYA TIMUR</p>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <button 
            onClick={() => scrollToSection('tentang')} className="hover:text-blue-600 transition cursor-pointer py-1">
            Tentang
          </button>

          <button 
            onClick={() => scrollToSection('layanan')} className="hover:text-blue-600 transition cursor-pointer py-1">
            Layanan
          </button>

          <button 
            onClick={() => scrollToSection('dokter')} className="hover:text-blue-600 transition cursor-pointer py-1">
            Dokter
          </button>

          <button 
            onClick={() => scrollToSection('berita')} className="hover:text-blue-600 transition cursor-pointer py-1">
            Berita
          </button>

          <button 
            onClick={() => scrollToSection('kontak')} className="hover:text-blue-600 transition cursor-pointer py-1">
            Kontak & Navigasi
          </button>

          <button
            onClick={() => scrollToSection('Karir')} className="hover:text-blue-600 transition cursor-pointer py-1 text-slate-700 font-semibold">
            Karir
          </button>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button 
            onClick={onOpenSearch} className="bg-[#FFFB7E] hover:bg-yellow-300 text-black font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs md:text-sm shadow-xs transition active:scale-95 cursor-pointer">
            <span>Cari Dokter</span>
            <Search className="w-4 h-4 text-slate-800" />
          </button>
          
          <button 
            onClick={onOpenBooking} className="bg-[#FFFB7E] hover:bg-yellow-300 text-black font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs md:text-sm shadow-xs transition active:scale-95 cursor-pointer">
            <span>Booking Online</span>
            <Clock className="w-4 h-4 text-slate-800" />
          </button>
        </div>

        {/* Hamburger Toggle - Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition"
            aria-label="Toggle Menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-3 font-medium text-slate-800">
            <button
              onClick={() => scrollToSection('tentang')} className="text-left py-2 px-3 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">
              Tentang
            </button>

            <button
              onClick={() => scrollToSection('layanan')} className="text-left py-2 px-3 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">
              Jadwal & Layanan
            </button>

            <button
              onClick={() => scrollToSection('dokter')} className="text-left py-2 px-3 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">
              Dokter Spesialis
            </button>

            <button
              onClick={() => scrollToSection('berita')} className="text-left py-2 px-3 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">
              Berita & Edukasi
            </button>

            <button
              onClick={() => scrollToSection('kontak')} className="text-left py-2 px-3 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">
              Kontak & Navigasi Otomatis
            </button>

            <button
              onClick={() => scrollToSection('karir')} className="text-left py-2 px-3 hover:bg-amber-50 hover:text-amber-800 text-amber-800 font-bold rounded-lg transition flex items-center justify-between">
              <span>Karir & Lowongan Kerja</span>
              <span className="bg-amber-200 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded">NEW</span>
            </button>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSearch(); }} className="w-full bg-[#FFFB7E] hover:bg-yellow-300 text-slate-900 font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm">
                <Search className="w-4 h-4" />
                <span>Cari Dokter & Spesialis</span>
              </button>
              
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }} className="w-full bg-[#FFFB7E] hover:bg-yellow-300 text-slate-900 font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm">
                <Clock className="w-4 h-4" />
                <span>Booking Online Antrean</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAmbulance(); }} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm">
                <PhoneCall className="w-4 h-4" />
                <span>Panggil Ambulance UGD 24 Jam</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
