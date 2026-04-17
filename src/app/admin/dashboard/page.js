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
  AlertCircle,
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  Bell,
  ChevronRight,
  MoreVertical,
  Layers,
  Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts'

export default function DashboardPage() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [selectedIds, setSelectedIds] = useState([])
  const [activeTab, setActiveTab] = useState('noticias')
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

  const stats = {
    total: noticias.length,
    publicadas: noticias.filter(n => n.publicado).length,
    rascunhos: noticias.filter(n => !n.publicado).length,
    vistas: noticias.reduce((acc, curr) => acc + (curr.views || 0), 0)
  }

  // Analytics Processing
  const chartData = [...noticias]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 6)
    .map(n => ({
      name: n.titulo.substring(0, 8) + '...',
      views: n.views || 0
    }))
    .reverse();

  const categoryCounts = noticias.reduce((acc, n) => {
    acc[n.categoria] = (acc[n.categoria] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(([name, value], i) => ({
    name,
    value,
    color: ['#8EB31F', '#14463C', '#10B981', '#F59E0B'][i % 4]
  }));

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const handleDelete = async (id) => {
    if (!confirm('Eliminar permanentemente?')) return
    const { error } = await supabase.from('noticias').delete().eq('id', id)
    if (error) alert('Erro')
    else fetchNoticias()
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex font-sans text-dark-green selection:bg-primary-green/30">
      {/* --- FLOATING SIDEBAR --- */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-dark-green text-white p-8 flex flex-col justify-between z-50">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-dark-green shadow-[0_0_20px_rgba(142,179,31,0.4)]">
              <Layers size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tighter">Cloud<span className="text-primary-green">Admin</span></span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'noticias', label: 'Notícias', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'users', label: 'Equipa', icon: Users },
              { id: 'settings', label: 'Definições', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeTab === item.id 
                  ? 'bg-primary-green text-dark-green font-black shadow-lg shadow-primary-green/10' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? '' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-sm uppercase tracking-[0.15em] font-bold">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-primary-green" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Suporte Pro</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-60 font-medium mb-4">A sua plataforma está atualizada na versão v3.0.4.</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors">Ler Update</button>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 w-full text-white/30 hover:text-red-400 transition-colors group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Sair</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-72 p-12">
        {/* TOP HEADER */}
        <header className="flex items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-primary-green rounded-full shadow-[0_0_10px_rgba(142,179,31,1)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Consola de Gestão</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-dark-green">
              Visão <span className="text-primary-green italic">Geral</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
               <button className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm hover:shadow-md transition-all">
                 <Bell size={22} className="text-slate-400" />
               </button>
               <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
            </div>

            <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl border border-slate-100 shadow-sm">
               <div className="w-10 h-10 bg-dark-green rounded-xl flex items-center justify-center text-primary-green font-black">AD</div>
               <div className="text-left">
                  <p className="text-[10px] font-black text-dark-green uppercase leading-none mb-1">Admin</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Super User</p>
               </div>
            </div>
          </div>
        </header>

        {/* ANALYTICS BENTO SECTION */}
        <section className="grid grid-cols-12 gap-8 mb-12">
          {/* Main Chart Card */}
          <div className="col-span-7 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Engajamento de Conteúdo</h4>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-primary-green rounded-full" />
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Views</span>
              </div>
            </div>
            
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8EB31F" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#8EB31F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-dark-green p-4 rounded-2xl shadow-2xl border border-white/10">
                            <p className="text-xl font-black text-white">{payload[0].value}</p>
                            <p className="text-[8px] font-black text-primary-green uppercase tracking-widest">Visualizações</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#8EB31F" strokeWidth={5} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Pie Card */}
          <div className="col-span-3 bg-dark-green rounded-[3rem] p-10 relative overflow-hidden text-white shadow-2xl">
            <div className="absolute inset-0 bg-grain opacity-[0.03]" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-green/60 mb-8 relative z-10 text-center">Mix Editorial</h4>
            
            <div className="h-[200px] w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <p className="text-3xl font-black tracking-tighter">{noticias.length}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Posts</p>
               </div>
            </div>

            <div className="mt-8 space-y-2 relative z-10">
               {categoryData.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest opacity-60">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                     </div>
                     <span>{item.value}</span>
                  </div>
               ))}
            </div>
          </div>

          {/* Quick Stats Bento */}
          <div className="col-span-2 grid grid-rows-2 gap-8">
             <div className="bg-primary-green rounded-[3rem] p-8 text-dark-green relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-4">Vistas</p>
               <h2 className="text-4xl font-black tracking-tighter mb-2">{stats.vistas.toLocaleString()}</h2>
               <div className="w-full h-1 bg-dark-green/10 rounded-full overflow-hidden mt-4">
                  <div className="w-[80%] h-full bg-dark-green" />
               </div>
             </div>

             <div className="bg-white rounded-[3rem] p-8 border border-slate-100 flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-2">Estado</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <h2 className="text-3xl font-black tracking-tighter text-dark-green">{stats.publicadas}</h2>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ativos</p>
             </div>
          </div>
        </section>

        {/* ACTIONS & CONTENT SECTION */}
        <section className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* List Header */}
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-10">
               <h3 className="text-xl font-black uppercase tracking-tighter">Gestão de Conteúdo</h3>
               <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  <button className="px-6 py-2 bg-white rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest">Todos</button>
                  <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Públicos</button>
                  <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Rascunhos</button>
               </div>
            </div>

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

          {/* List Content */}
          <div className="p-10">
            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-primary-green" size={40} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Sincronizando...</p>
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
                             <span className="w-1 h-1 bg-slate-200 rounded-full" />
                             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{new Date(noticia.created_at).toLocaleDateString()}</span>
                          </div>
                          <h4 className="text-lg font-black tracking-tighter text-dark-green group-hover:text-primary-green transition-colors">{noticia.titulo}</h4>
                       </div>
                    </div>

                    <div className="flex items-center gap-12">
                       <div className="flex flex-col items-end">
                          <p className="text-xl font-black tracking-tighter text-dark-green leading-none mb-1">{noticia.views || 0}</p>
                          <p className="text-[8px] font-black uppercase tracking-widest text-slate-300">Views</p>
                       </div>

                       <div className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                         noticia.publicado 
                         ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500' 
                         : 'bg-amber-500/5 border-amber-500/10 text-amber-500'
                       }`}>
                          {noticia.publicado ? 'Público' : 'Rascunho'}
                       </div>

                       <div className="flex items-center gap-2">
                          <button 
                            onClick={() => router.push(`/admin/editar/${noticia.id}`)}
                            className="w-10 h-10 bg-slate-50 text-slate-400 hover:bg-dark-green hover:text-white rounded-xl flex items-center justify-center transition-all"
                          >
                            <FileText size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(noticia.id)}
                            className="w-10 h-10 bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all"
                          >
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
