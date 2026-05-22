import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/529983471258?text=" + encodeURIComponent("Hola, quiero información sobre los tours de Balam RE");

const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-caliza-200 p-4 max-w-[220px] relative"
          >
            {/* Close */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-caliza-100 text-noche-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Agent info */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-noche-900">Balam RE Tours</div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-selva-500 animate-pulse" />
                  <span className="text-2xs text-selva-600 font-semibold">En línea</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-noche-600 leading-relaxed mb-3">
              ¡Hola! ¿Tienes alguna duda sobre nuestros tours? Escríbenos, respondemos rápido. 🌴
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1fba59] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Iniciar Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 bg-[#25D366] rounded-full shadow-whatsapp wa-pulse flex items-center justify-center hover:bg-[#1fba59] transition-colors"
        aria-label="Chat por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
