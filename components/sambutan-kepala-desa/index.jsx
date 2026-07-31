import React from "react";

export default function App() {
  return (
    <section
      id="sambutan"
      className="relative py-16 bg-[#F8FAF8] text-slate-800 overflow-hidden min-h-screen flex items-center"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {}
      {/* Subtle decorative grid background pattern */}
      <div className="absolute inset-0 bg-village-grid-light opacity-85 pointer-events-none select-none" />

      {/* Top-left decorative accent */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#042F1E]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      {/* Bottom-right decorative accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#042F1E]/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

      {}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        
        <div
          data-aos="fade-up"
          className="text-center mb-14 sm:mb-16"
        >
            <div className="flex flex-col items-center space-y-1">
              <h3 className="font-inter text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-[#042F1E] uppercase">
                SAMBUTAN KEPALA DESA
              </h3>
              <div className="w-32 sm:w-44 h-1 bg-[#042F1E] rounded-full" />
            </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="md:col-span-5 flex flex-col items-center justify-center text-center"
          >
            {/* Photo Frame with decorative border */}
            <div className="relative group">
              {/* Soft glow behind photo */}
              <div className="absolute -inset-4 bg-[#042F1E]/5 rounded-t-full rounded-b-3xl blur-xl transition-all duration-500 group-hover:bg-[#042F1E]/10" />

              {/* Decorative border ring - changed to elegant dark gradient */}
              <div className="relative w-64 h-[330px] sm:w-68 sm:h-[360px] lg:w-[300px] lg:h-[400px] rounded-t-full rounded-b-3xl p-[3px] bg-gradient-to-b from-[#042F1E]/40 via-[#042F1E]/10 to-[#042F1E]/30 shadow-2xl shadow-[#042F1E]/10">
                <div className="relative w-full h-full rounded-t-full rounded-b-[21px] overflow-hidden bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Kepala Desa Jadikarya - Bapak Maulana Syahputra"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Bottom gradient overlay for polish - blends with light bg */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAF8] to-transparent opacity-90" />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-1.5">
              <h4 className="font-inter font-bold text-[#042F1E] text-xl sm:text-2xl tracking-wide">
                Bapak Maulana Syahputra
              </h4>
              <p className="text-slate-500 font-semibold text-sm sm:text-base tracking-widest uppercase">
                Kepala Desa Jadikarya
              </p>
            </div>
          </div>

          {}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="md:col-span-7 space-y-6"
          >
            {/* Large decorative quote mark */}
            <div className="text-[#042F1E]/10 font-inter text-8xl sm:text-9xl leading-none select-none -mb-10 sm:-mb-14">
              &ldquo;
            </div>

            {/* Quote Text */}
            <blockquote className="relative z-10 pl-2 sm:pl-4">
              <p className="text-slate-700 italic text-lg sm:text-xl lg:text-2xl leading-relaxed font-inter tracking-wide drop-shadow-sm">
                Desa Jadikarya merupakan desa agraris di Kecamatan
                Langkaplancar, Kabupaten Pangandaran, yang dikenal sebagai
                penghasil gula aren, gula kelapa, durian, dan manggis. Ganti
                kalimat ini dengan deskripsi resmi dari perangkat desa untuk memberikan gambaran yang lebih komprehensif mengenai visi dan misi kita ke depan.
              </p>
            </blockquote>

            {/* Closing quote mark */}
            <div className="text-[#042F1E]/10 font-inter text-8xl sm:text-9xl leading-none select-none text-right -mt-8 sm:-mt-12">
              &rdquo;
            </div>

            <div className="pl-2 sm:pl-4">
              {/* Decorative line */}
              <div className="flex items-center gap-3 pt-2 mb-4">
                <div className="w-16 h-[2px] bg-[#042F1E]/30 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-[#042F1E]" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
