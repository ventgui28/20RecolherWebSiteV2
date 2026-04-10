"use client";

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function NoticiasHero({ title, subtitle, badge, count = 0 }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-white border-b border-slate-100">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/30 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-green/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {badge && (
              <span className="inline-flex mb-8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full shadow-sm">
                {badge}
              </span>
            )}
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1] tracking-tighter mb-10">
              {title}
            </h1>

            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start md:items-end">
              <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium leading-[1.6]">
                {subtitle}
              </p>
              
              <div className="flex items-center gap-6 shrink-0 border-l border-slate-200 pl-8 md:pl-12 py-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Publicações</span>
                  <span className="text-4xl font-black text-slate-900 tabular-nums tracking-tighter">{count}</span>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Impacto</span>
                  <span className="text-4xl font-black text-emerald-600 tabular-nums tracking-tighter">100%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
