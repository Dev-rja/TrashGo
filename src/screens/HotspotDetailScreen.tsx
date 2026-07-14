import { ChevronLeft, Navigation, MoreHorizontal, MapPin, Info } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function HotspotDetailScreen({ onBack }: Props) {
  return (
    <div className="absolute inset-0 z-[970] flex flex-col overflow-hidden bg-gray-100">
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-8 w-8 items-center justify-center text-gray-800 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-[16px] font-bold text-gray-900">Hotspot Map</span>
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
            background: 'linear-gradient(135deg,#eef2f0 0%,#e7ecea 45%,#dfe5e8 100%)',
          }}
        />
        {/* Faint street lines (decorative) */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(118deg, transparent 47%, rgba(255,255,255,0.75) 48%, rgba(255,255,255,0.75) 50%, transparent 51%), linear-gradient(30deg, transparent 66%, rgba(255,255,255,0.65) 67%, rgba(255,255,255,0.65) 68.5%, transparent 69.5%)',
            backgroundSize: '360px 360px, 300px 560px',
          }}
        />

        {/* Marker: location pin (left) */}
        <div className="absolute left-[16%] top-[26%]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full rounded-bl-none border-2 border-brand-500 bg-white shadow-md">
            <MapPin size={18} className="text-brand-600" />
          </div>
        </div>

        {/* Marker: location pin (right) */}
        <div className="absolute right-[24%] top-[40%]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full rounded-bl-none border-2 border-brand-500 bg-white shadow-md">
            <MapPin size={18} className="text-brand-600" />
          </div>
        </div>

        {/* Info card popup (selected hotspot) */}
        <div className="absolute left-1/2 top-[46%] w-[230px] -translate-x-1/2">
          <div className="overflow-hidden rounded-2xl border-2 border-brand-500 bg-white shadow-xl">
            <div className="relative h-28 w-full">
              <img
                src="/captured-hotspot.png"
                alt="Illegal dumping site"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-2.5 space-y-0.5">
                <p className="text-[11px] font-semibold text-white drop-shadow">Reported 3 min ago</p>
                <p className="text-[11px] font-semibold text-white/90 drop-shadow">8m Accuracy</p>
              </div>
            </div>
          </div>
          {/* selected pin marker on the tail */}
          <div className="mx-auto -mt-3 flex h-10 w-10 items-center justify-center rounded-full rounded-bl-none border-2 border-brand-500 bg-brand-500 shadow-md">
            <MapPin size={18} className="text-white" />
          </div>
        </div>

        {/* Map controls (right) */}
        <div className="absolute right-4 top-6 flex flex-col gap-3">
          <button
            aria-label="My location"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-md active:scale-90 transition-transform"
          >
            <Navigation size={18} />
          </button>
          <button
            aria-label="More options"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-md active:scale-90 transition-transform"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Bottom sheet: hotspot details */}
      <div className="relative z-20 rounded-t-3xl border-t border-gray-100 bg-white px-6 pb-8 pt-5 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        {/* Reporter row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/avatar.png"
              alt="Alex K."
              className="h-11 w-11 rounded-full bg-gray-200 object-cover"
            />
            <div>
              <p className="text-[17px] font-bold text-gray-900">Illegal Dumping</p>
              <p className="text-[13px] text-gray-500">
                Reported by <span className="font-semibold text-gray-700">Alex K.</span>
              </p>
            </div>
          </div>
          <span className="rounded-full border border-brand-500 px-3 py-1 text-[12px] font-semibold text-brand-600">
            Active Hotspot
          </span>
        </div>

        {/* Description box */}
        <div className="mt-4 flex gap-3 rounded-xl bg-gray-50 px-4 py-3">
          <Info size={18} className="mt-0.5 shrink-0 text-brand-500" />
          <p className="text-[13px] leading-relaxed text-gray-600">
            Large collection of plastic waste and construction debris obstructing the sidewalk.
            Accuracy within 8 meters.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-500 py-4 text-[16px] font-bold text-white shadow-lg shadow-brand-200 hover:bg-brand-600 active:scale-[0.98] transition-all">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Accept
          </button>
          <button
            aria-label="Navigate to hotspot"
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 active:scale-95 transition-transform"
          >
            <Navigation size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
