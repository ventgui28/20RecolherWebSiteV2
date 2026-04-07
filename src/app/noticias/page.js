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
    .select('*')
    .eq('publicado', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao carregar notícias:', error)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Imersivo */}
      <NoticiasHero 
        badge="Atualidade"
        title="Notícias & Sustentabilidade"
        subtitle="O portal da 20recolher sobre economia circular, inovação ambiental e o impacto da reciclagem tecnológica na nossa sociedade."
      />

      {/* Grelha Dinâmica com Filtros */}
      <Container>
        <NoticiasGrid noticias={noticias || []} />
      </Container>

      {/* Newsletter Premium */}
      <NewsletterCTA />
    </main>
  )
}
