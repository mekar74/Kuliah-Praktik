import React, { useState } from 'react';
import { NEWS } from '../data/hospitalData';
import { NewsItem } from '../types';
import { Calendar, ArrowRight, X, Search, Newspaper } from 'lucide-react';

interface NewsSectionProps {
  news?: NewsItem[];
  onSelectNews: (news: NewsItem) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news = NEWS, onSelectNews }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const [modalSearchQuery, setModalSearchQuery] = useState<string>('');
  const [modalCategory, setModalCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Seputar RS', 'Tips Kesehatan', 'Fasilitas Baru', 'Event'];

  const filteredNews = news.filter(
    (item) => selectedCategory === 'Semua' || item.category === selectedCategory
  );

  const filteredModalNews = news.filter((item) => {
    const matchesCat = modalCategory === 'Semua' || item.category === modalCategory;
    const matchesSearch =
      !modalSearchQuery ||
      item.title.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(modalSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="berita" className="py-16 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span> Informasi & Artikel</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            BERITA RS. MITRA MULIA HUSADA
          </h2>
          <p className="text-slate-600 text-sm mt-2.5 leading-relaxed">
            Informasi edukasi kesehatan, pengumuman fasilitas terbaru, dan kegiatan sosial rumah sakit.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#002F74] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-white rounded-2xl p-4 border border-[#455A64]/30 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer flex flex-col group"
            >
              <div className="h-48 bg-slate-300 rounded-xl mb-4 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#002F74]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#455A64] mb-2 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{item.date}</span>
              </div>

              <h3 className="text-lg font-semibold text-[#002F74] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {item.summary}
              </p>

              <div className="mt-auto pt-4 flex items-center justify-between text-xs font-semibold text-blue-800">
                <span>Baca Artikel Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowAllModal(true)}
            className="inline-flex items-center gap-2 text-[#002F74] font-bold hover:text-blue-700 hover:underline transition cursor-pointer text-sm bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm"
          >
            <span>Lihat berita selengkapnya ({news.length})</span>
            <span className="text-lg">➔</span>
          </button>
        </div>
      </div>

      {/* Modal Displaying All News */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 bg-[#002F74] text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-amber-300" />
                  <span>Seluruh Berita & Informasi RS MMH</span>
                </h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  Menampilkan total {news.length} artikel & informasi resmi rumah sakit
                </p>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="p-2 rounded-full hover:bg-blue-800 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Search Bar in Modal */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="w-full sm:w-72 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setModalCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      modalCategory === cat
                        ? 'bg-[#002F74] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Scrollable Content Grid */}
            <div className="p-6 overflow-y-auto flex-1">
              {filteredModalNews.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredModalNews.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectNews(item);
                      }}
                      className="bg-white rounded-2xl p-3.5 border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer flex flex-col group"
                    >
                      <div className="h-40 bg-slate-200 rounded-xl mb-3 overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 bg-[#002F74]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1.5 font-medium">
                        <Calendar className="w-3 h-3 text-blue-600" />
                        <span>{item.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#002F74] group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                      <div className="mt-auto pt-3 flex items-center justify-between text-xs font-semibold text-blue-700">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-sm">
                  Tidak ada berita yang sesuai dengan pencarian.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">
                RS Mitra Mulia Husada Bandar Jaya
              </span>
              <button
                onClick={() => setShowAllModal(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

