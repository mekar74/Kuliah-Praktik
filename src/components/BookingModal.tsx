import React, { useState } from 'react';
import { DOCTORS } from '../data/hospitalData';
import { Doctor, Ticket } from '../types';
import { sendBookingFormToWhatsApp } from '../utils/whatsapp';
import { X, Calendar, Clock, User, ShieldCheck, CheckCircle2, Printer, Download, Sparkles, ChevronRight, AlertCircle, MessageCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedDoctorId?: string | null;
  doctors?: Doctor[];
  onTicketCreated?: (ticket: Ticket) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedDoctorId,
  doctors = DOCTORS,
  onTicketCreated,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preSelectedDoctorId || (doctors[0] ? doctors[0].id : 'doc-1')
  );
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('09:00 - 10:00 WIB');
  const [patientName, setPatientName] = useState<string>('');
  const [nik, setNik] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [insurance, setInsurance] = useState<'BPJS' | 'Umum' | 'Asuransi Swasta'>('BPJS');
  const [notes, setNotes] = useState<string>('');
  
  const [ticket, setTicket] = useState<Ticket | null>(null);

  if (!isOpen) return null;

  const currentDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0] || DOCTORS[0];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!patientName || !phone) {
        alert('Mohon lengkapi Nama Pasien dan Nomor HP/WhatsApp.');
        return;
      }
      // Generate Queue Ticket
      const ticketNum = `MMH-${currentDoctor.category.slice(0, 2).toUpperCase()}-${Math.floor(
        100 + Math.random() * 900
      )}`;
      const newTicket: Ticket = {
        id: `t-${Date.now()}`,
        ticketNumber: ticketNum,
        doctorName: currentDoctor.name,
        specialty: currentDoctor.specialty,
        date: bookingDate,
        timeSlot: timeSlot,
        patientName,
        nik: nik || '-',
        phone: phone || '-',
        insuranceType: insurance,
        qrCodeValue: `TICKET:${ticketNum}:${patientName}:${bookingDate}`,
        createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        status: 'Menunggu',
      };
      setTicket(newTicket);
      if (onTicketCreated) {
        onTicketCreated(newTicket);
      }

      // Automatically open WhatsApp with booking details
      sendBookingFormToWhatsApp({
        patientName,
        phone,
        nik,
        doctorName: currentDoctor.name,
        specialty: currentDoctor.specialty,
        date: bookingDate,
        timeSlot: timeSlot,
        insuranceType: insurance,
        notes,
      });

      setStep(3);
    }
  };

  const resetForm = () => {
    setStep(1);
    setTicket(null);
    setPatientName('');
    setNik('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002F74] to-blue-900 text-white p-5 flex justify-between items-center relative">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-yellow-300 uppercase block">
              RS MITRA MULIA HUSADA
            </span>
            <h3 className="text-lg font-bold">Booking Online Antrean Poliklinik</h3>
          </div>
          <button
            onClick={resetForm}
            className="p-1 rounded-full text-blue-200 hover:text-white hover:bg-blue-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Progress Indicator */}
          {step < 3 && (
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100">
              <span className={step === 1 ? 'text-[#002F74] font-bold' : ''}>
                1. Dokter & Tanggal
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className={step === 2 ? 'text-[#002F74] font-bold' : ''}>
                2. Data Pasien
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span>3. Tiket Antrean</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              {/* Doctor Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Pilih Dokter Spesialis
                </label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Quick Preview Card */}
              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80 flex items-center gap-3">
                <img
                  src={currentDoctor.photo}
                  alt={currentDoctor.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <h4 className="font-bold text-[#002F74] text-sm">{currentDoctor.name}</h4>
                  <p className="text-blue-800 font-semibold">{currentDoctor.specialty}</p>
                  <p className="text-slate-500 mt-0.5">Jadwal: {currentDoctor.scheduleDays}</p>
                </div>
              </div>

              {/* Date Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Pilih Tanggal Berobat
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Pilih Jam Konsultasi
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['08:30 - 10:00 WIB', '10:00 - 12:00 WIB', '15:30 - 17:00 WIB', '17:00 - 19:00 WIB'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`p-2.5 rounded-xl border font-semibold text-center transition cursor-pointer ${
                        timeSlot === slot
                          ? 'bg-[#002F74] text-white border-[#002F74]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#FFFB7E] hover:bg-yellow-300 text-slate-900 font-bold py-3 rounded-xl shadow-md transition active:scale-95 cursor-pointer text-sm"
              >
                Lanjut ke Data Pasien ➔
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Lengkap Pasien *
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama sesuai KTP / KK..."
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nomor HP / WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  NIK / No. Rekam Medis (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="16 digit NIK..."
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Jenis Penjamin Pembayaran
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['BPJS', 'Umum', 'Asuransi Swasta'] as const).map((ins) => (
                    <button
                      type="button"
                      key={ins}
                      onClick={() => setInsurance(ins)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition cursor-pointer ${
                        insurance === ins
                          ? 'bg-[#002F74] text-white border-[#002F74]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {ins}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition text-sm cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#FFFB7E] hover:bg-yellow-300 text-slate-900 font-bold py-3 rounded-xl shadow-md transition active:scale-95 cursor-pointer text-sm"
                >
                  Konfirmasi & Ambil Tiket
                </button>
              </div>
            </form>
          )}

          {step === 3 && ticket && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h4 className="text-xl font-extrabold text-[#002F74]">Pendaftaran Berhasil!</h4>
              <p className="text-xs text-slate-600">
                Harap tunjukkan e-tiket ini kepada petugas admisi RS Mitra Mulia Husada saat tiba di lokasi.
              </p>

              {/* DIGITAL TICKET BADGE */}
              <div className="bg-gradient-to-br from-blue-900 via-[#002F74] to-blue-950 text-white p-6 rounded-3xl shadow-xl text-left border-2 border-yellow-300/40 relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-blue-700/60 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-yellow-300 tracking-wider uppercase block">
                      RS MITRA MULIA HUSADA
                    </span>
                    <span className="text-xs text-blue-200">E-Tiket Antrean Poliklinik</span>
                  </div>
                  <span className="bg-yellow-300 text-slate-900 text-xs font-black px-2.5 py-1 rounded-md">
                    {ticket.insuranceType}
                  </span>
                </div>

                <div className="text-center py-2 bg-blue-950/60 rounded-2xl border border-blue-700/50 mb-4">
                  <span className="text-[11px] text-blue-200 uppercase tracking-widest block font-medium">
                    Nomor Antrean Anda
                  </span>
                  <span className="text-3xl font-black text-yellow-300 font-mono tracking-wider">
                    {ticket.ticketNumber}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-blue-100">
                  <p><strong>Nama Pasien:</strong> {ticket.patientName}</p>
                  <p><strong>Dokter Tujuan:</strong> {ticket.doctorName}</p>
                  <p><strong>Spesialisasi:</strong> {ticket.specialty}</p>
                  <p><strong>Tanggal & Jam:</strong> {ticket.date} ({ticket.timeSlot})</p>
                </div>

                {/* Simulated QR Code box */}
                <div className="mt-4 pt-3 border-t border-blue-700/60 flex items-center justify-between">
                  <div className="bg-white p-2 rounded-lg inline-block">
                    <div className="w-12 h-12 bg-slate-900 rounded-xs flex items-center justify-center text-[9px] text-white font-mono leading-none p-1 text-center">
                      QR CODE VALID
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-blue-300">
                    <div>Waktu Cetak: {ticket.createdAt}</div>
                    <div className="text-yellow-300">Status: Terkonfirmasi</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() =>
                    sendBookingFormToWhatsApp({
                      patientName: ticket.patientName,
                      phone:  ticket.phone || '',
                      nik: ticket.nik,
                      doctorName: ticket.doctorName,
                      specialty: ticket.specialty,
                      date: ticket.date,
                      timeSlot: ticket.timeSlot,
                      insuranceType: ticket.insuranceType,
                    })
                  }
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Konfirmasi di WhatsApp</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak</span>
                </button>

                <button
                  onClick={resetForm}
                  className="bg-[#002F74] hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
