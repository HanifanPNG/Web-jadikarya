export function GlassCard({ children, className = "" }) {
  return (
    <div
      className={
        "rounded-xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg shadow-black/5 transition-all duration-200 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 " +
        className
      }
    >
      {children}
    </div>
  );
}
