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

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    servico: 'Recolha REEE\'s (Eletrónicos)',
    mensagem: '',
    hp_field: '' // Honeypot field
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.hp_field) return; // Se preenchido, é um bot
    
    // Lógica de envio real aqui
    console.log("Formulário válido:", formData);
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <div className="relative min-h-screen bg-white font-body overflow-hidden">
      {/* Immersive Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-primary-green/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-15%] left-[-10%] w-[70vw] h-[70vw] bg-emerald-green/5 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-grain opacity-[0.02]" />
      </div>

      <Container className="pt-32 pb-32 relative z-10">
        {/* Pro-Max Header */}
        <div className="grid lg:grid-cols-2 gap-20 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-1 bg-primary-green rounded-full shadow-[0_0_15px_rgba(142,179,31,0.6)]" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-green">Suporte & Logística</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-10">
              Vamos <br />
              <span className="text-primary-green italic">Conectar.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Solicite a sua recolha tecnológica com um operador certificado. Resposta garantida em menos de 24 horas.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center min-h-[400px]"
          >
            {/* Premium Tech Stack Visual */}
            <div className="relative w-full max-w-[400px]">
              {/* Back Plate */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-primary-green/5 backdrop-blur-3xl rounded-[2.5rem] border border-primary-green/20 -rotate-6 z-0"
              />
              
              {/* Middle Plate */}
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-48 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl z-10 flex flex-col items-center justify-center p-8"
              >
                <div className="w-12 h-12 bg-primary-green/20 rounded-xl flex items-center justify-center text-primary-green mb-4">
                  <ShieldCheck size={24} />
                </div>
                <p className="text-[10px] font-black text-dark-green uppercase tracking-[0.3em] text-center">Certificação Total CCDRC</p>
                <div className="mt-4 flex gap-1">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-primary-green rounded-full" />)}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -left-4 bg-white p-5 rounded-3xl shadow-xl z-20 border border-slate-100 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                  <Leaf size={18} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Eco-Friendly</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Symmetry Grid (6+6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left: Professional Form (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white rounded-[3.5rem] p-10 md:p-16 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden group"
          >
             <div className="relative z-10 mb-14">
              <div className="flex items-center gap-6 mb-4">
                <div className="w-16 h-16 bg-dark-green text-primary-green rounded-2xl flex items-center justify-center shadow-2xl shadow-dark-green/20 group-hover:rotate-6 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-dark-green tracking-tighter">Pedido Digital.</h2>
                  <p className="text-primary-green font-black text-[10px] uppercase tracking-[0.3em]">Canais Encriptados</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.4em] ml-2">Identificação</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-dark-green text-sm shadow-sm"
                    placeholder="Nome Completo ou Empresa"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.4em] ml-2">Email</label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-dark-green text-sm shadow-sm"
                    placeholder="contacto@exemplo.pt"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.4em] ml-2">Finalidade do Contacto</label>
                <div className="relative group/select">
                  <select 
                    value={formData.servico}
                    onChange={(e) => setFormData({...formData, servico: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-dark-green text-sm appearance-none cursor-pointer"
                  >
                    {services.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-primary-green pointer-events-none group-focus-within/select:rotate-[270deg] transition-transform" size={18} strokeWidth={3} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.4em] ml-2">Mensagem</label>
                <textarea
                  required
                  maxLength={2000}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  className="w-full h-44 px-8 py-6 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-green focus:bg-white outline-none transition-all font-bold text-dark-green text-sm resize-none shadow-sm"
                  placeholder="Como podemos ajudar na sua gestão de resíduos?"
                ></textarea>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-6">
                <label className="flex-1 h-20 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary-green hover:bg-primary-green/5 cursor-pointer transition-all group/upload">
                  <Upload size={20} className="text-slate-400 mr-3 group-hover/upload:text-primary-green group-hover/upload:scale-110 transition-all" />
                  <span className="text-[10px] font-black text-slate-400 group-hover/upload:text-primary-green uppercase tracking-[0.3em] transition-colors">Anexar Fotos</span>
                  <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
                </label>
                
                <button className="flex-[1.5] h-20 bg-dark-green text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-primary-green hover:shadow-[0_20px_40px_-10px_rgba(142,179,31,0.4)] hover:-translate-y-1 transition-all group/btn">
                  Submeter Pedido
                  <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
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
