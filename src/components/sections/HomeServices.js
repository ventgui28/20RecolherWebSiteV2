"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICES } from "@/constants/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

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
    <section className="py-24 bg-white">
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
          {SERVICES.map((service) => (
            <motion.div 
              key={service.id}
              variants={cardVariants}
              className="group relative p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-primary-green/10 hover:-translate-y-2"
            >
              <div className="text-6xl mb-8 bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary-green group-hover:text-white transition-all duration-500">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-heading text-dark-green mb-4 group-hover:text-primary-green transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed mb-8">
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {service.items.slice(0, 3).map((item, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-green-100/50 text-dark-green rounded-full">
                    {item}
                  </span>
                ))}
              </div>

              <Link 
                href="/servicos" 
                className="inline-flex items-center text-primary-green font-bold group-hover:gap-3 gap-2 transition-all"
              >
                Saber Mais <span className="text-xl">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
