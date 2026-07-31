import Navbar from "@/components/navbar";
import PotensiDesaPage from "@/components/potensi-desa";
import PemerintahDanKontak from "@/components/pemerintah-dan-kontak";

export const metadata = {
  title: "Potensi Desa Jadikarya - Langkaplancar, Pangandaran",
  description:
    "Potensi lengkap Desa Jadikarya meliputi sektor pertanian, kehutanan, peternakan, wisata alam, dan ekonomi lokal. Kecamatan Langkaplancar, Kabupaten Pangandaran, Jawa Barat.",
  keywords: [
    "Potensi Desa Jadikarya",
    "Pertanian",
    "Kehutanan",
    "Peternakan",
    "Wisata Alam",
    "Ekonomi Desa",
    "Langkaplancar",
    "Pangandaran",
  ],
};

export default function PotensiDesaRoute() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#0A4532] selection:text-[#FFE7D2]">
      {/* Sticky Glassmorphism Navbar */}
      <Navbar />

      {/* Potensi Desa Page */}
      <PotensiDesaPage />

      {/* Footer / Kontak */}
      <PemerintahDanKontak />
    </main>
  );
}