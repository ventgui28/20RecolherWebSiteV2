"use client";

import { motion } from "framer-motion";
import HomeHero from "@/components/sections/HomeHero";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import HomeStats from "@/components/sections/HomeStats";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { BRAND } from "@/constants/brand";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-green-mist bg-grain">
      <HomeHero />
      <ProcessTimeline />
      <HomeStats />
      
      {/* About Brief Section - Refined with Micro-interactions */}
      <section className="py-32 overflow-hidden relative">
        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
            
            {/* Visual Column */}
            <motion.div 
              {...fadeInUp}
              className="lg:w-1/2 relative flex justify-center items-center py-12"
            >
               {/* Animated Organic Blob Container */}
               <motion.div 
                 animate={{ 
                   borderRadius: [
                     "60% 40% 30% 70% / 60% 30% 70% 40%",
                     "30% 70% 70% 30% / 30% 30% 70% 70%",
                     "50% 50% 20% 80% / 20% 80% 50% 50%",
                     "60% 40% 30% 70% / 60% 30% 70% 40%"
                   ] 
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-20 w-[300px] h-[300px] md:w-[400px] md:h-[400px] overflow-hidden shadow-[0_20px_50px_rgba(30,113,42,0.2)] border-4 border-white"
               >
                 <Image 
                   src="/images/imagem-arvore.jpg" 
                   alt="Natureza Imersiva e Floresta Sustentável" 
                   fill
                   className="object-cover scale-110 saturate-[0.8]"
                 />
                 <div className="absolute inset-0 bg-primary-green/10 mix-blend-overlay" />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark-green/40 via-transparent to-transparent opacity-60" />
               </motion.div>
               
               <div className="absolute w-[80%] h-[80%] bg-primary-green/10 rounded-full blur-[100px] pointer-events-none" />

               <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary-green/5 rounded-full blur-2xl animate-pulse" />
            </motion.div>
            
            {/* Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-10 leading-tight tracking-tight">
                A sustentabilidade não é uma escolha, <br /> é o <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-emerald-green italic">nosso futuro.</span>
              </h2>
              
              <div className="space-y-8 text-lg text-slate-500 font-medium leading-relaxed mb-12">
                <p>
                  Na 20 Recolher, transformamos a forma como as empresas gerem os seus ativos tecnológicos. Mais do que recolher, garantimos que cada componente volta a integrar o ciclo produtivo.
                </p>
                
                <motion.blockquote 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="border-l-4 border-primary-green pl-8 py-2 text-slate-700 text-2xl font-light italic"
                >
                   &ldquo;{BRAND.mission}&rdquo;
                </motion.blockquote>
              </div>

              <Link href="/sobre-nos">
                <Button className="h-16 px-12 text-lg rounded-2xl shadow-xl shadow-primary-green/10 font-bold hover:shadow-primary-green/20">
                  Saiba como trabalhamos
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
