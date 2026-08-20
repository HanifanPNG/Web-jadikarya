"use client";

import { useState } from "react";
import { SectionShell } from "./components/section-shell";
import LembagaModal from "./components/lembaga-modal";
import { lembagaDesa } from "./data/lembaga-desa";

function mergeDynamic(lembaga, dynamicMap = {}) {
  const dyn = dynamicMap[lembaga.id];
  return {
    ...lembaga,
    details: {
      ...(lembaga.details || {}),
      members: dyn?.members || lembaga.details?.members || "",
      chairman: dyn?.chairman || lembaga.details?.chairman || "",
    },
  };
}

export default function LembagaSection({ dynamicMap = {} }) {
  const [hoveredLembaga, setHoveredLembaga] = useState(null);
  const [selectedLembaga, setSelectedLembaga] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedLembaga(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLembaga(null);
  };

  return (
    <>
      <section id="lembaga-desa">
        <SectionShell>
          <div data-aos="fade-up" className="text-center space-y-2 mb-12">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl text-[#0A4532] tracking-widest uppercase">
              Lembaga Desa
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
          </div>

          {lembagaDesa.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 py-16 text-center text-slate-500 text-sm">
              Belum ada data lembaga.
            </div>
          ) : (
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            >
              {lembagaDesa.map((item) => {
                const lembaga = mergeDynamic(item, dynamicMap);
                const Icon = lembaga.icon;
                const isHovered = hoveredLembaga === lembaga.id;
                return (
                  <div
                    key={lembaga.id}
                    onMouseEnter={() => setHoveredLembaga(lembaga.id)}
                    onMouseLeave={() => setHoveredLembaga(null)}
                    onClick={() => openModal(lembaga)}
                    className={`rounded-xl border bg-white/70 backdrop-blur-md p-5 transition-all duration-200 cursor-pointer shadow-lg shadow-black/5 ${
                      isHovered
                        ? "border-[#0A4532]/30 -translate-y-0.5 shadow-xl shadow-black/10"
                        : "border-white/30 hover:border-[#0A4532]/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          isHovered
                            ? "bg-[#0A4532] text-white shadow-md"
                            : "bg-[#0A4532]/10 text-[#0A4532] backdrop-blur-sm"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {lembaga.singkatan}
                        </span>
                        <h3
                          className={`font-inter font-bold text-sm leading-tight mt-0.5 mb-1.5 transition-colors ${
                            isHovered ? "text-[#0A4532]" : "text-slate-900"
                          }`}
                        >
                          {lembaga.nama}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                          {lembaga.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SectionShell>
      </section>

      <LembagaModal isOpen={isModalOpen} onClose={closeModal} lembaga={selectedLembaga} />
    </>
  );
}