import React from 'react';
import { Home, HeartHandshake, Stethoscope, Building2, AlertCircle } from 'lucide-react';
import { ActiveTab } from './SubNavbar';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenNewRequest: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenNewRequest,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        
        {/* Landing Page */}
        <button
          onClick={() => onTabChange('landing')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'landing' ? 'text-red-600 font-bold' : 'text-slate-500 font-medium hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'landing' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5">Beranda</span>
        </button>

        {/* Dashboard & Radar */}
        <button
          onClick={() => onTabChange('beranda')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'beranda' ? 'text-red-600 font-bold' : 'text-slate-500 font-medium hover:text-slate-800'
          }`}
        >
          <HeartHandshake className={`w-5 h-5 ${activeTab === 'beranda' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5">Radar Darurat</span>
        </button>

        {/* Central Floating Emergency CTA: Butuh Darah */}
        <button
          onClick={onOpenNewRequest}
          className="-mt-5 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/40 active:scale-95 transition-transform cursor-pointer border-2 border-white"
          title="Permintaan Darah Darurat Cepat"
        >
          <AlertCircle className="w-6 h-6 stroke-[2.5] animate-pulse" />
        </button>

        {/* Faskes & RS */}
        <button
          onClick={() => onTabChange('faskes')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'faskes' ? 'text-red-600 font-bold' : 'text-slate-500 font-medium hover:text-slate-800'
          }`}
        >
          <Building2 className={`w-5 h-5 ${activeTab === 'faskes' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5">Faskes PMI</span>
        </button>

        {/* Telemedisin Dokter */}
        <button
          onClick={() => onTabChange('telemedisin')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'telemedisin' ? 'text-red-600 font-bold' : 'text-slate-500 font-medium hover:text-slate-800'
          }`}
        >
          <Stethoscope className={`w-5 h-5 ${activeTab === 'telemedisin' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5">Konsul RS</span>
        </button>

      </div>
    </div>
  );
};
