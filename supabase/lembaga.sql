-- Lembaga Desa — data dinamis (anggota aktif & ketua)
-- Jalankan di Supabase > SQL Editor.
-- Daftar lembaga itu sendiri tetap statis di kode; tabel ini hanya
-- menyimpan nilai yang boleh diubah admin: members (anggota aktif) dan chairman (ketua).

create table if not exists public.lembaga (
  id uuid primary key default gen_random_uuid(),
  "key" text not null unique,
  members text not null default '',
  chairman text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.lembaga enable row level security;

drop policy if exists "Lembaga publik baca" on public.lembaga;
create policy "Lembaga publik baca"
  on public.lembaga for select
  using (true);

drop policy if exists "Admin kelola lembaga" on public.lembaga;
create policy "Admin kelola lembaga"
  on public.lembaga for all
  to authenticated
  using (true)
  with check (true);

-- Realtime (opsional, agar halaman admin auto-refresh)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'lembaga'
  ) then
    alter publication supabase_realtime add table public.lembaga;
  end if;
end $$;

-- Seed: 7 lembaga dengan nilai awal dari data/lembaga-desa.js
insert into public.lembaga ("key", members, chairman) values
  ('lpm', '25 anggota aktif (15 laki-laki, 10 perempuan)', 'Dede Suryana'),
  ('pkk', '120 kepala keluarga (80 ibu, 40 bapak)', 'Suryani M.Kom'),
  ('karangtaruna', '35 anggota (25 laki-laki, 10 perempuan)', 'Rudi'),
  ('kopdes', '5 pengurus (3 laki-laki, 2 perempuan)', 'Dede Suryana'),
  ('poktan', '45 anggota (30 laki-laki, 15 perempuan)', 'Sutisna'),
  ('posyandu', '15 kader (12 perempuan, 3 laki-laki)', 'Suryani'),
  ('rtrw', '120 RT dan 10 RW', 'Ketua RT : Budi, Ketua RW : Rudi')
on conflict ("key") do update set
  members = excluded.members,
  chairman = excluded.chairman,
  updated_at = now();