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
  Loader2, 
  Inbox, 
  Search, 
  CheckCircle2, 
  BarChart3, 
  Layers, 
  Settings, 
  Users, 
  Bell 
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const supabase = createClient()
  const router = useRouter()

  const fetchNoticias = async () => {
    const { data, error } = await supabase
      .from('noticias')
      .select('id, titulo, created_at, categoria, publicado, views, autor, imagem_url, slug')
      .order('created_at', { ascending: false })

    if (error) console.error('Erro ao carregar notícias:', error)
    else setNoticias(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchNoticias()
  }, [])

  const stats = {
    total: noticias.length,
    publicadas: noticias.filter(n => n.publicado).length,
    vistas: noticias.reduce((acc, curr) => acc + (curr.views || 0), 0)
  }

  const filteredNoticias = noticias.filter(n => {
    const matchesSearch = n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         n.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || 
                         (statusFilter === 'publicado' && n.publicado) || 
                         (statusFilter === 'rascunho' && !n.publicado)
    return matchesSearch && matchesStatus
  })

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleDelete = async (id) => {
    if (!confirm('Eliminar permanentemente?')) return
    const { error } = await supabase.from('noticias').delete().eq('id', id)
    if (error) alert('Erro ao eliminar')
    else fetchNoticias()
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex font-sans text-dark-green selection:bg-primary-green/30">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-dark-green text-white p-8 flex flex-col justify-between z-50">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-dark-green shadow-[0_0_20px_rgba(142,179,31,0.4)]">
              <Layers size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tighter">Cloud<span className="text-primary-green">Admin</span></span>
          </div>
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-primary-green text-dark-green font-black shadow-lg">
              <FileText size={20} />
              <span className="text-sm uppercase tracking-[0.15em] font-bold">Notícias</span>
            </button>
            <button onClick={() => router.push('/admin/analytics')} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <BarChart3 size={20} />
              <span className="text-sm uppercase tracking-[0.15em] font-bold">Analytics</span>
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 w-full text-white/30 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="text-xs font-black uppercase tracking-widest">Sair</span>
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-primary-green rounded-full shadow-[0_0_10px_rgba(142,179,31,1)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Backoffice Ativo</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-dark-green">Olá, <span className="text-primary-green italic">Gestor</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl border border-slate-100 shadow-sm">
               <div className="w-10 h-10 bg-dark-green rounded-xl flex items-center justify-center text-primary-green font-black">AD</div>
               <div className="text-left">
                  <p className="text-[10px] font-black text-dark-green uppercase leading-none mb-1">Admin</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Super User</p>
               </div>
            </div>
          </div>
        </header>

        {/* COMPACT QUICK STATS */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary-green"><FileText size={28} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Total de Artigos</p>
              <h3 className="text-3xl font-black tracking-tighter">{stats.total}</h3>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary-green"><CheckCircle2 size={28} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Publicados</p>
              <h3 className="text-3xl font-black tracking-tighter">{stats.publicadas}</h3>
            </div>
          </div>
          <div className="bg-primary-green rounded-3xl p-8 text-dark-green shadow-lg shadow-primary-green/10 flex items-center gap-6">
            <div className="w-14 h-14 bg-dark-green rounded-2xl flex items-center justify-center text-primary-green"><BarChart3 size={28} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Total de Views</p>
              <h3 className="text-3xl font-black tracking-tighter">{stats.vistas.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* CONTENT MANAGEMENT */}
        <section className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-xl font-black uppercase tracking-tighter">Gestão de Conteúdo</h3>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-green transition-colors" />
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-8 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-green/20 text-xs font-bold w-64 transition-all"
                />
              </div>
              <Button 
                onClick={() => router.push('/admin/nova')}
                className="h-14 px-8 bg-dark-green text-white hover:bg-primary-green rounded-2xl shadow-xl shadow-dark-green/10 flex items-center gap-3 transition-all active:scale-95"
              >
                <Plus size={18} strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-widest">Novo Post</span>
              </Button>
            </div>
          </div>

          <div className="p-10">
            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-primary-green" size={40} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Carregando...</p>
              </div>
            ) : filteredNoticias.length > 0 ? (
              <div className="space-y-4">
                {filteredNoticias.map((noticia, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={noticia.id}
                    className="group bg-white hover:bg-slate-50/80 p-6 rounded-3xl border border-slate-50 hover:border-slate-100 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-8">
                       <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm shrink-0">
                          {noticia.imagem_url ? (
                             <img src={noticia.imagem_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-slate-300"><FileText size={24} /></div>
                          )}
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary-green">{noticia.categoria}</span>
                             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{new Date(noticia.created_at).toLocaleDateString()}</span>
                          </div>
                          <h4 className="text-lg font-black tracking-tighter text-dark-green group-hover:text-primary-green transition-colors">{noticia.titulo}</h4>
                       </div>
                    </div>
                    <div className="flex items-center gap-12">
                       <div className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                         noticia.publicado 
                         ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500' 
                         : 'bg-amber-500/5 border-amber-500/10 text-amber-500'
                       }`}>
                          {noticia.publicado ? 'Público' : 'Rascunho'}
                       </div>
                       <div className="flex items-center gap-2">
                          <button onClick={() => router.push(`/admin/editar/${noticia.id}`)} className="w-10 h-10 bg-slate-50 text-slate-400 hover:bg-dark-green hover:text-white rounded-xl flex items-center justify-center transition-all">
                            <FileText size={16} />
                          </button>
                          <button onClick={() => handleDelete(noticia.id)} className="w-10 h-10 bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all">
                            <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-50 rounded-[3rem]">
                <Inbox size={48} className="mx-auto text-slate-100 mb-6" />
                <p className="text-slate-400 font-bold">Nenhum artigo encontrado.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
