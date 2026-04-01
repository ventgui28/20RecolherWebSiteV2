"use client";

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Truck, Recycle, Calendar } from 'lucide-react';
import Container from "@/components/ui/Container";
import { STATS } from "@/constants/stats";
import { cn } from "@/lib/utils";

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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

export default function HomeStats() {
  return (
    <section className="relative z-20 py-12 md:py-0 -mt-20 md:-mt-24 pointer-events-none">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto"
        >
          {/* Main Floating Bar */}
          <div className="bg-white/90 backdrop-blur-2xl border border-white shadow-[0_30px_100px_-20px_rgba(14,103,44,0.15)] rounded-[3rem] md:rounded-full p-6 md:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 relative">
              
              {STATS.map((stat, idx) => {
                const IconComponent = IconMap[stat.icon];
                
                return (
                  <div key={idx} className="relative group">
                    <div className="flex flex-col items-center text-center px-4">
                      
                      {/* Icon & Label Row */}
                      <div className="flex items-center gap-2 mb-2 text-primary-green opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        {IconComponent && <IconComponent className="w-3.5 h-3.5 stroke-[2.5]" />}
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                          {stat.label}
                        </span>
                      </div>

                      {/* Animated Number */}
                      <div className="text-3xl md:text-5xl font-heading font-black text-dark-green tracking-tighter group-hover:scale-105 transition-transform duration-500">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </div>
                    </div>

                    {/* Subtle Vertical Divider (only on large screens) */}
                    {idx < STATS.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 w-px h-12 bg-green-100/50 -translate-y-1/2" />
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
