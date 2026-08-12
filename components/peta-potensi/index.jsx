"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Map,
  TreePine,
  GraduationCap,
  HeartPulse,
  Store,
  Church,
  ShoppingBag,
  HandHeart,
  Maximize2,
  Download,
} from "lucide-react";
import MapView from "./map-view";

/* ───────────────────── kategori potensi (GeoJSON) ───────────────────── */
const categories = [
  {
    id: "Pendidikan",
    label: "Pendidikan",
    icon: GraduationCap,
    color: "#2563eb",
  },
  {
    id: "Kesehatan",
    label: "Kesehatan",
    icon: HeartPulse,
    color: "#dc2626",
  },
  {
    id: "Ekonomi",
    label: "Ekonomi",
    icon: Store,
    color: "#ea580c",
  },
  {
    id: "Pelayanan",
    label: "Pelayanan",
    icon: HandHeart,
    color: "#7c3aed",
  },
  {
    id: "Keagamaan",
    label: "Keagamaan",
    icon: Church,
    color: "#0d9488",
  },
  {
    id: "UMKM",
    label: "UMKM",
    icon: ShoppingBag,
    color: "#b45309",
  },
  {
    id: "Agroforestik",
    label: "Agroforestik",
    icon: TreePine,
    color: "#16a34a",
  },
];

const mapStats = [
  { label: "Luas Wilayah", value: "18,12", unit: "Km²", note: "8,20% dari total keseluruhan luas wilayah Kecamatan Langkaplancar." },
  { label: "Jumlah Dusun", value: "5", unit: "Dusun", note:"Dusun di Desa Jadikarya bertumpu pada komoditas dataran tinggi ber nilai ekonomi tinggi" },
  { label: "Ketinggian", value: "100-700", unit: "mdpl", note: "Sebagaimana wilayah kecamatan Langkaplancar secara keseluruhan." },
  { label: "Curah Hujan", value: "1.500 - 4.000", unit: "mm/thn",note:"diproyeksikan memiliki curah hujan tahunan yang cukup tinggi" },
];

export default function PetaPotensiPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/alam/alam3.webp"
            alt="Pemandangan Desa Jadikarya"
            fill
            priority
            sizes="(max-width: 768px) 150vw, 100vw"
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#041a12]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 lg:h-56 bg-gradient-to-t from-[#0A4532] via-[#0A4532]/50 to-transparent z-[3] pointer-events-none" />

        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h1
              className="font-inter font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-lg leading-tight mb-4"
            >
              Peta Potensi <br /> Desa{" "}
              <span className="text-yellow-500">Jadikarya</span>
            </h1>
            <p
              className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Peta interaktif berbasis QGIS yang menampilkan sebaran potensi,
              tata guna lahan, dan data spasial Desa Jadikarya — Kecamatan
              Langkaplancar, Kabupaten Pangandaran.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTENT — MAP + SIDEBAR
      ══════════════════════════════════════════════════ */}
      <div className="relative">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#F8FAF8] via-white to-[#E8F0EC]" />
        <div className="absolute inset-0 bg-village-grid-light opacity-85 pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
          {/* ── Stats Bar ── */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8"
          >
            {mapStats.map((stat, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 backdrop-blur-md p-4 sm:p-5 shadow-lg shadow-black/5 text-center transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="font-inter font-black text-2xl text-[#0A4532] leading-none">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-[10px] font-bold text-[#0A4532]/30 tracking-widest uppercase ml-1 align-middle">
                      {stat.unit}
                    </span>
                  )}
                </div>
                {stat.note && (
                  <div className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-snug">
                    {stat.note}
                  </div>
                )}
                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Main Grid: Map + Sidebar ── */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
          >
            {/* ── Map Area ── */}
            <div
              className={`relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_44px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 ${
                isFullscreen ? "lg:col-span-2" : ""
              }`}
            >
              {/* Top toolbar */}
              <div className="relative z-[1000] flex items-center justify-between border-b border-slate-200/60 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0A4532] flex items-center justify-center">
                    <Map size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-none">
                      Peta Desa Jadikarya
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Batas Desa Jadikarya
                      {totalCount !== null && (
                        <> · {totalCount} titik potensi</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsFullscreen((f) => !f)}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="Perbesar area peta"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Interactive Leaflet Map */}
              <MapView onCounts={({ total }) => setTotalCount(total)} />

              {/* Bottom info bar */}
              <div className="relative z-[1000] border-t border-slate-200/60 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2.5 flex items-center justify-between">
                <p className="text-[10px] sm:text-xs text-slate-400">
                  Sumber: Peta Desa Jadikarya · Dibuat dengan QGIS 3.x ·
                  Ditampilkan via Leaflet
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Data aktif
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            {!isFullscreen && (
              <div className="space-y-4" data-aos="fade-left" data-aos-delay="200">
                {/* Legend */}
                <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 backdrop-blur-md shadow-xl overflow-hidden p-5">
                  <p className="text-sm font-bold text-slate-800 mb-3">Legenda</p>
                  <div className="space-y-2.5">
                    {categories.map((layer) => {
                      const Icon = layer.icon;
                      return (
                        <div key={layer.id} className="flex items-center gap-2.5">
                          <div
                            className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: layer.color }}
                          />
                          <Icon size={12} style={{ color: layer.color }} className="flex-shrink-0" />
                          <span className="text-[11px] font-medium text-slate-600">
                            {layer.label}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                      <span className="text-[11px] font-medium text-slate-600">
                        Batas Desa
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 backdrop-blur-md shadow-xl overflow-hidden p-5">
                  <p className="text-sm font-bold text-slate-800 mb-2">Keterangan</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Klik salah satu pin pada peta untuk melihat nama dan kategori
                    potensi di Desa Jadikarya. Peta hanya dapat dijelajahi di
                    dalam batas wilayah desa.
                  </p>
                  <a
                    href="/assets/Peta_des_%20jadikarya_KKN.png"
                    download="Peta Desa Jadikarya KKN.png"
                    className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-[#0A4532] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#063023]"
                  >
                    <Download size={14} />
                    Unduh Gambar Peta Potensi
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}