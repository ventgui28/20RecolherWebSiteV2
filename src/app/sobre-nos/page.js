"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  ShieldCheck, 
  FileText, 
  Lightbulb, 
  Target, 
  Compass, 
  CheckCircle2,
  Users,
  History,
  Recycle
} from 'lucide-react';
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRAND } from "@/constants/brand";

const IconMap = {
  ShieldCheck: ShieldCheck,
  FileText: FileText,
  Lightbulb: Lightbulb
};

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="bg-green-mist bg-grain min-h-screen">
      {/* 1. Hero Section - Institutional Depth */}
      <section className="relative py-24 md:py-40 overflow-hidden bg-dark-green">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2000&auto=format&fit=crop" 
            alt="Centro de Triagem e Tecnologia" 
            fill
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-green/60 via-dark-green to-dark-green" />
        </div>

        <Container className="relative z-10">
          <motion.div {...fadeInUp} className="max-w-4xl">
            <span className="text-primary-green font-black uppercase tracking-[0.3em] text-xs mb-6 block">Institucional</span>
            <h1 className="text-5xl md:text-8xl font-heading text-white leading-tight mb-8">
              Compromisso com o <br />
              <span className="text-primary-green italic">futuro tecnológico.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl font-medium">
              A {BRAND.name} é um operador licenciado dedicado à excelência na gestão de resíduos e na promoção ativa da economia circular em Portugal.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 2. Purpose & Experience ("The Why") */}
      <section className="py-24 md:py-32 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-heading text-dark-green leading-tight">
                Uma operação pautada pela <span className="text-primary-green">autoridade técnica</span> e responsabilidade ambiental.
              </h2>
              <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                <p>
                  No cenário empresarial atual, a gestão de ativos tecnológicos obsoletos exige mais do que uma simples recolha. Requer conformidade legal rigorosa, segurança na destruição de dados e uma visão estratégica de valorização de componentes.
                </p>
                <p>
                  Com anos de experiência no mercado nacional, a {BRAND.name} posiciona-se como o parceiro estratégico que simplifica este processo complexo, garantindo que cada equipamento volta a integrar o ciclo produtivo da forma mais eficiente possível.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8">
                <div className="space-y-2">
                  <p className="text-3xl font-heading text-primary-green font-black">{BRAND.stats.experience}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">De Experiência</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-heading text-primary-green font-black">{BRAND.stats.partners}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Empresas Parceiras</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-heading text-primary-green font-black">{BRAND.stats.recycled}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resíduos Valorizados</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
                  alt="Trabalho Técnico de Reciclagem" 
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-green-50 max-w-[220px]">
                <ShieldCheck className="w-10 h-10 text-primary-green mb-4" />
                <p className="text-sm font-bold text-dark-green leading-snug">Operador Certificado e Licenciado pela APA.</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Mission & Vision - Solid Blocks */}
      <section className="py-24 md:py-32 bg-white/40 backdrop-blur-md border-y border-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div {...fadeInUp} className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-sm border border-green-50 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-green/10 rounded-2xl flex items-center justify-center text-primary-green mb-8 group-hover:bg-primary-green group-hover:text-white transition-colors duration-500">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-heading text-dark-green mb-6">Nossa Missão</h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                  &ldquo;{BRAND.mission}&rdquo;
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Target className="w-64 h-64 text-dark-green" />
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-sm border border-green-50 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-green/10 rounded-2xl flex items-center justify-center text-primary-green mb-8 group-hover:bg-primary-green group-hover:text-white transition-colors duration-500">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-heading text-dark-green mb-6">Nossa Visão</h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                  &ldquo;{BRAND.vision}&rdquo;
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Compass className="w-64 h-64 text-dark-green" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 4. Core Values - Professional Grid */}
      <section className="py-24 md:py-40">
        <Container>
          <SectionHeading 
            centered
            title="Valores Institucionais"
            subtitle="Os pilares éticos e operacionais que definem a nossa atuação no mercado nacional."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {BRAND.values.map((v, i) => {
              const IconComponent = IconMap[v.icon];
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 rounded-[3.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary-green/5 transition-all duration-500 border border-white group"
                >
                  <div className="w-16 h-16 mb-8 rounded-2xl bg-green-50 flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all duration-500">
                    {IconComponent && <IconComponent className="w-8 h-8" />}
                  </div>
                  <h3 className="text-2xl font-heading text-dark-green mb-4">{v.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. Final Quote Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <Container className="relative z-10">
          <motion.div 
            {...fadeInUp}
            className="bg-dark-green p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
               <Image 
                 src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop" 
                 alt="Floresta Sustentável" 
                 fill
                 className="object-cover"
               />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <Recycle className="w-16 h-16 text-primary-green mx-auto mb-10 animate-spin-slow" />
              <blockquote className="text-2xl md:text-4xl font-heading text-white leading-tight italic">
                &ldquo;{BRAND.quote}&rdquo;
              </blockquote>
              <div className="mt-12 flex justify-center items-center gap-4 text-white/40 font-black text-xs uppercase tracking-[0.2em]">
                <div className="w-12 h-px bg-white/20" />
                <span>Direção {BRAND.name}</span>
                <div className="w-12 h-px bg-white/20" />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
