"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight, Inbox } from 'lucide-react';

export default function NoticiasGrid({ noticias }) {
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

  const [featured, ...rest] = noticias;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Notícia em Destaque */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link 
            href={`/noticias/${featured.slug}`}
            className="group block relative bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-3xl hover:shadow-emerald-900/10 transition-all duration-700"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Imagem */}
              <div className="lg:w-3/5 relative aspect-[16/10] lg:aspect-auto lg:h-[550px] overflow-hidden">
                {featured.imagem_url ? (
                  <img 
                    src={featured.imagem_url} 
                    alt={featured.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-900/5 flex items-center justify-center text-emerald-200">
                    <Inbox size={80} />
                  </div>
                )}
                <div className="absolute top-8 left-8">
                  <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-2.5 rounded-full shadow-xl">
                    Destaque: {featured.categoria}
                  </span>
                </div>
              </div>

              {/* Texto */}
              <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-slate-50 to-white">
                <div className="flex items-center gap-3 text-slate-400 text-sm mb-6 font-medium">
                  <Calendar size={18} className="text-emerald-500" />
                  {new Date(featured.created_at).toLocaleDateString('pt-PT', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 group-hover:text-emerald-600 transition-colors leading-tight">
                  {featured.titulo}
                </h2>
                
                <p className="text-slate-500 text-lg line-clamp-4 mb-10 leading-relaxed font-medium">
                  {featured.subtitulo}
                </p>

                <div className="flex items-center gap-3 text-emerald-600 font-extrabold text-sm group-hover:gap-5 transition-all">
                  Ler artigo completo
                  <ArrowRight size={22} />
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
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
        >
          {rest.map((noticia) => (
            <motion.div key={noticia.id} variants={itemVariants}>
              <Link 
                href={`/noticias/${noticia.slug}`}
                className="group flex flex-col bg-white rounded-[2.5rem] h-full overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500"
              >
                {/* Imagem de Destaque */}
                <div className="relative aspect-[16/11] overflow-hidden">
                  {noticia.imagem_url ? (
                    <img 
                      src={noticia.imagem_url} 
                      alt={noticia.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-900/5 flex items-center justify-center text-emerald-200">
                      <Inbox size={48} />
                    </div>
                  )}
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm border border-emerald-50">
                      {noticia.categoria}
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] mb-5 font-bold uppercase tracking-tighter">
                    <Calendar size={14} className="text-emerald-500" />
                    {new Date(noticia.created_at).toLocaleDateString('pt-PT', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                    {noticia.titulo}
                  </h2>
                  
                  <p className="text-slate-500 text-sm line-clamp-3 mb-8 flex-grow leading-relaxed">
                    {noticia.subtitulo}
                  </p>

                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all pt-4 border-t border-slate-50">
                    Continuar a ler
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
