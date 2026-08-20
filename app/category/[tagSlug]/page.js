import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag } from "lucide-react";
import Navbar from "@/components/navbar";
import PemerintahDanKontak from "@/components/footer.tsx";
import { getTagBySlug, getPublishedNews, getAllTags } from "@/lib/queries";
import NewsCard from "@/components/berita/news-card";
import TagFilter from "@/components/berita/tag-filter";
import SearchBox from "@/components/berita/search-box";
import Pagination from "@/components/berita/pagination";

export async function generateMetadata({ params }) {
  const { tagSlug } = await params;
  const tag = await getTagBySlug(tagSlug);

  if (!tag) return { title: "Tag Tidak Ditemukan - Desa Jadikarya" };

  return {
    title: `Berita #${tag.name} - Desa Jadikarya`,
    description: `Kumpulan berita dengan tag ${tag.name} di Portal Berita Desa Jadikarya.`,
  };
}

export default async function CategoryTagPage({ params, searchParams }) {
  const { tagSlug } = await params;
  const sp = await searchParams;

  const tag = await getTagBySlug(tagSlug);
  if (!tag) notFound();

  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const rawPage = typeof sp.halaman === "string" ? Number.parseInt(sp.halaman, 10) : 1;
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const [{ news, total, totalPages }, allTags] = await Promise.all([
    getPublishedNews({ page, pageSize: 4, search: q, tagSlugs: [tagSlug] }),
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
            <Link
              href="/berita"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFE7D2]/80 hover:text-[#FFE7D2] transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              Kembali ke Berita
            </Link>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFE7D2]/10 flex items-center justify-center">
                <Tag size={20} className="text-[#FFE7D2]" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FFE7D2]/80">
                Tag Berita
              </span>
            </div>

            <h1 className="font-inter font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              <span className="text-yellow-500 font-lobster">#{tag.name}</span>
            </h1>
            <p className="text-white/75 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              {total} berita dengan tag #{tag.name} di Portal Berita Desa Jadikarya.
            </p>

            <div className="max-w-md mt-6">
              <SearchBox defaultValue={q} placeholder={`Cari di tag #${tag.name}...`} />
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <section>
              {news.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 py-16 text-center">
                  <p className="text-slate-500 font-medium">
                    Belum ada berita dengan tag ini.
                  </p>
                  <Link
                    href="/berita"
                    className="inline-block mt-3 text-sm font-semibold text-[#0A4532] hover:underline"
                  >
                    Lihat semua berita
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {news.map((item) => (
                      <NewsCard key={item.id} news={item} />
                    ))}
                  </div>
                  <Pagination basePath={`/category/${tagSlug}`} page={page} totalPages={totalPages} search={q} />
                </>
              )}
            </section>

            <aside className="space-y-6">
              <TagFilter tags={allTags} activeSlugs={[tagSlug]} basePath="/berita" />
            </aside>
          </div>
        </div>
      </div>
      <PemerintahDanKontak />
    </>
  );
}