-- PERBAIKI RLS: semua operasi TULIS (insert/update/delete) HANYA untuk role authenticated.
-- Efek setelah dijalankan: anon (pengunjung) hanya bisa BACA.
-- Jalankan di Supabase > SQL Editor. Aman, idempotent (bisa diulang).

-- 1) Hapus SEMUA policy lama pada tabel terkait (apa pun namanya)
do $$
declare
  r record;
  tbl text;
begin
  foreach tbl in array array['news', 'tags', 'news_tags', 'lembaga']
  loop
    for r in
      select policyname from pg_policies
      where schemaname = 'public' and tablename = tbl
    loop
      execute format('drop policy if exists %I on public.%I', r.policyname, tbl);
    end loop;
  end loop;
end $$;

-- 2) Pastikan RLS aktif
alter table public.news enable row level security;
alter table public.tags enable row level security;
alter table public.news_tags enable row level security;
alter table public.lembaga enable row level security;

-- 3) Buat ulang policy dengan aturan aman

-- news
create policy "News publik baca"
  on public.news for select
  to anon, authenticated
  using (true);
create policy "Admin kelola news" 
  on public.news for all
  to authenticated
  using (true)
  with check (true);

-- tags
create policy "Tags publik baca"
  on public.tags for select
  to anon, authenticated
  using (true);
create policy "Admin kelola tags"
  on public.tags for all
  to authenticated
  using (true)
  with check (true);

-- news_tags
create policy "News_tags publik baca"
  on public.news_tags for select
  to anon, authenticated
  using (true);
create policy "Admin kelola news_tags"
  on public.news_tags for all
  to authenticated
  using (true)
  with check (true);

-- lembaga
create policy "Lembaga publik baca"
  on public.lembaga for select
  to anon, authenticated
  using (true);
create policy "Admin kelola lembaga"
  on public.lembaga for all
  to authenticated
  using (true)
  with check (true);

-- 4) Defense-in-depth: cabut hak TULIS dari role anon di level GRANT.
--    (Admin tetap bisa karena memakai sesi authenticated; anon hanya baca.)
revoke insert, update, delete
  on public.news, public.tags, public.news_tags, public.lembaga
  from anon;

-- 5) Muat ulang cache schema PostgREST agar policy baru langsung berlaku
notify pgrst, 'reload schema';