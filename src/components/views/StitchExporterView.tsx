import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { 
  Archive, Download, Sparkles, FolderArchive, RefreshCw, 
  Check, FileImage, ShieldCheck, Layers, Eye, ExternalLink,
  ChevronDown, HelpCircle, CheckCircle2, AlertCircle
} from 'lucide-react';

// Import Views Asli Web BloodCare
import { LandingPageView } from './LandingPageView';
import { AdminDashboardView } from './AdminDashboardView';
import { FacilitiesView } from './FacilitiesView';
import { TelemedicineView } from './TelemedicineView';
import { SchedulesView } from './SchedulesView';
import { ArticlesView } from './ArticlesView';
import { LaravelDocsView } from './LaravelDocsView';

// Import Komponen Asli Halaman Beranda (Dashboard)
import { HeroQuickCards } from '../HeroQuickCards';
import { BloodFilterSection } from '../BloodFilterSection';
import { EmergencyRequestsList } from '../EmergencyRequestsList';
import { RadarMapSection } from '../RadarMapSection';
import { DonorPassportCard } from '../DonorPassportCard';
import { FastPassScreeningCard } from '../FastPassScreeningCard';
import { RewardsCatalogueCard } from '../RewardsCatalogueCard';
import { ArticlesSection } from '../ArticlesSection';
import { BloodCompatibilityWidget } from '../BloodCompatibilityWidget';

// Mock Data
import { 
  initialDonor, 
  initialBloodRequests, 
  initialFacilities, 
  initialSchedules, 
  initialDoctors, 
  initialRewards, 
  initialArticles 
} from '../../data/mockData';
import { BloodGroup, Rhesus, BloodComponent } from '../../types';

interface PageDefinition {
  id: string;
  name: string;
  filename: string;
  badge: string;
  description: string;
  component: React.ReactNode;
}

export const StitchExporterView: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isExportingAllZip, setIsExportingAllZip] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const pageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // KUMPULAN SEMUA HALAMAN WEB ASLI DARI ATAS SAMPAI BAWAH
  const pages: PageDefinition[] = [
    {
      id: '01-landing-page',
      name: '01. Landing Page Utama (Full Dari Atas Sampai Bawah)',
      filename: '01-Landing-Page-Full.png',
      badge: 'Halaman Publik',
      description: 'Halaman depan komplit: Top Bar, Hero Banner, Statistik Darah, 3 Fitur Unggulan, Alur 4 Langkah Donor, Peta Faskes, Testimoni Pasien, dan 6 FAQ Medis.',
      component: (
        <LandingPageView
          onStartDonation={() => {}}
          onRequestBlood={() => {}}
          onExploreFacilities={() => {}}
          onViewLiveDashboard={() => {}}
          latestRequest={initialBloodRequests[0]}
        />
      ),
    },
    {
      id: '02-dashboard-radar',
      name: '02. Dashboard Relawan & Radar Pasien Kritis (Full)',
      filename: '02-Dashboard-Radar-Darurat-Full.png',
      badge: 'Dashboard Utama',
      description: 'Halaman dashboard operasional: Paspor Donor Digital, 3 Kartu Aksi Cepat, Live Radar Darurat, Filter Golongan Darah, Bagan Kompatibilitas Darah, dan Katalog Apresiasi Poin.',
      component: (
        <FullDashboardViewMock />
      ),
    },
    {
      id: '03-admin-pmi',
      name: '03. Admin Panel PMI & Manajemen Faskes (Full)',
      filename: '03-Admin-Panel-PMI-Full.png',
      badge: 'Panel Petugas',
      description: 'Antarmuka khusus petugas UDD PMI: 4 Metrik KPI Utama, Form Tambah Pasien Darurat, Tabel Audit CRUD Pasien, Status Kantong Darah, dan Inventaris Stok.',
      component: (
        <AdminDashboardView
          requests={initialBloodRequests}
          onUpdateRequestStatus={() => {}}
          onDeleteRequest={() => {}}
          facilities={initialFacilities}
          donors={[initialDonor]}
          schedules={initialSchedules}
          rewards={initialRewards}
          onOpenNewRequestModal={() => {}}
        />
      ),
    },
    {
      id: '04-jadwal-donor',
      name: '04. Jadwal Donor Darah & Bus Mobile Unit (Full)',
      filename: '04-Jadwal-Donor-Mobile-Unit-Full.png',
      badge: 'Layanan Posko',
      description: 'Daftar lengkap jadwal donor darah lapangan: Lokasi Mobile Unit Mal SKA, UNRI, Kampus, dan Posko UDD PMI dengan progress bar kuota pendaftaran slot online.',
      component: (
        <SchedulesView
          schedules={initialSchedules}
          onBookSlot={() => {}}
        />
      ),
    },
    {
      id: '05-faskes-stok',
      name: '05. Bank Darah & Faskes Rumah Sakit (Full)',
      filename: '05-Stok-Bank-Darah-Faskes-Full.png',
      badge: 'Faskes & RS',
      description: 'Direktori 14 Rumah Sakit dan UDD PMI di Riau: Pencarian Faskes, Status Layanan Darurat 24 Jam, Kontak IGD/Bank Darah, serta Rincian Stok Kantong per Golongan Darah.',
      component: (
        <FacilitiesView
          facilities={initialFacilities}
          activeCity="Pekanbaru, Riau"
          onSelectCity={() => {}}
          onOpenNewRequest={() => {}}
        />
      ),
    },
    {
      id: '06-telemedisin',
      name: '06. Telemedisin Dokter Spesialis PMI (Full)',
      filename: '06-Telemedisin-Dokter-PMI-Full.png',
      badge: 'Layanan Medis',
      description: 'Antarmuka konsultasi online: Daftar dokter spesialis patologi klinik, jadwal praktek, status online/offline, dan tombol chat konsultasi pra-donor.',
      component: (
        <TelemedicineView
          doctors={initialDoctors}
          onSelectDoctor={() => {}}
        />
      ),
    },
    {
      id: '07-edukasi-artikel',
      name: '07. Pusat Edukasi Kesehatan & Riset Darah (Full)',
      filename: '07-Edukasi-Artikel-Kesehatan-Full.png',
      badge: 'Edukasi & Riset',
      description: 'Pusat wawasan medis: Filter artikel nutrisi pendonor, mitos vs fakta darah, kisah penerima transfusi, estimasi waktu baca, serta verifikasi dokter.',
      component: (
        <ArticlesView
          articles={initialArticles}
          onOpenArticle={() => {}}
        />
      ),
    },
    {
      id: '08-laravel-docs',
      name: '08. Dokumentasi Kode Laravel MVC & Database Schema (Full)',
      filename: '08-Laravel-MVC-Docs-Full.png',
      badge: 'Arsitektur Teknis',
      description: 'Dokumentasi arsitektur backend: Panduan Laragon MySQL, file migrasi database (blood_requests, donors, stocks), model Eloquent, controller API, dan routing.',
      component: (
        <LaravelDocsView />
      ),
    },
  ];

  // Download Satuan Resolusi Tinggi
  const handleDownloadSingle = async (pageId: string, filename: string) => {
    const el = pageRefs.current[pageId];
    if (!el) return;

    setDownloadingId(pageId);
    try {
      const dataUrl = await htmlToImage.toPng(el, {
        quality: 0.98,
        pixelRatio: 2, // Tajam untuk cetak skripsi/makalah
        backgroundColor: '#f8fafc',
        skipFonts: true,
      });

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = filename;
      a.click();
    } catch (err) {
      console.error('Gagal mengunduh gambar:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  // Salin ke Clipboard (langsung Ctrl+V ke Word)
  const handleCopySingle = async (pageId: string) => {
    const el = pageRefs.current[pageId];
    if (!el) return;

    setCopiedId(pageId);
    try {
      const blob = await htmlToImage.toBlob(el, {
        quality: 0.95,
        pixelRatio: 1.8,
        backgroundColor: '#f8fafc',
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

  // EXPORT SEMUA HALAMAN LENGKAP KE SATU FILE ZIP (Ala Stitch AI)
  const handleExportAllToZip = async () => {
    setIsExportingAllZip(true);
    setExportProgress('Mempersiapkan kemasan ZIP...');

    try {
      const zip = new JSZip();
      const folder = zip.folder('BloodCare_Lengkap_Full_Pages_UI');

      // Masukkan berkas teks panduan untuk dosen
      folder?.file(
        '00_DAFTAR_LAMPIRAN_UI_DOSEN.txt',
        `========================================================================\n` +
        `PAKET LENGKAP SCREENSHOT SEMUA HALAMAN WEB SISTEM INFORMASI BLOODCARE\n` +
        `Format: PNG High-Definition (Full Halaman Dari Ujung Atas Sampai Bawah)\n` +
        `Waktu Pembuatan: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}\n` +
        `========================================================================\n\n` +
        `Daftar Seluruh Halaman yang Terekam:\n\n` +
        pages.map((p, idx) => `[${idx + 1}] ${p.filename}\n    - Judul: ${p.name}\n    - Kategori: ${p.badge}\n    - Keterangan: ${p.description}\n`).join('\n') +
        `\nCatatan untuk Penulisan Laporan:\n` +
        `- Semua gambar di atas merupakan tampilan asli yang dirender secara utuh dari header hingga footer.\n` +
        `- Dapat langsung disisipkan ke Microsoft Word pada Bab 4 (Hasil dan Pembahasan).\n`
      );

      for (let i = 0; i < pages.length; i++) {
        const p = pages[i];
        setExportProgress(`Memotret halaman ${i + 1} dari ${pages.length}: ${p.filename}...`);

        const el = pageRefs.current[p.id];
        if (el) {
          const dataUrl = await htmlToImage.toPng(el, {
            quality: 0.95,
            pixelRatio: 1.8,
            backgroundColor: '#f8fafc',
            skipFonts: true,
          });

          // Ambil data base64 tanpa header data:image/png;base64,
          const base64Data = dataUrl.split(',')[1];
          folder?.file(p.filename, base64Data, { base64: true });
        }
      }

      setExportProgress('Mengompresi semua halaman menjadi ZIP...');
      const content = await zip.generateAsync({ type: 'blob' });

      // Trigger download file zip
      const downloadUrl = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `BloodCare-Full-Pages-UI-Export-${new Date().toISOString().slice(0, 10)}.zip`;
      a.click();
      URL.revokeObjectURL(downloadUrl);

      setExportProgress('Selesai! File ZIP berhasil diunduh.');
      setTimeout(() => setExportProgress(''), 3000);
    } catch (err) {
      console.error('Gagal export ZIP:', err);
      alert('Terjadi kendala saat mengompres ZIP. Anda tetap bisa mengunduh gambar per satuan.');
    } finally {
      setIsExportingAllZip(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner Stitch AI Exporter */}
      <div className="max-w-7xl mx-auto mb-8 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold mb-3">
              <FolderArchive className="w-3.5 h-3.5" />
              <span>Full-Page UI Asset Exporter (Stitch AI Architecture)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Export Seluruh Halaman Web (.ZIP Lengkap)</span>
              <span className="text-xs bg-red-600 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                8 Halaman Utuh
              </span>
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
              Setiap halaman website BloodCare dirender <strong>secara penuh dari ujung paling atas hingga paling bawah</strong>. Anda bisa langsung menekan tombol merah untuk mengunduh satu paket file <strong>.ZIP</strong> berisi seluruh halaman beresolusi tinggi, atau mengunduh per-halaman secara terpisah.
            </p>
          </div>

          {/* Tombol Utama Download Semua ZIP */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleExportAllToZip}
              disabled={isExportingAllZip}
              className="px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white text-sm font-black rounded-2xl shadow-xl shadow-red-900/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isExportingAllZip ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{exportProgress || 'Sedang Memotret & Mengemas ZIP...'}</span>
                </>
              ) : (
                <>
                  <Archive className="w-5 h-5" />
                  <span>Download Semua Halaman (.ZIP)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Jump List */}
        <div className="mt-6 pt-6 border-t border-slate-700/60 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Lompat ke:</span>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                const el = pageRefs.current[p.id];
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              {p.filename.split('-Full')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* List Seluruh 8 Halaman Lengkap Dari Atas Sampai Bawah */}
      <div className="max-w-7xl mx-auto space-y-16">
        {pages.map((p) => {
          return (
            <div
              key={p.id}
              className="bg-slate-800/90 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl transition-all"
            >
              {/* Header Bar Tiap Halaman */}
              <div className="p-4 sm:p-5 bg-slate-850 border-b border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center font-black text-xs shrink-0">
                    <FileImage className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-black text-white">
                        {p.name}
                      </h2>
                      <span className="text-[10px] font-bold uppercase bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Tombol Aksi Download & Copy Satuan */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopySingle(p.id)}
                    className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Salin foto halaman utuh ini ke Clipboard (Bisa langsung paste di Word)"
                  >
                    {copiedId === p.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <span>Salin ke Word</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDownloadSingle(p.id, p.filename)}
                    disabled={downloadingId === p.id}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {downloadingId === p.id ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Rendering...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PNG HD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* BROWSER MOCKUP CONTAINER - MENAMPILKAN HALAMAN UTUH DARI ATAS SAMPAI BAWAH */}
              <div className="p-3 sm:p-6 bg-slate-950 flex justify-center">
                <div
                  ref={(el) => {
                    pageRefs.current[p.id] = el;
                  }}
                  className="w-full max-w-[1200px] bg-slate-50 text-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
                >
                  {/* Browser URL Bar Mockup */}
                  <div className="bg-slate-200/90 px-4 py-2.5 border-b border-slate-300 flex items-center justify-between text-slate-600 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 bg-white px-3 py-1 rounded-md border border-slate-300 ml-2">
                        https://bloodcare.id/{p.id.replace(/^\d+-/, '')}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                      <span>BloodCare Indonesia Platform</span>
                    </div>
                  </div>

                  {/* Isi Konten Utuh Halaman Asli */}
                  <div className="p-4 sm:p-6">
                    {p.component}
                  </div>

                  {/* Footer Web Realistis di Bawah Gambar */}
                  <div className="bg-slate-900 text-white p-6 border-t border-slate-200 text-xs">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
                      <p>© 2026 BloodCare Indonesia • Terhubung UDD PMI Pekanbaru &amp; Kemenkes RI</p>
                      <p className="font-mono text-[10px]">Dokumentasi Antarmuka Sistem Informasi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Baris Keterangan File */}
              <div className="px-5 py-3 bg-slate-850 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px] text-slate-300">
                  📁 File Output ZIP: <strong>{p.filename}</strong>
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Full-Height Resolution (Header sampai Footer)
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button di Kanan Bawah */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleExportAllToZip}
          disabled={isExportingAllZip}
          className="px-5 py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-black rounded-full shadow-2xl transition-all flex items-center gap-2 border-2 border-white/20 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Archive className="w-4 h-4" />
          <span>{isExportingAllZip ? exportProgress : 'Download Semua (.ZIP)'}</span>
        </button>
      </div>

    </div>
  );
};

/* =========================================================================
   MOCKUP KOMPLET UNTUK DASHBOARD UTAMA DENGAN SELURUH KOMPONEN OPERASIONAL
   ========================================================================= */
function FullDashboardViewMock() {
  const [selectedBlood, setSelectedBlood] = useState<BloodGroup | 'Semua'>('Semua');
  const [selectedRh, setSelectedRh] = useState<Rhesus | null>('+');
  const [selectedComp, setSelectedComp] = useState<BloodComponent | null>('PRC');

  return (
    <div className="space-y-6">
      
      {/* 1. Hero Quick Cards */}
      <HeroQuickCards
        onOpenUrgentRequests={() => {}}
        onOpenSchedules={() => {}}
        onOpenScreening={() => {}}
        onOpenConsultation={() => {}}
        onOpenSupplements={() => {}}
        onOpenLabResults={() => {}}
      />

      {/* 2. Grid 2 Kolom (Kiri: Filter + Permintaan Darurat + Peta + Widget, Kanan: Paspor + FastPass + Reward) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri */}
        <div className="lg:col-span-8 space-y-6">
          <BloodFilterSection
            selectedBloodGroup={selectedBlood}
            onSelectBloodGroup={setSelectedBlood}
            selectedRhesus={selectedRh}
            onSelectRhesus={setSelectedRh}
            selectedComponent={selectedComp}
            onSelectComponent={setSelectedComp}
            selectedLocation="Pekanbaru, Riau"
            onSelectLocation={() => {}}
            activeCity="Pekanbaru, Riau"
            matchCount={initialBloodRequests.length}
          />

          <EmergencyRequestsList
            requests={initialBloodRequests}
            onBantuSekarang={() => {}}
            onOpenNewRequestModal={() => {}}
            onShareWhatsApp={() => {}}
          />

          <RadarMapSection
            onOpenFacilitiesTab={() => {}}
          />

          <BloodCompatibilityWidget />
        </div>

        {/* Kolom Kanan */}
        <div className="lg:col-span-4 space-y-6">
          <DonorPassportCard
            donor={initialDonor}
            onOpenHistory={() => {}}
            onOpenCertificate={() => {}}
          />

          <FastPassScreeningCard
            onShowFullQR={() => {}}
            onRetakeScreening={() => {}}
          />

          <RewardsCatalogueCard
            currentPoints={initialDonor.current_points}
            rewards={initialRewards}
            onRedeemReward={() => {}}
            onOpenFullCatalog={() => {}}
          />
        </div>

      </div>

      {/* 3. Edukasi & Humaniora Artikel */}
      <ArticlesSection
        articles={initialArticles}
        onOpenArticle={() => {}}
        onViewAllArticles={() => {}}
      />

    </div>
  );
}
