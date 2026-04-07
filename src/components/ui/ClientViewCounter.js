"use client";

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ClientViewCounter({ slug }) {
  const supabase = createClient();

  useEffect(() => {
    const incrementViews = async () => {
      // Chamar a função SQL increment_news_views que criámos
      const { error } = await supabase.rpc('increment_news_views', { slug_text: slug });
      if (error) console.error('Erro ao incrementar visualizações:', error);
    };

    if (slug) {
      incrementViews();
    }
  }, [slug, supabase]);

  return null; // Este componente não renderiza nada visualmente
}
