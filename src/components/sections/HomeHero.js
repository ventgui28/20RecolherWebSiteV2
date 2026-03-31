"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark-green">
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105" // Ligeiro scale para evitar bordas brancas
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* Fallback Image if video fails */}
          <Image 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
            alt="Sustentabilidade e Tecnologia"
            fill
            priority
            className="object-cover"
          />
        </video>
        
        {/* Immersive Overlay - Gradiente do escuro para o transparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-green/90 via-dark-green/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" /> {/* Darken adicional */}
      </div>

      <Container className="relative z-20 pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-8xl font-heading text-white leading-[0.95] mb-10 tracking-tighter">
              Transformamos <br />
              <span className="text-primary-green italic">tecnologia</span> em <br />
              <span className="relative inline-block">
                sustentabilidade.
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="absolute -bottom-2 left-0 w-full h-3" 
                  viewBox="0 0 200 8" 
                  fill="none"
                >
                  <path d="M1 5.5C40 2 120 2 199 5.5" stroke="#8eb31f" strokeWidth="4" strokeLinecap="round"/>
                </motion.svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-xl font-medium">
              A 20recolher lidera a economia circular em Portugal, garantindo o ciclo de vida total dos seus ativos tecnológicos.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/contactos">
                <Button className="h-20 px-14 text-xl rounded-2xl bg-primary-green text-white shadow-2xl shadow-primary-green/40 hover:scale-105 transition-transform font-black uppercase tracking-widest">
                  Solicitar Recolha
                </Button>
              </Link>
              <Link href="/servicos">
                <Button variant="outline" className="h-20 px-14 text-xl rounded-2xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-black uppercase tracking-widest">
                  Nossos Serviços
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Side Content - Floating Metrics or Minimalist Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden lg:flex flex-col gap-8 items-end"
          >
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 max-w-[320px] shadow-2xl">
              <p className="text-4xl font-black text-primary-green mb-2">100%</p>
              <p className="text-white font-bold text-lg leading-tight uppercase tracking-tighter">Circular & <br />Certificado</p>
              <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1.5 }}
                  className="h-full bg-primary-green"
                />
              </div>
            </div>

            <div className="bg-primary-green/20 backdrop-blur-xl px-10 py-6 rounded-full border border-white/10 shadow-xl flex items-center gap-4 group cursor-default hover:bg-primary-green/30 transition-colors">
              <span className="text-2xl">🌍</span>
              <p className="text-white font-black text-xs uppercase tracking-[0.2em]">Foco em Portugal 🇵🇹</p>
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Bottom Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
