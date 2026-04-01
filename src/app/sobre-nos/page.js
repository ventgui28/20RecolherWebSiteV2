"use client";

import { motion } from 'framer-motion';
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRAND } from "@/constants/brand";

export default function AboutPage() {
  return (
    <div className="py-20 md:py-32 bg-green-mist bg-grain overflow-hidden relative min-h-screen">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <Container className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading 
            centered
            title={`Nossa Jornada pela Sustentabilidade`}
            subtitle={`Conheça a história e os valores que movem a ${BRAND.name} rumo a um futuro tecnológico mais limpo.`}
          />
        </motion.div>

        {/* Content Section - Minimalist & Floating */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-5xl font-heading text-dark-green mb-8 leading-tight">
              Uma missão focada na <span className="text-primary-green italic underline decoration-green-100 decoration-8 underline-offset-4">Economia Circular.</span>
            </h2>
            <div className="space-y-8 text-lg text-gray-500 font-medium leading-relaxed">
              <p>
                A 20recolher nasceu com a visão clara de simplificar a gestão de resíduos tecnológicos em Portugal. O nosso foco principal é a recolha de material informático obsoleto e o seu encaminhamento para centros de reciclagem certificados.
              </p>
              <p>
                Acreditamos que o lixo tecnológico não deve ser visto como um problema, mas como uma oportunidade de recuperar recursos valiosos e proteger o nosso ecossistema.
              </p>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-12 p-10 bg-green-50/50 rounded-[2.5rem] border border-green-100 shadow-sm relative overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-dark-green text-xl font-bold italic leading-relaxed">
                  &ldquo;{BRAND.quote}&rdquo;
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 text-8xl opacity-10 grayscale">♻️</div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center items-center relative"
          >
            {/* Minimalist Floating Office Visual */}
            <div className="relative z-20 text-[180px] md:text-[220px] drop-shadow-[0_30px_50px_rgba(14,103,44,0.15)] animate-float">
               🏢
            </div>
            <div className="absolute w-[80%] h-[80%] bg-primary-green/5 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Floating floating elements */}
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 right-10 bg-white p-6 rounded-3xl shadow-xl border border-green-50 z-30"
            >
               <span className="text-3xl">🛡️</span>
            </motion.div>
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-10 left-10 bg-white p-6 rounded-3xl shadow-xl border border-green-50 z-30"
            >
               <span className="text-3xl">📜</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section - Premium Cards */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-50/20 rounded-[4rem] -mx-4 md:-mx-12 pointer-events-none" />
          
          <div className="relative py-20 px-4 md:px-12">
            <SectionHeading 
              centered
              title="Nossos Pilares"
              subtitle="Valores que guiam cada decisão e cada recolha que realizamos."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
              {BRAND.values.map((v, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-primary-green/5 transition-all duration-500 border border-gray-100 group text-center"
                >
                  <div className="text-7xl mb-8 transform group-hover:scale-110 transition-transform duration-500 bg-green-50 w-24 h-24 flex items-center justify-center rounded-[2rem] mx-auto group-hover:bg-primary-green group-hover:text-white transition-colors">
                    {v.icon}
                  </div>
                  <h3 className="text-2xl font-heading text-dark-green mb-4">{v.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
