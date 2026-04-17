"use client";

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function NoticiasHero({ title, subtitle, badge, count = 0 }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-dark-green bg-grain">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-forest-green/30 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-green/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {badge && (
              <span className="inline-flex mb-8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 text-white border border-white/20 rounded-full backdrop-blur-md shadow-sm">
                {badge}
              </span>
            )}
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.9] tracking-tight mb-10">
              {title}
            </h1>

            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start md:items-end">
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-medium leading-relaxed italic">
                {subtitle}
              </p>
              
              <div className="flex items-center gap-6 shrink-0 border-l border-white/20 pl-8 md:pl-12 py-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Publicações</span>
                  <span className="text-4xl font-black text-white tabular-nums tracking-tighter">{count}</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Impacto</span>
                  <span className="text-4xl font-black text-primary-green tabular-nums tracking-tighter">100%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
