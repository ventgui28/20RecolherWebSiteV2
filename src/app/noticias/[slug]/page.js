import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import { Calendar, Tag, User, ArrowLeft, Share2 } from 'lucide-react'
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
      <article>
        {/* Hero do Artigo */}
        <div className="mb-12">
          <Container size="sm">
            <Link 
              href="/noticias"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors mb-10 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Voltar às notícias</span>
            </Link>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {noticia.categoria}
                </span>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <Calendar size={14} className="text-emerald-500" />
                  {new Date(noticia.created_at).toLocaleDateString('pt-PT', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                {noticia.titulo}
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6 py-2">
                {noticia.subtitulo}
              </p>
            </div>
          </Container>
        </div>

        {/* Imagem de Capa */}
        {noticia.imagem_url && (
          <div className="mb-16">
            <Container>
              <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border border-slate-100">
                <img 
                  src={noticia.imagem_url} 
                  alt={noticia.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
            </Container>
          </div>
        )}

        {/* Conteúdo do Artigo */}
        <Container size="sm">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Corpo do Texto */}
            <div className="flex-grow">
              <div 
                className="prose prose-lg prose-emerald max-w-none 
                  prose-headings:text-slate-900 prose-headings:font-bold
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900
                  prose-img:rounded-3xl prose-img:shadow-lg
                  prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl"
                dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
              />

              {/* Footer do Artigo */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900">{noticia.autor}</span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">Equipa 20recolher</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all shadow-sm">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Sugestões de Leitura ou CTA podem vir aqui */}
    </main>
  )
}
