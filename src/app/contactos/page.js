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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start mt-20 md:mt-32">
          
          {/* Column 1: Info & Map (Information Panel) */}
          <div className="lg:col-span-5 space-y-12">
            
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-black text-primary-green uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-px bg-primary-green/30" />
                Informações de Contacto
              </h3>
            </div>

            {/* Contact Details Grid */}
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

            {/* Map Card */}
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

          {/* Column 2: Conversational Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/40 backdrop-blur-xl rounded-[4rem] p-12 md:p-16 lg:p-24 shadow-[0_50px_100px_-20px_rgba(14,103,44,0.1)] border border-white/50 relative overflow-hidden will-change-transform"
          >
            <div className="relative z-10">
              <form className="space-y-12">
                <div className="text-2xl md:text-3xl lg:text-4xl font-heading text-dark-green leading-[1.8] md:leading-[1.8] tracking-tight">
                  Olá, o meu nome é {" "}
                  <input
                    type="text"
                    className="inline-block px-4 py-1 bg-transparent border-b-2 border-primary-green/20 focus:border-primary-green focus:outline-none transition-all placeholder:text-gray-300 w-auto min-w-[150px] font-bold text-primary-green"
                    placeholder="Nome Completo"
                  />
                  {" "} e represento a empresa {" "}
                  <input
                    type="text"
                    className="inline-block px-4 py-1 bg-transparent border-b-2 border-primary-green/20 focus:border-primary-green focus:outline-none transition-all placeholder:text-gray-300 w-auto min-w-[150px] font-bold text-primary-green"
                    placeholder="Nome da Empresa"
                  />
                  . <br className="hidden md:block" />
                  Podem contactar-me através do e-mail {" "}
                  <input
                    type="email"
                    className="inline-block px-4 py-1 bg-transparent border-b-2 border-primary-green/20 focus:border-primary-green focus:outline-none transition-all placeholder:text-gray-300 w-auto min-w-[250px] font-bold text-primary-green"
                    placeholder="email@contato.pt"
                  />
                  {" "} para solicitar um orçamento de {" "}
                  <span className="inline-block relative group">
                    <select className="appearance-none bg-transparent border-b-2 border-primary-green/20 focus:border-primary-green focus:outline-none px-4 py-1 pr-10 cursor-pointer font-bold text-primary-green transition-all">
                      {services.map((service, idx) => (
                        <option key={idx} className="bg-white text-dark-green font-sans text-sm">{service}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-primary-green pointer-events-none transition-transform group-hover:scale-110" size={18} />
                  </span>
                  . <br className="hidden md:block" />
                  Pretendo adicionar que: {" "}
                  <textarea
                    className="w-full bg-white/30 backdrop-blur-sm rounded-3xl p-8 mt-6 border-transparent focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-dark-green text-lg md:text-xl placeholder:text-gray-300 h-40 resize-none leading-relaxed"
                    placeholder="Ex: Tenho 20 computadores e 5 impressoras para recolha na zona de Coimbra..."
                  ></textarea>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-12">
                  {/* Photo Upload - Minimalist Icon Trigger */}
                  <label className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg border border-green-50 group-hover:bg-primary-green group-hover:text-white transition-all duration-500 shrink-0">
                      <Upload size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-dark-green group-hover:text-primary-green transition-colors uppercase tracking-widest">Anexar Fotografias</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Opcional (Máx 5MB)</p>
                    </div>
                    <input type="file" className="hidden" multiple accept="image/*" />
                  </label>

                  <Button className="w-full md:w-auto px-16 h-20 text-xl font-black shadow-[0_30px_60px_-15px_rgba(14,103,44,0.2)] hover:shadow-[0_40px_80px_-20px_rgba(14,103,44,0.3)] hover:scale-[1.02] active:scale-[0.98] transform transition-all group flex items-center justify-center gap-4">
                    Enviar Mensagem
                    <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} strokeWidth={2.5} />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 opacity-30">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em]">Resposta em 24h úteis</p>
                  <div className="hidden sm:block w-8 h-px bg-dark-green/40" />
                  <p className="text-[9px] font-black uppercase tracking-[0.3em]">Privacidade Garantida</p>
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
