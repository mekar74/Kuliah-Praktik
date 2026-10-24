import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* ================= TOP BAR / NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-[73px] flex items-center justify-between">
          
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
              <img src="/3d_avatar_3.png" alt="Logo RS" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-gray-500 bg-clip-text text-transparent max-w-[180px] leading-tight">
              RUMAH SAKIT MITRA MULIA HUSADA
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#layanan" className="hover:text-blue-600 transition">Layanan</a>
            <a href="#berita" className="hover:text-blue-600 transition">Berita</a>
            <a href="#tentang" className="hover:text-blue-600 transition">Tentang</a>
            <a href="#kontak" className="hover:text-blue-600 transition">Kontak</a>
            <a href="#dokter" className="hover:text-blue-600 transition">Dokter</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="bg-[#FFFB7E] hover:bg-yellow-300 text-black font-medium px-4 py-2 rounded-xl flex items-center gap-2 text-sm shadow-sm transition">
              <span>Cari Doktor</span>
              <span>🔍</span>
            </button>
            <button className="bg-[#FFFB7E] hover:bg-yellow-300 text-black font-medium px-4 py-2 rounded-xl flex items-center gap-2 text-sm shadow-sm transition">
              <span>Booking Online</span>
              <span>⏰</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION (TENTANG) ================= */}
      <section id="tentang" className="relative min-h-[600px] flex items-center justify-center bg-blue-100/50">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url('/hero-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#99C2FF]/40 mix-blend-multiply" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#002F74] mb-4">
              “Mulia Hatinya, Ramah Pelayanannya”
            </h2>
            <p className="text-slate-700 leading-relaxed text-base md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel sodales felis. In hac habitasse platea dictumst. Morbi pellentesque dapibus elit, nec luctus enim tincidunt a.
            </p>
          </div>
        </div>
      </section>

      {/* ================= JADWAL & LAYANAN ================= */}
      <section id="layanan" className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8">
          JADWAL PRAKTIK DOKTER
        </h2>

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button className="px-6 py-2 rounded-full bg-white shadow-md border border-slate-200 text-sm font-medium hover:bg-slate-50">Praktik Pagi</button>
          <button className="px-6 py-2 rounded-full bg-white shadow-md border border-slate-200 text-sm font-medium hover:bg-slate-50">Praktik Siang</button>
          <button className="px-6 py-2 rounded-full bg-white shadow-md border border-slate-200 text-sm font-medium hover:bg-slate-50">Layanan Penunjang</button>
          <button className="px-6 py-2 rounded-full bg-white shadow-md border border-slate-200 text-sm font-medium hover:bg-slate-50">Layanan UGD</button>
        </div>

        {/* Schedule Banner Placeholder */}
        <div className="w-full h-64 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-500 font-medium mb-16">
          [ Area Banner / Tabel Jadwal Praktik Dokter ]
        </div>

        {/* Cards Layanan Utama */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card UGD */}
          <div className="bg-[#99C2FF]/40 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition border border-blue-100">
            <div className="w-16 h-16 bg-[#002F74] text-white rounded-2xl flex items-center justify-center mb-4 text-2xl">
              🚑
            </div>
            <h3 className="text-xl font-bold text-[#002F74] mb-2">UGD</h3>
            <p className="text-sm text-[#002F74] mb-6 min-h-[48px]">
              Layanan UGD 24 Jam dengan dokter dan tim yang siaga melayani.
            </p>
            <button className="mt-auto px-6 py-2 bg-white text-slate-900 font-medium rounded-xl border border-white hover:bg-slate-50 transition">
              Hubungi
            </button>
          </div>

          {/* Card Poliklinik */}
          <div className="bg-[#99C2FF]/40 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition border border-blue-100">
            <div className="w-16 h-16 bg-[#002F74] text-white rounded-2xl flex items-center justify-center mb-4 text-2xl">
              🏥
            </div>
            <h3 className="text-xl font-bold text-[#002F74] mb-2">Poliklinik</h3>
            <p className="text-sm text-[#002F74] mb-6 min-h-[48px]">
              Layanan poliklinik untuk menjamin kesehatan pasien yang didampingi oleh dokter spesialis profesional.
            </p>
            <button className="mt-auto px-6 py-2 bg-white text-slate-900 font-medium rounded-xl border border-white hover:bg-slate-50 transition">
              Hubungi
            </button>
          </div>

          {/* Card Antar Jemput */}
          <div className="bg-[#99C2FF]/40 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition border border-blue-100">
            <div className="w-16 h-16 bg-[#002F74] text-white rounded-2xl flex items-center justify-center mb-4 text-2xl">
              🚐
            </div>
            <h3 className="text-xl font-bold text-[#002F74] mb-2">Layanan Antar Jemput</h3>
            <p className="text-sm text-[#002F74] mb-6 min-h-[48px]">
              Armada Bakti Mulia Untuk Lampung yang siap antar jemput pasien sekitar rumah sakit.
            </p>
            <button className="mt-auto px-6 py-2 bg-white text-slate-900 font-medium rounded-xl border border-white hover:bg-slate-50 transition">
              Hubungi
            </button>
          </div>
        </div>
      </section>

      {/* ================= BERITA SECTION ================= */}
      <section id="berita" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            BERITA RS. MITRA MULIA HUSADA
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl p-4 border border-[#455A64]/30 shadow-sm hover:shadow-md transition">
                <div className="h-48 bg-slate-300 rounded-xl mb-4 overflow-hidden">
                  <img src="/news-placeholder.jpg" alt="Berita" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-[#455A64]">Hari, Tanggal</span>
                <h3 className="text-lg font-semibold text-[#002F74] mt-1">
                  Judul/Nama Berita Terkait Layanan RS
                </h3>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <a href="#" className="inline-flex items-center gap-2 text-[#002F74] font-medium hover:underline">
              <span>Lihat berita selengkapnya</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= DOKTER SPESIALIS ================= */}
      <section id="dokter" className="py-16 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
          DOKTER SPESIALIS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[1, 2, 3, 4].map((doc) => (
            <div key={doc} className="h-72 bg-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <img src="/doctor-placeholder.jpg" alt="Dokter" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <button className="bg-[#99C2FF] hover:bg-blue-300 text-[#002F74] font-semibold px-8 py-3 rounded-xl inline-flex items-center gap-2 shadow-sm transition">
          <span>Semua Dokter</span>
          <span>👨‍⚕️</span>
        </button>
      </section>

      {/* ================= KONTAK SECTION ================= */}
      <section id="kontak" className="py-16 bg-blue-50/50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            KONTAK KAMI
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {/* UGD Phone */}
            <div className="bg-[#99C2FF]/30 p-4 rounded-xl text-center">
              <span className="block text-blue-600 font-bold mb-1">UGD</span>
              <span className="text-xs md:text-sm text-[#002F74]">0812-7171-7197</span>
            </div>
            {/* Address */}
            <div className="bg-[#99C2FF]/30 p-4 rounded-xl text-center">
              <span className="block text-blue-600 font-bold mb-1">Alamat</span>
              <span className="text-xs md:text-sm text-[#002F74]">Jl. Proklamator Raya No.162-164, Bandar Jaya Timur</span>
            </div>
            {/* Hours */}
            <div className="bg-[#99C2FF]/30 p-4 rounded-xl text-center">
              <span className="block text-blue-600 font-bold mb-1">Jam Kerja</span>
              <span className="text-xs md:text-sm text-[#002F74]">24 JAM</span>
            </div>
            {/* Email */}
            <div className="bg-[#99C2FF]/30 p-4 rounded-xl text-center">
              <span className="block text-blue-600 font-bold mb-1">Email</span>
              <span className="text-xs md:text-sm text-[#002F74] break-all">rsumitramuliahusada@yahoo.com</span>
            </div>
            {/* UGD Phone 2 */}
            <div className="bg-[#99C2FF]/30 p-4 rounded-xl text-center">
              <span className="block text-blue-600 font-bold mb-1">UGD Alt</span>
              <span className="text-xs md:text-sm text-[#002F74]">0877-9294-5777</span>
            </div>
          </div>

          {/* Map / RS Identity Footer */}
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">RS. MITRA MULIA HUSADA</h3>
              <p className="text-[#002F74] font-medium mt-1">Mitra Kesehatan Anda</p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4 mt-6 text-2xl text-[#002F74]">
                <a href="#" className="hover:opacity-80">💬</a>
                <a href="#" className="hover:opacity-80">📘</a>
                <a href="#" className="hover:opacity-80">🔴</a>
                <a href="#" className="hover:opacity-80">📷</a>
              </div>
            </div>

            {/* Google Map Box Placeholder */}
            <div className="h-56 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500">
              [ Peta Google Maps ]
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}