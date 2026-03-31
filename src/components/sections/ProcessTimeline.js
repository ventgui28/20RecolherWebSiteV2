"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/constants/process";

export default function ProcessTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Elementos de fundo subtis */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-muted-bg to-transparent opacity-50" />
      
      <Container>
        <div className="text-center mb-16">
          <SectionHeading subtitle="Do lixo ao futuro">
            O Nosso Processo de Valorização
          </SectionHeading>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-medium">
            Um ciclo de excelência pensado para maximizar a sustentabilidade em cada etapa do tratamento de resíduos.
          </p>
        </div>

        <motion.div 
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Conectores Visuais (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-100 to-transparent -translate-y-16 z-0" />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div 
              key={step.id} 
              variants={itemVariants}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Ícone e Número */}
              <div className="mb-8 relative group">
                <div className={`w-24 h-24 rounded-3xl ${step.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-lg group-hover:shadow-primary-green/10`}>
                  <step.icon className={`w-10 h-10 ${step.textColor} transition-transform group-hover:scale-110`} strokeWidth={1.5} />
                </div>
                
                {/* Badge de Número */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-white border-2 border-green-50 flex items-center justify-center font-black text-sm text-primary-green shadow-sm">
                  {step.id}
                </div>
              </div>

              {/* Conteúdo */}
              <div className="text-center">
                <h3 className={`text-xl font-black mb-3 ${step.textColor} uppercase tracking-tight`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Seta/Indicador para Mobile/Tablet (opcional, omitido para minimalismo) */}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Subtil */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="px-6 py-2 bg-green-50 rounded-full border border-green-100 flex items-center gap-3 text-sm font-semibold text-forest-green">
            <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
            Processo Certificado e Monitorizado
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
