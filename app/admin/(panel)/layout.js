import Link from "next/link";
import Image from "next/image";
import AdminNav from "@/components/admin/admin-nav";

export default function AdminPanelLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="bg-[#0A4532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center overflow-hidden rounded-full bg-white/10">
              <Image
                src="/assets/logo-desa.png"
                alt="Logo Desa Jadikarya"
                width={40}
                height={40}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">
                Panel Admin Desa Jadikarya
              </p>
              <p className="text-[11px] text-[#FFE7D2]/70">
                Portal Berita Desa
              </p>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}