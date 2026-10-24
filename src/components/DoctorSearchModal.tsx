import React, { useState } from 'react';
import { DOCTORS } from '../data/hospitalData';
import { Doctor } from '../types';
import { Search, X, Calendar, Stethoscope, Clock, Shield } from 'lucide-react';

interface DoctorSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoctorToBook: (doctorId: string) => void;
  doctors?: Doctor[];
}

export const DoctorSearchModal: React.FC<DoctorSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDoctorToBook,
  doctors = DOCTORS,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('Semua');

  if (!isOpen) return null;

  const categories = ['Semua', 'Penyakit Dalam', 'Anak', 'Obgyn', 'Bedah', 'Syaraf', 'Gigi', 'Mata', 'THT'];

  const filtered = doctors.filter((doc) => {
    const matchCat = selectedCat === 'Semua' || doc.category === selectedCat;
    const matchQ =
      doc.name.toLowerCase().includes(query.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(query.toLowerCase()) ||
      doc.education.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header Search Input */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik nama dokter atau spesialisasi (misal: Dokter Anak, Sp.PD)..."
            className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-slate-400 hover:text-slate-600">
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex gap-2 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#002F74] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          <p className="text-xs text-slate-500 font-medium">
            Ditemukan {filtered.length} dokter spesialis RS MMH
          </p>

          {filtered.length > 0 ? (
            filtered.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 bg-slate-50 hover:bg-blue-50/60 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 transition">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-[#002F74] text-sm">{doc.name}</h4>
                    <p className="text-xs font-semibold text-blue-800">{doc.specialty}</p>
                    <p className="text-[11px] text-slate-500">Jadwal: {doc.scheduleDays}</p>
                  </div>
                </div>

                {/* <button
                  onClick={() => {
                    onClose();
                    onSelectDoctorToBook(doc.id);
                  }}
                  className="bg-[#002F74] hover:bg-blue-900 text-white text-xs font-semibold px-3 py-2 rounded-xl transition cursor-pointer shrink-0">
                  Booking
                </button> */}
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              Dokter tidak ditemukan dengan kata kunci ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
