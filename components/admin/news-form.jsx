"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Send, Loader2 } from "lucide-react";
import { createNews, updateNews } from "@/lib/actions/berita";
import RichTextEditor from "./rich-text-editor";
import CoverUploader from "./cover-uploader";
import TagSelector from "./tag-selector";

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4532]/30 focus:border-[#0A4532] transition-shadow";

const labelClass = "block text-xs font-bold text-slate-600 mb-1.5";

export default function NewsForm({ initial = null, allTags = [] }) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [title, setTitle] = useState(initial?.title || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [cover, setCover] = useState(initial?.cover_image || "");
  const [author, setAuthor] = useState(initial?.author || "Admin Desa Jadikarya");
  const [status, setStatus] = useState(initial?.status || "draft");
  const [tagIds, setTagIds] = useState(
    initial?.tags ? initial.tags.map((t) => t.id) : []
  );

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(nextStatus) {
    const input = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content,
      cover_image: cover,
      author: author.trim() || "Admin Desa Jadikarya",
      status: nextStatus,
      tag_ids: tagIds,
    };

    if (input.title.length < 3) {
      setError("Judul minimal 3 karakter.");
      return;
    }

    setBusy(true);
    setError("");

    const res = isEdit
      ? await updateNews(initial.id, input)
      : await createNews(input);

    setBusy(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    // Redirect handled inside the server action -> back to admin list.
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(status);
      }}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className={labelClass}>
              Judul Berita *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Musyawarah Desa Pembangunan Jalan"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className={labelClass}>
              Ringkasan (maks 500 karakter)
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan singkat berita yang tampil di kartu daftar..."
              rows={3}
              maxLength={500}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Isi Berita</label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Gambar Sampul</label>
            <CoverUploader value={cover} onChange={setCover} />
          </div>

          <div>
            <label htmlFor="author" className={labelClass}>
              Nama Penulis
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <span className={labelClass}>Status</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus("draft")}
                className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors ${
                  status === "draft"
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                Draf
              </button>
              <button
                type="button"
                onClick={() => setStatus("published")}
                className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors ${
                  status === "published"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                Published
              </button>
            </div>
          </div>

          <div>
            <span className={labelClass}>Tag</span>
            <TagSelector tags={allTags} selected={tagIds} onChange={setTagIds} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0A4532] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#063023] transition-colors disabled:opacity-60"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          Simpan {status === "published" ? "& Publikasikan" : "sebagai Draf"}
        </button>

        {status !== "published" && (
          <button
            type="button"
            onClick={() => submit("published")}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition-colors disabled:opacity-60"
          >
            {busy ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
            Langsung Terbitkan
          </button>
        )}

        <button
          type="button"
          onClick={() => router.push("/admin/berita")}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}