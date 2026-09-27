import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { 
  Camera, Download, Check, Sparkles, Printer, FileText, 
  HelpCircle, Eye, RefreshCw, ZoomIn, ZoomOut
} from 'lucide-react';
import { 
  Heart, Droplet, ShieldCheck, MapPin, QrCode, Award, 
  Building2, Activity, UserCheck, Calendar, Phone, 
  AlertTriangle, ArrowRight, Stethoscope
} from 'lucide-react';

interface DesignSection {
  id: string;
  category: 'Laporan Dosen' | 'Dashboard Pasien' | 'Admin & Faskes' | 'Komponen Spesifik';
  title: string;
  subtitle: string;
  figureNumber: string;
  academicCaption: string;
}

export const DesignKitView: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('hero-banner');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewZoom, setPreviewZoom] = useState<number>(100);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const sections: DesignSection[] = [
    {
      id: 'hero-banner',
      category: 'Laporan Dosen',
      figureNumber: 'Gambar 4.1',
      title: 'Hero Banner & Call to Action (Landing Page)',
      subtitle: 'Tampilan pembuka website BloodCare dengan tipografi tegas, badge akreditasi Kemenkes & PMI, serta tombol aksi cepat.',
      academicCaption: 'Antarmuka Banner Utama Sistem Informasi Donor Darah BloodCare Indonesia.',
    },
    {
      id: 'quick-action-cards',
      category: 'Dashboard Pasien',
      figureNumber: 'Gambar 4.2',
      title: 'Tiga Kartu Aksi Cepat (Quick Action Cards)',
      subtitle: 'Paspor Digital Pendonor, Fast-Pass Skrining Mandiri Berbasis QR, dan Katalog Reward Vitamin/Poin.',
      academicCaption: 'Komponen Fitur Unggulan Pendonor: Kartu Identitas Digital, QR Fast-Pass, dan Gamifikasi Reward.',
    },
    {
      id: 'radar-permintaan',
      category: 'Dashboard Pasien',
      figureNumber: 'Gambar 4.3',
      title: 'Radar Permintaan Darah Kritis (Live Feed Card)',
      subtitle: 'Kartu darurat dengan progress bar kantong darah real-time, status rhesus, batas waktu medis, dan verifikasi dokter penanggung jawab.',
      academicCaption: 'Visualisasi Kartu Permintaan Darurat Medis Berdasarkan Tingkat Urgensi dan Kebutuhan Kantong.',
    },
    {
      id: 'admin-kpi-table',
      category: 'Admin & Faskes',
      figureNumber: 'Gambar 4.4',
      title: 'Panel Kontrol KPI & Tabel CRUD Pasien Darurat (Admin PMI)',
      subtitle: 'Tampilan 4 metrik KPI utama dan tabel manajemen permintaan darah dengan badge status dan audit jejak petugas.',
      academicCaption: 'Antarmuka Panel Administrator Manajemen Distribusi Kantong Darah dan Faskes Rumah Sakit.',
    },
    {
      id: 'paspor-qr-card',
      category: 'Komponen Spesifik',
      figureNumber: 'Gambar 4.5',
      title: 'Kartu Paspor Donor Darah Digital & Fast-Pass QR',
      subtitle: 'Tampilan kartu identitas relawan siap cetak/tunjuk saat registrasi di posko donor PMI, lengkap dengan QR Code.',
      academicCaption: 'Desain Kartu Paspor Relawan Pendonor Darah dengan QR Code Terenkripsi.',
    },
    {
      id: 'faskes-stock-card',
      category: 'Admin & Faskes',
      figureNumber: 'Gambar 4.6',
      title: 'Kartu Inventaris Stok Darah Rumah Sakit & UDD PMI',
      subtitle: 'Visualisasi ketersediaan kantong darah per golongan (A, B, AB, O) dan komponen (PRC, TC, WB) di RSUD Arifin Achmad.',
      academicCaption: 'Antarmuka Pemantauan Ketersediaan Stok Darah Real-time di Fasilitas Kesehatan Mitra.',
    },
  ];

  // Fungsi download per-kartu/komponen (Ukuran pas 16:9, tidak kepanjangan)
  const handleDownloadSection = async (sectionId: string, filename: string) => {
    const el = sectionRefs.current[sectionId];
    if (!el) return;

    setDownloadingId(sectionId);
    try {
      const dataUrl = await htmlToImage.toPng(el, {
        quality: 1,
        pixelRatio: 2.5, // Hasil sangat jernih dan tajam untuk cetak
        backgroundColor: '#ffffff',
        skipFonts: true,
      });

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal mendownload:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  // Salin gambar ke Clipboard untuk langsung Ctrl+V ke Microsoft Word
  const handleCopySection = async (sectionId: string) => {
    const el = sectionRefs.current[sectionId];
    if (!el) return;

    setCopiedId(sectionId);
    try {
      const blob = await htmlToImage.toBlob(el, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: true,
      });

      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
      }
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Gagal copy:', err);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handlePrintAll = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner Penjelasan */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Khusus Dokumentasi Skripsi, Jurnal &amp; Laporan Dosen</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Katalog Desain Antarmuka (UI Section Kit)
            </h1>
            <p className="text-red-100 text-sm mt-2 max-w-2xl leading-relaxed">
              Setiap komponen dan halaman web dipotong menjadi <strong>ukuran proporsional (16:9 / 4:3)</strong> yang pas di halaman Microsoft Word. Teks tajam, tidak memanjang ke bawah, dan sudah dilengkapi label <code className="bg-red-900/40 px-1.5 py-0.5 rounded text-white font-mono">Gambar 4.x</code> beserta keterangannya.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handlePrintAll}
              className="px-4 py-2.5 bg-white text-red-700 hover:bg-red-50 text-xs font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Nav Pill Tabs */}
        <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-red-200 shrink-0">Pilih Bagian:</span>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSectionId(sec.id);
                const el = sectionRefs.current[sec.id];
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeSectionId === sec.id
                  ? 'bg-white text-red-700 shadow-md font-black scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {sec.figureNumber}: {sec.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container of Sections */}
      <div className="max-w-6xl mx-auto space-y-12">
        {sections.map((sec) => {
          return (
            <div
              key={sec.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Section Header Controls */}
              <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-red-600 text-white tracking-wider">
                      {sec.figureNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700">
                      {sec.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-slate-900 mt-1.5">
                    {sec.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {sec.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopySection(sec.id)}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title="Salin gambar ke Clipboard (Langsung Paste ke Word)"
                  >
                    {copiedId === sec.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span>Salin ke Word</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDownloadSection(sec.id, `${sec.figureNumber}-${sec.id}`)}
                    disabled={downloadingId === sec.id}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    {downloadingId === sec.id ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Memproses HD...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Foto HD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* The Rendered Component To Capture (High Quality, Controlled Width/Height) */}
              <div className="p-4 sm:p-8 bg-slate-100/70 overflow-x-auto flex justify-center">
                <div
                  ref={(el) => {
                    sectionRefs.current[sec.id] = el;
                  }}
                  className="w-full max-w-[960px] bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition-all"
                >
                  {/* Watermark/Header Header Web Realistis */}
                  <div className="pb-4 mb-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">
                        https://bloodcare.id/{sec.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                      <Droplet className="w-3 h-3 fill-red-600" />
                      <span>BloodCare UI Engine</span>
                    </div>
                  </div>

                  {/* Konten Spesifik Tiap Section */}
                  {sec.id === 'hero-banner' && <HeroBannerComponent />}
                  {sec.id === 'quick-action-cards' && <QuickActionCardsComponent />}
                  {sec.id === 'radar-permintaan' && <RadarPermintaanComponent />}
                  {sec.id === 'admin-kpi-table' && <AdminKpiTableComponent />}
                  {sec.id === 'paspor-qr-card' && <PasporQrComponent />}
                  {sec.id === 'faskes-stock-card' && <FaskesStockComponent />}
                </div>
              </div>

              {/* Academic Caption Footer */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <p className="italic">
                  <strong>{sec.figureNumber}:</strong> {sec.academicCaption}
                </p>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  Format: 300 DPI Ready • PNG HD
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Petunjuk Copy-Paste ke Microsoft Word */}
      <div className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-red-600" />
          <span>Cara Cepat Memasukkan Gambar ke Laporan Dosen (Word / PPT):</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold inline-flex items-center justify-center mb-2">1</span>
            <p className="font-bold text-slate-900">Klik &quot;Salin ke Word&quot;</p>
            <p className="mt-1 text-slate-500">Tombol otomatis memotret komponen dan menyalinnya ke clipboard sistem Anda.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold inline-flex items-center justify-center mb-2">2</span>
            <p className="font-bold text-slate-900">Tekan Ctrl + V di Word</p>
            <p className="mt-1 text-slate-500">Gambar akan langsung tertempel dengan ukuran proporsional tanpa pecah atau gepeng.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold inline-flex items-center justify-center mb-2">3</span>
            <p className="font-bold text-slate-900">Tambahkan Caption Bawah</p>
            <p className="mt-1 text-slate-500">Copy teks caption yang tertera di bawah masing-masing gambar untuk format skripsi resmi.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

/* =========================================================================
   SUB-KOMPONEN PIXEL-PERFECT UNTUK FOTO DOKUMENTASI DOSEN
   ========================================================================= */

// 1. Hero Banner Component
const HeroBannerComponent: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
      <div className="max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Terintegrasi Standar Kemenkes RI &amp; UDD PMI Pekanbaru</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
          Setetes Darah Anda, <br />
          <span className="text-red-200">Napas Baru bagi Pasien Kritis.</span>
        </h1>
        <p className="text-red-100 text-xs sm:text-sm mt-3 leading-relaxed">
          Platform terpadu pemenuhan kantong darah darurat tercepat di Riau. Terhubung langsung dengan 14 Rumah Sakit rujukan, radar donor realtime, dan fast-pass skrining digital.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div className="px-5 py-2.5 bg-white text-red-700 font-black text-xs rounded-xl shadow-md flex items-center gap-2">
            <Droplet className="w-4 h-4 fill-red-600 text-red-600" />
            <span>Donor Darah Sekarang</span>
          </div>
          <div className="px-5 py-2.5 bg-red-800/80 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>Permintaan Darah Darurat</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-white/10 rounded-xl p-2.5">
          <p className="text-xl font-black text-white">1.420+</p>
          <p className="text-[10px] text-red-200 font-semibold">Pendonor Terverifikasi</p>
        </div>
        <div className="bg-white/10 rounded-xl p-2.5">
          <p className="text-xl font-black text-white">98.4%</p>
          <p className="text-[10px] text-red-200 font-semibold">Tingkat Pemenuhan</p>
        </div>
        <div className="bg-white/10 rounded-xl p-2.5">
          <p className="text-xl font-black text-white">&lt; 35 Mnt</p>
          <p className="text-[10px] text-red-200 font-semibold">Respon Tanggap Cepat</p>
        </div>
        <div className="bg-white/10 rounded-xl p-2.5">
          <p className="text-xl font-black text-white">14 RS</p>
          <p className="text-[10px] text-red-200 font-semibold">Faskes Terhubung</p>
        </div>
      </div>
    </div>
  );
};

// 2. Quick Action Cards Component
const QuickActionCardsComponent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Paspor Digital */}
      <div className="bg-white border-2 border-red-100 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full pointer-events-none" />
        <div>
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold mb-3 shadow-xs">
            <Droplet className="w-5 h-5 fill-white" />
          </div>
          <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-full">
            Kartu Identitas Relawan
          </span>
          <h3 className="text-sm font-black text-slate-900 mt-2">
            Paspor Donor Digital
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Riwayat 14x donor dr. Adi Putra, status kelayakan, dan hasil lab hemoglobin realtime.
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
          <span>Buka Kartu Paspor</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Card 2: Fast-Pass Skrining */}
      <div className="bg-white border-2 border-emerald-100 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full pointer-events-none" />
        <div>
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-3 shadow-xs">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
            Tanpa Antre di Posko
          </span>
          <h3 className="text-sm font-black text-slate-900 mt-2">
            Fast-Pass QR Skrining
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Isi 12 kuesioner medis mandiri dari rumah, dapatkan QR Code jalur cepat di UDD PMI.
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
          <span>Mulai Skrining Medis</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Card 3: Katalog Reward */}
      <div className="bg-white border-2 border-amber-100 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full pointer-events-none" />
        <div>
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold mb-3 shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-full">
            Gamifikasi Apresiasi
          </span>
          <h3 className="text-sm font-black text-slate-900 mt-2">
            Katalog Reward &amp; Poin
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Tukar 1.250 Poin dengan Paket Multivitamin Zat Besi, Voucher Sehat Kimia Farma &amp; Susu.
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
          <span>Klaim Apresiasi</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

// 3. Radar Permintaan Darah Component
const RadarPermintaanComponent: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Single Patient Card 1 */}
      <div className="bg-white border-2 border-red-300 rounded-2xl p-4 sm:p-5 shadow-xs relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-black flex flex-col items-center justify-center shadow-xs shrink-0">
              <span className="text-base leading-none">O</span>
              <span className="text-xs leading-none font-bold">+</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-600 text-white animate-pulse">
                  Kritis
                </span>
                <span className="text-xs font-bold text-slate-400">Kasus: Post-Partum Haemorrhage</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                Ny. Siti Rahma (34 Thn)
              </h3>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
              Tenggat: Sisa 3 Jam Lagi
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>RSUD Arifin Achmad (Gd Bedah Lt.3)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-slate-400 shrink-0" />
            <span>dr. Budi Santoso, Sp.OG</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplet className="w-4 h-4 text-red-500 shrink-0" />
            <span>Komponen: <strong>Packed Red Cells (PRC)</strong></span>
          </div>
        </div>

        {/* Progress Kantong Darah */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700">Progres Kebutuhan Kantong:</span>
              <span className="text-red-600">2 dari 3 Kantong Terpenuhi (Kurang 1 Kantong)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '66.6%' }} />
            </div>
          </div>

          <div className="px-4 py-2 bg-red-600 text-white font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Bantu Pasien Ini</span>
          </div>
        </div>
      </div>

      {/* Single Patient Card 2 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white font-black flex flex-col items-center justify-center shrink-0">
              <span className="text-base leading-none">B</span>
              <span className="text-xs leading-none font-bold">+</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500 text-white">
                  Tinggi
                </span>
                <span className="text-xs font-bold text-slate-400">Kasus: Thalassemia Mayor</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                Ananda Dimas (9 Thn)
              </h3>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Tenggat: Sisa 7 Jam
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span>RS Awal Bros Sudirman (Kamar 412)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-slate-400 shrink-0" />
            <span>dr. Maya Kartika, Sp.A</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplet className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Komponen: <strong>Thrombocyte (TC)</strong></span>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700">Progres Kebutuhan Kantong:</span>
              <span className="text-amber-600">1 dari 2 Kantong Terpenuhi (Kurang 1 Kantong)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '50%' }} />
            </div>
          </div>

          <div className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl shrink-0 flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Bantu Pasien Ini</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Admin KPI & Table Component
const AdminKpiTableComponent: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl">
          <span className="text-[10px] font-extrabold uppercase text-red-600 tracking-wider">Permintaan Aktif</span>
          <p className="text-2xl font-black text-red-700 mt-1">12 Kasus</p>
          <p className="text-[10px] text-red-500 mt-0.5">3 butuh tindakan segera</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
          <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">Terpenuhi Hari Ini</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">28 Kantong</p>
          <p className="text-[10px] text-emerald-500 mt-0.5">Meningkat 15% dari kemarin</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
          <span className="text-[10px] font-extrabold uppercase text-blue-600 tracking-wider">Total Pendonor</span>
          <p className="text-2xl font-black text-blue-700 mt-1">1.428 Jiwa</p>
          <p className="text-[10px] text-blue-500 mt-0.5">Relawan siap siaga</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
          <span className="text-[10px] font-extrabold uppercase text-slate-600 tracking-wider">Faskes &amp; RS Mitra</span>
          <p className="text-2xl font-black text-slate-800 mt-1">14 Faskes</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Sinkronisasi berkala</p>
        </div>
      </div>

      {/* Tabel Data CRUD Pasien Darurat */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-bold flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-red-400" />
            <span>Tabel Audit Permintaan Darurat Terkini</span>
          </span>
          <span className="text-[11px] bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono">
            Admin Auth: dr. Hendra (Koord. UDD)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Nama Pasien &amp; Diagnosa</th>
                <th className="p-3">Golongan</th>
                <th className="p-3">Rumah Sakit</th>
                <th className="p-3">Kebutuhan</th>
                <th className="p-3">Status</th>
                <th className="p-3">Audit Petugas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">
                  Ny. Siti Rahma
                  <span className="block text-[10px] text-slate-400 font-normal">Perdarahan Pasca Salin</span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-black">O+</span>
                </td>
                <td className="p-3">RSUD Arifin Achmad</td>
                <td className="p-3 font-semibold text-red-600">2 / 3 Kantong</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    Proses Verifikasi
                  </span>
                </td>
                <td className="p-3 text-[11px] text-slate-400 font-mono">Petugas UDD-02</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">
                  Ananda Dimas
                  <span className="block text-[10px] text-slate-400 font-normal">Thalassemia Mayor</span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-black">B+</span>
                </td>
                <td className="p-3">RS Awal Bros Sudirman</td>
                <td className="p-3 font-semibold text-amber-600">1 / 2 Kantong</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                    Mencari Relawan
                  </span>
                </td>
                <td className="p-3 text-[11px] text-slate-400 font-mono">dr. Maya K.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">
                  Tn. Agus Salim
                  <span className="block text-[10px] text-slate-400 font-normal">Anemia Berat Defisiensi</span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-black">A+</span>
                </td>
                <td className="p-3">RS Santa Maria Pekanbaru</td>
                <td className="p-3 font-semibold text-emerald-600">2 / 2 Kantong</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Terpenuhi 100%
                  </span>
                </td>
                <td className="p-3 text-[11px] text-slate-400 font-mono">Selesai (Arsip)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 5. Paspor Donor & QR Code Component
const PasporQrComponent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* Kartu Fisik Paspor Digital */}
      <div className="bg-gradient-to-br from-red-700 via-red-600 to-rose-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 fill-white" />
            <span className="font-black text-sm tracking-wider uppercase">Paspor Relawan PMI</span>
          </div>
          <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full font-bold">
            ID: VLR-2026-0814
          </span>
        </div>

        <div className="my-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-red-200">Nama Lengkap Pendonor:</p>
            <h4 className="text-xl font-black text-white tracking-tight">dr. Adi Putra, M.Biomed</h4>
            <p className="text-xs text-red-100 mt-0.5">Status: Pendonor Rutin Aktif (14 Kali Donor)</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white text-red-600 flex flex-col items-center justify-center font-black shadow-md">
            <span className="text-2xl leading-none">O</span>
            <span className="text-xs leading-none font-bold">Rh+</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <p className="text-[10px] text-red-200">Hemoglobin</p>
            <p className="font-black text-sm">14.8 g/dL</p>
          </div>
          <div>
            <p className="text-[10px] text-red-200">Tensi Darah</p>
            <p className="font-black text-sm">120/80</p>
          </div>
          <div>
            <p className="text-[10px] text-red-200">Kelayakan</p>
            <p className="font-black text-sm text-emerald-300">Siap Donor</p>
          </div>
        </div>
      </div>

      {/* QR Fast-Pass Container */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col items-center text-center">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-3">
          {/* Mockup QR Code Visual */}
          <div className="w-36 h-36 bg-slate-900 rounded-xl p-2 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="w-8 h-8 border-4 border-white bg-slate-900 rounded" />
              <div className="w-8 h-8 border-4 border-white bg-slate-900 rounded" />
            </div>
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <Droplet className="w-3 h-3 text-white fill-white" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-8 h-8 border-4 border-white bg-slate-900 rounded" />
              <div className="w-4 h-4 bg-white rounded" />
            </div>
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full mb-1">
          ✓ Skrining Medis Terverifikasi
        </span>
        <h4 className="text-sm font-black text-slate-900">QR Fast-Pass Loket UDD PMI</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Tunjukkan QR Code ini langsung ke petugas meja pendaftaran untuk melewati antrean kuesioner kertas.
        </p>
      </div>
    </div>
  );
};

// 6. Faskes Stock Component
const FaskesStockComponent: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-full">
            Faskes Rujukan Utama
          </span>
          <h3 className="text-base font-black text-slate-900 mt-1">
            RSUD Arifin Achmad Pekanbaru
          </h3>
          <p className="text-xs text-slate-500">Jl. Diponegoro No. 2, Pekanbaru • Buka 24 Jam Darurat</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400">Total Stok Darah Tersedia:</span>
          <p className="text-xl font-black text-slate-900">128 Kantong</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
          <span className="text-sm font-black text-red-600 block">Golongan A+</span>
          <p className="text-xl font-black text-slate-800 mt-1">34</p>
          <span className="text-[10px] text-slate-500">Kantong PRC &amp; WB</span>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
          <span className="text-sm font-black text-amber-600 block">Golongan B+</span>
          <p className="text-xl font-black text-slate-800 mt-1">42</p>
          <span className="text-[10px] text-slate-500">Kantong PRC &amp; TC</span>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
          <span className="text-sm font-black text-purple-600 block">Golongan AB+</span>
          <p className="text-xl font-black text-slate-800 mt-1">16</p>
          <span className="text-[10px] text-slate-500">Stok Terbatas</span>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
          <span className="text-sm font-black text-red-700 block">Golongan O+</span>
          <p className="text-xl font-black text-red-700 mt-1">36</p>
          <span className="text-[10px] text-red-600 font-bold">Tingkat Permintaan Tinggi</span>
        </div>
      </div>
    </div>
  );
};
