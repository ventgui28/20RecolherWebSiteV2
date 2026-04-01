"use client";

import { motion } from 'framer-motion';
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { CONTACTS } from "@/constants/contact";

export default function ContactPage() {
  const contactItems = [
    { label: "Onde estamos", value: CONTACTS.address, icon: "📍" },
    { label: "Linha Direta", value: CONTACTS.phone, icon: "📞" },
    { label: "E-mail Geral", value: CONTACTS.email, icon: "✉️" },
    { label: "Disponibilidade", value: CONTACTS.workingHours, icon: "⏰" },
  ];

  return (
    <div className="py-20 md:py-32 bg-stone-fine bg-grain overflow-hidden relative min-h-screen">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <Container className="relative z-10">
        {/* Header Section */}
        <SectionHeading 
          centered
          title="Vamos Conversar?"
          subtitle="A nossa equipa está pronta para ajudar a sua empresa a gerir resíduos de forma eficiente e sustentável."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {contactItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start gap-6 p-6 rounded-3xl hover:bg-green-50 transition-colors duration-500"
                >
                  <div className="text-4xl bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-green-50 group-hover:scale-110 group-hover:bg-primary-green group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                    <p className="text-lg font-bold text-dark-green leading-tight">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Integration - Minimalist Borderless Feel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[350px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group"
            >
              <iframe
                src={CONTACTS.mapsIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-green-100/20 rounded-[3rem]" />
            </motion.div>
          </div>

          {/* Form Column - Floating Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(14,103,44,0.12)] border border-white relative"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-heading text-dark-green mb-10">Pedido de Orçamento</h2>
              
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Seu Nome</label>
                    <input
                      type="text"
                      className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-transparent focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Empresarial</label>
                    <input
                      type="email"
                      className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-transparent focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300"
                      placeholder="email@empresa.pt"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Tipo de Material</label>
                  <select className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-transparent focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green appearance-none cursor-pointer">
                    <option>Informática & Servidores</option>
                    <option>Resíduos Eletrónicos (REEE)</option>
                    <option>Consumíveis & Baterias</option>
                    <option>Outros Equipamentos</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Lista de Equipamentos</label>
                  <textarea
                    className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-transparent focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all font-bold text-dark-green placeholder:text-gray-300 h-40 resize-none"
                    placeholder="Descreva brevemente o que pretende recolher..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <Button className="w-full h-20 text-xl font-black shadow-2xl shadow-primary-green/30 hover:scale-[1.02] active:scale-[0.98] transform transition-all">
                    Enviar Solicitação 🚀
                  </Button>
                  <p className="text-center text-xs text-gray-400 font-bold mt-6 uppercase tracking-widest">
                    Resposta garantida em 24h úteis
                  </p>
                </div>
              </form>
            </div>
            
            {/* Soft decorative blob for the form */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
