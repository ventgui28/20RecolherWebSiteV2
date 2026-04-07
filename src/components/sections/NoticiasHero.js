"use client";

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function NoticiasHero({ title, subtitle, badge }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-slate-900">
      {/* Imagem de Fundo Imersiva com Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/background-noticias.jpg" 
          alt="Notícias 20recolher"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/60 to-white pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Mesh Gradient Animado (Subtil sobre a imagem) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px]" 
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {badge && (
              <span className="inline-block mb-8 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.4em] bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/40 border border-white/10">
                {badge}
              </span>
            )}
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.9] tracking-tighter mb-12">
              {title.split(' & ').map((part, i) => (
                <span key={i} className="block">
                  {i > 0 && <span className="text-primary-green mr-4">&</span>}
                  {part}
                </span>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <p className="text-xl md:text-3xl text-emerald-50/70 max-w-2xl font-medium leading-relaxed">
                {subtitle}
              </p>
              
              <div className="hidden md:block h-32 w-px bg-white/10" />
              
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-green">Publicações</span>
                <span className="text-5xl font-black text-white tabular-nums tracking-tighter">+50</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
