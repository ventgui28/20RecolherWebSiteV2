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
  
  // Parallax Logic - Balanced for elegant movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring for that organic "dragging" effect
  const springConfig = { damping: 25, stiffness: 80, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Balanced Amplitude for a cleaner look
  const blobX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const blobY = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);
  const blobRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const blobRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const imgX = useTransform(smoothX, [-0.5, 0.5], [30, -30]); 
  const imgY = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
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
      style={{ perspective: "1200px" }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
          {/* Visual Column with Balanced Parallax */}
          <motion.div 
            {...fadeInUp}
            className="lg:w-1/2 relative flex justify-center items-center py-12"
          >
             {/* Animated Organic Blob Container - Smaller Amplitude */}
             <motion.div 
               style={{ 
                 x: blobX, 
                 y: blobY,
                 rotateX: blobRotateX,
                 rotateY: blobRotateY,
                 transformStyle: "preserve-3d"
               }}
               animate={{ 
                 borderRadius: [
                   "60% 40% 30% 70% / 60% 30% 70% 40%",
                   "30% 70% 70% 30% / 30% 30% 70% 70%",
                   "50% 50% 20% 80% / 20% 80% 50% 50%",
                   "60% 40% 30% 70% / 60% 30% 70% 40%"
                 ] 
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-20 w-[300px] h-[300px] md:w-[480px] md:h-[480px] overflow-hidden shadow-[0_40px_80px_rgba(30,113,42,0.2)] border-[6px] border-white will-change-transform"
             >
               <motion.div 
                 style={{ x: imgX, y: imgY, scale: 1.5 }} // Larger scale for better visibility of internal movement
                 className="absolute inset-0 w-full h-full"
               >
                 <Image 
                   src="/images/imagem-arvore.jpg" 
                   alt="Natureza Imersiva e Floresta Sustentável" 
                   fill
                   className="object-cover saturate-[0.9]"
                 />
               </motion.div>
               <div className="absolute inset-0 bg-primary-green/15 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-t from-dark-green/50 via-transparent to-transparent opacity-70" />
             </motion.div>
             
             {/* Ambient Glows */}
             <motion.div 
                style={{ x: blobX, y: blobY, scale: 1.2 }}
                className="absolute w-full h-full bg-primary-green/10 rounded-full blur-[120px] pointer-events-none" 
             />
             
             {/* Fixed Info Card - Removed mouse style */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-0 right-0 md:-right-8 bg-white/95 backdrop-blur-2xl px-10 py-8 rounded-[3rem] shadow-2xl border border-green-50 max-w-[220px] z-30"
             >
                <div className="w-10 h-1 bg-primary-green mb-4 rounded-full" />
                <p className="text-[11px] font-black text-primary-green uppercase tracking-[0.2em] mb-2">Compromisso</p>
                <p className="text-lg font-bold text-dark-green leading-tight">Economia Circular Ativa ♻️</p>
             </motion.div>

             <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary-green/10 rounded-full blur-3xl" />
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
