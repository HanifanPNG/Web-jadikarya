import { Dialog } from "@headlessui/react";
import {
  X,
  Calendar,
  Users,
  UserCircle,
  Target,
  Lightbulb,
} from "lucide-react";

export default function LembagaModal({ isOpen, onClose, lembaga }) {
  if (!lembaga) return null;

  const { nama, singkatan, icon: Icon, details } = lembaga;
  const { since, established, members, chairman, fullDescription, activities, vision } = details || {};

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-6xl rounded-2xl bg-white shadow-2xl border border-slate-100 transform transition-all max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white rounded-t-2xl border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0A4532]/10 flex items-center justify-center">
                {Icon && <Icon size={24} className="text-[#0A4532]" />}
              </div>
              <div>
                <Dialog.Title className="text-xl sm:text-2xl font-bold text-[#0A4532] leading-tight">
                  {nama}
                </Dialog.Title>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {singkatan}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body - Two column layout */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
              {/* Left Column - Main Content */}
              <div className="space-y-6">
                {/* Established */}
                {established && (
                  <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Lightbulb size={14} />
                      Pendirian
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {established}
                    </p>
                  </div>
                )}

                {/* Full Description */}
                {fullDescription && (
                  <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed">
                    {fullDescription}
                  </div>
                )}

                {/* Activities */}
                {activities && activities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#0A4532] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Target size={16} />
                      Kegiatan Utama
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activities.map((act, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-xl bg-[#0A4532]/5 border border-[#0A4532]/10 px-4 py-3"
                        >
                          <span className="w-6 h-6 rounded-full bg-[#0A4532] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-sm text-slate-700 leading-relaxed">
                            {act}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vision */}
                {vision && (
                  <div className="rounded-xl bg-gradient-to-br from-[#0A4532]/5 to-white border border-[#0A4532]/15 p-4">
                    <div className="flex items-start gap-3">
                      <Target size={20} className="text-[#0A4532] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-[#0A4532] uppercase tracking-wider mb-1">
                          Visi
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed italic">
                          &ldquo;{vision}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-4">
                  {/* Institution Card */}
                  <div className="rounded-xl bg-gradient-to-br from-[#0A4532] via-[#0E5A42] to-emerald-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.1),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,0.08),transparent_30%)]" />
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
                        {Icon && <Icon size={32} />}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{nama}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">{singkatan}</p>
                      <div className="space-y-2 text-sm">
                        {since && (
                          <div className="flex items-center gap-2 text-white/80">
                            <Calendar size={16} />
                            <span>Berdiri: {since}</span>
                          </div>
                        )}
                        {members && (
                          <div className="flex items-center gap-2 text-white/80">
                            <Users size={16} />
                            <span>{members}</span>
                          </div>
                        )}
                        {chairman && (
                          <div className="flex items-center gap-2 text-white/80">
                            <UserCircle size={16} />
                            <span>Ketua: {chairman}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}