import { useState } from 'react';
import { MapPinOff, Camera, Home, Search, User, Zap, AlertCircle } from 'lucide-react';
import LocationPermissionModal from '../components/LocationPermissionModal';

type Tab = 'home' | 'explore' | 'report' | 'profile';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function HomeScreen({ activeTab, onTabChange }: Props) {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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

      {/* Map area */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-gray-100 to-gray-200" />
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 40%, #86efac 0%, transparent 40%), radial-gradient(circle at 70% 60%, #bbf7d0 0%, transparent 40%)',
          }}
        />
        <div className="relative flex flex-col items-center justify-center h-full px-6">
          <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur flex items-center justify-center mb-5 shadow-lg">
            <MapPinOff size={36} className="text-gray-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-[18px] font-bold text-gray-700 mb-2">Location not enabled</h2>
          <p className="text-[14px] text-gray-500 text-center mb-6 max-w-[240px]">
            Enable location to see waste hotspots near you on the map
          </p>
          <button
            onClick={() => setShowLocationModal(true)}
            className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white text-[14px] font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            Enable location
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="bg-white px-4 pt-4 pb-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-brand-50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={16} className="text-brand-600" />
              <span className="text-[12px] font-semibold text-brand-700">Active Reports</span>
            </div>
            <p className="text-[28px] font-extrabold text-brand-700">12</p>
          </div>
          <div className="rounded-2xl bg-orange-50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-orange-500" />
              <span className="text-[12px] font-semibold text-orange-600">Resolved</span>
            </div>
            <p className="text-[28px] font-extrabold text-orange-600">48</p>
          </div>
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
