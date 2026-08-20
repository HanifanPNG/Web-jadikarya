import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User, Tag, Clock } from "lucide-react";
import Navbar from "@/components/navbar";
import PemerintahDanKontak from "@/components/footer.tsx";
import { getNewsBySlug } from "@/lib/queries";
import { formatDate } from "@/components/berita/format-date";
import { sanitizeNewsHtml } from "@/lib/sanitize";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return { title: "Berita Tidak Ditemukan - Desa Jadikarya" };
  }

  return {
    title: `${news.title} - Desa Jadikarya`,
    description: news.excerpt || `Berita Desa Jadikarya: ${news.title}`,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: news.cover_image ? [news.cover_image] : [],
    },
  };
}

export default async function BeritaDetailPage({ params }) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#F8FAF8] via-white to-[#E8F0EC]">
        {/* Hero — background alam3.webp, dirampingkan seperti hero /berita */}
        <section className="relative overflow-hidden bg-[#0A4532]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/alam/alam3.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A4532]/95 via-[#0A4532]/30 to-[#0A4532]/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0A4532]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-12">
            <Link
              href="/berita"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFE7D2]/85 hover:text-[#FFE7D2] transition-colors mb-5"
            >
              <ArrowLeft size={14} />
              Kembali ke Berita
            </Link>

            <h1 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] text-white leading-tight tracking-tight drop-shadow-sm max-w-3xl">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                <time dateTime={news.published_at}>
                  {formatDate(news.published_at)}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {news.author}
              </span>
              {news.updated_at &&
                new Date(news.updated_at).getTime() >
                  new Date(news.published_at).getTime() && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    Terakhir diperbarui: {formatDate(news.updated_at)}
                  </span>
                )}
            </div>
          </div>
        </section>

        {/* Content — isi berita */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
          <article>
            {news.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed border-l-4 border-[#0A4532] pl-4 mb-6">
                {news.excerpt}
              </p>
            )}

            <div
              className="prose-content text-slate-700 leading-relaxed text-[15px] sm:text-base"
              dangerouslySetInnerHTML={{ __html: sanitizeNewsHtml(news.content) }}
            />

            {/* Tags below article */}
            {news.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={16} className="text-slate-400" />
                  {news.tags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/category/${tag.slug}`}
                      className="text-xs font-semibold text-[#0A4532] bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full px-3 py-1.5 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
      <PemerintahDanKontak />
    </>
  );
}