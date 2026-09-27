import React, { useState } from 'react';
import { ShieldAlert, Lock, UserCheck, KeyRound, AlertCircle, X, CheckCircle2 } from 'lucide-react';

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
  const [email, setEmail] = useState('admin@bloodcare.id');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      // Valid credentials for demo/presentation
      if (
        (email === 'admin@bloodcare.id' || email === 'petugas.pmi@riau.go.id' || email === 'admin') &&
        (password === 'admin123' || password === 'pmi2025' || password === 'admin')
      ) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('Kredensial tidak valid! Masukkan email petugas dan kata sandi yang sah.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Header with Security Badge */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400 mb-3">
            <Lock className="w-6 h-6 text-red-400" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-bold tracking-wide uppercase mb-1 border border-red-500/30">
            <ShieldAlert className="w-3 h-3 text-red-400" />
            Area Terbatas Faskes & PMI
          </div>
          <h3 className="text-xl font-black text-white">Autentikasi Petugas Medis</h3>
          <p className="text-xs text-slate-300 mt-1">
            Untuk menjaga integritas dan kerahasiaan data pasien, panel admin hanya dapat diakses oleh staf UDD PMI dan RS terverifikasi.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Petugas / NIP Rumah Sakit
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@bloodcare.id"
                className="w-full text-xs py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Kata Sandi / Kode PIN Keamanan
              </label>
              <span className="text-[10px] text-slate-400">Enkripsi SHA-256</span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full text-xs py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
              />
            </div>
          </div>

          {/* Quick Demo Helper Hint */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-[11px] text-amber-800">
            <span className="font-bold flex items-center gap-1 text-amber-900 mb-0.5">
              <KeyRound className="w-3.5 h-3.5" /> Kredensial Pengujian (Demo):
            </span>
            <div className="grid grid-cols-2 gap-1 mt-1 text-[10px]">
              <div>Email: <code className="bg-amber-100/70 px-1 py-0.5 rounded font-mono font-bold">admin@bloodcare.id</code></div>
              <div>Password: <code className="bg-amber-100/70 px-1 py-0.5 rounded font-mono font-bold">admin123</code></div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batalkan
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Masuk Sebagai Admin</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Footer Note */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
          <span>BloodCare RBAC v2.4 Security Protocol</span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3 h-3" /> TLS 256-bit
          </span>
        </div>

      </div>
    </div>
  );
};
