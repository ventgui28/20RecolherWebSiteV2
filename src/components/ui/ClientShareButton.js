"use client";

import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ClientShareButton({ title, text }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao partilhar:', err);
      }
    } else {
      // Fallback: Copiar para o clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar link:', err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white hover:bg-emerald-600 rounded-xl transition-all shadow-xl shadow-slate-900/10 group relative"
    >
      <Share2 size={18} className="group-hover:scale-110 transition-transform" />
      <span className="text-xs font-black uppercase tracking-widest">
        {copied ? 'Link Copiado!' : 'Partilhar Artigo'}
      </span>
      
      {copied && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap"
        >
          Copiado para o clipboard
        </motion.div>
      )}
    </button>
  );
}
