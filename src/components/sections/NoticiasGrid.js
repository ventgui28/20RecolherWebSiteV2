"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight, Inbox, Tag } from 'lucide-react';

export default function NoticiasGrid({ noticias }) {
  const [activeCategory, setActiveCategory] = useState('Todas');

  // Extrair categorias únicas das notícias
  const categories = useMemo(() => {
    const cats = ['Todas', ...new Set(noticias.map(n => n.categoria))];
    return cats;
  }, [noticias]);

  // Filtrar notícias
  const filteredNoticias = useMemo(() => {
    if (activeCategory === 'Todas') return noticias;
    return noticias.filter(n => n.categoria === activeCategory);
  }, [noticias, activeCategory]);

  if (!noticias || noticias.length === 0) return (
     <div className="bg-slate-50 rounded-[3rem] p-20 text-center border border-dashed border-slate-200">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-sm">
          <Inbox size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Sem notícias de momento</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          Estamos a preparar conteúdos interessantes sobre reciclagem. Volte brevemente!
        </p>
      </div>
  );

  const [featured, ...rest] = filteredNoticias;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      {/* Filtros de Categoria */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-8 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 text-slate-400 mr-4 shrink-0">
          <Tag size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Filtrar por:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap relative ${
              activeCategory === cat 
                ? 'text-white' 
                : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            {activeCategory === cat && (
              <motion.div 
                layoutId="activeCat"
                className="absolute inset-0 bg-emerald-600 rounded-full z-0"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-16 lg:space-y-24"
        >
          {/* Notícia em Destaque (Só aparece se houver resultados) */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link 
                href={`/noticias/${featured.slug}`}
                className="group block relative bg-slate-50 rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-slate-100 hover:shadow-3xl hover:shadow-emerald-900/10 transition-all duration-700"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Imagem */}
                  <div className="lg:w-3/5 relative aspect-[16/10] lg:aspect-auto lg:h-[600px] overflow-hidden">
                    {featured.imagem_url ? (
                      <img 
                        src={featured.imagem_url} 
                        alt={featured.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-900/5 flex items-center justify-center text-emerald-200">
                        <Inbox size={80} />
                      </div>
                    )}
                    <div className="absolute top-8 left-8">
                      <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-2.5 rounded-full shadow-xl">
                        {featured.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="lg:w-2/5 p-12 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-slate-50 to-white relative">
                    <div className="flex items-center gap-3 text-slate-400 text-sm mb-6 font-medium">
                      <Calendar size={18} className="text-emerald-500" />
                      {new Date(featured.created_at).toLocaleDateString('pt-PT', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                    
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-8 group-hover:text-emerald-600 transition-colors leading-[1.1]">
                      {featured.titulo}
                    </h2>
                    
                    <p className="text-slate-500 text-lg md:text-xl line-clamp-4 mb-12 leading-relaxed font-medium">
                      {featured.subtitulo}
                    </p>

                    <div className="flex items-center gap-3 text-emerald-600 font-extrabold text-sm uppercase tracking-widest group-hover:gap-6 transition-all">
                      Ler artigo completo
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Restantes Notícias */}
          {rest.length > 0 && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16"
            >
              {rest.map((noticia) => (
                <motion.div 
                  key={noticia.id} 
                  variants={itemVariants}
                  layout
                >
                  <Link 
                    href={`/noticias/${noticia.slug}`}
                    className="group flex flex-col bg-white rounded-[2.5rem] lg:rounded-[3rem] h-full overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500"
                  >
                    {/* Imagem de Destaque */}
                    <div className="relative aspect-[16/11] overflow-hidden">
                      {noticia.imagem_url ? (
                        <img 
                          src={noticia.imagem_url} 
                          alt={noticia.titulo}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                        />
                      ) : (
                        <div className="w-full h-full bg-emerald-900/5 flex items-center justify-center text-emerald-200">
                          <Inbox size={48} />
                        </div>
                      )}
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm border border-emerald-50">
                          {noticia.categoria}
                        </span>
                      </div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-10 lg:p-12 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] mb-6 font-bold uppercase tracking-widest">
                        <Calendar size={14} className="text-emerald-500" />
                        {new Date(noticia.created_at).toLocaleDateString('pt-PT', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-slate-900 mb-5 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                        {noticia.titulo}
                      </h2>
                      
                      <p className="text-slate-500 text-sm md:text-base line-clamp-3 mb-10 flex-grow leading-relaxed">
                        {noticia.subtitulo}
                      </p>

                      <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all pt-6 border-t border-slate-50">
                        Continuar
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Estado Vazio (Se não houver notícias após filtro) */}
          {!featured && (
            <div className="py-24 text-center">
              <Inbox size={64} className="mx-auto text-slate-200 mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Sem notícias nesta categoria</h3>
              <p className="text-slate-500">Tente outra categoria ou explore todas as publicações.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
