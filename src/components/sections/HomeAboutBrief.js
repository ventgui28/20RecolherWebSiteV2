"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { BRAND } from "@/constants/brand";

export default function HomeAboutBrief() {
  const containerRef = useRef(null);
  
  // Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transformations for depth
  const blobX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const blobY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const imgX = useTransform(smoothX, [-0.5, 0.5], [15, -15]); // Opposite direction for depth
  const imgY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const cardX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const cardY = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-32 overflow-hidden relative"
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
          {/* Visual Column with Parallax */}
          <motion.div 
            {...fadeInUp}
            className="lg:w-1/2 relative flex justify-center items-center py-12"
          >
             {/* Animated Organic Blob Container with Mouse Follow */}
             <motion.div 
               style={{ x: blobX, y: blobY }}
               animate={{ 
                 borderRadius: [
                   "60% 40% 30% 70% / 60% 30% 70% 40%",
                   "30% 70% 70% 30% / 30% 30% 70% 70%",
                   "50% 50% 20% 80% / 20% 80% 50% 50%",
                   "60% 40% 30% 70% / 60% 30% 70% 40%"
                 ] 
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-20 w-[300px] h-[300px] md:w-[400px] md:h-[400px] overflow-hidden shadow-[0_20px_50px_rgba(30,113,42,0.2)] border-4 border-white will-change-transform"
             >
               <motion.div 
                 style={{ x: imgX, y: imgY }}
                 className="absolute inset-0 w-full h-full scale-125"
               >
                 <Image 
                   src="/images/imagem-arvore.jpg" 
                   alt="Natureza Imersiva e Floresta Sustentável" 
                   fill
                   className="object-cover saturate-[0.8]"
                 />
               </motion.div>
               <div className="absolute inset-0 bg-primary-green/10 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-t from-dark-green/40 via-transparent to-transparent opacity-60" />
             </motion.div>
             
             {/* Ambient Glows */}
             <div className="absolute w-[80%] h-[80%] bg-primary-green/10 rounded-full blur-[100px] pointer-events-none" />
             
             {/* Floating Info Card with Parallax */}
             <motion.div 
                style={{ x: cardX, y: cardY }}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-0 right-0 md:-right-8 bg-white/90 backdrop-blur-xl px-8 py-6 rounded-[2.5rem] shadow-2xl border border-green-50 max-w-[200px] z-30 will-change-transform"
             >
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nosso Foco</p>
                <p className="text-base font-bold text-dark-green leading-snug">Economia Circular em Portugal 🇵🇹</p>
             </motion.div>

             <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary-green/5 rounded-full blur-2xl animate-pulse" />
          </motion.div>
          
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-heading text-dark-green mb-10 leading-tight tracking-tight">
              A sustentabilidade não é uma escolha, <br /> é o <span className="text-primary-green italic underline decoration-green-100 decoration-[12px] underline-offset-4">nosso futuro.</span>
            </h2>
            
            <div className="space-y-8 text-lg text-gray-500 font-medium leading-relaxed mb-12">
              <p>
                Na 20recolher, transformamos a forma como as empresas gerem os seus ativos tecnológicos. Mais do que recolher, garantimos que cada componente volta a integrar o ciclo produtivo.
              </p>
              
              <motion.blockquote 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="border-l-8 border-primary-green pl-8 py-2 text-dark-green font-bold text-xl italic bg-green-50/30 rounded-r-3xl"
              >
                 &ldquo;{BRAND.mission}&rdquo;
              </motion.blockquote>
            </div>

            <Link href="/sobre-nos">
              <Button className="h-16 px-12 text-lg rounded-2xl shadow-xl shadow-primary-green/10 font-bold hover:shadow-primary-green/20">
                Saiba como trabalhamos
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
