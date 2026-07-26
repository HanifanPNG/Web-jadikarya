"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");

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
    { id: "beranda", label: "Beranda", href: "#hero" },
    { id: "profil", label: "Profil Desa", href: "#profil-desa" },
    { id: "potensi", label: "Potensi Desa", href: "#potensi-desa" },
    { id: "peta", label: "Peta Potensi", href: "#potensi-desa" },
    { id: "kontak", label: "Kontak", href: "#pemerintah-kontak" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/30 backdrop-blur-md py-4 border-b border-white/10 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      {/* Full width container with minimal side padding matching screenshot */}
      <div className="w-full px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        
        {/* Left Brand Logo */}
        <Link href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-[#0A4532] font-serif font-bold text-xl">J</span>
          </div>
          <span className="font-serif text-white font-bold text-xl sm:text-2xl tracking-wide group-hover:text-[#FFE7D2] transition-colors">
            Desa Jadikarya
          </span>
        </Link>

        {/* Right Navigation Links with Underline for Active Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
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
                {/* Underline for active menu item */}
                {isActive && (
                  <span className="absolute left-0 right-0 bottom-[-4px] h-[3px] bg-[#0A4532] rounded-full shadow-sm" />
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
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 pt-4 pb-6 space-y-3 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block py-2 text-base font-medium transition-all ${
                  isActive
                    ? "text-[#FFE7D2] font-bold border-l-4 border-[#0A4532] pl-3"
                    : "text-white/90 hover:text-white pl-3"
                }`}
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
