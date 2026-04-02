"use client";

import { motion } from 'framer-motion';
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/constants/services";
import { Monitor, Cpu, BatteryCharging, ArrowRight, CheckCircle2, ShieldCheck, Recycle, Factory } from 'lucide-react';

// Mapeamento de ícones Lucide
const iconMap = {
  Monitor: Monitor,
  Cpu: Cpu,
  BatteryCharging: BatteryCharging
};

// Componente para Animação de Texto por Palavra (Premium Reveal)
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
      
      {/* MONUMENTAL HERO SECTION - SPLIT SCREEN EDITORIAL */}
      <section className="relative min-h-[90vh] flex items-center pt-0 pb-20 md:pt-0 md:pb-32 overflow-hidden border-b border-white/40">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Side: Monumental Typography */}
          <div className="w-full lg:w-[55%] relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm mb-12">
                <ShieldCheck className="w-4 h-4 text-primary-green" />
                <span className="text-[10px] font-black text-dark-green uppercase tracking-[0.3em]">Operador Licenciado CCDRC</span>
              </div>
              
              <h1 className="text-7xl md:text-[9rem] font-heading text-dark-green mb-12 leading-[0.85] tracking-tighter">
                <WordReveal text="Serviços de" delay={0.2} /> <br />
                <WordReveal 
                  text="Valorização" 
                  delay={0.4} 
                  className="text-primary-green italic underline decoration-primary-green/20 underline-offset-[1.5rem]" 
                /> <br />
                <WordReveal text="Tecnológica." delay={0.6} />
              </h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="max-w-xl"
              >
                <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-medium mb-16">
                  Soluções integradas de gestão de resíduos focadas na <span className="text-dark-green font-black">segurança total de dados</span> e na economia circular em Portugal.
                </p>

                <div className="flex flex-wrap gap-6">
                  <Link href="/contactos">
                    <Button className="h-24 px-16 bg-dark-green text-white hover:bg-primary-green rounded-full text-xl font-black shadow-2xl transform hover:scale-105 transition-all">
                       Solicitar Recolha
                    </Button>
                  </Link>
                  
                  <div className="flex items-center gap-4 px-8 py-4 bg-white/40 border border-white/60 rounded-full backdrop-blur-sm">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-black text-dark-green">
                          {i === 3 ? "20+" : ""}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-dark-green/60">Empresas & Estado</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Operational Imagery (Triagem) */}
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="w-full lg:w-[45%] relative h-[600px] md:h-[900px] rounded-[5rem] lg:rounded-bl-[20rem] overflow-hidden shadow-[0_100px_100px_-50px_rgba(14,103,44,0.15)] bg-dark-green/5"
          >
            <Image 
              src="/images/process-triagem.jpg"
              alt="Processo de Triagem e Valorização REEE"
              fill
              className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-green/40 via-transparent to-transparent" />
            
            {/* Overlay Tag */}
            <div className="absolute top-12 right-12 p-8 bg-white/95 backdrop-blur-xl rounded-[3rem] border border-white/50 shadow-2xl max-w-[280px]">
               <div className="w-16 h-16 bg-primary-green rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-green/20">
                  <Factory className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-black text-dark-green mb-2 uppercase tracking-tighter">Capacidade Técnica</h3>
               <p className="text-sm font-medium text-gray-500 leading-relaxed">
                  Operações licenciadas para o tratamento de resíduos perigosos e não perigosos.
               </p>
            </div>

            {/* Floating Graphic Element */}
            <div className="absolute bottom-20 -left-20 w-64 h-64 border-2 border-white/20 rounded-full animate-pulse pointer-events-none" />
          </motion.div>
        </div>

        {/* Background Decorative Blobs (Low CPU impact) */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-green/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Services List - Horizontal Z-Pattern Layout */}
      <section className="py-20 md:py-40">
        <Container>
          <div className="space-y-40 md:space-y-64">
            {SERVICES.map((cat, i) => {
              const IconComponent = iconMap[cat.icon] || Monitor;
              const isEven = i % 2 === 0;
              
              return (
                <div 
                  key={i} 
                  className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Left Side: Professional Image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full lg:w-1/2 relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-dark-green/10"
                  >
                    <Image 
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-green/20 to-transparent" />
                    
                    <div className="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white flex items-center gap-4 shadow-xl">
                       <div className="w-12 h-12 bg-primary-green rounded-2xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Destaque</p>
                          <p className="text-sm font-black text-dark-green uppercase tracking-wider">{cat.advantage}</p>
                       </div>
                    </div>
                  </motion.div>

                  {/* Right Side: Detailed Content & List */}
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="inline-flex items-center gap-2 mb-8">
                       <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                       <span className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em]">{cat.badge}</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-heading text-dark-green mb-8 leading-[1.1] tracking-tight">
                      {cat.title}
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed font-medium">
                      {cat.desc}
                    </p>

                    <div className="space-y-10 mb-16">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-4 after:content-[''] after:flex-grow after:h-[1px] after:bg-gray-100">
                         O que recolhemos e processamos
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                         {cat.items.map((item, idx) => (
                           <div key={idx} className="flex items-start gap-4 group">
                              <div className="mt-1 w-6 h-6 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-primary-green group-hover:border-primary-green transition-colors">
                                 <CheckCircle2 className="w-3.5 h-3.5 text-primary-green group-hover:text-white transition-colors" />
                              </div>
                              <span className="text-lg font-bold text-dark-green/80 group-hover:text-dark-green transition-colors">{item}</span>
                           </div>
                         ))}
                      </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100">
                      <Link href="/contactos">
                         <Button className="h-20 px-12 bg-dark-green text-white hover:bg-primary-green rounded-2xl flex items-center gap-4 transition-all group/btn">
                           <span className="font-black text-xs uppercase tracking-widest">Solicitar Cotação</span>
                           <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                         </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Simplified CTA Section */}
      <section className="py-20 md:py-40 border-t border-white/50">
        <Container>
           <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-green rounded-[4rem] p-12 md:p-32 text-center text-white shadow-3xl shadow-dark-green/20 relative overflow-hidden"
           >
              <div className="absolute inset-0 opacity-10">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-green rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
              </div>

              <div className="relative z-10 max-w-4xl mx-auto">
                 <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/10 rounded-full border border-white/10 mb-12">
                    <Recycle className="w-4 h-4 text-primary-green" />
                    <span className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em]">Cantu do Ambiente</span>
                 </div>
                 
                 <h2 className="text-5xl md:text-8xl font-heading mb-12 leading-[0.95] tracking-tighter">
                   Responsabilidade <br /><span className="text-primary-green italic">Garantida.</span>
                 </h2>
                 
                 <p className="text-xl md:text-2xl text-green-50/70 mb-16 leading-relaxed max-w-2xl mx-auto">
                   Emitimos o Certificado de Destruição e Reciclagem em 48 horas. Segurança máxima, esforço zero para a sua empresa.
                 </p>
                 
                 <Link href="/contactos">
                    <Button className="h-24 px-20 bg-white text-dark-green hover:bg-primary-green hover:text-white rounded-full text-2xl font-black shadow-2xl transform hover:scale-105 transition-all">
                       Contactar Agora
                    </Button>
                 </Link>
              </div>
           </motion.div>
        </Container>
      </section>
    </div>
  );
}
