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
    <main className="min-h-screen bg-slate-50/50 pt-24 pb-20">
      <Container size="xl">
        {/* Top Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-12 h-1 bg-emerald-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Sistema de Gestão v2.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Painel de Controlo</h1>
            <p className="text-slate-500 mt-2 text-lg">Administração de conteúdos e métricas da 20recolher.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push('/admin/nova')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 transition-all text-base"
            >
              <Plus size={22} strokeWidth={3} />
              Nova Notícia
            </Button>
            <button
              onClick={handleLogout}
              className="p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
              title="Sair"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Conteúdos', value: stats.total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Publicadas', value: stats.publicadas, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Rascunhos', value: stats.rascunhos, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Total Visualizações', value: stats.vistas, icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Pesquisar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-500 transition-all font-medium text-slate-700"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-11 pr-10 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-500 transition-all shadow-sm appearance-none cursor-pointer font-bold text-slate-700 min-w-[180px]"
                >
                  <option value="todos">Todos Status</option>
                  <option value="publicado">Publicado</option>
                  <option value="rascunho">Rascunho</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Plus size={16} className="rotate-45" />
                </div>
              </div>

              {filteredNoticias.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className={`px-6 py-4 rounded-2xl border transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest ${
                    selectedIds.length === filteredNoticias.length 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {selectedIds.length === filteredNoticias.length ? <CheckSquare size={18} strokeWidth={2.5} /> : <Square size={18} strokeWidth={2.5} />}
                  {selectedIds.length === filteredNoticias.length ? 'Desmarcar' : 'Selecionar'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-8 border border-slate-800"
            >
              <div className="flex items-center gap-3 pr-8 border-r border-slate-700">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-[12px] font-black">
                  {selectedIds.length}
                </div>
                <span className="font-bold text-sm tracking-tight uppercase">Selecionados</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleBulkStatus(true)}
                  className="flex items-center gap-2 text-sm font-bold hover:text-emerald-400 transition-colors"
                >
                  <CheckCircle2 size={18} /> Publicar
                </button>
                <button
                  onClick={() => handleBulkStatus(false)}
                  className="flex items-center gap-2 text-sm font-bold hover:text-amber-400 transition-colors"
                >
                  <AlertCircle size={18} /> Rascunho
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 text-sm font-bold hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} /> Eliminar
                </button>
              </div>

              <button
                onClick={() => setSelectedIds([])}
                className="ml-4 p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notícias List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-slate-100">
            <div className="relative">
              <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} strokeWidth={1.5} />
              <div className="absolute inset-0 blur-2xl bg-emerald-400/20 animate-pulse" />
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-4">A sincronizar dados...</p>
          </div>
        ) : filteredNoticias.length > 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-[auto_1fr_180px_180px_140px] gap-4 px-8 py-5 bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <div className="w-10 text-center">Sel.</div>
              <div>Conteúdo</div>
              <div>Categoria</div>
              <div>Status & Métricas</div>
              <div className="text-right">Ações</div>
            </div>

            <div className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {filteredNoticias.map((noticia, index) => (
                  <motion.div
                    key={noticia.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                    className={`px-6 lg:px-8 py-6 flex flex-col lg:grid lg:grid-cols-[auto_1fr_180px_180px_140px] items-center gap-4 lg:gap-4 transition-all group ${
                      selectedIds.includes(noticia.id) 
                      ? 'bg-emerald-50/30' 
                      : 'hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Select Column */}
                    <div className="flex items-center justify-center w-10">
                      <button
                        onClick={() => toggleSelect(noticia.id)}
                        className={`p-1.5 rounded-lg transition-all ${
                          selectedIds.includes(noticia.id) 
                          ? 'bg-emerald-600 text-white' 
                          : 'text-slate-300 hover:text-slate-400 bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-200'
                        }`}
                      >
                        {selectedIds.includes(noticia.id) ? <CheckSquare size={18} strokeWidth={3} /> : <Square size={18} strokeWidth={2.5} />}
                      </button>
                    </div>

                    {/* Content Column */}
                    <div className="flex items-center gap-5 min-w-0 w-full">
                      {noticia.imagem_url ? (
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-500">
                          <img src={noticia.imagem_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 shrink-0">
                          <FileText size={24} strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="min-w-0">
                        <button 
                          onClick={() => router.push(`/admin/editar/${noticia.id}`)}
                          className="text-left group/title block"
                        >
                          <h2 className="text-base font-bold text-slate-900 group-hover/title:text-emerald-600 transition-colors line-clamp-1 mb-1">
                            {noticia.titulo}
                          </h2>
                        </button>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-slate-300" />
                            {new Date(noticia.created_at).toLocaleDateString('pt-PT')}
                          </span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className="truncate max-w-[200px]">{noticia.slug}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Column */}
                    <div className="hidden lg:flex items-center">
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-200/50">
                        {noticia.categoria}
                      </span>
                    </div>

                    {/* Status & Metrics Column */}
                    <div className="hidden lg:flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${noticia.publicado ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${noticia.publicado ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {noticia.publicado ? 'Publicado' : 'Rascunho'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                        <Eye size={12} className="text-slate-300" />
                        {noticia.views || 0} visualizações
                      </div>
                    </div>

                    {/* Actions Column */}
                    <div className="flex items-center justify-end gap-1 w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                      <button
                        onClick={() => window.open(`/noticias/${noticia.slug}`, '_blank')}
                        className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                        title="Ver no site"
                      >
                        <ExternalLink size={18} />
                      </button>
                      <button
                        onClick={() => router.push(`/admin/editar/${noticia.id}`)}
                        className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Editar"
                      >
                        <FileText size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(noticia.id)}
                        className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              {searchTerm || statusFilter !== 'todos' ? <Search size={40} /> : <FileText size={40} />}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {searchTerm || statusFilter !== 'todos' ? 'Nenhum resultado encontrado' : 'Ainda não há notícias'}
            </h3>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">
              {searchTerm || statusFilter !== 'todos' 
                ? 'Tente ajustar os filtros ou limpar a pesquisa para encontrar o que procura.' 
                : 'Comece por adicionar a primeira notícia para aparecer no site.'}
            </p>
            {searchTerm || statusFilter !== 'todos' ? (
              <Button
                onClick={() => { setSearchTerm(''); setStatusFilter('todos'); }}
                variant="outline"
                className="px-8 border-slate-200 hover:bg-slate-50"
              >
                Limpar Filtros
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/admin/nova')}
                variant="outline"
                className="px-8 border-slate-200 hover:bg-slate-50"
              >
                Criar Primeira Notícia
              </Button>
            )}
          </div>
        )}
      </Container>
    </main>
  )
}
