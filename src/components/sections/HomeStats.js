"use client";

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Container from "@/components/ui/Container";
import { STATS } from "@/constants/stats";

function AnimatedNumber({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section className="py-32 relative overflow-hidden bg-dark-green">
      {/* Immersive background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-green/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-green/20 rounded-full blur-[120px]" />
        {/* Subtle grid pattern for a technical feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', size: '40px 40px' }} />
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center">
                
                {/* Icon Circle - Now with primary green glow */}
                <div className="w-16 h-16 bg-primary-green/20 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-primary-green group-hover:text-white transition-all duration-500 shadow-lg shadow-primary-green/10">
                  {stat.icon}
                </div>

                {/* Number - Now in White/Primary Green */}
                <div className="text-5xl md:text-6xl font-heading font-black text-white mb-4 tracking-tighter">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label - In Primary Green for high visibility */}
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary-green mb-4">
                  {stat.label}
                </h3>

                {/* Description - Lighter gray for dark background */}
                <p className="text-green-50/60 text-sm font-medium leading-relaxed">
                  {stat.description}
                </p>

                {/* Decorative border line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary-green rounded-full transition-all duration-500 group-hover:w-1/3 shadow-[0_0_15px_rgba(142,179,31,0.5)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
