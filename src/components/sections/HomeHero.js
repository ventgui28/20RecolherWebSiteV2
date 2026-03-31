"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HomeHero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-background">
      {/* Soft Ambient Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-green/5 dark:bg-primary-green/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-50/50 dark:bg-emerald-green/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-primary-green/10 text-primary-green font-bold text-sm rounded-full mb-8 border border-green-100 dark:border-primary-green/20">
              <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
              Líder em Reciclagem Tecnológica
            </span>
            <h1 className="text-5xl md:text-7xl font-heading text-dark-green dark:text-gray-100 leading-[1.1] mb-8">
              Dê uma nova <span className="text-primary-green italic">vida</span> ao seu material <span className="relative inline-block text-emerald-green dark:text-primary-green">
                tecnológico.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 120 2 199 5.5" stroke="#8eb31f" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-12 max-w-xl font-medium">
              {BRAND.description} Soluções circulares focadas no impacto ambiental e na segurança de dados da sua empresa.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/contactos">
                <Button className="h-16 px-12 text-lg rounded-2xl shadow-xl shadow-primary-green/20 hover:scale-105 transition-transform">
                  Agendar Recolha
                </Button>
              </Link>
              <Link href="/servicos">
                <Button variant="outline" className="h-16 px-12 text-lg rounded-2xl border-green-200 dark:border-primary-green/30 hover:bg-green-50 dark:hover:bg-primary-green/10">
                  Ver Serviços
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Minimalist Floating Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
               {/* Floating Icon with Soft Glow */}
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-20 text-[180px] md:text-[220px] drop-shadow-[0_35px_35px_rgba(142,179,31,0.2)]"
               >
                 ♻️
               </motion.div>

               {/* Soft Organic Orbs behind the icon */}
               <motion.div 
                 animate={{ 
                   scale: [1, 1.1, 1],
                   rotate: [0, 90, 0]
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute w-[120%] h-[120%] bg-gradient-to-br from-primary-green/10 via-mid-green/5 dark:via-primary-green/5 to-transparent rounded-full blur-2xl pointer-events-none"
               />
               
               {/* Minimalist Floating Text Info */}
               <motion.div 
                animate={{ x: [0, 10, 0], y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 bg-white/80 dark:bg-black/60 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-green-50 dark:border-white/10 z-30 max-w-[200px]"
               >
                  <p className="text-sm font-bold text-dark-green dark:text-primary-green leading-tight">
                    Gestão Segura & Certificada
                  </p>
               </motion.div>

               <motion.div 
                animate={{ x: [0, -10, 0], y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-0 bg-white/80 dark:bg-black/60 backdrop-blur-md px-6 py-4 rounded-full shadow-lg border border-green-50 dark:border-white/10 z-30"
               >
                  <p className="text-sm font-black text-primary-green uppercase tracking-widest">
                    Eco Friendly 🌿
                  </p>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
