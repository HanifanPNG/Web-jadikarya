import NewsForm from "@/components/admin/news-form";
import { getAdminTags } from "@/lib/queries";

export const metadata = { title: "Tulis Berita Baru - Admin" };

export default async function AdminBeritaBaruPage() {
  const tags = await getAdminTags();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-inter font-bold text-xl text-slate-900">Tulis Berita Baru</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Lengkapi data di bawah, lalu simpan sebagai draf atau langsung terbitkan.
        </p>
      </div>

      <NewsForm allTags={tags} />
    </div>
  );
}