"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HomeHero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-green-50/30">
      {/* Immersive Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-100/50 to-transparent pointer-events-none" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-primary-green/10 rounded-full blur-3xl pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-white text-primary-green font-bold text-sm rounded-full shadow-sm mb-6 border border-green-100">
              Líder em Reciclagem Tecnológica
            </span>
            <h1 className="text-5xl md:text-7xl font-heading text-dark-green leading-[1.1] mb-8">
              Dê uma nova <span className="text-primary-green italic">vida</span> ao seu material <span className="relative inline-block text-emerald-green">
                tecnológico.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 120 2 199 5.5" stroke="#8eb31f" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
              {BRAND.description} Soluções circulares para empresas que valorizam o impacto ambiental e a segurança de dados.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contactos">
                <Button className="h-14 px-10 text-lg rounded-2xl shadow-lg hover:shadow-primary-green/20">
                  Agendar Recolha
                </Button>
              </Link>
              <Link href="/servicos">
                <Button variant="outline" className="h-14 px-10 text-lg rounded-2xl border-green-200">
                  Ver Serviços
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square w-full max-w-lg mx-auto bg-white p-4 rounded-[3rem] shadow-2xl relative z-10 overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-dark-green opacity-90" />
               <div className="relative z-20 h-full flex flex-col items-center justify-center text-white p-12 text-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-4 border-white/20 border-t-white rounded-full mb-8 flex items-center justify-center"
                  >
                    <span className="text-5xl">♻️</span>
                  </motion.div>
                  <h2 className="text-3xl font-heading mb-4">{BRAND.slogan}</h2>
                  <p className="text-green-50 text-lg opacity-80">
                    Transformamos resíduos em recursos de forma segura e certificada.
                  </p>
               </div>
               
               {/* Decorative floating elements */}
               <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-10 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm font-bold"
               >
                 Certified ✅
               </motion.div>
            </div>
            {/* Background shape behind image */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary-green/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
