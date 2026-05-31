import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-noche-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-cenote-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">BR</span>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight">
                  BALAM<span className="text-cenote-400">RE</span>
                </span>
                <div className="text-2xs text-noche-500 font-medium tracking-widest uppercase">
                  Tours & Excursiones
                </div>
              </div>
            </Link>
            <p className="text-noche-400 text-sm leading-relaxed">
              Experiencias auténticas y exclusivas en el corazón de la Riviera
              Maya. Guías locales, grupos pequeños y atención personalizada.
            </p>
            <div className="flex gap-3">
              {[
                {
                  icon: <FaFacebook className="w-4 h-4" />,
                  href: "https://www.facebook.com/balamretours",
                },
                {
                  icon: <FaInstagram className="w-4 h-4" />,
                  href: "https://www.instagram.com/balam_re_tours?igsh=enA1YmlhNG5vOHk4",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 bg-white/6 hover:bg-cenote-600 rounded-xl flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Tours */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-noche-300">
              Tours
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Tours Colectivos", to: "/tours?tipo=colectivo" },
                { label: "Tours Privados", to: "/tours?tipo=privado" },
                { label: "Ofertas Especiales", to: "/#ofertas-especiales" },
                { label: "Ver Todo el Catálogo", to: "/tours" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-noche-400 hover:text-cenote-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-noche-300">
              Información
            </h4>
            <ul className="space-y-3">
              {[
                { label: "¿Por qué Balam RE?", to: "/#beneficios" },
                {
                  label: "Políticas de Cancelación",
                  to: "/politicas-de-cancelacion",
                },
                {
                  label: "Términos y Condiciones",
                  to: "/terminos-y-condiciones",
                },
                {
                  label: "Exención de Responsabilidad",
                  to: "/exencion-de-responsabilidad",
                },
                {
                  label: "Política de Privacidad",
                  to: "/terminos-y-condiciones#datos",
                },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-noche-400 hover:text-cenote-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-noche-300">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cenote-500 shrink-0 mt-0.5" />
                <span className="text-noche-400 text-sm leading-relaxed">
                  Playa del Carmen, Quintana Roo, México
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cenote-500 shrink-0" />
                <a
                  href="tel:+529983471258"
                  className="text-noche-400 hover:text-cenote-300 text-sm transition-colors"
                >
                  +52 (998) 347-1258
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cenote-500 shrink-0" />
                <a
                  href="mailto:info@balamretours.com"
                  className="text-noche-400 hover:text-cenote-300 text-sm transition-colors"
                >
                  info@balamretours.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-noche-500 text-xs">
            © 2026 Balam RE Tours. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-noche-500 text-xs">
            <span>Hecho con</span>
            <span className="text-rose-400">❤️</span>
            <span>en México</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
