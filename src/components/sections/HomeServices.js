"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Monitor, Cpu, BatteryCharging } from 'lucide-react';
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-green/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading 
            centered
            title="Soluções para o seu Negócio"
            subtitle="Oferecemos serviços especializados para cada necessidade de reciclagem tecnológica da sua empresa."
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => {
            const IconComponent = IconMap[service.icon];
            
            return (
              <motion.div 
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -15 }}
                className="group relative bg-white rounded-[3rem] border border-green-50 shadow-[0_10px_40px_-15px_rgba(14,103,44,0.05)] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(14,103,44,0.15)] hover:border-primary-green/20 overflow-hidden"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                </div>

                <div className="relative z-10 p-10 -mt-16">
                  {/* Icon with interactive background */}
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="mb-8 bg-white w-20 h-20 rounded-[2rem] shadow-xl flex items-center justify-center border border-green-50 group-hover:bg-primary-green group-hover:text-white transition-all duration-500 group-hover:shadow-primary-green/20"
                  >
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 stroke-[1.5] group-hover:drop-shadow-[0_5px_15px_rgba(255,255,255,0.4)] transition-all" />
                    )}
                  </motion.div>
                  
                  <h3 className="text-2xl font-heading font-black text-dark-green mb-4 group-hover:text-primary-green transition-colors leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-500 text-base leading-relaxed mb-8">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.items.slice(0, 3).map((item, i) => (
                      <span 
                        key={i} 
                        className="text-[9px] font-black uppercase tracking-[0.1em] px-3 py-1.5 bg-green-50 text-dark-green rounded-lg border border-green-100 group-hover:border-primary-green/20 transition-all"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href="/servicos" 
                    className="inline-flex items-center gap-2 text-primary-green font-black uppercase tracking-widest text-[10px] group/link"
                  >
                    <span className="relative">
                      Saber Mais
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green transition-all group-hover/link:w-full" />
                    </span>
                    <motion.span 
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xl"
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
