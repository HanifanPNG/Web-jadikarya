export default function SectorDetail({ sector, sectorIndex, isActive }) {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      {/* Description */}
      <div data-aos="fade-up" className="max-w-4xl">
        <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] mb-2">
          {sector.title}
        </h2>
        <div className="w-20 h-1 bg-[#0A4532] rounded-full mb-6" />
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
          {sector.description}
        </p>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
          {sector.detailDescription}
        </p>
      </div>

      {/* Commodities / Badges */}
      <div data-aos="fade-up" className="mb-8">
        <h3 className="font-inter font-bold text-lg sm:text-xl text-[#0A4532] mb-4">
          {sector.id === "agroforest" ? "Komoditas Unggulan" :
           sector.id === "gudang-buah" ? "Produk & Komoditas" :
           sector.id === "persawahan" ? "Potensi Wisata" :
           sector.id === "umkm" ? "Komoditas UMKM" :
           sector.id === "pendidikan" ? "Program Unggulan" :
           sector.id === "kesehatan" ? "Layanan Unggulan" :
           "Layanan Masyarakat"}
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {sector.commodities.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A4532]/5 border border-[#0A4532]/15 text-[#0A4532] text-xs sm:text-sm font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-[#0A4532]/40" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
