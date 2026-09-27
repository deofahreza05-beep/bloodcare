import React from 'react';
import { Filter, Search, CheckCircle2, ChevronDown } from 'lucide-react';
import { BloodGroup, Rhesus, BloodComponent } from '../types';

interface BloodFilterSectionProps {
  selectedBloodGroup: BloodGroup | 'Semua';
  onSelectBloodGroup: (bg: BloodGroup | 'Semua') => void;
  selectedRhesus: Rhesus | null;
  onSelectRhesus: (rh: Rhesus | null) => void;
  selectedComponent: BloodComponent | null;
  onSelectComponent: (comp: BloodComponent | null) => void;
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
  activeCity: string;
  matchCount: number;
}

export const BloodFilterSection: React.FC<BloodFilterSectionProps> = ({
  selectedBloodGroup,
  onSelectBloodGroup,
  selectedRhesus,
  onSelectRhesus,
  selectedComponent,
  onSelectComponent,
  selectedLocation,
  onSelectLocation,
  activeCity,
  matchCount,
}) => {
  const bloodGroups: (BloodGroup | 'Semua')[] = ['Semua', 'A', 'B', 'AB', 'O'];
  const components: { id: BloodComponent; label: string }[] = [
    { id: 'WB', label: 'Whole Blood (WB)' },
    { id: 'PRC', label: 'Packed Red Cell (PRC)' },
    { id: 'TC', label: 'Trombosit Konsentrat (TC)' },
    { id: 'FFP', label: 'Fresh Frozen Plasma (FFP)' },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
              Pusat Filter Kebutuhan Darah
            </h2>
            <p className="text-[11px] text-slate-500">
              Koneksi langsung dengan Rumah Sakit & Bank Darah di <span className="font-semibold text-red-600">{activeCity}</span>
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold self-start sm:self-auto border border-red-200/60">
          <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
          <span>{matchCount} Kebutuhan di {activeCity.split(',')[0]}</span>
        </div>
      </div>

      {/* Main Filter Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
        
        {/* Wilayah Pantauan */}
        <div className="lg:col-span-4">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            Wilayah Pantauan
          </label>
          <div className="relative">
            <select
              value={activeCity}
              onChange={(e) => onSelectLocation(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl px-3 py-2 pr-8 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer"
            >
              <option value="Semua Wilayah">Semua Wilayah (Seluruh Riau & Sumbar)</option>
              <option value="Pekanbaru, Riau">Pekanbaru, Riau (Pusat & RS Rujukan)</option>
              <option value="Kampar, Riau">Kampar, Riau (Bangkinang & Sekitarnya)</option>
              <option value="Dumai, Riau">Dumai, Riau (Pesisir & RSUD Dumai)</option>
              <option value="Siak, Riau">Siak, Riau (Siak Sri Indrapura)</option>
              <option value="Padang, Sumbar">Padang, Sumbar (RSUP M. Djamil & Sekitar)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Golongan Darah Pasien */}
        <div className="lg:col-span-5">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            Golongan Darah Pasien
          </label>
          <div className="grid grid-cols-5 gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            {bloodGroups.map((bg) => {
              const isSelected = selectedBloodGroup === bg;
              return (
                <button
                  key={bg}
                  type="button"
                  onClick={() => onSelectBloodGroup(bg)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {bg}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rhesus & Aksi */}
        <div className="lg:col-span-3">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            Rhesus & Aksi
          </label>
          <div className="flex items-center gap-1.5">
            {/* Rhesus + */}
            <button
              type="button"
              onClick={() => onSelectRhesus(selectedRhesus === '+' ? null : '+')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                selectedRhesus === '+'
                  ? 'border-red-600 bg-red-50 text-red-600 ring-1 ring-red-600'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              + Pos
            </button>

            {/* Rhesus - */}
            <button
              type="button"
              onClick={() => onSelectRhesus(selectedRhesus === '-' ? null : '-')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                selectedRhesus === '-'
                  ? 'border-red-600 bg-red-50 text-red-600 ring-1 ring-red-600'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              - Neg
            </button>

            {/* Cari Button */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('requests-list-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs shrink-0 cursor-pointer"
              title="Terapkan Filter & Lihat Pasien"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cari</span>
            </button>
          </div>
        </div>

      </div>

      {/* Component Pills */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] font-bold text-slate-500 mr-1">Komponen:</span>
        {components.map((comp) => {
          const isSelected = selectedComponent === comp.id;
          return (
            <button
              key={comp.id}
              type="button"
              onClick={() => onSelectComponent(isSelected ? null : comp.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                isSelected
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {comp.label}
            </button>
          );
        })}
        {selectedComponent && (
          <button
            onClick={() => onSelectComponent(null)}
            className="text-[11px] text-red-600 hover:underline ml-1 font-semibold"
          >
            Reset
          </button>
        )}
      </div>

    </div>
  );
};
