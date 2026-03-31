"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICES } from "@/constants/services";
import Container from "@/components/ui/Container";

export default function HomeServices() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-dark-green leading-tight">
              Especialistas em <span className="italic text-primary-green">Circularidade.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 font-bold uppercase tracking-widest text-sm md:text-right"
          >
            Soluções de Gestão de Resíduos <br /> para o Século XXI
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`lg:col-span-4 group ${
                idx === 1 ? 'lg:translate-y-24' : idx === 2 ? 'lg:-translate-y-12 lg:col-start-9' : ''
              }`}
            >
              <div className="relative p-12 bg-gray-50 rounded-[3rem] transition-all duration-700 hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-transparent hover:border-green-50 overflow-hidden h-full flex flex-col">
                <div className="text-7xl mb-12 transform group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl text-dark-green mb-6 group-hover:text-primary-green transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-lg mb-8 flex-grow">
                  {service.desc}
                </p>

                <ul className="space-y-4 mb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.items.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-sm font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-green"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/servicos" 
                  className="inline-flex items-center text-dark-green font-black text-sm uppercase tracking-widest group-hover:gap-4 gap-2 transition-all"
                >
                  View Details <span className="text-xl">→</span>
                </Link>

                {/* Decorative Number */}
                <div className="absolute -right-8 -bottom-8 text-9xl font-black text-green-100 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
                  0{idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
