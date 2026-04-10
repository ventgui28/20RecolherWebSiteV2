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

  if (!isMounted) return <div className="w-full h-full bg-premium-black animate-pulse rounded-[4rem]" />;

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
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 
              }}
              className="group/pin cursor-pointer relative"
            >
              {/* Liquid Pulse Effect */}
              <div className="absolute inset-0 bg-premium-gold/30 blur-2xl rounded-full scale-150 animate-pulse mix-blend-screen" />
              
              {/* Outer Glass Ring */}
              <div className="absolute -inset-4 border border-premium-gold/20 rounded-full animate-[spin_10s_linear_infinite] opacity-50" />
              
              {/* Main Pin Container (Liquid Glass) */}
              <div className="relative w-14 h-14 bg-premium-black/60 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-premium-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(161,98,7,0.2)] transform transition-all duration-500 group-hover/pin:scale-110 group-hover/pin:-translate-y-2 group-hover/pin:border-premium-gold/80">
                <MapPin size={28} className="text-premium-gold drop-shadow-[0_0_8px_rgba(161,98,7,0.6)]" />
                
                {/* Secondary Pulse */}
                <div className="absolute inset-0 rounded-2xl border-2 border-premium-gold/0 group-hover/pin:animate-ping opacity-20" />
              </div>
              
              {/* Shadow Anchor */}
              <div className="w-6 h-2 bg-black/60 rounded-full blur-md mx-auto mt-2 scale-x-125" />
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
            <div className="p-5 text-center min-w-[200px] bg-premium-black/95 backdrop-blur-2xl border border-premium-gold/30 rounded-3xl shadow-2xl overflow-hidden relative group">
              {/* Background Accent */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-premium-gold/10 blur-2xl rounded-full transition-transform duration-700 group-hover:scale-150" />
              
              <div className="relative z-10">
                <div className="w-10 h-10 bg-premium-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-premium-gold/30">
                  <Building2 size={20} className="text-premium-gold" />
                </div>
                
                <h3 className="font-heading-premium font-bold text-premium-gold text-lg mb-1">20Recolher HQ</h3>
                <p className="text-[10px] text-premium-white/60 mb-5 leading-tight font-body-premium uppercase tracking-[0.2em]">Cantanhede Industrial Hub</p>
                
                <a 
                  href={CONTACTS.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-premium-gold text-premium-black text-[11px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-premium-white transition-all duration-300 font-body-premium shadow-lg shadow-premium-gold/20"
                >
                  Ver no Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      <div className="absolute inset-0 pointer-events-none border-[3px] border-premium-gold/10 rounded-[4rem] ring-1 ring-inset ring-premium-black/20" />

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
