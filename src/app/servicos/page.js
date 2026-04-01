"use client";

import { motion } from 'framer-motion';
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { SERVICES } from "@/constants/services";

export default function ServicesPage() {
  return (
    <div className="py-20 md:py-32 bg-green-mist bg-grain overflow-hidden relative min-h-screen">
      {/* Ambient Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[100px] pointer-events-none" />
      
      <Container className="relative z-10">
        {/* Header Section */}
        <SectionHeading 
          centered
          title="Soluções de Economia Circular"
          subtitle="Garantimos que cada ativo tecnológico da sua empresa tenha o destino certo, com segurança e conformidade total."
        />

        {/* Detailed Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 mb-40">
          {SERVICES.map((cat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col bg-white/40 backdrop-blur-md rounded-[3rem] p-12 hover:bg-white/60 hover:shadow-2xl hover:shadow-primary-green/5 transition-all duration-700 border border-white group h-full"
            >
              <div className="text-[80px] mb-10 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 origin-left drop-shadow-sm">
                {cat.icon}
              </div>
              
              <h2 className="text-3xl font-heading text-dark-green mb-6 group-hover:text-primary-green transition-colors leading-tight">
                {cat.title}
              </h2>
              
              <p className="text-gray-500 mb-10 leading-relaxed font-medium text-lg">
                {cat.desc}
              </p>
              
              <div className="space-y-5 mb-12 flex-grow">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">O que processamos:</p>
                <ul className="space-y-4">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 font-bold text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-green mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <Link 
                  href="/contactos" 
                  className="inline-flex items-center text-dark-green font-black text-xs uppercase tracking-widest group-hover:gap-4 gap-2 transition-all"
                >
                  Pedir Orçamento <span className="text-xl">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Section - Minimalist & Bold */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] p-12 md:p-24 text-center bg-dark-green shadow-2xl overflow-hidden group"
        >
           <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-primary-green font-bold text-[10px] uppercase tracking-[0.2em] rounded-full mb-10 border border-white/10">
                  Pronto para começar?
                </div>
                
                <h2 className="text-4xl md:text-6xl font-heading text-white mb-10 leading-tight tracking-tight">
                  Dê o próximo passo <br /> rumo ao <span className="text-primary-green italic underline decoration-white/10 decoration-8 underline-offset-4">Zero Waste.</span>
                </h2>
                
                <p className="text-xl mb-12 text-green-50 opacity-80 leading-relaxed font-medium">
                  Agende uma recolha hoje e receba o certificado de destruição segura e reciclagem ambiental num prazo de 48 horas.
                </p>
                
                <Link href="/contactos">
                    <Button className="h-20 px-16 text-xl font-black bg-white text-dark-green hover:bg-primary-green hover:text-white transform hover:scale-105 transition-all shadow-2xl">
                        Agendar Agora
                    </Button>
                </Link>
           </div>
           
           {/* Floating abstract shapes for CTA */}
           <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] border-[40px] border-primary-green/5 rounded-full pointer-events-none" 
           />
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-mid-green/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </Container>
    </div>
  );
}
