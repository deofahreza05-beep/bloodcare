import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Search } from 'lucide-react';
import { Article } from '../../types';

interface ArticlesViewProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ articles, onOpenArticle }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Nutrisi Pendonor', 'Mitos vs Fakta Medis', 'Kisah Nyata Penerima'];

  const filtered = articles.filter(
    (a) => activeCategory === 'Semua' || a.category === activeCategory
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div>
        <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
          Pusat Informasi & Wawasan Medis
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Edukasi Kesehatan, Nutrisi & Riset Darah
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Kumpulan artikel ilmiah dan panduan praktis yang ditinjau langsung oleh dokter spesialis PMI
        </p>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === c
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map((article) => (
          <div
            key={article.id}
            onClick={() => onOpenArticle(article)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {article.read_time}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Ditinjau oleh: {article.reviewed_by}
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-5 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">{article.date}</span>
              <span className="text-xs font-bold text-red-600 group-hover:text-red-700 flex items-center gap-1">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
