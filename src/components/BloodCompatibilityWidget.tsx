import React, { useState } from 'react';
import { Droplet, ArrowRight, ShieldCheck, HeartHandshake, Info } from 'lucide-react';
import { BloodGroup, Rhesus } from '../types';

export const BloodCompatibilityWidget: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O');
  const [selectedRhesus, setSelectedRhesus] = useState<Rhesus>('+');

  const fullBlood = `${selectedGroup}${selectedRhesus}`;

  // Compatibility database matrix
  const compatibilityMap: Record<
    string,
    {
      canDonateTo: string[];
      canReceiveFrom: string[];
      isUniversalDonor?: boolean;
      isUniversalRecipient?: boolean;
      description: string;
    }
  > = {
    'O-': {
      canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-'],
      isUniversalDonor: true,
      description: 'Pendonor Darah Universal Sel Darah Merah (Eritrosit). Sangat dibutuhkan untuk pertolongan darurat gawat darurat.',
    },
    'O+': {
      canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
      canReceiveFrom: ['O+', 'O-'],
      description: 'Golongan darah paling banyak dibutuhkan di rumah sakit. Sangat krusial untuk operasi dan penanganan trauma.',
    },
    'A-': {
      canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
      canReceiveFrom: ['A-', 'O-'],
      description: 'Dapat mendonorkan ke seluruh resipien A dan AB baik rhesus negatif maupun positif.',
    },
    'A+': {
      canDonateTo: ['A+', 'AB+'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      description: 'Salah satu golongan darah paling umum dan sering dibutuhkan untuk pasien bedah umum.',
    },
    'B-': {
      canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['B-', 'O-'],
      description: 'Golongan langka di Indonesia. Pendonor B- sangat disarankan rutin berpartisipasi di UDD PMI.',
    },
    'B+': {
      canDonateTo: ['B+', 'AB+'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      description: 'Sangat vital untuk pasien demam berdarah (trombosit) dan anemia hemolitik.',
    },
    'AB-': {
      canDonateTo: ['AB-', 'AB+'],
      canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
      description: 'Golongan darah paling langka (< 1% populasi). Setiap kantong darah AB- disimpan dalam prioritas tinggi.',
    },
    'AB+': {
      canDonateTo: ['AB+'],
      canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      isUniversalRecipient: true,
      description: 'Resipien Universal Sel Darah Merah. Pasien AB+ dapat menerima transfusi sel darah dari semua golongan darah.',
    },
  };

  const currentInfo = compatibilityMap[fullBlood] || compatibilityMap['O+'];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black">
            <Droplet className="w-5 h-5 fill-red-600 text-red-600" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800">
              Kalkulator Kompatibilitas Transfusi Darah
            </h3>
            <p className="text-[11px] text-slate-500">
              Cek kecocokan donor & resipien berdasarkan antigen ABO dan faktor Rhesus
            </p>
          </div>
        </div>

        {/* Selected Blood Indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-black border border-red-200">
          <span>Golongan Dipilih:</span>
          <span className="text-sm underline decoration-2">{fullBlood}</span>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        
        {/* Blood Group Select */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-2">
            Pilih Golongan Darah (ABO):
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['A', 'B', 'AB', 'O'] as BloodGroup[]).map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedGroup(bg)}
                className={`py-2 text-xs font-black rounded-xl transition-all ${
                  selectedGroup === bg
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Rhesus Select */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-2">
            Pilih Faktor Rhesus (Rh):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['+', '-'] as Rhesus[]).map((rh) => (
              <button
                key={rh}
                onClick={() => setSelectedRhesus(rh)}
                className={`py-2 text-xs font-black rounded-xl transition-all ${
                  selectedRhesus === rh
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {rh === '+' ? 'Rhesus Positif (+)' : 'Rhesus Negatif (-)'}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Badges / Universal Notice */}
      {currentInfo.isUniversalDonor && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2.5 text-xs text-amber-900 font-medium">
          <span className="text-xl">🌟</span>
          <span>
            <strong>Pendonor Universal (O-):</strong> Darah Anda dapat diberikan kepada semua orang dalam keadaan darurat ketika golongan darah pasien belum sempat diuji lab!
          </span>
        </div>
      )}

      {currentInfo.isUniversalRecipient && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
          <span className="text-xl">🛡️</span>
          <span>
            <strong>Resipien Universal (AB+):</strong> Anda dapat menerima transfusi darah dari semua golongan darah (A, B, AB, maupun O) jika membutuhkan.
          </span>
        </div>
      )}

      {/* Results Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        
        {/* Can Donate To */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-red-900 uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-red-600" />
              Dapat Mendonorkan Ke:
            </span>
            <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
              {currentInfo.canDonateTo.length} Golongan
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-2">
            {currentInfo.canDonateTo.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-white border border-red-300 text-red-700 font-black text-xs rounded-xl shadow-xs"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
            Pasien dengan golongan darah di atas aman menerima sel darah merah Anda.
          </p>
        </div>

        {/* Can Receive From */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Dapat Menerima Darah Dari:
            </span>
            <span className="text-[11px] font-bold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded-full">
              {currentInfo.canReceiveFrom.length} Golongan
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {currentInfo.canReceiveFrom.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-white border border-slate-300 text-slate-800 font-black text-xs rounded-xl shadow-xs"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
            Jika Anda memerlukan transfusi, rumah sakit dapat menggunakan darah dari golongan di atas.
          </p>
        </div>

      </div>

      {/* Description Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>{currentInfo.description}</span>
      </div>

    </div>
  );
};
