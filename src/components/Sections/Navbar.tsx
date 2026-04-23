import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../Ui/Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tours', href: '#tours' },
    { name: 'Explorar', href: '#explorar' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Testimonios', href: '#testimonios' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <img 
              src={isScrolled ? "/images/logo-balam.png" : "/images/logo-balambn.png"} 
              alt="Balam RE Tours Logo" 
              className="w-full h-full object-contain transition-all duration-300"
              onError={(e) => {
                // Fallback if logo not found
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div class="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3L2 21h20L12 3z"/>
                        <path d="M12 3v18"/>
                        <path d="M5 15h14"/>
                      </svg>
                    </div>
                  `;
                }
              }}
            />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            BALAM<span className="text-teal-500">RE</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                isScrolled ? 'text-slate-600 hover:text-teal-600' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button size="sm" onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}>
            Reservar Ahora
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-slate-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2"
            >
              {link.name}
            </a>
          ))}
          <Button className="w-full mt-2" onClick={() => setIsMobileMenuOpen(false)}>
            Reservar Ahora
          </Button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
