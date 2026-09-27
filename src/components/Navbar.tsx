import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, Bell, PhoneCall, Star, Plus, ShieldCheck, Smartphone, Image as ImageIcon } from 'lucide-react';
import { Donor } from '../types';

interface NavbarProps {
  donor: Donor;
  onOpenNewRequest: () => void;
  onSelectCity: (city: string) => void;
  activeCity: string;
  onOpenNotifications: () => void;
  unreadCount?: number;
  onOpenLabResult: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchResultSelect?: (item: any) => void;
  onOpenMobileQR?: () => void;
  onOpenGallery?: () => void;
  onNavigateToDesign?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  donor,
  onOpenNewRequest,
  onSelectCity,
  activeCity,
  onOpenNotifications,
  unreadCount = 3,
  onOpenLabResult,
  searchQuery,
  onSearchChange,
  onSearchResultSelect,
  onOpenMobileQR,
  onOpenGallery,
  onNavigateToDesign,
}) => {
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const cities = ['Pekanbaru, Riau', 'Kampar, Riau', 'Dumai, Riau', 'Siak, Riau', 'Padang, Sumbar'];

  // Quick suggestions based on search
  const quickSuggestions = [
    { label: 'RSUD Arifin Achmad', category: 'Rumah Sakit', type: 'faskes' },
    { label: 'UDD PMI Jl. Diponegoro', category: 'Bank Darah PMI', type: 'faskes' },
    { label: 'Golongan Darah O+ Kritis', category: 'Permintaan Darah', type: 'blood' },
    { label: 'dr. Hendra Pratama, Sp.OG', category: 'Dokter Spesialis', type: 'doctor' },
    { label: 'Skrining Cepat Fast-Pass', category: 'Layanan Medis', type: 'screening' },
  ].filter(item => !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-sm shadow-red-200">
              <div className="relative">
                {/* stylized blood drop with plus */}
                <div className="w-4 h-4 text-white flex items-center justify-center font-black text-xs">
                  <span className="text-[13px] leading-none">🩸</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-extrabold tracking-tight text-red-600">Blood</span>
              <span className="text-xl font-extrabold tracking-tight text-slate-800">Care</span>
            </div>
          </div>

          {/* Search Bar (Real Interactive Input) */}
          <div className="flex-1 max-w-xl mx-2 relative hidden sm:block">
            <div className="relative flex items-center w-full rounded-full bg-slate-50 focus-within:bg-white border border-slate-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 transition-all">
              <Search className="w-4 h-4 text-slate-400 ml-3.5 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Cari rumah sakit, stok darah, dokter PMI, atau pasien..."
                className="w-full py-1.5 pr-8 text-xs sm:text-sm bg-transparent text-slate-800 placeholder-slate-400 focus:outline-hidden"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="mr-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              ) : (
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 mr-3 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-xs pointer-events-none">
                  ⌘ K
                </kbd>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs animate-in fade-in">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {searchQuery ? `Hasil Pencarian untuk "${searchQuery}"` : 'Rekomendasi Pencarian Cepat'}
                </div>
                {quickSuggestions.length > 0 ? (
                  quickSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => {
                        onSearchChange(item.label);
                        if (onSearchResultSelect) onSearchResultSelect(item);
                      }}
                      className="px-3 py-2 hover:bg-red-50 hover:text-red-700 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-800">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-3 text-slate-400 text-center text-xs">
                    Tekan enter atau ketik kata kunci lainnya...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* City Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCityMenu(!showCityMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="max-w-[110px] truncate">{activeCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showCityMenu && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 font-bold text-slate-400 text-[10px] uppercase tracking-wider">
                    Pilih Wilayah
                  </div>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onSelectCity(city);
                        setShowCityMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-600 transition-colors ${
                        activeCity === city ? 'font-bold text-red-600 bg-red-50/50' : 'text-slate-600'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cloud SQL Database Connected Status Pill */}
            <div 
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-[11px] font-bold shadow-2xs"
              title="Cloud SQL PostgreSQL Database Terhubung & Aktif"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Cloud SQL Online</span>
            </div>

            {/* Points Badge */}
            <div 
              className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-full text-amber-800 text-xs font-bold shadow-xs cursor-pointer hover:bg-amber-100/80 transition-colors"
              title="Poin Relawan Aktif Anda"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{donor.current_points.toLocaleString('id-ID')} Pts</span>
            </div>

            {/* Emergency 119 Hotline Pill */}
            <a
              href="tel:119"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200 transition-colors shrink-0"
              title="Hubungi Saluran Siaga Darurat Medis 119"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>119</span>
            </a>

            {/* Tombol Khusus Desain UI Laporan Dosen & Export ZIP ala Stitch AI */}
            {onNavigateToDesign && (
              <button
                onClick={onNavigateToDesign}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer shadow-md hover:scale-105"
                title="Buka Halaman Khusus Desain UI & Export Semua Gambar ke File .ZIP"
              >
                <ImageIcon className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Export Desain UI (.ZIP)</span>
                <span className="sm:hidden">Export .ZIP</span>
              </button>
            )}

            {/* Buka di HP Button (QR Code Modal) */}
            {onOpenMobileQR && (
              <button
                onClick={onOpenMobileQR}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full border border-slate-200 transition-colors shrink-0 cursor-pointer"
                title="Pindai QR Code untuk buka aplikasi di Smartphone"
              >
                <Smartphone className="w-3.5 h-3.5 text-red-600" />
                <span>Buka di HP</span>
              </button>
            )}

            {/* Buat Permintaan Darah Button */}
            <button
              onClick={onOpenNewRequest}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-black rounded-full shadow-sm shadow-red-200 transition-all shrink-0 cursor-pointer active:scale-95"
              title="Daftarkan Pasien yang Membutuhkan Darah Cepat"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Butuh Darah?</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Pusat Notifikasi & Live Feed Kebutuhan Darah"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            <div 
              onClick={onOpenLabResult}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
              title="Lihat Rekam Medis & Profil Pendonor"
            >
              <img
                src={donor.avatar_url}
                alt={donor.full_name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div className="hidden lg:block text-left leading-tight">
                <div className="text-[12px] font-bold text-slate-800 flex items-center gap-1">
                  <span>{donor.full_name}</span>
                  <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-1 rounded">
                    {donor.blood_group}{donor.rhesus}
                  </span>
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Donor Aktif
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
