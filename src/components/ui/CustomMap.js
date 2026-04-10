"use client";

import { useEffect, useState, useRef } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';
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
    setIsMounted(true);
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

  if (!isMounted) return <div className="w-full h-full bg-slate-900 animate-pulse rounded-[4rem]" />;

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
            <div className="group/pin cursor-pointer relative animate-in fade-in zoom-in duration-700">
              <div className="absolute inset-0 bg-eco-lime/40 blur-xl rounded-full scale-150 animate-pulse" />
              
              <div className="relative w-12 h-12 bg-eco-lime rounded-2xl shadow-[0_0_25px_rgba(132,204,22,0.6)] flex items-center justify-center border-4 border-white transform transition-transform group-hover/pin:scale-110 group-hover/pin:-translate-y-1">
                <div className="w-3 h-3 bg-white rounded-full animate-ping" />
              </div>
              
              <div className="w-4 h-1.5 bg-black/40 rounded-full blur-sm mx-auto mt-1" />
            </div>
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
            <div className="p-3 text-center min-w-[150px]">
              <h3 className="font-bold text-slate-900 text-sm mb-1 font-sans">20Recolher HQ</h3>
              <p className="text-[10px] text-slate-500 mb-3 leading-tight font-sans italic">Instalações centrais.</p>
              <a 
                href={CONTACTS.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full py-2 bg-eco-green text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-eco-emerald transition-colors font-sans shadow-lg shadow-eco-green/20"
              >
                Como Chegar
              </a>
            </div>
          </Popup>
        )}
      </Map>

      <div className="absolute inset-0 pointer-events-none border-[3px] border-white/20 rounded-[4rem] ring-1 ring-inset ring-black/10" />

      <style jsx global>{`
        .maplibregl-popup-content {
          padding: 0;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.9);
        }
        .maplibregl-popup-tip {
          border-top-color: rgba(255, 255, 255, 0.9) !important;
        }
      `}</style>
    </div>
  );
}
