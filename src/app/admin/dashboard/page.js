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
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts'

const IMPACT_DATA = [
  { month: 'Jan', weight: 450, volume: 320 },
  { month: 'Fev', weight: 520, volume: 380 },
  { month: 'Mar', weight: 480, volume: 410 },
  { month: 'Abr', weight: 610, volume: 450 },
  { month: 'Mai', weight: 750, volume: 520 },
  { month: 'Jun', weight: 890, volume: 600 },
];

const WASTE_TYPES = [
  { name: 'Informática', value: 45, color: '#8EB31F' },
  { name: 'Eletrodomésticos', value: 25, color: '#14463C' },
  { name: 'Toners', value: 20, color: '#10B981' },
  { name: 'Outros', value: 10, color: '#F59E0B' },
];


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

  // Processar dados para o gráfico de visualizações (Top 6 notícias)
  const chartData = [...noticias]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 6)
    .map(n => ({
      name: n.titulo.substring(0, 10) + '...',
      fullTitle: n.titulo,
      views: n.views || 0
    }))
    .reverse();

  // Processar dados para o gráfico de categorias
  const categoryCounts = noticias.reduce((acc, n) => {
    acc[n.categoria] = (acc[n.categoria] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(([name, value], i) => ({
    name,
    value,
    color: ['#8EB31F', '#14463C', '#10B981', '#F59E0B', '#3B82F6'][i % 5]
  }));

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
        {/* Top Bar - High Contrast & Greeting */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-1 bg-primary-green rounded-full shadow-[0_0_15px_rgba(142,179,31,0.6)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-green">Backoffice Pro Max v2.5</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-8xl font-black text-dark-green tracking-tighter leading-[0.85] mb-4">
                Olá, <span className="text-primary-green">Gestor.</span>
              </h1>
              <p className="text-slate-400 font-bold text-lg tracking-tight ml-1">
                O ecossistema 20Recolher está operacional e saudável.
              </p>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 px-6 py-4 bg-white/50 border border-white/20 rounded-2xl mr-4 backdrop-blur-md">
               <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse shadow-[0_0_10px_rgba(142,179,31,1)]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-dark-green/60">Servidor Ativo</span>
            </div>
            
            <Button
              onClick={() => router.push('/admin/nova')}
              className="h-16 px-10 bg-dark-green text-white hover:bg-primary-green rounded-2xl shadow-2xl shadow-dark-green/20 hover:shadow-primary-green/30 active:scale-95 transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3 border border-white/10"
            >
              <Plus size={18} strokeWidth={3} />
              Novo Artigo
            </Button>
            <button
              onClick={handleLogout}
              className="w-16 h-16 flex items-center justify-center text-slate-400 hover:text-red-500 bg-white border border-slate-100 rounded-2xl transition-all shadow-sm hover:shadow-red-500/10 hover:border-red-100 group"
              title="Encerrar Sessão"
            >
              <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Dashboard Layout - Grid with Sidebar */}
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-9 space-y-10">
            {/* Real-Time Impact Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
              {/* Main Line Chart - Growth */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-green mb-1">Engajamento de Conteúdo</h4>
                    <h3 className="text-2xl font-black text-dark-green tracking-tighter">Top Artigos (Visualizações)</h3>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                    <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live de DB</span>
                  </div>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8EB31F" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8EB31F" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 900 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '20px', 
                          border: 'none', 
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          padding: '15px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#8EB31F" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorViews)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Pie Chart - Distribution */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 bg-dark-green p-10 rounded-[3rem] shadow-2xl relative overflow-hidden text-white"
              >
                <div className="absolute inset-0 bg-grain opacity-[0.05]" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-green mb-8 relative z-10">Foco Editorial</h4>
                
                <div className="h-[220px] relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-3xl font-black tracking-tighter">{noticias.length}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Posts</p>
                  </div>
                </div>

                <div className="mt-8 space-y-3 relative z-10">
                  {categoryData.map((type, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }} />
                        <span className="opacity-60">{type.name}</span>
                      </div>
                      <span>{type.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bento Stats Grid - Asymmetric Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {[
                { label: 'Total de Artigos', value: stats.total, icon: FileText, grid: 'lg:col-span-4', color: 'text-primary-green', bg: 'bg-primary-green/5', progress: 100 },
                { label: 'Publicadas', value: stats.publicadas, icon: CheckCircle2, grid: 'lg:col-span-3', color: 'text-emerald-500', bg: 'bg-emerald-50', progress: (stats.publicadas / (stats.total || 1)) * 100 },
                { label: 'Rascunhos', value: stats.rascunhos, icon: AlertCircle, grid: 'lg:col-span-2', color: 'text-amber-500', bg: 'bg-amber-50', progress: (stats.rascunhos / (stats.total || 1)) * 100 },
                { label: 'Vistas Totais', value: stats.vistas, icon: Eye, grid: 'lg:col-span-3', color: 'text-dark-green', bg: 'bg-dark-green/5', progress: 85 },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${stat.grid} bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_25px_50px_-10px_rgba(142,179,31,0.1)] transition-all duration-500 group relative overflow-hidden`}
                >
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-green/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                      <stat.icon size={28} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                      <h3 className="text-4xl font-black text-dark-green tracking-tighter leading-none mb-4">{stat.value}</h3>
                      
                      {/* Visual Indicator - Mini Progress Bar */}
                      <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full ${stat.color.replace('text', 'bg')} opacity-40`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Toolbar - Minimal & Float */}
            <div className="bg-white/60 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-green transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Filtrar por título, categoria ou autor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:ring-4 focus:ring-primary-green/5 focus:bg-white focus:border-primary-green/30 transition-all font-bold text-dark-green text-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-14 pr-12 py-5 bg-slate-50/50 border border-slate-100 rounded-[1.8rem] focus:outline-none focus:ring-4 focus:ring-primary-green/5 focus:bg-white focus:border-primary-green/30 transition-all shadow-sm appearance-none cursor-pointer font-black text-[10px] uppercase tracking-widest text-dark-green min-w-[220px]"
                    >
                      <option value="todos">Todos os Estados</option>
                      <option value="publicado">Artigos Ativos</option>
                      <option value="rascunho">Rascunhos</option>
                    </select>
                  </div>

                  {filteredNoticias.length > 0 && (
                    <button
                      onClick={handleSelectAll}
                      className={`h-[60px] px-10 rounded-[1.8rem] border transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] ${
                        selectedIds.length === filteredNoticias.length 
                        ? 'bg-primary-green border-primary-green text-white shadow-lg shadow-primary-green/20' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-primary-green/30 hover:text-primary-green'
                      }`}
                    >
                      {selectedIds.length === filteredNoticias.length ? <CheckSquare size={16} strokeWidth={3} /> : <Square size={16} strokeWidth={3} />}
                      Seleção
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* List - Moved here */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                 <div className="absolute inset-0 bg-grain opacity-[0.02]" />
                <div className="relative mb-8">
                  <Loader2 className="animate-spin text-primary-green" size={56} strokeWidth={1.5} />
                  <div className="absolute inset-0 blur-3xl bg-primary-green/20 animate-pulse" />
                </div>
                <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] relative z-10">Sincronizando Base de Dados</p>
              </div>
            ) : filteredNoticias.length > 0 ? (
              <div className="space-y-4">
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
                            {noticia.publicado ? 'Público' : 'Rascunho'}
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
                          title="Abrir no Site"
                        >
                          <ExternalLink size={18} />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/editar/${noticia.id}`)}
                          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary-green hover:bg-primary-green/10 rounded-xl transition-all border border-transparent hover:border-primary-green/20"
                          title="Editar Artigo"
                        >
                          <FileText size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(noticia.id)}
                          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                          title="Eliminar permanentemente"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grain opacity-[0.01]" />
                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
                  {searchTerm || statusFilter !== 'todos' ? <Search size={48} /> : <Inbox size={48} />}
                </div>
                <h3 className="text-2xl font-black text-dark-green mb-4 tracking-tighter relative z-10">
                  {searchTerm || statusFilter !== 'todos' ? 'Nenhum resultado encontrado' : 'Arquivo Digital Vazio'}
                </h3>
                <p className="text-slate-400 mb-10 max-w-sm mx-auto font-medium text-lg leading-relaxed relative z-10">
                  {searchTerm || statusFilter !== 'todos' 
                    ? 'Tente simplificar os termos de pesquisa ou remover os filtros aplicados.' 
                    : 'A plataforma está pronta para receber os novos conteúdos da 20Recolher.'}
                </p>
                {searchTerm || statusFilter !== 'todos' ? (
                  <Button
                    onClick={() => { setSearchTerm(''); setStatusFilter('todos'); }}
                    className="h-14 px-10 bg-white text-dark-green border border-slate-200 hover:border-dark-green rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-100 relative z-10"
                  >
                    Limpar Filtros
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push('/admin/nova')}
                    className="h-16 px-12 bg-primary-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary-green/20 relative z-10"
                  >
                    Começar a Escrever
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Area - Activity Center */}
          <div className="lg:col-span-3 space-y-8">
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-dark-green">Atividade Recente</h4>
                <div className="w-2 h-2 bg-primary-green rounded-full shadow-[0_0_8px_rgba(142,179,31,0.5)]" />
              </div>

              <div className="space-y-6">
                {[
                  { type: 'edit', title: 'Dashboard Atualizado', time: 'Agora mesmo', icon: CheckCircle2, color: 'text-primary-green' },
                  { type: 'auth', title: 'Sessão Iniciada', time: 'Há 5 minutos', icon: LogOut, color: 'text-slate-400' },
                  { type: 'db', title: 'Base de Dados Sinc.', time: 'Há 12 minutos', icon: Loader2, color: 'text-emerald-500' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-default">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-md transition-all`}>
                      <item.icon size={16} className={item.color} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-dark-green mb-0.5">{item.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-slate-50">
                <div className="bg-dark-green bg-grain p-6 rounded-2xl text-white">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-green mb-2">Dica Pro</p>
                  <p className="text-[11px] font-medium leading-relaxed opacity-70">
                    Use a multiseleção para publicar vários rascunhos de uma só vez.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}
