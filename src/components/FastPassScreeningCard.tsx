import React from 'react';
import { QrCode, ShieldCheck, Check, Sparkles, RefreshCw } from 'lucide-react';

interface FastPassScreeningCardProps {
  onShowFullQR: () => void;
  onRetakeScreening: () => void;
}

export const FastPassScreeningCard: React.FC<FastPassScreeningCardProps> = ({
  onShowFullQR,
  onRetakeScreening,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">
              Fast-Pass Skrining Mandiri
            </h3>
            <p className="text-[10px] text-slate-400">
              Berlaku s/d 24 Jam ke depan
            </p>
          </div>
        </div>

        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 tracking-wide">
          SIAP DONOR (Fit)
        </span>
      </div>

      {/* QR Code & Vitals Grid */}
      <div className="flex items-center gap-3.5 my-3.5">
        
        {/* QR Code Preview */}
        <div 
          onClick={onShowFullQR}
          className="w-20 h-20 sm:w-22 sm:h-22 bg-slate-50 border border-slate-200 rounded-xl p-1.5 shrink-0 flex items-center justify-center cursor-pointer hover:border-red-400 transition-colors shadow-2xs group relative"
          title="Klik untuk memperbesar QR Code"
        >
          {/* Vector QR Code SVG */}
          <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
            {/* Top-left corner */}
            <rect x="10" y="10" width="24" height="24" rx="2" />
            <rect x="14" y="14" width="16" height="16" fill="white" />
            <rect x="18" y="18" width="8" height="8" />

            {/* Top-right corner */}
            <rect x="66" y="10" width="24" height="24" rx="2" />
            <rect x="70" y="14" width="16" height="16" fill="white" />
            <rect x="74" y="18" width="8" height="8" />

            {/* Bottom-left corner */}
            <rect x="10" y="66" width="24" height="24" rx="2" />
            <rect x="14" y="70" width="16" height="16" fill="white" />
            <rect x="18" y="74" width="8" height="8" />

            {/* Data blocks */}
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
          <div className="absolute inset-0 bg-red-600/10 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-[9px] font-black text-red-700 bg-white px-1 py-0.5 rounded shadow">Zoom</span>
          </div>
        </div>

        {/* Vitals Summary */}
        <div className="flex-1 min-w-0 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">Tekanan Darah:</span>
            <strong className="text-slate-800 font-bold">118/78 mmHg</strong>
          </div>
          
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">Kadar Hb Terakhir:</span>
            <strong className="text-slate-800 font-bold">14.2 g/dL <span className="text-emerald-600 text-[10px] font-semibold">(Ideal)</span></strong>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">Berat Badan:</span>
            <strong className="text-slate-800 font-bold">68 kg <span className="text-emerald-600 text-[10px] font-semibold">(Lolos Syarat)</span></strong>
          </div>
        </div>

      </div>

      {/* Button */}
      <button
        type="button"
        onClick={onShowFullQR}
        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <QrCode className="w-3.5 h-3.5 text-red-600" />
        <span>Tunjukkan QR di Meja Registrasi PMI</span>
      </button>

      <div className="mt-2 text-center">
        <button
          onClick={onRetakeScreening}
          className="text-[10px] font-semibold text-slate-400 hover:text-red-600 inline-flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-2.5 h-2.5" />
          <span>Skrining Ulang Kondisi Hari Ini</span>
        </button>
      </div>

    </div>
  );
};
