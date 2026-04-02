"use client";

import { motion } from 'framer-motion';
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/constants/services";
import { Monitor, Cpu, BatteryCharging, ArrowRight, CheckCircle2, ShieldCheck, Zap, Recycle } from 'lucide-react';

// Mapeamento de ícones Lucide
const iconMap = {
  Monitor: Monitor,
  Cpu: Cpu,
  BatteryCharging: BatteryCharging
};

export default function ServicesPage() {
  return (
    <div className="bg-green-mist bg-grain relative min-h-screen">
      
      {/* Hero Intro Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 border-b border-white/50">
        <Container>
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm mb-10">
                <ShieldCheck className="w-4 h-4 text-primary-green" />
                <span className="text-[10px] font-black text-dark-green uppercase tracking-[0.2em]">Operador Licenciado CCDRC</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-heading text-dark-green mb-10 leading-[0.9] tracking-tighter">
                Serviços de <br /><span className="text-primary-green italic underline decoration-primary-green/20 underline-offset-8">Valorização Tecnológica.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium max-w-2xl">
                Soluções integradas de gestão de resíduos para empresas e instituições públicas, focadas na segurança total de dados e na economia circular.
              </p>
            </motion.div>
          </div>
        </Container>
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
                    
                    {/* Abstract Floating Tag (only for visual detail) */}
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

                    {/* Catalog List - Focus of the session */}
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
              {/* Dynamic Abstract Background (Low CPU impact) */}
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
