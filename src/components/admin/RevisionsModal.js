'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  History, 
  X, 
  RotateCcw, 
  Clock, 
  User, 
  ChevronRight,
  Eye,
  Loader2,
  Calendar,
  FileText
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DOMPurify from 'isomorphic-dompurify'

export default function RevisionsModal({ isOpen, onClose, noticiaId, onRestore }) {
  const [revisoes, setRevisoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRevision, setSelectedRevision] = useState(null)
  const supabase = createClient()

  const fetchRevisoes = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('revisoes_noticias')
      .select('*')
      .eq('noticia_id', noticiaId)
      .order('criado_em', { ascending: false })
      .limit(10)

    if (error) console.error('Erro ao carregar revisões:', error)
    else setRevisoes(data)
    setLoading(false)
  }

  useEffect(() => {
    if (isOpen && noticiaId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchRevisoes()
    }
  }, [isOpen, noticiaId])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100"
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <History size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Histórico de Versões</h2>
              <p className="text-sm text-slate-500 font-medium">Recupere conteúdos de edições anteriores</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* List Sidebar */}
          <div className="w-full md:w-80 border-r border-slate-100 overflow-y-auto p-4 space-y-2 bg-slate-50/30">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-emerald-600 mb-2" size={24} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">A carregar...</span>
              </div>
            ) : revisoes.length > 0 ? (
              revisoes.map((rev) => (
                <button
                  key={rev.id}
                  onClick={() => setSelectedRevision(rev)}
                  className={`w-full text-left p-4 rounded-2xl transition-all group border ${
                    selectedRevision?.id === rev.id 
                    ? 'bg-white border-emerald-500 shadow-sm ring-4 ring-emerald-500/5' 
                    : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className={selectedRevision?.id === rev.id ? 'text-emerald-500' : 'text-slate-400'} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {formatDate(rev.criado_em)}
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold truncate ${selectedRevision?.id === rev.id ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {rev.titulo}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full uppercase">
                      {rev.categoria}
                    </span>
                    <ChevronRight size={14} className={`transition-transform ${selectedRevision?.id === rev.id ? 'translate-x-1 text-emerald-500' : 'text-slate-300'}`} />
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-20 px-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <FileText size={20} />
                </div>
                <p className="text-sm font-bold text-slate-400">Sem revisões anteriores ainda.</p>
              </div>
            )}
          </div>

          {/* Preview Area */}
          <div className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto">
            {selectedRevision ? (
              <div className="p-10 space-y-10">
                <div className="flex items-center justify-between pb-8 border-b border-slate-100">
                  <div>
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                      Versão de {formatDate(selectedRevision.criado_em)}
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">
                      {selectedRevision.titulo}
                    </h3>
                  </div>
                  <button
                    onClick={() => onRestore(selectedRevision)}
                    className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all transform active:scale-95"
                  >
                    <RotateCcw size={18} />
                    Restaurar Esta Versão
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Resumo / Subtítulo</h5>
                    <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-100 pl-6">
                      {selectedRevision.resumo || 'Sem resumo'}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Conteúdo do Artigo</h5>
                    <div 
                      className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRevision.conteudo) }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">SEO Title</h5>
                      <p className="text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-xl">{selectedRevision.meta_title}</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">SEO Description</h5>
                      <p className="text-sm font-medium text-slate-500 bg-slate-50 p-4 rounded-xl">{selectedRevision.meta_description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 text-slate-200">
                  <Eye size={48} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Selecione uma versão</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Escolha uma revisão na barra lateral para pré-visualizar o conteúdo antes de restaurar.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
