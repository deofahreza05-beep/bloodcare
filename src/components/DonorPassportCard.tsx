import React from 'react';
import { Award, Droplet, Users, Calendar, ArrowRight } from 'lucide-react';
import { Donor } from '../types';

interface DonorPassportCardProps {
  donor: Donor;
  onOpenHistory: () => void;
  onOpenCertificate?: () => void;
}

export const DonorPassportCard: React.FC<DonorPassportCardProps> = ({ donor, onOpenHistory, onOpenCertificate }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-red-800 text-white p-5 shadow-lg border border-red-500/30 mb-5">
      {/* Background medical emblem watermark */}
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border-8 border-white/5 pointer-events-none"></div>
      <div className="absolute right-10 -bottom-10 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/15">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
            <Award className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-rose-100">
            Paspor Relawan Donor PMI
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
          Terverifikasi
        </span>
      </div>

      {/* User Info & Blood Group */}
      <div className="flex items-center justify-between gap-3 mt-4">
        <div>
          <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
            {donor.full_name}
          </h3>
          <p className="text-[11px] text-rose-200 font-medium">
            ID Relawan: <strong className="text-white font-mono">{donor.volunteer_id}</strong>
          </p>
        </div>

        {/* Big Blood Badge */}
        <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-red-600 flex flex-col items-center justify-center shadow-md border-2 border-red-200">
          <span className="text-lg sm:text-xl font-black leading-none">
            {donor.blood_group}+
          </span>
          <span className="text-[9px] font-extrabold tracking-wider uppercase text-red-700 mt-0.5">
            RHESUS +
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/15 text-left">
        <div>
          <div className="text-[10px] uppercase font-bold text-rose-200 tracking-wider">
            Total Donor Resmi
          </div>
          <div className="text-lg font-black tracking-tight mt-0.5">
            {donor.total_donations} Kali
          </div>
          <div className="text-[10px] text-rose-200">
            {donor.total_volume_ml.toLocaleString('id-ID')} ml Tersalurkan
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase font-bold text-rose-200 tracking-wider">
            Estimasi Jiwa Terbantu
          </div>
          <div className="text-lg font-black tracking-tight mt-0.5">
            ~{donor.lives_saved_estimate} Jiwa
          </div>
          <div className="text-[10px] text-rose-200">
            Komponen WB & PRC
          </div>
        </div>
      </div>

      {/* Milestone Pill Banner */}
      <div 
        onClick={onOpenHistory}
        className="mt-4 bg-black/20 hover:bg-black/30 backdrop-blur-xs rounded-xl p-2.5 flex items-center gap-3 border border-white/10 cursor-pointer transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-red-500/80 flex flex-col items-center justify-center text-center shrink-0 border border-white/20">
          <span className="text-[11px] font-black leading-none">{donor.days_until_next}</span>
          <span className="text-[7px] font-extrabold tracking-tighter uppercase leading-none mt-0.5">
            HARI LAGI
          </span>
        </div>

        <div className="flex-1 min-w-0 text-left">
          <div className="text-[11px] font-bold text-white truncate">
            Jadwal Donor Berikutnya: <span className="text-amber-300 font-extrabold">{donor.next_eligible_date}</span>
          </div>
          <div className="text-[10px] text-rose-200 flex items-center gap-1">
            <span>🏅 2 kali lagi menuju Satyalancana PMI</span>
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-white/60 shrink-0" />
      </div>

      {/* Action Buttons: Riwayat Lab & Cetak Surat Bukti */}
      <div className="mt-3.5 grid grid-cols-2 gap-2">
        <button
          onClick={onOpenHistory}
          className="px-2.5 py-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-xs rounded-xl text-[11px] font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/20"
        >
          <Calendar className="w-3.5 h-3.5 text-rose-200" />
          <span>Riwayat Medis</span>
        </button>

        <button
          onClick={onOpenCertificate}
          className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 rounded-xl text-[11px] font-black text-slate-900 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Award className="w-3.5 h-3.5 text-slate-900" />
          <span>Cetak Surat Bukti</span>
        </button>
      </div>

    </div>
  );
};
