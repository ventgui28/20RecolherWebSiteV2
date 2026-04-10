"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight, Filter, Search, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { NEWS_DEFAULT_IMAGES } from '@/constants/news';

const ITEMS_PER_PAGE = 6;

const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export default function NoticiasGrid({ noticias }) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fallbackImage = NEWS_DEFAULT_IMAGES[0].url;

  useEffect(() => {
    const section = document.getElementById('noticias-grid-start');
    if (section) {
      const yOffset = -100;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentPage]);

  const categories = useMemo(() => {
    const counts = noticias.reduce((acc, n) => {
      acc[n.categoria] = (acc[n.categoria] || 0) + 1;
      return acc;
    }, {});
    
    return [
      { name: 'Todas', count: noticias.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count }))
    ];
  }, [noticias]);

  const filteredNoticias = useMemo(() => {
    return noticias.filter(n => {
      const matchesCategory = activeCategory === 'Todas' || n.categoria === activeCategory;
      const matchesSearch = 
        n.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
        n.subtitulo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [noticias, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredNoticias.length / ITEMS_PER_PAGE);
  
  const paginatedNoticias = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNoticias.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNoticias, currentPage]);

  if (!noticias || noticias.length === 0) return (
     <div className="bg-slate-50 rounded-3xl p-16 text-center border border-dashed border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-2">A aguardar publicações</h3>
        <p className="text-slate-500 max-w-xs mx-auto text-sm">
          Estamos a trabalhar em novos conteúdos. Volte em breve.
        </p>
      </div>
  );

  const showFeatured = currentPage === 1 && paginatedNoticias.length > 0;
  const featured = showFeatured ? paginatedNoticias[0] : null;
  const gridItems = showFeatured ? paginatedNoticias.slice(1) : paginatedNoticias;

  return (
    <div id="noticias-grid-start" className="pt-16 pb-32 space-y-16 lg:space-y-24">
      {/* Premium Filter & Search Bar - Floating Glassmorphism Style */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 border-b border-slate-100">
        <div className="space-y-8 flex-grow max-w-4xl">
          <div className="flex items-center gap-4 text-slate-900">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/20">
              <Filter size={20} />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Filtrar por</span>
              <span className="block text-3xl font-black text-slate-900 leading-none mt-1 tracking-tight">Categorias</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setCurrentPage(1);
                }}
                className={`group flex items-center gap-3 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 border ${
                  activeCategory === cat.name 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50'
                }`}
              >
                {cat.name}
                <span className={`flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-[10px] font-black transition-colors ${
                  activeCategory === cat.name
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Liquid Glass Search Bar */}
        <div className="relative w-full lg:w-96 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors duration-300" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar publicações..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50/80 backdrop-blur-xl border border-slate-200/60 pl-16 pr-6 py-4 rounded-full text-[15px] font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-300 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${searchQuery}-${currentPage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="space-y-16 lg:space-y-24"
        >
          {/* Corporate Featured Section (Apenas na página 1) - Overlapping Design */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href={`/noticias/${featured.slug}`}
                className="group relative block rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-emerald-900/10"
              >
                {/* Imagem */}
                <div className="relative aspect-[16/10] lg:aspect-[21/9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
                  <img 
                    src={featured.imagem_url || fallbackImage} 
                    alt={featured.titulo}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-[1.5s] ease-out opacity-80"
                  />
                  <div className="absolute top-8 left-8 z-20">
                    <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg shadow-emerald-900/50 backdrop-blur-md">
                      Destaque
                    </span>
                  </div>
                </div>

                {/* Content - Overlapping the image at the bottom */}
                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 z-20">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 text-emerald-400 text-xs mb-6 font-bold uppercase tracking-widest">
                      <span className="text-white">{featured.categoria}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Clock size={12} />
                        {calculateReadingTime(featured.conteudo)} min
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span className="text-slate-300">
                        {new Date(featured.created_at).toLocaleDateString('pt-PT', { 
                          day: 'numeric', month: 'long', year: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter group-hover:text-emerald-300 transition-colors duration-300">
                      {featured.titulo}
                    </h2>
                    
                    <p className="text-slate-300 text-lg lg:text-xl line-clamp-2 mb-8 leading-relaxed max-w-3xl">
                      {featured.subtitulo}
                    </p>

                    <div className="inline-flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                      Ler o Artigo
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Corporate News Grid - Magazine Style */}
          {gridItems.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {gridItems.map((noticia, i) => (
                <motion.div 
                  key={noticia.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={`/noticias/${noticia.slug}`}
                    className="group flex flex-col h-full bg-transparent"
                  >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-slate-100 border border-slate-200/50 shadow-sm group-hover:shadow-2xl group-hover:shadow-emerald-900/10 transition-all duration-500">
                      <img 
                        src={noticia.imagem_url || fallbackImage} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                          {noticia.categoria}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow px-2">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-emerald-500" />
                          {calculateReadingTime(noticia.conteudo)} min
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span>{new Date(noticia.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-slate-900 mb-3 leading-[1.2] tracking-tight group-hover:text-emerald-600 transition-colors line-clamp-3">
                        {noticia.titulo}
                      </h3>
                      
                      <p className="text-slate-500 text-[15px] line-clamp-2 mb-6 flex-grow leading-[1.6]">
                        {noticia.subtitulo}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          
          {(filteredNoticias.length === 0) && (
            <div className="py-32 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Sem resultados encontrados</h3>
              <p className="text-slate-500 text-lg">Tente usar palavras-chave diferentes ou altere os filtros de categoria.</p>
            </div>
          )}

          {/* Pagination UI - Minimalist Rounded */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 mt-12 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                A mostrar página <span className="text-slate-900">{currentPage}</span> de {totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-1 px-2">
                  {(() => {
                    const range = [];
                    const siblingCount = 1;
                    
                    for (let i = 1; i <= totalPages; i++) {
                      if (
                        i === 1 || i === totalPages ||
                        (i >= currentPage - siblingCount && i <= currentPage + siblingCount)
                      ) {
                        range.push(i);
                      } else if (
                        i === currentPage - siblingCount - 1 ||
                        i === currentPage + siblingCount + 1
                      ) {
                        range.push('...');
                      }
                    }

                    return [...new Set(range)].map((pageNum, idx) => {
                      if (pageNum === '...') {
                        return (
                          <span key={`dots-${idx}`} className="w-8 text-center text-slate-300 font-black tracking-widest">
                            ...
                          </span>
                        );
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-black transition-all ${
                            currentPage === pageNum
                              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                              : 'bg-transparent text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    });
                  })()}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
