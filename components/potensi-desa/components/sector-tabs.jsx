export default function SectorTabs({ sectors, activeIndex, onChange }) {
  return (
    <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {sectors.map((sector, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={sector.id}
                onClick={() => onChange(index)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-[#0A4532] text-white shadow-lg shadow-[#0A4532]/20 scale-[1.02]"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-[#0A4532]/30 hover:text-[#0A4532] hover:shadow-md"
                }`}
              >
                {sector.title.replace("Sektor ", "")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
