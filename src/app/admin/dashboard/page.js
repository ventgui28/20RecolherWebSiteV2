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
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Erro ao carregar notícias:', error)
    else setNoticias(data)
    setLoading(false)
  }

  useEffect(() => {
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
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Container>
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Painel de Controlo</h1>
            <p className="text-slate-500 mt-2">Gestão de notícias e conteúdos da 20recolher.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/admin/nova')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200"
            >
              <Plus size={20} />
              Nova Notícia
            </Button>
            <button
              onClick={handleLogout}
              className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              title="Sair"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Pesquisar por título ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-11 pr-8 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm appearance-none cursor-pointer font-medium text-slate-700 min-w-[160px]"
              >
                <option value="todos">Todos os Status</option>
                <option value="publicado">Publicado</option>
                <option value="rascunho">Rascunho</option>
              </select>
            </div>

            {filteredNoticias.length > 0 && (
              <button
                onClick={handleSelectAll}
                className={`px-6 py-4 rounded-2xl border transition-all flex items-center gap-2 font-bold text-sm ${
                  selectedIds.length === filteredNoticias.length 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {selectedIds.length === filteredNoticias.length ? <CheckSquare size={18} /> : <Square size={18} />}
                {selectedIds.length === filteredNoticias.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
              </button>
            )}
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
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
            <p className="text-slate-500 font-medium">A carregar conteúdos...</p>
          </div>
        ) : filteredNoticias.length > 0 ? (
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredNoticias.map((noticia, index) => (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white p-6 rounded-3xl border transition-all flex items-center justify-between group ${
                    selectedIds.includes(noticia.id) 
                    ? 'border-emerald-500 ring-4 ring-emerald-500/5' 
                    : 'border-slate-100 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => toggleSelect(noticia.id)}
                      className={`p-1 rounded-lg transition-colors ${
                        selectedIds.includes(noticia.id) ? 'text-emerald-600' : 'text-slate-300 group-hover:text-slate-400'
                      }`}
                    >
                      {selectedIds.includes(noticia.id) ? <CheckSquare size={24} /> : <Square size={24} />}
                    </button>

                    {noticia.imagem_url ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden hidden md:block border border-slate-100 relative group/img">
                        <img src={noticia.imagem_url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 hidden md:block">
                        <Inbox size={32} />
                      </div>
                    )}
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${noticia.publicado ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {noticia.publicado ? 'Publicado' : 'Rascunho'}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                          {noticia.categoria}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-tight ml-2">
                          <Eye size={12} className="text-emerald-500" />
                          {noticia.views || 0} visualizações
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1 max-w-xl">
                        {noticia.titulo}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(`/noticias/${noticia.slug}`, '_blank')}
                      className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                      title="Ver no site"
                    >
                      <ExternalLink size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(noticia.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Eliminar"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
