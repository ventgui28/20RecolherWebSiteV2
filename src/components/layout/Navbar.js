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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <Container>
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-dark-green tracking-tight">
              20<span className="text-primary-green">recolher</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-gray-600 hover:text-primary-green font-semibold transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Link 
              href="/contactos" 
              className="bg-primary-green text-white px-7 py-3 rounded-xl hover:bg-dark-green transition-all font-bold shadow-sm hover:shadow-lg active:scale-95 transform"
            >
              Contactos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2 hover:bg-gray-100 rounded-xl transition-colors outline-none"
              aria-label="Abrir Menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <Container className="py-8 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block text-xl font-bold text-gray-800 hover:text-primary-green transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link 
                  href="/contactos" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-dark-green text-white text-center px-6 py-4 rounded-2xl font-bold shadow-lg"
                >
                  Falar Connosco
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
