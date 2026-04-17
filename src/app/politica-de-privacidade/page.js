'use client'

import Container from '@/components/ui/Container'
import { ShieldCheck, Eye, Database, Cookie, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PoliticaPrivacidadePage() {
  const sections = [
    {
      id: '01',
      title: 'Apresentação',
      icon: Eye,
      content: (
        <>
          <p className="mb-4">
            A presente política de proteção da privacidade, tratamento dos dados pessoais, e utilização de cookies, constitui para nós um compromisso fundamental com todos aqueles que se relacionam com a nossa empresa.
          </p>
          <p className="mb-4">
            Assim aconselhamos a leitura deste documento que representa a nossa política de privacidade, pois queremos que tome conhecimento e compreenda a forma como tratamos as informações que venha a disponibilizar enquanto navega no nosso website.
          </p>
          <p className="text-primary-green font-bold">
            O site www.20recolher.pt é propriedade da 20 Recolher-Gestão de Resíduos, Lda. com sede em Cantanhede, pessoa coletiva n° 514 970 723.
          </p>
        </>
      )
    },
    {
      id: '02',
      title: 'Respeitamos a privacidade',
      icon: ShieldCheck,
      content: (
        <>
          <p className="mb-6">
            De todos os nossos clientes e visitantes do nosso espaço online. Temos o compromisso de salvaguardar qualquer informação pessoal partilhada pelos nossos clientes e utilizadores.
          </p>
          <p className="mb-6 opacity-80">
            Contudo, aquando da necessidade da recolha de informação pessoal para disponibilizarmos os nossos serviços ou quando cada utilizador decidir fornecer alguns dos seus dados pessoais, o uso dos ditos será realizado de acordo com a legislação aplicável sobre proteção de dados pessoais – Lei 67/98 de 26 de Outubro, Lei de Proteção de Dados – para que deste modo seja assegurada a segurança e confidencialidade dos dados pessoais fornecidos.
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
            <h4 className="text-dark-green font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
              <Database className="text-primary-green" size={18} />
              Os seus Direitos Legais:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Direito de acesso',
                'Direito a ser esquecido',
                'Direito à portabilidade dos dados',
                'Direito de oposição'
              ].map((right, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-500 font-bold">
                  <div className="w-1.5 h-1.5 bg-primary-green rounded-full shadow-[0_0_8px_rgba(142,179,31,0.5)]" />
                  {right}
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    },
    {
      id: '03',
      title: 'Política de Cookies',
      icon: Cookie,
      content: (
        <>
          <p className="mb-4">
            Este website utiliza cookies para melhorar a sua experiência online. Alguns cookies são essenciais para garantir as funcionalidades disponibilizadas, enquanto outros são destinadas a melhorar o desempenho da plataforma.
          </p>
          <p className="opacity-80">
            São utilizados Cookies Analíticos para efeitos de criação e análise de estatísticas, Cookies Permanentes – que ficam armazenados ao nível do browser nos seus equipamentos de acesso e que são utilizados sempre que faz uma nova visita ao nosso website.
          </p>
        </>
      )
    }
  ]

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Hero Section - Dark Premium */}
      <section className="bg-dark-green bg-grain pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary-green/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <Container size="md" className="relative z-10">
          <Link 
            href="/"
            className="group flex items-center gap-3 text-white/40 hover:text-primary-green transition-colors mb-12 inline-flex"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Voltar ao Início</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-primary-green rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-green">Conformidade & Ética</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8">
            Privacidade <br />
            <span className="text-primary-green italic">& Transparência.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
            Na 20Recolher, o tratamento dos seus dados segue os mesmos padrões de excelência que aplicamos à valorização de resíduos tecnológicos.
          </p>
        </Container>
      </section>

      {/* Content Section - Light & Clean */}
      <section className="py-24 bg-slate-50/50 relative">
        <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />
        
        <Container size="md">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(142,179,31,0.1)] transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-slate-50 text-dark-green rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-primary-green group-hover:text-white group-hover:border-primary-green transition-all duration-500 shadow-sm">
                      <section.icon size={32} />
                    </div>
                    <span className="block mt-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] text-center md:text-left">
                      Artigo {section.id}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-4xl font-black text-dark-green mb-8 tracking-tighter">
                      {section.title}
                    </h2>
                    <div className="text-slate-500 font-medium text-lg leading-relaxed space-y-4">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-20 text-center">
             <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full border border-slate-100 shadow-sm">
                <ShieldCheck size={18} className="text-primary-green" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Documento Atualizado em {new Date().toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}
                </span>
             </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
