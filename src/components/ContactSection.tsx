import React, { useState } from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { MapPin, Clock, Mail, Navigation, Check, ExternalLink, Compass, Car, AlertCircle } from 'lucide-react';

export const ContactMapSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [locatingStatus, setLocatingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Haversine formula to compute distance in km
  const calculateHaversineKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  };

  const handleAutomaticNavigation = () => {
    setLocatingStatus('loading');
    setErrorMessage('');

    if (!navigator.geolocation) {
      setLocatingStatus('error');
      setErrorMessage('Browser Anda tidak mendukung layanan Geolocation GPS.');
      openFallbackGoogleMaps();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        setUserCoords({ lat: uLat, lng: uLng });
        
        const dist = calculateHaversineKm(
          uLat,
          uLng,
          HOSPITAL_INFO.coordinates.lat,
          HOSPITAL_INFO.coordinates.lng
        );
        setCalculatedDistance(dist);
        setLocatingStatus('success');

        // Automatically open Google Maps Turn-by-Turn Navigation with user origin to RS MMH
        const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&origin=${uLat},${uLng}&destination=${HOSPITAL_INFO.coordinates.lat},${HOSPITAL_INFO.coordinates.lng}&destination_place_id=RS+Mitra+Mulia+Husada`;
        window.open(mapsDirUrl, '_blank');
      },
      (err) => {
        setLocatingStatus('error');
        setErrorMessage('Izin lokasi ditolak atau tidak terdeteksi. Membuka Google Maps standar...');
        openFallbackGoogleMaps();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const openFallbackGoogleMaps = () => {
    const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      'RS Mitra Mulia Husada Bandar Jaya Timur'
    )}`;
    window.open(fallbackUrl, '_blank');
  };

  return (
    <section id="kontak" className="py-16 bg-blue-50/50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 text-xs font-bold px-3.5 py-1 rounded-full mb-2 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Lokasi & Kontak Rumah Sakit</span>  
          </div>  
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            KONTAK KAMI & NAVIGASI LOKASI
          </h2>
          <p className="text-slate-600 text-sm mt-2.5 leading-relaxed">
            Informasi alamat resmi, layanan gawat darurat 24 jam, dan fitur navigasi otomatis ke rumah sakit.
          </p>
        </div>

        {/* Contact Grid Header Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {/* UGD Phone 1 */}
          <div 
            onClick={() => copyToClipboard(HOSPITAL_INFO.phoneUGD1, 'UGD1')}
            className="bg-[#99C2FF]/30 hover:bg-[#99C2FF]/50 p-4 rounded-xl text-center border border-blue-200/50 transition cursor-pointer relative group"
          >
            <span className="block text-blue-700 font-bold mb-1 text-xs md:text-sm">UGD Utama</span>
            <span className="text-xs md:text-sm text-[#002F74] font-bold block">{HOSPITAL_INFO.phoneUGD1}</span>
            <span className="text-[10px] text-blue-600 opacity-80 group-hover:opacity-100 mt-1 block">
              {copiedField === 'UGD1' ? '✓ Tersalin' : 'Klik Salin'}
            </span>
          </div>

          {/* Address */}
          <div 
            onClick={() => copyToClipboard(HOSPITAL_INFO.address, 'Alamat')}
            className="bg-[#99C2FF]/30 hover:bg-[#99C2FF]/50 p-4 rounded-xl text-center border border-blue-200/50 transition cursor-pointer group"
          >
            <span className="block text-blue-700 font-bold mb-1 text-xs md:text-sm">Alamat</span>
            <span className="text-xs md:text-sm text-[#002F74] font-medium line-clamp-2">
              Jl. Proklamator Raya No.162-164
            </span>
            <span className="text-[10px] text-blue-600 opacity-80 group-hover:opacity-100 mt-1 block">
              {copiedField === 'Alamat' ? '✓ Tersalin' : 'Bandar Jaya Timur'}
            </span>
          </div>

          {/* Hours */}
          <div className="bg-[#99C2FF]/30 p-4 rounded-xl text-center border border-blue-200/50">
            <span className="block text-blue-700 font-bold mb-1 text-xs md:text-sm">Jam Kerja</span>
            <span className="text-xs md:text-sm text-[#002F74] font-extrabold bg-blue-100 px-2 py-0.5 rounded-md inline-block">
              24 JAM
            </span>
            <span className="text-[10px] text-slate-600 mt-1 block">UGD & Inap Nonstop</span>
          </div>

          {/* Email */}
          <div 
            onClick={() => copyToClipboard(HOSPITAL_INFO.email, 'Email')}
            className="bg-[#99C2FF]/30 hover:bg-[#99C2FF]/50 p-4 rounded-xl text-center border border-blue-200/50 transition cursor-pointer group"
          >
            <span className="block text-blue-700 font-bold mb-1 text-xs md:text-sm">Email</span>
            <span className="text-[11px] md:text-xs text-[#002F74] break-all font-mono font-medium">
              {HOSPITAL_INFO.email}
            </span>
            <span className="text-[10px] text-blue-600 opacity-80 group-hover:opacity-100 mt-1 block">
              {copiedField === 'Email' ? '✓ Tersalin' : 'Klik Salin'}
            </span>
          </div>

          {/* UGD Phone 2 */}
          <div 
            onClick={() => copyToClipboard(HOSPITAL_INFO.phoneUGD2, 'UGD2')}
            className="bg-[#99C2FF]/30 hover:bg-[#99C2FF]/50 p-4 rounded-xl text-center border border-blue-200/50 transition cursor-pointer group"
          >
            <span className="block text-blue-700 font-bold mb-1 text-xs md:text-sm">UGD Alt</span>
            <span className="text-xs md:text-sm text-[#002F74] font-bold block">{HOSPITAL_INFO.phoneUGD2}</span>
            <span className="text-[10px] text-blue-600 opacity-80 group-hover:opacity-100 mt-1 block">
              {copiedField === 'UGD2' ? '✓ Tersalin' : 'Klik Salin'}
            </span>
          </div>
        </div>

        {/* Map / RS Identity Footer & FITUR NAVIGASI OTOMATIS */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-200">
          
          {/* Left Column: Hospital Identity & Automatic GPS Navigation Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
                RS. MITRA MULIA HUSADA
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Mitra Kesehatan Anda
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Terletak strategis di pusat kota Bandar Jaya Timur, Jalan Proklamator Raya No. 162-164, Lampung Tengah.
              </p>
            </div>

            {/* AUTOMATIC NAVIGATION FEATURE CARD */}
            <div className="bg-gradient-to-br from-[#002F74] to-blue-900 text-white p-5 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b border-blue-700/60 pb-3">
                <Compass className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
                <h4 className="font-bold text-sm sm:text-base text-yellow-300">
                  Fitur Navigasi Otomatis Lokasi
                </h4>
              </div>

              <p className="text-xs text-blue-100 leading-relaxed">
                Klik tombol di bawah untuk mendeteksi posisi GPS Anda secara langsung dan membuka rute petunjuk arah Google Maps terdekat ke RS Mitra Mulia Husada.
              </p>

              {locatingStatus === 'loading' && (
                <div className="bg-blue-950/60 p-3 rounded-xl flex items-center gap-3 text-xs text-yellow-300 animate-pulse">
                  <Navigation className="w-4 h-4 animate-spin" />
                  <span>Mendeteksi koordinat GPS posisi Anda...</span>
                </div>
              )}

              {locatingStatus === 'success' && userCoords && (
                <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-xl text-xs space-y-1 text-emerald-200">
                  <div className="font-bold flex items-center gap-1 text-emerald-300">
                    <Check className="w-4 h-4" />
                    <span>Lokasi Anda Berhasil Terdeteksi!</span>
                  </div>
                  <div>Jarak Est. dari Posisi Anda: <strong>~{calculatedDistance} km</strong></div>
                  <div className="text-[11px] text-emerald-400">Google Maps rute otomatis sedang dibuka...</div>
                </div>
              )}

              {errorMessage && (
                <div className="bg-amber-950/80 border border-amber-500/40 p-3 rounded-xl text-xs text-amber-200">
                  <div className="font-semibold flex items-center gap-1 text-amber-300 mb-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Perhatian</span>
                  </div>
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                onClick={handleAutomaticNavigation}
                disabled={locatingStatus === 'loading'}
                className="w-full bg-[#FFFB7E] hover:bg-yellow-300 text-slate-900 font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigasi Otomatis Dari Lokasi Saya</span>
              </button>

              <div className="flex justify-between items-center text-[11px] text-blue-200 pt-1">
                <span>Atau buka manual di Google Maps:</span>
                <button 
                  onClick={openFallbackGoogleMaps}
                  className="text-yellow-300 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Buka Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Social Media Icons */}
            <div>
              <span className="block text-xs font-semibold text-slate-500 mb-2">Media Sosial Resmi:</span>
              <div className="flex gap-4 text-2xl text-[#002F74]">
                <a href={HOSPITAL_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="WhatsApp">💬</a>
                <a href={HOSPITAL_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Facebook">📘</a>
                <a href={HOSPITAL_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="YouTube">🔴</a>
                <a href={HOSPITAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Instagram">📷</a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Box */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="w-full h-80 lg:h-full min-h-[340px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative group">
              {/* Embedded Interactive OpenStreetMap / Google Map iframe centered on Bandar Jaya Timur */}
              <iframe
                title="Peta Lokasi RS Mitra Mulia Husada Bandar Jaya Timur"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=-4.708816,105.216346&hl=id&z=16&output=embed"
                className="w-full h-full object-cover"
              />
              
              {/* Map Floating Badge overlay */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600 fill-red-600 animate-bounce" />
                <div>
                  <span className="block text-xs font-bold text-slate-900">RS Mitra Mulia Husada</span>
                  <span className="text-[10px] text-slate-500">Bandar Jaya Timur, Lampung Tengah</span>
                </div>
              </div>

              <div className="absolute bottom-3 right-3">
                <button
                  onClick={handleAutomaticNavigation}
                  className="bg-[#002F74] hover:bg-blue-900 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Car className="w-4 h-4 text-yellow-300" />
                  <span>Petunjuk Arah Rute</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
