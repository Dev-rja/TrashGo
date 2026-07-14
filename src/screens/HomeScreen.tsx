import { useState } from 'react';
import { MapPinOff, Camera, Home, Search, User, Zap, AlertCircle } from 'lucide-react';
import LocationPermissionModal from '../components/LocationPermissionModal';

type Tab = 'home' | 'explore' | 'report' | 'profile';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onOpenCamera: () => void;
}

export default function HomeScreen({ activeTab, onTabChange, onOpenCamera }: Props) {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
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
            src="/avatar.png"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover bg-gray-200"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4">
        {/* Location unavailable card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          {/* Grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
              backgroundSize: '52px 52px',
            }}
          />
          <div className="relative flex flex-col items-center justify-center px-6 py-10">
            <div className="w-16 h-16 rounded-full bg-gray-200/70 flex items-center justify-center mb-5">
              <MapPinOff size={28} className="text-gray-400" strokeWidth={1.75} />
            </div>
            <h2 className="text-[18px] font-bold text-gray-800 mb-2">Location unavailable</h2>
            <p className="text-[14px] text-gray-500 text-center mb-6 max-w-[220px] leading-relaxed">
              Enable GPS to pin your environment report accurately.
            </p>
            <button
              onClick={() => setShowLocationModal(true)}
              className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-[14px] font-semibold text-gray-800 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200"
            >
              Enable location
            </button>
          </div>
        </div>

        {/* GPS signal status */}
        <div className="flex items-center gap-2 mt-3 px-1">
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="text-[12px] text-gray-500">No active GPS signal detected</span>
        </div>

        {/* GPS Disabled warning */}
        <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-bold text-gray-800 mb-1">GPS Disabled</p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Location is needed for precise pinning. Reports without coordinates may take longer to
              process.
            </p>
          </div>
        </div>

        {/* Report hotspot */}
        <div className="flex flex-col items-center mt-16">
          <button
            onClick={onOpenCamera}
            className="w-28 h-28 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-200 active:scale-95 transition-transform duration-200"
          >
            <Camera size={40} className="text-gray-900" strokeWidth={2} />
          </button>
          <span className="mt-4 text-[16px] font-extrabold text-brand-500 tracking-tight">
            REPORT HOTSPOT
          </span>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-100 px-6 py-3">
        <div className="flex items-center justify-around">
          {([
            { tab: 'home' as Tab, Icon: Home, label: 'Home' },
            { tab: 'explore' as Tab, Icon: Search, label: 'Explore' },
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
                  className={isActive ? 'text-brand-500' : 'text-gray-500'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                  className={`text-[11px] font-medium ${isActive ? 'text-brand-500' : 'text-gray-500'}`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {showLocationModal && (
        <LocationPermissionModal
          onAllow={() => setShowLocationModal(false)}
          onSkip={() => setShowLocationModal(false)}
          onClose={() => setShowLocationModal(false)}
        />
      )}
    </div>
  );
}
