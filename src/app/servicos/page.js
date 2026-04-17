"use client";

import { motion } from 'framer-motion';
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { SERVICES, RECYCLING_MASTER_LIST } from "@/constants/services";
import FAQSection from "@/components/sections/FAQSection";
import { 
  Monitor, 
  Cpu, 
  Printer, 
  Box, 
  FileText, 
  ClipboardCheck, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Recycle, 
  Factory,
  Check
} from 'lucide-react';

// Mapeamento de ícones Lucide
const iconMap = {
  Recycle,
  Cpu,
  Printer,
  Box,
  FileText,
  ClipboardCheck,
  ShieldAlert,
  Monitor
};

const WordReveal = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + (i * 0.1),
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block mr-[0.2em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default function ServicesPage() {
  return (
    <div className="bg-white bg-grain relative min-h-screen">
      
      {/* MONUMENTAL HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-dark-green">
        <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-30 z-0" />
        
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-20 relative z-10">
          <div className="w-full lg:w-[55%]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl mb-12">
                <ShieldCheck className="w-4 h-4 text-primary-green" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Operador Licenciado CCDRC</span>
              </div>
              
              <h1 className="text-7xl md:text-[9rem] font-heading text-white mb-12 leading-[0.85] tracking-tighter">
                <WordReveal text="Serviços de" delay={0.2} /> <br />
                <WordReveal text="Valorização" delay={0.4} className="text-primary-green italic" /> <br />
                <WordReveal text="Tecnológica." delay={0.6} />
              </h1>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }} className="max-w-xl">
                <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed font-medium mb-16">
                  Soluções integradas de gestão de resíduos focadas na <span className="text-white font-black">segurança total de dados</span> e na economia circular em Portugal.
                </p>
                <Link href="/contactos">
                  <Button className="h-24 px-16 bg-primary-green text-white hover:bg-lime-green rounded-full text-xl font-black shadow-[0_20px_50px_rgba(142,179,31,0.3)] transform hover:scale-105 transition-all">
                    Solicitar Orçamento
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="w-full lg:w-[45%] relative h-[600px] md:h-[900px] rounded-[5rem] lg:rounded-bl-[20rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
          >
            <div className="absolute inset-0 bg-dark-green/10 z-10 mix-blend-overlay" />
            <Image src="/images/triagem.jpg" alt="Triagem REEE" fill className="object-cover scale-105" priority />
          </motion.div>
        </div>
      </section>

      {/* SERVICES LIST - Z-PATTERN */}
      <section className="py-24 md:py-48">
        <Container>
          <div className="space-y-48 md:space-y-72">
            {SERVICES.map((cat, i) => {
              const IconComponent = iconMap[cat.icon] || Monitor;
              const isEven = i % 2 === 0;
              
              return (
                <div key={i} className={`flex flex-col lg:flex-row gap-20 lg:gap-32 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image Side */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full lg:w-[45%] relative h-[450px] md:h-[650px] rounded-[4rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(14,103,44,0.15)] group"
                  >
                    <Image unoptimized={true} src={cat.image} alt={cat.title} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-green/60 via-dark-green/10 to-transparent opacity-80" />
                    
                    <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white/50 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
                       <div className="w-16 h-16 shrink-0 bg-primary-green rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-primary-green/30">
                          <IconComponent className="w-8 h-8 text-white" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-dark-green/50 uppercase tracking-[0.3em] mb-1.5">{cat.badge}</p>
                          <p className="text-lg font-black text-dark-green uppercase tracking-wide leading-tight">{cat.advantage}</p>
                       </div>
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-[55%]"
                  >
                    <h2 className="text-5xl md:text-7xl font-heading text-dark-green mb-8 leading-[1] tracking-tighter">
                      {cat.title}
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-medium max-w-2xl">
                      {cat.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                       {cat.items.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-primary-green group-hover:border-primary-green transition-all duration-300">
                               <Check className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-lg font-bold text-slate-600 group-hover:text-dark-green transition-colors leading-tight">{item}</span>
                         </div>
                       ))}
                    </div>

                    <Link href="/contactos">
                       <Button className="h-16 px-10 bg-white text-dark-green hover:text-white hover:bg-dark-green border border-slate-200 hover:border-dark-green rounded-2xl flex items-center gap-4 transition-all duration-300 group/btn shadow-lg shadow-slate-200/50 hover:shadow-dark-green/20">
                         <span className="font-black text-xs uppercase tracking-widest">Solicitar Informação</span>
                         <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                       </Button>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* RECYCLING MASTER LIST - THE "RECOLHEMOS E RECICLAMOS" SECTION */}
      <section className="py-24 md:py-48 bg-slate-50/50 border-t border-slate-100">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary-green/10 rounded-full border border-primary-green/20 mb-8 shadow-sm">
              <Recycle className="w-4 h-4 text-primary-green" />
              <span className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em]">Catálogo Completo</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-heading text-dark-green mb-10 leading-[0.9] tracking-tighter">
              Recolhemos e <span className="text-primary-green italic">Reciclamos.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-medium">
              Gestão certificada para uma vasta gama de equipamentos e materiais, garantindo o melhor destino ambiental.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
            {RECYCLING_MASTER_LIST.map((cat, i) => {
              let gridClass = "";
              let isLarge = false;
              if (i === 0) {
                gridClass = "md:col-span-2 lg:col-span-8 lg:row-span-2";
                isLarge = true;
              } else {
                gridClass = "md:col-span-1 lg:col-span-4";
              }

              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${gridClass} bg-white p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(14,103,44,0.1)] transition-all duration-500 group flex flex-col justify-center`}
                >
                  <h3 className="text-3xl lg:text-4xl font-black text-dark-green mb-10 tracking-tighter flex items-center gap-4">
                    <span className="w-8 h-[3px] bg-primary-green rounded-full"></span>
                    {cat.category}
                  </h3>
                  <ul className={`grid grid-cols-1 ${isLarge ? 'md:grid-cols-2 gap-x-12' : ''} gap-y-6`}>
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lg font-bold text-slate-500 group/item hover:text-dark-green transition-colors">
                        <div className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 border border-slate-100 group-hover/item:bg-primary-green group-hover/item:border-primary-green transition-colors shrink-0">
                          <Check className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-white transition-colors" strokeWidth={4} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FAQ SECTION */}
      <FAQSection className="bg-white/40" />

      {/* CTA SECTION */}
      <section className="py-24 md:py-48 bg-slate-50/50">
        <Container>
           <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-forest-green rounded-[4rem] px-8 py-20 md:px-20 md:py-32 text-center text-white shadow-[0_40px_100px_-20px_rgba(14,103,44,0.3)] relative overflow-hidden flex flex-col items-center justify-center border border-dark-green/50"
           >
              <div className="absolute inset-0 opacity-20">
                 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-green rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
              </div>

              <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
                 <h2 className="text-5xl md:text-7xl font-heading font-black text-white leading-[1.1] mb-8 tracking-tighter">
                  Responsabilidade <br /><span className="text-primary-green italic">Garantida.</span>        
                 </h2>
                 <p className="text-xl md:text-2xl text-white/80 mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
                  Emitimos o Certificado de Destruição e Reciclagem. Segurança máxima e conformidade total para a sua empresa.
                 </p>
                 <Link href="/contactos" className="inline-block">
                    <Button className="h-20 px-16 bg-white text-dark-green hover:bg-primary-green hover:text-white rounded-full text-xl font-black shadow-2xl shadow-black/20 transform hover:scale-105 hover:-translate-y-1 transition-all uppercase tracking-widest border border-transparent hover:border-white/20">
                       Solicitar Orçamento
                    </Button>
                 </Link>
              </div>
           </motion.div>
        </Container>
      </section>
    </div>
  );
}
