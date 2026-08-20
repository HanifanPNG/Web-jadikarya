"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const lembagaSchema = z.object({
  key: z.string().min(1, "Kunci lembaga tidak valid."),
  members: z.string().max(300, "Keterangan anggota maksimal 300 karakter.").optional().default(""),
  chairman: z.string().max(200, "Nama ketua maksimal 200 karakter.").optional().default(""),
});

async function requireAdminUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

export async function updateLembaga(input) {
  const supabase = createClient();
  if (!(await requireAdminUser(supabase))) {
    return { error: "Sesi berakhir. Silakan login ulang." };
  }

  const parsed = lembagaSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const { key, members, chairman } = parsed.data;

  const { error } = await supabase
    .from("lembaga")
    .upsert({ key, members, chairman, updated_at: new Date().toISOString() }, { onConflict: "key" });

  if (error) {
    console.error("updateLembaga:", error);
    return { error: "Gagal menyimpan data lembaga. Silakan coba lagi." };
  }

  revalidateTag("lembaga");
  return { success: true };
}