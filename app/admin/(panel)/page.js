import Link from "next/link";
import { Newspaper, FileText, Eye, Tags, PlusCircle } from "lucide-react";
import { getAdminStats } from "@/lib/queries";

export const metadata = { title: "Dashboard - Admin Berita" };

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const cards = [
    { label: "Total Berita", value: stats.total, icon: Newspaper, color: "bg-[#0A4532]" },
    { label: "Published", value: stats.published, icon: Eye, color: "bg-emerald-600" },
    { label: "Draf", value: stats.drafts, icon: FileText, color: "bg-amber-500" },
    { label: "Tag", value: stats.tags, icon: Tags, color: "bg-slate-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-inter font-bold text-xl text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Ringkasan Portal Berita Desa Jadikarya
          </p>
        </div>
        <Link
          href="/admin/berita/baru"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0A4532] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#063023] transition-colors"
        >
          <PlusCircle size={16} />
          Tulis Berita Baru
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <p className="font-inter font-black text-3xl text-slate-900 leading-none">
                {card.value}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-1.5">{card.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}