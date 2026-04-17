"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Filter, Search, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { NEWS_DEFAULT_IMAGES } from '@/constants/news';
import { calculateReadingTime } from '@/lib/utils';

const ITEMS_PER_PAGE = 6;

export default function NoticiasGrid({ noticias }) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fallbackImage = NEWS_DEFAULT_IMAGES[0].url;

  useEffect(() => {
    const section = document.getElementById('noticias-grid-start');
    if (section) {
      const yOffset = -100;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
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
      {/* Ultra-Premium Floating Command Center */}
      <div className="sticky top-24 z-40 mb-16 lg:mb-24 px-4 md:px-0">
        <div className="mx-auto max-w-6xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] rounded-[3rem] p-3 lg:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-500">
          
          {/* Magic Tabs - Categories */}
          <div className="flex-1 overflow-x-auto no-scrollbar pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
            <div className="flex items-center gap-1 min-w-max relative">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setCurrentPage(1);
                  }}
                  className={`relative group px-6 py-3.5 rounded-full text-[13px] font-bold transition-colors duration-300 ${
                    activeCategory === cat.name 
                      ? 'text-white' 
                      : 'text-slate-500 hover:text-dark-green'
                  }`}
                >
                  {activeCategory === cat.name && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-dark-green rounded-full shadow-xl shadow-dark-green/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2.5">
                    {cat.name}
                    <span className={`flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-[10px] font-black transition-colors duration-300 ${
                      activeCategory === cat.name
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-400 group-hover:bg-primary-green/20 group-hover:text-dark-green'
                    }`}>
                      {cat.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Minimalist Search Pill */}
          <div className="relative w-full lg:w-80 group shrink-0">
            <div className="absolute inset-0 bg-slate-50 rounded-full border border-slate-200/60 group-focus-within:bg-white group-focus-within:border-primary-green/30 group-focus-within:ring-4 group-focus-within:ring-primary-green/10 transition-all duration-300" />
            <div className="relative flex items-center">
              <div className="w-12 h-12 flex items-center justify-center text-slate-400 group-focus-within:text-primary-green transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Pesquisar publicações..." 
                aria-label="Pesquisar publicações"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-3 pr-6 text-[14px] font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
            </div>
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
          className="space-y-12 lg:space-y-16"
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
                className="group relative block rounded-[3rem] lg:rounded-[4rem] overflow-hidden bg-forest-green border border-dark-green shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-700"
              >
                {/* Imagem */}
                <div className="relative aspect-[16/10] lg:aspect-[21/9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-dark-green/60 to-transparent z-10" />
                  <Image 
                    src={featured.imagem_url || fallbackImage} 
                    alt={featured.titulo}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-[1.5s] ease-out opacity-80"
                  />
                  <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
                    <span className="bg-primary-green text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-lg shadow-dark-green/50 backdrop-blur-md border border-white/20">
                      Destaque
                    </span>
                  </div>
                </div>

                {/* Content - Overlapping the image at the bottom */}
                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 z-20">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 text-primary-green text-xs mb-6 font-bold uppercase tracking-widest">
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
                    
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter group-hover:text-primary-green transition-colors duration-300">
                      {featured.titulo}
                    </h2>
                    
                    <p className="text-slate-300 text-lg lg:text-xl line-clamp-2 mb-8 leading-relaxed max-w-3xl">
                      {featured.subtitulo}
                    </p>

                    <div className="inline-flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest group-hover:text-primary-green transition-colors">
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
                    className="group flex flex-col h-full bg-white rounded-[2.5rem] p-4 lg:p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-slate-100 transition-all duration-500">
                      <Image 
                        src={noticia.imagem_url || fallbackImage} 
                        alt={noticia.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-sm border border-slate-100/50">
                          {noticia.categoria}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow px-3 pb-3">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-primary-green" />
                          {calculateReadingTime(noticia.conteudo)} min
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span>{new Date(noticia.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                      </div>
                      
                      <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3 leading-[1.2] tracking-tight group-hover:text-dark-green transition-colors line-clamp-3">
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
                  aria-label="Página anterior"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-primary-green hover:text-dark-green hover:bg-primary-green/10 transition-all disabled:opacity-30 disabled:pointer-events-none"
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
                          aria-label={`Página ${pageNum}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-black transition-all ${
                            currentPage === pageNum
                              ? 'bg-primary-green text-white shadow-lg shadow-primary-green/20'
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
                  aria-label="Página seguinte"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-primary-green hover:text-dark-green hover:bg-primary-green/10 transition-all disabled:opacity-30 disabled:pointer-events-none"
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
