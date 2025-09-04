interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"></div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className={className}>
        {children}
      </div>
    </div>
  );
}