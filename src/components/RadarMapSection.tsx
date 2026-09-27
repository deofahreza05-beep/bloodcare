import React, { useState } from 'react';
import { Radio, Navigation, MapPin, CheckCircle, ExternalLink, Info } from 'lucide-react';

interface RadarMapSectionProps {
  onOpenFacilitiesTab: () => void;
}

export const RadarMapSection: React.FC<RadarMapSectionProps> = ({ onOpenFacilitiesTab }) => {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const pins = [
    {
      id: 'rsud',
      name: 'RSUD Arifin Achmad (O+ Kritis)',
      type: 'kritis',
      address: 'Jl. Diponegoro No.2, Pekanbaru',
      status: 'Kebutuhan Darurat O+ & PRC',
      color: 'bg-red-600',
      textColor: 'text-red-700',
      borderColor: 'border-red-600',
      x: '38%',
      y: '42%',
    },
    {
      id: 'udd',
      name: 'UDD PMI Jl. Diponegoro (Buka 24 Jam)',
      type: 'udd',
      address: 'Jl. Diponegoro No.15, Pekanbaru',
      status: 'Stok: A+, B+, O+ Siaga Transfusi',
      color: 'bg-emerald-700',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-700',
      x: '24%',
      y: '58%',
    },
    {
      id: 'bus',
      name: 'Bus Donor Mall SKA (s/d 21:00)',
      type: 'bus',
      address: 'Pintu Timur Mall SKA, Jl. Tuanku Tambusai',
      status: 'Target 50 Kantong • Terkumpul 38',
      color: 'bg-blue-600',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-600',
      x: '58%',
      y: '48%',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-800">
              Peta Radar Stok Darah & Posko PMI Terkini
            </h2>
            <p className="text-[11px] text-slate-500">
              Pantauan radius 15 km Pekanbaru Kota, Riau
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Sinkronisasi GPS Aktif</span>
        </div>
      </div>

      {/* Interactive Map Visual */}
      <div className="relative w-full h-[270px] sm:h-[310px] rounded-xl overflow-hidden bg-[#eaf2f8] border border-slate-200 select-none">
        
        {/* Vector stylized map landscape */}
        <svg className="w-full h-full absolute inset-0 opacity-80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d5e3ec" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* River Siak representation */}
          <path
            d="M -20,80 Q 150,110 320,85 T 600,105 T 900,80"
            fill="none"
            stroke="#a9cde2"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Green areas (Parks/Forests) */}
          <ellipse cx="65%" cy="30%" rx="90" ry="45" fill="#d2eadb" opacity="0.7" />
          <ellipse cx="18%" cy="75%" rx="70" ry="35" fill="#d2eadb" opacity="0.6" />
          <ellipse cx="80%" cy="80%" rx="100" ry="50" fill="#d2eadb" opacity="0.5" />

          {/* Main Roads / Arterials */}
          <path d="M 80,0 L 220,320" stroke="#fefefe" strokeWidth="6" />
          <path d="M 0,160 Q 300,170 800,190" stroke="#fefefe" strokeWidth="7" />
          <path d="M 320,0 L 390,320" stroke="#ffd27d" strokeWidth="5" />
          <path d="M 150,220 L 700,240" stroke="#fefefe" strokeWidth="5" />
          <path d="M 500,0 L 520,320" stroke="#fefefe" strokeWidth="4" />

          {/* Radar sweep circles */}
          <circle cx="45%" cy="50%" r="80" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <circle cx="45%" cy="50%" r="140" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
        </svg>

        {/* Landmark labels in map */}
        <div className="absolute top-4 right-16 text-[10px] font-bold text-slate-500 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs pointer-events-none">
          Universitas Awal Bros
        </div>
        <div className="absolute top-12 left-10 text-[10px] font-semibold text-slate-500 bg-white/70 px-1.5 py-0.5 rounded pointer-events-none">
          Masjid Raya An-Nur
        </div>
        <div className="absolute bottom-14 left-1/3 text-[10px] font-semibold text-slate-500 bg-white/70 px-1.5 py-0.5 rounded pointer-events-none">
          Pekanbaru Kota
        </div>
        <div className="absolute bottom-5 right-8 text-[10px] font-bold text-slate-400 pointer-events-none">
          Agro Wisata Payung Sekaki
        </div>
        <div className="absolute bottom-3 left-10 text-[10px] font-semibold text-slate-400 pointer-events-none">
          ✈ Bandara SSK II
        </div>

        {/* Live Interactive Pins matching screenshot */}
        {pins.map((pin) => {
          const isSelected = selectedPin === pin.id;
          return (
            <div
              key={pin.id}
              style={{ left: pin.x, top: pin.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onClick={() => setSelectedPin(isSelected ? null : pin.id)}
            >
              {/* Pin Banner Badge */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-black text-white ${pin.color} shadow-md border border-white/90 hover:scale-105 transition-transform whitespace-nowrap`}>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>{pin.name}</span>
              </div>

              {/* Pin Triangle Pointer */}
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-800 mx-auto -mt-[1px] opacity-75"></div>

              {/* Tooltip / Popup when clicked */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-white rounded-xl shadow-xl p-2.5 border border-slate-200 text-left z-30 animate-in fade-in zoom-in-95">
                  <div className={`text-xs font-bold ${pin.textColor}`}>{pin.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{pin.address}</div>
                  <div className="text-[10px] font-semibold text-slate-700 bg-slate-50 p-1 rounded mt-1.5">
                    {pin.status}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenFacilitiesTab();
                    }}
                    className="w-full mt-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-lg text-center transition-colors"
                  >
                    Lihat Ketersediaan Faskes
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Center Radar Compass indicator */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-600 border border-slate-200">
          Radius: <strong className="text-slate-900">15 KM</strong>
        </div>

      </div>

      {/* Footer Indicators & Action */}
      <div className="mt-3 pt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
            3 Kebutuhan Kritis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
            2 Posko UDD Siaga
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            1 Bus Keliling
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenFacilitiesTab}
          className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Buka Navigasi Rute Cepat</span>
        </button>
      </div>

    </div>
  );
};
