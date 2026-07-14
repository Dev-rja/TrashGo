import { useEffect, useRef, useState } from 'react';
import { X, Zap, RefreshCw, Image as ImageIcon } from 'lucide-react';

interface Props {
  onClose: () => void;
  onCapture?: (dataUrl: string) => void;
}

export default function CameraScreen({ onClose, onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setError(false);
      } catch {
        setError(true);
      }
    }

    start();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [facingMode]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (error || !video || !video.videoWidth) {
      onCapture?.('');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 1280;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    onCapture?.(dataUrl);
  };

  return (
    <div className="absolute inset-0 z-[1000] flex flex-col bg-black">
      {/* Live camera viewfinder */}
      <div className="relative flex-1 overflow-hidden">
        {error ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-gray-400 via-white to-gray-500 px-8 text-center">
            <p className="text-[15px] font-semibold text-gray-800">Camera unavailable</p>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Allow camera access to capture and report a waste hotspot.
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        )}

        {/* Top controls */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5">
          <button
            onClick={onClose}
            aria-label="Close camera"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm active:scale-95 transition-transform"
          >
            <X size={22} />
          </button>
          <button
            aria-label="Toggle flash"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm active:scale-95 transition-transform"
          >
            <Zap size={20} />
          </button>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="flex items-center justify-between px-10 pb-10 pt-6 bg-black">
        <button
          aria-label="Open gallery"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white active:scale-95 transition-transform"
        >
          <ImageIcon size={22} />
        </button>

        {/* Shutter */}
        <button
          onClick={handleCapture}
          aria-label="Capture photo"
          className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white active:scale-95 transition-transform"
        >
          <span className="h-14 w-14 rounded-full bg-white" />
        </button>

        <button
          onClick={() => setFacingMode((m) => (m === 'environment' ? 'user' : 'environment'))}
          aria-label="Switch camera"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white active:scale-95 transition-transform"
        >
          <RefreshCw size={22} />
        </button>
      </div>
    </div>
  );
}
