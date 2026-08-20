"use client";

import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { loginAdmin } from "@/lib/actions/berita";

export default function AdminLoginPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const res = await loginAdmin(new FormData(e.currentTarget));
    setBusy(false);

    if (res?.error) setError(res.error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAF8] via-white to-[#E8F0EC] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0A4532] flex items-center justify-center mb-4">
              <ShieldCheck size={26} className="text-white" />
            </div>
            <h1 className="font-inter font-bold text-xl text-slate-900">
              Panel Admin Berita
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Masuk untuk mengelola Portal Berita Desa Jadikarya
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-600 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@jadikarya.desa.id"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4532]/30 focus:border-[#0A4532]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-600 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4532]/30 focus:border-[#0A4532]"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A4532] px-4 py-3 text-sm font-bold text-white hover:bg-[#063023] transition-colors disabled:opacity-60"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : null}
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}