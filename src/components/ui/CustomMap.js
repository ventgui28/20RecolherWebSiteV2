"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CONTACTS } from '@/constants/contact';

export default function CustomMap() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Localização exata fornecida pelo utilizador (40°21'17.1"N 8°36'17.5"W)
  const position = [40.35475, -8.604861];

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

  if (!isMounted) return <div className="w-full h-full bg-slate-50 animate-pulse rounded-[4rem]" />;

  // Criar ícone customizado Simples e Elegante
  const customIcon = new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div class="w-10 h-10 bg-eco-green rounded-full shadow-xl flex items-center justify-center border-4 border-white animate-pulse">
            <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false}
        className="w-full h-full rounded-[4rem] overflow-hidden z-0"
      >
        {/* Tiles Super-Simples e Limpas (CartoDB Positron) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <Marker position={position} icon={customIcon}>
          <Popup className="simple-popup">
            <div className="p-1 text-center font-sans">
              <h3 className="font-bold text-slate-900">20Recolher</h3>
              <p className="text-[10px] text-slate-500 mb-2">Zona Industrial de Cantanhede</p>
              <a 
                href={CONTACTS.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-eco-green hover:underline uppercase"
              >
                Como Chegar →
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay Border para acabamento premium */}
      <div className="absolute inset-0 pointer-events-none border border-slate-200/50 rounded-[4rem]" />
      
      <style jsx global>{`
        .simple-popup .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          padding: 4px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        .leaflet-container {
          background: #f8fafc !important;
        }
      `}</style>
    </div>
  );
}
