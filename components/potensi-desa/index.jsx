"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { potensiDesaData } from "./data/potensi-desa";
import SectorTabs from "./components/sector-tabs";
import SectorDetail from "./components/sector-detail";

export default function PotensiDesaPage({ initialSector }) {
  const initialIndex = potensiDesaData.findIndex(
    (s) => s.id === initialSector
  );
  const [activeIndex, setActiveIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );

  const activeSector = potensiDesaData[activeIndex];

  const handleSectorChange = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <main className="min-h-screen bg-white selection:bg-[#0A4532] selection:text-[#FFE7D2]">
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={activeSector.heroImage}
            alt={`Pemandangan ${activeSector.title}`}
            fill
            priority
            sizes="(max-width: 768px) 150vw, 100vw"
            quality={90}
            className="object-cover object-center"
          />
          {/* Dark overlay with low opacity to dim the background image */}
          <div className="absolute inset-0 bg-[#041a12]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 lg:h-56 bg-gradient-to-t from-[#0A4532] via-[#0A4532]/50 to-transparent z-[3] pointer-events-none" />

        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h1
              className="font-inter font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-lg leading-tight mb-4"
            >
              Potensi <br /> Desa <span className="text-yellow-500">Jadikarya</span>
            </h1>
            <p
              className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {activeSector.subtitle} — Desa Jadikarya, Kecamatan Langkaplancar, Kabupaten Pangandaran
            </p>
          </div>
        </div>
      </section>

      {/* Sector Tabs Navigation */}
      <SectorTabs
        sectors={potensiDesaData}
        activeIndex={activeIndex}
        onChange={handleSectorChange}
      />

      {/* Content Sections */}
      <div className="relative">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#F8FAF8] via-white to-[#E8F0EC]" />
        {/* Subtle decorative grid background overlay */}
        <div className="absolute inset-0 -z-10 bg-village-grid-light opacity-75 pointer-events-none select-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12 space-y-8">
          {potensiDesaData.map((sector, index) => (
            <section key={sector.id} id={sector.id}>
              <SectorDetail
                sector={sector}
                sectorIndex={index}
                isActive={activeIndex === index}
              />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}