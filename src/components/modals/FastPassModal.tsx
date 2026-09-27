import React from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, Download, Printer } from 'lucide-react';
import { Donor, Screening } from '../../types';

interface FastPassModalProps {
  donor: Donor;
  screening: Screening | null;
  onClose: () => void;
}

export const FastPassModal: React.FC<FastPassModalProps> = ({ donor, screening, onClose }) => {
  const token = screening?.qr_code_token || 'BC-7890-PAS';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 overflow-hidden text-center">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-black uppercase tracking-widest bg-white/25 px-2.5 py-0.5 rounded-full inline-block mb-1">
            Palang Merah Indonesia
          </span>
          <h3 className="text-base font-extrabold">Fast-Pass Registrasi Mandiri</h3>
          <p className="text-[11px] text-rose-100">Bypass antrean formulir manual di UDD PMI</p>
        </div>

        {/* QR Code Container */}
        <div className="p-6">
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 inline-block shadow-inner mx-auto mb-4">
            <svg className="w-44 h-44 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
              <rect x="10" y="10" width="24" height="24" rx="2" />
              <rect x="14" y="14" width="16" height="16" fill="white" />
              <rect x="18" y="18" width="8" height="8" />

              <rect x="66" y="10" width="24" height="24" rx="2" />
              <rect x="70" y="14" width="16" height="16" fill="white" />
              <rect x="74" y="18" width="8" height="8" />

              <rect x="10" y="66" width="24" height="24" rx="2" />
              <rect x="14" y="70" width="16" height="16" fill="white" />
              <rect x="18" y="74" width="8" height="8" />

              <rect x="42" y="10" width="6" height="14" />
              <rect x="52" y="18" width="8" height="6" />
              <rect x="10" y="42" width="14" height="6" />
              <rect x="28" y="40" width="6" height="14" />
              <rect x="40" y="40" width="18" height="18" rx="2" />
              <rect x="64" y="40" width="10" height="6" />
              <rect x="78" y="46" width="12" height="6" />
              <rect x="42" y="66" width="6" height="14" />
              <rect x="54" y="74" width="16" height="6" />
              <rect x="76" y="66" width="14" height="14" />
              <circle cx="49" cy="49" r="4" fill="white" />
            </svg>
            <div className="text-[11px] font-mono font-bold text-slate-600 mt-2">
              TOKEN: {token}
            </div>
          </div>

          {/* Donor Info & Vitals */}
          <div className="bg-slate-50 rounded-xl p-3 text-left border border-slate-200/80 space-y-1.5 text-xs mb-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Nama Pendonor:</span>
              <strong className="text-slate-900 font-bold">{donor.full_name}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Golongan Darah:</span>
              <strong className="text-red-600 font-extrabold">{donor.blood_group} {donor.rhesus} (Rhesus Positif)</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Status Skrining:</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                SIAP DONOR (Fit)
              </span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-[11px]">
              <span className="text-slate-500">Masa Berlaku:</span>
              <strong className="text-slate-700">24 Jam s/d Besok Siang</strong>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert('Fast-Pass berhasil disimpan ke galeri ponsel!');
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Unduh Tiket</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              Selesai
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
