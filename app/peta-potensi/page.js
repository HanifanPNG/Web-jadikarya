import Navbar from "@/components/navbar";
import PetaPotensiPage from "@/components/peta-potensi";
import PemerintahDanKontak from "@/components/pemerintah-dan-kontak";

export const metadata = {
  title: "Peta Potensi Desa Jadikarya - Langkaplancar, Pangandaran",
  description:
    "Peta interaktif berbasis QGIS menampilkan sebaran potensi, tata guna lahan, topografi, dan data spasial Desa Jadikarya, Kecamatan Langkaplancar, Kabupaten Pangandaran, Jawa Barat.",
  keywords: [
    "Peta Desa Jadikarya",
    "GIS",
    "QGIS",
    "Peta Potensi",
    "Spasial",
    "Langkaplancar",
    "Pangandaran",
  ],
};

export default function PetaPotensiRoute() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#0A4532] selection:text-[#FFE7D2]">
      {/* Sticky Glassmorphism Navbar */}
      <Navbar />

      {/* Peta Potensi Page */}
      <PetaPotensiPage />

      {/* Footer / Kontak */}
      <PemerintahDanKontak />
    </main>
  );
}
