import "./globals.css";
import AOSInit from "@/components/AOSInit";

export const metadata = {
  title: "Desa Jadikarya - Kecamatan Langkaplancar, Kabupaten Pangandaran",
  description:
    "Website Resmi Desa Jadikarya, Kecamatan Langkaplancar, Kabupaten Pangandaran, Jawa Barat. Desa agraris penghasil gula aren, gula kelapa, durian, dan manggis.",
  keywords: ["Desa Jadikarya", "Langkaplancar", "Pangandaran", "Gula Aren", "Jawa Barat"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased bg-white text-slate-800 min-h-screen">
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
