"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Monitor, Cpu, BatteryCharging, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES } from "@/constants/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

// Icon mapping to render Lucide components dynamically
const IconMap = {
  Monitor: Monitor,
  Cpu: Cpu,
  BatteryCharging: BatteryCharging
};

export default function HomeServices() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-green-mist bg-grain relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading 
            centered
            title="Nossas Especialidades de Recolha"
            subtitle="Soluções profissionais e certificadas para o descarte responsável do seu hardware."
            className="mb-16 md:mb-20"
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICES.map((service, index) => {
            const IconComponent = IconMap[service.icon];
            
            return (
              <motion.div 
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative h-[480px] rounded-[2.5rem] overflow-hidden bg-white shadow-lg border border-green-50"
              >
                {/* Background Image - Natural */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradiente de proteção para o texto - mais escuro e sólido na base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-dark-green/40 to-transparent opacity-90" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
                  
                  {/* Badge - Top Right for clarity */}
                  <div className="flex justify-end mb-auto">
                    <div className="bg-primary-green text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                      {service.badge}
                    </div>
                  </div>

                  {/* Icon & Title Group */}
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary-green">
                      {IconComponent && <IconComponent className="w-7 h-7" />}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-heading text-white leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[280px]">
                      {service.desc}
                    </p>
                  </div>

                  {/* Simple Footer Link */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-black text-primary-green uppercase tracking-widest">Saber Mais</span>
                    <Link href="/servicos">
                      <div className="w-10 h-10 rounded-full bg-white text-dark-green flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-all shadow-sm">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
