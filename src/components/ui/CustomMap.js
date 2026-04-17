"use client";

import { useEffect, useState, useRef } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Building2 } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { CONTACTS } from '@/constants/contact';

// Estilo customizado de Satélite usando Esri World Imagery
const satelliteStyle = {
  version: 8,
  sources: {
    'esri-satellite': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
    }
  },
  layers: [
    {
      id: 'satellite',
      type: 'raster',
      source: 'esri-satellite',
      minzoom: 0,
      maxzoom: 20
    }
  ]
};

export default function CustomMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showMarker, setShowMarker] = useState(false);
  const mapRef = useRef();
  const containerRef = useRef();
  
  // Coordenadas exatas fornecidas pelo utilizador (40°21'17.1"N 8°36'17.5"W)
  const longitude = -8.604861;
  const latitude = 40.35475;

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(mountTimer);
  }, []);

  // Intersection Observer para disparar a animação apenas quando visível
  useEffect(() => {
    if (!isMounted || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && mapRef.current) {
          // Pequeno delay após entrar no viewport para suavidade
          setTimeout(() => {
            if (mapRef.current) {
              const zoomDuration = 4000;
              
              mapRef.current.getMap().flyTo({
                zoom: 17,
                duration: zoomDuration,
                essential: true
              });
              
              setHasAnimated(true);

              // Mostrar o marcador apenas quando a animação de zoom terminar
              setTimeout(() => {
                setShowMarker(true);
              }, zoomDuration);
            }
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isMounted, hasAnimated]);

  if (!isMounted) return <div className="w-full h-full bg-primary-green/5 animate-pulse rounded-[4rem]" />;

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 13,
          pitch: 0,
          bearing: 0
        }}
        mapStyle={satelliteStyle}
        className="w-full h-full rounded-[4rem] overflow-hidden"
        scrollZoom={false}
      >
        <NavigationControl position="top-right" />

        {showMarker && (
          <Marker 
            longitude={longitude} 
            latitude={latitude} 
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setShowPopup(true);
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -10, 0] // Animação de flutuação suave
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                opacity: { duration: 1, delay: 0.1 },
                scale: { duration: 1, delay: 0.1 }
              }}
              className="group/pin cursor-pointer relative"
            >
              {/* Triple Organic Ripple Effect */}
              <div className="absolute inset-0 -translate-y-2">
                <div className="absolute inset-0 bg-primary-green/40 blur-3xl rounded-full scale-150 animate-[ping_3s_linear_infinite]" />
                <div className="absolute inset-0 bg-primary-green/20 blur-2xl rounded-full scale-[2] animate-[ping_4s_linear_infinite]" />
                <div className="absolute inset-0 bg-primary-green/10 blur-xl rounded-full scale-[2.5] animate-[ping_5s_linear_infinite]" />
              </div>
              
              {/* Outer Glass Aura */}
              <div className="absolute -inset-6 border border-primary-green/10 rounded-full animate-[spin_15s_linear_infinite] opacity-30" />
              
              {/* Main Pin Container (Bespoke Eco-Glass) */}
              <div className="relative w-16 h-16 bg-white/40 backdrop-blur-2xl rounded-[1.8rem] flex items-center justify-center border-[2.5px] border-white shadow-[0_25px_50px_rgba(142,179,31,0.2),inset_0_0_20px_rgba(255,255,255,0.5)] transform transition-all duration-700 group-hover/pin:scale-110 group-hover/pin:border-primary-green/50">
                
                {/* Inner Core Glow */}
                <div className="absolute inset-2 bg-gradient-to-br from-primary-green/20 to-emerald-green/40 rounded-[1.2rem] blur-sm" />
                
                {/* Icon with Dynamic Reflection */}
                <div className="relative group-hover/pin:rotate-[10deg] transition-transform duration-500">
                  <MapPin size={32} className="text-primary-green drop-shadow-[0_0_12px_rgba(142,179,31,0.6)]" />
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 blur-[2px] rounded-full opacity-50" />
                </div>

                {/* Glass Highlight Shine */}
                <div className="absolute top-1 left-2 right-2 h-1/3 bg-gradient-to-b from-white/60 to-transparent rounded-t-[1.5rem] opacity-40" />
                
                {/* Interaction Ring */}
                <div className="absolute inset-0 rounded-[1.8rem] border-4 border-primary-green/0 group-hover/pin:border-primary-green/20 group-hover/pin:scale-110 transition-all duration-700" />
              </div>
              
              {/* Dynamic Shadow Anchor (reacts to floating) */}
              <motion.div 
                animate={{ 
                  scale: [1, 0.8, 1],
                  opacity: [0.2, 0.1, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-2 bg-black rounded-full blur-md mx-auto mt-4" 
              />
            </motion.div>
          </Marker>
        )}

        {showPopup && (
          <Popup
            longitude={longitude}
            latitude={latitude}
            anchor="top"
            onClose={() => setShowPopup(false)}
            closeButton={false}
            className="premium-popup"
          >
            <div className="p-5 text-center min-w-[200px] bg-white/95 backdrop-blur-2xl border border-primary-green/30 rounded-3xl shadow-2xl overflow-hidden relative group">
              {/* Background Accent */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-green/10 blur-2xl rounded-full transition-transform duration-700 group-hover:scale-150" />
              
              <div className="relative z-10">
                <div className="w-10 h-10 bg-primary-green/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary-green/20">
                  <Building2 size={20} className="text-primary-green" />
                </div>
                
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">20Recolher HQ</h3>
                <p className="text-[10px] text-slate-500 mb-5 leading-tight font-body uppercase tracking-[0.2em]">Zona Industrial de Cantanhede</p>
                
                <a 
                  href={CONTACTS.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary-green text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-dark-green transition-all duration-300 font-body shadow-lg shadow-primary-green/20"
                >
                  Ver no Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      <div className="absolute inset-0 pointer-events-none border-[3px] border-primary-green/10 rounded-[4rem] ring-1 ring-inset ring-slate-900/5" />

      <style jsx global>{`
        .maplibregl-popup-content {
          padding: 0;
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }
        .maplibregl-popup-tip {
          display: none;
        }
      `}</style>
    </div>
  );
}
