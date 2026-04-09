import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Calcula o tempo de leitura de forma realista (padrão Medium)
 * @param {string} htmlContent - O conteúdo em HTML do editor
 * @returns {number} - Tempo em minutos
 */
export function calculateReadingTime(htmlContent) {
  if (!htmlContent) return 0;

  const wordsPerMinute = 225;
  
  // 1. Limpar HTML para contar apenas palavras
  const textOnly = htmlContent.replace(/<[^>]*>/g, ' ');
  const wordCount = textOnly.trim().split(/\s+/).length;
  
  // 2. Contar imagens
  const imageCount = (htmlContent.match(/<img/g) || []).length;
  
  // 3. Cálculo de tempo para palavras (segundos)
  let totalSeconds = (wordCount / wordsPerMinute) * 60;
  
  // 4. Cálculo de tempo para imagens (Medium Algorithm)
  // 12s para a 1ª, 11s para a 2ª... até ao mínimo de 3s
  let imageSeconds = 0;
  let currentImageTime = 12;
  for (let i = 0; i < (imageCount > 10 ? 10 : imageCount); i++) {
    imageSeconds += (12 - i);
  }
  if (imageCount > 10) imageSeconds += (imageCount - 10) * 3;
  
  totalSeconds += imageSeconds;
  
  // 5. Retornar em minutos (mínimo 1)
  return Math.ceil(totalSeconds / 60) || 1;
}
