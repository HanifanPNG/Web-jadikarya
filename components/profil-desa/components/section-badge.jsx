export function SectionBadge({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A4532] shadow-sm">
      <Icon size={14} />
      {label}
    </div>
  );
}
