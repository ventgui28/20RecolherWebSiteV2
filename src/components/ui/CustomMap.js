"use client";

import { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { CONTACTS } from '@/constants/contact';

export default function CustomMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  // Coordenadas exatas fornecidas (MapLibre usa [longitude, latitude])
  const longitude = -8.604861;
  const latitude = 40.35475;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-slate-50 animate-pulse rounded-[4rem]" />;

  return (
    <div className="w-full h-full relative group">
      <Map
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 15,
          pitch: 45,
          bearing: -17.6
        }}
        // Estilo vetorial gratuito e premium da CartoDB (Positron)
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        className="w-full h-full rounded-[4rem] overflow-hidden"
        scrollZoom={false}
      >
        <NavigationControl position="top-right" />

        <Marker 
          longitude={longitude} 
          latitude={latitude} 
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setShowPopup(true);
          }}
        >
          <div className="group/pin cursor-pointer">
            <div className="w-12 h-12 bg-eco-green rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white transform transition-transform group-hover/pin:scale-110 group-hover/pin:-translate-y-1">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            </div>
            <div className="w-4 h-1.5 bg-black/20 rounded-full blur-sm mx-auto mt-1" />
          </div>
        </Marker>

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
              <h3 className="font-bold text-slate-900 text-sm mb-1 font-sans">20Recolher</h3>
              <p className="text-[10px] text-slate-500 mb-3 leading-tight font-sans">Zona Industrial de Cantanhede</p>
              <a 
                href={CONTACTS.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full py-2 bg-eco-green text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-eco-emerald transition-colors font-sans"
              >
                Abrir GPS
              </a>
            </div>
          </Popup>
        )}
      </Map>

      {/* Overlay Glass Border */}
      <div className="absolute inset-0 pointer-events-none border border-slate-200/50 rounded-[4rem] ring-1 ring-inset ring-white/20" />

      <style jsx global>{`
        .maplibregl-popup-content {
          padding: 0;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
        }
        .maplibregl-popup-tip {
          border-top-color: rgba(255, 255, 255, 0.95) !important;
        }
        .maplibregl-ctrl-group {
          border-radius: 1rem !important;
          border: none !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important;
        }
      `}</style>
    </div>
  );
}
