export function GroupCard({ tema, children }) {
  return (
    <div
      className={`relative rounded-2xl border bg-gradient-to-br p-4 sm:p-5 ${tema.border} ${tema.bg}`}
    >
      <div className="mb-4 flex items-center justify-center gap-2 text-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tema.badge}`}
        >
          {tema.label}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}
