"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import { updateLembaga } from "@/lib/actions/lembaga";
import { lembagaDesa } from "@/components/profil-desa/data/lembaga-desa";

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4532]/30 focus:border-[#0A4532] transition-shadow";

export default function LembagaManager({ dynamicMap = {} }) {
  const router = useRouter();

  const items = lembagaDesa.map((lembaga) => {
    const dyn = dynamicMap[lembaga.id] || {};
    return {
      key: lembaga.id,
      nama: lembaga.nama,
      singkatan: lembaga.singkatan,
      icon: lembaga.icon,
      members: dyn.members ?? lembaga.details?.members ?? "",
      chairman: dyn.chairman ?? lembaga.details?.chairman ?? "",
    };
  });

  const [values, setValues] = useState(() =>
    Object.fromEntries(items.map((item) => [item.key, { members: item.members, chairman: item.chairman }]))
  );
  const [busyKey, setBusyKey] = useState(null);
  const [error, setError] = useState("");
  const [savedKey, setSavedKey] = useState(null);

  async function handleSave(key) {
    const v = values[key] || { members: "", chairman: "" };
    if (busyKey) return;

    setBusyKey(key);
    setError("");
    setSavedKey(null);
    const res = await updateLembaga({
      key,
      members: v.members.trim(),
      chairman: v.chairman.trim(),
    });
    setBusyKey(null);

    if (res.success) {
      setSavedKey(key);
      router.refresh();
    } else if (res.error) {
      setError(res.error);
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500">
        Kelola data dinamis lembaga: <strong>anggota aktif</strong> dan <strong>ketua</strong>.
        Sisanya (deskripsi, ikon, visi, kegiatan) tetap di kode situs.
      </p>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <ul className="divide-y divide-slate-50">
          {items.map((item) => {
            const v = values[item.key] || { members: "", chairman: "" };
            const busy = busyKey === item.key;
            const saved = savedKey === item.key;
            return (
              <li key={item.key} className="px-5 py-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#0A4532]/10 text-[#0A4532] flex items-center justify-center">
                    {item.icon && <item.icon size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.nama}</p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {item.singkatan}
                    </p>
                  </div>
                  {saved && (
                    <span className="ml-auto text-[11px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-1">
                      Tersimpan
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Anggota Aktif
                    </label>
                    <input
                      type="text"
                      value={v.members}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [item.key]: { ...prev[item.key], members: e.target.value },
                        }))
                      }
                      placeholder="Mis. 25 anggota aktif..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Ketua
                    </label>
                    <input
                      type="text"
                      value={v.chairman}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [item.key]: { ...prev[item.key], chairman: e.target.value },
                        }))
                      }
                      placeholder="Nama ketua lembaga"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <button
                    type="button"
                    onClick={() => handleSave(item.key)}
                    disabled={busy}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0A4532] px-4 py-2 text-xs font-bold text-white hover:bg-[#063023] transition-colors disabled:opacity-50"
                  >
                    {busy ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                    Simpan
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}