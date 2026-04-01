"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BRAND } from "@/constants/brand";
import { CONTACTS } from "@/constants/contact";
import { SERVICES } from "@/constants/services";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    Facebook: Facebook,
    LinkedIn: Linkedin,
    Instagram: Instagram
  };

  return (
    <footer className="bg-green-mist/30 bg-grain border-t border-green-100/50 pt-24 pb-12 relative z-10 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-green/5 rounded-full blur-3xl pointer-events-none" />
      
      <Container>
        {/* Upper CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-md rounded-[3rem] p-8 md:p-12 mb-20 border border-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-green-900/5"
        >
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading text-dark-green mb-4">Pronto para reciclar os seus ativos?</h2>
            <p className="text-gray-500 font-medium">Garanta uma gestão segura, certificada e sustentável para a sua empresa.</p>
          </div>
          <Link href="/contactos">
            <Button className="h-16 px-10 rounded-2xl shadow-lg shadow-primary-green/20 group">
              Solicitar Orçamento 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt={BRAND.name} 
                width={180} 
                height={60} 
                className="h-10 w-auto"
                priority
              />
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
              {BRAND.description} Especialistas em economia circular e valorização de resíduos tecnológicos em todo o território nacional.
            </p>
            <div className="flex items-center gap-3 text-primary-green bg-primary-green/5 py-3 px-5 rounded-2xl w-fit border border-primary-green/10">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Operador Licenciado</span>
            </div>
          </div>
          
          {/* Services Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black text-dark-green/30 tracking-[0.2em] uppercase mb-8">Nossos Serviços</h3>
            <ul className="space-y-4">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link 
                    href="/servicos" 
                    className="text-gray-600 hover:text-primary-green transition-colors font-bold text-base flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-primary-green mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/sobre-nos" 
                  className="text-gray-600 hover:text-primary-green transition-colors font-bold text-base flex items-center group"
                >
                  <span className="w-0 group-hover:w-4 h-0.5 bg-primary-green mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  Sobre a 20recolher
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Info */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black text-dark-green/30 tracking-[0.2em] uppercase mb-8">Informação Operacional</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-green-50 h-fit">
                  <MapPin className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Localização</p>
                  <p className="text-dark-green font-bold text-sm leading-snug">{CONTACTS.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-green-50 h-fit">
                  <Clock className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Horário</p>
                  <p className="text-dark-green font-bold text-sm leading-snug">{CONTACTS.workingHours}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contacts & Social */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black text-dark-green/30 tracking-[0.2em] uppercase mb-8">Conecte-se</h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-3 text-dark-green font-bold hover:text-primary-green transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{CONTACTS.email}</span>
                </a>
                <a href={`tel:${CONTACTS.phone}`} className="flex items-center gap-3 text-dark-green font-bold hover:text-primary-green transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{CONTACTS.phone}</span>
                </a>
              </div>
              
              <div className="flex gap-3 pt-4">
                {CONTACTS.social.map((item) => {
                  const Icon = socialIcons[item.name] || Mail;
                  return (
                    <a 
                      key={item.name}
                      href={item.url} 
                      className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-green-50 flex items-center justify-center text-dark-green hover:bg-primary-green hover:text-white hover:border-primary-green transition-all duration-300"
                      title={item.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-10 border-t border-green-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-400 font-bold">
            &copy; {currentYear} <span className="text-dark-green">{BRAND.name}</span>. Portugal 🇵🇹
          </p>
          
          <div className="flex gap-8">
            <Link href="#" className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary-green transition-colors">Privacidade</Link>
            <Link href="#" className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary-green transition-colors">Termos</Link>
            <Link href="#" className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary-green transition-colors">Cookies</Link>
          </div>

          <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-full border border-green-50">
             <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
             <span className="text-[10px] font-black text-dark-green/60 uppercase tracking-[0.2em]">Zero Desperdício</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
