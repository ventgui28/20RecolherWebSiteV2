"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants/faq';
import Container from '@/components/ui/Container';

const FAQItem = ({ item, index, isOpen, toggle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`mb-4 overflow-hidden rounded-[2rem] border transition-all duration-500 ${
        isOpen 
          ? "bg-white border-primary-green/30 shadow-xl shadow-primary-green/5" 
          : "bg-white/40 backdrop-blur-sm border-white/60 hover:border-primary-green/20"
      }`}
    >
      <button
        onClick={toggle}
        className="w-full p-8 md:p-10 flex items-center justify-between text-left gap-6 group"
      >
        <span className={`text-xl md:text-2xl font-heading font-bold transition-colors duration-300 ${
          isOpen ? "text-primary-green" : "text-slate-800"
        }`}>
          {item.question}
        </span>
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
          isOpen ? "bg-primary-green text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-primary-green/10 group-hover:text-primary-green"
        }`}>
          <ChevronDown size={24} strokeWidth={2.5} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-8 md:px-10 pb-10">
              <div className="w-12 h-1 bg-primary-green/20 rounded-full mb-8" />
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-4xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQSection({ className = "" }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={`py-24 md:py-32 relative overflow-hidden ${className}`}>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-[30vw] h-[30vw] bg-primary-green/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30vw] h-[30vw] bg-emerald-green/5 blur-[100px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Header Sidebar */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary-green/10 rounded-full border border-primary-green/20 mb-8">
                <HelpCircle className="w-4 h-4 text-primary-green" />
                <span className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em]">Centro de Apoio</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-heading font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
                Dúvidas <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-green via-emerald-green to-dark-green italic">Frequentes.</span>
              </h2>
              
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
                Encontre respostas rápidas sobre as nossas operações, licenciamentos e processos de valorização.
              </p>

              <div className="p-8 bg-dark-green rounded-[2.5rem] text-white shadow-2xl shadow-dark-green/20">
                <h4 className="font-bold text-lg mb-4">Ainda tem questões?</h4>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">Se a sua dúvida não estiver listada, a nossa equipa técnica está pronta para ajudar.</p>
                <a 
                  href="/contactos" 
                  className="inline-flex items-center gap-2 text-primary-green font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                >
                  Contactar Suporte Técnico
                  <ChevronDown className="-rotate-90 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* FAQ List */}
          <div className="lg:w-2/3">
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem 
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
