"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { createTag, updateTag, deleteTag } from "@/lib/actions/berita";

export default function TagManager({ tags = [] }) {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim() || creating) return;
    setCreating(true);
    setError("");
    const res = await createTag({ name: newName.trim() });
    setCreating(false);
    if (res.tag) {
      setNewName("");
      router.refresh();
    } else if (res.error) {
      setError(res.error);
    }
  }

  function startEdit(tag) {
    setEditingId(tag.id);
    setEditName(tag.name);
    setError("");
  }

  async function handleUpdate(id) {
    if (!editName.trim() || busyId) return;
    setBusyId(id);
    setError("");
    const res = await updateTag(id, { name: editName.trim() });
    setBusyId(null);
    if (res.success) {
      setEditingId(null);
      router.refresh();
    } else if (res.error) {
      setError(res.error);
    }
  }

  async function handleDelete(tag) {
    if (!confirm(`Hapus tag "#${tag.name}"?`)) return;
    setBusyId(tag.id);
    setError("");
    const res = await deleteTag(tag.id);
    setBusyId(null);
    if (res.success) {
      router.refresh();
    } else if (res.error) {
      setError(res.error);
    }
  }

  return (
    <div className="space-y-5">
      {/* Create form */}
      <form
        onSubmit={handleCreate}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nama tag baru, mis. Pembangunan, Kegiatan Desa..."
          className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4532]/30 focus:border-[#0A4532]"
        />
        <button
          type="submit"
          disabled={creating || !newName.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A4532] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#063023] transition-colors disabled:opacity-50"
        >
          {creating ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
          Tambah Tag
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Tag list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {tags.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            Belum ada tag. Tambahkan tag pertama di atas.
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {tags.map((tag) => (
              <li key={tag.id} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
                {editingId === tag.id ? (
                  <div className="flex flex-1 items-center gap-2">
                    <input
                      autoFocus
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A4532]/30"
                    />
                    <button
                      onClick={() => handleUpdate(tag.id)}
                      disabled={busyId === tag.id}
                      className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                      aria-label="Simpan"
                    >
                      {busyId === tag.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
                      aria-label="Batal"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-700">#{tag.name}</span>
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
                        {tag.news_tags?.[0]?.count ?? 0} berita
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(tag)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0A4532] hover:bg-emerald-50 transition-colors"
                      >
                        <Pencil size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tag)}
                        disabled={busyId === tag.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {busyId === tag.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                        Hapus
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}