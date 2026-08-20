import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function buildHref(basePath, page, search, tags) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  (tags || []).forEach((slug) => params.append("tag", slug));
  if (page > 1) params.set("halaman", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({ basePath, page, totalPages, search = "", tags = [] }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Paginasi">
      {page > 1 ? (
        <Link
          href={buildHref(basePath, page - 1, search, tags)}
          className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-[#0A4532] transition-colors"
        >
          <ChevronLeft size={16} />
          Sebelumnya
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-100 bg-slate-50 text-sm font-medium text-slate-300 cursor-not-allowed">
          <ChevronLeft size={16} />
          Sebelumnya
        </span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <Link
          key={num}
          href={buildHref(basePath, num, search, tags)}
          className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
            num === page
              ? "bg-[#0A4532] text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-[#0A4532]"
          }`}
        >
          {num}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={buildHref(basePath, page + 1, search, tags)}
          className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-[#0A4532] transition-colors"
        >
          Berikutnya
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-100 bg-slate-50 text-sm font-medium text-slate-300 cursor-not-allowed">
          Berikutnya
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}