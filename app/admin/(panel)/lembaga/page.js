import LembagaManager from "@/components/admin/lembaga-manager";
import { getLembagaDynamic } from "@/lib/queries";

export const metadata = { title: "Kelola Lembaga - Admin" };

export const dynamic = "force-dynamic";

export default async function AdminLembagaPage() {
  const dynamic = await getLembagaDynamic();
  const dynamicMap = {};
  dynamic.forEach((row) => {
    dynamicMap[row.key] = { members: row.members, chairman: row.chairman };
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-inter font-bold text-xl text-slate-900">Kelola Lembaga Desa</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Perbarui anggota aktif dan ketua untuk masing-masing lembaga.
        </p>
      </div>

      <LembagaManager dynamicMap={dynamicMap} />
    </div>
  );
}