"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/constants/services";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Monitor, Cpu, BatteryCharging, ArrowRight, CheckCircle2 } from 'lucide-react';

// Mapeamento de ícones Lucide baseados nas constantes
const iconMap = {
  Monitor: Monitor,
  Cpu: Cpu,
  BatteryCharging: BatteryCharging
};

export default function ServicesPage() {
  const mousePosition = useMousePosition();
  const containerRef = useRef(null);
  
  // Parallax suave para os blobs de fundo baseado na posição do rato
  const blob1X = (mousePosition.x - 500) * 0.05;
  const blob1Y = (mousePosition.y - 500) * 0.05;
  const blob2X = (mousePosition.x - 500) * -0.03;
  const blob2Y = (mousePosition.y - 500) * -0.03;

  return (
    <div ref={containerRef} className="py-20 md:py-32 bg-green-mist bg-grain overflow-hidden relative min-h-screen">
      {/* Ambient Parallax Blobs */}
      <motion.div 
        animate={{ x: blob1X, y: blob1Y }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-green/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ x: blob2X, y: blob2Y }}
        className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-dark-green/5 rounded-full blur-[100px] pointer-events-none" 
      />
      
      <Container className="relative z-10">
        {/* Header Section */}
        <div className="mb-24">
            <SectionHeading 
                centered
                title="Soluções de Economia Circular"
                subtitle="Transformamos resíduos tecnológicos em novas oportunidades, garantindo segurança total de dados e conformidade ambiental rigorosa."
            />
        </div>

        {/* Immersive Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-40">
          {SERVICES.map((cat, i) => {
            const IconComponent = iconMap[cat.icon] || Monitor;
            
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative flex flex-col h-[700px] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-dark-green/5 border border-white/50 bg-white/30 backdrop-blur-sm"
              >
                {/* Background Image with Reveal & Zoom Effect */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-green-mist/80 via-transparent to-dark-green/40 opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                </div>

                {/* Content Overlay - Glassmorphism */}
                <div className="relative z-10 flex flex-col h-full p-10 md:p-12">
                  {/* Badge & Icon Area */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/50 shadow-sm">
                      <span className="text-[10px] font-black text-dark-green uppercase tracking-[0.2em]">
                        {cat.badge}
                      </span>
                    </div>
                    <div className="w-16 h-16 bg-primary-green rounded-3xl flex items-center justify-center shadow-lg shadow-primary-green/20 group-hover:rotate-12 transition-transform duration-500">
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Title & Description */}
                  <h2 className="text-4xl font-heading text-dark-green mb-6 leading-[1.1] group-hover:translate-x-2 transition-transform duration-500">
                    {cat.title}
                  </h2>
                  
                  <p className="text-gray-700/80 mb-8 leading-relaxed font-medium text-lg">
                    {cat.desc}
                  </p>

                  {/* Advantage Highlight */}
                  <div className="flex items-center gap-3 mb-10 py-4 px-6 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/40 self-start group-hover:bg-white/60 transition-colors duration-500">
                    <CheckCircle2 className="w-5 h-5 text-primary-green" />
                    <span className="text-sm font-black text-dark-green uppercase tracking-wider">{cat.advantage}</span>
                  </div>
                  
                  {/* List of items with staggered-like look */}
                  <div className="space-y-4 mb-12 flex-grow">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="flex items-center text-dark-green font-bold text-sm bg-white/20 backdrop-blur-[2px] p-2 pr-4 rounded-lg inline-flex mr-2 mb-2 group-hover:bg-white/40 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-green mr-3"></span>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="pt-8 border-t border-white/30">
                    <Link 
                      href="/contactos" 
                      className="inline-flex items-center text-dark-green font-black text-sm uppercase tracking-[0.2em] group/btn"
                    >
                      Solicitar Recolha 
                      <div className="ml-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-primary-green group-hover/btn:text-white transition-all duration-300 shadow-sm">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Section - Editorial & Immersive */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-[4rem] p-12 md:p-32 text-center bg-dark-green shadow-[0_50px_100px_-20px_rgba(14,103,44,0.3)] overflow-hidden group"
        >
           {/* Dynamic Background for CTA */}
           <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(142,179,31,0.15),transparent_70%)]" />
             <div className="absolute inset-0 bg-grain opacity-5" />
           </div>

           <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md text-primary-green font-bold text-xs uppercase tracking-[0.3em] rounded-full mb-12 border border-white/10"
                >
                  Conformidade & Sustentabilidade
                </motion.div>
                
                <h2 className="text-5xl md:text-8xl font-heading text-white mb-12 leading-[0.95] tracking-tighter">
                  Pronto para elevar <br /> a sua <span className="text-primary-green italic">gestão de REEE?</span>
                </h2>
                
                <p className="text-xl md:text-2xl mb-16 text-green-50/70 leading-relaxed font-medium max-w-2xl mx-auto">
                  Agende uma recolha certificada hoje. Garantimos o tratamento em 48h com emissão imediata de guias de acompanhamento.
                </p>
                
                <Link href="/contactos">
                    <Button className="h-24 px-20 text-2xl font-black bg-white text-dark-green hover:bg-primary-green hover:text-white transform hover:scale-105 transition-all shadow-2xl rounded-full">
                        Agendar Agora
                    </Button>
                </Link>
           </div>
           
           {/* Abstract Decorative Elements */}
           <div className="absolute -top-24 -right-24 w-96 h-96 border-[1px] border-white/10 rounded-full" />
           <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-green/10 rounded-full blur-[80px]" />
        </motion.div>
      </Container>
    </div>
  );
}
