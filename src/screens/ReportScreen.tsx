import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Camera, Home, Search, User, Zap, MapPin, Crosshair } from 'lucide-react';

type Tab = 'home' | 'explore' | 'report' | 'profile';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onOpenCamera: () => void;
}

// Fix Leaflet default marker icon paths for bundlers
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom green marker icon
const greenIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="width:32px;height:32px;background:#22c55e;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:10px;height:10px;background:white;border-radius:50%;transform:rotate(45deg);"></div></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component that re-centers the map when position changes
function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 16, { animate: true });
  }, [position[0], position[1], map]);
  return null;
}

export default function ReportScreen({ activeTab, onTabChange, onOpenCamera }: Props) {
  // Default to Manila; will update when GPS resolves
  const [position, setPosition] = useState<[number, number]>([14.5995, 120.9845]);
  const [hasGps, setHasGps] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const watchIdRef = useRef<number | null>(null);

  const requestGps = () => {
    if (!('geolocation' in navigator)) {
      setGpsStatus('error');
      return;
    }
    setGpsStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setHasGps(true);
        setGpsStatus('success');
      },
      () => {
        setGpsStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );

    // Start watching for continuous updates
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setHasGps(true);
        setGpsStatus('success');
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000 },
    );
  };

  // Auto-request GPS on mount
  useEffect(() => {
    requestGps();
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const coordsStr = `${position[0].toFixed(5)}, ${position[1].toFixed(5)}`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-200">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">
            Eco-Friendly Waste Collection
          </span>
        </div>
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center">
            <User size={18} className="text-brand-600" />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Live Preview — interactive GPS map */}
        <div className="relative mx-4 mt-5 rounded-2xl overflow-hidden shadow-md" style={{ height: 220 }}>
          <MapContainer
            center={position}
            zoom={14}
            zoomControl={false}
            attributionControl={false}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={greenIcon}>
              <Popup>You are here</Popup>
            </Marker>
            <RecenterMap position={position} />
          </MapContainer>

          {/* Live Preview badge overlay */}
          <div className="absolute top-3 left-3 z-[500] flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm pointer-events-none">
            <span className={`w-2 h-2 rounded-full ${gpsStatus === 'loading' ? 'bg-yellow-500 animate-pulse' : gpsStatus === 'error' ? 'bg-red-500' : 'bg-red-500 animate-pulse'}`} />
            <span className="text-[11px] font-bold text-gray-800 tracking-wide uppercase">
              {gpsStatus === 'loading' ? 'Locating...' : gpsStatus === 'error' ? 'GPS Error' : 'Live Preview'}
            </span>
          </div>

          {/* Recenter button */}
          <button
            onClick={requestGps}
            className="absolute top-3 right-3 z-[500] w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white active:scale-95 transition-all"
          >
            <Crosshair size={16} className="text-brand-600" />
          </button>
        </div>

        {/* Coordinates row */}
        <div className="flex items-center justify-between mx-4 mt-3 px-1">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-brand-500" />
            <span className="text-[13px] text-gray-600 font-medium font-mono">{coordsStr}</span>
          </div>
          <div className={`px-3 py-1 rounded-lg border ${hasGps ? 'border-brand-200 bg-brand-50' : 'border-gray-200 bg-gray-50'}`}>
            <span className={`text-[12px] font-medium ${hasGps ? 'text-brand-600' : 'text-gray-500'}`}>
              {hasGps ? 'GPS Active' : 'Manila, PH'}
            </span>
          </div>
        </div>

        {/* Title & description */}
        <div className="px-6 mt-5 text-center">
          <h1 className="text-[24px] font-extrabold text-gray-900 mb-3">
            Notice a hotspot?
          </h1>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-[260px] mx-auto">
            Take a photo to report waste accumulation and help keep the environment clean.
          </p>
        </div>

        {/* Camera CTA */}
        <div className="flex flex-col items-center mt-10 mb-2 gap-4">
          <button onClick={onOpenCamera} className="w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-200 hover:bg-brand-600 active:scale-[0.97] transition-all duration-200">
            <Camera size={40} className="text-white" strokeWidth={1.8} />
          </button>
          <span className="text-[13px] font-extrabold text-brand-500 tracking-widest uppercase">
            Report Hotspot
          </span>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-100 px-6 py-3">
        <div className="flex items-center justify-around">
          {([
            { tab: 'home' as Tab, Icon: Home, label: 'Home' },
            { tab: 'explore' as Tab, Icon: Search, label: 'Explore' },
            { tab: 'report' as Tab, Icon: Camera, label: 'Report' },
            { tab: 'profile' as Tab, Icon: User, label: 'Profile' },
          ]).map(({ tab, Icon, label }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className="flex flex-col items-center gap-1 min-w-[50px]"
              >
                <Icon
                  size={24}
                  className={isActive ? 'text-brand-500' : 'text-gray-400'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span className={`text-[11px] font-medium ${isActive ? 'text-brand-500' : 'text-gray-400'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
