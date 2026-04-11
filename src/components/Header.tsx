// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { 
  FaPlane, FaBars, FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import type { NavItem } from '../types/index';

interface HeaderProps {
  onOpenContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    // Pequeño delay para que la animación se vea mejor
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Destinos', href: '/tours' },
    { label: 'Paquetes', href: '/paquetes' },
    { label: 'Testimonios', href: '/testimonios' },
    { label: 'Contacto', href: '/contact' }
  ];
  
  const headerAnimation = {
    initial: { y: -80, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  } as const;

  const logoAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  } as const;

  const navItemsAnimation = {
    initial: { opacity: 0 },
    animate: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.4 + (i * 0.1),
        duration: 0.3
      }
    })
  };

  const buttonAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.8
      }
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  } as const;

  const mobileMenuAnimation = {
    hidden: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut
      }
    }
  };

  const mobileMenuItemAnimation = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <>
  
      {/* Navegación principal */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md"
        initial="initial"
        animate={isMounted ? "animate" : "initial"}
        variants={headerAnimation}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              variants={logoAnimation}
              initial="initial"
              animate={isMounted ? "animate" : "initial"}
            >
              <a href="/" className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaPlane className="text-blue-600 text-3xl" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">BalamReTours</h1>
                  <p className="text-sm text-gray-600">Explora el mundo con nosotros</p>
                </div>
              </a>
            </motion.div>

            {/* Navegación desktop */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={navItemsAnimation}
                  initial="initial"
                  animate={isMounted ? "animate" : "initial"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Botón contacto y menú móvil */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={onOpenContact}
                className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                variants={buttonAnimation}
                initial="initial"
                animate={isMounted ? "animate" : "initial"}
                whileHover="hover"
                whileTap="tap"
              >
                Contactar
              </motion.button>
              
              {/* Botón menú móvil */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 text-2xl"
                aria-label="Toggle menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>
          </div>

          {/* Menú móvil */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden mt-4 pb-4"
                variants={mobileMenuAnimation}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="flex flex-col space-y-3">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      custom={index}
                      variants={mobileMenuItemAnimation}
                      initial="hidden"
                      animate="visible"
                    >
                      <a
                        href={item.href}
                        className="text-gray-700 hover:text-blue-600 py-2 font-medium block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  ))}
                  <motion.button
                    onClick={() => {
                      onOpenContact();
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contactar
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Header;