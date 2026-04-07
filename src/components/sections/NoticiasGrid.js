"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight, Inbox, Tag, Filter } from 'lucide-react';

export default function NoticiasGrid({ noticias }) {
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = useMemo(() => {
    return ['Todas', ...new Set(noticias.map(n => n.categoria))];
  }, [noticias]);

  const filteredNoticias = useMemo(() => {
    if (activeCategory === 'Todas') return noticias;
    return noticias.filter(n => n.categoria === activeCategory);
  }, [noticias, activeCategory]);

  if (!noticias || noticias.length === 0) return (
     <div className="bg-slate-50 rounded-3xl p-16 text-center border border-dashed border-slate-200">
        <Inbox size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">A aguardar publicações</h3>
        <p className="text-slate-500 max-w-xs mx-auto text-sm">
          Estamos a trabalhar em novos conteúdos. Volte em breve.
        </p>
      </div>
  );

  const [featured, ...rest] = filteredNoticias;

  return (
    <div className="pt-16 pb-32 space-y-16 lg:space-y-24">
      {/* Professional Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="flex items-center gap-4 text-slate-900">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center">
            <Filter size={18} />
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Navegar por</span>
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-16 lg:space-y-24"
        >
          {/* Corporate Featured Section (Split) */}
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
                {/* Imagem - Fixed Aspect for Professionalism */}
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100">
                  {featured.imagem_url ? (
                    <img 
                      src={featured.imagem_url} 
                      alt={featured.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Inbox size={64} />
                    </div>
                  )}
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
          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
              {rest.map((noticia, i) => (
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
                      {noticia.imagem_url ? (
                        <img 
                          src={noticia.imagem_url} 
                          alt={noticia.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                          <Inbox size={32} />
                        </div>
                      )}
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                        <span className="text-emerald-600">{noticia.categoria}</span>
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
          
          {!featured && (
            <div className="py-20 text-center">
              <Inbox size={48} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">Sem resultados para "{activeCategory}"</h3>
              <p className="text-slate-500 text-sm">Tente selecionar outra categoria.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
