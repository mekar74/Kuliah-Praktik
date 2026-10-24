import React, { useState } from 'react';
import { X, ShieldCheck, KeyRound, ArrowRight, UserCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Username atau Password Admin salah. Gunakan admin / admin123');
    }
  };

  const handleQuickDemoLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002F74] to-blue-900 text-white p-6 flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-300/40 flex items-center justify-center text-yellow-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-yellow-300 uppercase tracking-widest block">
                MANAJEMEN RS MMH
              </span>
              <h3 className="text-lg font-bold">Login Portal Admin</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-blue-200 hover:text-white hover:bg-blue-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            Silakan masuk untuk mengelola daftar dokter, jadwal poliklinik, publikasi berita, serta antrean booking pasien secara real-time.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Username Admin
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200/80 text-xs text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-blue-800">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Kredensial Login Default:</span>
              </div>
              <div>Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">admin</code></div>
              <div>Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">admin123</code></div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#002F74] hover:bg-blue-900 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <span>Masuk Ke Panel Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              onClick={handleQuickDemoLogin}
              className="w-full bg-[#FFFB7E] hover:bg-yellow-300 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <UserCheck className="w-4 h-4" />
              <span>Login Langsung (Satu Klik Demo)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
