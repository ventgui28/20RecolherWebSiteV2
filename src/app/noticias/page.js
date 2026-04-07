import { createClient } from '@/lib/supabase/server'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import NoticiasGrid from '@/components/sections/NoticiasGrid'

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
        <div className="max-w-4xl mb-16 lg:mb-24">
          <SectionHeading
            badge="Atualidade"
            title="Notícias & Sustentabilidade"
            subtitle="Fique a par das últimas novidades sobre reciclagem tecnológica, legislação ambiental e o impacto da 20recolher."
          />
        </div>

        <NoticiasGrid noticias={noticias || []} />
      </Container>
    </main>
  )
}
