# Component Folder Restructure — Desa Jadikarya

## Goal
Restructure flat `components/` directory into per-component folders with extracted sub-components and data files for maintainability.

## New Structure

```
components/
├── navbar/index.jsx
├── hero-section/index.jsx
├── sambutan-kepala-desa/index.jsx
├── profil-dan-potensi-desa/index.jsx
├── agenda-rutinan/index.jsx
├── pemerintah-dan-kontak/index.jsx
├── aos-init/index.jsx
└── profil-desa/
    ├── index.jsx
    ├── data/
    │   ├── tentang-desa.js
    │   ├── struktur-desa.js
    │   ├── lembaga-desa.js
    │   └── statistik-desa.js
    └── components/
        ├── glass-card.jsx
        ├── section-badge.jsx
        ├── section-shell.jsx
        ├── photo-circle.jsx
        ├── person-card.jsx
        └── group-card.jsx
```

## What Changes

### Files moved to folders
| File | New location |
|------|-------------|
| `components/Navbar.jsx` | `components/navbar/index.jsx` |
| `components/HeroSection.jsx` | `components/hero-section/index.jsx` |
| `components/SambutanKepalaDesa.jsx` | `components/sambutan-kepala-desa/index.jsx` |
| `components/ProfilDanPotensiDesa.jsx` | `components/profil-dan-potensi-desa/index.jsx` |
| `components/AgendaRutinan.jsx` | `components/agenda-rutinan/index.jsx` |
| `components/PemerintahDanKontak.jsx` | `components/pemerintah-dan-kontak/index.jsx` |
| `components/AOSInit.jsx` | `components/aos-init/index.jsx` |

### ProfilDesaPage — extracted
From `components/ProfilDesaPage.jsx` (820 lines):

- **`profil-desa/index.jsx`** — main component (was `ProfilDesaPage`)
- **`profil-desa/data/tentang-desa.js`** — `tentangDesa` object
- **`profil-desa/data/struktur-desa.js`** — `strukturDesa` + `grupTema`
- **`profil-desa/data/lembaga-desa.js`** — `lembagaDesa` array
- **`profil-desa/data/statistik-desa.js`** — `statistikDesa` array
- **`profil-desa/components/glass-card.jsx`** — `GlassCard` component
- **`profil-desa/components/section-badge.jsx`** — `SectionBadge` component
- **`profil-desa/components/section-shell.jsx`** — `SectionShell` component
- **`profil-desa/components/photo-circle.jsx`** — `PhotoCircle` component
- **`profil-desa/components/person-card.jsx`** — `PersonCard` component
- **`profil-desa/components/group-card.jsx`** — `GroupCard` component

### Import paths to update
| File | Old import | New import |
|------|-----------|-----------|
| `app/page.js` | `@/components/Navbar` | `@/components/navbar` |
| `app/page.js` | `@/components/HeroSection` | `@/components/hero-section` |
| `app/page.js` | `@/components/SambutanKepalaDesa` | `@/components/sambutan-kepala-desa` |
| `app/page.js` | `@/components/ProfilDanPotensiDesa` | `@/components/profil-dan-potensi-desa` |
| `app/page.js` | `@/components/AgendaRutinan` | `@/components/agenda-rutinan` |
| `app/page.js` | `@/components/PemerintahDanKontak` | `@/components/pemerintah-dan-kontak` |
| `app/layout.js` | `@/components/AOSInit` | `@/components/aos-init` |
| `app/profil-desa/page.js` | `@/components/Navbar` | `@/components/navbar` |
| `app/profil-desa/page.js` | `@/components/ProfilDesaPage` | `@/components/profil-desa` |
| `app/profil-desa/page.js` | `@/components/PemerintahDanKontak` | `@/components/pemerintah-dan-kontak` |

## What Stays the Same
- All JSX markup, styling, logic — unchanged
- `jsconfig.json` path alias `@/*` — unchanged
- `app/` routing structure — unchanged
- Assets in `assets/` and `public/assets/` — unchanged

## Non-Goals
- No behavior changes or UI updates
- No data model changes
- No dependency changes
