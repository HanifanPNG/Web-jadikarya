import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/news-form";
import { getNewsById, getAdminTags } from "@/lib/queries";

export const metadata = { title: "Edit Berita - Admin" };

export default async function AdminBeritaEditPage({ params }) {
  const { id } = await params;

  const [news, tags] = await Promise.all([getNewsById(id), getAdminTags()]);

  if (!news) notFound();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-inter font-bold text-xl text-slate-900">Edit Berita</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Perbarui data berita, lalu simpan perubahan.
        </p>
      </div>

      <NewsForm initial={news} allTags={tags} />
    </div>
  );
}