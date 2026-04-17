'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { 
  Plus, 
  LogOut, 
  FileText, 
  Trash2, 
  ExternalLink,
  Calendar,
  Tag,
  Loader2,
  Inbox,
  Eye,
  Search,
  Filter,
  CheckSquare,
  Square,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardPage() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [selectedIds, setSelectedIds] = useState([])
  const supabase = createClient()
  const router = useRouter()

  const fetchNoticias = async () => {
    const { data, error } = await supabase
      .from('noticias')
      .select('id, titulo, created_at, categoria, publicado, views, autor, imagem_url')
      .order('created_at', { ascending: false })

    if (error) console.error('Erro ao carregar notícias:', error)
    else setNoticias(data)
    setLoading(false)
  }

  const stats = {
    total: noticias.length,
    publicadas: noticias.filter(n => n.publicado).length,
    rascunhos: noticias.filter(n => !n.publicado).length,
    vistas: noticias.reduce((acc, curr) => acc + (curr.views || 0), 0)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNoticias()
  }, [])

  const filteredNoticias = noticias.filter(n => {
    const matchesSearch = n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         n.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || 
                         (statusFilter === 'publicado' && n.publicado) || 
                         (statusFilter === 'rascunho' && !n.publicado)
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = () => {
    if (selectedIds.length === filteredNoticias.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredNoticias.map(n => n.id))
    }
  }

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Tem a certeza que deseja eliminar ${selectedIds.length} notícias?`)) return
    
    const { error } = await supabase
      .from('noticias')
      .delete()
      .in('id', selectedIds)

    if (error) alert('Erro ao eliminar notícias')
    else {
      setSelectedIds([])
      fetchNoticias()
    }
  }

  const handleBulkStatus = async (publish) => {
    const { error } = await supabase
      .from('noticias')
      .update({ publicado: publish })
      .in('id', selectedIds)

    if (error) alert('Erro ao atualizar status')
    else {
      setSelectedIds([])
      fetchNoticias()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem a certeza que deseja eliminar esta notícia?')) return

    const { error } = await supabase
      .from('noticias')
      .delete()
      .eq('id', id)

    if (error) alert('Erro ao eliminar notícia')
    else fetchNoticias()
  }

  return (
    <main className="min-h-screen bg-slate-50/30 pt-32 pb-20 relative overflow-hidden">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary-green/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <Container size="xl">
        {/* Top Bar - High Contrast */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-primary-green rounded-full shadow-[0_0_10px_rgba(142,179,31,0.5)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-green">Backoffice v2.1 Premium</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-dark-green tracking-tighter leading-none">Gestão de <br /><span className="text-primary-green italic">Conteúdos.</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/admin/nova')}
              className="h-16 px-10 bg-dark-green text-white hover:bg-primary-green rounded-2xl shadow-2xl shadow-dark-green/10 hover:shadow-primary-green/20 active:scale-95 transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3"
            >
              <Plus size={18} strokeWidth={3} />
              Criar Notícia
            </Button>
            <button
              onClick={handleLogout}
              className="w-16 h-16 flex items-center justify-center text-slate-400 hover:text-red-500 bg-white border border-slate-100 rounded-2xl transition-all shadow-sm hover:shadow-red-500/10 hover:border-red-100"
              title="Encerrar Sessão"
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>

        {/* Bento Stats Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-16">
          {[
            { label: 'Total de Artigos', value: stats.total, icon: FileText, grid: 'lg:col-span-4', color: 'text-primary-green', bg: 'bg-primary-green/5' },
            { label: 'Publicadas', value: stats.publicadas, icon: CheckCircle2, grid: 'lg:col-span-3', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Rascunhos', value: stats.rascunhos, icon: AlertCircle, grid: 'lg:col-span-2', color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Total Views', value: stats.vistas, icon: Eye, grid: 'lg:col-span-3', color: 'text-dark-green', bg: 'bg-dark-green/5' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${stat.grid} bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_25px_50px_-10px_rgba(142,179,31,0.1)] transition-all duration-500 group`}
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black text-dark-green tracking-tighter leading-none">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar - Minimal & Float */}
        <div className="bg-white/60 backdrop-blur-xl p-4 rounded-[2rem] border border-white shadow-xl mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-green transition-colors" size={18} />
              <input
                type="text"
                placeholder="Pesquisar por título ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-green/5 focus:bg-white focus:border-primary-green/30 transition-all font-bold text-dark-green text-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-green/5 focus:bg-white focus:border-primary-green/30 transition-all shadow-sm appearance-none cursor-pointer font-black text-[10px] uppercase tracking-widest text-dark-green min-w-[200px]"
                >
                  <option value="todos">Todos os Estados</option>
                  <option value="publicado">Públicos</option>
                  <option value="rascunho">Rascunhos</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary-green">
                   <ChevronRight size={14} className="rotate-90" strokeWidth={3} />
                </div>
              </div>

              {filteredNoticias.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className={`h-14 px-8 rounded-2xl border transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] ${
                    selectedIds.length === filteredNoticias.length 
                    ? 'bg-primary-green border-primary-green text-white shadow-lg shadow-primary-green/20' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-primary-green/30 hover:text-primary-green'
                  }`}
                >
                  {selectedIds.length === filteredNoticias.length ? <CheckSquare size={16} strokeWidth={3} /> : <Square size={16} strokeWidth={3} />}
                  Multiseleção
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar - Premium Command Center */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 100, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 100, x: '-50%' }}
              className="fixed bottom-10 left-1/2 z-[100] bg-dark-green text-white px-10 py-6 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex items-center gap-10 border border-white/10 backdrop-blur-3xl"
            >
              <div className="flex items-center gap-4 pr-10 border-r border-white/10">
                <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-[12px] font-black text-white shadow-lg shadow-primary-green/30">
                  {selectedIds.length}
                </div>
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">Selecionados</span>
              </div>

              <div className="flex items-center gap-8">
                <button
                  onClick={() => handleBulkStatus(true)}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-primary-green transition-colors group"
                >
                  <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" /> Publicar
                </button>
                <button
                  onClick={() => handleBulkStatus(false)}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-amber-400 transition-colors group"
                >
                  <AlertCircle size={18} className="group-hover:scale-110 transition-transform" /> Rascunho
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-red-400 transition-colors group"
                >
                  <Trash2 size={18} className="group-hover:scale-110 transition-transform" /> Eliminar
                </button>
              </div>

              <button
                onClick={() => setSelectedIds([])}
                className="ml-4 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notícias List - Horizontal Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="relative mb-8">
              <Loader2 className="animate-spin text-primary-green" size={56} strokeWidth={1.5} />
              <div className="absolute inset-0 blur-3xl bg-primary-green/20 animate-pulse" />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">Sincronizando Base de Dados</p>
          </div>
        ) : filteredNoticias.length > 0 ? (
          <div className="space-y-4 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredNoticias.map((noticia, index) => (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 flex flex-col lg:grid lg:grid-cols-[auto_1fr_200px_auto] items-center gap-8 transition-all duration-500 ${
                    selectedIds.includes(noticia.id) 
                    ? 'bg-primary-green/5 border-primary-green/30 ring-1 ring-primary-green/10' 
                    : 'hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:border-slate-200'
                  }`}
                >
                  {/* Select & Visual */}
                  <div className="flex items-center gap-6 w-full lg:w-auto">
                    <button
                      onClick={() => toggleSelect(noticia.id)}
                      className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${
                        selectedIds.includes(noticia.id) 
                        ? 'bg-primary-green text-white shadow-lg shadow-primary-green/30' 
                        : 'bg-slate-50 text-slate-300 border border-slate-100 group-hover:border-slate-300'
                      }`}
                    >
                      {selectedIds.includes(noticia.id) ? <CheckSquare size={20} strokeWidth={3} /> : <Square size={20} strokeWidth={3} />}
                    </button>

                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-700">
                      {noticia.imagem_url ? (
                        <img src={noticia.imagem_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                          <FileText size={32} strokeWidth={1} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Info Content */}
                  <div className="min-w-0 w-full">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-4 py-1.5 bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-slate-100 group-hover:border-primary-green/20 group-hover:text-primary-green transition-colors">
                        {noticia.categoria}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 text-[9px] font-bold uppercase tracking-tight">
                        <Calendar size={12} className="text-slate-300" />
                        {new Date(noticia.created_at).toLocaleDateString('pt-PT')}
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push(`/admin/editar/${noticia.id}`)}
                      className="text-left group/title block"
                    >
                      <h2 className="text-xl md:text-2xl font-black text-dark-green group-hover/title:text-primary-green transition-colors line-clamp-1 tracking-tighter">
                        {noticia.titulo}
                      </h2>
                    </button>
                  </div>

                  {/* Status & Views */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-6 lg:gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-6 lg:pt-0 border-slate-50">
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${noticia.publicado ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${noticia.publicado ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {noticia.publicado ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <Eye size={14} className="text-slate-300" />
                      {noticia.views || 0}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(`/noticias/${noticia.slug}`, '_blank')}
                      className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary-green hover:bg-primary-green/10 rounded-xl transition-all border border-transparent hover:border-primary-green/20"
                      title="Pré-visualizar"
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/editar/${noticia.id}`)}
                      className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary-green hover:bg-primary-green/10 rounded-xl transition-all border border-transparent hover:border-primary-green/20"
                      title="Editar"
                    >
                      <FileText size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(noticia.id)}
                      className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-24 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
              {searchTerm || statusFilter !== 'todos' ? <Search size={48} /> : <Inbox size={48} />}
            </div>
            <h3 className="text-2xl font-black text-dark-green mb-4 tracking-tighter">
              {searchTerm || statusFilter !== 'todos' ? 'Sem correspondências' : 'O arquivo está vazio'}
            </h3>
            <p className="text-slate-400 mb-10 max-w-sm mx-auto font-medium text-lg leading-relaxed">
              {searchTerm || statusFilter !== 'todos' 
                ? 'Tente ajustar os termos de pesquisa ou remover os filtros ativos.' 
                : 'Comece a construir a presença digital da 20Recolher hoje mesmo.'}
            </p>
            {searchTerm || statusFilter !== 'todos' ? (
              <Button
                onClick={() => { setSearchTerm(''); setStatusFilter('todos'); }}
                className="h-14 px-10 bg-white text-dark-green border border-slate-200 hover:border-dark-green rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-100"
              >
                Limpar Todos os Filtros
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/admin/nova')}
                className="h-16 px-12 bg-primary-green text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-green/20"
              >
                Escrever Primeiro Artigo
              </Button>
            )}
          </div>
        )}
      </Container>
    </main>
  )
}
