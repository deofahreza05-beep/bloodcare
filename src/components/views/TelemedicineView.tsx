import React from 'react';
import { MessageSquare, Stethoscope, Star, ShieldCheck, Clock, Calendar } from 'lucide-react';
import { Doctor } from '../../types';

interface TelemedicineViewProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

export const TelemedicineView: React.FC<TelemedicineViewProps> = ({ doctors, onSelectDoctor }) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div>
        <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
          Layanan Telemedisin Terpadu
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Konsultasi Dokter Spesialis Hematologi & PMI
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Konsultasi gratis seputar anemia, hemoglobin rendah, persiapan flebotomi, dan kelayakan donor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img
                    src={doc.avatar_url}
                    alt={doc.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-red-100"
                  />
                  {doc.is_online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      {doc.is_online ? 'Online 24/7' : 'Offline'}
                    </span>
                    <span className="flex items-center text-[11px] font-bold text-amber-500 ml-1">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                      {doc.rating}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 truncate mt-1">
                    {doc.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium truncate">
                    {doc.hospital}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="font-semibold text-slate-800">
                  {doc.specialty}
                </div>
                <div className="text-[11px] text-slate-400">
                  Pengalaman: {doc.experience_years} Tahun • {doc.sip_number}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Biaya Sesi</span>
                <span className="text-xs font-black text-emerald-600 uppercase">Gratis (Subsidi PMI)</span>
              </div>

              <button
                onClick={() => onSelectDoctor(doc)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Konsultasi Sekarang</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
