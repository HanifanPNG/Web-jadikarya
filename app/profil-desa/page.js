import Navbar from "@/components/navbar";
import ProfilDesaPage from "@/components/profil-desa";
import PemerintahDanKontak from "@/components/footer.tsx";

export const metadata = {
  title: "Profil Desa Jadikarya - Langkaplancar, Pangandaran",
  description:
    "Profil lengkap Desa Jadikarya meliputi struktur perangkat desa, visi misi, lembaga desa, dan statistik kependudukan. Kecamatan Langkaplancar, Kabupaten Pangandaran, Jawa Barat.",
  keywords: [
    "Profil Desa Jadikarya",
    "Perangkat Desa",
    "Visi Misi",
    "Lembaga Desa",
    "Statistik Desa",
    "Langkaplancar",
    "Pangandaran",
  ],
};

export default function ProfilDesaRoute() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#0A4532] selection:text-[#FFE7D2]">
      {/* Sticky Glassmorphism Navbar */}
      <Navbar />

      {/* Profil Desa — 4 Sections */}
      <ProfilDesaPage />

      {/* Footer / Kontak */}
      <PemerintahDanKontak />
    </main>
  );
}
