import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import ReadingProgress from '@/components/ui/ReadingProgress'
import { Calendar, Tag, User, ArrowLeft, Share2, Facebook, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

// Metadados dinâmicos para SEO
export async function generateMetadata({ params }) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: noticia } = await supabase
    .from('noticias')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!noticia) return { title: 'Notícia não encontrada' }

  return {
    title: `${noticia.titulo} | 20recolher`,
    description: noticia.subtitulo,
    openGraph: {
      title: noticia.titulo,
      description: noticia.subtitulo,
      images: [noticia.imagem_url],
      type: 'article',
    },
  }
}

export default async function ArtigoPage({ params }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: noticia, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !noticia) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <ReadingProgress />
      
      <article>
        {/* Hero do Artigo */}
        <div className="mb-12">
          <Container size="sm">
            <Link 
              href="/noticias"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-all mb-12 group"
            >
              <div className="p-2 rounded-full bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">Voltar às notícias</span>
            </Link>

            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-6">
                <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg shadow-emerald-900/10">
                  {noticia.categoria}
                </span>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tight">
                  <Calendar size={16} className="text-emerald-500" />
                  {new Date(noticia.created_at).toLocaleDateString('pt-PT', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                {noticia.titulo}
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-8 py-2 bg-slate-50/50 rounded-r-3xl pr-8">
                {noticia.subtitulo}
              </p>
            </div>
          </Container>
        </div>

        {/* Imagem de Capa */}
        {noticia.imagem_url && (
          <div className="mb-20">
            <Container>
              <div className="aspect-[21/9] rounded-[4rem] overflow-hidden shadow-3xl shadow-emerald-900/10 border border-slate-100 relative group">
                <img 
                  src={noticia.imagem_url} 
                  alt={noticia.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </Container>
          </div>
        )}

        {/* Conteúdo do Artigo */}
        <Container size="sm">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Corpo do Texto */}
            <div className="flex-grow">
              <div 
                className="prose prose-xl prose-emerald max-w-none 
                  prose-headings:text-slate-900 prose-headings:font-extrabold prose-headings:tracking-tight
                  prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:text-lg md:prose-p:text-xl
                  prose-a:text-emerald-600 prose-a:no-underline prose-a:font-bold border-b border-emerald-100 hover:border-emerald-600 transition-all
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-img:rounded-[2.5rem] prose-img:shadow-2xl
                  prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-50 prose-blockquote:py-6 prose-blockquote:px-10 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-slate-700"
                dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
              />

              {/* Footer do Artigo */}
              <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200 shadow-inner">
                    <User size={28} />
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-slate-900 leading-none mb-1">{noticia.autor}</span>
                    <span className="block text-[10px] text-emerald-600 uppercase tracking-[0.2em] font-extrabold">Equipa 20recolher</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Partilhar:</span>
                  <button className="p-4 bg-slate-50 text-slate-400 hover:text-white hover:bg-[#1877F2] rounded-2xl transition-all shadow-sm border border-slate-100 group">
                    <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="p-4 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all shadow-sm border border-slate-100 group">
                    <LinkIcon size={20} className="group-hover:rotate-45 transition-transform" />
                  </button>
                  <button className="p-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-2xl transition-all shadow-lg shadow-emerald-900/20 group">
                    <Share2 size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Sugestões de Leitura seriam adicionadas aqui futuramente */}
    </main>
  )
}
