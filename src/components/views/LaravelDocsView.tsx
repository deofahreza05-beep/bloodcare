import React, { useState } from 'react';
import { 
  Code, 
  Terminal, 
  Database, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ExternalLink,
  BookOpen,
  Server
} from 'lucide-react';
import { laravelFiles, laragonSetupGuide } from '../../data/laravelCodeSnippets';

export const LaravelDocsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Guide');
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const categories = ['Guide', 'Migration', 'Model', 'Controller', 'Route', 'Seeder', 'Config'];

  const filteredFiles = laravelFiles.filter((f) => f.category === selectedCategory);
  const currentFile = selectedCategory === 'Guide' ? null : filteredFiles[activeFileIndex] || filteredFiles[0];

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-200 uppercase tracking-wider mb-1">
            <Server className="w-3.5 h-3.5" />
            <span>Arsitektur Standar Laravel 11/12 MVC + MySQL Laragon</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Dokumentasi & Source Code Lengkap BloodCare
          </h1>
          <p className="text-xs text-rose-100 max-w-xl mt-1">
            Struktur kode rapi: 14 Tabel Database dengan Foreign Key, Model Eloquent dengan Relasi, Validasi, Controller MVC, Seeder, dan Panduan VS Code + Laragon.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => {
              const docContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Naskah Presentasi BloodCare</title>
<style>
  body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.6; color: #1f2937; padding: 40px; }
  h1 { color: #dc2626; font-size: 24pt; border-bottom: 2px solid #dc2626; padding-bottom: 8px; margin-bottom: 20px; }
  h2 { color: #991b1b; font-size: 16pt; margin-top: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
  h3 { color: #1e3a8a; font-size: 13pt; margin-top: 16px; }
  .script-box { background: #f3f4f6; border-left: 4px solid #dc2626; padding: 12px 16px; font-style: italic; margin: 10px 0; }
  .action-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 10px 14px; margin: 10px 0; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  th, td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; }
  th { background-color: #f9fafb; font-weight: bold; }
  .badge { background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10pt; }
</style>
</head>
<body>
  <h1>PANDUAN & NASKAH PRESENTASI RESMI (DEMO SCRIPT)<br><span style="font-size: 16pt; color: #4b5563;">Sistem Informasi Donor Darah & Layanan Medis (BloodCare)</span></h1>
  
  <p><strong>Aplikasi:</strong> BloodCare — Ekosistem Darah & Pelayanan Medis<br>
  <strong>Teknologi:</strong> Laravel 11 MVC + MySQL (Laragon) & React + Tailwind CSS<br>
  <strong>Waktu Presentasi:</strong> 7 - 10 Menit</p>

  <hr>

  <h2>BAGIAN 1: PEMBUKAAN (DURASI: 1 MENIT)</h2>
  <div class="script-box">
    "Selamat pagi/siang Bapak/Ibu dewan penguji dan rekan-rekan sekalian. Perkenalkan saya [Nama Anda]. Hari ini saya dengan bangga mempresentasikan project BloodCare: Sistem Informasi Donor Darah dan Layanan Medis Terpadu.<br><br>
    Latar belakang project ini berangkat dari kendala krusial di lapangan: keterlambatan pencarian donor saat kondisi kritis operasi atau DBD, minimnya transparansi stok darah di rumah sakit, serta antrean formulir manual di posko PMI yang memakan waktu lama. BloodCare hadir sebagai solusi ekosistem digital terintegrasi yang menghubungkan pasien gawat darurat, pendonor sukarela, faskes rumah sakit, dan PMI secara real-time."
  </div>

  <h2>BAGIAN 2: DEMONSTRASI FITUR UTAMA (DURASI: 5 - 7 MENIT)</h2>

  <h3>1. Halaman Beranda & Pusat Filter Kebutuhan Darah</h3>
  <div class="action-box">
    <strong>Tindakan di Layar:</strong> Buka halaman Beranda. Klik tombol filter golongan darah (A, B, AB, O), ubah Rhesus (+ / -), dan pilih komponen darah (PRC, TC, WB).
  </div>
  <div class="script-box">
    "Di halaman utama, masyarakat disajikan Pusat Filter Kebutuhan Darah. Sistem secara cerdas memfilter pasien yang butuh darah darurat di rumah sakit Pekanbaru berdasarkan golongan darah dan komponen spesifik, seperti Packed Red Cells atau Trombosit Konsentrat."
  </div>

  <h3>2. Penyelamatan Darurat: Fitur 'Bantu Sekarang' & Integrasi WhatsApp</h3>
  <div class="action-box">
    <strong>Tindakan di Layar:</strong> Pada kartu pasien darurat (Ny. Siti Rahma), klik tombol merah 'Bantu Sekarang'. Pilih 1 kantong dan checklist syarat kesehatan, lalu klik 'Konfirmasi Ikrar Donor'. Perhatikan progress bar bertambah dan notifikasi poin muncul di layar. Lalu klik 'Bagikan (WA)'.
  </div>
  <div class="script-box">
    "Saat pendonor melihat ada pasien kritis, mereka cukup menekan tombol 'Bantu Sekarang'. Pendonor menentukan jumlah kantong dan waktu kedatangan ke rumah sakit. Sistem secara instan memperbarui persentase keterpenuhan darah pasien, dan pendonor langsung mendapatkan reward poin amal. Selain itu, ada tombol 'Bagikan (WA)' untuk menyebarkan seruan darurat ini ke grup keluarga atau komunitas."
  </div>

  <h3>3. Paspor Relawan PMI & Fast-Pass Skrining Mandiri (QR Code)</h3>
  <div class="action-box">
    <strong>Tindakan di Layar:</strong> Tunjukkan kartu Paspor Relawan (dr. Adi Putra) di sidebar kanan dengan pencapaian 8 kali donor dan hitung mundur jadwal berikutnya. Lalu klik kartu 'Fast-Pass Skrining Mandiri' untuk membuka pop-up QR Code digital.
  </div>
  <div class="script-box">
    "Fitur unggulan berikutnya adalah Paspor Relawan Digital dan Fast-Pass Skrining Mandiri. Calon pendonor dapat mengisi kuisioner kelayakan kesehatan online (tensi, Hb, berat badan, jam tidur) dalam 2 menit. Jika dinyatakan 'Fit', sistem menerbitkan tiket QR Code Fast-Pass digital. Di posko PMI, pendonor cukup menunjukkan QR Code ini tanpa perlu antre mengisi formulir kertas manual lagi."
  </div>

  <h3>4. Gamifikasi: Poin Amal & Katalog Apresiasi Pendonor</h3>
  <div class="action-box">
    <strong>Tindakan di Layar:</strong> Buka Katalog Apresiasi di sidebar kanan. Klik tombol tukar pada 'Paket Sangobion & Fe' (450 Pts) atau 'Voucher Apotek Kimia Farma'. Klik 'Konfirmasi Tukar' dan tunjukkan kode voucher yang muncul.
  </div>
  <div class="script-box">
    "Untuk memotivasi generasi muda agar rutin mendonorkan darah setiap 60 hari, BloodCare memiliki sistem apresiasi. Poin amal yang terkumpul dapat ditukarkan dengan suplemen penambah darah, voucher belanja obat di Kimia Farma, atau diskon pemeriksaan darah lengkap di Prodia."
  </div>

  <h3>5. Peta Radar Stok Darah & Posko PMI Terkini</h3>
  <div class="action-box">
    <strong>Tindakan di Layar:</strong> Scroll ke peta radar. Klik pin lokasi 'RSUD Arifin Achmad', 'UDD PMI Diponegoro', dan 'Bus Donor Mall SKA'.
  </div>
  <div class="script-box">
    "Melalui visualisasi radar real-time radius 15 km, masyarakat dapat memantau ketersediaan stok darah di rumah sakit serta mengetahui jadwal Bus Donor Keliling yang sedang beroperasi di pusat keramaian."
  </div>

  <h3>6. Telemedisin Dokter Spesialis & Hasil Lab SatuSehat</h3>
  <div class="action-box">
    <strong>Tindakan di Layar:</strong> Klik tab 'Telemedisin PMI'. Pilih salah satu dokter dan simulasikan kirim chat. Lalu buka modal 'Histori & Hasil Lab SatuSehat'.
  </div>
  <div class="script-box">
    "Pendonor yang memiliki keluhan anemia atau hemoglobin rendah dapat berkonsultasi langsung melalui fitur Telemedisin dengan dokter spesialis hematologi PMI. Selain itu, riwayat hasil uji saring IMLTD (HIV, Hepatitis, Sifilis) tersimpan aman dan terintegrasi standar SatuSehat Kemenkes RI."
  </div>

  <h3>7. Dashboard Admin (CRUD & Manajemen Stok)</h3>
  <div class="action-box">
    <strong>Tindakan di Layar:</strong> Klik tab 'Admin Panel'. Ubah status permintaan pasien dari Aktif menjadi Terpenuhi. Buka tab 'Stok Darah Faskes' dan tekan tombol '+' atau '-' untuk mengubah jumlah kantong fisik.
  </div>
  <div class="script-box">
    "Untuk sisi pengelola, petugas PMI dan rumah sakit memiliki hak akses Dashboard Admin untuk mengelola status permintaan darah, memperbarui stok kantong darah fisik, serta memvalidasi data relawan secara terpusat."
  </div>

  <h2>BAGIAN 3: KESIMPULAN & PENUTUP (DURASI: 1 MENIT)</h2>
  <div class="script-box">
    "Sebagai kesimpulan, BloodCare mentransformasi ekosistem donor darah konvensional menjadi layanan terpadu yang cepat, transparan, dan terdigitalisasi secara penuh dari hulu ke hilir.<br><br>
    Demikian presentasi saya. Terima kasih atas perhatian Bapak/Ibu dewan penguji. Saya siap membuka sesi diskusi dan tanya jawab."
  </div>

  <h2>BAGIAN 4: PREDIKSI PERTANYAAN PENGUJI & JAWABAN REKOMENDASI</h2>
  <table>
    <tr>
      <th style="width: 35%;">Pertanyaan Penguji</th>
      <th>Jawaban Rekomendasi Anda</th>
    </tr>
    <tr>
      <td><strong>Bagaimana struktur database aplikasi ini?</strong></td>
      <td>"Database BloodCare dirancang dengan 14 tabel relasional MySQL (users, donors, blood_requests, blood_stocks, health_facilities, donation_schedules, screenings, lab_results, dll) yang terhubung menggunakan Foreign Key dan Indexing untuk performa pencarian yang cepat."</td>
    </tr>
    <tr>
      <td><strong>Bagaimana keamanan data uji lab pasien?</strong></td>
      <td>"Hasil uji lab IMLTD dilindungi hak akses terotentikasi dan dirancang mengikuti format interoperabilitas rekam medis standar SatuSehat Kementerian Kesehatan RI."</td>
    </tr>
    <tr>
      <td><strong>Apa inovasi utama BloodCare dibanding website PMI biasa?</strong></td>
      <td>"Inovasi utamanya adalah integrasi 3 pilar: (1) Sistem respon cepat permintaan darah darurat dengan tombol Bantu Sekarang, (2) Fast-Pass QR Code paperless untuk memotong antrean, dan (3) Gamifikasi katalog apresiasi pendonor."</td>
    </tr>
  </table>
</body>
</html>`;

              const blob = new Blob(['\ufeff' + docContent], { type: 'application/msword' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'Naskah_Presentasi_BloodCare.doc';
              a.click();
            }}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <BookOpen className="w-4 h-4 text-slate-900" />
            <span>Unduh Naskah Presentasi (.doc Word)</span>
          </button>

          <button
            onClick={() => {
              const allCode = laravelFiles.map((f) => `/* File: ${f.path} */\n${f.content}\n\n`).join('');
              const blob = new Blob([laragonSetupGuide + '\n\n' + allCode], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'bloodcare-laravel-mvc-codebase.txt';
              a.click();
            }}
            className="px-4 py-2.5 bg-white text-red-700 hover:bg-rose-50 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Paket Kode Laravel</span>
          </button>

          <a
            href="/bloodcare_db.sql"
            download="bloodcare_db.sql"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            title="Download file .SQL untuk langsung di-import ke phpMyAdmin atau HeidiSQL Laragon tanpa perlu ketik terminal!"
          >
            <Database className="w-4 h-4" />
            <span>Download Database .SQL (Langsung Import)</span>
          </a>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveFileIndex(0);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'Guide' ? '📖 Panduan Laragon' : cat}
          </button>
        ))}
      </div>

      {/* Guide View */}
      {selectedCategory === 'Guide' ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-red-600" />
              <span>Langkah Menjalankan Project BloodCare di Laragon (VS Code)</span>
            </h2>

            <button
              onClick={() => handleCopy(laragonSetupGuide)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Panduan'}</span>
            </button>
          </div>

          <div className="prose prose-sm max-w-none text-slate-700 text-xs leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
            {laragonSetupGuide}
          </div>
        </div>
      ) : (
        /* Code File Explorer View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          
          {/* File selector subheader */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {filteredFiles.map((file, idx) => (
                <button
                  key={file.path}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeFileIndex === idx
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {file.path.split('/').pop()}
                </button>
              ))}
            </div>

            {currentFile && (
              <button
                onClick={() => handleCopy(currentFile.content)}
                className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin Kode File'}</span>
              </button>
            )}
          </div>

          {/* File Path Header */}
          {currentFile && (
            <div className="px-4 py-2 bg-slate-900 text-slate-300 font-mono text-[11px] flex items-center justify-between border-b border-slate-800">
              <span>{currentFile.path}</span>
              <span className="text-slate-500 uppercase">{currentFile.category}</span>
            </div>
          )}

          {/* Code Viewer */}
          <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px]">
            <pre>
              <code>{currentFile?.content}</code>
            </pre>
          </div>

        </div>
      )}

    </div>
  );
};
