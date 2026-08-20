"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Tags,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { logoutAdmin } from "@/lib/actions/berita";

const items = [
  { id: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { id: "/admin/berita", label: "Berita", icon: Newspaper },
  { id: "/admin/tag", label: "Tag", icon: Tags },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white rounded-2xl border border-slate-200 shadow-sm px-3 py-2.5">
      <nav className="flex items-center gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.id === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.id);
          return (
            <Link
              key={item.id}
              href={item.id}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-[#0A4532] text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#0A4532]"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-[#0A4532] transition-colors"
        >
          <ExternalLink size={16} />
          Lihat Situs
        </Link>
        <button
          onClick={() => logoutAdmin()}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </div>
  );
}