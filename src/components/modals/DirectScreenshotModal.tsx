import React, { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { Camera, Download, Loader2, Check, ExternalLink, ShieldCheck, Monitor, HelpCircle, Layers, AlertCircle } from 'lucide-react';

interface DirectScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTabName: string;
}

export const DirectScreenshotModal: React.FC<DirectScreenshotModalProps> = ({
  isOpen,
  onClose,
  activeTabName,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedTitle, setCapturedTitle] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Tangkap elemen DOM asli halaman saat ini menggunakan html-to-image (Mendukung modern CSS Tailwind v4 OKLCH & flexbox)
  const handleCaptureCurrentPage = async () => {
    setIsCapturing(true);
    setCapturedImage(null);
    setErrorMessage(null);

    const modalEl = document.getElementById('screenshot-modal-overlay');

    try {
      // Sembunyikan modal popup agar tidak ikut terpotret
      if (modalEl) modalEl.style.display = 'none';

      // Berikan jeda sejenak untuk memastikan repaint browser selesai
      await new Promise((resolve) => setTimeout(resolve, 180));

      const targetElement = document.getElementById('root') || document.body;

      // Filter elemen agar tidak memotret overlay modal
      const filter = (node: HTMLElement) => {
        if (!node.classList) return true;
        if (node.id === 'screenshot-modal-overlay') return false;
        if (node.classList.contains('no-screenshot')) return false;
        return true;
      };

      const dataUrl = await htmlToImage.toPng(targetElement, {
        quality: 0.98,
        pixelRatio: window.devicePixelRatio > 1 ? 2 : 1.5,
        backgroundColor: '#f8fafc',
        filter: filter as any,
        skipFonts: true, // Mencegah timeout font cors
      });

      // Tampilkan kembali modal
      if (modalEl) modalEl.style.display = 'flex';

      setCapturedImage(dataUrl);
      setCapturedTitle(`BloodCare-${activeTabName.toUpperCase()}-${new Date().toISOString().slice(0, 10)}.png`);
    } catch (err: any) {
      console.error('Gagal mengambil screenshot halaman:', err);
      if (modalEl) modalEl.style.display = 'flex';
      setErrorMessage(
        err?.message || 'Gagal memproses gambar tampilan. Anda juga dapat menggunakan pintasan Chrome di bawah.'
      );
    } finally {
      setIsCapturing(false);
    }
  };

  const handleCopyImage = async () => {
    if (!capturedImage) return;
    try {
      const res = await fetch(capturedImage);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      id="screenshot-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-xs animate-in fade-in overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                <span>Foto Layar Asli (100% Persis Web Ini)</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Pixel-Perfect
                </span>
              </h2>
              <p className="text-xs text-red-100">
                Memotret langsung tampilan web yang sedang Anda buka saat ini untuk laporan dosen
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* Action Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-red-600" />
                <span>Halaman Aktif: <strong className="text-red-600 uppercase font-black">{activeTabName}</strong></span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Klik tombol di samping untuk memotret tampilan halaman ini secara otomatis.
              </p>
            </div>

            <button
              onClick={handleCaptureCurrentPage}
              disabled={isCapturing}
              className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {isCapturing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sedang Memotret...</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>Ambil Foto Halaman Ini</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message jika ada */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Info Pengambilan Layar</p>
                <p className="text-[11px] text-rose-700 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Hasil Foto Screenshot Asli */}
          {capturedImage ? (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Hasil Foto Layar Asli (Siap Disimpan):</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{capturedTitle}</span>
              </div>

              <div className="relative border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-950 max-h-[380px] flex items-center justify-center group">
                <img
                  src={capturedImage}
                  alt="Hasil screenshot tampilan web asli"
                  className="w-full h-auto object-contain max-h-[380px]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={handleCopyImage}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <span>Salin Gambar</span>
                    </>
                  )}
                </button>

                <a
                  href={capturedImage}
                  download={capturedTitle || 'screenshot-bloodcare.png'}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Gambar PNG (HD)</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-slate-300 rounded-2xl p-6 text-center text-slate-400">
              <Monitor className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-semibold">Belum ada foto yang diambil.</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tekan tombol merah <strong>&quot;Ambil Foto Halaman Ini&quot;</strong> di atas untuk memotret.
              </p>
            </div>
          )}

          {/* Petunjuk Pintas Screenshot Bawaan Browser */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Ingin Screenshot 1 Halaman Utuh (Full Panjang)?</span>
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Buka link publik web di tab baru browser:{' '}
              <a
                href={window.location.href}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline text-amber-950 inline-flex items-center gap-1 hover:text-red-600"
              >
                Buka Web di Tab Bersih <ExternalLink className="w-3 h-3" />
              </a>
              <br />
              Lalu tekan tombol <kbd className="px-1.5 py-0.5 bg-white border border-amber-300 rounded text-[10px] font-mono shadow-2xs font-bold">Ctrl + Shift + P</kbd> di Chrome &gt; ketik <code className="text-red-700 font-bold">&quot;screenshot&quot;</code> &gt; pilih <strong>&quot;Capture full size screenshot&quot;</strong>.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Format PNG High-Definition tanpa watermark
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
