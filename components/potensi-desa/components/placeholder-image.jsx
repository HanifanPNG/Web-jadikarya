export default function PlaceholderImage({ label, color = "from-emerald-600 to-green-700", index = 0 }) {
  const icons = ["🌾", "🌿", "🐏", "🏔️", "🏘️"];
  const icon = icons[index % icons.length];
  return (
    <div
      className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${color} flex flex-col items-center justify-center text-white overflow-hidden shadow-lg`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5 blur-xl" />
      <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/5 blur-xl" />
      <span className="text-4xl sm:text-5xl mb-2 relative z-10">{icon}</span>
      <span className="text-[10px] sm:text-xs font-bold text-white/70 uppercase tracking-widest text-center px-2 relative z-10">
        {label}
      </span>
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-white/20">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}
