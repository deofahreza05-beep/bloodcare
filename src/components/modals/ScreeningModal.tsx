import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertOctagon, Heart, QrCode } from 'lucide-react';
import { Screening } from '../../types';

interface ScreeningModalProps {
  onClose: () => void;
  onScreeningCompleted: (screening: Screening) => void;
}

export const ScreeningModal: React.FC<ScreeningModalProps> = ({
  onClose,
  onScreeningCompleted,
}) => {
  const [weight, setWeight] = useState(68);
  const [systolic, setSystolic] = useState(118);
  const [diastolic, setDiastolic] = useState(78);
  const [hb, setHb] = useState(14.2);
  const [sleepHours, setSleepHours] = useState(7);
  const [hasFever, setHasFever] = useState(false);
  const [hasAntibiotics, setHasAntibiotics] = useState(false);
  const [hasTattooRecent, setHasTattooRecent] = useState(false);
  const [isPregnantOrNursing, setIsPregnantOrNursing] = useState(false);

  const [result, setResult] = useState<'fit' | 'unfit' | null>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();

    const isFit =
      weight >= 45 &&
      systolic >= 100 &&
      systolic <= 160 &&
      diastolic >= 70 &&
      diastolic <= 100 &&
      hb >= 12.5 &&
      sleepHours >= 5 &&
      !hasFever &&
      !hasAntibiotics &&
      !hasTattooRecent &&
      !isPregnantOrNursing;

    const screeningData: Screening = {
      id: Date.now(),
      user_id: 1,
      donor_name: 'dr. Adi Putra, M.Biomed',
      body_weight_kg: weight,
      blood_pressure_systolic: systolic,
      blood_pressure_diastolic: diastolic,
      hemoglobin_level: hb,
      sleep_hours: sleepHours,
      is_healthy: isFit,
      status: isFit ? 'fit' : 'unfit',
      valid_until: '24 Jam ke Depan',
      qr_code_token: 'BC-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      created_at: new Date().toISOString(),
    };

    setResult(screeningData.status);
    onScreeningCompleted(screeningData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-emerald-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Skrining Mandiri Kelayakan Donor
              </h3>
              <p className="text-xs text-slate-500">
                Uji cepat standar Palang Merah Indonesia (PMI)
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

        {/* Form Body */}
        {result ? (
          <div className="p-6 text-center space-y-4">
            {result === 'fit' ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Hasil: SIAP DONOR (Fit)
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900 pt-2">
                    Selamat! Anda Layak Mendonorkan Darah
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Fast-Pass QR Code Anda telah diperbarui dan berlaku untuk 24 jam ke depan di semua UDD & Bus PMI.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <AlertOctagon className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Belum Memenuhi Syarat Saat Ini
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900 pt-2">
                    Istirahat & Pulihkan Tubuh Terlebih Dahulu
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Kondisi tensi, Hb, jam tidur, atau obat belum memenuhi batas aman donor. Silakan konsultasi dokter atau coba kembali esok hari.
                  </p>
                </div>
              </>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              Tutup & Tampilkan Fast-Pass
            </button>
          </div>
        ) : (
          <form onSubmit={handleEvaluate} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Vitals Grid */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <span className="text-[11px] font-bold text-slate-700 block">
                Parameter Fisik & Tanda Vital
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Berat Badan (kg) *
                  </label>
                  <input
                    type="number"
                    min="35"
                    max="150"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400">Min. 45 kg</span>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Jam Tidur Semalam *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400">Min. 5 jam</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Tekanan Darah (Sistolik/Diastolik)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={systolic}
                      onChange={(e) => setSystolic(Number(e.target.value))}
                      placeholder="120"
                      className="w-1/2 text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800 text-center"
                    />
                    <span className="text-slate-400">/</span>
                    <input
                      type="number"
                      value={diastolic}
                      onChange={(e) => setDiastolic(Number(e.target.value))}
                      placeholder="80"
                      className="w-1/2 text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800 text-center"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">Normal 100-160 / 70-100</span>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Estimasi Kadar Hb (g/dL)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={hb}
                    onChange={(e) => setHb(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400">Normal 12.5 - 17.0 g/dL</span>
                </div>
              </div>
            </div>

            {/* Health Checklist Questions */}
            <div className="space-y-2.5 text-xs">
              <span className="text-[11px] font-bold text-slate-700 block">
                Pertanyaan Riwayat Kesehatan
              </span>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                <span className="text-slate-700 font-medium">
                  Apakah Anda sedang demam, flu, batuk, atau tidak enak badan?
                </span>
                <input
                  type="checkbox"
                  checked={hasFever}
                  onChange={(e) => setHasFever(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-4 h-4 ml-2"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                <span className="text-slate-700 font-medium">
                  Ada konsumsi obat antibiotik dalam 3 hari terakhir?
                </span>
                <input
                  type="checkbox"
                  checked={hasAntibiotics}
                  onChange={(e) => setHasAntibiotics(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-4 h-4 ml-2"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                <span className="text-slate-700 font-medium">
                  Tato, tindik, atau tindakan cabut gigi dalam 6 bulan terakhir?
                </span>
                <input
                  type="checkbox"
                  checked={hasTattooRecent}
                  onChange={(e) => setHasTattooRecent(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-4 h-4 ml-2"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                <span className="text-slate-700 font-medium">
                  Sedang hamil atau menyusui? (khusus wanita)
                </span>
                <input
                  type="checkbox"
                  checked={isPregnantOrNursing}
                  onChange={(e) => setIsPregnantOrNursing(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-4 h-4 ml-2"
                />
              </label>
            </div>

            {/* Action buttons */}
            <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Cek Kelayakan Sekarang</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
