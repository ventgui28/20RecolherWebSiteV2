"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-fine bg-grain overflow-hidden relative">
      {/* Elementos Decorativos Flutuantes */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-60"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0] 
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[10%] w-48 h-48 bg-primary-green/10 rounded-full blur-3xl opacity-60"
      />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[12rem] md:text-[18rem] font-black text-green-50 leading-none select-none">
            404
          </h1>
          
          <div className="-mt-12 md:-mt-20">
            <h2 className="text-3xl md:text-5xl font-black text-dark-green mb-6 tracking-tight">
              Página não encontrada
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto mb-10 font-medium">
              Parece que o caminho que procurava foi reciclado ou nunca chegou a existir.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button variant="primary">
                  Voltar ao Início
                </Button>
              </Link>
              <Link href="/contactos">
                <Button variant="outline">
                  Reportar Problema
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Elemento Visual Minimalista (Ícone de Reciclagem Estilizado) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="w-16 h-1 w-32 bg-gradient-to-r from-transparent via-primary-green/20 to-transparent rounded-full" />
        </motion.div>
      </Container>
    </div>
  );
}
