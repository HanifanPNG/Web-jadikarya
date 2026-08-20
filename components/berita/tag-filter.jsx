"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tags } from "lucide-react";

export default function TagFilter({ tags = [], activeSlugs = [], basePath = "/berita" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function toggle(slug) {
    const params = new URLSearchParams(searchParams.toString());
    const current = new Set(activeSlugs);

    if (current.has(slug)) current.delete(slug);
    else current.add(slug);

    params.delete("tag");
    current.forEach((s) => params.append("tag", s));

    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md shadow-sm p-5 lg:sticky lg:top-24">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#0A4532] flex items-center justify-center">
          <Tags size={14} className="text-white" />
        </div>
        <h2 className="font-bold text-slate-800">Tag Populer</h2>
      </div>

      {tags.length === 0 ? (
        <p className="text-xs text-slate-400 leading-relaxed">
          Belum ada tag. Admin dapat menambahkan tag melalui panel admin.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const active = activeSlugs.includes(tag.slug);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggle(tag.slug)}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  active
                    ? "bg-[#0A4532] text-white border-[#0A4532] shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#0A4532]/40 hover:text-[#0A4532]"
                }`}
              >
                #{tag.name}
              </button>
            );
          })}
        </div>
      )}
    </aside>
  );
}