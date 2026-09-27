import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Users, 
  Activity, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Award,
  CheckCircle,
  AlertCircle,
  Building2,
  Share2,
  CalendarCheck,
  ChevronDown,
  Quote,
  Star,
  Thermometer,
  Shield,
  FileCheck2,
  Zap,
  HelpCircle
} from 'lucide-react';
import { BloodGroup, BloodRequest } from '../../types';
import hospitalHeroImg from '../../assets/images/hospital_bloodcare_hero_1790364559545.jpg';
import labDoctorImg from '../../assets/images/hospital_lab_doctor_1790364703647.jpg';

interface LandingPageViewProps {
  onStartDonation: () => void;
  onRequestBlood: () => void;
  onExploreFacilities: () => void;
  onViewLiveDashboard: () => void;
  latestRequest?: BloodRequest;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onStartDonation,
  onRequestBlood,
  onExploreFacilities,
  onViewLiveDashboard,
  latestRequest,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa saja syarat dasar untuk mendonorkan darah di BloodCare?',
      a: 'Berusia 17-60 tahun, berat badan minimal 45 kg, tekanan darah normal (sistol 100-150 mmHg, diastol 70-90 mmHg), kadar hemoglobin 12.5 - 17.0 g/dL, serta memiliki jeda minimal 60 hari sejak donor darah terakhir.'
    },
    {
      q: 'Apakah ada biaya yang dikenakan untuk keluarga pasien yang membutuhkan darah?',
      a: 'Layanan pencarian relawan di BloodCare 100% GRATIS dan non-komersial. Pasien pemegang BPJS Kesehatan tidak dikenakan Biaya Pengganti Pengolahan Darah (BPPD) di rumah sakit rekanan PMI sesuai regulasi Kemenkes.'
    },
    {
      q: 'Bagaimana keamanan dan sterilitas kantong darah yang didistribusikan?',
      a: 'Seluruh darah melalui skrining 4 parameter IMLTD (Infeksi Menular Lewat Transfusi Darah) di laboratorium UDD PMI: Uji Hepatitis B (HBsAg), Hepatitis C (Anti-HCV), HIV, dan Sifilis dengan metode otomatis CLIA/NAT berstandar internasional.'
    },
    {
      q: 'Bagaimana cara relawan mendapatkan Piagam dan Poin Penghargaan?',
      a: 'Setelah selesai mendonor di faskes, relawan mencatat atau memindai kode kegiatan di aplikasi. Sistem akan otomatis menerbitkan Piagam Relawan ber-QR code dan menambahkan Poin Sosial yang dapat ditukar dengan paket suplemen penambah darah.'
    }
  ];

  const testimonials = [
    {
      name: 'dr. Hendra Pratama, Sp.An',
      role: 'Kepala Instalasi Gawat Darurat RSUD',
      quote: 'Di ruang operasi darurat, hitungan menit adalah pembeda antara hidup dan mati. BloodCare memangkas waktu tunggu pencarian darah O- rhesus langka dari 4 jam menjadi hanya 25 menit.',
      rating: 5,
    },
    {
      name: 'Rian Kurniawan (Gol. Darah B+)',
      role: 'Relawan Donor Aktif (18x Donor)',
      quote: 'Sebagai pendonor sukarela, aplikasi ini sangat transparan. Saya langsung tahu kapan waktu donor saya tiba dan bisa melihat langsung pasien di RS mana yang sedang saya tolong.',
      rating: 5,
    },
    {
      name: 'Farida Nurul (Keluarga Pasien)',
      role: 'Pekanbaru',
      quote: 'Saat ibu saya kritis butuh trombosit apheresis tengah malam, form darurat BloodCare langsung menyebarkan siaga ke grup relawan. Alhamdulillah 2 kantong terpenuhi sebelum subuh.',
      rating: 5,
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 pb-20">
      
      {/* 1. HERO SECTION WITH HOSPITAL BACKGROUND */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 md:pt-24 md:pb-32">
        {/* Hospital Photography Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hospitalHeroImg})` }}
        />

        {/* Sophisticated Dark Ruby / Medical Gradient Overlay to guarantee pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-red-900/85 to-slate-950/80 backdrop-blur-[2px]"></div>

        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:36px_36px]"></div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mission statement & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-xs font-semibold text-rose-100">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Platform Jejaring Darah Cito 24 Jam Terpadu PMI & Faskes
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Satu Kantong Darah, <br className="hidden sm:inline" />
                <span className="text-amber-300">Tiga Nyawa</span> Terselamatkan.
              </h1>

              <p className="text-base sm:text-lg text-rose-100/90 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                BloodCare menghubungkan pasien kritis di rumah sakit dengan ribuan pendonor sukarela dan Bank Darah PMI secara real-time. Cepat, aman, dan tanpa biaya perantara.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={onRequestBlood}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-red-700 hover:bg-rose-50 font-black text-sm rounded-xl shadow-lg shadow-black/15 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Saya Butuh Darah Cepat
                </button>
                <button
                  onClick={onStartDonation}
                  className="w-full sm:w-auto px-6 py-3.5 bg-red-800/80 hover:bg-red-900 border border-white/20 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  Daftar Jadi Pendonor
                </button>
                <button
                  onClick={onViewLiveDashboard}
                  className="w-full sm:w-auto px-4 py-3.5 text-xs font-bold text-rose-100 hover:text-white hover:underline flex items-center justify-center gap-1"
                >
                  Buka Radar & Permintaan Aktif
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                  <div className="text-xs text-rose-200">Non-Komersial & Bebas Biaya</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">&lt; 15 Mnt</div>
                  <div className="text-xs text-rose-200">Respon Sinyal Darurat</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">1.800+</div>
                  <div className="text-xs text-rose-200">Relawan Aktif Terverifikasi</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Card Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-800 border border-white/40 relative">
                
                {/* Header status inside card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                    </span>
                    <span className="text-xs font-black uppercase text-red-600 tracking-wider">
                      Siaga Darurat Terkini
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">Live Feed</span>
                </div>

                {/* Live Latest Emergency Item */}
                <div className="mt-4 p-4 rounded-2xl bg-red-50/70 border border-red-100">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-red-700 bg-red-200/70 px-2 py-0.5 rounded">
                        {latestRequest ? (latestRequest.urgency_badge || 'CITO / SEGERA') : 'CITO / SEGERA'}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1.5">
                        {latestRequest ? `${latestRequest.patient_name} (${latestRequest.patient_age} th)` : 'Ny. Siti Rahma (34 th)'}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {latestRequest ? `${latestRequest.health_facility_name} · ${latestRequest.location_detail}` : 'RSUD Arifin Achmad · ICU Kebidanan'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex flex-col items-center justify-center font-black shadow-sm shrink-0">
                      <span className="text-base leading-none">
                        {latestRequest ? latestRequest.blood_group : 'O'}
                      </span>
                      <span className="text-[10px] leading-none">
                        {latestRequest ? latestRequest.rhesus : '+'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-red-200/50">
                    <span>
                      Dibutuhkan: <strong>{latestRequest ? `${latestRequest.bags_needed - latestRequest.bags_fulfilled} Kantong ${latestRequest.component}` : '3 Kantong PRC'}</strong>
                    </span>
                    <span className="text-red-700 font-bold">
                      {latestRequest ? (latestRequest.deadline_text || 'Hari Ini') : 'Tersisa 3 Jam'}
                    </span>
                  </div>
                </div>

                {/* Live Stock Snippet */}
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                    <span>Ketersediaan Darah UDD PMI Hari Ini</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">● Terhubung</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { group: 'A', stock: 'Aman', color: 'text-emerald-700 bg-emerald-50' },
                      { group: 'B', stock: 'Aman', color: 'text-emerald-700 bg-emerald-50' },
                      { group: 'AB', stock: 'Kritis', color: 'text-amber-800 bg-amber-50 font-bold' },
                      { group: 'O', stock: 'Waspada', color: 'text-rose-700 bg-rose-50 font-bold' },
                    ].map((s) => (
                      <div key={s.group} className={`p-2 rounded-xl text-center border border-slate-100 ${s.color}`}>
                        <div className="text-sm font-black">{s.group}</div>
                        <div className="text-[10px]">{s.stock}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={onViewLiveDashboard}
                  className="mt-5 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Masuk ke Portal Operasional
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE CLINICAL & SAFETY STANDARDS SHOWCASE */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Lab Image with Badges */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src={labDoctorImg}
                  alt="Laboratorium Skrining Darah Berstandar Medis"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                      <Thermometer className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900">
                        Cold-Chain & Skrining IMLTD 100% Terverifikasi
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Penyimpanan suhu terkontrol 2°C - 6°C & uji reaktifitas bebas HIV, Hepatitis B/C, Sifilis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Standard Points */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-black uppercase text-red-600 tracking-wider">
                  Standar Mutu Medis Internasional
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Keamanan Transfusi Tanpa Kompromi
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Setiap tetes darah yang terkoordinasi melalui BloodCare memenuhi kaidah Cara Pembuatan Obat yang Baik (CPOB) dan standar Badan Pengawas Obat dan Makanan (BPOM).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">4 Parameter IMLTD</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Uji saring serologi akurat guna menjamin darah penerima 100% aman dan steril.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-red-600 flex items-center justify-center mb-2.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Respons Cito Tercepat</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Sistem notifikasi multi-kanal (Web Push & WhatsApp API) dalam hitungan detik.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Piagam Ber-QR Code</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Sertifikasi resmi digital terverifikasi untuk setiap partisipasi relawan pendonor.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Kemitraan Faskes Resmi</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Terintegrasi dengan jaringan RSUD, RS Swasta terakreditasi, dan UDD PMI.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CARA KERJA & ALUR SISTEM */}
      <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-black uppercase text-red-600 tracking-wider">
            Alur Terstruktur & Transparan
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Bagaimana BloodCare Bekerja Menyelamatkan Nyawa?
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Dirancang dengan standar operasional prosedur Unit Donor Darah (UDD) Palang Merah Indonesia untuk kecepatan respon dan akurasi medis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-lg mb-5">
              1
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Pendaftaran Kebutuhan Pasien
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Keluarga pasien atau tim medis rumah sakit mendaftarkan kebutuhan darah, golongan darah spesifik, komponen yang dibutuhkan (PRC, TC, FFP), dan nomor rekam medis.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-red-600 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Verifikasi Formulir Otomatis
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-lg mb-5">
              2
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Broadcast Real-Time & Peta Radar
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sistem menyiarkan notifikasi ke relawan terdekat yang memiliki golongan darah kompatibel dan menampilkan lokasi rumah sakit di radar faskes interaktif.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Notifikasi Web & WhatsApp Cepat
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-lg mb-5">
              3
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Ikrar Donasi & Piagam Resmi
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pendonor hadir di rumah sakit/UDD PMI, melakukan transfusi yang aman, dan langsung menerima poin sosial, Paspor Relawan, serta Piagam Resmi UDD PMI.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-600 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Piagam Digital Ber-QR Code
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS / DUKUNGAN TENAGA MEDIS & RELAWAN */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-black uppercase text-red-600 tracking-wider">
              Suara Garis Depan
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Dipercaya Dokter, Relawan, dan Ribuan Keluarga
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="font-bold text-sm text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FITUR UTAMA & KEUNGGULAN */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-black uppercase text-red-600 tracking-wider">
              Ekosistem Lengkap
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Fitur Lengkap untuk Pasien, Relawan, & Tenaga Medis
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-red-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">
                Siaga Cito 24 Jam
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Akses hotline darurat SPGDT 119 dan UDD PMI langsung dari layar manapun tanpa hambatan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-red-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">
                Radar Rumah Sakit & Faskes
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Peta lokasi interaktif mencakup RSUD, RS Swasta, dan Bank Darah PMI lengkap dengan rute Google Maps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-red-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">
                Kalkulator Kompatibilitas
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cek seketika kecocokan transfusi antar golongan darah dan rhesus berdasarkan kaidah medis hematologi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-red-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1.5">
                Sertifikat & Reward Amal
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Piagam donor resmi yang dapat dicetak/PDF serta penukaran poin amal untuk apresiasi relawan setia.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ (PERTANYAAN SERING DIAJUKAN) */}
      <section className="py-16 max-w-[900px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-red-600 tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            Pusat Informasi & FAQ
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ketahui regulasi medis, keamanan transfusi, dan cara kerja relawan BloodCare.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 cursor-pointer hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="mt-8 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              Ada Pasien yang Sedang Berjuang Detik Ini.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Jangan biarkan keterlambatan pasokan darah menjadi penghalang kesembuhan. Masuk ke aplikasi dan temukan pasien yang membutuhkan bantuan Anda hari ini.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onViewLiveDashboard}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                Masuk ke Dashboard Utama
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreFacilities}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                Cari Lokasi UDD PMI Terdekat
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

