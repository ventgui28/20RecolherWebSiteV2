import { createClient } from '@/lib/supabase/server'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { Calendar, Tag, ArrowRight, Inbox } from 'lucide-react'
import Link from 'next/link'

// Esta página é renderizada no servidor para melhor SEO
export default async function NoticiasPage() {
  const supabase = await createClient()

  // Obter apenas notícias publicadas
  const { data: noticias, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('publicado', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao carregar notícias:', error)
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <Container>
        <div className="max-w-3xl mb-16">
          <SectionHeading
            badge="Atualidade"
            title="Notícias & Sustentabilidade"
            description="Fique a par das últimas novidades sobre reciclagem tecnológica, legislação ambiental e o impacto da 20recolher."
          />
        </div>

        {noticias && noticias.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia) => (
              <Link 
                key={noticia.id} 
                href={`/noticias/${noticia.slug}`}
                className="group flex flex-col bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500"
              >
                {/* Imagem de Destaque */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {noticia.imagem_url ? (
                    <img 
                      src={noticia.imagem_url} 
                      alt={noticia.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-900/5 flex items-center justify-center text-emerald-200">
                      <Inbox size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {noticia.categoria}
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-4 font-medium">
                    <Calendar size={14} className="text-emerald-500" />
                    {new Date(noticia.created_at).toLocaleDateString('pt-PT', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {noticia.titulo}
                  </h2>
                  
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {noticia.subtitulo}
                  </p>

                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm group-hover:gap-3 transition-all">
                    Ler artigo completo
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-[3rem] p-20 text-center border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-sm">
              <Inbox size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Sem notícias de momento</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Estamos a preparar conteúdos interessantes sobre reciclagem. Volte brevemente!
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}
