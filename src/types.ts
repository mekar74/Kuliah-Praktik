export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  category: 'Penyakit Dalam' | 'Anak' | 'Bedah' | 'Syaraf' | 'Gigi' | 'Mata' | 'THT' | 'Anestesi' | 'Jantung'| 'Radiologi' | 'Rehab Medik' | 'Kebidanan' | 'Paru' | 'Kedokteran Jiwa' | 'Kulit & Kelamin';
  photo: string;
  sip: string;
  experience: string;
  scheduleDays: string;
  morningShift?: string;
  afternoonShift?: string;
  status: 'Pagi' | 'Siang' | 'Layanan Penunjang' | 'UGD';
  availableToday: boolean;
  education: string;
}

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  day: string;
  morningHours?: string;
  afternoonHours?: string;
  room: string;
  category: 'Praktik Pagi' | 'Praktik Siang' | 'Layanan Penunjang' | 'Layanan UGD';
  status: 'Tersedia' | 'Sedang Berlangsung' | 'Cuti' | 'Penuh';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  phone?: string;
  badge?: string;
  actionText: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Seputar RS' | 'Tips Kesehatan' | 'Fasilitas Baru' | 'Event';
  date: string;
  image: string;
  summary: string;
  content: string;
  author: string;
}

export interface BookingForm {
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  patientName: string;
  nik: string;
  phone: string;
  email: string;
  insuranceType: 'BPJS' | 'Umum' | 'Asuransi Swasta';
  notes: string;
}

export interface Ticket {
  id?: string;
  ticketNumber: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  patientName: string;
  nik: string;
  phone?: string;
  insuranceType: string;
  qrCodeValue: string;
  createdAt: string;
  status: 'Menunggu' | 'Melayani' | 'Selesai' | 'Batal';
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  addressName?: string;
}

export interface CareerItem {
  id: string;
  title: string;
  photo?: string;
  posterPhoto?: string;
  posterURL?: string;
  department?: string;
  type?: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline: string;
  contactEmail?: string;
  isActive: boolean;
}