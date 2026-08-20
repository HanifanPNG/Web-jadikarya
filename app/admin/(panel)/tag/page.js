import TagManager from "@/components/admin/tag-manager";
import { getAdminTags } from "@/lib/queries";

export const metadata = { title: "Kelola Tag - Admin" };

export default async function AdminTagPage() {
  const tags = await getAdminTags();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-inter font-bold text-xl text-slate-900">Kelola Tag</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Tag dipakai untuk mengelompokkan berita dan tampil sebagai "Tag Populer" di situs.
        </p>
      </div>

      <TagManager tags={tags} />
    </div>
  );
}