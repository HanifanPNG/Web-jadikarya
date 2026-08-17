import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  Facebook,
} from "lucide-react";

export default function PemerintahDanKontak() {
  const quickLinks = [
    { label: "Beranda", href: "/" },
    { label: "Profil Desa", href: "/profil-desa" },
    { label: "Sambutan Kepala Desa", href: "/#sambutan" },
    { label: "Potensi Desa & Komoditas", href: "/potensi-desa" },
    { label: "Peta Potensi Desa", href: "/peta-potensi" },
    { label: "Kontak & Layanan Publik", href: "/#pemerintah-kontak" },
  ];

  const socialLinks = [
    { name: "WhatsApp", icon: faWhatsapp, href: "https://wa.me/6282126967720" },
    { name: "Instagram", icon: faInstagram, href: "#" },
    { name: "YouTube", icon: faYoutube, href: "#" },
  ];

  return (
    <footer id="pemerintah-kontak" className="relative w-full bg-[#0A4532] text-white pt-16 pb-8 border-t-4 border-emerald-600/30 overflow-hidden">
      {/* Subtle dark grid background */}
      <div className="absolute inset-0 bg-village-grid-dark opacity-25 pointer-events-none select-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        
        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Identity (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5" data-aos="fade-up">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg">
                <span className="text-[#0A4532] font-inter font-bold text-2xl">J</span>
              </div>
              <div>
                <h3 className="font-inter font-bold text-2xl text-[#FFE7D2] tracking-wide">
                  Desa Jadikarya
                </h3>
                <p className="text-xs text-white/70 font-medium">
                  Kec. Langkaplancar, Kab. Pangandaran
                </p>
              </div>
            </div>

            <p className="text-white/80 text-sm font-normal leading-relaxed">
              Portal Informasi Resmi Pemerintah Desa Jadikarya. Wujud transparansi publik, publikasi potensi desa agraris, serta kemudahan akses layanan masyarakat.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-[#FFE7D2] uppercase tracking-wider block">
                Media Sosial Resmi
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((item, idx) => {
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#FFE7D2] flex items-center justify-center transition-all hover:scale-110 border border-white/15"
                      aria-label={item.name}
                    >
                      <FontAwesomeIcon icon={item.icon} style={{ fontSize: 18 }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Navigasi Cepat (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4" data-aos="fade-up" data-aos-delay="100">
            <h4 className="font-inter font-bold text-lg text-[#FFE7D2] tracking-wide relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-[#FFE7D2]">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 pt-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/80 hover:text-[#FFE7D2] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={14} className="text-[#FFE7D2] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Alamat & Kontak Resmi (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4" data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-inter font-bold text-lg text-[#FFE7D2] tracking-wide relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-[#FFE7D2]">
              Kontak Kantor Desa
            </h4>

            <ul className="space-y-3.5 text-xs sm:text-sm text-white/85 pt-2">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FFE7D2] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Alamat:</strong> jl. Raya Bojong no. 28, Dusun jajaway, RT 1 RW 1
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#FFE7D2] flex-shrink-0" />
                <span><strong>Telepon:</strong> +62 821-2696-7720</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#FFE7D2] flex-shrink-0" />
                <span><strong>Email:</strong> djadikarya@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[#FFE7D2] flex-shrink-0 mt-0.5" />
                <span><strong>Jam Operasional:</strong><br />Senin – Jumat: 08:00 – 15:30 WIB</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Peta Lokasi Interactive (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3" data-aos="fade-up" data-aos-delay="300">
            <h4 className="font-inter font-bold text-lg text-[#FFE7D2] tracking-wide relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-[#FFE7D2]">
              Peta Lokasi Desa
            </h4>
            <div className="w-full h-44 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20 bg-black/20">
              <iframe
                title="Peta Lokasi Desa Jadikarya"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.512398418044!2d108.431215!3d-7.463951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65839281a7fbcd%3A0xa621ad700beedecb!2sLangkaplancar%2C%20Pangandaran%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-white/70 pt-1">
              <ShieldCheck size={14} className="text-[#FFE7D2]" />
              <span>Sistem Pelayanan Terpadu Desa</span>
            </div>
          </div>

        </div>

        {/* Bottom Divider Line */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/75">
          <p>© 2026 Pemerintah Desa Jadikarya. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center space-x-4 text-white/70">
            <a href="#hero" className="hover:text-white transition-colors">Kec. Langkaplancar</a>
            <span>•</span>
            <a href="#hero" className="hover:text-white transition-colors">Kab. Pangandaran</a>
            <span>•</span>
            <a href="#hero" className="hover:text-white transition-colors">Jawa Barat</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
