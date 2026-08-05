import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CarouselImage({ src, alt, isActive }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="absolute inset-0 transition-all duration-500 ease-in-out"
      style={{
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 1 : 0,
      }}
    >
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-[#0A4532]/50 text-white/60 text-sm">
          Gambar tidak tersedia
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          onError={() => setHasError(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </div>
  );
}

export default function PotensiCarousel({ images, alt, href }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-[280px] sm:h-[340px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
      {images.map((src, idx) => (
        <CarouselImage
          key={`${src}-${idx}`}
          src={src}
          alt={alt}
          isActive={currentIndex === idx}
        />
      ))}

      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-110 z-10"
        aria-label="Gambar sebelumnya"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-110 z-10"
        aria-label="Gambar berikutnya"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === idx
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {href && (
        <>
          {/* Full overlay clickable area */}
          <Link href={href} className="absolute inset-0 z-[5]" aria-label={`Lihat detail ${alt}`} />
          {/* Small “Lihat Detail” pill for explicit call‑to‑action */}
          <Link
            href={href}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFE7D2] text-[#0A4532] text-xs font-bold shadow-lg hover:bg-white transition-colors"
          >
            Lihat Detail <ArrowUpRight size={15} />
          </Link>
        </>
      )}
    </div>
  );
}
