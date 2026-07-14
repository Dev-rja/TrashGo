import { X, MapPin, Info, Check } from 'lucide-react';

interface Props {
  onAllow: () => void;
  onSkip: () => void;
  onClose: () => void;
}

export default function LocationPermissionModal({ onAllow, onSkip, onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative w-full bg-white rounded-t-3xl px-6 pt-5 pb-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mt-2 mb-5">
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center">
            <MapPin size={28} className="text-brand-600" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[22px] font-bold text-gray-900 text-center mb-3">
          Allow location access
        </h2>

        {/* Description */}
        <p className="text-[14px] text-gray-500 text-center leading-relaxed mb-6">
          Enable GPS for precise waste pinning.{' '}
          Reports with accurate locations get{' '}
          <span className="font-bold text-gray-800">40% faster response</span>{' '}
          from our collection teams.
        </p>

        {/* Precise location option row */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 mb-6">
          <div className="w-9 h-9 rounded-full border-2 border-blue-200 flex items-center justify-center shrink-0">
            <Info size={16} className="text-blue-500" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-gray-800 leading-none mb-0.5">Precise location</p>
            <p className="text-[12px] text-brand-600 font-semibold">Highly recommended</p>
          </div>
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
            <Check size={14} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Allow & Continue button */}
        <button
          onClick={onAllow}
          className="w-full h-14 rounded-2xl bg-brand-500 text-white text-[16px] font-extrabold shadow-md shadow-brand-200 hover:bg-brand-600 active:scale-[0.99] transition-all duration-200 mb-4"
        >
          Allow &amp; Continue
        </button>

        {/* Skip link */}
        <button
          onClick={onSkip}
          className="w-full text-center text-[14px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          Capture without location
        </button>
      </div>
    </div>
  );
}
