"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AgendaRutinan() {
  // Agenda Items list
  const agendaList = [
    {
      id: 1,
      title: "Musyawarah Desa",
      description: "Pembahasan program kerja, pembangunan, dan aspirasi masyarakat.",
      image: "/assets/agenda_musyawarah.png",
    },
    {
      id: 2,
      title: "Pengajian Ibu Ibu",
      description: "Kegiatan keagamaan bagi masyarakat.",
      image: "/assets/potensi_wisata.png",
    },
    {
      id: 3,
      title: "Gotong Royong Desa",
      description: "Kerja bakti pembersihan lingkungan dan fasilitas umum desa.",
      image: "/assets/sawah.jpg",
    },
    {
      id: 4,
      title: "Posyandu & Kesehatan",
      description: "Pemeriksaan kesehatan rutin balita dan lansia Desa Jadikarya.",
      image: "/assets/hero.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 2;
  const totalSlides = Math.ceil(agendaList.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section id="agenda" className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-[#F4F7F5] text-slate-800 overflow-hidden">
      {/* Subtle decorative grid background pattern */}
      <div className="absolute inset-0 bg-village-grid-light opacity-85 pointer-events-none select-none" />

      {/* Soft blurred decorative accents for depth and color interest */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0A4532]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none select-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFE7D2]/25 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none select-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Centered Header Title */}
        <div className="text-center space-y-2" data-aos="fade-up">
          <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">
            AGENDA RUTINAN DESA
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
        </div>

        {/* Outer White Card Container matching Screenshot */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden space-y-8" data-aos="fade-up" data-aos-delay="100">
          
          {/* Top Decorative Green Accent Bar */}
          <div className="absolute top-0 left-6 right-6 h-1 bg-[#0A4532] rounded-b-full" />

          {/* Sliding Track Viewport */}
          <div className="relative overflow-hidden w-full py-2">
            
            {/* Smooth Horizontal Track */}
            <div
              className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const slideItems = agendaList.slice(
                  slideIndex * itemsPerPage,
                  slideIndex * itemsPerPage + itemsPerPage
                );

                return (
                  <div
                    key={slideIndex}
                    className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-1"
                  >
                    {slideItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative group rounded-3xl overflow-hidden h-[300px] sm:h-[360px] shadow-lg border border-slate-100 flex items-end cursor-pointer"
                      >
                        {/* Background Photo */}
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        {/* Text Overlay Bottom-Left */}
                        <div className="relative z-10 p-6 sm:p-8 space-y-2 text-white">
                          <h3 className="font-bold text-2xl sm:text-3xl font-inter text-white group-hover:text-[#FFE7D2] transition-colors leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed max-w-md">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Carousel Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0A4532] shadow-xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 border border-slate-200"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0A4532] shadow-xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 border border-slate-200"
              aria-label="Next Slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Center Indicator Bar */}
          <div className="flex justify-center items-center gap-2 pt-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx
                    ? "w-10 bg-[#0A4532]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
