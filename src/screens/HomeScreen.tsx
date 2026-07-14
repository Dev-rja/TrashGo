import { useState } from 'react';
import { MapPinOff, Camera, Home, Search, User, Zap, AlertCircle } from 'lucide-react';
import profileAvatar from '../assets/images/image copy copy copy copy copy.png';
import LocationPermissionModal from '../components/LocationPermissionModal';

type Tab = 'home' | 'explore' | 'profile';

interface Props {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export default function HomeScreen({ activeTab = 'home', onTabChange }: Props) {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top header */}
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

      {/* Main scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4 space-y-4">
        {/* Map placeholder with location unavailable state */}
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white" style={{ minHeight: 260 }}>
          {/* Grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              backgroundColor: '#f9fafb',
            }}
          />
          {/* Centered content */}
          <div className="relative flex flex-col items-center justify-center h-full py-12 px-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MapPinOff size={30} className="text-gray-400" />
            </div>
            <p className="text-[17px] font-bold text-gray-800 mb-2">Location unavailable</p>
            <p className="text-[13px] text-gray-500 text-center leading-snug mb-5">
              Enable GPS to pin your environment report accurately.
            </p>
            <button
              onClick={() => setShowLocationModal(true)}
              className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white text-[14px] font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              Enable location
            </button>
          </div>
        </div>

        {/* GPS status text */}
        <div className="flex items-center gap-1.5 px-1">
          <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
          <span className="text-[12px] text-gray-500">No active GPS signal detected</span>
        </div>

        {/* GPS Disabled warning banner */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-[14px] font-bold text-amber-700 mb-0.5">GPS Disabled</p>
            <p className="text-[13px] text-amber-600 leading-snug">
              Location is needed for precise pinning. Reports without coordinates may take longer to process.
            </p>
          </div>
        </div>

        {/* Report Hotspot CTA */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-4">
          <button className="w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-200 hover:bg-brand-600 active:scale-[0.97] transition-all duration-200">
            <Camera size={40} className="text-white" />
          </button>
          <span className="text-[16px] font-extrabold text-brand-500 tracking-widest uppercase">
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
              { tab: 'profile' as Tab, Icon: User, label: 'Profile' },
            ] as const
          ).map(({ tab, Icon, label }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className="flex flex-col items-center gap-1 min-w-[60px]"
              >
                <Icon
                  size={24}
                  className={isActive ? 'text-brand-500' : 'text-gray-400'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                  className={`text-[11px] font-medium ${
                    isActive ? 'text-brand-500' : 'text-gray-400'
                  }`}
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
