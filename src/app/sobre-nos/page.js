"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Users, 
  Globe, 
  Award, 
  MapPin, 
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRAND } from "@/constants/brand";

const IconMap = {
  Users: Users,
  ShieldCheck: ShieldCheck,
  Globe: Globe
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
            alt="Reciclagem Tecnológica Profissional" 
            fill
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-green/60 via-dark-green to-dark-green" />
        </div>

        <Container className="relative z-10">
          <motion.div {...fadeInUp} className="max-w-4xl">
            <span className="text-primary-green font-black uppercase tracking-[0.3em] text-xs mb-6 block">Nascemos em {BRAND.history.founded}</span>
            <h1 className="text-5xl md:text-8xl font-heading text-white leading-[0.95] mb-8">
              Compromisso com <br />
              <span className="text-primary-green italic">o futuro tecnológico.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl font-medium">
              Equipa jovem e dinâmica dedicada à valorização de resíduos tecnológicos em Portugal, com sede na Zona Industrial de Cantanhede.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 2. Factos & Autoridade (Novo) */}
      <section className="py-24 md:py-32 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary-green/10 text-primary-green rounded-full border border-primary-green/20">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.1em]">{BRAND.history.award}</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-heading text-dark-green leading-tight">
                De Tentúgal para a <span className="text-primary-green">vanguarda nacional</span> em Cantanhede.
              </h2>
              
              <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                <p>
                  Depois de 6 anos a funcionar em Tentúgal, mudámos em Novembro de 2022 para a Zona Industrial de Cantanhede. Este novo espaço, maior e com melhores condições, permite-nos dar resposta à crescente procura pelos nossos serviços de gestão de resíduos.
                </p>
                <p>
                  Trabalhamos sobretudo no mercado empresarial e no setor público, colaborando ativamente com Conservatórias, Tribunais, Escolas e outras entidades do Estado que confiam na nossa competência.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-green-50 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-primary-green shrink-0" />
                  <div>
                    <p className="font-bold text-dark-green mb-1">REEE & Consumíveis</p>
                    <p className="text-xs text-gray-400">Recolha especializada de equipamentos informáticos e de impressão.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-green-50 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-primary-green shrink-0" />
                  <div>
                    <p className="font-bold text-dark-green mb-1">Licença CCDRC</p>
                    <p className="text-xs text-gray-400">Operação totalmente certificada para o tratamento de resíduos perigosos.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
                  alt="Operação 20recolher Cantanhede" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-dark-green text-white p-10 rounded-[3rem] shadow-2xl max-w-[240px]">
                <p className="text-xs font-black text-primary-green uppercase tracking-widest mb-4">O Nosso Foco</p>
                <p className="text-lg font-heading leading-tight italic">
                  &ldquo;O melhor destino é o tratamento correto dos resíduos.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Missão & Visão Institucional */}
      <section className="py-24 md:py-32 bg-white/40 backdrop-blur-md border-y border-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 text-center md:text-left">
            <motion.div {...fadeInUp} className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-sm border border-green-50">
              <h3 className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em] mb-6">Nosso Objetivo</h3>
              <h4 className="text-3xl font-heading text-dark-green mb-8">Missão</h4>
              <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                &ldquo;{BRAND.mission}&rdquo;
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-sm border border-green-50">
              <h3 className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em] mb-6">Nossa Ambição</h3>
              <h4 className="text-3xl font-heading text-dark-green mb-8">Visão</h4>
              <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                &ldquo;{BRAND.vision}&rdquo;
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 4. Valores - Profissionais */}
      <section className="py-24 md:py-40">
        <Container>
          <SectionHeading 
            centered
            title="Pilares Estratégicos"
            subtitle="Valores que definem a nossa equipa e o rigor da nossa operação nacional."
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
                  <div className="w-16 h-16 mb-8 rounded-2xl bg-green-50 flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all duration-500 shadow-inner">
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

      {/* 5. Filosofia Social - Final Quote */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <Container className="relative z-10">
          <motion.div 
            {...fadeInUp}
            className="bg-dark-green p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
               <Image 
                 src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop" 
                 alt="Saúde Ambiental e Humana" 
                 fill
                 className="object-cover"
               />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <Building2 className="w-12 h-12 text-primary-green mx-auto mb-10" />
              <h3 className="text-primary-green font-black text-xs uppercase tracking-[0.3em] mb-10">A 20recolher contribui...</h3>
              <blockquote className="text-2xl md:text-4xl font-heading text-white leading-tight italic">
                &ldquo;{BRAND.quote} <br className="hidden md:block" /> É fundamental cuidar da saúde ambiental para preservar a saúde humana.&rdquo;
              </blockquote>
              <div className="mt-12 flex justify-center items-center gap-4 text-white/40 font-black text-[10px] uppercase tracking-[0.2em]">
                <div className="w-12 h-px bg-white/20" />
                <span>Uma JANELA DE OPORTUNIDADE sustentável</span>
                <div className="w-12 h-px bg-white/20" />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
