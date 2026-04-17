'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Layers, 
  Sparkles,
  Bell,
  ArrowUpRight,
  Eye,
  TrendingUp,
  Target
} from 'lucide-react'
import { motion } from 'framer-motion'
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts'

export default function AnalyticsPage() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('noticias').select('*')
      setNoticias(data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const stats = {
    vistas: noticias.reduce((acc, curr) => acc + (curr.views || 0), 0),
    total: noticias.length,
    media: noticias.length > 0 ? Math.round(noticias.reduce((acc, curr) => acc + (curr.views || 0), 0) / noticias.length) : 0
  }

  const chartData = [...noticias]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 8)
    .map(n => ({
      name: n.titulo.substring(0, 10) + '...',
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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex font-sans text-dark-green">
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
            <button onClick={() => router.push('/admin/dashboard')} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <FileText size={20} />
              <span className="text-sm uppercase tracking-[0.15em] font-bold">Notícias</span>
            </button>
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-primary-green text-dark-green font-black shadow-lg">
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
            <h1 className="text-5xl font-black tracking-tighter text-dark-green">Centro de <span className="text-primary-green italic">Dados</span></h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">Performance e Métricas de Público</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
             <div className="text-right">
                <p className="text-[10px] font-black text-dark-green uppercase mb-1">Total de Tráfego</p>
                <p className="text-xl font-black text-primary-green leading-none">{stats.vistas.toLocaleString()}</p>
             </div>
             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary-green">
                <TrendingUp size={20} />
             </div>
          </div>
        </header>

        {/* ANALYTICS GRID */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main Views Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-8 bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-12">
               <h3 className="text-2xl font-black tracking-tighter uppercase">Engajamento de Artigos</h3>
               <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">Tempo Real</div>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8EB31F" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#8EB31F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-dark-green p-5 rounded-3xl shadow-2xl border border-white/10">
                            <p className="text-[10px] font-black text-primary-green uppercase mb-2">{payload[0].payload.name}</p>
                            <p className="text-2xl font-black text-white">{payload[0].value} <span className="text-xs opacity-40">Views</span></p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#8EB31F" strokeWidth={6} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sidebar Stats */}
          <div className="col-span-4 space-y-8">
            <div className="bg-dark-green rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-grain opacity-[0.05]" />
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-green/60 mb-8 relative z-10">Mix Editorial</h4>
               <div className="h-[220px] relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} innerRadius={60} outerRadius={85} paddingAngle={10} dataKey="value" stroke="none">
                        {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-4xl font-black tracking-tighter">{noticias.length}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Total</p>
                  </div>
               </div>
               <div className="mt-8 space-y-3 relative z-10">
                  {categoryData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="opacity-40">{item.name}</span>
                       </div>
                       <span>{item.value}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary-green rounded-[3.5rem] p-10 text-dark-green shadow-xl shadow-primary-green/10">
               <div className="flex items-center justify-between mb-6">
                  <Target size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Eficiência</span>
               </div>
               <h3 className="text-4xl font-black tracking-tighter mb-1">{stats.media}</h3>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Média de Visualizações / Post</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
