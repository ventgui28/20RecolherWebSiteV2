"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Upload, ChevronRight, Send, ArrowRight } from 'lucide-react';
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONTACTS } from "@/constants/contact";

export default function ContactPage() {
  const contactItems = [
    { label: "Sede em Cantanhede", value: CONTACTS.address, icon: MapPin, delay: 0.1 },
    { label: "Linha de Atendimento", value: CONTACTS.phone, icon: Phone, delay: 0.2 },
    { label: "E-mail Institucional", value: CONTACTS.email, icon: Mail, delay: 0.3 },
    { label: "Horário de Operação", value: CONTACTS.workingHours, icon: Clock, delay: 0.4 },
  ];

  const services = [
    "Recolha REEE's (Eletrónicos)",
    "Componentes Informáticos",
    "Toners Vazios",
    "Toners Fora da Validade",
    "Abate Fiscal de Equipamentos",
    "Consultadoria Ambiental (E-GAR)",
    "Destruição de Dados",
    "Outros Resíduos"
  ];

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Liquid Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-primary-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="pt-32 pb-24 md:pt-48 md:pb-36 relative z-10">
        {/* Editorial Hero Header */}
        <header className="max-w-4xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              Contacto Direto
            </span>
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-slate-900 leading-[0.95] tracking-[-0.04em] mb-10">
              Vamos projetar o <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-emerald-600">seu futuro sustentável.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              Equipa técnica especializada pronta para responder ao seu pedido em menos de 24 horas úteis.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start">
          
          {/* Column 1: Editorial Info & Map */}
          <div className="space-y-20">
            
            {/* Contact Details Grid */}
            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay, duration: 0.8 }}
                  className="group flex items-center justify-between p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-emerald-500/20 hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.1)] transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                      <item.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-slate-800 tracking-tight">{item.value}</p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="text-emerald-500" size={20} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Section with Glass Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square md:aspect-video lg:aspect-square w-full rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white group"
            >
              <iframe
                src={CONTACTS.mapsIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-900/5 rounded-[3rem]" />
              
              <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 flex items-center justify-between transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Sede Principal</span>
                </div>
                <Button variant="outline" className="h-10 px-4 text-[10px] rounded-lg">Ver no Google Maps</Button>
              </div>
            </motion.div>
          </div>

          {/* Column 2: The Liquid Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white rounded-[3.5rem] p-10 md:p-16 xl:p-20 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.08)] border border-slate-100 relative"
          >
            <div className="mb-16">
              <h2 className="text-4xl font-heading font-bold text-slate-900 tracking-tight mb-4">Novo Orçamento</h2>
              <p className="text-slate-500 font-medium">Preencha os dados abaixo e entraremos em contacto brevemente.</p>
            </div>
            
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Identificação</label>
                  <input
                    type="text"
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-lg placeholder:text-slate-300"
                    placeholder="Nome ou Empresa"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">E-mail para Resposta</label>
                  <input
                    type="email"
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-lg placeholder:text-slate-300"
                    placeholder="email@exemplo.pt"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Categoria de Serviço</label>
                <div className="relative group">
                  <select className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-lg appearance-none cursor-pointer">
                    {services.map((service, idx) => (
                      <option key={idx}>{service}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none transition-transform group-hover:scale-110" size={18} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Detalhes do Pedido</label>
                <textarea
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-lg placeholder:text-slate-300 h-32 resize-none leading-relaxed"
                  placeholder="Descreva brevemente os resíduos e quantidades..."
                ></textarea>
              </div>

              {/* Photo Upload - Minimal Style */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Fotografias (Recomendado)</label>
                <label className="flex items-center gap-6 p-6 border-2 border-dashed border-slate-100 rounded-2xl hover:border-emerald-500/30 hover:bg-emerald-50/10 cursor-pointer transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all">
                    <Upload size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Anexar ficheiros</p>
                    <p className="text-xs text-slate-400">Arraste para aqui ou clique para selecionar</p>
                  </div>
                  <input type="file" className="hidden" multiple accept="image/*" />
                </label>
              </div>

              <div className="pt-6">
                <Button className="w-full h-20 text-lg font-bold rounded-2xl bg-slate-900 hover:bg-emerald-600 shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 flex items-center justify-center gap-4">
                  Enviar Pedido
                  <Send className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" size={20} strokeWidth={2} />
                </Button>
                
                <p className="text-center mt-8 text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
                  Compromisso de resposta em 24h
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
