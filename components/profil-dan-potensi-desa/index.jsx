"use client";

import { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import PotensiCarousel from "./potensi-carousel";

const potensiSectors = [
  {
    id: "Agroforestik",
    slug: "agroforest",
    title: "AGROFORESTIK",
    description:
      "DIDUKUNG TANAH YANG SUBUR, DESA JADIKARYA MENGHASILKAN BERBAGAI KOMODITAS UNGGULAN SEPERTI JAGUNG, KAPULAGA, DURIAN, ALPUKAT, MANGGIS, DAN LADA YANG MENJADI PENOPANG PEREKONOMIAN MASYARAKAT.",
    images: ["/assets/sawah.jpg", "/assets/hero.png", "/assets/potensi_wisata.png"],
    thumbLabel: "Sektor Agroforestik",
    thumbImg: "/assets/sawah.jpg",
  },
  {
    id: "Gudang buah",
    slug: "gudang-buah",
    title: "GUDANG BUAH (sumber rezeki)",
    description:
      "SUMBER REZEKI Gudang buah durian dan manggis ini merupakan Gudang sortir ke dalam negeri dan luar negeri",
    images: ["/assets/gudangBuah/gudang-buah1.jpeg", "/assets/gudangBuah/gudang-buah2.jpeg", "/assets/hero.png"],
    thumbLabel: "Gudang Buah (sumber rezeki)",
    thumbImg: "/assets/gudangBuah/gudang-buah1.jpeg",
  },
  {
    id: "Persawahan ",
    slug: "persawahan",
    title: "SEKTOR PERSAWAHAN",
    description:
      "KEINDAHAN SUNGAI ALAM DAN PERBUKITAN HIJAU LANGKAPLANCAR POTENSIAL DIKEMBANGKAN MENJADI DESTINASI WISATA ARUNG JERAM DAN DESA WISATA BERKELANJUTAN.",
    images: ["/assets/potensi_wisata.png", "/assets/hero.png", "/assets/sawah.jpg"],
    thumbLabel: "Sektor Persawahan",
    thumbImg: "/assets/potensi_wisata.png",
  },
  {
    id: "umkm",
    slug: "umkm",
    title: "UMKM PUSAT UNGGULAN JADIKARYA",
    description:
      "PEMELIHARAAN TERNAK SAPI, KAMBING, DAN BUDIDAYA IKAN AIR TAWAR YANG DIKELOLA OLEH KELOMPOK TANI DAN PEMUDA DESA UNTUK KETAHANAN PANGAN LOKAL.",
    images: ["/assets/hero.png", "/assets/sawah.jpg", "/assets/potensi_wisata.png"],
    thumbLabel: "UMKM Pusat Unggulan Jadikarya",
    thumbImg: "/assets/hero.png",
  },
  {
    id: "pendidikan",
    slug: "pendidikan",
    title: "SEKTOR PENDIDIKAN",
    description:
      "PERAN BUMDES DAN UMKM DESA DALAM MENDISTRIBUSIKAN HASIL BUMI SERTA MEMAJUKAN KESEJAHTERAAN MASYARAKAT SECARA MANDIRI DAN INKLUSIF.",
    images: ["/assets/hero.png", "/assets/potensi_wisata.png", "/assets/sawah.jpg"],
    thumbLabel: "Sektor Pendidikan",
    thumbImg: "/assets/hero.png",
  },
  {
    id: "kesehatan",
    slug: "kesehatan",
    title: "SEKTOR KESEHATAN",
    description:
      "PERAN BUMDES DAN UMKM DESA DALAM MENDISTRIBUSIKAN HASIL BUMI SERTA MEMAJUKAN KESEJAHTERAAN MASYARAKAT SECARA MANDIRI DAN INKLUSIF.",
    images: ["/assets/hero.png", "/assets/potensi_wisata.png", "/assets/sawah.jpg"],
    thumbLabel: "Sektor Kesehatan",
    thumbImg: "/assets/hero.png",
  },
  {
    id: "layanan-publik",
    slug: "layanan-publik",
    title: "PELAYANAN MASYARAKAT",
    description:
      "PERAN BUMDES DAN UMKM DESA DALAM MENDISTRIBUSIKAN HASIL BUMI SERTA MEMAJUKAN KESEJAHTERAAN MASYARAKAT SECARA MANDIRI DAN INKLUSIF.",
    images: ["/assets/hero.png", "/assets/potensi_wisata.png", "/assets/sawah.jpg"],
    thumbLabel: "Pelayanan Masyarakat",
    thumbImg: "/assets/hero.png",
  },
];

export default function ProfilDanPotensiDesa() {
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);

  const activeSector = potensiSectors[activeSectorIndex];

  const handleSectorChange = useCallback((index) => {
    setActiveSectorIndex(index);
  }, []);

  return (
    <div className="w-full">
      {/* ================= SECTION 3: SEKILAS PROFIL DESA ================= */}
      <section id="profil-desa" className="relative w-full bg-[#0A4532] text-white py-12 lg:py-16 overflow-hidden">
        {/* Subtle dark grid background */}
        <div className="absolute inset-0 bg-village-grid-dark opacity-35 pointer-events-none select-none" />
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content (Text) */}
          <div
            data-aos="fade-right"
            className="lg:col-span-6 px-6 sm:px-10 lg:pl-16 lg:pr-8 space-y-6"
          >
            <div className="inline-flex items-center gap-3 text-[#FFE7D2] font-semibold text-sm sm:text-base tracking-widest uppercase">
              <span>SEKILAS PROFIL DESA</span>
            </div>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-normal">
              Desa Jadikarya merupakan desa agraris di Kecamatan Langkaplancar, Kabupaten Pangandaran, yang dikenal sebagai penghasil gula aren, gula kelapa, durian, dan manggis. Ganti kalimat ini dengan deskripsi resmi dari perangkat desa.
            </p>

            <div>
              <a
                href="#sambutan"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FFE7D2] font-medium text-sm sm:text-base transition-all hover:scale-105"
              >
                Lihat Profil Desa <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Image (W-FULL & Arch Corner Top-Left) */}
          <div
            data-aos="fade-left"
            className="lg:col-span-6 w-full"
          >
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-tl-[140px] sm:rounded-tl-[180px] lg:rounded-tl-[220px] overflow-hidden shadow-2xl">
              <Image
                src="/assets/sawah.jpg"
                alt="Pemandangan Gunung dan Sawah Desa Jadikarya"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: POTENSI DESA WITH DYNAMIC BACKGROUND & LINEAR GRADIENT ================= */}
      <section id="potensi-desa" className="relative w-full py-16 sm:py-24 text-white overflow-hidden bg-[#0A4532]">

        {/* Dynamic Background Image changing with active sector */}
        <div className="absolute inset-0 z-0">
          {potensiSectors.map((sector, idx) => (
            <div
              key={sector.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: activeSectorIndex === idx ? 1 : 0 }}
            >
              <Image
                src={sector.images[0]}
                alt={sector.title}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          ))}

          {/* Linear Gradient Overlay: Solid #0A4532 on left (opacity 100%), fading to transparent on right (opacity 0%) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A4532] via-[#0A4532]/75 to-transparent" />
          {/* Subtle dark grid background */}
          <div className="absolute inset-0 bg-village-grid-dark opacity-35 pointer-events-none select-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Header Row: Title Left, CTA Right */}
          <div
            data-aos="fade-up"
            className="flex items-center justify-between gap-4"
          >
            <div className="inline-flex items-center gap-3 text-[#FFE7D2] font-semibold text-sm sm:text-base tracking-widest uppercase">
              <span>SEKILAS POTENSI DESA</span>
            </div>

            <a
              href="/potensi-desa"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-xs sm:text-sm text-white font-medium transition-all hover:scale-105"
            >
              Lihat Selengkapnya <ArrowRight size={16} />
            </a>
          </div>

          {/* Middle Row: Left Carousel Image Card, Right Text Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Card with Image Carousel */}
            <div
              data-aos="fade-right"
              className="lg:col-span-5"
            >
              <PotensiCarousel
                images={activeSector.images}
                alt={activeSector.title}
                href={`/potensi-desa?sektor=${activeSector.slug}`}
              />
            </div>

            {/* Right Column: Title & Description Text Directly on Background */}
            <div
              data-aos="fade-left"
              className="lg:col-span-7 space-y-4"
            >
              {potensiSectors.map((sector, idx) => (
                <div
                  key={sector.id}
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    opacity: activeSectorIndex === idx ? 1 : 0,
                    display: activeSectorIndex === idx ? "block" : "none",
                  }}
                >
                  <h4 className="font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-wide uppercase leading-snug drop-shadow">
                    {sector.title}
                  </h4>

                  <p className="text-white/90 max-w-xl text-sm sm:text-base font-normal leading-relaxed tracking-wide uppercase drop-shadow">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom 7 Numbered Pill Selector */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-4"
          >
            {potensiSectors.map((sector, index) => {
              const isActive = activeSectorIndex === index;
              return (
                <button
                  key={sector.id}
                  onClick={() => handleSectorChange(index)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 border-2 shadow-xl ${
                    isActive
                      ? "bg-white text-[#0A4532] border-[#FFE7D2] ring-4 ring-[#FFE7D2]/40 scale-[1.03]"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-[1.01]"
                  }`}
                >
                  {/* Label */}
                  <span className="text-xs font-bold leading-tight line-clamp-3">
                    {sector.thumbLabel}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
