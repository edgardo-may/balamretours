import React from 'react';
import { Compass, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <Compass className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                BALAM<span className="text-teal-500">RE</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Experiencias auténticas y exclusivas en el corazón de la Riviera Maya. Redescubre el mundo maya con nosotros.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <FaXTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Explorar</h4>
            <ul className="space-y-4">
              <li><a href="#tours" className="text-slate-400 hover:text-teal-400 transition-colors">Tours Populares</a></li>
              <li><a href="#beneficios" className="text-slate-400 hover:text-teal-400 transition-colors">Beneficios</a></li>
              <li><a href="#testimonios" className="text-slate-400 hover:text-teal-400 transition-colors">Testimonios</a></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">Galería de Fotos</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Soporte</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">Políticas de Cancelación</a></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">Privacidad</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-500 shrink-0" />
                <span className="text-slate-400 text-sm">Playa del Carmen, Quintana Roo, México.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                <span className="text-slate-400 text-sm">+52 (984) 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-500 shrink-0" />
                <span className="text-slate-400 text-sm">hola@balamretours.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © 2024 Balam RE Tours. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 font-bold uppercase tracking-widest">
            <span>Hecho con ❤️ en México</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
