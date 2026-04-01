"use client";

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Truck, Recycle, Calendar } from 'lucide-react';
import Container from "@/components/ui/Container";
import { STATS } from "@/constants/stats";

// Icon mapping to render Lucide components dynamically
const IconMap = {
  Users: Users,
  Truck: Truck,
  Recycle: Recycle,
  Calendar: Calendar
};

function AnimatedNumber({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: [0.33, 1, 0.68, 1],
        onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <motion.span 
      ref={ref} 
      className="tabular-nums"
      animate={displayValue === value ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      {displayValue}{suffix}
    </motion.span>
  );
}

export default function HomeStats() {
  return (
    <section className="relative z-30 py-12 md:py-0 -mt-24 md:-mt-32 pointer-events-none">
      <Container>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto"
        >
          {/* High-Impact Dark Floating Bar */}
          <div className="bg-gradient-to-br from-dark-green via-forest-green to-dark-green border border-white/10 shadow-[0_40px_100px_-20px_rgba(14,103,44,0.4)] rounded-[3rem] md:rounded-full p-8 md:p-14 relative overflow-hidden">
            
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-full bg-primary-green/10 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-4 relative z-10">
              
              {STATS.map((stat, idx) => {
                const IconComponent = IconMap[stat.icon];
                
                return (
                  <div key={idx} className="relative group">
                    <div className="flex flex-col items-center text-center px-4">
                      
                      {/* Icon & Label Row */}
                      <div className="flex items-center gap-2 mb-4 text-primary-green/80 group-hover:text-primary-green transition-all duration-500">
                        {IconComponent && <IconComponent className="w-4 h-4 stroke-[2.5]" />}
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-green-50/50 group-hover:text-green-50 transition-colors">
                          {stat.label}
                        </span>
                      </div>

                      {/* Animated Number */}
                      <div className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-500">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </div>
                    </div>

                    {/* Subtle Vertical Divider (only on large screens) */}
                    {idx < STATS.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 w-px h-16 bg-white/10 -translate-y-1/2" />
                    )}
                  </div>
                );
              })}

            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
