"use client";

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Mail, ArrowRight } from 'lucide-react';

export default function NewsletterCTA() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4 block">Subscreva as Atualizações</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-6">
                Acompanhe o percurso <br /> 
                <span className="text-emerald-600">da 20recolher.</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl font-medium leading-relaxed">
                Subscreva para receber em primeira mão as nossas novidades corporativas, novos serviços licenciados e relatórios de impacto ambiental da nossa operação.
              </p>
            </motion.div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50"
            >
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">E-mail Profissional</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" 
                      placeholder="exemplo@empresa.com" 
                      className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-12 py-5 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-5 rounded-xl flex items-center justify-center gap-3 transition-all group"
                >
                  Subscrever Boletim
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-tighter">
                  Ao subscrever, aceita a nossa política de proteção de dados.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
