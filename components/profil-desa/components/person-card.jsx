import { PhotoCircle } from "./photo-circle";

export function PersonCard({
  jabatan,
  nama,
  inisial,
  foto = "",
  variant = "default",
  accent = "from-[#0A4532] via-[#0E5A42] to-emerald-400",
  www = "max-w-[230px]",
}) {
  const isPrimary = variant === "primary";
  const isStaf = variant === "staf";
  const size = isPrimary ? "lg" : isStaf ? "sm" : "md";
  const ring = "border-slate-200/90";
  const shadow = isPrimary
    ? "shadow-[0_18px_32px_-18px_rgba(15,23,42,0.55)]"
    : isStaf
    ? "shadow-[0_8px_16px_-12px_rgba(15,23,42,0.3)]"
    : "shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)]";

  return (
    <article
      className={`group relative mx-auto w-full overflow-hidden rounded-[1.35rem] border bg-white/95 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-18px_rgba(15,23,42,0.55)] ${www} ${ring} ${shadow} ${
        isStaf ? "p-2.5" : "p-3.5"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(10,69,50,0.06),transparent_24%),radial-gradient(circle_at_84%_86%,rgba(255,255,255,0.65),transparent_20%)] opacity-80" />
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <PhotoCircle foto={foto} inisial={inisial} size={size} />
      <p
        className={`mt-2.5 font-extrabold leading-5 text-slate-900 ${
          isStaf ? "text-xs" : "text-sm"
        }`}
      >
        {nama}
      </p>
      <p
        className={`mt-1.5 rounded-xl border bg-gradient-to-r px-2.5 py-1.5 font-bold uppercase tracking-[0.1em] ${
          isStaf ? "text-[10px]" : "text-[11px]"
        } ${
          isPrimary
            ? "border-slate-200 from-slate-50 to-sky-50/70 text-slate-700"
            : isStaf
            ? "border-slate-200/60 from-slate-50/80 to-slate-100/40 text-slate-500"
            : "border-slate-200 from-slate-50 to-slate-100/60 text-slate-600"
        }`}
      >
        {jabatan}
      </p>
    </article>
  );
}
