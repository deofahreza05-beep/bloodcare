import React from 'react';
import { LayoutDashboard, Code, ShieldAlert, Palette, Archive } from 'lucide-react';

export type ActiveTab = 'landing' | 'beranda' | 'donor' | 'telemedisin' | 'faskes' | 'edukasi' | 'admin' | 'laravel' | 'design' | 'stitch-export';

interface SubNavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isAdminAuthenticated: boolean;
  onAdminLogout: () => void;
  onOpenAdminLogin: () => void;
}

export const SubNavbar: React.FC<SubNavbarProps> = ({
  activeTab,
  onTabChange,
  isAdminAuthenticated,
  onAdminLogout,
  onOpenAdminLogin,
}) => {
  const navItems: { id: ActiveTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'landing', label: 'Landing Page' },
    { id: 'beranda', label: 'Dashboard & Radar' },
    { id: 'donor', label: 'Donor Darah' },
    { id: 'telemedisin', label: 'Telemedisin PMI' },
    { id: 'faskes', label: 'Faskes & RS' },
    { id: 'edukasi', label: 'Edukasi & Riset' },
    { 
      id: 'admin', 
      label: isAdminAuthenticated ? 'Admin Panel (Aktif)' : 'Admin Panel (Terkunci)', 
      icon: (
        <LayoutDashboard className={`w-3.5 h-3.5 inline mr-1 ${isAdminAuthenticated ? 'text-emerald-500' : 'text-amber-500'}`} />
      ) 
    },
    { 
      id: 'laravel', 
      label: 'Kode Laravel MVC', 
      icon: <Code className="w-3.5 h-3.5 inline mr-1 text-red-500" /> 
    },
    { 
      id: 'design', 
      label: 'Katalog Desain UI (Word/Dosen)', 
      icon: <Palette className="w-3.5 h-3.5 inline mr-1 text-rose-500" /> 
    },
    { 
      id: 'stitch-export', 
      label: 'Export Desain (.ZIP / Stitch AI)', 
      icon: <Archive className="w-3.5 h-3.5 inline mr-1 text-emerald-500" /> 
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200/70 shadow-2xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-2 gap-2">
          
          {/* Left: Navigation Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'admin' && !isAdminAuthenticated) {
                      onOpenAdminLogin();
                    } else {
                      onTabChange(item.id);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-red-600 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Admin Session Status & Real-time Status ticker */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 shrink-0 self-end md:self-auto">
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Petugas: Admin PMI</span>
                <button
                  onClick={onAdminLogout}
                  className="ml-1 text-[10px] bg-white hover:bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-emerald-200 transition-colors"
                >
                  Kunci / Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-red-600 font-semibold px-2 py-0.5 rounded hover:bg-slate-100 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                <span>Login Petugas PMI</span>
              </button>
            )}

            <span className="text-slate-300">|</span>

            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Status Darurat: <span className="text-red-600 font-bold">Siaga 1</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
