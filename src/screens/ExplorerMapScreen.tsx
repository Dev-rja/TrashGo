import { ChevronLeft, Zap, Plus, Minus, Navigation, List, MapPin, AlertTriangle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function ExplorerMapScreen({ onBack }: Props) {
  return (
    <div className="absolute inset-0 z-[960] flex flex-col overflow-hidden bg-gray-100">
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="flex h-8 w-8 items-center justify-center text-gray-800 active:scale-90 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 shadow-sm shadow-brand-200">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="text-[16px] font-bold text-gray-900">Explorer Mode</span>
        </div>
        <div className="relative">
          <img
            src="/avatar.png"
            alt="Profile"
            className="h-9 w-9 rounded-full bg-gray-200 object-cover"
          />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-brand-500 border-2 border-white" />
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Map background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg,#eef2f0 0%,#e7ecea 45%,#dfe5e8 100%)',
          }}
        />
        {/* Faint street lines (decorative) */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(115deg, transparent 48%, rgba(255,255,255,0.7) 49%, rgba(255,255,255,0.7) 51%, transparent 52%), linear-gradient(25deg, transparent 68%, rgba(255,255,255,0.6) 69%, rgba(255,255,255,0.6) 70.5%, transparent 71.5%)',
            backgroundSize: '340px 340px, 260px 520px',
          }}
        />

        {/* Marker: location pin (top-right) */}
        <div className="absolute right-16 top-[20%]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full rounded-bl-none border-2 border-brand-500 bg-white shadow-md">
            <MapPin size={20} className="text-brand-600" />
          </div>
        </div>

        {/* Marker: warning (dark, center) */}
        <div className="absolute left-[38%] top-[52%]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full rounded-bl-none border-2 border-brand-500 bg-gray-900 shadow-md">
            <AlertTriangle size={20} className="text-brand-400" />
          </div>
        </div>

        {/* Marker: warning (outline, lower) */}
        <div className="absolute left-[58%] top-[68%]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full rounded-bl-none border-2 border-brand-500 bg-white shadow-md">
            <AlertTriangle size={20} className="text-brand-600" />
          </div>
        </div>

        {/* Info card popup */}
        <div className="absolute left-5 top-[36%] w-[210px]">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
            <div className="relative h-24 w-full">
              <img
                src="/captured-hotspot.png"
                alt="Illegal dumping site"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white drop-shadow">
                Reported 3 min ago
              </span>
            </div>
            <div className="px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-brand-600">8m Accuracy</span>
                <span className="text-[11px] font-medium text-gray-400">ID: 4882</span>
              </div>
              <p className="mt-1 text-[14px] font-bold text-gray-900">Illegal Dumping site A</p>
            </div>
          </div>
          {/* pointer tail */}
          <div className="mx-auto h-3 w-3 -translate-y-1.5 rotate-45 border-b border-r border-gray-100 bg-white" />
        </div>

        {/* Map controls (right) */}
        <div className="absolute right-4 top-[26%] flex flex-col gap-3">
          <button
            aria-label="Zoom in"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-md active:scale-90 transition-transform"
          >
            <Plus size={18} />
          </button>
          <button
            aria-label="Zoom out"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-md active:scale-90 transition-transform"
          >
            <Minus size={18} />
          </button>
          <button
            aria-label="My location"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-md active:scale-90 transition-transform"
          >
            <Navigation size={18} />
          </button>
          <button
            aria-label="List view"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-md active:scale-90 transition-transform"
          >
            <List size={18} />
          </button>
        </div>

        {/* Report FAB */}
        <button className="absolute bottom-6 right-4 flex h-[68px] w-[68px] flex-col items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-300 active:scale-95 transition-transform">
          <Plus size={22} strokeWidth={2.5} />
          <span className="text-[10px] font-bold tracking-wide">REPORT</span>
        </button>
      </div>

      {/* Bottom sheet */}
      <div className="relative z-20 rounded-t-3xl border-t border-gray-100 bg-white px-6 pb-8 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-200" />
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-bold text-gray-900">Nearby Activity</span>
          <button className="text-[14px] font-semibold text-brand-600 active:scale-95 transition-transform">
            Expand
          </button>
        </div>
      </div>
    </div>
  );
}
