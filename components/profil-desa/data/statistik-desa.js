import { Users, MapPin, Home, IdCard } from "lucide-react";

export const statistikDesa = [
  {
    label: "Total Penduduk",
    value: "2.618",
    satuan: "Jiwa",
    icon: Users,
    desc: "Penduduk terdaftar (Maret 2020)",
    breakdown: [
      { label: "Laki-laki", value: "1302", color: "#0A4532" },
      { label: "Perempuan", value: "1316", color: "#FFE7D2" },
    ],
  },
  {
    label: "Jumlah Dusun",
    value: "5",
    satuan: "Dusun",
    icon: MapPin,
    desc: "Wilayah administratif",
  },
  {
    label: "RT / RW",
    value: "39 / 11",
    satuan: "RT / RW",
    icon: Home,
    desc: "Unit lingkungan",
  },
  {
    label: "Kartu Keluarga",
    value: "916",
    satuan: "KK",
    icon: IdCard,
    desc: "Jumlah kartu keluarga",
  },
];
