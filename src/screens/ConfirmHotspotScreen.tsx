import { useState } from 'react';
import { ChevronLeft, Clock, Navigation, Trash2, Truck, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

interface Props {
  photo?: string;
  coords?: string;
  onBack: () => void;
  onRetake: () => void;
  onConfirm: (type: string) => void;
}

type HotspotType = 'litter' | 'dump' | 'obstruction';

const TYPES: { id: HotspotType; label: string; Icon: typeof Trash2 }[] = [
  { id: 'litter', label: 'Litter', Icon: Trash2 },
  { id: 'dump', label: 'Illegal Dump', Icon: Truck },
  { id: 'obstruction', label: 'Obstruction', Icon: AlertTriangle },
];

export default function ConfirmHotspotScreen({ photo, coords, onBack, onRetake, onConfirm }: Props) {
  const [selected, setSelected] = useState<HotspotType>('litter');
  const displayCoords = coords ?? '13.75633, 121.03456';
  const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="absolute inset-0 z-[900] flex flex-col overflow-y-auto bg-gray-100">
      {/* Header */}
      <div className="flex items-center px-4 py-3.5 bg-gray-100">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-[16px] font-bold text-gray-900 pr-9">
          Confirm Hotspot
        </h1>
      </div>

      {/* Captured photo */}
      <div className="relative h-[280px] w-full overflow-hidden bg-gray-300">
        <img
          src={photo || '/captured-hotspot.png'}
          alt="Captured waste hotspot"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-[11px] font-bold text-gray-800 tracking-wide">8m ACCURACY</span>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="flex-1 -mt-5 rounded-t-3xl bg-white px-5 pt-3 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {/* Drag handle */}
        <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-gray-200" />

        {/* Location card */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100">
            <Navigation size={18} className="text-brand-600" fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-gray-900 font-mono">{displayCoords}</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1 text-[12px] text-gray-500">
                <Clock size={12} />
                {time}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-gray-500">
                <Navigation size={12} />
                Rider Node #402
              </span>
            </div>
          </div>
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-200">
            <div className="relative h-full w-full bg-[#e8e6d8]">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#dcdcc8 0%,#e8e6d8 40%,#cfe0c8 100%)' }} />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-red-500 shadow" />
            </div>
          </div>
        </div>

        {/* Hotspot type */}
        <div className="mt-6 mb-3 flex items-baseline justify-between">
          <h2 className="text-[18px] font-bold text-gray-900">Hotspot Type</h2>
          <span className="text-[13px] text-gray-400">Select one</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {TYPES.map(({ id, label, Icon }) => {
            const isActive = selected === id;
            return (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className={`flex flex-col items-center gap-2.5 rounded-2xl border py-4 transition-all ${
                  isActive
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${
                    isActive ? 'bg-brand-500' : 'bg-gray-100'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                </span>
                <span className={`text-[13px] font-semibold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Confirm button */}
        <button
          onClick={() => onConfirm(selected)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-4 text-[16px] font-bold text-white shadow-lg shadow-brand-200 hover:bg-brand-600 active:scale-[0.98] transition-all"
        >
          <CheckCircle2 size={20} />
          Confirm &amp; Pin Hotspot
        </button>

        {/* Retake */}
        <button
          onClick={onRetake}
          className="mt-4 flex w-full items-center justify-center gap-2 text-[14px] font-medium text-gray-500 active:scale-[0.98] transition-transform"
        >
          <RefreshCw size={16} />
          Retake Photo
        </button>
      </div>
    </div>
  );
}
