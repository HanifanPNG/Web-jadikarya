"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteNews } from "@/lib/actions/berita";

export default function DeleteNewsButton({ id, title }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`Hapus berita "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setBusy(true);
    const res = await deleteNews(id);
    if (res?.error) {
      alert(res.error);
      setBusy(false);
      return;
    }
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      {busy ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
      Hapus
    </button>
  );
}