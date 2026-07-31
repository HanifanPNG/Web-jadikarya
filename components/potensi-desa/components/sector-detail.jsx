import PlaceholderImage from "./placeholder-image";

const PLACEHOLDER_COUNT = 6;

export default function SectorDetail({ sector, sectorIndex, isActive }) {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      {/* Gallery Grid */}
      <div
        data-aos="fade-up"
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-12"
      >
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
          <div
            key={i}
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer ${
              i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
          >
            <PlaceholderImage
              label={sector.title}
              color={sector.color}
              index={i}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
          </div>
        ))}
      </div>

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
          {sector.id === "pertanian" ? "Komoditas Unggulan" :
           sector.id === "wisata" ? "Potensi Wisata" :
           sector.id === "peternakan" ? "Komoditas Peternakan" :
           sector.id === "kehutanan" ? "Produk Unggulan" :
           "Penggerak Ekonomi Desa"}
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

      {/* Highlights Cards */}
      <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {sector.highlights.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {item.label}
            </span>
            <p className="font-inter font-bold text-base sm:text-lg text-[#0A4532] mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
