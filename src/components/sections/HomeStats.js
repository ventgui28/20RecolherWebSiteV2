"use client";

import { motion, useInView } from 'framer-motion';
import Container from "@/components/ui/Container";
import { useRef, useState, useEffect } from 'react';

function Counter({ value, duration = 2 }) {
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
    <span ref={ref} className="font-serif italic tracking-tighter">
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
    <section className="py-40 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-100 to-transparent opacity-50"></div>
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 lg:gap-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              className="relative text-center group"
            >
              <div className="flex flex-col items-center">
                <span className="text-gray-300 font-bold uppercase tracking-widest text-[10px] mb-8 group-hover:text-primary-green transition-colors">
                  {stat.label}
                </span>
                
                <div className="text-7xl md:text-8xl lg:text-9xl font-serif text-dark-green leading-none mb-4 flex items-baseline">
                  <Counter value={stat.value} />
                </div>

                <div className="h-1.5 w-8 bg-green-50 group-hover:w-16 group-hover:bg-primary-green transition-all duration-700 rounded-full"></div>
              </div>

              {/* Decorative side border for editorial feel */}
              {idx < stats.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 h-20 w-px bg-gray-100"></div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-100 to-transparent opacity-50"></div>
    </section>
  );
}
