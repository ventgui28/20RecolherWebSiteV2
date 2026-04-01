"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { 
  FaFacebookF, 
} from 'react-icons/fa';
import { BRAND } from "@/constants/brand";
import { CONTACTS } from "@/constants/contact";
import { SERVICES } from "@/constants/services";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    Facebook: FaFacebookF,
  };

  return (
    <footer className="bg-dark-green bg-grain border-t border-white/5 py-12 relative z-10 overflow-hidden text-white">
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />
      
      <Container>
        {/* Main Footer Content - More Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start mb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white/90 p-2 rounded-xl">
              <Image 
                src="/logo.png" 
                alt={BRAND.name} 
                width={140} 
                height={45} 
                className="h-8 w-auto"
                priority
              />
            </Link>
            <div className="flex gap-3">
              {CONTACTS.social.map((item) => {
                const Icon = socialIcons[item.name] || Mail;
                return (
                  <a 
                    key={item.name}
                    href={item.url}
                    target="_blank" 
                    className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-primary-green hover:border-primary-green transition-all duration-300"
                    title={item.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Services Links */}
          <div>
            <h3 className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase mb-6">Serviços</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link 
                    href="/servicos" 
                    className="text-white/60 hover:text-primary-green transition-colors font-bold text-sm flex items-center group"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Operational Info */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase mb-6">Info</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <MapPin className="w-4 h-4 text-primary-green shrink-0" />
                <p className="text-white/60 font-bold text-xs leading-tight">{CONTACTS.address}</p>
              </div>
              <div className="flex gap-3 items-center">
                <Clock className="w-4 h-4 text-primary-green shrink-0" />
                <p className="text-white/60 font-bold text-xs">{CONTACTS.workingHours}</p>
              </div>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase mb-6">Contacto</h3>
            <div className="space-y-3">
              <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-3 text-white/80 font-bold hover:text-primary-green transition-colors text-sm">
                <Mail className="w-4 h-4 text-primary-green" />
                {CONTACTS.email}
              </a>
              <a href={`tel:${CONTACTS.phone}`} className="flex items-center gap-3 text-white/80 font-bold hover:text-primary-green transition-colors text-sm">
                <Phone className="w-4 h-4 text-primary-green" />
                {CONTACTS.phone}
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar - Even more minimal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] text-white/30 font-bold">
            &copy; {currentYear} {BRAND.name}. Portugal 🇵🇹
          </p>
          
          <div className="flex gap-6">
            <Link href="#" className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-primary-green transition-colors">Privacidade</Link>
            <Link href="#" className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-primary-green transition-colors">Termos</Link>
          </div>

          <div className="flex items-center space-x-2 opacity-50">
             <span className="w-1.5 h-1.5 rounded-full bg-primary-green animate-pulse"></span>
             <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Zero Desperdício</span>
          </div>
        </div>
      </Container>
    </footer>

  );
}
