"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag, Filter, Search, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { NEWS_DEFAULT_IMAGES } from '@/constants/news';

// Constante para definir itens por página (excluindo o destaque na primeira página)
const ITEMS_PER_PAGE = 6;

// Função utilitária para calcular o tempo de leitura
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export default function NoticiasGrid({ noticias }) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fallbackImage = NEWS_DEFAULT_IMAGES[0].url;

  // Resetar página quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const categories = useMemo(() => {
    return ['Todas', ...new Set(noticias.map(n => n.categoria))];
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

  // Lógica de Paginação
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

  // Na primeira página, mostramos um destaque. Nas outras, apenas a grelha.
  const showFeatured = currentPage === 1 && paginatedNoticias.length > 0;
  const featured = showFeatured ? paginatedNoticias[0] : null;
  const gridItems = showFeatured ? paginatedNoticias.slice(1) : paginatedNoticias;

  return (
    <div className="pt-16 pb-32 space-y-16 lg:space-y-24">
      {/* Professional Filter Bar & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-slate-100 pb-12">
        <div className="flex flex-col md:flex-row md:items-center gap-8 lg:gap-12">
          <div className="flex items-center gap-4 text-slate-900">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center">
              <Filter size={18} />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Filtrar por</span>
              <span className="block text-lg font-bold leading-none">Categorias</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-900/10' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar artigos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 px-12 py-4 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-slate-400"
          />
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
          {/* Corporate Featured Section (Apenas na página 1) */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href={`/noticias/${featured.slug}`}
                className="group grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-emerald-200 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5"
              >
                {/* Imagem */}
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100">
                  <img 
                    src={featured.imagem_url || fallbackImage} 
                    alt={featured.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded shadow-xl">
                      Destaque
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-10 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-slate-400 text-xs mb-8 font-bold uppercase tracking-tight">
                    <span className="text-emerald-600">{featured.categoria}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-slate-300" />
                      {calculateReadingTime(featured.conteudo)} min
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>
                      {new Date(featured.created_at).toLocaleDateString('pt-PT', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 leading-tight group-hover:text-emerald-600 transition-colors">
                    {featured.titulo}
                  </h2>
                  
                  <p className="text-slate-500 text-lg line-clamp-3 mb-12 leading-relaxed font-medium">
                    {featured.subtitulo}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-widest border-b-2 border-slate-100 pb-2 group-hover:border-emerald-600 transition-all w-fit">
                    Abrir Artigo Completo
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Corporate News Grid */}
          {gridItems.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
              {gridItems.map((noticia, i) => (
                <motion.div 
                  key={noticia.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={`/noticias/${noticia.slug}`}
                    className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-100 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                      <img 
                        src={noticia.imagem_url || fallbackImage} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                        <span className="text-emerald-600">{noticia.categoria}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="flex items-center gap-1.5">
                          <Clock size={10} className="text-slate-300" />
                          {calculateReadingTime(noticia.conteudo)} min
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span>{new Date(noticia.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {noticia.titulo}
                      </h3>
                      
                      <p className="text-slate-500 text-sm line-clamp-2 mb-8 flex-grow leading-relaxed">
                        {noticia.subtitulo}
                      </p>

                      <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
                        Ler Mais
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          
          {(filteredNoticias.length === 0) && (
            <div className="py-20 text-center">
              <h3 className="text-xl font-bold text-slate-900">Sem resultados para a sua pesquisa</h3>
              <p className="text-slate-500 text-sm">Tente palavras-chave diferentes ou mude de categoria.</p>
            </div>
          )}

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-16 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl text-sm font-black transition-all ${
                          currentPage === pageNum
                            ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10'
                            : 'bg-white border border-slate-100 text-slate-400 hover:border-emerald-500 hover:text-emerald-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Página {currentPage} de {totalPages}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
