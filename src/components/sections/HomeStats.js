"use client";

import { motion, useInView } from 'framer-motion';
import Container from "@/components/ui/Container";
import { useRef, useState, useEffect } from 'react';

function Counter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const target = parseInt(value);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      if (start === end) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = (totalMiliseconds / end);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function HomeStats() {
  const stats = [
    { label: "Toneladas Recicladas", value: "500+", icon: "♻️" },
    { label: "Empresas Parceiras", value: "120+", icon: "🤝" },
    { label: "Anos de Experiência", value: "10+", icon: "📅" },
    { label: "Equipamentos Processados", value: "50k+", icon: "💻" }
  ];

  return (
    <section className="py-24 bg-dark-green relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green opacity-20 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-green opacity-20 rounded-full -ml-32 -mb-32 blur-3xl" />
      
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl mb-6 transform group-hover:scale-125 transition-transform duration-500">
                {stat.icon}
              </div>
              
              <div className="text-5xl md:text-6xl font-heading text-white font-black mb-4 tracking-tight">
                <Counter value={stat.value} />
              </div>

              <div className="text-green-100 font-bold uppercase tracking-[0.2em] text-[10px] opacity-70 group-hover:opacity-100 transition-opacity">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
