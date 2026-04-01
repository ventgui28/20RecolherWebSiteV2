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
            
            // Bento Grid Span Logic with explicit heights for all screen sizes
            const spans = [
              "lg:col-span-8 h-[480px] sm:h-[550px] lg:h-[500px]", // Wide Main
              "lg:col-span-4 h-[480px] sm:h-[550px] lg:h-[500px]", // Tall Side
              "lg:col-span-12 h-[350px] sm:h-[450px] lg:h-[400px]" // Wide Footer
            ];

            return (
              <motion.div 
                key={service.id}
                variants={cardVariants}
                className={cn(
                  "group relative rounded-[2.5rem] overflow-hidden bg-muted-bg border border-green-50 shadow-sm flex flex-col",
                  spans[index] || "lg:col-span-4 h-[450px]"
                )}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover saturate-[0.6] transition-all duration-1000 ease-out group-hover:scale-105 group-hover:saturate-[0.9]"
                  />
                  {/* Refined Overlays for better depth and legibility */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    index === 0 ? "bg-gradient-to-r from-dark-green/95 via-dark-green/60 to-transparent md:from-dark-green/90 md:via-dark-green/40" :
                    index === 1 ? "bg-gradient-to-t from-dark-green/95 via-dark-green/60 to-transparent md:from-dark-green/90 md:via-dark-green/30" :
                    "bg-gradient-to-r from-dark-green/90 via-dark-green/40 to-transparent md:from-dark-green/80 md:via-dark-green/20"
                  )} />
                </div>

                {/* Content Container - Flex grow ensures it takes up space and stays inside */}
                <div className={cn(
                  "relative z-10 flex-grow p-8 md:p-12 flex flex-col justify-end",
                  index === 0 ? "lg:w-2/3" : "w-full"
                )}>
                  {/* Decorative number - moved to be safer */}
                  <div className="absolute top-8 right-8 text-white/10 font-heading text-7xl font-black select-none pointer-events-none group-hover:text-white/20 transition-all duration-700">
                    0{index + 1}
                  </div>

                  {/* Icon Badge */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary-green group-hover:border-primary-green transition-all duration-500 shadow-xl">
                      {IconComponent && <IconComponent className="w-7 h-7 stroke-[1.5]" />}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-4 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-green-50/90 text-base md:text-lg leading-relaxed mb-6 max-w-xl line-clamp-3 md:line-clamp-none">
                    {service.desc}
                  </p>

                  {/* Tags list - more stable transition */}
                  <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 hidden sm:flex">
                    {service.items.slice(0, 3).map((item, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href="/servicos" 
                    className="inline-flex items-center gap-3 group/link w-fit"
                  >
                    <span className="px-6 py-3 rounded-full bg-primary-green text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary-green/20 hover:bg-white hover:text-dark-green transition-all duration-300 flex items-center gap-2">
                      Saber Mais
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </span>
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
