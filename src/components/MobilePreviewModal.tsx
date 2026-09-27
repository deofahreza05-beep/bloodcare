import React, { useState } from 'react';
import { 
  Smartphone, X, Copy, Check, Share2, Globe, ShieldCheck, 
  Users, AlertTriangle, ExternalLink, HelpCircle, CheckCircle2,
  RefreshCw, Laptop
} from 'lucide-react';

interface MobilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const MobilePreviewModal: React.FC<MobilePreviewModalProps> = ({
  isOpen,
  onClose,
  appUrl,
}) => {
  // Shared URL Resmi dari AI Studio
  const sharedPreUrl = 'https://ais-pre-u3truk4zcng6qrhxzpxvzn-957674867274.asia-east1.run.app';
  
  // URL Dev saat ini
  const currentDevUrl = appUrl || (typeof window !== 'undefined' ? window.location.href : '');

  // Tab pilihan
  const [selectedUrlType, setSelectedUrlType] = useState<'shared' | 'direct' | 'dev'>('shared');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // URL yang aktif ditampilkan dan dijadikan QR Code
  const activeUrl = 
    selectedUrlType === 'shared' 
      ? sharedPreUrl 
      : selectedUrlType === 'direct' 
      ? sharedPreUrl 
      : currentDevUrl;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = (url: string) => {
    const message = encodeURIComponent(
      `Halo! Coba buka aplikasi Sistem Informasi Donor Darah BloodCare di smartphone kamu:\n\n${url}\n\n(Buka lewat browser Chrome / Safari)`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  // QR Code generator API URL
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(activeUrl)}&color=dc2626`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-black">Buka di HP Teman / Kawan</h3>
              <p className="text-xs text-rose-100">Bisa diakses di Android &amp; iPhone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto text-center space-y-4">
          
          {/* Penjelasan Singkat Kenapa Tadi Error di HP Teman */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-950">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-900 font-bold mb-0.5">
                  Kenapa tadi di HP kawan muncul tulisan Error / 403 Forbidden?
                </strong>
                <p className="text-amber-800 leading-relaxed text-[11px]">
                  Karena server preview AI Studio memproteksi link sesi editor (<i>ais-dev</i>) khusus untuk akun Google Anda saja. Untuk orang lain/HP teman, mereka <strong>harus menggunakan Shared URL (`ais-pre`)</strong> atau diizinkan lewat menu <strong>Share</strong> di AI Studio.
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="inline-block p-4 bg-white rounded-3xl border-2 border-red-200 shadow-md relative">
            <img
              src={qrApiUrl}
              alt="Scan QR untuk membuka aplikasi di HP"
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-xl"
            />
            <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-bold text-red-600">
              <span>Arahkan Kamera HP ke QR Code</span>
            </div>
          </div>

          {/* Box Tautan & Tombol Copy */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-500 uppercase tracking-wider">
                Tautan Yang Dibagikan:
              </span>
              <span className="text-emerald-600 font-bold flex items-center gap-1 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Shared Public Link
              </span>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800 break-all select-all font-semibold">
              {activeUrl}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleCopy(activeUrl)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Tautan</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleShareWhatsApp(activeUrl)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Share2 className="w-4 h-4" />
                <span>Kirim ke WhatsApp</span>
              </button>
            </div>
          </div>

          {/* 3 Langkah Mudah Jika Teman Masih Mengalami Error */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-left text-xs text-blue-950 space-y-2">
            <h4 className="font-black text-blue-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Cara Mengatasi Jika HP Kawan Masih Ditolak Google:</span>
            </h4>
            
            <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-blue-800 leading-relaxed">
              <li>
                <strong>Pastikan kawan membuka link di Google Chrome / Safari</strong> (jangan browser bawaan aplikasi Instagram/WA yang sering memblokir script).
              </li>
              <li>
                <strong>Aktifkan Akses Publik di Tombol "Share" (Pojok Kanan Atas AI Studio):</strong>
                <p className="mt-0.5 ml-4 text-blue-700 text-[10px]">
                  Di layar AI Studio Anda (di browser laptop), klik tombol <strong>"Share"</strong> di pojok kanan atas, lalu pilih <strong>"Anyone with the link can view"</strong> agar siapa saja tanpa akun pengembang bisa mengakses.
                </p>
              </li>
              <li>
                <strong>Gunakan Mode Ekspor Offline / Download ZIP:</strong>
                <p className="mt-0.5 ml-4 text-blue-700 text-[10px]">
                  Jika teman atau dosen ingin melihat semua halaman UI tanpa koneksi server, kirimkan file <strong>.ZIP</strong> dari menu <strong>"Export Desain UI (.ZIP)"</strong> di navbar atas.
                </p>
              </li>
            </ol>
          </div>

        </div>

        {/* Footer Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <span>Tes Buka Sendiri di Tab Baru</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
