"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Map,
  Layers,
  TreePine,
  Wheat,
  Mountain,
  Droplets,
  Home,
  ChevronRight,
  Info,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Navigation,
} from "lucide-react";

/* ───────────────────── dummy layer data ───────────────────── */
const mapLayers = [
  {
    id: "administratif",
    label: "Batas Administratif",
    icon: Home,
    color: "#0A4532",
    description: "Batas wilayah desa, dusun, RT, dan RW Desa Jadikarya.",
    active: true,
  },
  {
    id: "pertanian",
    label: "Lahan Pertanian",
    icon: Wheat,
    color: "#16a34a",
    description: "Peta sebaran lahan sawah, ladang, dan kebun produktif.",
    active: true,
  },
  {
    id: "kehutanan",
    label: "Kawasan Hutan",
    icon: TreePine,
    color: "#15803d",
    description: "Tutupan hutan lindung, hutan rakyat, dan area reboisasi.",
    active: false,
  },
  {
    id: "topografi",
    label: "Topografi & Elevasi",
    icon: Mountain,
    color: "#92400e",
    description: "Kontur ketinggian dan kemiringan lereng desa.",
    active: false,
  },
  {
    id: "hidrologi",
    label: "Sumber Air & Sungai",
    icon: Droplets,
    color: "#0284c7",
    description: "Jaringan sungai, mata air, dan irigasi Desa Jadikarya.",
    active: false,
  },
];

const mapStats = [
  { label: "Luas Wilayah", value: "18,12", unit: "Km²", note: "8,20% dari total keseluruhan luas wilayah Kecamatan Langkaplancar." },
  { label: "Jumlah Dusun", value: "5", unit: "Dusun", note:"Dusun di Desa Jadikarya bertumpu pada komoditas dataran tinggi ber nilai ekonomi tinggi" },
  { label: "Ketinggian", value: "100-700", unit: "mdpl", note: "Sebagaimana wilayah kecamatan Langkaplancar secara keseluruhan." },
  { label: "Curah Hujan", value: "1.500 - 4.000", unit: "mm/thn",note:"diproyeksikan memiliki curah hujan tahunan yang cukup tinggi" },
];

export default function PetaPotensiPage() {
  const [layers, setLayers] = useState(mapLayers);
  const [selectedLayer, setSelectedLayer] = useState(mapLayers[0]);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleLayer = (id) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  const activeCount = layers.filter((l) => l.active).length;

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/sawah.jpg"
            alt="Pemandangan Desa Jadikarya"
            fill
            priority
            sizes="(max-width: 768px) 150vw, 100vw"
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#041a12]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 lg:h-56 bg-gradient-to-t from-[#0A4532] via-[#0A4532]/60 to-transparent z-[5] pointer-events-none" />

        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <div
              data-aos="fade-up"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FFE7D2] mb-6"
            >
              <Map size={14} />
              Peta Spasial GIS
            </div>
            <h1
              data-aos="fade-up"
              data-aos-delay="50"
              className="font-inter font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-lg leading-tight mb-4"
            >
              Peta Potensi <br /> Desa{" "}
              <span className="text-yellow-500">Jadikarya</span>
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
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
              className={`relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50/70 to-[#0A4532]/[0.04] shadow-[0_20px_44px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 ${
                isFullscreen ? "lg:col-span-2" : ""
              }`}
            >
              {/* Decorative inner glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(10,69,50,0.07),transparent_24%),radial-gradient(circle_at_86%_84%,rgba(212,175,55,0.08),transparent_20%)]" />

              {/* Top toolbar */}
              <div className="relative flex items-center justify-between border-b border-slate-200/60 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0A4532] flex items-center justify-center">
                    <Map size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-none">
                      Peta Desa Jadikarya
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {activeCount} layer aktif · Zoom {zoom}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setZoom((z) => Math.max(50, z - 10))}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <button
                    onClick={() => setZoom((z) => Math.min(200, z + 10))}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={() => setIsFullscreen((f) => !f)}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Map Placeholder — will be replaced with QGIS export */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-br from-[#e8f5e9] via-[#f1f8e9] to-[#e0f2f1] overflow-hidden">
                {/* Topographic-style decorative lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-[0.15]"
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                >
                  {/* Contour lines */}
                  <path d="M0,250 Q100,200 200,230 T400,210 T600,250 T800,220" fill="none" stroke="#0A4532" strokeWidth="1.5" />
                  <path d="M0,280 Q150,250 250,270 T450,240 T650,280 T800,260" fill="none" stroke="#0A4532" strokeWidth="1" />
                  <path d="M0,310 Q120,290 220,300 T420,280 T620,310 T800,290" fill="none" stroke="#0A4532" strokeWidth="0.8" />
                  <path d="M0,340 Q180,310 280,330 T480,310 T680,340 T800,320" fill="none" stroke="#0A4532" strokeWidth="0.6" />
                  <path d="M0,200 Q80,170 180,190 T380,170 T580,200 T800,180" fill="none" stroke="#0A4532" strokeWidth="1" />
                  <path d="M0,170 Q100,140 200,160 T400,140 T600,170 T800,150" fill="none" stroke="#0A4532" strokeWidth="0.7" />
                  {/* River */}
                  <path d="M350,0 Q360,80 340,150 Q320,220 350,300 Q380,380 360,500" fill="none" stroke="#0284c7" strokeWidth="2.5" opacity="0.4" />
                  <path d="M360,200 Q400,230 450,240 Q500,250 540,280" fill="none" stroke="#0284c7" strokeWidth="1.5" opacity="0.3" />
                  {/* Land patches */}
                  <rect x="80" y="120" width="120" height="80" rx="8" fill="#16a34a" opacity="0.08" />
                  <rect x="500" y="100" width="140" height="100" rx="8" fill="#16a34a" opacity="0.06" />
                  <rect x="250" y="320" width="100" height="70" rx="8" fill="#92400e" opacity="0.06" />
                  <rect x="600" y="300" width="110" height="80" rx="8" fill="#15803d" opacity="0.08" />
                  {/* Settlement dots */}
                  <circle cx="200" cy="200" r="6" fill="#0A4532" opacity="0.12" />
                  <circle cx="400" cy="150" r="8" fill="#0A4532" opacity="0.15" />
                  <circle cx="550" cy="350" r="5" fill="#0A4532" opacity="0.1" />
                  <circle cx="150" cy="380" r="7" fill="#0A4532" opacity="0.1" />
                  <circle cx="650" cy="180" r="6" fill="#0A4532" opacity="0.12" />
                </svg>

                {/* Center marker */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 -m-4 rounded-full bg-[#0A4532]/10 animate-ping" style={{ animationDuration: "2s" }} />
                    <div className="relative w-12 h-12 rounded-full bg-[#0A4532] shadow-xl flex items-center justify-center ring-4 ring-white/80">
                      <Navigation size={20} className="text-white" />
                    </div>
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#0A4532] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      Desa Jadikarya
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A4532] rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Dummy dusun markers */}
                {[
                  { name: "Dusun Jajaway", x: "20%", y: "30%" },
                  { name: "Dusun Jadiharja", x: "35%", y: "65%" },
                  { name: "Dusun Lebakjero", x: "60%", y: "40%" },
                  { name: "Dusun Karangpucung", x: "75%", y: "25%" },
                  { name: "Dusun Cipaminggir", x: "80%", y: "70%" },
                ].map((dusun, i) => (
                  <div
                    key={i}
                    className="absolute group cursor-pointer"
                    style={{ left: dusun.x, top: dusun.y }}
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/80 border-2 border-white shadow-md flex items-center justify-center transition-transform hover:scale-125">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-semibold px-2 py-1 rounded-md whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {dusun.name}
                    </div>
                  </div>
                ))}

                {/* Compass Rose */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg flex items-center justify-center">
                  <div className="text-[10px] font-black text-[#0A4532] leading-none">N</div>
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-[#0A4532]" />
                </div>

                {/* Scale bar */}
                <div className="absolute bottom-4 left-4 flex items-end gap-1">
                  <div className="flex flex-col items-start">
                    <div className="text-[8px] font-bold text-slate-600 mb-0.5">0 &nbsp; 250 &nbsp; 500m</div>
                    <div className="flex">
                      <div className="w-8 h-1.5 bg-slate-800" />
                      <div className="w-8 h-1.5 bg-white border border-slate-300" />
                      <div className="w-8 h-1.5 bg-slate-800" />
                    </div>
                  </div>
                </div>

                {/* "Dummy" watermark */}
                <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-400/60 tracking-widest uppercase">
                  Placeholder — QGIS Map
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="border-t border-slate-200/60 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2.5 flex items-center justify-between">
                <p className="text-[10px] sm:text-xs text-slate-400">
                  Sumber: Peta Desa Jadikarya · Dibuat dengan QGIS 3.x
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Data siap diperbarui
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            {!isFullscreen && (
              <div className="space-y-4" data-aos="fade-left" data-aos-delay="200">
                {/* Layer Control */}
                <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 backdrop-blur-md shadow-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0A4532]/10 flex items-center justify-center">
                      <Layers size={14} className="text-[#0A4532]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Layer Peta</p>
                      <p className="text-[10px] text-slate-400">{activeCount} dari {layers.length} aktif</p>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {layers.map((layer) => {
                      const Icon = layer.icon;
                      return (
                        <button
                          key={layer.id}
                          onClick={() => {
                            toggleLayer(layer.id);
                            setSelectedLayer(layer);
                          }}
                          className={`w-full px-5 py-3.5 flex items-center gap-3 text-left transition-all duration-200 hover:bg-slate-50 ${
                            selectedLayer.id === layer.id
                              ? "bg-[#0A4532]/[0.03]"
                              : ""
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                            style={{
                              backgroundColor: layer.active
                                ? `${layer.color}15`
                                : "#f1f5f9",
                              color: layer.active ? layer.color : "#94a3b8",
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-xs font-semibold leading-none transition-colors ${
                                layer.active
                                  ? "text-slate-800"
                                  : "text-slate-400"
                              }`}
                            >
                              {layer.label}
                            </p>
                          </div>
                          {/* Toggle */}
                          <div
                            className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
                              layer.active ? "bg-[#0A4532]" : "bg-slate-200"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                                layer.active
                                  ? "translate-x-[18px]"
                                  : "translate-x-0.5"
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Layer Info */}
                <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 backdrop-blur-md shadow-xl overflow-hidden p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${selectedLayer.color}15`,
                        color: selectedLayer.color,
                      }}
                    >
                      <Info size={14} />
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      {selectedLayer.label}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {selectedLayer.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-[#0A4532]">
                      <ChevronRight size={12} />
                      <span>Klik layer untuk toggle tampilan</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 backdrop-blur-md shadow-xl overflow-hidden p-5">
                  <p className="text-sm font-bold text-slate-800 mb-3">Legenda</p>
                  <div className="space-y-2.5">
                    {layers
                      .filter((l) => l.active)
                      .map((layer) => {
                        const Icon = layer.icon;
                        return (
                          <div key={layer.id} className="flex items-center gap-2.5">
                            <div
                              className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
                              style={{ backgroundColor: layer.color }}
                            />
                            <Icon size={12} style={{ color: layer.color }} className="flex-shrink-0" />
                            <span className="text-[11px] font-medium text-slate-600">
                              {layer.label}
                            </span>
                          </div>
                        );
                      })}
                    {/* Dusun marker */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-500 flex-shrink-0" />
                      <span className="text-[11px] font-medium text-slate-600">
                        Pusat Dusun
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
