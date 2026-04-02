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
      {/* Background Elements - Immersive Blobs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary-green/5 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading 
          centered
          title="Vamos Conversar?"
          subtitle="A nossa equipa técnica está disponível para responder às suas questões e fornecer orçamentos detalhados em menos de 24 horas."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start mt-16 md:mt-24">
          
          {/* Column 1: Info & Map */}
          <div className="lg:col-span-5 space-y-16">
            
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/40 hover:bg-white transition-all duration-700 border border-white/20 hover:border-primary-green/20 hover:shadow-[0_20px_40px_-15px_rgba(14,103,44,0.08)]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-green-50 group-hover:bg-primary-green group-hover:text-white transition-all duration-700 shrink-0">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary-green/60 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-dark-green leading-tight">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Card - Refined Style */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[400px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl border-[6px] border-white group"
            >
              <iframe
                src={CONTACTS.mapsIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.4] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2000ms] scale-110 group-hover:scale-100"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-dark-green/5 rounded-[3.5rem]" />
              
              {/* Overlay Label */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <div className="w-2 h-2 bg-primary-green rounded-full animate-ping" />
                <span className="text-xs font-black text-dark-green uppercase tracking-widest">Sede em Cantanhede</span>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Advanced Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 bg-white/70 backdrop-blur-3xl rounded-[4rem] p-10 md:p-16 lg:p-20 shadow-[0_60px_120px_-30px_rgba(14,103,44,0.15)] border border-white/50 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-1 bg-primary-green rounded-full" />
                <h2 className="text-4xl font-heading text-dark-green">Pedido de Orçamento</h2>
              </div>
              
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Nome ou Empresa</label>
                    <input
                      type="text"
                      className="w-full px-8 py-5 rounded-2xl bg-white/50 border-white/20 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300"
                      placeholder="Identifique-se"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Contacto E-mail</label>
                    <input
                      type="email"
                      className="w-full px-8 py-5 rounded-2xl bg-white/50 border-white/20 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300"
                      placeholder="email@contacto.pt"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Serviço Pretendido</label>
                  <div className="relative group">
                    <select className="w-full px-8 py-5 rounded-2xl bg-white/50 border-white/20 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green appearance-none cursor-pointer">
                      {services.map((service, idx) => (
                        <option key={idx}>{service}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-primary-green pointer-events-none transition-transform group-hover:scale-110" size={18} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Descrição dos Resíduos</label>
                  <textarea
                    className="w-full px-8 py-6 rounded-3xl bg-white/50 border-white/20 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300 h-44 resize-none leading-relaxed"
                    placeholder="Descreva a quantidade aproximada e o estado dos equipamentos..."
                  ></textarea>
                </div>

                {/* Advanced: Photo Upload */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-primary-green/60 uppercase tracking-[0.2em] ml-2">Anexar Fotografias (Opcional)</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-100 rounded-3xl bg-green-50/30 hover:bg-green-50 hover:border-primary-green/30 cursor-pointer transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="text-primary-green/40 group-hover:text-primary-green mb-2 transition-colors" size={24} />
                      <p className="text-xs font-bold text-gray-400 group-hover:text-dark-green transition-colors">Clique para selecionar imagens</p>
                    </div>
                    <input type="file" className="hidden" multiple accept="image/*" />
                  </label>
                </div>

                <div className="pt-6">
                  <Button className="w-full h-24 text-2xl font-black shadow-[0_30px_60px_-15px_rgba(14,103,44,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(14,103,44,0.4)] hover:scale-[1.02] active:scale-[0.98] transform transition-all group flex items-center justify-center gap-4">
                    Enviar Pedido de Orçamento
                    <Send className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" size={24} strokeWidth={2.5} />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-4 mt-10">
                    <div className="h-px flex-1 bg-green-100" />
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Resposta em 24h</p>
                    <div className="h-px flex-1 bg-green-100" />
                  </div>
                </div>
              </form>
            </div>

            {/* Ambient detail inside the form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
