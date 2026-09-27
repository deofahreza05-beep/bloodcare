import React, { useRef } from 'react';
import { X, Printer, Download, Award, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { Donor } from '../../types';

interface DonorCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  donor: Donor;
}

export const DonorCertificateModal: React.FC<DonorCertificateModalProps> = ({
  isOpen,
  onClose,
  donor,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateNumber = `PMI-RIAU/CERT/${new Date().getFullYear()}/${donor.volunteer_id.replace('-', '/')}`;
  const currentDateFormatted = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-black text-white">Piagam & Surat Keterangan Donor Resmi</h3>
              <p className="text-[11px] text-slate-400">Palang Merah Indonesia • Unit Donor Darah (UDD)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content Area */}
        <div className="p-8 sm:p-10 bg-slate-50 flex justify-center">
          <div
            ref={certificateRef}
            className="w-full bg-white border-8 border-double border-red-700/60 p-8 sm:p-10 rounded-xl shadow-lg relative text-slate-800 print:shadow-none print:border-red-800 print:p-6"
          >
            {/* Watermark in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <span className="text-[160px] font-black text-red-900">PMI</span>
            </div>

            {/* Official Header */}
            <div className="text-center pb-6 border-b-2 border-red-600 relative">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-xs">
                  🩸
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-black text-red-700 tracking-wider uppercase">
                    PALANG MERAH INDONESIA
                  </h1>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                    UNIT DONOR DARAH (UDD) DAERAH RIAU & KOTA PEKANBARU
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Jl. Diponegoro No. 15, Pekanbaru • Telp: (0761) 22119 • www.pmi.or.id
                  </p>
                </div>
              </div>

              <div className="inline-block mt-3 px-4 py-1 bg-red-50 border border-red-200 rounded-full text-red-800 font-extrabold text-xs uppercase tracking-widest">
                SURAT KETERANGAN DONOR DARAH SUKARELA
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">
                No. Registrasi: <span className="font-bold text-slate-700">{certificateNumber}</span>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="mt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
              <p>
                Palang Merah Indonesia dengan bangga dan rasa hormat yang mendalam memberikan sertifikasi serta penghargaan kemanusiaan kepada:
              </p>

              {/* Donor Highlight Box */}
              <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 border border-red-200 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Nama Pendonor Sukarela</div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  {donor.full_name}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-semibold">
                  <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full font-bold">
                    Gol. Darah: {donor.blood_group}+ (Rhesus Positif)
                  </span>
                  <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-slate-700 font-mono">
                    ID: {donor.volunteer_id}
                  </span>
                  <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                    Peringkat: {donor.badge_tier} Relawan
                  </span>
                </div>
              </div>

              <p>
                Telah berpartisipasi aktif secara sukarela dan tanpa pamrih mendonorkan darahnya sebanyak:
              </p>

              {/* Statistics Row */}
              <div className="grid grid-cols-3 gap-3 text-center my-3">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Frekuensi Donor</div>
                  <div className="text-lg font-black text-red-600">{donor.total_donations} Kali</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Volume Tersalurkan</div>
                  <div className="text-lg font-black text-slate-800">{donor.total_volume_ml.toLocaleString('id-ID')} ml</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Estimasi Terbantu</div>
                  <div className="text-lg font-black text-emerald-600">~{donor.lives_saved_estimate} Jiwa</div>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 italic">
                Setetes darah yang telah didonorkan telah disaring, diuji lab virologi (NAT & Serologi), serta didistribusikan ke rumah sakit rujukan untuk menyelamatkan nyawa pasien kritis.
              </p>
            </div>

            {/* Signature & Verification Block */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
              <div className="text-left space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sertifikat Tervalidasi Otentik</span>
                </div>
                <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-lg p-1 flex flex-col items-center justify-center">
                  <QrCode className="w-14 h-14 text-slate-800" />
                  <span className="text-[7px] text-slate-400 font-mono">SCAN PMI VERIFY</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-[11px] text-slate-500 mb-1">
                  Pekanbaru, {currentDateFormatted}
                </div>
                <div className="text-[11px] font-bold text-slate-700">
                  Kepala Unit Donor Darah PMI
                </div>
                <div className="h-12 flex items-center justify-center">
                  <span className="font-serif italic text-base text-red-800 tracking-wider">
                    dr. Hj. Rahmi Novita, M.Biomed
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  NIP. 19780512 200501 2 004
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dokumen ini sah untuk keperluan perizinan instansi/kampus.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
