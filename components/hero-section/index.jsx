import { MessageSquare } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/persawahan/hero.png"
          alt="Pemandangan Desa Jadikarya"
          fill
          priority
          sizes="(max-width: 768px) 150vw, 100vw"
          quality={90}
          className="object-cover object-center"
        />
        {/* Dark overlay with low opacity to dim the background image */}
        <div className="absolute inset-0 bg-[#041a12]/60" />
        {/* Top subtle dark vignette for navbar legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
      </div>

      {/* Professional Gradient Fade from Bottom to Top (Green, transitions into next section) */}
      <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 lg:h-56 bg-gradient-to-t from-[#0A4532] via-[#0A4532]/60 to-transparent z-[5] pointer-events-none" />

      {/* Hero Content Container with wide padding */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 text-white">
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="max-w-3xl space-y-5"
        >
          {/* Plain Text Location Sub-header */}
          <h3 className="font-semibold text-sm sm:text-base text-white tracking-wide drop-shadow-md">
            Langkaplancar - Pangandaran - Jawa Barat
          </h3>

          {/* Main Serif Headline */}
          <h1 className="font-inter font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-lg leading-tight">
            Desa <span className="text-yellow-500">Jadikarya</span>
          </h1>

          {/* Description Text matching Screenshot */}
          <p className="text-white/95 text-sm sm:text-base md:text-lg font-normal leading-relaxed drop-shadow-md max-w-2xl">
            Selamat datang di Website Desa Jadikarya. Temukan informasi,potensi, serta berbagai kegiatan Desa yang mendukung kemajuan dan kesejahteraan masyarakat.
          </p>

          {/* Horizontal Divider Line */}
          <div className="w-full max-w-xl h-[1px] bg-white/40 my-6" />

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#profil-desa"
              className="px-8 py-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white font-medium text-sm sm:text-base transition-all hover:scale-105 shadow-lg"
            >
              Profil Desa
            </a>
            <a
              href="#potensi-desa"
              className="px-8 py-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white font-medium text-sm sm:text-base transition-all hover:scale-105 shadow-lg"
            >
              Lihat Peta Potensi
            </a>
          </div>
        </div>
      </div>

      {/* Floating Green WhatsApp Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/6282240433797"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#10B981] text-white shadow-2xl hover:scale-110 transition-transform"
          aria-label="Hubungi Desa Jadikarya"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
          <MessageSquare size={26} className="text-white fill-white" />
        </a>
      </div>
    </section>
  );
}
