"use client";

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function NoticiasHero({ title, subtitle, badge }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-48 overflow-hidden bg-slate-950">
      {/* Imagem de Fundo Imersiva - Ajuste de Opacidade e Escala */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/background-noticias.jpg" 
          alt="Notícias 20recolher"
          className="w-full h-full object-cover opacity-30 scale-100"
        />
        {/* Overlays Cinematográficos - Menos "Luz Branca" */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/20 to-white pointer-events-none" />
        <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
      </div>

      {/* Brilho Verde Esmeralda (Muito Subtil e Profundo) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[150px]" 
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {badge && (
              <span className="inline-block mb-10 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.4em] bg-emerald-600 text-white rounded-full shadow-2xl border border-white/5">
                {badge}
              </span>
            )}
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.9] tracking-tighter mb-12 drop-shadow-2xl">
              {title.split(' & ').map((part, i) => (
                <span key={i} className="block">
                  {i > 0 && <span className="text-primary-green mr-4">&</span>}
                  {part}
                </span>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row gap-16 items-start md:items-center">
              <p className="text-xl md:text-3xl text-white/60 max-w-2xl font-medium leading-relaxed">
                {subtitle}
              </p>
              
              <div className="hidden md:block h-32 w-px bg-white/5" />
              
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-green opacity-80">Publicações</span>
                <span className="text-5xl font-black text-white tabular-nums tracking-tighter">+50</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
