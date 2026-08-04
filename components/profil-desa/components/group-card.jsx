import { PersonCard } from "./person-card";

export function GroupCard({ tema, children, items = [], accent, columns }) {
  // Determine grid columns: use custom if provided, otherwise auto based on item count
  const itemCount = items.length;
  const gridCols =
    columns ||
    (itemCount === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : itemCount === 4
      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3");

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

      {/* If items with staf support are passed, render them */}
      {items.length > 0 ? (
        <div className={`grid gap-4 ${gridCols}`}>
          {items.map((item) => (
            <div key={item.id || item.jabatan} className="flex flex-col items-center gap-2">
              <PersonCard
                jabatan={item.jabatan}
                nama={item.nama}
                inisial={item.inisial}
                foto={item.foto}
                variant="default"
                accent={accent || tema.bar}
                www="max-w-full"
              />
              {item.staf && (
                <>
                  <div className="h-4 w-px bg-gradient-to-b from-slate-300 to-transparent" />
                  <PersonCard
                    jabatan={item.staf.jabatan}
                    nama={item.staf.nama}
                    inisial={item.staf.inisial}
                    foto={item.staf.foto}
                    variant="staf"
                    accent="from-slate-400 via-slate-300 to-slate-200"
                    www="max-w-full"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid gap-4 ${gridCols}`}>
          {children}
        </div>
      )}
    </div>
  );
}
