import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ImageOff } from "lucide-react";
import { formatDate } from "./format-date";

export default function NewsCard({ news }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/${news.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          {news.cover_image ? (
            <Image
              src={news.cover_image}
              alt={news.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400">
              <ImageOff size={28} className="opacity-60" />
              <span className="text-xs font-medium tracking-wide">Tidak ada gambar</span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
            <CalendarDays size={12} />
            <time dateTime={news.published_at}>{formatDate(news.published_at)}</time>
          </div>

          <h3 className="font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#0A4532] transition-colors">
            {news.title}
          </h3>

          {news.excerpt && (
            <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2">
              {news.excerpt}
            </p>
          )}

          {news.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {news.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.slug}
                  className="text-[10px] font-semibold text-[#0A4532] bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}