import { useState, useRef } from 'react';
import {
  ChevronLeft,
  MoreVertical,
  MapPin,
  ImagePlus,
  X,
  Camera,
  FileText,
  CheckCircle2,
  Upload,
  Star,
} from 'lucide-react';

interface Props {
  hotspot?: {
    address: string;
    distance: string;
    thumbnail?: string;
  };
  onBack: () => void;
  onSubmit?: () => void;
}

const STEP_LABELS = ['Review', 'Upload', 'Complete'];

const CONDITION_OPTIONS = [
  { id: 'fully', label: 'Fully Cleared' },
  { id: 'mostly', label: 'Mostly Cleared' },
  { id: 'partial', label: 'Partially Cleared' },
];

export default function UploadAftermathScreen({
  hotspot = {
    address: '123 River Road',
    distance: '1.2km away',
  },
  onBack,
  onSubmit,
}: Props) {
  const [step] = useState(1); // 0-indexed, currently on Upload step
  const [photo, setPhoto] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [condition, setCondition] = useState<string>('fully');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const displayDate = new Date();
  const dayName = displayDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dayNum = displayDate.getDate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3.5 border-b border-gray-100">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-gray-800 active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-gray-900">
          Upload Aftermath
        </h1>
        <button className="w-9 h-9 flex items-center justify-center text-gray-500 active:scale-95 transition-transform">
          <MoreVertical size={22} />
        </button>
      </div>

      {/* Progress steps */}
      <div className="flex px-4 pt-3 pb-0 gap-1.5">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className={`h-1 w-full rounded-full transition-colors duration-300 ${
                i <= step ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            />
            <span
              className={`text-[10px] font-semibold tracking-wide ${
                i === step ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">

        {/* Location card */}
        <div className="mx-4 mt-5 flex items-center gap-3 rounded-2xl border border-gray-150 bg-gray-50 p-3">
          <div className="w-[60px] h-[60px] rounded-xl overflow-hidden shrink-0 bg-gray-200">
            {hotspot.thumbnail ? (
              <img
                src={hotspot.thumbnail}
                alt="Hotspot"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/src/assets/images/image copy copy copy copy copy copy copy copy copy copy.png"
                alt="Hotspot"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-gray-900 truncate">{hotspot.address}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="text-gray-400" />
              <p className="text-[12px] text-gray-400">{hotspot.distance}</p>
            </div>
          </div>
        </div>

        {/* Cleanup Photo */}
        <div className="mx-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera size={16} className="text-gray-700" />
              <span className="text-[14px] font-bold text-gray-900">Cleanup Photo</span>
            </div>
            {photo && (
              <button
                onClick={() => setPhoto(null)}
                className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-gray-600"
              >
                <X size={13} /> Remove
              </button>
            )}
          </div>

          {photo ? (
            <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100" style={{ height: 200 }}>
              <img src={photo} alt="Aftermath" className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setPhoto(null)}
                  className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-3 active:bg-gray-100 transition-colors"
              style={{ height: 160 }}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <ImagePlus size={22} className="text-gray-500" />
              </div>
              <div className="text-center">
                <p className="text-[14px] font-semibold text-gray-700">Add aftermath photo</p>
                <p className="text-[12px] text-gray-400 mt-0.5">Tap to upload from gallery</p>
              </div>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
            <CheckCircle2 size={11} />
            Photo is required to submit and claim your reward.
          </p>
        </div>

        {/* Cleanup Condition */}
        <div className="mx-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} className="text-gray-700" />
            <span className="text-[14px] font-bold text-gray-900">Cleanup Condition</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {CONDITION_OPTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setCondition(id)}
                className={`py-3 rounded-xl border text-[12px] font-semibold transition-all duration-200 ${
                  condition === id
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Self Rating */}
        <div className="mx-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-gray-700" />
            <span className="text-[14px] font-bold text-gray-900">Self-Rate Your Work</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(n)}
                className="flex-1 flex items-center justify-center active:scale-95 transition-transform"
              >
                <Star
                  size={28}
                  className="transition-colors duration-150"
                  fill={(hoverRating || rating) >= n ? '#111827' : 'none'}
                  stroke={(hoverRating || rating) >= n ? '#111827' : '#d1d5db'}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-[11px] text-gray-400 mt-1.5 text-center">
              {['', 'Needs improvement', 'Fair effort', 'Good job', 'Great work!', 'Outstanding!'][rating]}
            </p>
          )}
        </div>

        {/* Cleanup Date */}
        <div className="mx-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-gray-700" />
            <span className="text-[14px] font-bold text-gray-900">Cleanup Date</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex flex-col items-center bg-gray-900 text-white rounded-lg px-3.5 py-2 min-w-[48px]">
              <span className="text-[10px] font-semibold tracking-widest">{dayName}</span>
              <span className="text-[20px] font-extrabold leading-none">{dayNum}</span>
            </div>
            <span className="text-[14px] font-semibold text-gray-700 ml-2">
              {displayDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Notes */}
        <div className="mx-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-gray-700" />
              <span className="text-[14px] font-bold text-gray-900">Notes</span>
            </div>
            <span className="text-[11px] text-gray-400">Optional</span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe the cleanup — what was found, challenges, tools used…"
            rows={3}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 resize-none outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Meeting point row — mirrors reference style */}
        <div className="mx-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-gray-700" />
            <span className="text-[14px] font-bold text-gray-900">Cleanup Location</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5">
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <span className="flex-1 text-[14px] font-medium text-gray-700 truncate">
              {hotspot.address} (Main Entrance)
            </span>
            <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shrink-0">
              <MapPin size={14} className="text-gray-500" />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5 ml-0.5 flex items-center gap-1">
            <CheckCircle2 size={11} />
            Defaults to hotspot location. Tap icon to refine.
          </p>
        </div>
      </div>

      {/* Submit CTA — full-width dark pill, matches reference */}
      <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-sm px-4 pb-6 pt-3 border-t border-gray-100">
        <button
          onClick={onSubmit}
          disabled={!photo}
          className={`flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-[16px] font-bold transition-all duration-200 ${
            photo
              ? 'bg-gray-900 text-white active:scale-[0.98] shadow-lg shadow-black/10'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Upload size={18} />
          Submit Aftermath
          {photo && <span className="ml-1 text-gray-400">›</span>}
        </button>
      </div>
    </div>
  );
}
