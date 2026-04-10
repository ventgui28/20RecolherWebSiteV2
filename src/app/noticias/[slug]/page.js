import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import ReadingProgress from '@/components/ui/ReadingProgress'
import { Calendar, Tag, User, ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ClientShareButton from '@/components/ui/ClientShareButton'
import ClientViewCounter from '@/components/ui/ClientViewCounter'
import { NEWS_DEFAULT_IMAGES } from '@/constants/news'
import { calculateReadingTime } from '@/lib/utils'

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
      images: [noticia.imagem_url || NEWS_DEFAULT_IMAGES[0].url],
      type: 'article',
    },
  }
}

export default async function ArtigoPage({ params }) {
  const { slug } = await params
  const supabase = await createClient()

  const fallbackImage = NEWS_DEFAULT_IMAGES[0].url;

  const { data: noticia, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !noticia) {
    notFound()
  }

  const { data: relacionados } = await supabase
    .from('noticias')
    .select('id, titulo, slug, imagem_url, created_at, categoria')
    .eq('categoria', noticia.categoria)
    .neq('id', noticia.id)
    .eq('publicado', true)
    .limit(3)

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <ReadingProgress />
      <ClientViewCounter slug={noticia.slug} />
      
      <article>
        {/* Editorial Hero - High Contrast & Hierarchy */}
        <header className="mb-16">
          <Container size="md">
            <Link 
              href="/noticias"
              className="inline-flex items-center gap-3 text-slate-400 hover:text-emerald-600 transition-all mb-12 group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Sala de Imprensa</span>
            </Link>

            <div className="space-y-12">
              <div className="flex flex-wrap items-center gap-6">
                <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-lg shadow-emerald-900/10">
                  {noticia.categoria}
                </span>
                <div className="flex items-center gap-6 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={14} className="text-emerald-500" />
                    {new Date(noticia.created_at).toLocaleDateString('pt-PT', { 
                      day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="flex items-center gap-2.5">
                    <Clock size={14} className="text-emerald-500" />
                    {calculateReadingTime(noticia.conteudo)} min de leitura
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1] tracking-tighter">
                {noticia.titulo}
              </h1>

              <div className="max-w-4xl">
                <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">
                  {noticia.subtitulo}
                </p>
              </div>
            </div>
          </Container>
        </header>

        {/* Cinematic Cover Image - Ultra Large Layout */}
        <div className="mb-24 px-4 md:px-8">
          <Container size="full">
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-slate-100 shadow-2xl shadow-emerald-900/5 relative border border-slate-100">
              <img 
                src={noticia.imagem_url || fallbackImage} 
                alt={noticia.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          </Container>
        </div>

        {/* High-Fidelity Reading Grid */}
        <Container size="md">
          <div className="grid lg:grid-cols-[100px_1fr] gap-12 xl:gap-24 relative">
            
            {/* Share Sidebar - Truly Sticky & Professional */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180 mb-2">Partilhar</span>
                  <div className="w-px h-12 bg-slate-100 mb-2" />
                  <ClientShareButton title={noticia.titulo} text={noticia.subtitulo} />
                </div>
              </div>
            </aside>

            {/* Content Area - Optimized for Legibility (720px max) */}
            <div className="max-w-[720px] mx-auto lg:mx-0">
              <div 
                className="prose prose-lg md:prose-xl prose-emerald max-w-none 
                  prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight prose-headings:mt-16 prose-headings:mb-8
                  prose-h2:text-4xl prose-h2:tracking-tighter
                  prose-h3:text-2xl prose-h3:tracking-tight
                  prose-p:text-slate-600 prose-p:leading-[1.9] prose-p:tracking-normal prose-p:mb-10
                  prose-p:first-of-type:text-2xl prose-p:first-of-type:text-slate-800 prose-p:first-of-type:font-medium prose-p:first-of-type:leading-relaxed
                  prose-a:text-emerald-600 prose-a:no-underline prose-a:border-b-2 prose-a:border-emerald-100 hover:prose-a:border-emerald-600 hover:prose-a:bg-emerald-50/50 transition-all
                  prose-strong:text-slate-900 prose-strong:font-black
                  prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:my-20 prose-img:border prose-img:border-slate-100
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-50/50 prose-blockquote:py-12 prose-blockquote:px-12 prose-blockquote:rounded-r-[2.5rem] prose-blockquote:not-italic prose-blockquote:text-slate-800 prose-blockquote:font-bold prose-blockquote:text-3xl prose-blockquote:leading-tight prose-blockquote:tracking-tighter
                  prose-ul:my-10 prose-li:my-3 prose-li:text-slate-600"
                dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
              />

              {/* Author Footer & Mobile Share */}
              <footer className="mt-24 pt-16 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-12 bg-slate-50/80 backdrop-blur-sm p-10 md:p-14 rounded-[3rem] border border-slate-100/50">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white border border-slate-100 rounded-full flex items-center justify-center text-emerald-600 shadow-xl shadow-slate-200/50">
                      <User size={32} />
                    </div>
                    <div>
                      <span className="block text-[11px] text-emerald-600 uppercase tracking-[0.3em] font-black mb-1.5">Publicado por</span>
                      <span className="block text-2xl font-black text-slate-900 leading-none">{noticia.autor}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-4">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest sm:hidden">Partilhar Artigo</span>
                     <div className="lg:hidden">
                        <ClientShareButton title={noticia.titulo} text={noticia.subtitulo} />
                     </div>
                     <Link 
                        href="/noticias"
                        className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
                     >
                        Ver todos os artigos
                     </Link>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </Container>
      </article>

      {/* Related Articles - High End Magazine Layout */}
      {relacionados && relacionados.length > 0 && (
        <section className="mt-40 pt-32 pb-24 bg-slate-900 text-white rounded-t-[5rem]">
          <Container size="lg">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
              <div>
                <span className="text-emerald-500 text-[11px] font-black uppercase tracking-[0.4em] mb-6 block">Leituras Recomendadas</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">Artigos Relacionados</h2>
              </div>
              <Link href="/noticias" className="flex items-center gap-3 text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-all group border-b-2 border-slate-800 pb-2 hover:border-emerald-500">
                Explorar Sala de Imprensa
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
              {relacionados.map((rel) => (
                <Link 
                  key={rel.id} 
                  href={`/noticias/${rel.slug}`}
                  className="group flex flex-col h-full bg-transparent"
                >
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 bg-slate-800 relative ring-1 ring-white/10 group-hover:ring-emerald-500/50 transition-all duration-500">
                    <img 
                      src={rel.imagem_url || fallbackImage} 
                      alt={rel.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                        {rel.categoria}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2 tracking-tight">
                      {rel.titulo}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                      <Calendar size={14} className="text-emerald-500" />
                      {new Date(rel.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
