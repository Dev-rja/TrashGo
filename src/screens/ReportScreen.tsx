import { Camera, Home, Search, User, MapPin } from 'lucide-react';
import profileAvatar from '../assets/images/image copy copy copy copy copy.png';
import mapImage from '../assets/images/image copy copy copy copy copy copy copy copy copy.png';
import { Zap } from 'lucide-react';

type Tab = 'home' | 'explore' | 'report' | 'profile';

interface Props {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export default function ReportScreen({ activeTab = 'report', onTabChange }: Props) {
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
          <img
            src={profileAvatar}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-gray-100"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Map image with Live Preview badge and pin */}
        <div className="relative mx-4 mt-5 rounded-2xl overflow-hidden" style={{ height: 200 }}>
          <img
            src={mapImage}
            alt="Map preview"
            className="w-full h-full object-cover"
          />
          {/* Live Preview badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-bold text-gray-800 tracking-wide uppercase">Live Preview</span>
          </div>
          {/* Map pin marker */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 border-2 border-brand-500 flex items-center justify-center">
                <MapPin size={20} className="text-brand-600" fill="#22c55e" fillOpacity={0.3} />
              </div>
              <div className="w-2 h-2 rounded-full bg-brand-500 mt-0.5" />
            </div>
          </div>
        </div>

        {/* Coordinates row */}
        <div className="flex items-center justify-between mx-4 mt-3 px-1">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-brand-500" />
            <span className="text-[13px] text-gray-600 font-medium">13.75633, 121.03456</span>
          </div>
          <div className="px-3 py-1 rounded-lg border border-gray-200 bg-gray-50">
            <span className="text-[12px] text-gray-500 font-medium">Manila, PH</span>
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
          <button className="w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-200 hover:bg-brand-600 active:scale-[0.97] transition-all duration-200">
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
          {(
            [
              { tab: 'home' as Tab, Icon: Home, label: 'Home' },
              { tab: 'explore' as Tab, Icon: Search, label: 'Explore' },
              { tab: 'report' as Tab, Icon: Camera, label: 'Report' },
              { tab: 'profile' as Tab, Icon: User, label: 'Profile' },
            ] as const
          ).map(({ tab, Icon, label }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
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
