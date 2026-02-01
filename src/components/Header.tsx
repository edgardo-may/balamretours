// src/components/Header.tsx
import React, { useState } from 'react';
import { 
  FaPlane, FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt 
} from 'react-icons/fa';
import type { NavItem } from '../types/index';

interface HeaderProps {
  onOpenContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Destinos', href: '/destinos' },
    { label: 'Paquetes', href: '/paquetes' },
    { label: 'Testimonios', href: '/testimonios' },
    { label: 'Contacto', href: '/contacto' }
  ];

  return (
    <>
      {/* Barra superior de contacto */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>info@turismoaventura.com</span>
            </div>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>Calle Viajes 123, Ciudad Turística</span>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3">
              <FaPlane className="text-blue-600 text-3xl" />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">BalamReTours</h1>
                <p className="text-sm text-gray-600">Explora el mundo con nosotros</p>
              </div>
            </a>

            {/* Navegación desktop */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Botón contacto y menú móvil */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onOpenContact}
                className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Contactar
              </button>
              
              {/* Botón menú móvil */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 text-2xl"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    onOpenContact();
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2"
                >
                  Contactar
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;