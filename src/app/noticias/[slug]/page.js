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
        {/* Editorial Hero */}
        <div className="mb-16">
          <Container size="sm">
            <Link 
              href="/noticias"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-all mb-12 group"
            >
              <div className="p-2 rounded-full border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Sala de Imprensa</span>
            </Link>

            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-b border-slate-100 pb-8">
                <span className="w-fit bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-emerald-100">
                  {noticia.categoria}
                </span>
                <div className="flex flex-wrap items-center gap-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-emerald-500" />
                    {new Date(noticia.created_at).toLocaleDateString('pt-PT', { 
                      day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-emerald-500" />
                    {calculateReadingTime(noticia.conteudo)} min de leitura
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                {noticia.titulo}
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 leading-[1.6] font-medium max-w-3xl">
                {noticia.subtitulo}
              </p>
            </div>
          </Container>
        </div>

        {/* Cinematic Cover Image */}
        <div className="mb-20 px-4 md:px-8">
          <Container size="lg" className="px-0 sm:px-0 lg:px-0">
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl shadow-emerald-900/5 relative group border border-slate-200/50">
              <img 
                src={noticia.imagem_url || fallbackImage} 
                alt={noticia.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </div>
          </Container>
        </div>

        {/* High-Fidelity Reading Experience */}
        <Container size="sm">
          <div className="flex flex-col gap-16 relative">
            {/* Share Sidebar (Desktop Only) */}
            <div className="hidden lg:flex flex-col gap-4 absolute -left-24 top-0 sticky-share">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 mb-4">Partilhar</span>
              <ClientShareButton title={noticia.titulo} text={noticia.subtitulo} />
            </div>

            {/* Prose Content */}
            <div 
              className="prose prose-lg md:prose-xl prose-emerald max-w-none 
                prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight prose-headings:mt-16 prose-headings:mb-6
                prose-h2:text-3xl
                prose-h3:text-2xl
                prose-p:text-slate-600 prose-p:leading-[1.9] prose-p:tracking-normal prose-p:mb-8
                prose-p:first-of-type:text-xl prose-p:first-of-type:text-slate-700 prose-p:first-of-type:font-medium
                prose-a:text-emerald-600 prose-a:no-underline prose-a:border-b-2 prose-a:border-emerald-200 hover:prose-a:border-emerald-600 hover:prose-a:bg-emerald-50 transition-colors
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-16
                prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-50/50 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-3xl prose-blockquote:not-italic prose-blockquote:text-slate-800 prose-blockquote:font-medium prose-blockquote:text-2xl prose-blockquote:leading-snug
                prose-ul:my-8 prose-li:my-2 prose-li:text-slate-600"
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
            />

            {/* Author & Share Footer */}
            <div className="mt-16 pt-12 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-slate-50/50 p-8 md:p-12 rounded-[2rem]">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                  <User size={24} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Escrito por</span>
                  <span className="block text-xl font-black text-slate-900 leading-none">{noticia.autor}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:hidden">
                <ClientShareButton title={noticia.titulo} text={noticia.subtitulo} />
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Related Articles - Magazine Grid */}
      {relacionados && relacionados.length > 0 && (
        <section className="mt-32 pt-32 pb-16 bg-slate-900 text-white rounded-t-[4rem]">
          <Container>
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-4 block">Explore também</span>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">Artigos Relacionados</h2>
              </div>
              <Link href="/noticias" className="hidden md:flex items-center gap-3 text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-all group">
                Voltar à Sala
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 xl:gap-12">
              {relacionados.map((rel) => (
                <Link 
                  key={rel.id} 
                  href={`/noticias/${rel.slug}`}
                  className="group flex flex-col h-full bg-transparent"
                >
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-slate-800 relative">
                    <img 
                      src={rel.imagem_url || fallbackImage} 
                      alt={rel.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {rel.categoria}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-[1.3] group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {rel.titulo}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={12} />
                      {new Date(rel.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
               <Link href="/noticias" className="inline-flex items-center gap-3 text-emerald-400 font-bold text-sm uppercase tracking-widest">
                Ver todas as notícias
                <ChevronRight size={16} />
              </Link>
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
