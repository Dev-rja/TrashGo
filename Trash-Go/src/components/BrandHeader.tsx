import { Trash2 } from 'lucide-react';

export default function BrandHeader() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-200">
        <Trash2 size={22} className="text-white" />
      </div>
      <span className="text-[20px] font-bold text-gray-900 tracking-tight">TrashGo</span>
    </div>
  );
}
