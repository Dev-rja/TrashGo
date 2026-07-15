import {
  ChevronLeft,
  MoreVertical,
  MapPin,
  Check,
  Star,
  Wallet,
  Clock,
  Calendar,
  CheckCircle2,
  Share2,
  Home,
} from 'lucide-react';

interface Props {
  photo?: string;
  address?: string;
  distance?: string;
  condition?: string;
  rating?: number;
  notes?: string;
  earnings?: string;
  onClose?: () => void;
  onHome?: () => void;
}

export default function AftermathSubmittedScreen({
  photo,
  address = '123 River Road',
  distance = '1.2km away',
  condition = 'Fully Cleared',
  rating = 5,
  notes = 'Area fully cleared. Removed 3 bags of litter and debris.',
  earnings = '$45.00',
  onClose,
  onHome,
}: Props) {
  const submittedTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const submittedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3.5 border-b border-gray-100">
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center text-gray-800 active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-gray-900">
          Aftermath Submitted
        </h1>
        <button className="w-9 h-9 flex items-center justify-center text-gray-500 active:scale-95 transition-transform">
          <MoreVertical size={22} />
        </button>
      </div>

      {/* Progress steps — all complete */}
      <div className="flex px-4 pt-3 pb-0 gap-1.5">
        {['Review', 'Upload', 'Complete'].map((label) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="h-1 w-full rounded-full bg-gray-900" />
            <span className="text-[10px] font-semibold tracking-wide text-gray-900">
              {label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Success icon — concentric rings matching app pattern */}
        <div className="flex justify-center pt-8 pb-2">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-gray-200" />
            <span className="absolute inset-2.5 rounded-full border border-gray-200" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-900 shadow-md">
              <Check size={36} strokeWidth={3} className="text-white" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-[24px] font-extrabold tracking-tight text-gray-900">
          Cleanup Complete!
        </h1>
        <p className="mx-auto mt-2 max-w-[280px] text-center text-[14px] leading-relaxed text-gray-500">
          Your aftermath report has been submitted and verified. Reward has been credited to your wallet.
        </p>

        {/* Submitted timestamp pill */}
        <div className="mt-4 flex justify-center">
          <span className="rounded-full bg-gray-100 px-4 py-2 text-[12px] text-gray-500">
            Submitted at {submittedTime} · {submittedDate}
          </span>
        </div>

        {/* Uploaded photo */}
        <div className="mx-4 mt-6">
          <p className="text-[11px] font-bold tracking-wide text-gray-400 mb-2">
            CLEANUP PHOTO
          </p>
          <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100" style={{ height: 200 }}>
            {photo ? (
              <img src={photo} alt="Aftermath" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle2 size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-[13px] text-gray-400">Photo uploaded</p>
                </div>
              </div>
            )}
            {/* Verified badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 shadow-sm">
              <CheckCircle2 size={12} className="text-white" fill="white" />
              <span className="text-[10px] font-bold text-white tracking-wide">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Reward card */}
        <div className="mx-4 mt-4">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
              <Wallet size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold tracking-wide text-gray-400">EARNINGS</p>
              <p className="mt-0.5 text-[22px] font-extrabold text-gray-900 leading-none">{earnings}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[11px] text-gray-400">Credited</span>
              <span className="text-[12px] font-semibold text-gray-700">Just now</span>
            </div>
          </div>
        </div>

        {/* Cleanup details */}
        <div className="mx-4 mt-6">
          <p className="text-[11px] font-bold tracking-wide text-gray-400 mb-2">
            CLEANUP DETAILS
          </p>
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden divide-y divide-gray-50">
            {/* Location */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <MapPin size={15} className="text-gray-500" />
              </div>
              <span className="text-[13px] text-gray-400 w-20 shrink-0">Location</span>
              <span className="flex-1 text-[14px] font-semibold text-gray-900 truncate">
                {address}
              </span>
              <span className="text-[11px] text-gray-400 shrink-0">{distance}</span>
            </div>

            {/* Condition */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <CheckCircle2 size={15} className="text-gray-500" />
              </div>
              <span className="text-[13px] text-gray-400 w-20 shrink-0">Condition</span>
              <span className="flex-1 text-[14px] font-semibold text-gray-900">
                {condition}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <Star size={15} className="text-gray-500" />
              </div>
              <span className="text-[13px] text-gray-400 w-20 shrink-0">Rating</span>
              <div className="flex items-center gap-0.5 flex-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={14}
                    fill={n <= rating ? '#111827' : 'none'}
                    stroke={n <= rating ? '#111827' : '#d1d5db'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <Calendar size={15} className="text-gray-500" />
              </div>
              <span className="text-[13px] text-gray-400 w-20 shrink-0">Date</span>
              <span className="flex-1 text-[14px] font-semibold text-gray-900">
                {submittedDate}
              </span>
            </div>

            {/* Time spent */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <Clock size={15} className="text-gray-500" />
              </div>
              <span className="text-[13px] text-gray-400 w-20 shrink-0">Time Spent</span>
              <span className="flex-1 text-[14px] font-semibold text-gray-900">
                1h 45m
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mx-4 mt-6">
            <p className="text-[11px] font-bold tracking-wide text-gray-400 mb-2">
              NOTES
            </p>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5">
              <p className="text-[14px] text-gray-700 leading-relaxed">{notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-sm px-4 pb-6 pt-3 border-t border-gray-100">
        <button
          onClick={onHome ?? onClose}
          className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-gray-900 text-white text-[16px] font-bold active:scale-[0.98] shadow-lg shadow-black/10 transition-all"
        >
          <Home size={18} />
          Back to Home
        </button>
        <button
          onClick={onClose}
          className="mt-3 flex items-center justify-center gap-2 w-full text-[14px] font-semibold text-gray-500 active:scale-[0.98] transition-transform"
        >
          <Share2 size={15} />
          Share Cleanup Report
        </button>
      </div>
    </div>
  );
}
