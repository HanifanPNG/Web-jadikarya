import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import SambutanKepalaDesa from "@/components/sambutan-kepala-desa";
import ProfilDanPotensiDesa from "@/components/profil-dan-potensi-desa";
import AgendaRutinan from "@/components/agenda-rutinan";
import PemerintahDanKontak from "@/components/footer.tsx";

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
