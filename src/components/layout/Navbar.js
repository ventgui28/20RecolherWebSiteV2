"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Sobre Nós", href: "/sobre-nos" },
    { label: "Serviços", href: "/servicos" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-50">
      <Container>
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-heading font-black text-dark-green tracking-tight flex items-center gap-2">
              <span className="bg-primary-green text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-12">20</span>
              <span className="text-primary-green">recolher</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-gray-600 hover:text-primary-green font-bold text-sm uppercase tracking-widest transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Link 
              href="/contactos" 
              className="bg-primary-green text-white px-8 py-3.5 rounded-2xl hover:bg-dark-green transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-green/20 hover:scale-105 active:scale-95 transform"
            >
              Contactos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark-green p-3 bg-green-50 rounded-2xl transition-colors outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-green-50 shadow-2xl overflow-hidden"
          >
            <Container className="py-12 space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block text-3xl font-heading font-black text-dark-green hover:text-primary-green transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6">
                <Link 
                  href="/contactos" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-primary-green text-white text-center px-6 py-5 rounded-[2rem] font-black text-lg shadow-xl"
                >
                  Agendar Recolha
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
