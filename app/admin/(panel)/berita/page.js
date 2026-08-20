import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Pencil, ImageOff } from "lucide-react";
import { getAdminNews } from "@/lib/queries";
import SearchBox from "@/components/berita/search-box";
import DeleteNewsButton from "@/components/admin/delete-news-button";
import RealtimeUpdater from "@/components/berita/realtime-updater";
import { formatDate } from "@/components/berita/format-date";

export const metadata = { title: "Kelola Berita - Admin" };

export default async function AdminBeritaPage({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const news = await getAdminNews({ search: q });

  return (
    <div className="space-y-5">
      <RealtimeUpdater />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-inter font-bold text-xl text-slate-900">Kelola Berita</h1>
          <p className="text-sm text-slate-500 mt-0.5">{news.length} berita</p>
        </div>
        <Link
          href="/admin/berita/baru"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0A4532] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#063023] transition-colors"
        >
          <PlusCircle size={16} />
          Tulis Berita Baru
        </Link>
      </div>

      <div className="max-w-sm">
        <SearchBox basePath="/admin/berita" defaultValue={q} placeholder="Cari berita..." />
      </div>

      {news.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 py-16 text-center">
          <p className="text-slate-500 font-medium">Belum ada berita.</p>
          <Link
            href="/admin/berita/baru"
            className="inline-block mt-3 text-sm font-semibold text-[#0A4532] hover:underline"
          >
            Tulis berita pertama
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-bold">Berita</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold hidden md:table-cell">Tag</th>
                  <th className="px-4 py-3 font-bold hidden lg:table-cell">Diperbarui</th>
                  <th className="px-4 py-3 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          {item.cover_image ? (
                            <Image
                              src={item.cover_image}
                              alt={item.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-slate-100 text-slate-400">
                              <ImageOff size={14} className="opacity-60" />
                              <span className="text-[8px] font-medium">Tanpa gambar</span>
                            </div>
                          )}
                        </div>
                        <Link href={`/${item.slug}`} target="_blank" className="text-sm font-semibold text-slate-800 hover:text-[#0A4532] line-clamp-2 max-w-xs">
                          {item.title}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          item.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status === "published" ? "Published" : "Draf"}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {item.tags?.slice(0, 2).map((tag) => (
                          <span key={tag.slug} className="text-[10px] text-[#0A4532] bg-emerald-50 rounded-full px-2 py-0.5">
                            #{tag.name}
                          </span>
                        ))}
                        {item.tags?.length > 2 && (
                          <span className="text-[10px] text-slate-400">+{item.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-500">
                      {formatDate(item.updated_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/berita/${item.id}/edit`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0A4532] hover:bg-emerald-50 transition-colors"
                        >
                          <Pencil size={12} />
                          Edit
                        </Link>
                        <DeleteNewsButton id={item.id} title={item.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}