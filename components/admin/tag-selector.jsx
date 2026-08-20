"use client";

import { useState } from "react";
import { Plus, Loader2, Check } from "lucide-react";
import { createTag } from "@/lib/actions/berita";

export default function TagSelector({ tags = [], selected = [], onChange }) {
  const [allTags, setAllTags] = useState(tags);
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function toggle(id) {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  }

  function handleCreate() {
    const name = newName.trim();
    if (!name || busy) return;
    setBusy(true);
    setError("");

    createTag({ name }).then((res) => {
      setBusy(false);

      if (res.tag) {
        setAllTags((prev) =>
          prev.some((t) => t.id === res.tag.id) ? prev : [...prev, res.tag]
        );
        onChange([...selected, res.tag.id]);
        setNewName("");
        setShowInput(false);
      } else if (res.error) {
        setError(res.error);
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isOn = selected.includes(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggle(tag.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                isOn
                  ? "bg-[#0A4532] text-white border-[#0A4532]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#0A4532]/40 hover:text-[#0A4532]"
              }`}
            >
              {isOn && <Check size={12} />}
              #{tag.name}
            </button>
          );
        })}

        {showInput ? (
          <div className="flex items-center gap-1.5">
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreate();
                }
              }}
              placeholder="Nama tag baru..."
              className="w-36 px-2.5 py-1.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A4532]/30"
            />
            <button
              type="button"
              onClick={handleCreate}
              disabled={busy || !newName.trim()}
              className="px-3 py-1.5 rounded-full bg-[#0A4532] text-white text-xs font-semibold hover:bg-[#063023] disabled:opacity-50"
            >
              {busy ? <Loader2 size={12} className="animate-spin" /> : "Simpan"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowInput(false);
                setError("");
              }}
              className="px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-500 hover:bg-slate-50"
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#0A4532] bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors"
          >
            <Plus size={12} />
            Tag Baru
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}