import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { DonationSchedule } from '../../types';

interface SchedulesViewProps {
  schedules: DonationSchedule[];
  onBookSlot: (schedule: DonationSchedule) => void;
}

export const SchedulesView: React.FC<SchedulesViewProps> = ({ schedules, onBookSlot }) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div>
        <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
          Posko & Unit Donor Darah (UDD)
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Jadwal Donor Darah & Bus Keliling Pekanbaru
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Daftarkan slot waktu donor Anda untuk menghindari antrean di posko PMI
        </p>
      </div>

      <div className="space-y-4">
        {schedules.map((sc) => {
          const percent = Math.min(100, Math.round((sc.collected_bags / sc.target_bags) * 100));
          return (
            <div
              key={sc.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {sc.type}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Bebas Antre Online
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">
                  {sc.title}
                </h3>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {sc.location_name} ({sc.address})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {sc.date} • {sc.start_time} - {sc.end_time} WIB
                  </span>
                </div>

                {/* Progress */}
                <div className="max-w-md pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span>Target Posko: {sc.target_bags} Kantong</span>
                    <span>{sc.collected_bags} Terkumpul ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end">
                <button
                  onClick={() => onBookSlot(sc)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Booking Slot Antrean</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
