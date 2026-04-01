"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const HERO_VIDEOS = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4"
];

export default function HomeHero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // High-precision control refs
  const isTransitioning = useRef(false);
  const activeIndexRef = useRef(0);
  const videoRef = useRef(null);

  // Sync ref with state immediately
  useEffect(() => {
    activeIndexRef.current = currentVideo;
    setProgress(0);
    
    // Unlock transition after the cross-fade animation completes (800ms)
    const timer = setTimeout(() => {
      isTransitioning.current = false;
    }, 850);

    return () => clearTimeout(timer);
  }, [currentVideo]);

  const changeVideo = (newIndex) => {
    if (isTransitioning.current || newIndex === activeIndexRef.current) return;
    
    isTransitioning.current = true;
    setCurrentVideo(newIndex);
  };

  const handleTimeUpdate = (e) => {
    const video = e.target;
    const videoIndex = parseInt(video.dataset.videoIndex);
    
    // If this video is not the active one, kill it immediately to prevent event pollution
    if (videoIndex !== activeIndexRef.current) {
      video.pause();
      video.muted = true;
      return;
    }

    // Safety check for metadata
    if (!video.duration || video.duration <= 0) return;

    // Update real-time progress for active video
    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);

    // Auto-advance logic: 1 second before end
    const timeLeft = video.duration - video.currentTime;
    if (timeLeft <= 1 && !isTransitioning.current) {
      changeVideo((activeIndexRef.current + 1) % HERO_VIDEOS.length);
    }
  };

  const nextVideo = () => changeVideo((currentVideo + 1) % HERO_VIDEOS.length);
  const prevVideo = () => changeVideo((currentVideo - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length);
  const goToVideo = (index) => changeVideo(index);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark-green bg-grain">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video
              ref={videoIndex === activeIndexRef.current ? videoRef : null}
              autoPlay
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              data-video-index={currentVideo}
              poster="/images/hero-fallback.webp"
              className="w-full h-full object-cover"
            >
              <source src={HERO_VIDEOS[currentVideo]} type="video/mp4" />
            </video>
            <div className="absolute inset-0 -z-10">
              <Image 
                src="/images/hero-fallback.webp"
                alt="Sustentabilidade e Tecnologia"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-r from-dark-green/90 via-dark-green/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      <Container className="relative z-20 pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-8xl font-heading text-white leading-[0.95] mb-10 tracking-tighter">
              Transformamos <br />
              <span className="text-primary-green italic">tecnologia</span> em <br />
              <span className="relative inline-block">
                sustentabilidade.
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="absolute -bottom-2 left-0 w-full h-3" 
                  viewBox="0 0 200 8" 
                  fill="none"
                >
                  <path d="M1 5.5C40 2 120 2 199 5.5" stroke="#8eb31f" strokeWidth="4" strokeLinecap="round"/>
                </motion.svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-xl font-medium">
              A 20recolher lidera a economia circular em Portugal, garantindo o ciclo de vida total dos seus ativos tecnológicos.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/contactos">
                <Button className="h-20 px-14 text-xl rounded-2xl bg-primary-green text-white shadow-2xl shadow-primary-green/40 hover:scale-105 transition-transform font-black uppercase tracking-widest">
                  Solicitar Recolha
                </Button>
              </Link>
              <Link href="/servicos">
                <Button variant="outline" className="h-20 px-14 text-xl rounded-2xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-black uppercase tracking-widest">
                  Nossos Serviços
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Cinematic Navigation Bar (Bottom Right) */}
      <div className="absolute bottom-12 right-6 md:right-16 lg:right-24 z-30 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={prevVideo}
            disabled={isTransitioning.current}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-primary-green hover:border-primary-green transition-all duration-300 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>
          
          <div className="flex gap-3 px-4 py-3 bg-black/20 backdrop-blur-xl rounded-full border border-white/5">
            {HERO_VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToVideo(i)}
                disabled={isTransitioning.current}
                className={`relative h-1.5 rounded-full transition-all duration-500 overflow-hidden ${i === currentVideo ? "w-12 bg-white/20" : "w-4 bg-white/10 hover:bg-white/30"}`}
                aria-label={`Ver vídeo ${i + 1}`}
              >
                {i === currentVideo && (
                  <motion.div 
                    className="absolute inset-0 bg-primary-green"
                    style={{ width: `${progress}%` }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextVideo}
            disabled={isTransitioning.current}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-primary-green hover:border-primary-green transition-all duration-300 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator (Centered) */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-12 md:left-24 lg:left-1/2 lg:-translate-x-1/2 z-20 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
