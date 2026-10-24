import React from 'react';
import { NewsItem } from '../types';
import { X, Calendar, User, Share2, Tag } from 'lucide-react';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan berita telah disalin ke clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="h-56 sm:h-64 bg-slate-200 relative shrink-0">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase">
              {news.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2">
              {news.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{news.date}</span>
              <span>•</span>
              <User className="w-4 h-4 text-slate-400" />
              <span>{news.author}</span>
            </div>

            <button
              onClick={handleShare}
              className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 text-xs cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Bagikan</span>
            </button>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="bg-[#002F74] text-white font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-blue-900 transition cursor-pointer"
          >
            Tutup Berita
          </button>
        </div>
      </div>
    </div>
  );
};
