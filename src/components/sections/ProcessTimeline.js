"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/constants/process";

export default function ProcessTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-100 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-green/[0.03] blur-[120px] rounded-full" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <SectionHeading 
            centered
            subtitle="Do lixo ao futuro"
            title="O Nosso Processo de Valorização"
          />
          <p className="mt-8 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Um ciclo de excelência pensado para maximizar a sustentabilidade em cada etapa do tratamento de resíduos.
          </p>
        </motion.div>

        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Subtle connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-100 to-transparent z-0" />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative z-10 group"
            >
              {/* Step Number Badge (Top) */}
              <div className="mb-8 flex items-end gap-3 px-2">
                <span className="text-6xl font-heading font-black text-dark-green/20 group-hover:text-primary-green/40 transition-colors duration-700 leading-none select-none">
                  0{step.id}
                </span>
                <div className="mb-2 h-px flex-grow bg-green-100 group-hover:bg-primary-green/30 transition-colors duration-700" />
              </div>

              {/* Image Container with Editorial Style */}
              <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden border border-green-50 bg-white shadow-sm mb-10">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover saturate-[0.6] transition-all duration-1000 ease-out group-hover:scale-110 group-hover:saturate-[0.9]"
                />
                {/* Floating Icon Overlay */}
                <div className="absolute top-6 right-6">
                  <div className={`w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center ${step.textColor} shadow-lg transition-transform duration-500 group-hover:rotate-6`}>
                    <step.icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Content Base */}
              <div className="px-2">
                <h3 className={`text-2xl font-heading font-black mb-4 ${step.textColor} transition-colors duration-500 group-hover:text-primary-green uppercase tracking-tight`}>
                  {step.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Indicator (Mobile Connector) */}
              <div className="md:hidden mt-12 flex justify-center">
                <div className="w-px h-12 bg-gradient-to-b from-green-100 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </Container>
    </section>
  );
}
