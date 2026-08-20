import Link from "next/link";
import Image from "next/image";
import { Newspaper } from "lucide-react";
import Navbar from "@/components/navbar";
import PemerintahDanKontak from "@/components/footer.tsx";
import { getPublishedNews, getAllTags } from "@/lib/queries";
import NewsCard from "@/components/berita/news-card";
import TagFilter from "@/components/berita/tag-filter";
import SearchBox from "@/components/berita/search-box";
import Pagination from "@/components/berita/pagination";

export const metadata = {
  title: "Berita Desa Jadikarya",
  description:
    "Portal berita dan informasi terbaru dari Desa Jadikarya, Kecamatan Langkaplancar, Kabupaten Pangandaran.",
};

export default async function BeritaPage({ searchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const rawPage = typeof params.halaman === "string" ? Number.parseInt(params.halaman, 10) : 1;
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const rawTags = params.tag;
  const tagSlugs = Array.isArray(rawTags)
    ? rawTags.filter(Boolean)
    : rawTags
      ? [rawTags]
      : [];

  const [{ news, total, totalPages }, allTags] = await Promise.all([
    getPublishedNews({ page, pageSize: 4, search: q, tagSlugs }),
    getAllTags(),
  ]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAF8] via-white to-[#E8F0EC]">
      {/* Header */}
      <section className="relative pt-32 pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden bg-[#0A4532]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/alam/alam3.webp"
            alt="Pemandangan Desa Jadikarya"
            fill
            priority
            sizes="(max-width: 768px) 150vw, 100vw"
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#041a12]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        </div>
        <div className="absolute inset-0 bg-village-grid-dark opacity-25 pointer-events-none select-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 bg-gradient-to-t from-[#0A4532] to-transparent z-[3] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-white">
              Selamat Datang di 
            </span>
          </div>
          <h1 className="font-inter font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Portal Berita <span className="text-yellow-500 font-lobster">Jadikarya</span>
          </h1>
          <p className="text-white/75 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Informasi, kegiatan, dan pengumuman terbaru dari Desa Jadikarya.
          </p>

          <div className="max-w-md mt-6">
            <SearchBox defaultValue={q} placeholder="Cari judul berita..." hiddenTags={tagSlugs} />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main: news grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-slate-800 text-lg">
                {q ? (
                  <>
                    Hasil pencarian{" "}
                    <span className="text-[#0A4532]">&quot;{q}&quot;</span>
                  </>
                ) : (
                  "Berita Terbaru"
                )}
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {total} berita
              </span>
            </div>

            {news.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 py-16 text-center">
                <p className="text-slate-500 font-medium">Belum ada berita ditemukan.</p>
                <Link
                  href="/berita"
                  className="inline-block mt-3 text-sm font-semibold text-[#0A4532] hover:underline"
                >
                  Reset filter & lihat semua berita
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {news.map((item) => (
                    <NewsCard key={item.id} news={item} />
                  ))}
                </div>
                <Pagination
                  basePath="/berita"
                  page={page}
                  totalPages={totalPages}
                  search={q}
                  tags={tagSlugs}
                />
              </>
            )}
          </section>

          {/* Sidebar: Tag filter */}
          <aside className="space-y-6">
            <TagFilter tags={allTags} activeSlugs={tagSlugs} basePath="/berita" />
          </aside>
        </div>
      </div>
      </div>
      <PemerintahDanKontak />
    </>
  );
}