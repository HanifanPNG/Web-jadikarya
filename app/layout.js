import "./globals.css";
import AOSInit from "@/components/aos-init";
import { Inter, Playfair_Display, Plus_Jakarta_Sans, Lobster } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lobster",
  display: "swap",
});

export const metadata = {
  title: "Desa Jadikarya - Kecamatan Langkaplancar, Kabupaten Pangandaran",
  description:
    "Website Resmi Desa Jadikarya, Kecamatan Langkaplancar, Kabupaten Pangandaran, Jawa Barat. Desa agraris penghasil gula aren, gula kelapa, durian, dan manggis.",
  keywords: ["Desa Jadikarya", "Langkaplancar", "Pangandaran", "Gula Aren", "Jawa Barat"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable} ${plusJakartaSans.variable} ${lobster.variable}`}>
      <body className="antialiased bg-white text-slate-800 min-h-screen">
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
