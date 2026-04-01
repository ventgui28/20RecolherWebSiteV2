"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Monitor, Cpu, BatteryCharging, ArrowRight } from 'lucide-react';
import { SERVICES } from "@/constants/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

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
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Ambient background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-green/[0.03] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-dark-green/[0.02] blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading 
            centered
            title="Soluções para o seu Negócio"
            subtitle="Transformamos resíduos tecnológicos em novas oportunidades para a sua empresa e para o planeta."
            className="mb-16 md:mb-24"
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
        >
          {SERVICES.map((service, index) => {
            const IconComponent = IconMap[service.icon];
            
            // Bento Grid Span Logic
            const spans = [
              "lg:col-span-8 lg:h-[500px]", // Wide Main
              "lg:col-span-4 lg:h-[500px]", // Tall Side
              "lg:col-span-12 lg:h-[400px]" // Wide Footer
            ];

            return (
              <motion.div 
                key={service.id}
                variants={cardVariants}
                className={cn(
                  "group relative rounded-[2.5rem] overflow-hidden bg-muted-bg border border-green-50/50 shadow-sm",
                  spans[index] || "lg:col-span-4 h-[450px]"
                )}
              >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  {/* Dynamic Overlays based on card type */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    index === 0 ? "bg-gradient-to-r from-dark-green/90 via-dark-green/40 to-transparent" :
                    index === 1 ? "bg-gradient-to-t from-dark-green/90 via-dark-green/30 to-transparent" :
                    "bg-gradient-to-r from-dark-green/80 via-dark-green/20 to-transparent"
                  )} />
                </div>

                {/* Content Overlay */}
                <div className={cn(
                  "relative z-10 h-full p-8 md:p-12 flex flex-col justify-end",
                  index === 0 ? "lg:w-3/5" : "w-full"
                )}>
                  {/* Icon Badge */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary-green group-hover:border-primary-green transition-all duration-500 shadow-lg">
                      {IconComponent && <IconComponent className="w-7 h-7 stroke-[1.5]" />}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-4 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-green-50/80 text-lg leading-relaxed mb-8 max-w-xl">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {service.items.slice(0, 3).map((item, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-black uppercase tracking-wider px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href="/servicos" 
                    className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs group/link w-fit"
                  >
                    <span className="px-6 py-3 rounded-full bg-primary-green text-white shadow-lg shadow-primary-green/20 hover:bg-white hover:text-dark-green transition-all duration-300 flex items-center gap-2">
                      Saber Mais
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </span>
                  </Link>
                </div>

                {/* Decorative element for editorial feel */}
                <div className="absolute top-8 right-8 text-white/5 font-heading text-8xl font-black select-none pointer-events-none group-hover:text-white/10 transition-colors duration-700">
                  0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
