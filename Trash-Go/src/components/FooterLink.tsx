interface Props {
  prompt: string;
  action: string;
  onClick?: () => void;
}

export default function FooterLink({ prompt, action, onClick }: Props) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      <span className="text-[14px] text-gray-500">{prompt}</span>
      <button
        onClick={onClick}
        className="text-[14px] font-semibold text-brand-600 hover:text-brand-700 transition-colors"
      >
        {action}
      </button>
    </div>
  );
}
