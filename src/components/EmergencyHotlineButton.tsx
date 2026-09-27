import React, { useState } from 'react';
import { PhoneCall, X, ShieldAlert, HeartPulse, Hospital, Ambulance } from 'lucide-react';

export const EmergencyHotlineButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-40">
      
      {/* Expanded Quick Contact Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-red-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3">
          <div className="bg-gradient-to-r from-red-600 to-rose-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-300" />
                <h4 className="text-sm font-black">Hotline Cepat Tanggap Darurat</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-rose-100 mt-1">
              Hubungi instansi resmi untuk kebutuhan darah cito atau ambulans 24 Jam.
            </p>
          </div>

          <div className="p-3.5 space-y-2 bg-slate-50">
            {/* 1. UDD PMI Riau */}
            <a
              href="tel:076122119"
              className="flex items-center justify-between p-2.5 bg-white hover:bg-red-50 rounded-2xl border border-slate-200 hover:border-red-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  🩸
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800 group-hover:text-red-600">
                    Posko UDD PMI Riau
                  </div>
                  <div className="text-[10px] text-slate-400">Siaga Bank Darah 24 Jam</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 group-hover:bg-red-600 group-hover:text-white px-2.5 py-1 rounded-xl transition-all">
                (0761) 22119
              </span>
            </a>

            {/* 2. SPGDT 119 Kemenkes */}
            <a
              href="tel:119"
              className="flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Ambulance className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800 group-hover:text-emerald-700">
                    Ambulans Gawat Darurat
                  </div>
                  <div className="text-[10px] text-slate-400">SPGDT Nasional Bebas Pulsa</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white px-2.5 py-1 rounded-xl transition-all">
                119
              </span>
            </a>

            {/* 3. IGD RSUD Arifin Achmad */}
            <a
              href="tel:076121618"
              className="flex items-center justify-between p-2.5 bg-white hover:bg-sky-50 rounded-2xl border border-slate-200 hover:border-sky-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                  <Hospital className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800 group-hover:text-sky-700">
                    IGD RSUD Arifin Achmad
                  </div>
                  <div className="text-[10px] text-slate-400">Resusitasi & Bedah Cito</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 group-hover:bg-sky-600 group-hover:text-white px-2.5 py-1 rounded-xl transition-all">
                (0761) 21618
              </span>
            </a>
          </div>

          <div className="p-2.5 bg-white text-center border-t border-slate-100 text-[10px] text-slate-400">
            Tersambung langsung ke jaringan PSC 119 Riau
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs rounded-full shadow-2xl hover:shadow-red-500/30 transition-all cursor-pointer border-2 border-white/40 active:scale-95 group"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <PhoneCall className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Hotline Darurat 24 Jam</span>
      </button>

    </div>
  );
};
