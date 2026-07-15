import { Apple } from 'lucide-react';

export default function SocialAuth() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className="h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" className="text-blue-500"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133v-2.8h-4.053v-3.28H8.48v6.027c1.227.587 2.693.92 4.32.92 5.227 0 9.573-3.467 9.573-9.6 0-.587-.053-1.16-.16-1.72H12.48z"/><path fill="currentColor" d="M12.48 21c2.64 0 4.853-.867 6.473-2.36l-3.107-2.413c-.867.587-1.973.947-3.367.947-2.587 0-4.773-1.747-5.56-4.093H6.707v2.507C8.32 18.987 10.16 21 12.48 21z"/><path fill="currentColor" d="M6.92 14.18c-.2-.587-.32-1.213-.32-1.853s.12-1.267.32-1.853V7.967H3.947C3.347 9.16 3 10.54 3 12s.347 2.84.947 4.033L6.92 14.18z"/><path fill="currentColor" d="M12.48 7.24c1.44 0 2.733.493 3.76 1.467l2.813-2.813C17.32 4.187 15.12 3 12.48 3 10.16 3 8.32 4.013 6.707 5.967L9.92 8.18c.787-2.347 2.973-4.093 5.56-4.093z"/></svg>
        Google
      </button>
      <button className="h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        <Apple size={20} className="text-gray-900" />
        Apple
      </button>
    </div>
  );
}
