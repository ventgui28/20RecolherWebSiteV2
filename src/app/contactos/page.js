"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Upload, ChevronRight, Send, ArrowRight, ExternalLink } from 'lucide-react';
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONTACTS } from "@/constants/contact";

export default function ContactPage() {
  const contactItems = [
    { label: "Onde Estamos", value: CONTACTS.address, icon: MapPin, delay: 0.1, size: "col-span-1 md:col-span-2" },
    { label: "Atendimento", value: CONTACTS.phone, icon: Phone, delay: 0.2, size: "col-span-1" },
    { label: "E-mail", value: CONTACTS.email, icon: Mail, delay: 0.3, size: "col-span-1" },
    { label: "Horário", value: CONTACTS.workingHours, icon: Clock, delay: 0.4, size: "col-span-1 md:col-span-2" },
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
    <div className="relative min-h-screen bg-premium-white font-body-premium overflow-hidden">
      {/* Liquid Background Elements - Premium Palette */}
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-premium-gold/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-premium-black/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="pt-20 pb-32 relative z-10">
        {/* Luxury Hero Header */}
        <header className="max-w-5xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-premium-black text-premium-white text-[10px] font-bold uppercase tracking-[0.4em] mb-10">
              <span className="w-1.5 h-1.5 bg-premium-gold rounded-full animate-pulse" />
              Contact High-End
            </span>
            <h1 className="text-7xl md:text-9xl font-heading-premium font-normal text-premium-black leading-[0.85] tracking-[-0.05em] mb-12">
              The Art of <br />
              <span className="italic text-premium-gold">Sustainability.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-premium-slate font-light leading-tight max-w-3xl border-l-2 border-premium-gold pl-8">
              Transforming industrial legacy into future-proof environmental solutions. Our specialized team is at your disposal.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Bento Grid (Contact Info & Map) - 7 Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bento Contact Items */}
            {contactItems.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.6 }}
                className={`${item.size} group relative p-10 rounded-[2.5rem] bg-white border border-premium-slate/5 hover:border-premium-gold/30 transition-all duration-700 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-premium-gold/5`}
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-premium-white border border-premium-slate/5 flex items-center justify-center text-premium-slate group-hover:bg-premium-black group-hover:text-premium-gold transition-all duration-500 mb-8">
                    <item.icon size={24} strokeWidth={1} />
                  </div>
                  <p className="text-[10px] font-bold text-premium-gold uppercase tracking-[0.3em] mb-3">{item.label}</p>
                  <p className="text-xl md:text-2xl font-medium text-premium-black leading-snug tracking-tight">{item.value}</p>
                </div>
                
                {/* Liquid Glass Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-premium-gold/0 to-premium-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}

            {/* Map Section - Bento Large */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="col-span-1 md:col-span-2 relative aspect-[4/3] md:aspect-video rounded-[3rem] overflow-hidden border border-premium-slate/5 group"
            >
              <iframe
                src={CONTACTS.mapsIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
              ></iframe>
              
              <div className="absolute inset-0 bg-premium-black/10 pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 right-8 p-8 bg-premium-black/90 backdrop-blur-2xl rounded-[2rem] border border-white/10 flex items-center justify-between transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-5">
                  <div className="w-4 h-4 bg-premium-gold rounded-full animate-ping" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-premium-gold uppercase tracking-widest">Global Headquarters</p>
                    <p className="text-white font-medium">Zona Industrial de Cantanhede</p>
                  </div>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACTS.address)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-premium-gold flex items-center justify-center text-premium-black hover:scale-110 transition-transform duration-300"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Column 2: The Liquid Glass Form - 5 Columns */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 bg-white rounded-[4rem] p-12 md:p-16 shadow-[0_40px_80px_-15px_rgba(28,25,23,0.08)] border border-premium-slate/5 relative overflow-hidden"
          >
            {/* Form Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-premium-gold/10 blur-3xl rounded-full -mr-16 -mt-16" />
            
            <div className="relative z-10 mb-16">
              <h2 className="text-5xl font-heading-premium font-normal text-premium-black mb-4">Request Quote</h2>
              <div className="w-12 h-1 bg-premium-gold mb-6" />
              <p className="text-premium-slate text-lg font-light leading-relaxed">Experience our bespoke environmental consultancy. Tailored for your specific industrial needs.</p>
            </div>
            
            <form className="relative z-10 space-y-12">
              <div className="space-y-10">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    className="peer w-full px-0 py-4 bg-transparent border-b border-premium-slate/10 focus:border-premium-gold outline-none transition-all font-medium text-premium-black text-xl placeholder:text-transparent"
                    placeholder="Full Name"
                    id="name"
                  />
                  <label 
                    htmlFor="name"
                    className="absolute left-0 top-4 text-premium-slate/40 pointer-events-none transition-all duration-300 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-premium-gold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-premium-gold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]"
                  >
                    Identificação / Empresa
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    required
                    className="peer w-full px-0 py-4 bg-transparent border-b border-premium-slate/10 focus:border-premium-gold outline-none transition-all font-medium text-premium-black text-xl placeholder:text-transparent"
                    placeholder="Email"
                    id="email"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-0 top-4 text-premium-slate/40 pointer-events-none transition-all duration-300 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-premium-gold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-premium-gold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]"
                  >
                    E-mail Institucional
                  </label>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-premium-gold uppercase tracking-[0.2em]">Serviço de Interesse</p>
                  <div className="relative">
                    <select className="w-full px-0 py-4 bg-transparent border-b border-premium-slate/10 focus:border-premium-gold outline-none transition-all font-medium text-premium-black text-xl appearance-none cursor-pointer">
                      {services.map((service, idx) => (
                        <option key={idx} value={service}>{service}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 text-premium-gold pointer-events-none" size={20} />
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    required
                    className="peer w-full px-0 py-4 bg-transparent border-b border-premium-slate/10 focus:border-premium-gold outline-none transition-all font-medium text-premium-black text-xl placeholder:text-transparent h-32 resize-none"
                    placeholder="Details"
                    id="details"
                  ></textarea>
                  <label 
                    htmlFor="details"
                    className="absolute left-0 top-4 text-premium-slate/40 pointer-events-none transition-all duration-300 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-premium-gold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-premium-gold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]"
                  >
                    Detalhes do Pedido
                  </label>
                </div>
              </div>

              {/* Minimal Upload */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-premium-gold uppercase tracking-[0.2em]">Documentation / Assets</p>
                <label className="flex items-center gap-6 p-8 border border-premium-slate/10 rounded-3xl hover:border-premium-gold/30 hover:bg-premium-gold/5 cursor-pointer transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-premium-white border border-premium-slate/5 flex items-center justify-center text-premium-slate group-hover:bg-premium-black group-hover:text-premium-gold transition-all duration-500">
                    <Upload size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium text-premium-black">Attach files</p>
                    <p className="text-xs text-premium-slate/60">Upload relevant site photos</p>
                  </div>
                  <input type="file" className="hidden" multiple accept="image/*" />
                </label>
              </div>

              <div className="pt-8">
                <button className="group w-full h-24 bg-premium-black text-premium-white hover:text-premium-gold rounded-3xl flex items-center justify-between px-10 transition-all duration-500 shadow-2xl shadow-premium-black/20 overflow-hidden relative">
                  <span className="relative z-10 text-xl font-medium tracking-tight">Initiate Partnership</span>
                  <div className="relative z-10 w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center text-premium-black group-hover:scale-110 transition-transform duration-500">
                    <ArrowRight size={22} strokeWidth={2.5} />
                  </div>
                  
                  {/* Fill Animation */}
                  <div className="absolute inset-0 bg-premium-gold/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                
                <p className="text-center mt-10 text-[10px] text-premium-slate/40 font-bold uppercase tracking-[0.4em]">
                  Guaranteed response within 24h
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
