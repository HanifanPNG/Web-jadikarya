-- Verifikasi keamanan sebelum deploy (READ-ONLY, aman dijalankan ulang)
-- Jalankan di Supabase > SQL Editor. Semua query hanya SELECT.

-- 1) Apakah RLS aktif pada tabel yang dipakai?
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('news', 'tags', 'news_tags', 'lembaga')
order by tablename;

-- 2) Semua policy pada tabel public + storage (cek yang keliru, mis. "to anon")
select schemaname, tablename, policyname, roles, cmd,
       coalesce(qual::text, '') as using_qual,
       coalesce(with_check::text, '') as with_check
from pg_policies
where schemaname in ('public', 'storage')
order by schemaname, tablename, policyname;

-- 3) Status bucket storage (public=true berarti objek bisa dibaca publik)
select id, name, public
from storage.buckets
order by name;

-- Cek yang harus sesuai:
--   * news, tags, news_tags, lembaga -> rowsecurity = true (t/true)
--   * Policy SELECT untuk anon (PUBLIC/anon) hanya di tabel publik
--   * Policy INSERT/UPDATE/DELETE hanya "to authenticated" (bukan anon/PUBLIC)
--   * storage.objects: JANGAN ada policy INSERT/UPDATE/DELETE "to anon/PUBLIC"