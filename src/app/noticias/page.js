import { createClient } from '@/lib/supabase/server'
import Container from '@/components/ui/Container'
import NoticiasGrid from '@/components/sections/NoticiasGrid'
import NoticiasHero from '@/components/sections/NoticiasHero'
import NewsletterCTA from '@/components/sections/NewsletterCTA'

// Esta página é renderizada no servidor para melhor SEO
export default async function NoticiasPage() {
  const supabase = await createClient()

  // Obter apenas notícias publicadas
  const { data: noticias, error } = await supabase
    .from('noticias')
    .select('id, titulo, subtitulo, slug, imagem_url, created_at, categoria, autor')
    .eq('publicado', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao carregar notícias:', error)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Corporativo de Topo */}
      <NoticiasHero 
        badge="20recolher"
        title="Notícias & Destaques"
        subtitle="Acompanhe a atividade oficial da nossa empresa: novos investimentos, marcos operacionais e a nossa evolução contínua no setor da economia circular."
        count={noticias?.length || 0}
      />

      {/* Grelha de Notícias da Empresa */}
      <Container>
        <NoticiasGrid noticias={noticias || []} />
      </Container>

      {/* Newsletter de Updates da Empresa */}
      <NewsletterCTA />
    </main>
  )
}
