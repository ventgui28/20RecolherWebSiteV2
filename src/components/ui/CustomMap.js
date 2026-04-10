"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CONTACTS } from '@/constants/contact';

// Componente para aplicar filtros customizados ao mapa (Organic/Green look)
function MapStyle() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    container.style.filter = 'saturate(1.2) hue-rotate(85deg) brightness(0.9) contrast(1.1)';
  }, [map]);
  return null;
}

export default function CustomMap() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Localização exata da 20recolher (Zona Industrial Núcleo 1)
  const position = [40.3545, -8.6085];

  useEffect(() => {
    setIsMounted(true);
    
    // Fix para ícones do Leaflet que por vezes não carregam em Next.js
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-eco-green/5 animate-pulse rounded-[4rem]" />;

  // Criar ícone customizado Vibrante
  const customIcon = new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div class="w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-eco-green animate-bounce">
            <div class="w-4 h-4 bg-eco-green rounded-full"></div>
            <div class="absolute -inset-2 bg-eco-green/20 rounded-3xl animate-ping"></div>
           </div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  });

  return (
    <div className="w-full h-full relative group">
      <MapContainer 
        center={position} 
        zoom={14} 
        scrollWheelZoom={false}
        className="w-full h-full rounded-[4rem] overflow-hidden z-0"
      >
        {/* Tiles Premium (Voyager Style - Light & Clean) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapStyle />

        <Marker position={position} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="p-2 text-center">
              <h3 className="font-bold text-slate-900 mb-1">20Recolher HQ</h3>
              <p className="text-xs text-slate-500 italic">Onde a tecnologia ganha vida.</p>
              <a 
                href={CONTACTS.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-block px-4 py-1.5 bg-eco-green text-white text-[10px] font-bold uppercase rounded-lg"
              >
                Abrir GPS
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay Glass effect for interaction hint */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-900/5 rounded-[4rem]" />
      
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 1.5rem;
          padding: 8px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          border: 1px solid rgba(34,197,94,0.1);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-container {
          background: #f0f4f0 !important;
        }
      `}</style>
    </div>
  );
}
