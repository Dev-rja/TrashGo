type Role = 'correspondent' | 'cleanfluencer';

interface Props {
  role: Role;
  onChange: (r: Role) => void;
}

export default function RoleTabs({ role, onChange }: Props) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1">
      <button
        onClick={() => onChange('correspondent')}
        className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-200 ${
          role === 'correspondent'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500'
        }`}
      >
        Correspondent
      </button>
      <button
        onClick={() => onChange('cleanfluencer')}
        className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-200 ${
          role === 'cleanfluencer'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500'
        }`}
      >
        Cleanfluencer
      </button>
    </div>
  );
}
