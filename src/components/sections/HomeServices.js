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
                whileHover="hover"
                className="group relative h-[600px] rounded-[3rem] overflow-hidden bg-white shadow-xl border-2 border-transparent transition-all duration-500 hover:border-primary-green hover:shadow-2xl hover:shadow-primary-green/10"
              >
                {/* Background Image & Overlays */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-dark-green/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                  
                  {/* Top Badge */}
                  <div className="absolute top-8 left-8">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary-green" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{service.badge}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 w-16 h-16 rounded-2xl bg-primary-green/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-primary-green transition-colors duration-500">
                    {IconComponent && <IconComponent className="w-8 h-8" />}
                  </div>

                  <h3 className="text-3xl font-heading text-white mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm font-medium leading-relaxed mb-6 group-hover:hidden transition-all">
                    {service.desc}
                  </p>

                  {/* Animated List Reveal */}
                  <motion.div 
                    variants={{
                      hover: { opacity: 1, height: "auto", marginBottom: "24px" }
                    }}
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-primary-green font-black text-[10px] uppercase tracking-widest mb-4">Itens Incluídos:</p>
                    <ul className="space-y-2">
                      {service.items.slice(0, 4).map((item, i) => (
                        <li key={i} className="text-white/80 text-xs font-bold flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary-green" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                      {service.advantage}
                    </p>
                    <Link href="/servicos" className="text-white hover:text-primary-green transition-colors">
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-dark-green transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Animated Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-green/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl group-hover:bg-primary-green/30 transition-all" />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
