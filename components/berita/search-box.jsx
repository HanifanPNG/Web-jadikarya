import { Search } from "lucide-react";

export default function SearchBox({ defaultValue = "", placeholder = "Cari berita...", hiddenTags = [], basePath = "/berita" }) {
  return (
    <form action={basePath} method="GET" className="relative">
      {hiddenTags.map((slug) => (
        <input key={slug} type="hidden" name="tag" value={slug} />
      ))}
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label="Cari berita"
        className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4532]/30 focus:border-[#0A4532] transition-shadow"
      />
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    </form>
  );
}