import Navbar from "@/components/navbar";
import PotensiDesaPage from "@/components/potensi-desa";
import PemerintahDanKontak from "@/components/pemerintah-dan-kontak";

export const metadata = {
  title: "Potensi Desa Jadikarya - Langkaplancar, Pangandaran",
  description:
    "Potensi lengkap Desa Jadikarya meliputi sektor agroforestik, gudang buah, persawahan, UMKM, pendidikan, kesehatan, dan layanan publik. Kecamatan Langkaplancar, Kabupaten Pangandaran, Jawa Barat.",
  keywords: [
    "Potensi Desa Jadikarya",
    "Agroforestik",
    "Gudang Buah",
    "Persawahan",
    "UMKM",
    "Pendidikan",
    "Kesehatan",
    "Layanan Publik",
    "Langkaplancar",
    "Pangandaran",
  ],
};

export default function PotensiDesaRoute({ searchParams }) {
  return (
    <main className="min-h-screen bg-white selection:bg-[#0A4532] selection:text-[#FFE7D2]">
      {/* Sticky Glassmorphism Navbar */}
      <Navbar />

      {/* Potensi Desa Page */}
      <PotensiDesaPage initialSector={searchParams?.sektor} />

      {/* Footer / Kontak */}
      <PemerintahDanKontak />
    </main>
  );
}