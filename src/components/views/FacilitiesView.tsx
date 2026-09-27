import React, { useState } from 'react';
import { Building2, Phone, MapPin, Search, Clock, CheckCircle2 } from 'lucide-react';
import { HealthFacility } from '../../types';

interface FacilitiesViewProps {
  facilities: HealthFacility[];
  activeCity?: string;
  onSelectCity?: (city: string) => void;
  onOpenNewRequest?: () => void;
}

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({ facilities, activeCity = 'Pekanbaru, Riau', onSelectCity, onOpenNewRequest }) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Semua');
  const [selectedCityFilter, setSelectedCityFilter] = useState(activeCity);

  const filtered = facilities.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.address.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'Semua' || f.type === filterType;
    
    // City filter
    let matchesCity = true;
    if (selectedCityFilter && selectedCityFilter !== 'Semua Wilayah') {
      const c = selectedCityFilter.split(',')[0].toLowerCase().trim();
      matchesCity = f.city.toLowerCase().includes(c) || f.name.toLowerCase().includes(c);
    }

    return matchesSearch && matchesType && matchesCity;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
            Jaringan Faskes & Bank Darah
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Pencarian Rumah Sakit & Posko UDD PMI
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data ketersediaan stok darah per golongan di seluruh fasilitas kesehatan mitra
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama rumah sakit, posko PMI, atau alamat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['Semua Tipe', 'RSUD', 'UDD PMI', 'RS Swasta', 'Posko Keliling'].map((t) => {
              const val = t === 'Semua Tipe' ? 'Semua' : t;
              return (
                <button
                  key={t}
                  onClick={() => setFilterType(val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    filterType === val
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick City Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-bold text-slate-500 mr-1 shrink-0">Wilayah:</span>
          {['Semua Wilayah', 'Pekanbaru, Riau', 'Kampar, Riau', 'Dumai, Riau', 'Siak, Riau', 'Padang, Sumbar'].map((c) => {
            const isSelected = selectedCityFilter === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setSelectedCityFilter(c);
                  if (onSelectCity) onSelectCity(c);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-red-50 text-red-700 border border-red-200 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c.split(',')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/60">
                  {fac.type}
                </span>

                {fac.is_24_hours && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    Layanan 24 Jam
                  </span>
                )}
              </div>

              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {fac.name}
              </h3>

              <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{fac.address}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <a href={`tel:${fac.phone}`} className="font-semibold hover:underline">
                  {fac.phone}
                </a>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Jarak: ~{fac.distance_km} km</span>
              </div>

              {/* Stock Mini Grid */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-700 mb-2">
                  Stok Darah Tersedia:
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {fac.blood_stocks &&
                    Object.entries(fac.blood_stocks).slice(0, 4).map(([bg, count]) => (
                      <div
                        key={bg}
                        className={`p-1.5 rounded-lg border text-xs ${
                          count < 5
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="font-extrabold text-[11px]">{bg}</div>
                        <div className="font-black text-sm">{count}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Bank Darah Terverifikasi
              </span>

              <div className="flex items-center gap-1.5">
                {onOpenNewRequest && (
                  <button
                    onClick={onOpenNewRequest}
                    className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl transition-colors border border-red-200"
                  >
                    Butuh Darah di Sini
                  </button>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fac.name + ' ' + fac.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-2xs"
                >
                  Navigasi
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
