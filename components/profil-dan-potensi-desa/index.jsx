"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ProfilDanPotensiDesa() {
  // 5 Sektor Potensi Desa
  const potensiSectors = [
    {
      id: "pertanian",
      title: "SEKTOR PERTANIAN DAN PERKEBUNAN KOMODITAS",
      description:
        "DIDUKUNG TANAH YANG SUBUR, DESA JADIKARYA MENGHASILKAN BERBAGAI KOMODITAS UNGGULAN SEPERTI JAGUNG, KAPULAGA, DURIAN, ALPUKAT, MANGGIS, DAN LADA YANG MENJADI PENOPANG PEREKONOMIAN MASYARAKAT.",
      images: ["/assets/sawah.jpg", "/assets/hero.png", "/assets/potensi_wisata.png"],
      thumbLabel: "Sektor Pertanian dan Perkebunan Komoditas",
      thumbImg: "/assets/sawah.jpg",
    },
    {
      id: "kehutanan",
      title: "SEKTOR KEHUTANAN RAKYAT DAN AGROFORESTRI",
      description:
        "PENGELOLAAN HUTAN RAKYAT BERKELANJUTAN DAN SISTEM AGROFORESTRI DENGAN TANAMAN KAYU SERTA HASIL HUTAN BUKAN KAYU UNTUK KESEJAHTERAAN LINGKUNGAN MASYARAKAT.",
      images: ["/assets/potensi_wisata.png", "/assets/sawah.jpg", "/assets/hero.png"],
      thumbLabel: "Sektor Kehutanan Rakyat dan Agroforestri",
      thumbImg: "/assets/potensi_wisata.png",
    },
    {
      id: "wisata",
      title: "SEKTOR POTENSI WISATA ALAM DAN JASA LINGKUNGAN",
      description:
        "KEINDAHAN SUNGAI ALAM DAN PERBUKITAN HIJAU LANGKAPLANCAR POTENSIAL DIKEMBANGKAN MENJADI DESTINASI WISATA ARUNG JERAM DAN DESA WISATA BERKELANJUTAN.",
      images: ["/assets/potensi_wisata.png", "/assets/hero.png", "/assets/sawah.jpg"],
      thumbLabel: "Sektor Potensi Wisata Alam dan Jasa Lingkungan",
      thumbImg: "/assets/potensi_wisata.png",
    },
    {
      id: "peternakan",
      title: "SEKTOR PETERNAKAN",
      description:
        "PEMELIHARAAN TERNAK SAPI, KAMBING, DAN BUDIDAYA IKAN AIR TAWAR YANG DIKELOLA OLEH KELOMPOK TANI DAN PEMUDA DESA UNTUK KETAHANAN PANGAN LOKAL.",
      images: ["/assets/hero.png", "/assets/sawah.jpg", "/assets/potensi_wisata.png"],
      thumbLabel: "Sektor Peternakan",
      thumbImg: "/assets/hero.png",
    },
    {
      id: "ekonomi",
      title: "SEKTOR EKONOMI LOKAL DAN KELEMBAGAAN DESA",
      description:
        "PERAN BUMDES DAN UMKM DESA DALAM MENDISTRIBUSIKAN HASIL BUMI SERTA MEMAJUKAN KESEJAHTERAAN MASYARAKAT SECARA MANDIRI DAN INKLUSIF.",
      images: ["/assets/hero.png", "/assets/potensi_wisata.png", "/assets/sawah.jpg"],
      thumbLabel: "Sektor Ekonomi Lokal dan Kelembagaan Desa",
      thumbImg: "/assets/ipang.png",
    },
  ];

  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activeSector = potensiSectors[activeSectorIndex];

  const handleSectorChange = (index) => {
    setActiveSectorIndex(index);
    setCurrentImageIndex(0); // Reset carousel image index to first photo
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % activeSector.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeSector.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full">
      {/* ================= SECTION 3: SEKILAS PROFIL DESA ================= */}
      <section id="profil-desa" className="w-full bg-[#0A4532] text-white py-12 lg:py-16 overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: POTENSI DESA WITH DYNAMIC BACKGROUND & LINEAR GRADIENT ================= */}
      <section id="potensi-desa" className="relative w-full py-16 sm:py-24 text-white overflow-hidden bg-[#0A4532]">
        
        {/* Dynamic Background Image changing with active card photo */}
        <div className="absolute inset-0 z-0">
          {potensiSectors.map((sector, idx) => (
            <div
              key={sector.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: activeSectorIndex === idx ? 1 : 0 }}
            >
              <Image
                src={sector.images[currentImageIndex]}
                alt={sector.title}
                fill
                className="object-cover object-center"
              />
            </div>
          ))}

          {/* Linear Gradient Overlay: Solid #0A4532 on left (opacity 100%), fading to transparent on right (opacity 0%) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A4532] via-[#0A4532]/75 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row: Title Left, CTA Right */}
          <div
            data-aos="fade-up"
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <h3 className="font-inter text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-[#FFE7D2] uppercase">
                POTENSI DESA
              </h3>
              <div className="w-32 sm:w-44 h-1 bg-[#FFE7D2] rounded-full" />
            </div>

            <a
              href="#potensi-desa"
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
              className="lg:col-span-5 relative group"
            >
              <div className="relative w-full h-[280px] sm:h-[340px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
                {activeSector.images.map((src, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 transition-all duration-500 ease-in-out"
                    style={{
                      opacity: currentImageIndex === idx ? 1 : 0,
                      zIndex: currentImageIndex === idx ? 1 : 0,
                    }}
                  >
                    <Image
                      src={src}
                      alt={activeSector.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                ))}

                {/* Carousel Navigation Controls */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next Image"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dot Indicators at Bottom Center of Card */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  {activeSector.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentImageIndex === idx
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
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
                  
                  <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed tracking-wide uppercase drop-shadow">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom 5 Sector Cards Selector */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4"
          >
            {potensiSectors.map((sector, index) => {
              const isActive = activeSectorIndex === index;
              return (
                <button
                  key={sector.id}
                  onClick={() => handleSectorChange(index)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 bg-white text-slate-900 shadow-xl border-2 ${
                    isActive
                      ? "ring-4 ring-[#FFE7D2] border-[#0A4532] scale-[1.03]"
                      : "border-transparent opacity-95 hover:opacity-100 hover:scale-[1.01]"
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#0A4532]">
                    <Image
                      src={sector.thumbImg}
                      alt={sector.thumbLabel}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-bold leading-tight text-slate-900 line-clamp-3">
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
