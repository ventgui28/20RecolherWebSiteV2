"use client";

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Mail, Send } from 'lucide-react';

export default function NewsletterCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-dark-green rounded-[4rem] p-12 lg:p-24 overflow-hidden shadow-3xl shadow-emerald-900/40"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/50 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block mb-6 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 text-emerald-400 rounded-full border border-white/5">
                Newsletter
              </span>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
                Fique a par do <span className="text-primary-green italic">futuro sustentável.</span>
              </h2>
              <p className="text-emerald-100/70 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                Receba mensalmente uma curadoria de notícias sobre economia circular, novas legislações e o impacto ambiental da reciclagem tecnológica.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 lg:p-12 rounded-[3rem] border border-white/10">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
                  <input 
                    type="email" 
                    placeholder="O seu melhor e-mail" 
                    className="w-full bg-white text-slate-900 px-16 py-6 rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-primary-green/30 transition-all placeholder:text-slate-400"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-primary-green hover:bg-bright-green text-dark-green font-black py-6 rounded-2xl flex items-center justify-center gap-3 transition-all group shadow-xl shadow-emerald-950/20"
                >
                  Subscrever Agora
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                
                <p className="text-center text-[10px] font-bold text-emerald-100/40 uppercase tracking-widest">
                  Respeitamos a sua privacidade. Cancele quando quiser.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
