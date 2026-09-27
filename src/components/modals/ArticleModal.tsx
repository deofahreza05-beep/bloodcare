import React from 'react';
import { X, Clock, User, Share2, BookOpen } from 'lucide-react';
import { Article } from '../../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col max-h-[85vh]">
        
        {/* Header with image */}
        <div className="relative aspect-21/9 w-full bg-slate-100 overflow-hidden shrink-0">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-600 text-white shadow-xs">
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.read_time}
            </span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span className="text-slate-600 font-semibold">{article.author}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {article.title}
          </h2>

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 text-xs text-red-900 font-medium">
            Ditinjau secara medis oleh: <strong>{article.reviewed_by}</strong>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line font-normal">
            {article.content}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, text: article.excerpt, url: window.location.href });
              } else {
                navigator.clipboard?.writeText(window.location.href);
                alert('Tautan artikel tersalin!');
              }
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan Artikel</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
