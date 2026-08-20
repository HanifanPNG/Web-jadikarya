"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo2,
  Redo2,
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react";
import { uploadImage, deleteImage } from "@/lib/actions/berita";

function RemovableImageView({ node, deleteNode }) {
  const [deleting, setDeleting] = useState(false);
  const src = node.attrs.src;

  async function handleDelete() {
    if (deleting) return;
    setDeleting(true);
    try {
      deleteNode();
      await deleteImage(src);
    } catch {
      // Gambar sudah dihapus dari editor; kegagalan hapus storage tidak menghentikan proses.
    } finally {
      setDeleting(false);
    }
  }

  return (
    <NodeViewWrapper className="tiptap-image-wrapper inline-block align-middle" data-drag-handle>
      <span className="relative group inline-block max-w-full">
        <img
          src={src}
          alt={node.attrs.alt || ""}
          title={node.attrs.title || ""}
          className="block max-w-full h-auto rounded-lg border border-slate-200"
        />
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-2 right-2 z-10 hidden group-hover:flex items-center gap-1 px-2 py-1 rounded-lg bg-red-600 text-white text-[11px] font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
          Hapus gambar
        </button>
      </span>
    </NodeViewWrapper>
  );
}

const RemovableImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(RemovableImageView);
  },
});

export default function RichTextEditor({ value = "", onChange }) {
  const fileRef = useRef(null);
  const uploadingRef = useRef(false);

  const editor = useEditor({
    extensions: [StarterKit, RemovableImage.configure({ inline: false, allowBase64: false })],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "tiptap px-4 py-3 min-h-[280px] text-sm text-slate-700 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 h-[320px] flex items-center justify-center text-sm text-slate-400">
        Memuat editor...
      </div>
    );
  }

  const btnBase =
    "w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#0A4532] transition-colors disabled:opacity-40 disabled:pointer-events-none";

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || uploadingRef.current) return;

    uploadingRef.current = true;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImage(formData);
      if (result.url) {
        editor.chain().focus().setImage({ src: result.url }).run();
      } else if (result.error) {
        alert(result.error);
      }
    } finally {
      uploadingRef.current = false;
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white focus-within:border-[#0A4532]/50 focus-within:ring-2 focus-within:ring-[#0A4532]/20 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={btnBase} aria-label="Tebal">
          <Bold size={15} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={btnBase} aria-label="Miring">
          <Italic size={15} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={btnBase} aria-label="Coret">
          <Strikethrough size={15} />
        </button>

        <span className="w-px h-6 bg-slate-200 mx-1" />

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnBase} aria-label="Subjudul">
          <Heading2 size={15} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnBase} aria-label="Sub-subjudul">
          <Heading3 size={15} />
        </button>

        <span className="w-px h-6 bg-slate-200 mx-1" />

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnBase} aria-label="Daftar">
          <List size={15} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnBase} aria-label="Daftar bernomor">
          <ListOrdered size={15} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnBase} aria-label="Kutipan">
          <Quote size={15} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnBase} aria-label="Kode">
          <Code2 size={15} />
        </button>

        <span className="w-px h-6 bg-slate-200 mx-1" />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploadingRef.current}
          className={`${btnBase} text-[#0A4532]`}
          aria-label="Sisipkan gambar"
        >
          {uploadingRef.current ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
        </button>

        <span className="flex-1" />

        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className={btnBase} aria-label="Undo">
          <Undo2 size={15} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className={btnBase} aria-label="Redo">
          <Redo2 size={15} />
        </button>
      </div>

      {/* Editable area */}
      <EditorContent editor={editor} />

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}