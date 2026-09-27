import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface ArticlesSectionProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
  onViewAllArticles: () => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  onOpenArticle,
  onViewAllArticles,
}) => {
  return (
    <section className="pt-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-600 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Wawasan Medis & Humaniora</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Edukasi, Panduan Nutrisi & Cerita Donor
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAllArticles}
          className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group self-start sm:self-auto"
        >
          <span>Lihat Semua Artikel Kesehatan</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.slice(0, 3).map((article, idx) => {
          let categoryBadgeColor = 'bg-emerald-800 text-white';
          if (idx === 1) {
            categoryBadgeColor = 'bg-sky-800 text-white';
          } else if (idx === 2) {
            categoryBadgeColor = 'bg-rose-800 text-white';
          }

          return (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${categoryBadgeColor} backdrop-blur-xs shadow-xs`}>
                      {article.category}
                    </span>
                  </div>

                  {/* Read Time Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {article.read_time}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {idx === 0 ? 'Ditinjau oleh Tim Nutrisi PMI' : idx === 1 ? 'Konsultasi dr. Spesialis Patologi Klinik' : 'Ruang Rawat Ibu & Anak PMI Riau'}
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2 mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium">
                  {article.date}
                </span>
                <span className="text-xs font-bold text-red-600 group-hover:text-red-700 flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
