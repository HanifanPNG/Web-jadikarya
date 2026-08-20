"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { uploadImage, deleteImage } from "@/lib/actions/berita";

export default function CoverUploader({ value = "", onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || busy) return;

    setBusy(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadImage(formData);
    setBusy(false);

    if (res.url) {
      onChange(res.url);
    } else if (res.error) {
      setError(res.error);
    }
  }

  async function handleRemove() {
    if (value) await deleteImage(value);
    onChange("");
  }

  return (
    <div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
          <div className="relative aspect-[16/9]">
            <Image src={value} alt="Sampul berita" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors"
          >
            <Trash2 size={12} />
            Hapus
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="w-full aspect-[16/9] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-[#0A4532]/50 hover:bg-emerald-50/50 transition-colors flex flex-col items-center justify-center gap-2 text-slate-400 disabled:opacity-50"
        >
          {busy ? (
            <Loader2 size={24} className="animate-spin text-[#0A4532]" />
          ) : (
            <>
              <ImagePlus size={24} />
              <span className="text-sm font-medium">Upload Gambar Sampul</span>
              <span className="text-[11px] text-slate-400">JPG / PNG / WEBP, maks 4MB</span>
            </>
          )}
        </button>
      )}

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}