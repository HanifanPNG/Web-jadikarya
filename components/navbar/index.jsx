"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");

  useEffect(() => {
    if (pathname === "/profil-desa") setActiveNav("profil");
    else if (pathname === "/potensi-desa") setActiveNav("potensi");
    else if (pathname === "/peta-potensi") setActiveNav("peta");
    else if (pathname === "/berita" || pathname.startsWith("/category/")) setActiveNav("berita");
    else if (pathname === "/") setActiveNav("beranda");
    else setActiveNav("");
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "beranda", label: "Beranda", href: "/", isPage: true },
    { id: "profil", label: "Profil Desa", href: "/profil-desa", isPage: true },
    { id: "potensi", label: "Potensi Desa", href: "/potensi-desa", isPage: true },
    { id: "peta", label: "Peta Potensi", href: "/peta-potensi", isPage: true },
    { id: "berita", label: "Portal Berita", href: "/berita", isPage: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/30 backdrop-blur-md py-4 border-b border-white/10 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        
        {/* Left Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
            <Image
              src="/assets/logo-desa.png"
              alt="Logo Desa Jadikarya"
              width={55}
              height={55}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="font-inter text-white font-bold text-lg sm:text-xl tracking-tight group-hover:text-[#FFE7D2] transition-colors">
            Desa Jadikarya
          </span>
        </Link>

        {/* Right Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return item.isPage ? (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`relative py-1 text-sm sm:text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute left-0 right-0 bottom-[-4px] h-[3px] bg-[#0A4532] rounded-full shadow-sm" />
                )}
              </Link>
            ) : (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`relative py-1 text-sm sm:text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute left-0 right-0 bottom-[-4px] h-[3px] bg-[#FFE7D2] rounded-full shadow-sm" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 pt-4 pb-6 space-y-3 animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            const baseClass = `block py-2 text-base font-medium transition-all ${
              isActive
                ? "text-[#FFE7D2] font-bold border-l-4 border-[#FFE7D2] pl-3"
                : "text-white/90 hover:text-white pl-3"
            }`;
            return item.isPage ? (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileMenuOpen(false);
                }}
                className={baseClass}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileMenuOpen(false);
                }}
                className={baseClass}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
