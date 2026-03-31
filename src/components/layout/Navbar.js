"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Sobre Nós", href: "/sobre-nos" },
    { label: "Serviços", href: "/servicos" },
    { label: "Contactos", href: "/contactos" },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-green-50">
      <Container>
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 relative z-[110]">
            <Link href="/" className="flex items-center gap-2 group">
              <Image 
                src="/logo.png" 
                alt={BRAND.name} 
                width={160} 
                height={50} 
                className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.slice(0, 3).map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-gray-600 hover:text-primary-green font-bold text-sm uppercase tracking-widest transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green transition-all group-hover:w-full"></span>
              </Link>
            ))}
            
            <div className="flex items-center gap-6 pl-6 border-l border-green-100">
              <Link 
                href="/contactos" 
                className="bg-primary-green text-white px-8 py-3.5 rounded-2xl hover:bg-dark-green transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-green/20 hover:scale-105 active:scale-95 transform"
              >
                Contactos
              </Link>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4 relative z-[110]">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 flex items-center justify-center bg-green-50 rounded-2xl transition-colors focus:outline-none"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-1.5 w-6 items-end">
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                  className="h-0.5 bg-dark-green rounded-full origin-center"
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                  className="h-0.5 w-4 bg-dark-green rounded-full"
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: -6, width: "100%" } : { rotate: 0, y: 0, width: "60%" }}
                  className="h-0.5 bg-dark-green rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Nav Overlay - Premium & Immersive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 md:hidden bg-white z-[100] flex flex-col pt-32 pb-12 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[120vw] h-[120vw] bg-green-50 rounded-full -z-10 blur-3xl opacity-60" />
            
            <Container className="flex flex-col h-full">
              <div className="flex-grow space-y-8">
                {navLinks.map((link, index) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4"
                    >
                      <span className="text-primary-green/30 font-heading font-black text-xl italic group-hover:text-primary-green transition-colors">
                        0{index + 1}
                      </span>
                      <span className="text-5xl font-heading font-black text-dark-green hover:text-primary-green transition-all transform hover:translate-x-4">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-auto space-y-8">
                <div className="h-px bg-green-100 w-full" />
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Entre em contacto</p>
                    <p className="text-dark-green font-bold">geral@20recolher.pt</p>
                  </div>
                  <Link 
                    href="/contactos" 
                    onClick={() => setIsOpen(false)}
                    className="bg-primary-green text-white px-8 py-5 rounded-[2rem] font-black shadow-xl shadow-primary-green/20"
                  >
                    Agendar Agora
                  </Link>
                </div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
