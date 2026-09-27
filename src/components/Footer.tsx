import React from 'react';
import { ShieldCheck, Phone, MessageSquare, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-8 text-xs text-slate-600">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand Info & Verifications */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                🩸
              </div>
              <div className="flex items-center">
                <span className="text-lg font-black text-red-600">Blood</span>
                <span className="text-lg font-black text-slate-900">Care</span>
                <span className="text-[11px] font-bold text-slate-400 ml-1.5 uppercase tracking-wider">Ecosystem</span>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed text-xs">
              Sistem digital terintegrasi penyediaan stok darah nasional, layanan kesehatan primer, serta jaringan tanggap darurat PMI di seluruh Indonesia.
            </p>

            {/* Verification Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-slate-800 text-[11px]">Palang Merah Indonesia</div>
                  <div className="text-[10px] text-slate-400">Mitra Resmi Terverifikasi</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-slate-800 text-[11px]">Kemenkes RI</div>
                  <div className="text-[10px] text-slate-400">Integrasi SatuSehat</div>
                </div>
              </div>
            </div>
          </div>

          {/* Layanan Medis */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Layanan Medis
            </h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#schedules" className="hover:text-red-600 transition-colors">Jadwal Donor PMI</a></li>
              <li><a href="#requests" className="hover:text-red-600 transition-colors">Permintaan Darah Darurat</a></li>
              <li><a href="#telemedicine" className="hover:text-red-600 transition-colors">Konsultasi Dokter Siaga</a></li>
              <li><a href="#supplements" className="hover:text-red-600 transition-colors">Pemesanan Suplemen Zat Besi</a></li>
              <li><a href="#lab" className="hover:text-red-600 transition-colors">Pemeriksaan Laboratorium</a></li>
            </ul>
          </div>

          {/* Jaringan Faskes */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Jaringan Faskes
            </h4>
            <ul className="space-y-2 text-slate-500">
              <li><span className="hover:text-slate-800 cursor-pointer">RS Cipto Mangunkusumo</span></li>
              <li><span className="hover:text-slate-800 cursor-pointer">RS Harapan Kita</span></li>
              <li><span className="hover:text-slate-800 cursor-pointer">RSUP Hasan Sadikin</span></li>
              <li><span className="hover:text-slate-800 cursor-pointer">RSUD Arifin Achmad Riau</span></li>
              <li><span className="hover:text-slate-800 cursor-pointer">Seluruh Posko PMI Daerah</span></li>
            </ul>
          </div>

          {/* Kontak Darurat 24/7 */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Kontak Darurat 24/7
            </h4>
            
            <div className="space-y-2.5">
              <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-3">
                <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                  Ambulans & IGD Nasional
                </div>
                <div className="text-base font-extrabold text-red-700 mt-0.5">
                  119 <span className="text-xs font-semibold">ext. 4</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  WhatsApp PMI Center
                </div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">
                  +62 811-1911-999
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <a href="#edukasi" className="hover:text-slate-600">Edukasi & Riset</a>
            <a href="#privasi" className="hover:text-slate-600">Kebijakan Privasi</a>
            <a href="#terms" className="hover:text-slate-600">Syarat & Ketentuan</a>
            <a href="#panduan" className="hover:text-slate-600">Panduan Donor</a>
          </div>

          <div className="text-slate-400">
            © 2025 BloodCare Ecosystem. Terdaftar & Diawasi Kementerian Kesehatan Republik Indonesia.
          </div>
        </div>

      </div>
    </footer>
  );
};
