import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBeSolid = !isHomePage || isScrolled;

  const navLinks = [
    {
      name: "Tours Generales",
      href: isHomePage ? "#tours-generales" : "/tours?tipo=colectivo",
    },
    {
      name: "Tours Privados",
      href: isHomePage ? "#tours-privados" : "/tours?tipo=privado",
    },
    {
      name: "¿Por qué Balam?",
      href: isHomePage ? "#beneficios" : "/#beneficios",
    },
    {
      name: "Testimonios",
      href: isHomePage ? "#testimonios" : "/#testimonios",
    },
    {
      name: "Contacto",
      href: isHomePage ? "#contacto" : "/#contacto",
    },
    {
      name: "Transporte Privado",
      href: "/cotizacion-transporte",
      highlight: true,
    },
  ];


  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-400 ${
        shouldBeSolid
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(180,160,120,0.15)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-5 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div
            className={`relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-xl overflow-hidden transition-all ${
              !shouldBeSolid
                ? "bg-white/80 backdrop-blur-sm p-1.5 shadow-sm"
                : ""
            }`}
          >
            <img
              src="/images/logo-balam.png"
              alt="Balam RE Tours"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = "none";
                if (t.parentElement) {
                  t.parentElement.innerHTML = `<div class="w-full h-full bg-cenote-600 rounded-xl flex items-center justify-center text-white font-black text-sm">BR</div>`;
                }
              }}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`text-xl md:text-2xl font-black tracking-tight transition-colors ${shouldBeSolid ? "text-noche-950" : "text-white drop-shadow-md"}`}
            >
              BALAM<span className="text-cenote-600">RE</span>
            </span>
            <span
              className={`text-[10px] md:text-[11px] font-semibold tracking-widest uppercase transition-colors ${shouldBeSolid ? "text-noche-400" : "text-white/90 drop-shadow-md"}`}
            >
              Tours & Excursiones
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            link.highlight ? (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  shouldBeSolid
                    ? "border-tierra-300 text-tierra-700 bg-tierra-50 hover:bg-tierra-100 hover:border-tierra-400"
                    : "border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50"
                }`}
              >
                {link.name}
              </a>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  shouldBeSolid
                    ? "text-noche-600 hover:text-cenote-700 hover:bg-cenote-50"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors ${shouldBeSolid ? "text-noche-800 hover:bg-caliza-100" : "text-white hover:bg-white/10"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-caliza-200 p-5 flex flex-col gap-2 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                  }
                  handleNavClick(link.href);
                }}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  link.highlight
                    ? "text-tierra-700 bg-tierra-50 hover:bg-tierra-100"
                    : "text-noche-700 hover:bg-cenote-50 hover:text-cenote-700"
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
