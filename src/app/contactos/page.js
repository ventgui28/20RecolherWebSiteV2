"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Upload, ChevronRight, Send, ArrowRight, ExternalLink, Leaf, Recycle, ShieldCheck, Zap, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONTACTS } from "@/constants/contact";

// Importar o mapa de forma dinâmica para evitar erros de SSR com Leaflet
const CustomMap = dynamic(() => import('@/components/ui/CustomMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-eco-green/5 animate-pulse rounded-[4rem]" />
});

export default function ContactPage() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file
    }));
    setImages(prev => [...prev, ...newImages]);
    
    // Resetar o valor do input para permitir selecionar a mesma imagem novamente
    e.target.value = '';
  };

  const removeImage = (id) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) URL.revokeObjectURL(imageToRemove.url);
      return filtered;
    });
  };

  const contactItems = [
    { label: "Onde Estamos", value: CONTACTS.address, icon: MapPin, color: "bg-eco-emerald", delay: 0.1 },
    { label: "Atendimento", value: CONTACTS.phone, icon: Phone, color: "bg-eco-green", delay: 0.2 },
    { label: "E-mail", value: CONTACTS.email, icon: Mail, color: "bg-eco-teal", delay: 0.3 },
    { label: "Horário", value: CONTACTS.workingHours, icon: Clock, color: "bg-eco-lime", delay: 0.4 },
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
    <div className="relative min-h-screen bg-[#fcfdfc] font-body-organic overflow-hidden">
      {/* Immersive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Mesh Blobs */}
        <motion.div 
          animate={{ 
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[100vw] h-[100vw] bg-gradient-radial from-eco-green/20 via-eco-emerald/5 to-transparent rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[90vw] h-[90vw] bg-gradient-radial from-eco-lime/15 via-eco-teal/5 to-transparent rounded-full blur-[150px]" 
        />
        <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-eco-yellow/10 rounded-full blur-[100px]" />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
      </div>

      <Container className="pt-24 pb-32 relative z-10">
        {/* Vibrant Hero Header */}
        <header className="max-w-5xl mb-24 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-eco-green/10 text-eco-green text-xs font-bold uppercase tracking-[0.3em] mb-10 border border-eco-green/20">
              <Zap size={14} className="animate-pulse" />
              Energia Sustentável
            </span>
            <h1 className="text-7xl md:text-9xl font-heading-organic font-bold text-slate-900 leading-[0.9] tracking-[-0.04em] mb-12">
              Dê vida ao seu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-green via-eco-emerald to-eco-teal animate-gradient-x">lixo tecnológico.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-500 font-light leading-relaxed max-w-3xl mx-auto italic">
              "Transformamos o obsoleto em oportunidade. Conecte-se com a economia circular."
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Vibrant Info Grid - 7 Columns */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bento-Inspired Vibrant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_50px_-15px_rgba(34,197,94,0.1)] hover:shadow-[0_30px_60px_-10px_rgba(34,197,94,0.2)] transition-all duration-500"
                >
                  <div className={`w-16 h-16 rounded-[1.5rem] ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-8`}>
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                  <p className="text-xl font-bold text-slate-800 leading-tight group-hover:text-eco-green transition-colors">{item.value}</p>
                  
                  {/* Decorative Leaf */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity">
                    <Leaf size={40} className="text-eco-green" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Section - Organic Biophilic Glass Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] md:aspect-[4/3] rounded-[4rem] overflow-hidden border-[12px] border-white shadow-[0_40px_100px_-20px_rgba(34,197,94,0.2)] group"
            >
              <CustomMap />
              
              {/* Floating Glass Control Panel */}
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur-2xl rounded-[3rem] border border-white/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 z-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-14 h-14 bg-eco-green/10 rounded-2xl flex items-center justify-center text-eco-green">
                      <MapPin size={24} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-eco-green rounded-full border-2 border-white animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-eco-emerald uppercase tracking-[0.3em]">Centro de Operações</p>
                    <p className="text-slate-900 font-black text-lg">Cantanhede, Portugal</p>
                  </div>
                </div>
                
                <a 
                  href={CONTACTS.googleMapsUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-8 h-16 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-eco-green hover:shadow-xl hover:shadow-eco-green/20 transition-all duration-500 flex items-center justify-center gap-3 group/btn"
                >
                  Abrir no Google Maps
                  <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Column 2: The Vibrant Form - 5 Columns */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-br from-white to-eco-green/5 rounded-[4rem] p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(34,197,94,0.15)] border border-white relative overflow-hidden"
          >
            {/* Animated Blob Background */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-eco-lime/10 blur-3xl rounded-full animate-pulse" />
            
            <div className="relative z-10 mb-14">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-eco-green text-white rounded-2xl shadow-lg shadow-eco-green/20">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-4xl font-heading-organic font-bold text-slate-900 tracking-tight">Orçamento Vivo</h2>
                  <p className="text-eco-emerald font-bold text-xs uppercase tracking-widest">Resposta em tempo real</p>
                </div>
              </div>
              <p className="text-slate-500 text-lg font-light leading-relaxed">Pronto para dar o próximo passo na sua jornada eco-responsável? A nossa equipa está à espera do seu sinal.</p>
            </div>
            
            <form className="relative z-10 space-y-10">
              <div className="space-y-8">
                <div className="relative group">
                  <label className="block text-[10px] font-bold text-eco-green uppercase tracking-[0.2em] mb-2 ml-2">Identificação / Empresa</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border-2 border-slate-100 rounded-2xl focus:border-eco-green focus:bg-white outline-none transition-all font-bold text-slate-800 text-lg shadow-sm"
                    placeholder="Quem nos contacta?"
                  />
                </div>

                <div className="relative group">
                  <label className="block text-[10px] font-bold text-eco-green uppercase tracking-[0.2em] mb-2 ml-2">E-mail Institucional</label>
                  <input
                    type="email"
                    required
                    className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border-2 border-slate-100 rounded-2xl focus:border-eco-green focus:bg-white outline-none transition-all font-bold text-slate-800 text-lg shadow-sm"
                    placeholder="email@empresa.pt"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-eco-green uppercase tracking-[0.2em] mb-2 ml-2">Serviço de Interesse</label>
                  <div className="relative">
                    <select className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border-2 border-slate-100 rounded-2xl focus:border-eco-green focus:bg-white outline-none transition-all font-bold text-slate-800 text-lg appearance-none cursor-pointer shadow-sm">
                      {services.map((service, idx) => (
                        <option key={idx} value={service}>{service}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-eco-green pointer-events-none" size={20} />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-[10px] font-bold text-eco-green uppercase tracking-[0.2em] mb-2 ml-2">Detalhes do Pedido</label>
                  <textarea
                    required
                    className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border-2 border-slate-100 rounded-2xl focus:border-eco-green focus:bg-white outline-none transition-all font-bold text-slate-800 text-lg shadow-sm h-32 resize-none"
                    placeholder="Como podemos ajudar hoje?"
                  ></textarea>
                </div>
              </div>

              {/* Vibrant Upload Zone */}
              <div className="space-y-6">
                <label className="block text-[10px] font-bold text-eco-green uppercase tracking-[0.2em] mb-2 ml-2">Fotos do Resíduo (Opcional)</label>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {images.map((img) => (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md group/img"
                      >
                        <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-lg opacity-0 group-hover/img:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                        >
                          <X size={16} strokeWidth={3} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-eco-green/20 rounded-3xl hover:border-eco-green/50 hover:bg-eco-green/5 cursor-pointer transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-eco-green/10 text-eco-green flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload size={20} strokeWidth={2} />
                    </div>
                    <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-eco-green transition-colors">Adicionar</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      multiple 
                      accept="image/*" 
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-[10px] text-slate-400 italic px-2">Ajuda na precisão do orçamento e triagem inicial.</p>
              </div>

              <div className="pt-6">
                <button className="group w-full h-20 bg-gradient-to-r from-eco-green to-eco-emerald text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 shadow-xl shadow-eco-green/20 hover:shadow-eco-green/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                  <span className="relative z-10">Enviar Orçamento agora</span>
                  <Send className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" size={18} />
                  
                  {/* Gloss Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>
                
                <p className="text-center mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                  <Clock size={12} className="text-eco-green" />
                  Compromisso 20Recolher: Resposta em 24h
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
