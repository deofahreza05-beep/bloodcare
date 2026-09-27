import React, { useState } from 'react';
import { X, Gift, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { Reward } from '../../types';

interface RewardRedeemModalProps {
  reward: Reward | null;
  currentPoints: number;
  onClose: () => void;
  onConfirmRedeem: (reward: Reward) => void;
}

export const RewardRedeemModal: React.FC<RewardRedeemModalProps> = ({
  reward,
  currentPoints,
  onClose,
  onConfirmRedeem,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const voucherCode = 'PMI-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  if (!reward) return null;

  const isEnough = currentPoints >= reward.points_required;

  const handleRedeem = () => {
    if (!isEnough) return;
    onConfirmRedeem(reward);
    setIsSuccess(true);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden text-center">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-rose-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-extrabold text-slate-900">Tukar Poin Apresiasi</h3>
              <p className="text-[10px] text-slate-500">Reward kemitraan PMI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                Penukaran Reward Berhasil!
              </h4>
              <p className="text-xs text-slate-600">
                Poin Anda telah terpotong sebesar <strong>{reward.points_required} Pts</strong>. Tunjukkan kode voucher ini ke gerai atau kasir mitra faskes:
              </p>

              <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between">
                <span className="font-mono text-base font-black text-rose-700 tracking-wider">
                  {voucherCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-xs font-bold bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
              >
                Selesai
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                  {reward.category}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                  {reward.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {reward.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Mitra Penyedia:</span>
                  <strong className="text-slate-800 font-bold">{reward.partner_name}</strong>
                </div>
              </div>

              {/* Point deduction breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Saldo Poin Anda:</span>
                  <strong className="text-slate-800 font-bold">{currentPoints} Pts</strong>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Poin Dibutuhkan:</span>
                  <strong className="text-rose-600 font-bold">-{reward.points_required} Pts</strong>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center font-bold text-slate-800">
                  <span>Sisa Saldo Poin:</span>
                  <span className={isEnough ? 'text-emerald-600' : 'text-red-600'}>
                    {currentPoints - reward.points_required} Pts
                  </span>
                </div>
              </div>

              {!isEnough && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Poin Anda belum mencukupi untuk menukar reward ini.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!isEnough}
                  onClick={handleRedeem}
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors shadow-xs"
                >
                  Konfirmasi Tukar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
