import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import ReadingProgress from '@/components/ui/ReadingProgress'
import { Calendar, Tag, User, ArrowLeft, Share2, Facebook, Link as LinkIcon, Clock, ChevronRight } from 'lucide-react'
import { FaFacebookF } from 'react-icons/fa'
import Link from 'next/link'
import ClientShareButton from '@/components/ui/ClientShareButton'
import ClientViewCounter from '@/components/ui/ClientViewCounter'

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

// Função utilitária para calcular o tempo de leitura
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export default async function ArtigoPage({ params }) {
  const { slug } = await params
  const supabase = await createClient()

  // 1. Obter a notícia atual
  const { data: noticia, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !noticia) {
    notFound()
  }

  // 2. Obter artigos relacionados (mesma categoria, excluindo o atual)
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
              <span className="text-sm font-bold uppercase tracking-widest">Voltar à Sala de Imprensa</span>
            </Link>

            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-6">
                <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded shadow-lg shadow-emerald-900/10">
                  {noticia.categoria}
                </span>
                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-emerald-500" />
                    {new Date(noticia.created_at).toLocaleDateString('pt-PT', { 
                      day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-emerald-500" />
                    {calculateReadingTime(noticia.conteudo)} min de leitura
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1] tracking-tighter">
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
              <div className="aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 relative group">
                <img 
                  src={noticia.imagem_url} 
                  alt={noticia.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                />
              </div>
            </Container>
          </div>
        )}

        {/* Conteúdo do Artigo */}
        <Container size="sm">
          <div className="flex flex-col gap-16">
            {/* Corpo do Texto */}
            <div 
              className="prose prose-xl prose-emerald max-w-none 
                prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
                prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:text-lg md:prose-p:text-xl
                prose-a:text-emerald-600 prose-a:no-underline prose-a:font-bold border-b border-emerald-100 hover:border-emerald-600 transition-all
                prose-strong:text-slate-900 prose-strong:font-black
                prose-img:rounded-3xl prose-img:shadow-2xl
                prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-50 prose-blockquote:py-8 prose-blockquote:px-12 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-slate-700"
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
            />

            {/* Footer do Artigo & Partilha */}
            <div className="mt-12 pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                  <User size={24} />
                </div>
                <div>
                  <span className="block text-lg font-black text-slate-900 leading-none mb-1">{noticia.autor}</span>
                  <span className="block text-[10px] text-emerald-600 uppercase tracking-[0.2em] font-black">Comunicação Oficial 20recolher</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Partilhar Artigo:</span>
                <ClientShareButton 
                   title={noticia.titulo} 
                   text={noticia.subtitulo} 
                />
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Secção de Artigos Relacionados */}
      {relacionados && relacionados.length > 0 && (
        <section className="mt-32 pt-24 border-t border-slate-100 bg-slate-50/50">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4 block">Continuar a ler</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Artigos Relacionados</h2>
              </div>
              <Link href="/noticias" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-bold text-sm transition-all group">
                Ver tudo
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relacionados.map((rel) => (
                <Link 
                  key={rel.id} 
                  href={`/noticias/${rel.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-200 transition-all shadow-sm hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={rel.imagem_url} 
                      alt={rel.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-3 block">{rel.categoria}</span>
                    <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {rel.titulo}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
                      <Calendar size={12} />
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
