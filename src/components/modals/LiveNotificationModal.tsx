import React from 'react';
import { Bell, AlertTriangle, Heart, Clock, ArrowRight, X, CheckCheck } from 'lucide-react';
import { BloodRequest } from '../../types';

export interface LiveFeedItem {
  id: string;
  type: 'emergency_request' | 'donor_pledged' | 'stock_alert';
  title: string;
  description: string;
  timestamp: string;
  bloodGroup: string;
  rhesus: string;
  urgent?: boolean;
  linkText?: string;
  relatedRequest?: BloodRequest;
}

interface LiveNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: LiveFeedItem[];
  onSelectNotification: (item: LiveFeedItem) => void;
  onClearAll: () => void;
}

export const LiveNotificationModal: React.FC<LiveNotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden mt-12 sm:mt-14 mr-0 sm:mr-4">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute -top-0.5 -right-0.5 animate-ping"></span>
            </div>
            <div>
              <h3 className="text-sm font-black">Pusat Notifikasi Real-Time</h3>
              <p className="text-[10px] text-rose-100">Live Broadcast Kebutuhan & Ikrar Donor Darah</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action sub-bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-600">
            {notifications.length} Notifikasi Aktif
          </span>
          <button
            onClick={onClearAll}
            className="text-slate-400 hover:text-red-600 flex items-center gap-1 font-semibold transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Tandai semua dibaca
          </button>
        </div>

        {/* Notification List */}
        <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2 opacity-50" />
              Belum ada notifikasi baru saat ini.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectNotification(item);
                  onClose();
                }}
                className={`p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all flex items-start gap-3 ${
                  item.urgent ? 'bg-red-50/50 hover:bg-red-50 border border-red-100 my-1' : ''
                }`}
              >
                {/* Badge Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    item.type === 'emergency_request'
                      ? 'bg-red-600 text-white shadow-xs'
                      : item.type === 'donor_pledged'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.bloodGroup}{item.rhesus}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-black truncate ${
                        item.urgent ? 'text-red-700' : 'text-slate-800'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5 shrink-0">
                      <Clock className="w-3 h-3 text-slate-300" />
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                    {item.description}
                  </p>

                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-red-600 hover:underline flex items-center gap-0.5">
                      {item.linkText || 'Lihat Pasien & Bantu'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    {item.urgent && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-red-600 text-white rounded">
                        CITO / DARURAT
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Sinkronisasi UDD PMI & Faskes</span>
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live WebSocket
          </span>
        </div>

      </div>
    </div>
  );
};
