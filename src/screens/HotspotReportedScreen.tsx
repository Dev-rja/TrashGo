import { Check, MapPin, Navigation } from 'lucide-react';

interface Props {
  coords?: string;
  accuracy?: string;
  onClose: () => void;
  onViewMap?: () => void;
}

export default function HotspotReportedScreen({ coords, accuracy, onClose, onViewMap }: Props) {
  const displayCoords = coords ?? '13.75633, 121.03456';
  const displayAccuracy = accuracy ?? '± 8m';
  const pinnedTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className="absolute inset-0 z-[950] flex flex-col overflow-y-auto px-6 pb-8 pt-16"
      style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f4faf5 100%)' }}
    >
      {/* Success icon */}
      <div className="flex justify-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-brand-100" />
          <span className="absolute inset-3 rounded-full border border-brand-100" />
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
            <Check size={36} strokeWidth={3} className="text-gray-900" />
          </span>
        </div>
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-center text-[30px] font-extrabold tracking-tight text-gray-900">
        Hotspot Reported
      </h1>
      <p className="mx-auto mt-3 max-w-[280px] text-center text-[15px] leading-relaxed text-gray-500">
        Thank you! Your report helps keep our community clean and safe.
      </p>

      {/* Coordinates card */}
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100">
            <MapPin size={18} className="text-brand-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold tracking-wide text-gray-400">COORDINATES</p>
            <p className="mt-0.5 text-[17px] font-bold text-gray-900 font-mono">{displayCoords}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 px-3.5 py-2.5">
          <span className="flex items-center gap-2 text-[13px] text-gray-500">
            <Navigation size={14} />
            Accuracy
          </span>
          <span className="text-[13px] font-semibold text-gray-700">{displayAccuracy}</span>
        </div>
      </div>

      {/* Pinned pill */}
      <div className="mt-5 flex justify-center">
        <span className="rounded-full bg-gray-100 px-4 py-2 text-[13px] text-gray-500">
          Successfully pinned at {pinnedTime}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-10">
        <button
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-2xl bg-brand-500 py-4 text-[16px] font-bold text-gray-900 shadow-lg shadow-brand-200 hover:bg-brand-600 active:scale-[0.98] transition-all"
        >
          Close
        </button>
        <button
          onClick={onViewMap ?? onClose}
          className="mt-4 flex w-full items-center justify-center gap-2 text-[15px] font-semibold text-gray-800 active:scale-[0.98] transition-transform"
        >
          <MapPin size={16} />
          View on Map
        </button>
      </div>
    </div>
  );
}
