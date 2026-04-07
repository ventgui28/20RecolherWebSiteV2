"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Monitor, Calendar, User, Clock } from 'lucide-react';
import { useState } from 'react';
import Container from '@/components/ui/Container';

export default function PreviewModal({ isOpen, onClose, data }) {
  const [device, setDevice] = useState('desktop');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 md:p-8"
      >
        <div className="bg-white w-full h-full rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
          {/* Header do Preview */}
          <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold text-slate-900">Modo de Pré-visualização</span>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex bg-slate-200/50 p-1 rounded-xl">
                <button 
                  onClick={() => setDevice('desktop')}
                  className={`p-2 rounded-lg transition-all ${device === 'desktop' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
                >
                  <Monitor size={18} />
                </button>
                <button 
                  onClick={() => setDevice('mobile')}
                  className={`p-2 rounded-lg transition-all ${device === 'mobile' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
                >
                  <Smartphone size={18} />
                </button>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>

          {/* Área de Conteúdo */}
          <div className="flex-grow overflow-y-auto bg-slate-100 p-8 scrollbar-hide">
            <div className={`mx-auto bg-white shadow-xl transition-all duration-500 min-h-full rounded-2xl overflow-hidden ${device === 'mobile' ? 'max-w-[375px]' : 'max-w-5xl'}`}>
              <div className="bg-white pt-20 pb-16">
                <Container size={device === 'mobile' ? 'full' : 'sm'}>
                  <div className="space-y-6 px-4">
                    <div className="flex items-center gap-4">
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                        {data.categoria}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar size={14} className="text-emerald-500" />
                        Pré-visualização
                      </div>
                    </div>
                    <h1 className={`font-black text-slate-900 leading-tight tracking-tighter ${device === 'mobile' ? 'text-3xl' : 'text-5xl'}`}>
                      {data.titulo || 'Título da Notícia'}
                    </h1>
                    <p className="text-xl text-slate-500 italic border-l-4 border-emerald-500 pl-6 py-2 bg-slate-50 rounded-r-2xl">
                      {data.subtitulo || 'O seu subtítulo aparecerá aqui...'}
                    </p>
                  </div>
                </Container>

                {data.imagePreview && (
                  <div className="my-12 px-4">
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-slate-100">
                      <img src={data.imagePreview} className="w-full h-full object-cover" alt="" />
                    </div>
                  </div>
                )}

                <Container size={device === 'mobile' ? 'full' : 'sm'}>
                  <div 
                    className="prose prose-lg prose-emerald max-w-none px-4
                      prose-headings:text-slate-900 prose-headings:font-black
                      prose-p:text-slate-600 prose-p:leading-relaxed
                      prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-50 prose-blockquote:rounded-2xl"
                    dangerouslySetInnerHTML={{ __html: data.conteudo || '<p className="text-slate-300">O conteúdo do seu artigo aparecerá aqui...</p>' }}
                  />
                </Container>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
