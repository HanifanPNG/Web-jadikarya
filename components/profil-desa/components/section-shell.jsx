export function SectionShell({ children, className = "" }) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/60 backdrop-blur-lg px-5 py-7 shadow-xl shadow-black/5 sm:px-10 sm:py-8 " +
        className
      }
    >
      {children}
    </div>
  );
}
