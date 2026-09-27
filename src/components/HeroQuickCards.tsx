import React from 'react';
import { 
  AlertCircle, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  Pill, 
  FileText, 
  ArrowRight 
} from 'lucide-react';

interface HeroQuickCardsProps {
  onOpenUrgentRequests: () => void;
  onOpenSchedules: () => void;
  onOpenScreening: () => void;
  onOpenConsultation: () => void;
  onOpenSupplements: () => void;
  onOpenLabResults: () => void;
}

export const HeroQuickCards: React.FC<HeroQuickCardsProps> = ({
  onOpenUrgentRequests,
  onOpenSchedules,
  onOpenScreening,
  onOpenConsultation,
  onOpenSupplements,
  onOpenLabResults,
}) => {
  const cards = [
    {
      title: 'Permintaan Darah Darurat',
      desc: 'Akses faskes & donor siaga',
      action: 'Kebutuhan Aktif →',
      badge: 'Live Urgent',
      badgeBg: 'bg-rose-100 text-rose-700',
      icon: <AlertCircle className="w-5 h-5 text-rose-600" />,
      iconBg: 'bg-rose-50',
      onClick: onOpenUrgentRequests,
      highlight: true,
    },
    {
      title: 'Jadwal & Lokasi Donor',
      desc: 'UDD PMI & Bus Keliling',
      action: 'Booking Slot →',
      badge: 'Bebas Antre',
      badgeBg: 'bg-blue-100 text-blue-700',
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50',
      onClick: onOpenSchedules,
    },
    {
      title: 'Cek Kelayakan Mandiri',
      desc: 'Ukur tensi, Hb & gaya hidup',
      action: 'Mulai Skrining →',
      badge: '2 Menit',
      badgeBg: 'bg-emerald-100 text-emerald-700',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50',
      onClick: onOpenScreening,
    },
    {
      title: 'Konsultasi Dokter PMI',
      desc: 'Anemia, Trombosit, Hemoglobin',
      action: 'Tanya Dokter →',
      badge: 'Online 24/7',
      badgeBg: 'bg-purple-100 text-purple-700',
      icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
      iconBg: 'bg-purple-50',
      onClick: onOpenConsultation,
    },
    {
      title: 'Suplemen & Zat Besi',
      desc: 'Penunjang pemulihan donor',
      action: 'Katalog Suplemen →',
      badge: 'Diskon 25%',
      badgeBg: 'bg-rose-100 text-rose-700',
      icon: <Pill className="w-5 h-5 text-rose-600" />,
      iconBg: 'bg-rose-50',
      onClick: onOpenSupplements,
    },
    {
      title: 'Histori & Hasil Lab',
      desc: 'Uji skrining IMLTD & Kartu',
      action: 'Akses Rekam Medis →',
      badge: 'SATUSEHAT',
      badgeBg: 'bg-sky-100 text-sky-700',
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      iconBg: 'bg-sky-50',
      onClick: onOpenLabResults,
    },
  ];

  return (
    <section className="pt-6 pb-4">
      {/* Title & Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse"></span>
            Layanan Terpadu PMI & Faskes Nasional
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ekosistem Darah & Pelayanan Medis
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg md:text-right">
          Akses cepat penyediaan darah darurat, telemedisin spesialis hematologi, dan rekam medis SatuSehat.
        </p>
      </div>

      {/* 6 Quick Action Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="group relative bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header Icon + Badge */}
              <div className="flex items-center justify-between gap-1 mb-3">
                <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                  {card.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeBg}`}>
                  {card.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-snug mb-1">
                {card.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                {card.desc}
              </p>
            </div>

            {/* Action Link */}
            <div className="mt-3 pt-2 text-[11px] font-bold text-red-600 group-hover:text-red-700 flex items-center gap-1 transition-transform group-hover:translate-x-0.5">
              <span>{card.action}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
