# Potensi Desa Page — Design Spec

## Overview
Dedicated halaman `/potensi-desa` yang menampilkan 5 sektor potensi Desa Jadikarya secara lengkap dengan galeri foto, deskripsi detail, dan navigasi tab switching (hide/show).

## Route & File Structure
```
app/potensi-desa/
  └── page.js                    → route /potensi-desa

components/potensi-desa/
  ├── index.jsx                  → main page component (client component)
  ├── data/
  │   └── potensi-desa.js        → array 5 sektor dengan konten lengkap & placeholder images
  └── components/
      ├── sector-tabs.jsx        → 5 tombol navigasi sektor
      └── sector-detail.jsx      → konten detail per sektor (galeri + teks + poin)
```

## Layout (top to bottom)

### 1. Hero Banner
- Full-width, background image dengan overlay gradient `#0A4532`
- Judul "POTENSI DESA" besar (font-inter bold, tracking-wide)
- Subtitle: "Desa Jadikarya — Kecamatan Langkaplancar, Kabupaten Pangandaran"
- Same pattern as `/profil-desa` hero

### 2. Sector Tab Navigation
- 5 tombol/kartu horizontal (responsive: grid di mobile)
- Label: Pertanian & Perkebunan, Kehutanan & Agroforestri, Peternakan, Wisata Alam, Ekonomi Lokal
- Active state: background `#0A4532`, text white, border highlight
- Inactive: white card with subtle shadow
- Sticky on scroll (sticky top after navbar)

### 3. Content Area (switches via tab)
Each sector when active shows:

#### a. Photo Gallery Grid
- Grid 3 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile)
- 6 placeholder images per sektor (menggunakan gradien warna dengan overlay teks nama sektor — dibuat via komponen React, tidak perlu download gambar)
- Rounded corners, hover scale effect
- Gap antar foto

#### b. Deskripsi Section
- Judul sektor (besar, bold)
- Paragraf deskripsi lengkap dari konten potensi-desa.md
- Dipisahkan per sub-topic

#### c. Komoditas / Poin Penting
- Ditampilkan sebagai badge/chip atau list dengan bullet ikon
- Contoh: untuk pertanian → Jagung, Kapulaga, Alpukat, Durian, dll

#### d. Info Highlights (optional)
- Cards kecil untuk data pendukung (contoh: "65 hektare" untuk kehutanan)

### 4. Footer / Back CTA
- Tombol "Kembali ke Beranda"
- `PemerintahDanKontak` component (sama seperti halaman lain)

## Data Structure (potensi-desa.js)
```js
export const potensiDesaData = [
  {
    id: "pertanian",
    title: "Sektor Pertanian dan Perkebunan",
    heroImage: "/assets/placeholder-1.jpg",
    images: ["/assets/placeholder-1.jpg", "/assets/placeholder-2.jpg", ...], // 6 photos
    description: "Pertanian merupakan sektor utama...",
    commodities: ["Jagung", "Kapulaga", "Alpukat", "Durian", "Manggis", "Lada", "Tembakau"],
    highlights: [
      { label: "Program", value: "Ketahanan Pangan Nasional" },
    ],
  },
  // ... 4 more sectors
];
```

## Navigasi Updates
- `components/navbar/index.jsx`: ubah potensi desa href dari `/#potensi-desa` ke `/potensi-desa`, set `isPage: true`
- `components/profil-dan-potensi-desa/index.jsx`: ubah tombol "Lihat Selengkapnya" href ke `/potensi-desa`

## Design Tokens
- Primary: `#0A4532`
- Accent: `#FFE7D2`
- Background sections: white, `#F8FAF8`, `#0A4532` (hero)
- Font: Inter (existing)
- Animations: AOS fade-up/fade-right/fade-left (existing pattern)