import React from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Share2, 
  Clock, 
  User, 
  PlusCircle, 
  Building2,
  CheckCircle 
} from 'lucide-react';
import { BloodRequest } from '../types';

interface EmergencyRequestsListProps {
  requests: BloodRequest[];
  onBantuSekarang: (request: BloodRequest) => void;
  onOpenNewRequestModal: () => void;
  onShareWhatsApp: (request: BloodRequest) => void;
}

export const EmergencyRequestsList: React.FC<EmergencyRequestsListProps> = ({
  requests,
  onBantuSekarang,
  onOpenNewRequestModal,
  onShareWhatsApp,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-extrabold text-base">✱</span>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight">
            Permintaan Darah Darurat Aktif
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[11px] font-medium text-slate-400">
            Update otomatis setiap 30 detik
          </span>
          <button
            onClick={onOpenNewRequestModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl border border-red-200 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Buat Permintaan</span>
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3.5">
        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              Tidak Ada Permintaan Darah Kritis yang Cocok
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Saat ini stok darah untuk kriteria filter ini dalam kondisi stabil, atau tidak ada pasien darurat aktif di wilayah yang dipilih.
            </p>
          </div>
        ) : (
          requests.map((item) => {
            const percent = Math.min(100, Math.round((item.bags_fulfilled / item.bags_needed) * 100));
          
          // Theme variants based on blood urgency / type
          let circleBg = 'bg-red-600 text-white';
          let borderAccent = 'border-l-4 border-l-red-600';
          let topBadgeStyle = 'bg-red-100 text-red-700';
          let progressBg = 'bg-red-600';
          let buttonBg = 'bg-red-600 hover:bg-red-700 text-white';

          if (item.component === 'TC' || item.urgency === 'tinggi') {
            circleBg = 'bg-blue-600 text-white';
            borderAccent = 'border-l-4 border-l-blue-600';
            topBadgeStyle = 'bg-blue-100 text-blue-700';
            progressBg = 'bg-blue-600';
            buttonBg = 'bg-blue-600 hover:bg-blue-700 text-white';
          } else if (item.urgency === 'rutin' || item.component === 'WB') {
            circleBg = 'bg-emerald-700 text-white';
            borderAccent = 'border-l-4 border-l-emerald-600';
            topBadgeStyle = 'bg-emerald-100 text-emerald-800';
            progressBg = 'bg-emerald-600';
            buttonBg = 'bg-emerald-700 hover:bg-emerald-800 text-white';
          }

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all ${borderAccent}`}
            >
              <div className="flex items-start justify-between gap-3">
                
                {/* Left Info Area */}
                <div className="flex-1 min-w-0">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${topBadgeStyle}`}>
                      ● {item.urgency_badge || 'BUTUH SEGERA'}
                    </span>
                    {item.case_badge && (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                        {item.case_badge}
                      </span>
                    )}
                    {item.status === 'terpenuhi' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        Terpenuhi
                      </span>
                    )}
                  </div>

                  {/* Patient Name & Diagnosis */}
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {item.patient_name}{' '}
                    <span className="text-slate-500 font-medium text-xs sm:text-sm">
                      ({item.patient_age} Tahun)
                    </span>{' '}
                    <span className="text-slate-700 font-semibold text-xs sm:text-sm">
                      — {item.diagnosis}
                    </span>
                  </h3>

                  {/* Hospital & Location */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-700">{item.health_facility_name}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{item.location_detail}</span>
                  </div>

                  {/* Need Progress */}
                  <div className="mt-3 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">
                        Kebutuhan: <strong className="text-slate-900">{item.bags_needed} Kantong</strong>{' '}
                        <span className="font-semibold text-slate-500">
                          {item.component === 'PRC' ? 'Packed Red Cells (PRC)' : item.component === 'TC' ? 'Trombosit Konsentrat (TC)' : item.component === 'WB' ? 'Whole Blood (WB)' : 'Fresh Frozen Plasma (FFP)'}
                        </span>
                      </span>
                      <span className={`text-[11px] font-extrabold ${percent >= 100 ? 'text-emerald-600' : 'text-slate-600'}`}>
                        {item.bags_fulfilled} dari {item.bags_needed} Terpenuhi ({percent}%)
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${progressBg}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Meta Details: Deadline & In Charge */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500" />
                      <span>
                        Batas Waktu: <strong className="text-slate-700">{item.deadline_text}</strong>
                      </span>
                    </div>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>
                        PJ: <strong className="text-slate-700">{item.doctor_in_charge}</strong>
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right Blood Badge Circle */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${circleBg} flex flex-col items-center justify-center shadow-md`}>
                    <span className="text-base sm:text-lg font-black leading-none">
                      {item.blood_group}{item.rhesus}
                    </span>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-90 mt-0.5">
                      {item.component}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons Row */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onShareWhatsApp(item)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Bagikan (WA)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onBantuSekarang(item)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all ${buttonBg}`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Bantu Sekarang</span>
                </button>
              </div>

            </div>
          );
        })
      )}
    </div>
    </div>
  );
};
