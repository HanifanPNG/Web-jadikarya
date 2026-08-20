"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const BUCKET = "berita-images";
const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "gif"];

const newsSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter.").max(200, "Judul maksimal 200 karakter."),
  excerpt: z.string().max(500, "Ringkasan maksimal 500 karakter.").optional().default(""),
  content: z.any(),
  cover_image: z.string().optional().default(""),
  author: z.string().min(1, "Nama penulis wajib diisi.").default("Admin Desa Jadikarya"),
  status: z.enum(["draft", "published"]).default("draft"),
  tag_ids: z.array(z.string()).optional().default([]),
});

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function uniqueSlug(supabase, base, excludeId = null) {
  let slug = base || "berita";
  let n = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data } = await supabase
      .from("news")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!data || (excludeId && data.id === excludeId)) return slug;
    slug = `${base}-${n++}`;
  }
}

function extractStoragePath(url) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = String(url || "").indexOf(marker);
  if (idx === -1) return null;
  return String(url).slice(idx + marker.length).split("?")[0];
}

async function deleteStorageImage(supabase, url) {
  const path = extractStoragePath(url);
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
}

function imageUrlsFromHtml(html) {
  const urls = [];
  const regex = /src="([^"]+)"/g;
  let match;
  while ((match = regex.exec(String(html || ""))) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function collectStoragePaths(urls) {
  const paths = [];
  for (const url of urls || []) {
    const path = extractStoragePath(url);
    if (path && !paths.includes(path)) paths.push(path);
  }
  return paths;
}

async function deleteStoragePaths(supabase, paths) {
  if (!paths.length) return;
  const chunkSize = 100;
  for (let i = 0; i < paths.length; i += chunkSize) {
    await supabase.storage.from(BUCKET).remove(paths.slice(i, i + chunkSize));
  }
}

const ORPHAN_AGE_MS = 24 * 60 * 60 * 1000; // 24 jam

async function cleanupOrphanImages(supabase) {
  try {
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET)
      .list("", { limit: 1000 });

    if (listError || !files?.length) return;

    const { data: news } = await supabase.from("news").select("cover_image, content");

    const referenced = new Set();
    (news || []).forEach((row) => {
      collectStoragePaths([row.cover_image, ...imageUrlsFromHtml(row.content)]).forEach((path) =>
        referenced.add(path)
      );
    });

    const now = Date.now();
    const orphans = files
      .filter((file) => !referenced.has(file.name))
      .filter((file) => {
        const t = file.created_at ? new Date(file.created_at).getTime() : 0;
        return Number.isFinite(t) && now - t > ORPHAN_AGE_MS;
      })
      .map((file) => file.name);

    if (orphans.length) {
      await deleteStoragePaths(supabase, orphans);
    }
  } catch (error) {
    console.error("cleanupOrphanImages:", error);
  }
}

/* ─────────────────────────── Auth ─────────────────────────── */

export async function loginAdmin(formData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email atau password salah." };
  }

  await cleanupOrphanImages(supabase);
  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ─────────────────────────── News CRUD ─────────────────────────── */

export async function createNews(input) {
  const supabase = createClient();
  const parsed = newsSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const data = parsed.data;
  const slug = await uniqueSlug(supabase, slugify(data.title));

  const { data: row, error } = await supabase
    .from("news")
    .insert({
      title: data.title,
      slug,
      excerpt: data.excerpt || null,
      content: data.content ?? "",
      cover_image: data.cover_image || null,
      author: data.author,
      status: data.status,
      published_at:
        data.status === "published" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("createNews:", error);
    return { error: "Gagal menyimpan berita. Silakan coba lagi." };
  }

  if (data.tag_ids.length) {
    const { error: tagError } = await supabase.from("news_tags").insert(
      data.tag_ids.map((tag_id) => ({ news_id: row.id, tag_id }))
    );
    if (tagError) console.error("createNews tags:", tagError);
  }

  revalidatePath("/berita");
  revalidatePath("/");
  revalidateTag("news");
  revalidateTag("tags");
  redirect("/admin/berita");
}

export async function updateNews(id, input) {
  const supabase = createClient();
  const parsed = newsSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const data = parsed.data;
  const slug = await uniqueSlug(supabase, slugify(data.title), id);

  const { data: existing } = await supabase
    .from("news")
    .select("published_at, cover_image, content")
    .eq("id", id)
    .maybeSingle();

  const publishedAt =
    data.status === "published"
      ? existing?.published_at || new Date().toISOString()
      : null;

  const { error } = await supabase
    .from("news")
    .update({
      title: data.title,
      slug,
      excerpt: data.excerpt || null,
      content: data.content ?? "",
      cover_image: data.cover_image || null,
      author: data.author,
      status: data.status,
      published_at: publishedAt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("updateNews:", error);
    return { error: "Gagal memperbarui berita. Silakan coba lagi." };
  }

  const oldPaths = collectStoragePaths([
    existing?.cover_image,
    ...imageUrlsFromHtml(existing?.content),
  ]);
  const newPaths = collectStoragePaths([
    data.cover_image,
    ...imageUrlsFromHtml(data.content),
  ]);
  await deleteStoragePaths(
    supabase,
    oldPaths.filter((path) => !newPaths.includes(path))
  );

  await supabase.from("news_tags").delete().eq("news_id", id);

  if (data.tag_ids.length) {
    const { error: tagError } = await supabase.from("news_tags").insert(
      data.tag_ids.map((tag_id) => ({ news_id: id, tag_id }))
    );
    if (tagError) console.error("updateNews tags:", tagError);
  }

  revalidatePath("/berita");
  revalidatePath("/");
  revalidateTag("news");
  revalidateTag("tags");
  redirect("/admin/berita");
}

export async function deleteNews(id) {
  const supabase = createClient();

  const { data: row } = await supabase
    .from("news")
    .select("cover_image, content")
    .eq("id", id)
    .maybeSingle();

  if (row) {
    const paths = collectStoragePaths([
      row.cover_image,
      ...imageUrlsFromHtml(row.content),
    ]);
    await deleteStoragePaths(supabase, paths);
  }

  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    console.error("deleteNews:", error);
    return { error: "Gagal menghapus berita." };
  }

  revalidatePath("/berita");
  revalidatePath("/");
  revalidateTag("news");
  revalidateTag("tags");
  redirect("/admin/berita");
}

/* ─────────────────────────── Image upload ─────────────────────────── */

export async function uploadImage(formData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi berakhir. Silakan login ulang." };

  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return { error: "Tidak ada file yang dipilih." };
  }

  const ext = String(file.name).split(".").pop().toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return { error: "Format gambar tidak didukung (jpg, png, webp, gif)." };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { error: "Ukuran gambar maksimal 4MB." };
  }

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { contentType: file.type, upsert: false });

  if (error) {
    console.error("uploadImage:", error);
    return { error: "Gagal mengunggah gambar. Silakan coba lagi." };
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return { url: urlData.publicUrl };
}

export async function deleteImage(url) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi berakhir." };

  await deleteStorageImage(supabase, url);
  await cleanupOrphanImages(supabase);
  return { success: true };
}

/* ─────────────────────────── Tags ─────────────────────────── */

export async function createTag({ name }) {
  const supabase = createClient();
  const trimmed = String(name ?? "").trim();

  if (trimmed.length < 2) return { error: "Nama tag minimal 2 karakter." };

  const slug = slugify(trimmed);
  if (!slug) return { error: "Nama tag tidak valid." };

  const { data, error } = await supabase
    .from("tags")
    .insert({ name: trimmed, slug })
    .select("id, name, slug")
    .maybeSingle();

  if (error) {
    const { data: existing } = await supabase
      .from("tags")
      .select("id, name, slug")
      .eq("slug", slug)
      .maybeSingle();
    if (existing) return { tag: existing };
    console.error("createTag:", error);
    return { error: "Gagal membuat tag." };
  }

  revalidatePath("/admin/tag");
  revalidatePath("/berita");
  revalidateTag("news");
  revalidateTag("tags");
  return { tag: data };
}

export async function updateTag(id, { name }) {
  const supabase = createClient();
  const trimmed = String(name ?? "").trim();

  if (trimmed.length < 2) return { error: "Nama tag minimal 2 karakter." };

  const slug = slugify(trimmed);
  const { error } = await supabase
    .from("tags")
    .update({ name: trimmed, slug })
    .eq("id", id);

  if (error) {
    console.error("updateTag:", error);
    return { error: "Gagal memperbarui tag." };
  }

  revalidatePath("/admin/tag");
  revalidatePath("/berita");
  revalidateTag("news");
  revalidateTag("tags");
  return { success: true };
}

export async function deleteTag(id) {
  const supabase = createClient();
  const { error } = await supabase.from("tags").delete().eq("id", id);

  if (error) {
    console.error("deleteTag:", error);
    return { error: "Gagal menghapus tag." };
  }

  revalidatePath("/admin/tag");
  revalidatePath("/berita");
  revalidateTag("news");
  revalidateTag("tags");
  return { success: true };
}