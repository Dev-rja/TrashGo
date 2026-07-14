interface Props {
  label: string;
}

export default function ContinueButton({ label }: Props) {
  return (
    <button className="w-full h-12 rounded-xl bg-brand-500 text-white text-[15px] font-semibold shadow-sm shadow-brand-200 hover:bg-brand-600 active:scale-[0.99] transition-all duration-200">
      {label}
    </button>
  );
}
