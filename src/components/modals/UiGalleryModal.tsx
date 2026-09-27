import React, { useState } from 'react';
import { Download, Image as ImageIcon, ExternalLink, Check, Copy } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
}

export const UiGalleryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const galleryItems: GalleryItem[] = [
    {
      id: 'img-dashboard',
      title: '1. Dashboard Utama & Radar Permintaan Darah',
      category: 'Dashboard',
      description: 'Menampilkan Quick Action Card (Paspor Digital, Fast-Pass QR, Katalog Reward), Pusat Filter Golongan Darah/Wilayah, dan kartu pasien darurat aktif.',
      imageSrc: '/src/assets/images/ui_dashboard_preview_1790492815759.jpg',
    },
    {
      id: 'img-admin',
      title: '2. Panel Kendali Administrator Faskes & PMI',
      category: 'Admin',
      description: 'Menampilkan metrik KPI (Permintaan Aktif, Terpenuhi, Total Pendonor, Faskes Mitra), serta tabel CRUD lengkap dengan audit jejak petugas.',
      imageSrc: '/src/assets/images/ui_admin_preview_1790492834646.jpg',
    },
    {
      id: 'img-landing',
      title: '3. Landing Page Publik BloodCare',
      category: 'Landing',
      description: 'Halaman beranda publik dengan CTA donor, transparansi bank darah, keunggulan ekosistem PMI, dan edukasi donor darah.',
      imageSrc: '/src/assets/images/ui_landing_preview_1790492851523.jpg',
    },
    {
      id: 'img-mobile',
      title: '4. Mockup Multi-Device & Mobile Responsif',
      category: 'Mockup',
      description: 'Presentasi UI aplikasi di perangkat smartphone dan desktop, cocok untuk lampiran bab hasil dan pembahasan laporan tugas akhir.',
      imageSrc: '/src/assets/images/ui_mobile_preview_1790492867915.jpg',
    },
  ];

  const filteredItems =
    selectedCategory === 'semua'
      ? galleryItems
      : galleryItems.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Galeri Tangkapan Layar UI Web BloodCare
              </h2>
              <p className="text-xs text-red-100">
                Gambar resolusi tinggi siap unduh & tempel untuk laporan dosen / tugas akhir
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors font-bold"
          >
            ✕
          </button>
        </div>

        {/* Filter chips */}
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5">
            {['semua', 'Dashboard', 'Admin', 'Landing', 'Mockup'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            💡 Tips: Klik kanan &quot;Save image as...&quot; atau tombol download
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="p-5 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative group bg-slate-900 aspect-video flex items-center justify-center overflow-hidden">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <a
                      href={item.imageSrc}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg shadow flex items-center gap-1 hover:bg-slate-100"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Buka Full
                    </a>
                    <a
                      href={item.imageSrc}
                      download={`${item.id}.jpg`}
                      className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1 hover:bg-red-700"
                    >
                      <Download className="w-3.5 h-3.5" /> Unduh
                    </a>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-100 text-red-700 mb-1.5">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <a
                      href={item.imageSrc}
                      download={`${item.id}.jpg`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Gambar</span>
                    </a>

                    <button
                      onClick={() => handleCopy(item.id, item.imageSrc)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition-colors"
                      title="Salin Link Gambar"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Salin Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-500">
            Format: High Resolution 16:9 • Sangat tajam untuk disisipkan ke Microsoft Word / PowerPoint / PDF Laporan.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
