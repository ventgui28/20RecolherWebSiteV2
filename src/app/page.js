"use client";

import { motion } from "framer-motion";
import HomeHero from "@/components/sections/HomeHero";
import HomeServices from "@/components/sections/HomeServices";
import HomeStats from "@/components/sections/HomeStats";
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
    <div>
      <HomeHero />
      <HomeServices />
      <HomeStats />
      
      {/* About Brief Section - Refined with Micro-interactions */}
      <section className="py-32 bg-background overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
            
            {/* Visual Column */}
            <motion.div 
              {...fadeInUp}
              className="lg:w-1/2 relative flex justify-center items-center"
            >
               <motion.div 
                 animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-20 text-[200px] md:text-[250px] drop-shadow-[0_20px_50px_rgba(30,113,42,0.15)] cursor-default"
               >
                 🌍
               </motion.div>
               
               <div className="absolute w-[80%] h-[80%] bg-mid-green/5 rounded-full blur-[100px] pointer-events-none" />
               
               <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -top-4 -right-4 bg-white/80 backdrop-blur-md px-8 py-6 rounded-[2.5rem] shadow-xl border border-green-50 max-w-[200px] z-30"
               >
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nosso Foco</p>
                  <p className="text-base font-bold text-dark-green leading-snug">Economia Circular em Portugal 🇵🇹</p>
               </motion.div>

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
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-green-50 text-primary-green font-black text-[10px] uppercase tracking-[0.2em] rounded-full mb-8 border border-green-100">
                <span className="w-2 h-2 rounded-full bg-primary-green animate-ping"></span>
                Sustentabilidade em Foco
              </div>
              
              <h2 className="text-4xl md:text-6xl font-heading text-dark-green mb-10 leading-tight tracking-tight">
                A sustentabilidade não é uma escolha, <br /> é o <span className="text-primary-green italic underline decoration-green-100 decoration-[12px] underline-offset-4">nosso futuro.</span>
              </h2>
              
              <div className="space-y-8 text-lg text-gray-500 font-medium leading-relaxed mb-12">
                <p>
                  Na 20recolher, transformamos a forma como as empresas gerem os seus ativos tecnológicos. Mais do que recolher, garantimos que cada componente volta a integrar o ciclo produtivo.
                </p>
                
                <motion.blockquote 
                  initial={{ opacity: 0, l: -20 }}
                  whileInView={{ opacity: 1, l: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="border-l-8 border-primary-green pl-8 py-2 text-dark-green font-bold text-xl italic bg-green-50/30 rounded-r-3xl"
                >
                   "{BRAND.mission}"
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
