# Component Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure flat `components/` into per-component folders with extracted data/sub-components.

**Architecture:** Each component gets `nama-folder/index.jsx`. `ProfilDesaPage` (820 lines) is split into `profil-desa/index.jsx` with extracted `data/` modules and `components/` sub-components.

**Tech Stack:** Next.js 14, React 18, JavaScript (JSX)

## Global Constraints

- No behavior/UI changes — pure file restructuring
- All imports use `@/components/...` alias (defined in `jsconfig.json`)
- `index.jsx` convention for folder entry points
- Data files use `.js` (no JSX), export named constants
- Sub-components use `.jsx`, export named functions (not default)

---

### Task 1: Create directory structure

**Files:**
- Create: All directories listed below

```
components/navbar/
components/hero-section/
components/sambutan-kepala-desa/
components/profil-dan-potensi-desa/
components/agenda-rutinan/
components/pemerintah-dan-kontak/
components/aos-init/
components/profil-desa/data/
components/profil-desa/components/
```

- [ ] **Step 1: Create all directories**

```bash
$dirs = @(
    "components/navbar",
    "components/hero-section",
    "components/sambutan-kepala-desa",
    "components/profil-dan-potensi-desa",
    "components/agenda-rutinan",
    "components/pemerintah-dan-kontak",
    "components/aos-init",
    "components/profil-desa/data",
    "components/profil-desa/components"
)
foreach ($d in $dirs) {
    New-Item -ItemType Directory -Path $d -Force
}
```

- [ ] **Step 2: Verify directories exist**

```bash
Get-ChildItem -Path components -Directory -Name
```

Expected: all 9 directories listed

---

### Task 2: Move standalone components to their folders

**Files:**
- Move: `components/Navbar.jsx` → `components/navbar/index.jsx`
- Move: `components/HeroSection.jsx` → `components/hero-section/index.jsx`
- Move: `components/SambutanKepalaDesa.jsx` → `components/sambutan-kepala-desa/index.jsx`
- Move: `components/ProfilDanPotensiDesa.jsx` → `components/profil-dan-potensi-desa/index.jsx`
- Move: `components/AgendaRutinan.jsx` → `components/agenda-rutinan/index.jsx`
- Move: `components/PemerintahDanKontak.jsx` → `components/pemerintah-dan-kontak/index.jsx`
- Move: `components/AOSInit.jsx` → `components/aos-init/index.jsx`

- [ ] **Step 1: Move all 7 files**

```bash
Move-Item -Path "components/Navbar.jsx" -Destination "components/navbar/index.jsx" -Force
Move-Item -Path "components/HeroSection.jsx" -Destination "components/hero-section/index.jsx" -Force
Move-Item -Path "components/SambutanKepalaDesa.jsx" -Destination "components/sambutan-kepala-desa/index.jsx" -Force
Move-Item -Path "components/ProfilDanPotensiDesa.jsx" -Destination "components/profil-dan-potensi-desa/index.jsx" -Force
Move-Item -Path "components/AgendaRutinan.jsx" -Destination "components/agenda-rutinan/index.jsx" -Force
Move-Item -Path "components/PemerintahDanKontak.jsx" -Destination "components/pemerintah-dan-kontak/index.jsx" -Force
Move-Item -Path "components/AOSInit.jsx" -Destination "components/aos-init/index.jsx" -Force
```

- [ ] **Step 2: Verify all files moved**

```bash
Get-ChildItem -Path components -Recurse -Filter "index.jsx" | Select-Object -ExpandProperty FullName
```

Expected: 8 index.jsx files (7 standalone + ProfilDesaPage not yet moved)

---

### Task 3: Extract data modules from ProfilDesaPage

**Files:**
- Read: `components/ProfilDesaPage.jsx`
- Create: `components/profil-desa/data/tentang-desa.js`
- Create: `components/profil-desa/data/struktur-desa.js`
- Create: `components/profil-desa/data/lembaga-desa.js`
- Create: `components/profil-desa/data/statistik-desa.js`

Extract these named constants from the file:

**`profil-desa/data/tentang-desa.js`:**
```js
import { Leaf, Mountain, Compass, Droplets } from "lucide-react";

export const tentangDesa = {
  narasi:
    "Desa Jadikarya adalah desa agraris yang terletak di Kecamatan Langkaplancar, Kabupaten Pangandaran, Jawa Barat. Dengan topografi dataran tinggi dan tanah yang subur, desa ini menjadi salah satu sentra produksi hasil bumi di wilayah Pangandaran. Masyarakat Desa Jadikarya hidup dari sektor pertanian, perkebunan, dan kehutanan rakyat yang dikelola secara turun-temurun dengan kearifan lokal.",
  cards: [
    {
      icon: Leaf,
      label: "Potensi Alam & Komoditas",
      items: [
        "Gula Aren & Gula Kelapa — produk unggulan sepanjang tahun",
        "Durian, Manggis, Alpukat — buah musiman bernilai tinggi",
        "Kapulaga, Lada, Jagung — komoditas perkebunan utama",
      ],
    },
    {
      icon: Mountain,
      label: "Pariwisata Alam",
      items: [
        "Potensi wisata sungai dan perbukitan hijau",
        "Area perkebunan dengan panorama pegunungan",
        "Dikembangkan sebagai desa wisata berkelanjutan",
      ],
    },
    {
      icon: Compass,
      label: "Batas Wilayah",
      items: [
        "Utara: Desa Mekarwangi",
        "Selatan: Kecamatan Cigugur",
        "Barat: Desa Pangkalan",
        "Timur: Desa Cisarua",
      ],
    },
    {
      icon: Droplets,
      label: "Tata Guna Lahan",
      items: [
        "Perkebunan: ±1.001 Ha — komoditas utama",
        "Persawahan: ±131 Ha — sawah tadah hujan",
        "Pemukiman: ±447 Ha — permukiman warga",
      ],
    },
  ],
};
```

**`profil-desa/data/struktur-desa.js`:**
```js
export const strukturDesa = {
  top: {
    id: "kadis", jabatan: "Kepala Desa", nama: "Maulana Syahputra", inisial: "MS", foto: "",
  },
  sekretaris: {
    id: "sekdes", jabatan: "Sekretaris Desa", nama: "Siti Rahayu", inisial: "SR", foto: "",
  },
  kaur: [
    { id: "kaur-tu", jabatan: "Kaur Tata Usaha & Umum", nama: "Ahmad Fauzi", inisial: "AF", foto: "" },
    { id: "kaur-keu", jabatan: "Kaur Keuangan", nama: "Dewi Lestari", inisial: "DL", foto: "" },
    { id: "kaur-ren", jabatan: "Kaur Perencanaan", nama: "Rizky Pratama", inisial: "RP", foto: "" },
  ],
  kasi: [
    { id: "kasi-pem", jabatan: "Kasi Pemerintahan", nama: "Hendra Wijaya", inisial: "HW", foto: "" },
    { id: "kasi-kes", jabatan: "Kasi Kesejahteraan", nama: "Nur Aini", inisial: "NA", foto: "" },
  ],
  kadus: [
    { id: "kadus-1", jabatan: "Kepala Dusun I", nama: "Suherman", inisial: "SH", foto: "" },
    { id: "kadus-2", jabatan: "Kepala Dusun II", nama: "Agus Salim", inisial: "AS", foto: "" },
    { id: "kadus-3", jabatan: "Kepala Dusun III", nama: "Surya Darma", inisial: "SD", foto: "" },
  ],
};

export const grupTema = {
  kaur: {
    label: "Kepala Urusan (Kaur)", sub: "Unsur Sekretariat",
    badge: "bg-sky-50 text-sky-700 border-sky-200", bar: "from-sky-500 via-sky-400 to-cyan-400",
    border: "border-sky-200/80", bg: "from-sky-50/60 to-white", text: "text-sky-700", shadow: "shadow-sky-200/60",
  },
  kasi: {
    label: "Kepala Seksi (Kasi)", sub: "Unsur Pelaksana Teknis",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200", bar: "from-emerald-500 via-emerald-400 to-teal-400",
    border: "border-emerald-200/80", bg: "from-emerald-50/60 to-white", text: "text-emerald-700", shadow: "shadow-emerald-200/60",
  },
  kadus: {
    label: "Kepala Dusun (Kadus)", sub: "Unsur Kewilayahan",
    badge: "bg-amber-50 text-amber-700 border-amber-200", bar: "from-amber-500 via-amber-400 to-orange-400",
    border: "border-amber-200/80", bg: "from-amber-50/60 to-white", text: "text-amber-700", shadow: "shadow-amber-200/60",
  },
};
```

**`profil-desa/data/lembaga-desa.js`:**
```js
import { Landmark, Users, Heart, Star, Shield, Building2, Sprout, Baby, Home } from "lucide-react";

export const lembagaDesa = [
  { id: "bpd", singkatan: "BPD", nama: "Badan Permusyawaratan Desa", deskripsi: "Lembaga legislatif desa yang menampung dan menyalurkan aspirasi masyarakat dalam penyelenggaraan pemerintahan desa.", icon: Landmark },
  { id: "lpm", singkatan: "LPM", nama: "Lembaga Pemberdayaan Masyarakat", deskripsi: "Mitra kerja pemerintah desa dalam perencanaan, pelaksanaan, dan pengawasan pembangunan yang bersumber dari masyarakat.", icon: Users },
  { id: "pkk", singkatan: "PKK", nama: "Pemberdayaan Kesejahteraan Keluarga", deskripsi: "Gerakan pemberdayaan keluarga berbasis 10 Program Pokok PKK untuk meningkatkan kualitas hidup masyarakat.", icon: Heart },
  { id: "karangtaruna", singkatan: "Karang Taruna", nama: "Karang Taruna", deskripsi: "Organisasi kepemudaan desa yang berperan dalam pengembangan generasi muda, olahraga, dan kegiatan sosial.", icon: Star },
  { id: "linmas", singkatan: "Linmas", nama: "Perlindungan Masyarakat", deskripsi: "Satuan pelindung masyarakat yang bertugas menjaga keamanan, ketertiban, dan kenyamanan lingkungan desa.", icon: Shield },
  { id: "bumdes", singkatan: "BUMDes", nama: "Badan Usaha Milik Desa", deskripsi: "Lembaga usaha desa yang dikelola secara mandiri untuk meningkatkan perekonomian dan pendapatan asli desa.", icon: Building2 },
  { id: "poktan", singkatan: "Kelompok Tani", nama: "Kelompok Tani", deskripsi: "Wadah bagi petani dalam meningkatkan produktivitas pertanian, berbagi pengetahuan, dan akses terhadap bantuan pertanian.", icon: Sprout },
  { id: "posyandu", singkatan: "Posyandu", nama: "Pos Pelayanan Terpadu", deskripsi: "Unit kegiatan masyarakat yang memberikan layanan kesehatan dasar terutama untuk ibu, bayi, dan balita.", icon: Baby },
  { id: "rtrw", singkatan: "RT / RW", nama: "Rukun Tetangga / Rukun Warga", deskripsi: "Unit terkecil pemerintahan yang berperan dalam membangun solidaritas dan gotong royong antar warga.", icon: Home },
];
```

**`profil-desa/data/statistik-desa.js`:**
```js
import { Users, MapPin, Home, TreePine } from "lucide-react";

export const statistikDesa = [
  { label: "Total Penduduk", value: "3.247", satuan: "Jiwa", icon: Users, desc: "Penduduk terdaftar" },
  { label: "Jumlah Dusun", value: "3", satuan: "Dusun", icon: MapPin, desc: "Wilayah administratif" },
  { label: "RT / RW", value: "18 / 6", satuan: "Unit", icon: Home, desc: "Unit lingkungan" },
  { label: "Luas Wilayah", value: "1.842", satuan: "Hektar", icon: TreePine, desc: "Luas total wilayah" },
];
```

- [ ] **Step 1: Create `profil-desa/data/tentang-desa.js`** with content above

- [ ] **Step 2: Create `profil-desa/data/struktur-desa.js`** with content above

- [ ] **Step 3: Create `profil-desa/data/lembaga-desa.js`** with content above

- [ ] **Step 4: Create `profil-desa/data/statistik-desa.js`** with content above

- [ ] **Step 5: Verify all 4 data files exist**

```bash
Get-ChildItem -Path components/profil-desa/data -Name
```

Expected: `lembaga-desa.js`, `statistik-desa.js`, `struktur-desa.js`, `tentang-desa.js`

---

### Task 4: Extract UI sub-components from ProfilDesaPage

**Files:**
- Create: `components/profil-desa/components/glass-card.jsx`
- Create: `components/profil-desa/components/section-badge.jsx`
- Create: `components/profil-desa/components/section-shell.jsx`
- Create: `components/profil-desa/components/photo-circle.jsx`
- Create: `components/profil-desa/components/person-card.jsx`
- Create: `components/profil-desa/components/group-card.jsx`

**`profil-desa/components/glass-card.jsx`:**
```jsx
export function GlassCard({ children, className = "" }) {
  return (
    <div
      className={
        "rounded-xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg shadow-black/5 transition-all duration-200 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 " +
        className
      }
    >
      {children}
    </div>
  );
}
```

**`profil-desa/components/section-badge.jsx`:**
```jsx
export function SectionBadge({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A4532] shadow-sm">
      <Icon size={14} />
      {label}
    </div>
  );
}
```

**`profil-desa/components/section-shell.jsx`:**
```jsx
export function SectionShell({ children, className = "" }) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/60 backdrop-blur-lg px-5 py-7 shadow-xl shadow-black/5 sm:px-10 sm:py-8 " +
        className
      }
    >
      {children}
    </div>
  );
}
```

**`profil-desa/components/photo-circle.jsx`:**
```jsx
export function PhotoCircle({ foto, inisial, size = "md" }) {
  const dim = {
    lg: "h-24 w-24 text-2xl",
    md: "h-20 w-20 text-lg",
    sm: "h-16 w-16 text-base",
  };
  const ring = "ring-slate-100/80 border-slate-200/80";
  return (
    <div className={`relative mx-auto overflow-hidden rounded-full border bg-slate-100 ${dim[size]} ${ring}`}>
      {foto ? (
        <img src={foto} alt={inisial} className="h-full w-full object-cover object-top" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0A4532] to-[#0E5A42] font-extrabold text-white">
          {inisial}
        </div>
      )}
    </div>
  );
}
```

**`profil-desa/components/person-card.jsx`:**
```jsx
import { PhotoCircle } from "./photo-circle";

export function PersonCard({
  jabatan, nama, inisial, foto = "", variant = "default",
  accent = "from-[#0A4532] via-[#0E5A42] to-emerald-400", www = "max-w-[230px]",
}) {
  const isPrimary = variant === "primary";
  const size = isPrimary ? "lg" : "md";
  const ring = "border-slate-200/90";
  const shadow = isPrimary
    ? "shadow-[0_18px_32px_-18px_rgba(15,23,42,0.55)]"
    : "shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)]";

  return (
    <article className={`group relative mx-auto w-full overflow-hidden rounded-[1.35rem] border bg-white/95 p-3.5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-18px_rgba(15,23,42,0.55)] ${www} ${ring} ${shadow}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(10,69,50,0.06),transparent_24%),radial-gradient(circle_at_84%_86%,rgba(255,255,255,0.65),transparent_20%)] opacity-80" />
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <PhotoCircle foto={foto} inisial={inisial} size={size} />
      <p className="mt-2.5 text-sm font-extrabold leading-5 text-slate-900">{nama}</p>
      <p className={`mt-1.5 rounded-xl border bg-gradient-to-r px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] ${
        isPrimary
          ? "border-slate-200 from-slate-50 to-sky-50/70 text-slate-700"
          : "border-slate-200 from-slate-50 to-slate-100/60 text-slate-600"
      }`}>
        {jabatan}
      </p>
    </article>
  );
}
```

**`profil-desa/components/group-card.jsx`:**
```jsx
export function GroupCard({ tema, children }) {
  return (
    <div className={`relative rounded-2xl border bg-gradient-to-br p-4 sm:p-5 ${tema.border} ${tema.bg}`}>
      <div className="mb-4 flex items-center justify-center gap-2 text-center">
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tema.badge}`}>
          {tema.label}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}
```

- [ ] **Step 1-6: Create each sub-component file** with content above

- [ ] **Step 7: Verify all 6 files exist**

```bash
Get-ChildItem -Path components/profil-desa/components -Name
```

Expected: 6 .jsx files

---

### Task 5: Rewrite profil-desa/index.jsx

**Files:**
- Delete: `components/ProfilDesaPage.jsx`
- Create: `components/profil-desa/index.jsx`

The new `index.jsx` imports all extracted data and components, keeping the exact same JSX markup.

The main changes from the original 820-line file:
- Remove inline data constants → import from `./data/...`
- Remove inline component definitions → import from `./components/...`
- Keep all JSX identical
- Keep `"use client"` directive
- Keep default export as `ProfilDesaPage`

```jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Target } from "lucide-react";
import { tentangDesa } from "./data/tentang-desa";
import { strukturDesa, grupTema } from "./data/struktur-desa";
import { lembagaDesa } from "./data/lembaga-desa";
import { statistikDesa } from "./data/statistik-desa";
import { GlassCard } from "./components/glass-card";
import { SectionBadge } from "./components/section-badge";
import { SectionShell } from "./components/section-shell";
import { PersonCard } from "./components/person-card";
import { GroupCard } from "./components/group-card";

export default function ProfilDesaPage() {
  const [hoveredLembaga, setHoveredLembaga] = useState(null);

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/assets/hero.png" alt="Pemandangan Desa Jadikarya" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 lg:h-56 bg-gradient-to-t from-[#0A4532] via-[#0A4532]/60 to-transparent z-[5] pointer-events-none" />
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-[100px] self-start text-center lg:text-left">
              <h1 data-aos="fade-up" className="font-inter font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-lg leading-tight mb-4">
                Profil <br /> Desa Jadikarya
              </h1>
              <p data-aos="fade-up" data-aos-delay="50" className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mengenal lebih dekat Desa Jadikarya, visi misi, kelembagaan, dan data statistik Desa Jadikarya — Kecamatan Langkaplancar, Kabupaten Pangandaran.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="150" className="lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto space-y-4 lg:pr-1 scrollbar-note">
              {tentangDesa.cards.map((card, i) => {
                const Icon = card.icon;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div key={i} className="relative rounded-xl border border-white/20 bg-white/15 backdrop-blur-lg p-5 sm:p-6 shadow-lg shadow-black/10 overflow-hidden">
                    <span className="absolute top-2 right-3 font-inter font-black text-5xl sm:text-6xl text-white/5 select-none leading-none">{num}</span>
                    <div className="flex items-start gap-3 mb-3 relative z-10">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center backdrop-blur-sm">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-inter font-bold text-sm sm:text-base text-white pt-1.5 drop-shadow-sm">{card.label}</h3>
                    </div>
                    <ul className="space-y-1.5 relative z-10">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-white/80 text-xs sm:text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#F8FAF8] via-white to-[#E8F0EC]" />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-10 sm:space-y-12">

          {/* VISI & MISI */}
          <section id="visi-misi">
            <SectionShell>
              <div data-aos="fade-up" className="text-center space-y-2 mb-12">
                <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">Visi &amp; Misi Desa</h2>
                <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div data-aos="fade-right" className="rounded-xl border border-[#0A4532]/20 bg-[#0A4532]/80 backdrop-blur-md p-7 sm:p-8 text-white shadow-lg">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFE7D2] mb-5">
                    <Star size={12} /> Visi
                  </div>
                  <div className="text-white/10 font-serif text-7xl leading-none select-none -mb-6">&ldquo;</div>
                  <blockquote className="relative font-serif text-xl sm:text-2xl font-bold leading-snug text-white">
                    Terwujudnya Desa Jadikarya yang Maju, Mandiri, dan Sejahtera Berbasis Potensi Lokal.
                  </blockquote>
                  <div className="w-12 h-0.5 bg-white/20 rounded-full mt-5" />
                </div>
                <GlassCard data-aos="fade-left" className="p-7 sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#0A4532]/15 bg-[#0A4532]/5 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0A4532] mb-5">
                    <Target size={12} /> Misi
                  </div>
                  <ol className="space-y-3">
                    {[
                      "Meningkatkan kualitas pelayanan publik yang transparan, akuntabel, dan profesional.",
                      "Mengembangkan potensi pertanian, perkebunan, dan kehutanan secara berkelanjutan.",
                      "Memberdayakan masyarakat melalui program ekonomi kreatif, UMKM, dan BUMDes.",
                      "Meningkatkan kualitas infrastruktur dasar desa yang merata dan berkeadilan.",
                      "Mendorong partisipasi aktif masyarakat dalam musyawarah dan pembangunan desa.",
                      "Melestarikan nilai budaya dan kearifan lokal desa sebagai identitas bangsa.",
                    ].map((misi, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A4532] text-white text-xs font-bold flex items-center justify-center mt-0.5 shadow-md">{i + 1}</span>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{misi}</p>
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </div>
            </SectionShell>
          </section>

          {/* STRUKTUR PERANGKAT DESA */}
          <section id="struktur-perangkat">
            <SectionShell className="!bg-white/88 !backdrop-blur-sm">
              <div data-aos="fade-up" className="text-center space-y-2 mb-8">
                <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">Struktur Perangkat Desa</h2>
                <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
              </div>
              <div data-aos="fade-up" data-aos-delay="50" className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50/70 to-[#0A4532]/[0.04] p-4 shadow-[0_20px_44px_-28px_rgba(15,23,42,0.45)] sm:p-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(10,69,50,0.07),transparent_24%),radial-gradient(circle_at_86%_84%,rgba(212,175,55,0.08),transparent_20%)]" />
                <div className="relative rounded-3xl bg-white/88 p-4 sm:p-5">
                  <div className="flex flex-col items-center">
                    <PersonCard jabatan={strukturDesa.top.jabatan} nama={strukturDesa.top.nama} inisial={strukturDesa.top.inisial} foto={strukturDesa.top.foto} variant="primary" accent="from-[#0A4532] via-[#0E5A42] to-emerald-400" www="max-w-[280px]" />
                    <div className="h-6 w-px bg-gradient-to-b from-[#0A4532]/40 to-[#0A4532]/10" />
                    <PersonCard jabatan={strukturDesa.sekretaris.jabatan} nama={strukturDesa.sekretaris.nama} inisial={strukturDesa.sekretaris.inisial} foto={strukturDesa.sekretaris.foto} variant="default" accent="from-slate-400 via-slate-300 to-slate-200" www="max-w-[230px]" />
                    <div className="h-6 w-px bg-gradient-to-b from-[#0A4532]/15 to-transparent" />
                    <div className="w-full">
                      <GroupCard tema={grupTema.kaur}>
                        {strukturDesa.kaur.map((item) => (
                          <PersonCard key={item.id} jabatan={item.jabatan} nama={item.nama} inisial={item.inisial} foto={item.foto} variant="default" accent={grupTema.kaur.bar} www="max-w-full" />
                        ))}
                      </GroupCard>
                    </div>
                    <div className="h-6 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />
                    <div className="w-full">
                      <GroupCard tema={grupTema.kasi}>
                        {strukturDesa.kasi.map((item) => (
                          <PersonCard key={item.id} jabatan={item.jabatan} nama={item.nama} inisial={item.inisial} foto={item.foto} variant="default" accent={grupTema.kasi.bar} www="max-w-full" />
                        ))}
                      </GroupCard>
                    </div>
                    <div className="h-6 w-px bg-gradient-to-b from-amber-300/60 to-transparent" />
                    <div className="w-full">
                      <GroupCard tema={grupTema.kadus}>
                        {strukturDesa.kadus.map((item) => (
                          <PersonCard key={item.id} jabatan={item.jabatan} nama={item.nama} inisial={item.inisial} foto={item.foto} variant="default" accent={grupTema.kadus.bar} www="max-w-full" />
                        ))}
                      </GroupCard>
                    </div>
                  </div>
                </div>
              </div>
            </SectionShell>
          </section>

          {/* LEMBAGA DESA */}
          <section id="lembaga-desa">
            <SectionShell>
              <div data-aos="fade-up" className="text-center space-y-2 mb-12">
                <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">Lembaga Desa</h2>
                <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
              </div>
              <div data-aos="fade-up" data-aos-delay="50" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {lembagaDesa.map((lembaga) => {
                  const Icon = lembaga.icon;
                  const isHovered = hoveredLembaga === lembaga.id;
                  return (
                    <div key={lembaga.id} onMouseEnter={() => setHoveredLembaga(lembaga.id)} onMouseLeave={() => setHoveredLembaga(null)}
                      className={`rounded-xl border bg-white/70 backdrop-blur-md p-5 transition-all duration-200 cursor-default shadow-lg shadow-black/5 ${
                        isHovered ? "border-[#0A4532]/30 -translate-y-0.5 shadow-xl shadow-black/10" : "border-white/30 hover:border-[#0A4532]/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          isHovered ? "bg-[#0A4532] text-white shadow-md" : "bg-[#0A4532]/10 text-[#0A4532] backdrop-blur-sm"
                        }`}>
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lembaga.singkatan}</span>
                          <h3 className={`font-inter font-bold text-sm leading-tight mt-0.5 mb-1.5 transition-colors ${isHovered ? "text-[#0A4532]" : "text-slate-900"}`}>{lembaga.nama}</h3>
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{lembaga.deskripsi}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionShell>
          </section>

          {/* STATISTIK DESA */}
          <section id="statistik-desa">
            <SectionShell>
              <div data-aos="fade-up" className="text-center space-y-2 mb-12">
                <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">Statistik Desa</h2>
                <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
                <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">Data kependudukan dan administratif Desa Jadikarya yang diperbarui secara berkala oleh pemerintah desa.</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="50" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {statistikDesa.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <GlassCard key={i} className="p-6 sm:p-7">
                      <div className="w-12 h-12 rounded-xl bg-[#0A4532]/90 backdrop-blur-sm flex items-center justify-center mb-5 shadow-lg">
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="font-inter font-black text-4xl sm:text-5xl text-[#0A4532] leading-none mb-1">{stat.value}</div>
                      <div className="text-xs font-bold text-[#0A4532]/30 tracking-widest uppercase mb-3">{stat.satuan}</div>
                      <div className="border-t border-white/30 pt-3">
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">{stat.label}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{stat.desc}</p>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </SectionShell>
          </section>

        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 1: Create `profil-desa/index.jsx`** with content above

- [ ] **Step 2: Remove old `components/ProfilDesaPage.jsx`**

```bash
Remove-Item -Path "components/ProfilDesaPage.jsx"
```

---

### Task 6: Update imports in app files

**Files:**
- Modify: `app/layout.js` — update AOSInit import path
- Modify: `app/page.js` — update 6 component import paths
- Modify: `app/profil-desa/page.js` — update 3 component import paths

- [ ] **Step 1: Update `app/layout.js`**

Old:
```js
import AOSInit from "@/components/AOSInit";
```
New:
```js
import AOSInit from "@/components/aos-init";
```

- [ ] **Step 2: Update `app/page.js`**

Replace all 6 imports to use folder paths:
```js
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import SambutanKepalaDesa from "@/components/sambutan-kepala-desa";
import ProfilDanPotensiDesa from "@/components/profil-dan-potensi-desa";
import AgendaRutinan from "@/components/agenda-rutinan";
import PemerintahDanKontak from "@/components/pemerintah-dan-kontak";
```

- [ ] **Step 3: Update `app/profil-desa/page.js`**

Replace imports:
```js
import Navbar from "@/components/navbar";
import ProfilDesaPage from "@/components/profil-desa";
import PemerintahDanKontak from "@/components/pemerintah-dan-kontak";
```

---

### Task 7: Verify the build

- [ ] **Step 1: Run Next.js build to verify no errors**

```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 2: Verify folder structure**

```bash
Get-ChildItem -Path components -Recurse -Directory | Select-Object -ExpandProperty FullName
```
