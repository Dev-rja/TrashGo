import { Chrome, Apple } from 'lucide-react';

export default function SocialAuth() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className="h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        <Chrome size={20} className="text-blue-500" />
        Google
      </button>
      <button className="h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        <Apple size={20} className="text-gray-900" />
        Apple
      </button>
    </div>
  );
}
