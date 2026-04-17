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
    <div className="bg-green-mist bg-grain relative min-h-screen">
      
      {/* MONUMENTAL HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-12 pb-20 md:pt-16 md:pb-32 overflow-hidden border-b border-white/40">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-[55%] relative z-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm mb-12">
                <ShieldCheck className="w-4 h-4 text-primary-green" />
                <span className="text-[10px] font-black text-dark-green uppercase tracking-[0.3em]">Operador Licenciado CCDRC</span>
              </div>
              
              <h1 className="text-7xl md:text-[9rem] font-heading text-dark-green mb-12 leading-[0.85] tracking-tighter">
                <WordReveal text="Serviços de" delay={0.2} /> <br />
                <WordReveal text="Valorização" delay={0.4} className="text-primary-green italic underline decoration-primary-green/20 underline-offset-[1.5rem]" /> <br />
                <WordReveal text="Tecnológica." delay={0.6} />
              </h1>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }} className="max-w-xl">
                <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-medium mb-16">
                  Soluções integradas de gestão de resíduos focadas na <span className="text-dark-green font-black">segurança total de dados</span> e na economia circular em Portugal.
                </p>
                <Link href="/contactos">
                  <Button className="h-24 px-16 bg-dark-green text-white hover:bg-primary-green rounded-full text-xl font-black shadow-2xl transform hover:scale-105 transition-all">
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
            className="w-full lg:w-[45%] relative h-[600px] md:h-[900px] rounded-[5rem] lg:rounded-bl-[20rem] overflow-hidden shadow-[0_100px_100px_-50px_rgba(14,103,44,0.15)]"
          >
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
                    className="w-full lg:w-1/2 relative h-[450px] md:h-[650px] rounded-[4rem] overflow-hidden shadow-2xl shadow-dark-green/10 group"
                  >
                    <Image unoptimized={true} src={cat.image} alt={cat.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-green/30 to-transparent" />
                    <div className="absolute bottom-12 left-12 p-8 bg-white/95 backdrop-blur-md rounded-[2.5rem] border border-white flex items-center gap-6 shadow-2xl">
                       <div className="w-14 h-14 bg-primary-green rounded-2xl flex items-center justify-center shadow-lg shadow-primary-green/20">
                          <IconComponent className="w-7 h-7 text-white" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{cat.badge}</p>
                          <p className="text-base font-black text-dark-green uppercase tracking-wider">{cat.advantage}</p>
                       </div>
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2"
                  >
                    <h2 className="text-5xl md:text-7xl font-heading text-dark-green mb-10 leading-[1] tracking-tighter">
                      {cat.title}
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-medium">
                      {cat.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                       {cat.items.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:bg-primary-green group-hover:border-primary-green transition-colors">
                               <Check className="w-4 h-4 text-primary-green group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-lg font-bold text-dark-green/70 group-hover:text-dark-green transition-colors">{item}</span>
                         </div>
                       ))}
                    </div>

                    <Link href="/contactos">
                       <Button className="h-20 px-12 bg-dark-green text-white hover:bg-primary-green rounded-2xl flex items-center gap-4 transition-all group/btn shadow-xl shadow-dark-green/10">
                         <span className="font-black text-xs uppercase tracking-widest">Solicitar Informação</span>
                         <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
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
      <section className="py-24 md:py-48 bg-white/40 border-y border-white/60">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-24"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary-green/10 rounded-full border border-primary-green/20 mb-8">
              <Recycle className="w-4 h-4 text-primary-green" />
              <span className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em]">Catálogo Completo</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-heading text-dark-green mb-10 leading-[0.9] tracking-tighter">
              Recolhemos e <span className="text-primary-green italic">Reciclamos.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-medium">
              Gestão certificada para uma vasta gama de equipamentos e materiais, garantindo o melhor destino ambiental.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {RECYCLING_MASTER_LIST.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-md p-12 rounded-[3.5rem] border border-white shadow-xl shadow-dark-green/5"
              >
                <h3 className="text-2xl font-black text-dark-green mb-10 uppercase tracking-tighter flex items-center gap-4">
                  <span className="w-8 h-[2px] bg-primary-green"></span>
                  {cat.category}
                </h3>
                <ul className="space-y-6">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-lg font-bold text-gray-600 group hover:text-dark-green transition-colors">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-green/40 group-hover:bg-primary-green transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ SECTION */}
      <FAQSection className="bg-white/40" />

      {/* CTA SECTION */}
      <section className="py-24 md:py-48">
        <Container>
           <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-green rounded-[4rem] px-8 py-20 md:px-20 md:py-32 text-center text-white shadow-3xl shadow-dark-green/20 relative overflow-hidden flex flex-col items-center justify-center"
           >
              <div className="absolute inset-0 opacity-10">
                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
              </div>

              <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
                 <h2 className="text-4xl md:text-7xl font-heading font-black text-white leading-tight mb-8">
                  Responsabilidade <br /><span className="text-primary-green italic">Garantida.</span>        
                 </h2>
                 <p className="text-xl md:text-2xl text-green-50/70 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                  Emitimos o Certificado de Destruição e Reciclagem. Segurança máxima e conformidade total para a sua empresa.
                 </p>
                 <Link href="/contactos" className="inline-block">
                    <Button className="h-20 px-16 bg-white text-primary-green hover:bg-primary-green hover:text-white rounded-2xl text-xl font-black shadow-2xl shadow-black/20 transform hover:scale-105 transition-all uppercase tracking-widest">
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
