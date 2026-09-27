import React, { useState } from 'react';
import { X, Heart, Building2, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BloodRequest, Donor } from '../../types';

interface DonationPledgeModalProps {
  request: BloodRequest | null;
  donor: Donor;
  onClose: () => void;
  onConfirmPledge: (requestId: number, bags: number) => void;
}

export const DonationPledgeModal: React.FC<DonationPledgeModalProps> = ({
  request,
  donor,
  onClose,
  onConfirmPledge,
}) => {
  const [pledgedBags, setPledgedBags] = useState<number>(1);
  const [arrivalSlot, setArrivalSlot] = useState<string>('Hari ini, 1-2 Jam ke depan');
  const [isCheckHealthy, setIsCheckHealthy] = useState<boolean>(true);
  const [isCheckRest, setIsCheckRest] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCheckHealthy || !isCheckRest) return;
    onConfirmPledge(request.id, pledgedBags);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-red-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Ikrar Bantuan Donor Darah
              </h3>
              <p className="text-xs text-slate-500">
                Penyelamatan Pasien Darurat BloodCare
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Terima Kasih, Orang Baik!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Ikrar bantuan {pledgedBags} kantong darah telah dikonfirmasi dan diberitahukan ke pihak rumah sakit {request.health_facility_name}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            
            {/* Patient Context Box */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                    Penerima Donor
                  </span>
                  <div className="text-sm font-extrabold text-slate-900">
                    {request.patient_name} ({request.patient_age} Thn)
                  </div>
                  <div className="text-xs text-slate-600">
                    {request.diagnosis}
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex flex-col items-center justify-center font-black">
                  <span className="text-sm leading-none">{request.blood_group}{request.rhesus}</span>
                  <span className="text-[9px] font-bold uppercase">{request.component}</span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {request.health_facility_name}
                </span>
                <span className="font-bold text-red-600">
                  Sisa {request.bags_needed - request.bags_fulfilled} Kantong Lagi
                </span>
              </div>
            </div>

            {/* Donor Identity */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-600">Pendonor:</span>
              <strong className="text-slate-900 font-bold">{donor.full_name} ({donor.blood_group}{donor.rhesus})</strong>
            </div>

            {/* Input Jumlah Kantong */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Kantong yang Dapat Didonorkan
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPledgedBags(num)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      pledgedBags === num
                        ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {num} Kantong ({num * 350} ml)
                  </button>
                ))}
              </div>
            </div>

            {/* Estimasi Kedatangan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Perkiraan Waktu Kedatangan ke RS/UDD
              </label>
              <select
                value={arrivalSlot}
                onChange={(e) => setArrivalSlot(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-hidden focus:border-red-500"
              >
                <option value="Hari ini, 1-2 Jam ke depan">Hari ini, Segera (1 - 2 Jam ke depan)</option>
                <option value="Hari ini, Sore (16:00 - 18:00 WIB)">Hari ini, Sore (16:00 - 18:00 WIB)</option>
                <option value="Besok Pagi (08:00 - 10:00 WIB)">Besok Pagi (08:00 - 10:00 WIB)</option>
              </select>
            </div>

            {/* Checklist Syarat */}
            <div className="space-y-2 pt-1 text-xs">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCheckHealthy}
                  onChange={(e) => setIsCheckHealthy(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 mt-0.5"
                />
                <span className="text-slate-600 leading-snug">
                  Saya dalam kondisi sehat, tidak sedang demam, flu, atau konsumsi antibiotik.
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCheckRest}
                  onChange={(e) => setIsCheckRest(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 mt-0.5"
                />
                <span className="text-slate-600 leading-snug">
                  Tidur minimal 5 jam semalam dan telah makan sebelum ke lokasi donor.
                </span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!isCheckHealthy || !isCheckRest}
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-sm"
              >
                Konfirmasi Ikrar Donor
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
