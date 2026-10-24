import React from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { X, PhoneCall, Ambulance, AlertTriangle, ShieldAlert, MessageSquare } from 'lucide-react';

interface AmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmbulanceModal: React.FC<AmbulanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-red-200 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-800 text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Ambulance className="w-6 h-6 text-yellow-300 animate-bounce" />
            <div>
              <span className="text-[10px] font-bold text-yellow-200 uppercase tracking-widest block">
                LAYANAN DARURAT 24 JAM
              </span>
              <h3 className="text-base font-bold">Panggil Ambulance & UGD</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-red-200 hover:text-white hover:bg-red-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="bg-red-50 border border-red-200 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-red-900">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p>
              Apabila terjadi keadaan gawat darurat medis, kecelakaan, atau serangan jantung, tim armada Ambulance Bakti Mulia RS MMH siap bergerak menuju lokasi Anda.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={`tel:${HOSPITAL_INFO.phoneUGD1}`}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-3.5 rounded-2xl flex items-center justify-between text-sm shadow-md transition active:scale-95"
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-yellow-300" />
                <div className="text-left">
                  <span className="block text-xs text-red-200 font-normal">Telepon UGD Utama</span>
                  <span>{HOSPITAL_INFO.phoneUGD1}</span>
                </div>
              </div>
              <span className="bg-red-800 text-xs px-2.5 py-1 rounded-lg">Panggil ➔</span>
            </a>

            <a
              href={`tel:${HOSPITAL_INFO.phoneUGD2}`}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-3.5 rounded-2xl flex items-center justify-between text-sm shadow-md transition active:scale-95"
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <span className="block text-xs text-slate-300 font-normal">Telepon UGD Alternatif</span>
                  <span>{HOSPITAL_INFO.phoneUGD2}</span>
                </div>
              </div>
              <span className="bg-slate-700 text-xs px-2.5 py-1 rounded-lg">Panggil ➔</span>
            </a>

            <a
              href={HOSPITAL_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3.5 rounded-2xl flex items-center justify-between text-sm shadow-md transition active:scale-95"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-white" />
                <div className="text-left">
                  <span className="block text-xs text-emerald-200 font-normal">WhatsApp Respon Cepat UGD</span>
                  <span>Kirim Pesan Lokasi WA</span>
                </div>
              </div>
              <span className="bg-emerald-800 text-xs px-2.5 py-1 rounded-lg">Kirim ➔</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Alamat Pos UGD: {HOSPITAL_INFO.address}
          </p>

          <button
            onClick={onClose}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
