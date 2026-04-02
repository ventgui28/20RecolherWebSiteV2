"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Upload, ChevronRight, Send } from 'lucide-react';
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { CONTACTS } from "@/constants/contact";

export default function ContactPage() {
  const contactItems = [
    { label: "Onde estamos", value: CONTACTS.address, icon: MapPin },
    { label: "Linha Direta", value: CONTACTS.phone, icon: Phone },
    { label: "E-mail Geral", value: CONTACTS.email, icon: Mail },
    { label: "Disponibilidade", value: CONTACTS.workingHours, icon: Clock },
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
    <div className="py-24 md:py-36 bg-green-mist bg-grain overflow-hidden relative min-h-screen">
      {/* Background Elements - Optimized Blobs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary-green/5 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading 
          centered
          title="Vamos Conversar?"
          subtitle="Escolha a forma mais conveniente para entrar em contacto connosco ou peça um orçamento em menos de 1 minuto."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start mt-20 md:mt-28">
          
          {/* Column 1: Info & Map (Information Panel) */}
          <div className="lg:col-span-5 space-y-12">
            
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-black text-primary-green uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-px bg-primary-green/30" />
                Informações de Contacto
              </h3>
            </div>

            {/* Contact Details Grid - More Integrated Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-6 p-6 rounded-3xl bg-white/40 hover:bg-white transition-all duration-500 border border-white/20 hover:border-primary-green/10 hover:shadow-xl will-change-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-green-50 group-hover:bg-primary-green group-hover:text-white transition-all duration-500 shrink-0">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-black text-primary-green/50 uppercase tracking-[0.2em] mb-0.5">{item.label}</p>
                    <p className="text-base font-bold text-dark-green leading-tight truncate">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Card - Refined Style & Label */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[380px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl border-[6px] border-white group will-change-transform"
            >
              <iframe
                src={CONTACTS.mapsIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.5] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-dark-green/5 rounded-[3.5rem]" />
              
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-lg border border-white flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary-green rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-dark-green uppercase tracking-widest">Localização Oficial</span>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Guided Budget Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/70 backdrop-blur-xl rounded-[4rem] p-8 md:p-12 lg:p-16 shadow-[0_50px_100px_-20px_rgba(14,103,44,0.12)] border border-white/50 relative overflow-hidden will-change-transform"
          >
            <div className="relative z-10">
              <div className="flex flex-col gap-2 mb-16">
                <span className="text-xs font-black text-primary-green uppercase tracking-[0.4em]">Request Quote</span>
                <h2 className="text-4xl font-heading text-dark-green">Pedido de Orçamento</h2>
              </div>
              
              <form className="space-y-12">
                
                {/* Step 01: Identity */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary-green/10 text-primary-green flex items-center justify-center text-[10px] font-black tracking-widest">01</span>
                    <h4 className="text-xs font-black text-dark-green/40 uppercase tracking-[0.2em]">Identificação</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-12">
                    <div className="space-y-2.5">
                      <label className="text-[9px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Nome Completo</label>
                      <input
                        type="text"
                        className="w-full px-7 py-4 rounded-2xl bg-white/50 border-white/20 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300"
                        placeholder="João Silva"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[9px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">E-mail de Contacto</label>
                      <input
                        type="email"
                        className="w-full px-7 py-4 rounded-2xl bg-white/50 border-white/20 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300"
                        placeholder="joao@empresa.pt"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 02: Service Selection */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary-green/10 text-primary-green flex items-center justify-center text-[10px] font-black tracking-widest">02</span>
                    <h4 className="text-xs font-black text-dark-green/40 uppercase tracking-[0.2em]">O que pretende reciclar?</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-8 pl-12">
                    <div className="space-y-2.5">
                      <label className="text-[9px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Serviço Pretendido</label>
                      <div className="relative group">
                        <select className="w-full px-7 py-4 rounded-2xl bg-white/50 border-white/20 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green appearance-none cursor-pointer">
                          {services.map((service, idx) => (
                            <option key={idx}>{service}</option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-primary-green pointer-events-none transition-transform group-hover:scale-110" size={16} />
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[9px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Fotografias dos Resíduos (Recomendado)</label>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-100 rounded-3xl bg-green-50/20 hover:bg-white hover:border-primary-green/30 cursor-pointer transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="text-primary-green/40 group-hover:text-primary-green mb-2 transition-colors" size={24} strokeWidth={1.5} />
                          <p className="text-[10px] font-black text-gray-400 group-hover:text-dark-green uppercase tracking-widest transition-colors">Para orçamentos mais precisos</p>
                        </div>
                        <input type="file" className="hidden" multiple accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Step 03: Details */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary-green/10 text-primary-green flex items-center justify-center text-[10px] font-black tracking-widest">03</span>
                    <h4 className="text-xs font-black text-dark-green/40 uppercase tracking-[0.2em]">Detalhes Adicionais</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-8 pl-12">
                    <div className="space-y-2.5">
                      <label className="text-[9px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Breve Descrição</label>
                      <textarea
                        className="w-full px-7 py-5 rounded-3xl bg-white/50 border-white/20 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300 h-32 resize-none leading-relaxed"
                        placeholder="Quantidade aproximada, estado, local de recolha..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-8 pl-12">
                  <Button className="w-full h-20 text-xl font-black shadow-[0_30px_60px_-15px_rgba(14,103,44,0.2)] hover:shadow-[0_40px_80px_-20px_rgba(14,103,44,0.3)] hover:scale-[1.01] active:scale-[0.99] transform transition-all group flex items-center justify-center gap-4">
                    Enviar Solicitação
                    <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} strokeWidth={2.5} />
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 opacity-40">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em]">Resposta em 24h úteis</p>
                    <div className="hidden sm:block h-px flex-1 mx-8 bg-dark-green/20" />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em]">Privacidade Garantida</p>
                  </div>
                </div>
              </form>
            </div>

            {/* Subtle background detail */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
