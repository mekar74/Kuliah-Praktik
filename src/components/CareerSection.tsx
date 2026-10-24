import React, { useState } from "react";
import { CareerItem } from '../types';
import { Briefcase, Mail, MapPin, Calendar, Clock, CheckCircle2, Send, Image as ImageIcon, X, Copy, Check, ExternalLink, ChevronRight, Building2, Phone } from "lucide-react";

interface CareerSectionProps {
    careers: CareerItem[];
}

export const CareerSection: React.FC<CareerSectionProps> = ({ careers }) => {
    const [selectedCareer, setSelectedCareer] = useState<CareerItem | null>(null);
    const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
    const [copiedAddress, setCopiedAddress] = useState(false);

    const activeCareer = careers.filter((c) => c.isActive !== false);

    const officialEmail = 'rsumitramuliahusadahrd@gmail.com';
    const managementAddress = 'Kantor Management RS Mitra Mulia Husada, Gg. Al Ridho, Bandar Jaya Timur, Kec. Terbanggi Besar, Kabupaten Lampung Tengah, Lampung 34163';

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(officialEmail);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(managementAddress);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2500);
    };

    return (
        <section id="Karir" className="py-16 bg-slate-50/80 border-t border-slate-200/80 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-3.5 py-1.5 rounded-full mb-2">
                        <Briefcase className="w-4 h-4 text-amber-600" />
                        <span>KARIR & REKRUTMEN KARYAWAN</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        LOWONGAN PEKERJAAN
                    </h2>
                    <p className="text-slate-600 text-sm mt-2.5 leading-relaxed">
                        Bergabunglah dengan tim tenaga kesehatan dan kembangkan karir Anda di bidang kesehatan.
                    </p>                    
                </div>

                {/* Career Posters */}
                {activeCareer.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {activeCareer.map((item) => (
                            <div key={item.id} onClick={() => setSelectedCareer(item)} className="bg-slate rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                            
                                {/* Poster Photo Image */}
                                <div className="relative aspect-[3/4] w-full bg-slate-950 overflow-hidden">
                                    <img src={item.posterPhoto} alt={item.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                                    {/* Top Badges */}
                                    <div className="absolute top-3 left-3 flex items-center justify-between gap-2">
                                        <span className="bg-[#002f74] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md border border-white/20 backdrop-blur-xs">{item.department}</span>
                                        <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm"> {item.type}</span>
                                    </div>

                                    {/* Bottom Title & Click Prompt Overlay */}
                                    <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                                        <h3 className="font-extrabold text-sm text-white line-clamp-2 leading-snug drop-shadow-xs group-hover:text-amber-300 transition-colors">{item.title}</h3>
                                        <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-amber-200/90 pt-2 border-t border-white/15">
                                            <span className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/10">
                                                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                                                <span>Lihat Poster</span>
                                            </span>
                                            {item.deadline && (
                                                <span className="text-white text-[10px] bg-black/50 px-2 py-0.5 rounded font-mono">s/d {item.deadline}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 max-w-lg mx-auto mb-12 shadow-xs">
                        <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <h3 className="font-bold text-slate-800 mx-auto text-base">Belum Ada Lowongan Untuk Saat Ini</h3>
                        <p className="text-slate-600">Silahkan kirimkan CV dan berkas Anda ke email manajemen untuk inventaris data calon karyawan kami.</p>
                    </div>
                )}

                {/* Two Bottom Action Card (Email RS & Alamat Kantor) */}
                <div className="bg-gradient-to-r from-[#001F4D] via-[#002F74] to-[#00408A] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800">
                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="grid lg:grid-cols-2 gap-6">
                        
                        {/* Bottom Card 1: Email Card */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition duration-200">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold shadow-md shrink-0">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-bold text-lg">Email Resmi Rekturmen HRD</h4>
                                </div>
                                
                                <div className="bg-slate-900/70 rounded-xl p-3.5 border border-white/10 font-mono text-sm font-semibold text-amber-300 break-all flex items-center justify-between gap-2">
                                    <span>{officialEmail}</span>
                                    {copiedEmail && <span className="text-[10px] text-emerald-400 font-sans font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">Email Berhasil Disalin</span>}
                                </div>
                            </div>

                            <div className="pt-4 mt-3 border-t border-white/10">
                                <button onClick={handleCopyEmail} className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm text-center">
                                    {copiedEmail ? (
                                        <>
                                            <Check className="w-4 h-4 text-slate-950" />
                                            <span>Email Berhasil Disalin</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span>Salin Email</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        {/* Bottom Card 2: Address Card */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition duration-200">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-400 text-slate-900 flex items-center justify-center font-bold shadow-md shrink-0">
                                        <Building2 className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-bold text-sm text-white">Alamat Kantor Management & HRD</h4>
                                </div>

                                <div className="bg-slate-900/70 rounded-xl p-3.5 border border-white/10 text-xs text-slate-200 leading-relaxed flex items-start gap-2.5">
                                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <p className="font-semibold text-white leading-normal">{managementAddress}</p>
                                </div>
                            </div>

                            <div className="pt-4 mt-3 border-t border-white/10">
                                <button onClick={handleCopyAddress} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm text-center">
                                    {copiedAddress ? (
                                        <>
                                            <Check className="w-4 h-4 text-slate-950" />
                                            <span>Alamat Berhasil Disalin</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span>Salin Alamat Kantor!</span>   
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Detail Poster & Requirements Modal */}
            {selectedCareer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">

                        {/* Modal Header */}
                        <div className="p-5 bg-[#002F74] text-white flex justify-between items-center">
                            <div>
                                <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">{selectedCareer.department} • {selectedCareer.type}</span>
                                <h3 className="text-lg font-bold mt-1 text-white">{selectedCareer.title}</h3>
                            </div>
                            <button onClick={() => setSelectedCareer(null)} className="p-2 rounded-full hover:bg-white/20 text-white transition cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1 grid lg:grid-cols-12 gap-6">

                            {/* Left Column: Poster Image */}
                            <div className="lg:col-span-5">
                                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 group">
                                    <img src={selectedCareer.posterPhoto} alt={selectedCareer.title} className="w-full h-auto max-h-[420px] object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div className="mt-3 text-[11px] text-slate-500 text-center font-medium">Poster Resmi Rekrutmen RS MMH Bandar Jaya
                                </div>
                            </div>
                                
                            {/* Right Column: Job Details */}
                            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                            <span>Diposting: {selectedCareer.postedDate}</span>
                                        </span>
                                        {selectedCareer.deadline && (
                                            <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                                <span>Batas Akhir: {selectedCareer.deadline}</span>
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="font-bold text-slate-900 text-sm mb-1">Deskripsi Pekerjaan:</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{selectedCareer.description}</p>

                                    <h4 className="font-bold text-slate-900 text-sm mb-2">Persyaratan & Kualiikasi Berkas:</h4>
                                    <ul className="space-y-2 mb-6">
                                        {selectedCareer.requirements.map((req, index) => (
                                            <li key={index} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Action Button */}
                                <div className="pt-4 border-t border-slate-200 space-y-2">
                                    <p className="text-[11px] font-semibold text-slate-500 text-center">Silakan kirimkan CV & berkas Anda ke email resmi HRD:</p>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <a
                                            href={`mailto:${officialEmail}?subject=Lamaran%20Pekerjaan%20-%20${encodeURIComponent(selectedCareer.title)}`}
                                            className="flex-1 bg-[#002F74] hover:bg-blue-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xs text-center">
                                            <Send className="w-4 h-4" />
                                            <span>Kirim Email</span>
                                        </a>
                                        <button onClick={handleCopyEmail} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer">
                                            {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                            <span>Salin Email HRD</span>
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
                            <span className="text-slate-500">Alamat Kantor: {managementAddress}</span>
                            <button onClick={() => setSelectedCareer(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                                Tutup
                            </button>
                        </div>

                    </div>
                </div>
            )}
            
        </section>
    );
};