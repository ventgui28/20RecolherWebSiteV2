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

  // Spyglass Parallax Logic - High Amplitude with extra padding range
  const blobX = useTransform(smoothX, [-0.6, 0.6], [-250, 250]);
  const blobY = useTransform(smoothY, [-0.6, 0.6], [-250, 250]);
  
  // Inverse movement for the image inside the droplet to keep it static in the world
  const imgX = useTransform(smoothX, [-0.6, 0.6], [250, -250]); 
  const imgY = useTransform(smoothY, [-0.6, 0.6], [250, -250]);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    // Use a slightly larger normalized range (-0.6 to 0.6) for padding effect
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
      className="py-32 overflow-hidden relative"
      style={{ perspective: "1500px" }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
          {/* Visual Column: The Spyglass Stage - Scoped mouse tracking */}
          <motion.div 
            {...fadeInUp}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:w-1/2 relative flex justify-center items-center py-12 h-[500px] md:h-[600px]"
          >
             {/* 1. Background Layer: Empty Styled Stage (No image) */}
             <div className="absolute inset-4 md:inset-10 rounded-[4rem] bg-green-50/50 border border-primary-green/5 shadow-inner" />

             {/* 2. Moving Droplet: The Lens */}
             <motion.div 
               style={{ 
                 x: blobX, 
                 y: blobY,
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
               className="relative z-20 w-[220px] h-[220px] md:w-[300px] md:h-[300px] overflow-hidden shadow-[0_50px_100px_rgba(14,103,44,0.3)] border-[4px] border-white/80 will-change-transform bg-white"
             >
               {/* 3. The Revealed Image: ONLY VISIBLE INSIDE */}
               <motion.div 
                 style={{ x: imgX, y: imgY, scale: 1.2 }} 
                 className="absolute inset-[-150%] w-[400%] h-[400%] flex items-center justify-center"
               >
                 <div className="relative w-full h-full max-w-[650px] max-h-[650px]">
                    <Image 
                      src="/images/imagem-arvore.jpg" 
                      alt="Natureza Revelada" 
                      fill
                      className="object-cover saturate-[1.2] brightness-110"
                    />
                 </div>
               </motion.div>
               
               {/* Droplet glass effect overlays */}
               <div className="absolute inset-0 bg-primary-green/10 mix-blend-overlay pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-40 pointer-events-none" />
             </motion.div>
             
             {/* Ambient Glow that follows the droplet */}
             <motion.div 
                style={{ x: blobX, y: blobY, scale: 1.5 }}
                className="absolute w-full h-full bg-primary-green/5 rounded-full blur-[140px] pointer-events-none" 
             />
             
             {/* Fixed Info Card */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-4 right-0 md:-right-8 bg-white/95 backdrop-blur-2xl px-10 py-8 rounded-[3rem] shadow-2xl border border-green-50 max-w-[220px] z-30 pointer-events-none"
             >
                <div className="w-10 h-1 bg-primary-green mb-4 rounded-full" />
                <p className="text-[11px] font-black text-primary-green uppercase tracking-[0.2em] mb-2">Compromisso</p>
                <p className="text-lg font-bold text-dark-green leading-tight">Economia Circular Ativa ♻️</p>
             </motion.div>
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
