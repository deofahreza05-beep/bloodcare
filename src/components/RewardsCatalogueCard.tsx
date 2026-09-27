import React from 'react';
import { Gift, Pill, Ticket, TestTube, ArrowRight } from 'lucide-react';
import { Reward } from '../types';

interface RewardsCatalogueCardProps {
  currentPoints: number;
  rewards: Reward[];
  onRedeemReward: (reward: Reward) => void;
  onOpenFullCatalog: () => void;
}

export const RewardsCatalogueCard: React.FC<RewardsCatalogueCardProps> = ({
  currentPoints,
  rewards,
  onRedeemReward,
  onOpenFullCatalog,
}) => {
  const getItemIcon = (index: number) => {
    if (index === 0) {
      return (
        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <Pill className="w-4 h-4" />
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Ticket className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        <TestTube className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">
              Katalog Apresiasi Pendonor
            </h3>
            <p className="text-[10px] text-slate-400">
              Tukar poin amal dengan mitra faskes
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-semibold text-slate-400 block">Saldo Kamu</span>
          <span className="text-sm font-black text-red-600">
            {currentPoints.toLocaleString('id-ID')} Pts
          </span>
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-2.5 my-3.5">
        {rewards.slice(0, 3).map((reward, index) => (
          <div
            key={reward.id}
            onClick={() => onRedeemReward(reward)}
            className="group flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {getItemIcon(index)}
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors truncate">
                  {reward.title}
                </h4>
                <p className="text-[10px] text-slate-400 truncate">
                  {reward.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-xs font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                {reward.points_required} Pts
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Link to full catalog */}
      <div className="pt-2 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={onOpenFullCatalog}
          className="text-xs font-bold text-slate-700 hover:text-red-600 inline-flex items-center gap-1 transition-colors"
        >
          <span>Jelajahi Semua 24 Reward Mitra PMI</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
