"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RealtimeUpdater() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const refresh = () => router.refresh();

    const channel = supabase
      .channel("public-berita-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "news" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "tags" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "news_tags" }, refresh)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null;
}