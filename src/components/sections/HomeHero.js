"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
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
  const [timeInfo, setTimeInfo] = useState({ current: "00:00", total: "00:00" });
  const transitionTriggered = useRef(false);
  const videoRef = useRef(null);

  // Format time MM:SS
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Reset trigger and progress when video changes
  useEffect(() => {
    transitionTriggered.current = false;
    setProgress(0);
  }, [currentVideo]);

  const handleTimeUpdate = (e) => {
    const video = e.target;
    
    if (!video.duration || video.duration <= 0) return;

    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);
    
    setTimeInfo({
      current: formatTime(video.currentTime),
      total: formatTime(video.duration)
    });

    const timeLeft = video.duration - video.currentTime;

    // Trigger transition 1 second before end
    if (timeLeft <= 1 && !transitionTriggered.current) {
      transitionTriggered.current = true;
      setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
    }
  };

  const handleVideoEnd = () => {
    if (!transitionTriggered.current) {
      setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
    }
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  const goToVideo = (index) => {
    setCurrentVideo(index);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark-green bg-grain">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden lg:flex flex-col gap-8 items-end"
          >
            {/* Interactive Dots Navigation */}
            <div className="flex gap-4 mb-4">
              {HERO_VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToVideo(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 hover:bg-primary-green/60 ${i === currentVideo ? "w-12 bg-primary-green" : "w-4 bg-white/20"}`}
                  aria-label={`Ver vídeo ${i + 1}`}
                />
              ))}
            </div>

            <div className="relative group">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 max-w-[320px] shadow-2xl transition-all duration-500 group-hover:bg-white/20">
                <p className="text-4xl font-black text-primary-green mb-2">100%</p>
                <p className="text-white font-bold text-lg leading-tight uppercase tracking-tighter">Circular & <br />Certificado</p>
                
                <div className="mt-6">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div 
                      className="h-full bg-primary-green"
                      style={{ width: `${progress}%` }}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-black text-white/40 tabular-nums">{timeInfo.current}</span>
                    <span className="text-[10px] font-black text-white/40 tabular-nums">{timeInfo.total}</span>
                  </div>
                </div>
              </div>

              {/* Next Video Button */}
              <button
                onClick={nextVideo}
                className="absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-primary-green text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-30 group/btn border-4 border-dark-green"
                aria-label="Próximo vídeo"
              >
                <ChevronRight className="w-8 h-8 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </Container>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
