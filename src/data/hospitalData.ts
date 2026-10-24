import { Doctor, DoctorSchedule, NewsItem, Ticket } from '../types';

export interface DoctorScheduleTimeEntry {
  day: string;
  time: string;
}

export interface DoctorSchedulePoliGroup {
  doctorName: string;
  schedules: DoctorScheduleTimeEntry[];
}

export interface PoliScheduleCategory {
  poliName: string;
  column: 1 | 2;
  doctors: DoctorSchedulePoliGroup[];
}

export interface CareerItem {
  id: string;
  title: string;
  poster: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline: string;
  isActive: boolean;
}

export const OFFICIAL_POLI_SCHEDULES: PoliScheduleCategory[] = [
  // COLUMN 1
  {
    poliName: 'Poli Mata',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. Agus Nugroho, Sp.M',
        schedules: [
          { day: 'Kamis', time: 'Pukul 14.00 s/d Selesai' },
          { day: "Jum'at", time: 'Pukul 10.00 s/d Selesai' }
        ]
      },
      {
        doctorName: 'dr. Putri Dwi Kartini, Sp.M',
        schedules: [
          { day: 'Selasa', time: 'Pukul 09.00 s/d 12.00' },
          { day: 'Rabu', time: 'Pukul 09.00 s/d 12.00 & Pukul 14.00 s/d 16.00' }
        ]
      },
      {
        doctorName: 'dr. Maria Ulfa, Sp.M',
        schedules: [
          { day: 'Senin & Selasa', time: 'Pukul 14.00 s/d 17.00' },
          { day: 'Sabtu', time: 'Pukul 09.00 s/d 11.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Kebidanan',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. M. Rudi Setiawan, Sp.OG',
        schedules: [
          { day: "Senin, Rabu, Kamis & Jum'at", time: 'Pukul 10.00 s/d 16.00' },
          { day: 'Selasa', time: 'Pukul 10.00 s/d 13.30' },
          { day: 'Sabtu', time: 'Pukul 10.00 s/d 12.00' }
        ]
      },
      {
        doctorName: 'dr. Agung Widyalaksono, Sp.OG',
        schedules: [
          { day: 'Selasa, Kamis & Sabtu', time: 'Pukul 15.00 s/d 17.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Jantung',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. Rekha Nova Iyos, Sp.JP',
        schedules: [
          { day: 'Sabtu', time: 'Pukul 08.00 s/d 12.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Bedah',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. Ronald Gestano Winarji, Sp.B.FINACS, MH',
        schedules: [
          { day: "Senin, Selasa, Rabu, Jum'at", time: 'Pukul 17.00 s/d 19.00' }
        ]
      },
      {
        doctorName: 'dr. Teddy Agung Saputra, Sp.B',
        schedules: [
          { day: 'Senin s/d Kamis', time: 'Pukul 09.00 s/d 12.00 & Pukul 13.00 s/d 16.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Bedah Saraf',
    column: 1,
    doctors: [
      {
        doctorName: 'Dr. dr. Saleh Al Mochdar, Sp. BS',
        schedules: [
          { day: 'Senin', time: 'Pukul 13.00 s/d 15.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Urologi',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. M. Iqbal Tafwid, Sp.U',
        schedules: [
          { day: 'Selasa, Kamis & Sabtu', time: 'Pukul 15.00 s/d 17.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Onkologi',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. Doni Kurniawan, Sp.B.Subsp.Onk(K)',
        schedules: [
          { day: 'Selasa & Kamis', time: 'Pukul 15.00 s/d 17.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Kedokteran Jiwa',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. Siti Sulaimah, Sp.KJ',
        schedules: [
          { day: 'Senin', time: 'Pukul 14.00 s/d 17.00' },
          { day: 'Selasa & Rabu', time: 'Pukul 07.30 s/d 08.30 & Pukul 14.00 s/d 17.00' },
          { day: "Kamis & Jum'at", time: 'Pukul 07.30 s/d 08.30' },
          { day: 'Sabtu', time: 'Pukul 07.30 s/d 09.30' }
        ]
      },
      {
        doctorName: 'dr. Alfia Rifanti, Sp.KJ',
        schedules: [
          { day: 'Kamis s/d Sabtu', time: 'Pukul 15.00 s/d 17.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Rehab Medik',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. Feby Deliana, Sp.KFR',
        schedules: [
          { day: 'Senin', time: 'Pukul 13.00 s/d 14.30' },
          { day: 'Selasa', time: 'Pukul 08.00 s/d 14.30' },
          { day: "Rabu & Jum'at", time: 'Pukul 07.00 s/d 08.30' },
          { day: 'Kamis', time: 'Pukul 13.00 s/d 16.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Paru',
    column: 1,
    doctors: [
      {
        doctorName: 'dr. Gigih Setiawan, Sp.P',
        schedules: [
          { day: "Senin, Rabu & Jum'at", time: 'Pukul 15.00 s/d 17.00' }
        ]
      },
      {
        doctorName: 'dr. Laisa Azka, Sp.P',
        schedules: [
          { day: 'Selasa & Kamis', time: 'Pukul 13.00 s/d 15.00' },
          { day: 'Sabtu', time: 'Pukul 08.00 s/d 11.00' }
        ]
      }
    ]
  },

  // COLUMN 2
  {
    poliName: 'Poli Penyakit Dalam',
    column: 2,
    doctors: [
      {
        doctorName: 'dr. Cecep, S.I, Sp.PD.FINASIM',
        schedules: [
          { day: "Senin s/d Jum'at", time: 'Pukul 10.00 s/d Selesai' }
        ]
      },
      {
        doctorName: 'dr. Falentina Migit, Sp.PD',
        schedules: [
          { day: 'Senin', time: 'Pukul 13.00 s/d 15.00' },
          { day: 'Selasa, Rabu, Kamis', time: 'Pukul 13.00 s/d 16.00' }
        ]
      },
      {
        doctorName: 'dr. Janette Andriani, Sp.PD',
        schedules: [
          { day: "Senin s/d Jum'at", time: 'Pukul 10.00 s/d 12.00' },
          { day: 'Sabtu', time: 'Pukul 10.00 s/d 11.00' }
        ]
      },
      {
        doctorName: 'dr. Fira Tania Khasanah, Sp.PD',
        schedules: [
          { day: "Senin, Rabu, Jum'at", time: 'Pukul 15.00 s/d 17.00' },
          { day: 'Selasa & Kamis', time: 'Pukul 13.00 s/d 15.00 & Pukul 15.00 s/d 17.00' },
          { day: 'Minggu', time: 'Pukul 08.00 s/d 09.00' }
        ]
      },
      {
        doctorName: 'dr. Slamet Riyadi Mulyono, Sp.PD',
        schedules: [
          { day: 'Senin, Selasa, Kamis', time: 'Pukul 07.30 s/d 09.00' },
          { day: "Jum'at", time: 'Pukul 17.30 s/d 19.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli THT - KL',
    column: 2,
    doctors: [
      {
        doctorName: 'dr. Dwi Meita Ferosia, Sp.THT-KL',
        schedules: [
          { day: 'Senin', time: 'Pukul 14.30 s/d 17.30' },
          { day: 'Selasa & Rabu', time: 'Pukul 14.30 s/d 16.30' },
          { day: "Kamis, Jum'at & Sabtu", time: 'Pukul 09.00 s/d 12.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Saraf',
    column: 2,
    doctors: [
      {
        doctorName: 'dr. Sartika Rizky Hapsari, Sp.N',
        schedules: [
          { day: 'Senin, Selasa & Kamis', time: 'Pukul 09.00 s/d 12.00' }
        ]
      },
      {
        doctorName: 'dr. Wulandari, Sp.N, DFIDN',
        schedules: [
          { day: "Senin s/d Jum'at", time: 'Pukul 15.30 s/d Selesai' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Anak',
    column: 2,
    doctors: [
      {
        doctorName: 'dr. Ayu Diah P Paramita, Sp.A',
        schedules: [
          { day: 'Senin, Rabu, Kamis & Sabtu', time: 'Pukul 09.00 s/d 11.00' },
          { day: "Selasa & Jum'at", time: 'Pukul 10.30 s/d 12.30' }
        ]
      },
      {
        doctorName: 'dr. Indah Sari, Sp.A',
        schedules: [
          { day: 'Senin & Kamis', time: 'Pukul 14.00 s/d 16.00' },
          { day: "Selasa, Rabu & Jum'at", time: 'Pukul 16.00 s/d 18.00' },
          { day: 'Sabtu', time: 'Pukul 09.00 s/d 10.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Kulit & Kelamin',
    column: 2,
    doctors: [
      {
        doctorName: 'dr. Kiki Septiafni, Sp.DVE',
        schedules: [
          { day: 'Selasa & Kamis', time: 'Pukul 14.00 s/d 17.00' },
          { day: "Jum'at", time: 'Pukul 08.00 s/d 10.00' }
        ]
      },
      {
        doctorName: 'dr. Yulia Asmarani, Sp.DVE',
        schedules: [
          { day: 'Senin & Rabu', time: 'Pukul 14.00 s/d 17.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Radiologi',
    column: 2,
    doctors: [
      {
        doctorName: 'dr. Nola Tiorisman, Sp.Rad',
        schedules: [
          { day: 'Rabu & Kamis', time: 'Pukul 09.00 s/d Selesai' }
        ]
      },
      {
        doctorName: 'dr. Solihin, Sp.Rad',
        schedules: [
          { day: 'Senin s/d Rabu', time: 'Pukul 14.00 s/d 18.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Ortopedi',
    column: 2,
    doctors: [
      {
        doctorName: 'dr. Anggrian, Sp.OT',
        schedules: [
          { day: "Selasa & Jum'at", time: 'Pukul 15.00 s/d 18.00' },
          { day: 'Kamis', time: 'Pukul 09.00 s/d 12.00' }
        ]
      }
    ]
  },
  {
    poliName: 'Poli Gigi',
    column: 2,
    doctors: [
      {
        doctorName: 'Drg. Lovea Nabilla',
        schedules: [
          { day: "Selasa & Jum'at", time: 'Pukul 09.00 s/d 12.00' }
        ]
      },
      {
        doctorName: 'Drg. Ekarista Lussiana Ferdinandus, Sp.KG',
        schedules: [
          { day: 'Senin s/d Rabu', time: 'Pukul 15.00 s/d 18.00' }
        ]
      }
    ]
  }
];

export const HOSPITAL_INFO = {
  name: 'RUMAH SAKIT MITRA MULIA HUSADA',
  shortName: 'RS MMH',
  tagline: 'Mulia Hatinya, Ramah Pelayanannya',
  address: 'Jl. Proklamator Raya No.162-164, Bandar Jaya Timur, Kec. Terbanggi Besar, Kab. Lampung Tengah, Lampung 34163',
  coordinates: {
    lat: -4.708816,
    lng: 105.216346,
  },
  phoneUGD1: '0812-7171-7197',
  phoneUGD2: '0877-9294-5777',
  phoneCallCenter: '0725-528282',
  email: 'rsumitramuliahusada@yahoo.com',
  workingHours: '24 JAM (UGD & Rawat Inap)',
  poliklinikHours: 'Senin - Sabtu: 07.30 - 20.00 WIB',
  googleMapsUrl: 'https://maps.google.com/?q=Rumah+Sakit+Mitra+Mulia+Husada+Bandar+Jaya',
  socials: {
    whatsapp: 'https://wa.me/6281271717197',
    facebook: 'https://facebook.com/rsmitramuliahusada',
    instagram: 'https://instagram.com/rsmitramuliahusada',
    youtube: 'https://youtube.com/@rsmitramuliahusada',
  }
};

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'dr. H. Ahmad Wijaya, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam',
    category: 'Penyakit Dalam',
    photo: '/fotoDokter.jpg',
    sip: '449/SIP.D/DS/LT/2023',
    experience: '12+ Tahun',
    scheduleDays: 'Senin - Jumat',
    morningShift: '08:00 - 12:00 WIB',
    afternoonShift: '16:00 - 19:00 WIB',
    status: 'Pagi',
    availableToday: true,
    education: 'Universitas Indonesia (Spesialis Penyakit Dalam)',
  },
  {
    id: 'doc-2',
    name: 'dr. Siti Rahmawati, Sp.A',
    specialty: 'Spesialis Anak',
    category: 'Anak',
    photo: '/fotoDokter.jpg',
    sip: '449/SIP.A/DS/LT/2024',
    experience: '9+ Tahun',
    scheduleDays: 'Senin - Sabtu',
    morningShift: '09:00 - 13:00 WIB',
    afternoonShift: '15:00 - 18:00 WIB',
    status: 'Pagi',
    availableToday: true,
    education: 'Universitas Gadjah Mada (Spesialis Anak)',
  },
  {
    id: 'doc-3',
    name: 'dr. Budi Santoso, Sp.OG',
    specialty: 'Spesialis Kebidanan & Kandungan',
    category: 'Kebidanan',
    photo: '/fotoDokter.jpg',
    sip: '449/SIP.OG/DS/LT/2022',
    experience: '15+ Tahun',
    scheduleDays: 'Senin, Rabu, Jumat',
    morningShift: '08:30 - 12:30 WIB',
    afternoonShift: '16:30 - 20:00 WIB',
    status: 'Siang',
    availableToday: true,
    education: 'Universitas Padjadjaran (Spesialis Obgyn)',
  },
  {
    id: 'doc-4',
    name: 'dr. Hendra Pratama, Sp.B',
    specialty: 'Spesialis Bedah Umum',
    category: 'Bedah',
    photo: '/fotoDokter.jpg',
    sip: '449/SIP.B/DS/LT/2023',
    experience: '11+ Tahun',
    scheduleDays: 'Selasa, Kamis, Sabtu',
    morningShift: '08:00 - 12:00 WIB',
    afternoonShift: '14:00 - 17:00 WIB',
    status: 'Pagi',
    availableToday: false,
    education: 'Universitas Lampung (Spesialis Bedah)',
  },
  {
    id: 'doc-5',
    name: 'dr. Dewi Lestari, Sp.N',
    specialty: 'Spesialis Neurologi / Syaraf',
    category: 'Syaraf',
    photo: '/fotoDokter.jpg',
    sip: '449/SIP.N/DS/LT/2024',
    experience: '8+ Tahun',
    scheduleDays: 'Senin - Kamis',
    morningShift: '10:00 - 13:00 WIB',
    afternoonShift: '16:00 - 18:30 WIB',
    status: 'Siang',
    availableToday: true,
    education: 'Universitas Airlangga (Spesialis Syaraf)',
  },
  {
    id: 'doc-6',
    name: 'drg. Rizky Kurniawan, Sp.KG',
    specialty: 'Spesialis Konservasi Gigi',
    category: 'Gigi',
    photo: '/fotoDokter.jpg',
    sip: '449/SIP.G/DS/LT/2023',
    experience: '7+ Tahun',
    scheduleDays: 'Senin - Sabtu',
    morningShift: '09:00 - 12:00 WIB',
    afternoonShift: '15:00 - 19:00 WIB',
    status: 'Layanan Penunjang',
    availableToday: true,
    education: 'Universitas Indonesia (Kedokteran Gigi)',
  },
  {
    id: 'doc-7',
    name: 'dr. Maya Indah, Sp.M',
    specialty: 'Spesialis Mata',
    category: 'Mata',
    photo: '/fotoDokter.jpg',
    sip: '449/SIP.M/DS/LT/2024',
    experience: '10+ Tahun',
    scheduleDays: 'Selasa, Jumat',
    morningShift: '08:00 - 11:30 WIB',
    afternoonShift: '14:00 - 16:30 WIB',
    status: 'Pagi',
    availableToday: false,
    education: 'Universitas Diponegoro (Spesialis Mata)',
  },
  {
    id: 'doc-8',
    name: 'dr. Eko Prasetyo, Sp.THT-KL',
    specialty: 'Spesialis THT-KL',
    category: 'THT',
    photo: '/fotoDokter.jpg',
    sip: '449/SIP.THT/DS/LT/2023',
    experience: '9+ Tahun',
    scheduleDays: 'Rabu & Sabtu',
    morningShift: '09:00 - 12:30 WIB',
    afternoonShift: '15:30 - 18:00 WIB',
    status: 'Siang',
    availableToday: true,
    education: 'Universitas Sriwijaya (Spesialis THT)',
  }
];

export const SCHEDULES: DoctorSchedule[] = [
  {
    id: 'sch-1',
    doctorId: 'doc-1',
    doctorName: 'dr. H. Ahmad Wijaya, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam',
    day: 'Senin - Jumat',
    morningHours: '08.00 - 12.00 WIB',
    afternoonHours: '16.00 - 19.00 WIB',
    room: 'Poliklinik Penyakit Dalam (Lantai 1)',
    category: 'Praktik Pagi',
    status: 'Tersedia'
  },
  {
    id: 'sch-2',
    doctorId: 'doc-2',
    doctorName: 'dr. Siti Rahmawati, Sp.A',
    specialty: 'Spesialis Anak',
    day: 'Senin - Sabtu',
    morningHours: '09.00 - 13.00 WIB',
    afternoonHours: '15.00 - 18.00 WIB',
    room: 'Poliklinik Anak (Lantai 1)',
    category: 'Praktik Pagi',
    status: 'Sedang Berlangsung'
  },
  {
    id: 'sch-3',
    doctorId: 'doc-3',
    doctorName: 'dr. Budi Santoso, Sp.OG',
    specialty: 'Spesialis Kebidanan & Kandungan',
    day: 'Senin, Rabu, Jumat',
    morningHours: '08.30 - 12.30 WIB',
    afternoonHours: '16.30 - 20.00 WIB',
    room: 'Poliklinik Kebidanan & Kandungan',
    category: 'Praktik Siang',
    status: 'Tersedia'
  },
  {
    id: 'sch-4',
    doctorId: 'doc-4',
    doctorName: 'dr. Hendra Pratama, Sp.B',
    specialty: 'Spesialis Bedah Umum',
    day: 'Selasa, Kamis, Sabtu',
    morningHours: '08.00 - 12.00 WIB',
    afternoonHours: '14.00 - 17.00 WIB',
    room: 'Poliklinik Bedah (Lantai 2)',
    category: 'Praktik Pagi',
    status: 'Tersedia'
  },
  {
    id: 'sch-5',
    doctorId: 'doc-5',
    doctorName: 'dr. Dewi Lestari, Sp.N',
    specialty: 'Spesialis Neurologi / Syaraf',
    day: 'Senin - Kamis',
    morningHours: '10.00 - 13.00 WIB',
    afternoonHours: '16.00 - 18.30 WIB',
    room: 'Poliklinik Syaraf (Lantai 2)',
    category: 'Praktik Siang',
    status: 'Tersedia'
  },
  {
    id: 'sch-6',
    doctorId: 'doc-6',
    doctorName: 'drg. Rizky Kurniawan, Sp.KG',
    specialty: 'Spesialis Konservasi Gigi',
    day: 'Senin - Sabtu',
    morningHours: '09.00 - 12.00 WIB',
    afternoonHours: '15.00 - 19.00 WIB',
    room: 'Poli Gigi & Mulut',
    category: 'Layanan Penunjang',
    status: 'Tersedia'
  },
  {
    id: 'sch-7',
    doctorId: 'doc-7',
    doctorName: 'dr. Maya Indah, Sp.M',
    specialty: 'Spesialis Mata',
    day: 'Selasa & Jumat',
    morningHours: '08.00 - 11.30 WIB',
    afternoonHours: '14.00 - 16.30 WIB',
    room: 'Poli Mata (Lantai 2)',
    category: 'Praktik Pagi',
    status: 'Tersedia'
  },
  {
    id: 'sch-8',
    doctorId: 'doc-8',
    doctorName: 'dr. Eko Prasetyo, Sp.THT-KL',
    specialty: 'Spesialis THT-KL',
    day: 'Rabu & Sabtu',
    morningHours: '09.00 - 12.30 WIB',
    afternoonHours: '15.30 - 18.00 WIB',
    room: 'Poli THT (Lantai 2)',
    category: 'Praktik Siang',
    status: 'Tersedia'
  },
  {
    id: 'sch-9',
    doctorId: 'ugd-team',
    doctorName: 'Tim Dokter Jaga UGD 24 Jam',
    specialty: 'Dokter Umum & Gawat Darurat',
    day: 'Setiap Hari (Senin - Minggu)',
    morningHours: '24 Jam Nonstop (Shift Pagi, Siang, Malam)',
    room: 'Gedung UGD Utama',
    category: 'Layanan UGD',
    status: 'Sedang Berlangsung'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Peningkatan Fasilitas Layanan USG 4D & Laboratorium Otomatis di RS MMH',
    category: 'Fasilitas Baru',
    date: 'Kamis, 24 Juli 2026',
    image: '/FasilitasUSG.jpg',
    summary: 'RS Mitra Mulia Husada kini menghadirkan peralatan USG 4D generasi terbaru untuk pemeriksaan kehamilan yang lebih akurat dan nyaman.',
    content: `Dalam rangka mewujudkan pelayanan kesehatan terbaik dan modern bagi masyarakat Lampung Tengah dan sekitarnya, RS Mitra Mulia Husada Bandar Jaya resmi menambah jajaran fasilitas medis terkini.

    Fasilitas baru ini meliputi perangkat USG 4D High-Definition di Poliklinik Kebidanan dan Kandungan, serta sistem analizer laboratorium klinis otomatis yang mempercepat hasil tes darah hingga 50% lebih cepat dari sebelumnya.
    
    Direktur RS Mitra Mulia Husada menyampaikan bahwa modernisasi peralatan ini merupakan wujud komitmen sesuai moto rumah sakit: 'Mulia Hatinya, Ramah Pelayanannya'. Masyarakat dapat melakukan pendaftaran via online atau langsung ke lokasi.`,
    author: 'Humas RS MMH'
  },
  {
    id: 'news-2',
    title: 'Edukasi Kesehatan: Pencegahan Penyakit Musim Hujan & Demam Berdarah',
    category: 'Tips Kesehatan',
    date: 'Selasa, 15 Juli 2026',
    image: '/Edukasi.jpg',
    summary: 'Tim Spesialis Penyakit Dalam RS MMH membagikan langkah efektif mencegah penyebaran nyamuk Aedes aegypti di lingkungan keluarga.',
    content: `Perubahan cuaca dan intensitas hujan yang tinggi kerap memicu peningkatan kasus Demam Berdarah Dengue (DBD). dr. H. Ahmad Wijaya, Sp.PD selaku Dokter Spesialis Penyakit Dalam RS Mitra Mulia Husada mengimbau masyarakat untuk senantiasa menjaga kebersihan genangan air.

    Berikut 3M Plus yang wajib diterapkan:
    1. Menguras tempat penampungan air secara rutin.
    2. Menutup rapat wadah penyimpanan air.
    3. Mendaur ulang barang bekas yang berpotensi menampung air hujan.
    Plus: Menggunakan lotion anti nyamuk, memasang kelambu, serta segera mengontrolkan diri apabila mengalami demam tinggi mendadak selama 2-3 hari.
    
    Layanan UGD RS Mitra Mulia Husada siap melayani pemeriksaan trombosit cepat dan penanganan darurat 24 Jam.`,
    author: 'Tim Medis RS MMH'
  },
  {
    id: 'news-3',
    title: 'Bakti Sosial & Pemeriksaan Kesehatan Gratis untuk Masyarakat Bandar Jaya',
    category: 'Event',
    date: 'Sabtu, 05 Juli 2026',
    image: '/BaktiSosial.jpg',
    summary: 'Ratusan warga ikuti bakti sosial kesehatan mencakup cek gula darah, tensi, dan konsultasi dokter spesialis secara gratis.',
    content: `Sebagai wujud kepedulian sosial, Rumah Sakit Mitra Mulia Husada menggelar kegiatan Bakti Sosial Kesehatan di Halaman RS MMH Bandar Jaya Timur.
    
    Kegiatan ini mencakup:
    - Pemeriksaan Tekanan Darah & Gula Darah Gratis
    - Konsultasi Kesehatan Gizi & Anak
    - Penyuluhan Pola Hidup Bersih dan Sehat (PHBS)
    
    Antusiasme masyarakat sangat tinggi dengan lebih dari 350 peserta terdaftar. Manajemen RS MMH berencana mengagendakan kegiatan rutin ini secara berkala.`,
    author: 'Tim CS & CSR RS MMH'
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 't-1',
    ticketNumber: 'MMH-PE-402',
    doctorName: 'dr. H. Ahmad Wijaya, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam',
    date: '2026-07-31',
    timeSlot: '08:30 - 10:00 WIB',
    patientName: 'Bambang Sudirman',
    nik: '1802011203890001',
    phone: '0813-8899-7711',
    insuranceType: 'BPJS',
    qrCodeValue: 'TICKET:MMH-PE-402:Bambang:2026-07-31',
    createdAt: '08:15 WIB',
    status: 'Melayani'
  },
  {
    id: 't-2',
    ticketNumber: 'MMH-AN-109',
    doctorName: 'dr. Siti Rahmawati, Sp.A',
    specialty: 'Spesialis Anak',
    date: '2026-07-31',
    timeSlot: '10:00 - 12:00 WIB',
    patientName: 'Keluarga Ibu Surtini (Pasien An. Kevin)',
    nik: '1802055609120004',
    phone: '0852-6677-8899',
    insuranceType: 'Umum',
    qrCodeValue: 'TICKET:MMH-AN-109:Kevin:2026-07-31',
    createdAt: '08:40 WIB',
    status: 'Menunggu'
  },
  {
    id: 't-3',
    ticketNumber: 'MMH-OB-881',
    doctorName: 'dr. Budi Santoso, Sp.OG',
    specialty: 'Spesialis Kebidanan & Kandungan',
    date: '2026-07-31',
    timeSlot: '16:30 - 20:00 WIB',
    patientName: 'Ny. Ratna Juwita',
    nik: '1802094501950003',
    phone: '0812-3344-5566',
    insuranceType: 'BPJS',
    qrCodeValue: 'TICKET:MMH-OB-881:Ratna:2026-07-31',
    createdAt: '09:05 WIB',
    status: 'Menunggu'
  }
];

export const INITIAL_CAREERS: CareerItem[] = [
  {
    id: 'car-1',
    title: 'Perawat Gigi',
    poster: '/oprecGigijpeg',
    description: 'Kami mencari perawat gigi yang berdedikasi untuk bergabung dengan tim kami di RS Mitra Mulia Husada. Kandidat ideal memiliki pengalaman dalam perawatan gigi, keterampilan komunikasi yang baik, dan mampu bekerja dalam lingkungan yang dinamis.',
    requirements: [
      'laki-laki / perempuan',
      'Usia maksimal 30 tahun',
      'Pendidikan minimal D3 Keperawatan',
      'Memiliki SKCK dan STR aktif',
      'Memiliki sertiikat BTCLS aktif',
      'Diutamakan memiliki pengalaman',
      'Mampu bekerja secara individu dan tim',
      'Bersedia mengikuti peraturan perusahan dan rumah sakit yang berlaku',
      'Wajib melampirkan kartu BPKJ Kesehatan'
    ],
    postedDate: '6 Agustus 2026',
    deadline:  '8 Agustus 2026',
    isActive: true,
  },
];