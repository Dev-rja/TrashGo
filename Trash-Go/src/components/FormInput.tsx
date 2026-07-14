import { ReactNode } from 'react';

interface Props {
  label: string;
  type: string;
  placeholder: string;
  trailing?: ReactNode;
}

export default function FormInput({ label, type, placeholder, trailing }: Props) {
  return (
    <div>
      <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
        />
        {trailing && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
    </div>
  );
}
