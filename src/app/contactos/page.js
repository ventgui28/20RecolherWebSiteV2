"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Upload, ChevronRight, Send, ShieldCheck, Zap, X, Recycle, Leaf, MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Container from "@/components/ui/Container";
import { CONTACTS } from "@/constants/contact";

// Importar o mapa de forma dinâmica para evitar erros de SSR com Leaflet
const CustomMap = dynamic(() => import('@/components/ui/CustomMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary-green/5 animate-pulse rounded-[3rem]" />
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
    { label: "Sede Central", value: CONTACTS.address, icon: MapPin, color: "bg-emerald-green" },
    { label: "Linha Direta", value: CONTACTS.phone, icon: Phone, color: "bg-primary-green" },
    { label: "Correio Digital", value: CONTACTS.email, icon: Mail, color: "bg-forest-green" },
    { label: "Disponibilidade", value: CONTACTS.workingHours, icon: Clock, color: "bg-lime-green" },
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
    <div className="relative min-h-screen bg-white font-body overflow-hidden">
      {/* Immersive Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[100vw] h-[100vw] bg-gradient-radial from-primary-green/10 via-transparent to-transparent blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[100vw] h-[100vw] bg-gradient-radial from-emerald-green/10 via-transparent to-transparent blur-[120px]" />
      </div>

      <Container className="pt-24 pb-20 relative z-10">
        {/* Balanced Header */}
        <header className="max-w-4xl mb-16 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-green/10 text-primary-green text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-primary-green/20">
              <MessageSquare size={14} className="animate-pulse" />
              Atendimento Personalizado
            </span>
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight mb-8">
              Fale com a nossa <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-green via-emerald-green to-dark-green">Equipa de Especialistas.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto italic">
              &quot;Esclareça as suas dúvidas, solicite orçamentos ou agende a sua recolha com total segurança e rapidez.&quot;
            </p>
          </motion.div>
        </header>

        {/* Symmetry Grid (6+6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left: Professional Form (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white rounded-[3rem] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(142,179,31,0.1)] border border-slate-100 relative overflow-hidden"
          >
             <div className="relative z-10 mb-12">
              <div className="flex items-center gap-5 mb-6">
                <div className="p-4 bg-primary-green text-white rounded-[1.2rem] shadow-xl shadow-primary-green/20">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">Pedido de Orçamento</h2>
                  <p className="text-emerald-green font-bold text-xs uppercase tracking-widest">Resposta em 24 horas</p>
                </div>
              </div>
            </div>

            <form className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary-green uppercase tracking-widest ml-1">Identificação</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-slate-800 text-sm shadow-sm"
                    placeholder="Nome ou Empresa"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary-green uppercase tracking-widest ml-1">Contacto Digital</label>
                  <input
                    type="email"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-slate-800 text-sm shadow-sm"
                    placeholder="email@empresa.pt"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary-green uppercase tracking-widest ml-1">Serviço Pretendido</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-slate-800 text-sm appearance-none cursor-pointer">
                    {services.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-primary-green" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary-green uppercase tracking-widest ml-1">Detalhes do Pedido</label>
                <textarea
                  required
                  className="w-full h-40 px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-slate-800 text-sm resize-none shadow-sm"
                  placeholder="Descreva as suas necessidades de gestão de resíduos..."
                ></textarea>
              </div>

              <div className="pt-4 flex flex-col md:flex-row gap-4">
                <label className="flex-1 h-16 flex items-center justify-center border-2 border-dashed border-primary-green/20 rounded-2xl hover:border-primary-green/50 hover:bg-primary-green/5 cursor-pointer transition-all group">
                  <Upload size={18} className="text-primary-green mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-primary-green uppercase tracking-widest transition-colors">Anexar Fotos</span>
                  <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
                </label>
                
                <button className="flex-[1.5] h-16 bg-gradient-to-r from-primary-green to-emerald-green text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary-green/40 hover:-translate-y-1 transition-all group">
                  Enviar Mensagem
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="flex gap-3 pt-2 overflow-x-auto scrollbar-hide">
                  <AnimatePresence>
                    {images.map((img) => (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative min-w-[60px] h-[60px] rounded-xl overflow-hidden border-2 border-white shadow-lg group/img"
                      >
                        <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => removeImage(img.id)}
                          className="absolute inset-0 bg-red-500/90 text-white opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </form>
          </motion.div>

          {/* Right: The Immersive Map (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-6 relative rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.15)] bg-slate-50 min-h-[500px]"
          >
            <CustomMap />
          </motion.div>
        </div>

        {/* Bento Info Strip Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-10px_rgba(142,179,31,0.1)] hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-primary-green/10 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                <p className="text-lg font-bold text-slate-800 leading-tight">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="flex items-center gap-3">
            <Recycle size={20} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Operador Licenciado</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Gestão Segura</span>
          </div>
          <div className="flex items-center gap-3">
            <Leaf size={20} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Sustentabilidade</span>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
