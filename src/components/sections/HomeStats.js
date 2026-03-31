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
    <section className="py-32 relative overflow-hidden bg-white">
      {/* Soft background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-green/5 rounded-full blur-[100px] pointer-events-none" />
      
      <Container>
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
              <div className="bg-white p-10 rounded-[2.5rem] border border-green-50 shadow-[0_10px_40px_-15px_rgba(14,103,44,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(14,103,44,0.12)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center">
                
                {/* Icon Circle */}
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-primary-green group-hover:text-white transition-all duration-500">
                  {stat.icon}
                </div>

                {/* Number */}
                <div className="text-5xl md:text-6xl font-heading font-black text-dark-green mb-4 tracking-tighter">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary-green mb-4">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  {stat.description}
                </p>

                {/* Decorative border line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary-green rounded-full transition-all duration-500 group-hover:w-1/3" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
