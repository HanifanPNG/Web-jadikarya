import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

const NEWS_FIELDS =
  "id, title, slug, excerpt, cover_image, author, status, published_at, tags(name, slug)";

async function fetchPublishedNews({ page = 1, pageSize = 4, search = "", slugs = [] }) {
  const supabase = createPublicClient();

  let query = supabase.from("news").select(NEWS_FIELDS, { count: "exact" });

  if (slugs.length) {
    query = supabase
      .from("news")
      .select("id, title, slug, excerpt, cover_image, author, published_at, tags!inner(name, slug)", {
        count: "exact",
      })
      .in("tags.slug", slugs);
  }

  query = query.eq("status", "published");

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  query = query
    .order("published_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const { data, count } = await query;

  let news = data || [];

  // Saat difilter tag, embed `tags!inner` hanya mengembalikan tag yang cocok.
  // Ambil daftar tag lengkap untuk berita terpilih agar kartu menampilkan semua tag.
  if (slugs.length && news.length) {
    const { data: fullTags } = await supabase
      .from("news")
      .select("id, tags(name, slug)")
      .in(
        "id",
        news.map((n) => n.id)
      );

    const tagMap = {};
    (fullTags || []).forEach((row) => {
      tagMap[row.id] = row.tags || [];
    });
    news = news.map((n) => ({ ...n, tags: tagMap[n.id] || [] }));
  }

  return {
    news,
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count || 0) / pageSize)),
  };
}

export async function getPublishedNews({ page = 1, pageSize = 4, search = "", tagSlugs = [] } = {}) {
  const slugs = Array.isArray(tagSlugs)
    ? tagSlugs.filter(Boolean)
    : tagSlugs
      ? [tagSlugs]
      : [];

  // Mode pencarian/filter tag punya kombinasi unik per request -> langsung ke DB.
  if (search || slugs.length) {
    return fetchPublishedNews({ page, pageSize, search, slugs });
  }
  return unstable_cache(
    async () => fetchPublishedNews({ page, pageSize, search, slugs }),
    ["published-news", String(page), String(pageSize)],
    { revalidate: 60, tags: ["news", "tags"] }
  )();
}

async function fetchNewsBySlug(slug) {
  const supabase = createPublicClient();

  const { data } = await supabase
    .from("news")
    .select("id, title, slug, excerpt, content, cover_image, author, published_at, updated_at, tags(name, slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  return data || null;
}

export async function getNewsBySlug(slug) {
  return unstable_cache(
    async () => fetchNewsBySlug(slug),
    ["news-by-slug", slug],
    { revalidate: 60, tags: ["news"] }
  )();
}

async function fetchTagBySlug(slug) {
  const supabase = createPublicClient();

  const { data } = await supabase
    .from("tags")
    .select("id, name, slug")
    .eq("slug", slug)
    .maybeSingle();

  return data || null;
}

export async function getTagBySlug(slug) {
  return unstable_cache(
    async () => fetchTagBySlug(slug),
    ["tag-by-slug", slug],
    { revalidate: 60, tags: ["tags"] }
  )();
}

async function fetchAllTags() {
  const supabase = createPublicClient();

  const { data } = await supabase
    .from("tags")
    .select("id, name, slug")
    .order("name");

  return data || [];
}

export async function getAllTags() {
  return unstable_cache(
    async () => fetchAllTags(),
    ["all-tags"],
    { revalidate: 60, tags: ["tags"] }
  )();
}

async function fetchLembagaDynamic() {
  const supabase = createPublicClient();

  const { data } = await supabase
    .from("lembaga")
    .select("key, members, chairman");

  return data || [];
}

export async function getLembagaDynamic() {
  return unstable_cache(
    async () => fetchLembagaDynamic(),
    ["lembaga-dynamic"],
    { revalidate: 60, tags: ["lembaga"] }
  )();
}

/* ─────────────────────────── Admin ─────────────────────────── */

export async function getAdminNews({ search = "" } = {}) {
  const supabase = createClient();

  let query = supabase
    .from("news")
    .select("id, title, slug, excerpt, cover_image, status, published_at, updated_at, tags(name, slug)")
    .order("updated_at", { ascending: false });

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data } = await query;

  return data || [];
}

export async function getNewsById(id) {
  const supabase = createClient();

  const { data } = await supabase
    .from("news")
    .select("id, title, slug, excerpt, content, cover_image, author, status, published_at, tags(id, name, slug)")
    .eq("id", id)
    .maybeSingle();

  return data || null;
}

export async function getAdminTags() {
  const supabase = createClient();

  const { data } = await supabase
    .from("tags")
    .select("id, name, slug, news_tags(count)")
    .order("name");

  return data || [];
}

export async function getAdminStats() {
  const supabase = createClient();

  const [totalRes, publishedRes, draftsRes, tagsRes] = await Promise.all([
    supabase.from("news").select("id", { count: "exact", head: true }),
    supabase.from("news").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("news").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("tags").select("id", { count: "exact", head: true }),
  ]);

  return {
    total: totalRes.count || 0,
    published: publishedRes.count || 0,
    drafts: draftsRes.count || 0,
    tags: tagsRes.count || 0,
  };
}