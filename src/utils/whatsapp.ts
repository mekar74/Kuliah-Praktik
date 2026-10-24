/**
 * Helper utility for directing online booking / registration to WhatsApp
 * RS Mitra Mulia Husada Bandar Jaya
 */

export function openWhatsAppBooking(doctorName?: string, specialty?: string) {
  const waNumber = '6281271717197'; // 0812-7171-7197
  let text = '';

  if (doctorName) {
    text = `Halo Admin RS Mitra Mulia Husada,

Saya ingin melakukan *Booking Online / Pendaftaran Berobat* untuk:
- *Dokter Tujuan*: ${doctorName}${specialty ? ` (${specialty})` : ''}
- *Lokasi*: RS Mitra Mulia Husada Bandar Jaya Timur

Mohon informasi jadwal & konfirmasi kuota antrean. Terima kasih!`;
  } else {
    text = `Halo Admin RS Mitra Mulia Husada,

Saya ingin melakukan *Booking Online / Pendaftaran Berobat* di RS Mitra Mulia Husada Bandar Jaya.

Mohon informasi pendaftaran dan ketersediaan kuota antrean dokter. Terima kasih!`;
  }

  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function sendBookingFormToWhatsApp(data: {
  patientName: string;
  phone: string;
  nik?: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  insuranceType: string;
  notes?: string;
}) {
  const waNumber = '6281271717197';
  const text = `Halo Admin RS Mitra Mulia Husada,

Saya telah mengisi formulir *Booking / Pendaftaran Online* dengan rincian berikut:

👤 *DATA PASIEN*
- *Nama Pasien*: ${data.patientName} 
- *No. HP / WA*: ${data.phone}
- *NIK / No. RM*: ${data.nik || '-'}
- *Penjamin*: ${data.insuranceType}

🩺 *DOKTER & JADWAL*
- *Dokter Tujuan*: ${data.doctorName} (${data.specialty})
- *Rencana Tanggal*: ${data.date}
- *Jam Konsultasi*: ${data.timeSlot}
${data.notes ? `- *Catatan*: ${data.notes}\n` : ''}
Mohon bantuan untuk konfirmasi pendaftaran & nomor antrean saya. Terima kasih!`;

  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
