"use client";

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function NoticiasHero({ title, subtitle, badge }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Mesh Gradient Background - Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[120px] opacity-60" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 60, 0],
            scale: [1, 1.05, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-primary-green/10 rounded-full blur-[100px] opacity-40" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grain opacity-[0.03] pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {badge && (
              <span className="inline-block mb-8 px-5 py-2 text-[11px] font-black uppercase tracking-[0.3em] bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-900/20">
                {badge}
              </span>
            )}
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter mb-10">
              {title.split(' & ').map((part, i) => (
                <span key={i} className="block">
                  {i > 0 && <span className="text-emerald-500 mr-2">&</span>}
                  {part}
                </span>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium leading-relaxed">
                {subtitle}
              </p>
              
              <div className="hidden md:block h-24 w-px bg-slate-100" />
              
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Publicações</span>
                <span className="text-4xl font-black text-slate-900 tabular-nums">+50</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
