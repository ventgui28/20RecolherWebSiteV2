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
  
  // 1. Springs for the Bubbles System (Main + 2 Satellites)
  const springMain = { damping: 15, stiffness: 120, mass: 0.8 };
  const springTrail1 = { damping: 20, stiffness: 80, mass: 1.5 };
  const springTrail2 = { damping: 25, stiffness: 60, mass: 2.5 };

  const smoothX = useSpring(mouseX, springMain);
  const smoothY = useSpring(mouseY, springMain);
  
  const trailX1 = useSpring(mouseX, springTrail1);
  const trailY1 = useSpring(mouseY, springTrail1);
  
  const trailX2 = useSpring(mouseX, springTrail2);
  const trailY2 = useSpring(mouseY, springTrail2);

  // Main Bubble Transformations
  const blobX = useTransform(smoothX, [-0.6, 0.6], [-250, 250]);
  const blobY = useTransform(smoothY, [-0.6, 0.6], [-250, 250]);
  const imgX = useTransform(smoothX, [-0.6, 0.6], [250, -250]); 
  const imgY = useTransform(smoothY, [-0.6, 0.6], [250, -250]);

  // Satellite 1 Transformations (Medium trail)
  const sat1X = useTransform(trailX1, [-0.6, 0.6], [-280, 280]);
  const sat1Y = useTransform(trailY1, [-0.6, 0.6], [-280, 280]);

  // Satellite 2 Transformations (Long trail)
  const sat2X = useTransform(trailX2, [-0.6, 0.6], [-300, 300]);
  const sat2Y = useTransform(trailY2, [-0.6, 0.6], [-300, 300]);

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

  const bubbleMorph = {
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 70% 70% 30% / 30% 30% 70% 70%",
      "50% 50% 20% 80% / 20% 80% 50% 50%",
      "60% 40% 30% 70% / 60% 30% 70% 40%"
    ],
    scale: [1, 1.05, 0.98, 1.02, 1],
    rotate: [0, 2, -2, 1, 0]
  };

  return (
    <section 
      className="py-32 overflow-hidden relative"
      style={{ perspective: "1500px" }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
          {/* Visual Column: The Bubbles Stage */}
          <motion.div 
            {...fadeInUp}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:w-1/2 relative flex justify-center items-center py-12 h-[550px] md:h-[650px]"
          >
             {/* Background Layer: Stage Surface */}
             <div className="absolute inset-4 md:inset-10 rounded-[4rem] bg-green-50/40 border border-primary-green/5 shadow-inner" />

             {/* Satellite Bubble 2 (Longest Trail) */}
             <motion.div 
               style={{ x: sat2X, y: sat2Y }}
               animate={bubbleMorph}
               transition={{ borderRadius: { duration: 5, repeat: Infinity }, scale: { duration: 3, repeat: Infinity } }}
               className="absolute z-10 w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 shadow-xl pointer-events-none"
             >
                <div className="absolute top-4 left-4 w-4 h-2 bg-white/40 rounded-full blur-[1px] rotate-[-45deg]" />
             </motion.div>

             {/* Satellite Bubble 1 (Medium Trail) */}
             <motion.div 
               style={{ x: sat1X, y: sat1Y }}
               animate={bubbleMorph}
               transition={{ borderRadius: { duration: 4, repeat: Infinity }, scale: { duration: 2.5, repeat: Infinity } }}
               className="absolute z-15 w-32 h-32 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-2xl pointer-events-none"
             >
                <div className="absolute top-6 left-6 w-6 h-3 bg-white/50 rounded-full blur-[1px] rotate-[-45deg]" />
             </motion.div>

             {/* Main Bubble: The Lens */}
             <motion.div 
               style={{ 
                 x: blobX, 
                 y: blobY,
                 transformStyle: "preserve-3d"
               }}
               animate={bubbleMorph}
               transition={{ 
                 borderRadius: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                 scale: { duration: 2, repeat: Infinity, ease: "linear" },
                 rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
               }}
               className="relative z-20 w-[240px] h-[240px] md:w-[320px] md:h-[320px] overflow-hidden shadow-[0_50px_100px_rgba(14,103,44,0.3)] border-[4px] border-white/90 will-change-transform bg-white"
             >
               {/* Revealed Image */}
               <motion.div 
                 style={{ x: imgX, y: imgY, scale: 1.25 }} 
                 className="absolute inset-[-150%] w-[400%] h-[400%] flex items-center justify-center"
               >
                 <div className="relative w-full h-full max-w-[700px] max-h-[700px]">
                    <Image 
                      src="/images/imagem-arvore.jpg" 
                      alt="Natureza Revelada" 
                      fill
                      className="object-cover saturate-[1.2] brightness-110"
                    />
                 </div>
               </motion.div>
               
               {/* Bubble visual polish: Highlights & Glass */}
               <div className="absolute top-10 left-10 w-20 h-10 bg-white/30 rounded-full blur-md rotate-[-45deg] pointer-events-none" />
               <div className="absolute inset-0 bg-primary-green/5 mix-blend-overlay pointer-events-none" />
               <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-inherit" />
             </motion.div>
             
             {/* Ambient Glow */}
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
