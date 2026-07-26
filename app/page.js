import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SambutanKepalaDesa from "@/components/SambutanKepalaDesa";
import ProfilDanPotensiDesa from "@/components/ProfilDanPotensiDesa";
import AgendaRutinan from "@/components/AgendaRutinan";
import PemerintahDanKontak from "@/components/PemerintahDanKontak";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#0A4532] selection:text-[#FFE7D2]">
      {/* Sticky Glassmorphism Header */}
      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Sambutan Kepala Desa */}
      <SambutanKepalaDesa />

      {/* 3. Sekilas Profil Desa & Potensi Desa */}
      <ProfilDanPotensiDesa />

      {/* 4. Agenda Rutinan Desa */}
      <AgendaRutinan />

      {/* 5. Pemerintah Desa & Map Footer */}
      <PemerintahDanKontak />
    </main>
  );
}
