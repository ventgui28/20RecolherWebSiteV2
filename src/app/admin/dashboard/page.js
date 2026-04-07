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
  Inbox
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardPage() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
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

        {/* Notícias List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
            <p className="text-slate-500 font-medium">A carregar conteúdos...</p>
          </div>
        ) : noticias.length > 0 ? (
          <div className="grid gap-4">
            <AnimatePresence>
              {noticias.map((noticia, index) => (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    {noticia.imagem_url ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden hidden md:block border border-slate-100">
                        <img src={noticia.imagem_url} alt="" className="w-full h-full object-cover" />
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
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {noticia.titulo}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(`/noticias/${noticia.slug}`, '_blank')}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                      title="Ver no site"
                    >
                      <ExternalLink size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(noticia.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
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
              <FileText size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ainda não há notícias</h3>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">
              Comece por adicionar a primeira notícia para aparecer no site.
            </p>
            <Button
              onClick={() => router.push('/admin/nova')}
              variant="outline"
              className="px-8 border-slate-200 hover:bg-slate-50"
            >
              Criar Primeira Notícia
            </Button>
          </div>
        )}
      </Container>
    </main>
  )
}
