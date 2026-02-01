// src/components/Footer.tsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPlane } from 'react-icons/fa';

const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Destinos', href: '/destinos' },
    { label: 'Paquetes', href: '/paquetes' },
    { label: 'Testimonios', href: '/testimonios' },
    { label: 'Contacto', href: '/contacto' }
  ];

  const destinations = [
    'Maldivas',
    'Santorini',
    'Kyoto',
    'Machu Picchu',
    'París',
    'Nueva York',
    'Bali',
    'Roma'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center mb-6">
              <FaPlane className="text-blue-400 text-3xl mr-3" />
              <h2 className="text-2xl font-bold">BalamRETours</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Llevamos más de 10 años creando experiencias de viaje inolvidables 
              para nuestros clientes alrededor del mundo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-400 p-2 rounded-lg transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-pink-600 p-2 rounded-lg transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-700 p-2 rounded-lg transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-red-600 p-2 rounded-lg transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-6">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinos */}
          <div>
            <h3 className="text-xl font-bold mb-6">Destinos populares</h3>
            <ul className="space-y-3">
              {destinations.map((destination) => (
                <li key={destination}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Boletín */}
          <div>
            <h3 className="text-xl font-bold mb-6">Suscríbete a nuestro boletín</h3>
            <p className="text-gray-400 mb-4">
              Recibe ofertas exclusivas y novedades de viajes.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-grow p-3 rounded-l-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-r-lg font-semibold transition-colors">
                Unirse
              </button>
            </div>
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h4 className="font-bold mb-2">¿Necesitas ayuda?</h4>
              <p className="text-gray-400 text-sm">
                Llámanos al <span className="text-white">+1 (555) 123-4567</span>
              </p>
              <p className="text-gray-400 text-sm">
                Disponibles 24/7 para emergencias
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} TurismoAventura. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Política de privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Términos y condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Aviso legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;