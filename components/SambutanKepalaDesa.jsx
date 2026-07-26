"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SambutanKepalaDesa() {
  return (
    <section id="sambutan" className="py-16 sm:py-24 bg-white text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/60"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Photo Card with Arch Header */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-t-full rounded-b-3xl bg-[#0A4532] overflow-hidden p-3 shadow-lg group">
                <div className="relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden">
                  <Image
                    src="/assets/ipang.png"
                    alt="Kepala Desa Jadikarya - Bapak Maulana Syahputra"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Name & Title Label Below Photo */}
              <div className="mt-4 space-y-0.5">
                <h4 className="font-bold text-slate-900 text-lg sm:text-xl">
                  Kepala Desa Jadikarya
                </h4>
                <p className="text-slate-600 font-medium text-sm sm:text-base">
                  Bapak Maulana Syahputra
                </p>
              </div>
            </div>

            {/* Right Column: Greeting Text */}
            <div className="md:col-span-7 space-y-4">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 leading-snug">
                Sambutan Kepala Desa Jadikarya
              </h2>
              
              <div className="w-16 h-1 bg-[#0A4532] rounded-full my-2" />

              <p className="text-slate-700 italic text-base sm:text-lg leading-relaxed pt-2 font-serif">
                “Desa Jadikarya merupakan desa agraris di Kecamatan Langkaplancar, Kabupaten Pangandaran, yang dikenal sebagai penghasil gula aren, gula kelapa, durian, dan manggis. Ganti kalimat ini dengan deskripsi resmi dari perangkat desa.”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
