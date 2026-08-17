import React from "react";
import Image from "next/image";

export default function App() {
  return (
    <section
      id="sambutan"
      className="relative py-16 bg-[#F8FAF8] text-slate-800 overflow-hidden min-h-screen flex items-center"
      style={{ fontFamily: "'var(--font-inter)', sans-serif" }}
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
          className="text-center mb-14"
        >
            <div className="flex flex-col items-center space-y-1">
              <h3 className="font-inter text-2xl sm:text-3xl font-bold tracking-widest text-[#042F1E] uppercase">
                SAMBUTAN KEPALA DESA
              </h3>
              <div className="w-32 sm:w-44 h-1 bg-[#042F1E] rounded-full" />
            </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="md:col-span-3 flex flex-col items-center justify-center text-center"
          >
            {/* Photo Frame with decorative border */}
            <div className="relative group">
              {/* Soft glow behind photo */}
              <div className="absolute -inset-4 bg-[#042F1E]/5 rounded-t-full rounded-b-3xl blur-xl transition-all duration-500 group-hover:bg-[#042F1E]/10" />

              {/* Decorative border ring - changed to elegant dark gradient */}
              <div className="relative w-48 h-[260px] sm:w-56 sm:h-[300px] lg:w-[240px] lg:h-[330px] rounded-t-full rounded-b-3xl p-[3px] bg-gradient-to-b from-[#042F1E]/40 via-[#042F1E]/10 to-[#042F1E]/30 shadow-2xl shadow-[#042F1E]/10">
                <div className="relative w-full h-full rounded-t-full rounded-b-[21px] overflow-hidden bg-slate-200">
                  <Image
                    src="/assets/Foto_%20anggota_desa/Drs.DadangSupriatna,M.Pd.jpeg"
                    alt="Kepala Desa Jadikarya - Drs. Dadang Supratna, M.Pd"
                    fill
                    sizes="(max-width: 768px) 320px, 300px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Bottom gradient overlay for polish - blends with light bg */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAF8] to-transparent opacity-90" />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <h4 className="font-inter font-bold text-[#042F1E] text-xs sm:text-base tracking-wide">
                Drs. Dadang Supratna, M.Pd
              </h4>
              <p className="text-slate-500 font-semibold text-xs sm:text-sm tracking-widest uppercase">
                Kepala Desa Jadikarya
              </p>
            </div>
          </div>

          {}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="md:col-span-9 space-y-6 md:pt-0"
          >
            {/* Large decorative quote mark */}
            <div className="text-[#042F1E]/10 font-inter text-6xl sm:text-7xl leading-none select-none -mb-6 sm:-mb-8">
              &ldquo;
            </div>

            {/* Quote Text */}
            <blockquote className="relative z-10 pl-2 sm:pl-4">
              <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed font-inter tracking-wide text-justify">
                Puji syukur kehadirat Allah SWT atas segala rahmat dan karunia-Nya, sehingga Desa Jadikarya senantiasa diberikan kesehatan, keberkahan, dan kemudahan dalam melaksanakan pembangunan serta pelayanan kepada masyarakat. Desa Jadikarya merupakan bagian dari Kecamatan Langkaplancar, Kabupaten Pangandaran, yang memiliki potensi sumber daya alam, sosial, budaya, serta kehidupan masyarakat yang menjadi kekuatan dalam mendukung pembangunan desa. Pemerintah Desa Jadikarya berkomitmen untuk terus meningkatkan kualitas pelayanan kepada masyarakat, mengembangkan potensi desa, serta mendorong partisipasi aktif seluruh masyarakat dalam menciptakan lingkungan desa yang maju, mandiri, dan harmonis. Kami juga menyambut baik kehadiran mahasiswa Kuliah Kerja Nyata (KKN) Kelompok 142 Universitas Islam Negeri Profesor K.H. Saifuddin Zuhri Purwokerto. Kehadiran mahasiswa KKN diharapkan dapat memberikan kontribusi positif melalui berbagai kegiatan yang bermanfaat bagi masyarakat serta menjadi sarana untuk membangun kerja sama antara perguruan tinggi dan pemerintah desa. Semoga seluruh program dan kegiatan yang dilaksanakan dapat berjalan dengan baik, memberikan manfaat bagi masyarakat Desa Jadikarya, serta meninggalkan pengalaman dan kenangan yang baik bagi seluruh pihak.
              </p>
            </blockquote>

            {/* Closing quote mark */}
            <div className="text-[#042F1E]/10 font-inter text-6xl sm:text-7xl leading-none select-none text-right -mt-4 sm:-mt-6">
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
