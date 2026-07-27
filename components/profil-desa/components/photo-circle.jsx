export function PhotoCircle({ foto, inisial, size = "md" }) {
  const dim = {
    lg: "h-24 w-24 text-2xl",
    md: "h-20 w-20 text-lg",
    sm: "h-16 w-16 text-base",
  };
  const ring = "ring-slate-100/80 border-slate-200/80";
  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-full border bg-slate-100 ${dim[size]} ${ring}`}
    >
      {foto ? (
        <img
          src={foto}
          alt={inisial}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0A4532] to-[#0E5A42] font-extrabold text-white">
          {inisial}
        </div>
      )}
    </div>
  );
}
