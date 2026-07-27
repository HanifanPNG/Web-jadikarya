"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Target } from "lucide-react";
import { tentangDesa } from "./data/tentang-desa";
import { strukturDesa, grupTema } from "./data/struktur-desa";
import { lembagaDesa } from "./data/lembaga-desa";
import { statistikDesa } from "./data/statistik-desa";
import { GlassCard } from "./components/glass-card";
import { SectionShell } from "./components/section-shell";
import { PersonCard } from "./components/person-card";
import { GroupCard } from "./components/group-card";

export default function ProfilDesaPage() {
  const [hoveredLembaga, setHoveredLembaga] = useState(null);

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO BANNER — same as landing page
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero.png"
            alt="Pemandangan Desa Jadikarya"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 lg:h-56 bg-gradient-to-t from-[#0A4532] via-[#0A4532]/60 to-transparent z-[5] pointer-events-none" />

        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

            {/* ─── LEFT COLUMN (sticky) ─── */}
            <div className="lg:sticky lg:top-[100px] self-start text-center lg:text-left">
              <h1
                data-aos="fade-up"
                className="font-inter font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-lg leading-tight mb-4"
              >
                Profil <br /> Desa Jadikarya
              </h1>
              <p
                data-aos="fade-up"
                data-aos-delay="50"
                className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Mengenal lebih dekat Desa Jadikarya, visi misi, kelembagaan, dan
                data statistik Desa Jadikarya — Kecamatan Langkaplancar, Kabupaten
                Pangandaran.
              </p>
            </div>

            {/* ─── RIGHT COLUMN (scrollable note cards) ─── */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto space-y-4 lg:pr-1 scrollbar-note"
            >
              {tentangDesa.cards.map((card, i) => {
                const Icon = card.icon;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div
                    key={i}
                    className="relative rounded-xl border border-white/20 bg-white/15 backdrop-blur-lg p-5 sm:p-6 shadow-lg shadow-black/10 overflow-hidden"
                  >
                    <span className="absolute top-2 right-3 font-inter font-black text-5xl sm:text-6xl text-white/5 select-none leading-none">
                      {num}
                    </span>
                    <div className="flex items-start gap-3 mb-3 relative z-10">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center backdrop-blur-sm">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-inter font-bold text-sm sm:text-base text-white pt-1.5 drop-shadow-sm">
                        {card.label}
                      </h3>
                    </div>
                    <ul className="space-y-1.5 relative z-10">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-white/80 text-xs sm:text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTENT SECTIONS
      ══════════════════════════════════════════════════ */}
      <div className="relative">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#F8FAF8] via-white to-[#E8F0EC]" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-10 sm:space-y-12">

          {/* ══════════════════════════════════════════════════
              SECTION 1 — VISI & MISI
          ══════════════════════════════════════════════════ */}
          <section id="visi-misi">
            <SectionShell>
              <div data-aos="fade-up" className="text-center space-y-2 mb-12">
                <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">
                  Visi &amp; Misi Desa
                </h2>
                <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* VISI */}
                <div
                  data-aos="fade-right"
                  className="rounded-xl border border-[#0A4532]/20 bg-[#0A4532]/80 backdrop-blur-md p-7 sm:p-8 text-white shadow-lg"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFE7D2] mb-5">
                    <Star size={12} />
                    Visi
                  </div>
                  <div className="text-white/10 font-serif text-7xl leading-none select-none -mb-6">
                    &ldquo;
                  </div>
                  <blockquote className="relative font-serif text-xl sm:text-2xl font-bold leading-snug text-white">
                    Terwujudnya Desa Jadikarya yang Maju, Mandiri, dan Sejahtera
                    Berbasis Potensi Lokal.
                  </blockquote>
                  <div className="w-12 h-0.5 bg-white/20 rounded-full mt-5" />
                </div>

                {/* MISI */}
                <GlassCard data-aos="fade-left" className="p-7 sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#0A4532]/15 bg-[#0A4532]/5 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0A4532] mb-5">
                    <Target size={12} />
                    Misi
                  </div>
                  <ol className="space-y-3">
                    {[
                      "Meningkatkan kualitas pelayanan publik yang transparan, akuntabel, dan profesional.",
                      "Mengembangkan potensi pertanian, perkebunan, dan kehutanan secara berkelanjutan.",
                      "Memberdayakan masyarakat melalui program ekonomi kreatif, UMKM, dan BUMDes.",
                      "Meningkatkan kualitas infrastruktur dasar desa yang merata dan berkeadilan.",
                      "Mendorong partisipasi aktif masyarakat dalam musyawarah dan pembangunan desa.",
                      "Melestarikan nilai budaya dan kearifan lokal desa sebagai identitas bangsa.",
                    ].map((misi, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A4532] text-white text-xs font-bold flex items-center justify-center mt-0.5 shadow-md">
                          {i + 1}
                        </span>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {misi}
                        </p>
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </div>
            </SectionShell>
          </section>

          {/* ══════════════════════════════════════════════════
              SECTION 2 — STRUKTUR PERANGKAT DESA
          ══════════════════════════════════════════════════ */}
          <section id="struktur-perangkat">
            <SectionShell className="!bg-white/88 !backdrop-blur-sm">
              <div
                data-aos="fade-up"
                className="text-center space-y-2 mb-8"
              >
                <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">
                  Struktur Perangkat Desa
                </h2>
                <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="50"
                className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50/70 to-[#0A4532]/[0.04] p-4 shadow-[0_20px_44px_-28px_rgba(15,23,42,0.45)] sm:p-7"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(10,69,50,0.07),transparent_24%),radial-gradient(circle_at_86%_84%,rgba(212,175,55,0.08),transparent_20%)]" />
                <div className="relative rounded-3xl bg-white/88 p-4 sm:p-5">

                  <div className="flex flex-col items-center">
                    {/* Kepala Desa */}
                    <PersonCard
                      jabatan={strukturDesa.top.jabatan}
                      nama={strukturDesa.top.nama}
                      inisial={strukturDesa.top.inisial}
                      foto={strukturDesa.top.foto}
                      variant="primary"
                      accent="from-[#0A4532] via-[#0E5A42] to-emerald-400"
                      www="max-w-[280px]"
                    />

                    <div className="h-6 w-px bg-gradient-to-b from-[#0A4532]/40 to-[#0A4532]/10" />

                    {/* Sekretaris Desa */}
                    <PersonCard
                      jabatan={strukturDesa.sekretaris.jabatan}
                      nama={strukturDesa.sekretaris.nama}
                      inisial={strukturDesa.sekretaris.inisial}
                      foto={strukturDesa.sekretaris.foto}
                      variant="default"
                      accent="from-slate-400 via-slate-300 to-slate-200"
                      www="max-w-[230px]"
                    />

                    <div className="h-6 w-px bg-gradient-to-b from-[#0A4532]/15 to-transparent" />

                    {/* Group Kaur */}
                    <div className="w-full">
                      <GroupCard tema={grupTema.kaur}>
                        {strukturDesa.kaur.map((item) => (
                          <PersonCard
                            key={item.id || item.jabatan}
                            jabatan={item.jabatan}
                            nama={item.nama}
                            inisial={item.inisial}
                            foto={item.foto}
                            variant="default"
                            accent={grupTema.kaur.bar}
                            www="max-w-full"
                          />
                        ))}
                      </GroupCard>
                    </div>

                    <div className="h-6 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />

                    {/* Group Kasi */}
                    <div className="w-full">
                      <GroupCard tema={grupTema.kasi}>
                        {strukturDesa.kasi.map((item) => (
                          <PersonCard
                            key={item.id || item.jabatan}
                            jabatan={item.jabatan}
                            nama={item.nama}
                            inisial={item.inisial}
                            foto={item.foto}
                            variant="default"
                            accent={grupTema.kasi.bar}
                            www="max-w-full"
                          />
                        ))}
                      </GroupCard>
                    </div>

                    <div className="h-6 w-px bg-gradient-to-b from-amber-300/60 to-transparent" />

                    {/* Group Kadus */}
                    <div className="w-full">
                      <GroupCard tema={grupTema.kadus}>
                        {strukturDesa.kadus.map((item) => (
                          <PersonCard
                            key={item.id || item.jabatan}
                            jabatan={item.jabatan}
                            nama={item.nama}
                            inisial={item.inisial}
                            foto={item.foto}
                            variant="default"
                            accent={grupTema.kadus.bar}
                            www="max-w-full"
                          />
                        ))}
                      </GroupCard>
                    </div>
                  </div>
                </div>
              </div>
            </SectionShell>
          </section>

          {/* ══════════════════════════════════════════════════
              SECTION 3 — LEMBAGA DESA
          ══════════════════════════════════════════════════ */}
          <section id="lembaga-desa">
            <SectionShell>
              <div data-aos="fade-up" className="text-center space-y-2 mb-12">
                <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">
                  Lembaga Desa
                </h2>
                <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="50"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
              >
                {lembagaDesa.map((lembaga) => {
                  const Icon = lembaga.icon;
                  const isHovered = hoveredLembaga === lembaga.id;
                  return (
                    <div
                      key={lembaga.id}
                      onMouseEnter={() => setHoveredLembaga(lembaga.id)}
                      onMouseLeave={() => setHoveredLembaga(null)}
                      className={`rounded-xl border bg-white/70 backdrop-blur-md p-5 transition-all duration-200 cursor-default shadow-lg shadow-black/5 ${
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
            </SectionShell>
          </section>

          {/* ══════════════════════════════════════════════════
              SECTION 4 — STATISTIK DESA
          ══════════════════════════════════════════════════ */}
          <section id="statistik-desa">
            <SectionShell>
              <div data-aos="fade-up" className="text-center space-y-2 mb-12">
                <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A4532] tracking-widest uppercase">
                  Statistik Desa
                </h2>
                <div className="w-24 sm:w-32 h-1 bg-[#0A4532] mx-auto rounded-full" />
                <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
                  Data kependudukan dan administratif Desa Jadikarya yang diperbarui
                  secara berkala oleh pemerintah desa.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="50"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
              >
                {statistikDesa.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <GlassCard key={i} className="p-6 sm:p-7">
                      <div className="w-12 h-12 rounded-xl bg-[#0A4532]/90 backdrop-blur-sm flex items-center justify-center mb-5 shadow-lg">
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="font-inter font-black text-4xl sm:text-5xl text-[#0A4532] leading-none mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs font-bold text-[#0A4532]/30 tracking-widest uppercase mb-3">
                        {stat.satuan}
                      </div>
                      <div className="border-t border-white/30 pt-3">
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">
                          {stat.label}
                        </p>
                        <p className="text-slate-400 text-xs mt-0.5">{stat.desc}</p>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </SectionShell>
          </section>

        </div>
      </div>
    </>
  );
}
