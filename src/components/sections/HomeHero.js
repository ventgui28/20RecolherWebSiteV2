"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useRef } from 'react';

export default function HomeHero() {
  const mouse = useMousePosition();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  const titleY = useTransform(scrollY, [0, 500], [0, 100]);
  const abstractX = (mouse.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * 0.05;
  const abstractY = (mouse.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * 0.05;

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-20"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Editorial Column 1 - Title */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: titleY }}
            >
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-dark-green">
                <span className="block">Transform</span>
                <span className="block italic text-primary-green ml-12 md:ml-24">Electronic</span>
                <span className="block ml-6 md:ml-12 underline decoration-green-100 decoration-8 underline-offset-8">Legacy.</span>
              </h1>
            </motion.div>
          </div>

          {/* Editorial Column 2 - Description & CTA */}
          <div className="lg:col-span-4 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="h-1 w-20 bg-primary-green"></div>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  {BRAND.description} Especialistas na gestão circular de hardware, promovendo um futuro onde a tecnologia não deixa pegadas.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <Link href="/contactos">
                  <Button className="h-20 text-xl px-12 group overflow-hidden relative">
                    <span className="relative z-10">Schedule Collection</span>
                    <motion.div 
                      className="absolute inset-0 bg-dark-green transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    />
                  </Button>
                </Link>
                <Link href="/servicos" className="text-dark-green font-bold text-lg hover:text-primary-green transition-all flex items-center gap-2 group">
                  Discover Our Services 
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Premium Interactive Elements */}
      <motion.div 
        style={{ x: abstractX, y: abstractY }}
        className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px]"
      >
        <div className="relative w-full h-full">
          {/* Main 3D Shape Placeholder */}
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 60, ease: "linear" },
              scale: { repeat: Infinity, duration: 10, ease: "easeInOut" }
            }}
            className="absolute inset-0 bg-gradient-to-br from-primary-green/20 via-mid-green/40 to-dark-green/10 rounded-[40% 60% 70% 30% / 40% 50% 60% 50%] blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 40, ease: "linear" },
              scale: { repeat: Infinity, duration: 8, ease: "easeInOut" }
            }}
            className="absolute inset-20 bg-gradient-to-tr from-green-50/30 to-emerald-green/20 rounded-[60% 40% 30% 70% / 50% 60% 50% 40%] backdrop-blur-3xl border border-white/20 shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Decorative Text */}
      <div className="absolute bottom-10 left-10 hidden xl:block">
        <p className="font-serif italic text-gray-200 text-9xl select-none opacity-50">
          Sustainability
        </p>
      </div>
    </section>
  );
}
