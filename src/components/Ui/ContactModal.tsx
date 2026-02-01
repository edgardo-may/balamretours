// src/components/Ui/ContactModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  tourName
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    adults: 1,
    children: 0,
    date: '',
    message: '',
    pickup: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? parseInt(value) || 0 : value
    }));
  };

  const handleIncrement = (field: 'adults' | 'children') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] + 1
    }));
  };

  const handleDecrement = (field: 'adults' | 'children') => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(field === 'adults' ? 1 : 0, prev[field] - 1)
    }));
  };

  const generateWhatsAppMessage = () => {
    const totalPersons = formData.adults + formData.children;
    const childrenText = formData.children > 0 ? ` (${formData.children} niños)` : '';
    
    return encodeURIComponent(
      `¡Hola! Estoy interesado en reservar el tour:\n\n` +
      `Tour: ${tourName ?? 'Información general'}\n` +
      `Nombre: ${formData.name || 'No especificado'}\n` +
      `Email: ${formData.email || 'No especificado'}\n` +
      `Personas: ${totalPersons} personas${childrenText}\n` +
      `Adultos: ${formData.adults}\n` +
      `Niños: ${formData.children}\n` +
      `Fecha del viaje: ${formData.date || 'Por definir'}\n` +
      `Mensaje adicional: ${formData.message || 'Ninguno'}\n` +
      `Lugar de recogida: ${formData.pickup || 'No especificado'}\n\n` 
    );
  };

  const getWhatsAppLink = () => {
    const phoneNumber = '529983471258'; // Cambia este número si es necesario
    const message = generateWhatsAppMessage();
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappLink = getWhatsAppLink();
    window.open(whatsappLink, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-28 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-5 md:p-6 max-w-xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Solicitar Reserva</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            {tourName && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Tour seleccionado:</p>
                <p className="font-semibold text-blue-700">{tourName}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adultos *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleDecrement('adults')}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition"
                    >
                      −
                    </button>
                    <input
                      name="adults"
                      type="number"
                      min="1"
                      value={formData.adults}
                      onChange={handleChange}
                      className="w-full text-center py-3 border-0 focus:ring-0 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleIncrement('adults')}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niños
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleDecrement('children')}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition"
                    >
                      −
                    </button>
                    <input
                      name="children"
                      type="number"
                      min="0"
                      value={formData.children}
                      onChange={handleChange}
                      className="w-full text-center py-3 border-0 focus:ring-0 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleIncrement('children')}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha del viaje
                </label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje adicional
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="¿Algún requerimiento especial o pregunta adicional?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lugar de recogida
                </label>
                <input
                  name="pickup"
                  type="text"
                  value={formData.pickup}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="¿Dónde deseas ser recogido?"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Total personas:</span>
                  <span className="font-semibold text-lg">
                    {formData.adults + formData.children} personas
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.264-6.162-3.556-8.411"/>
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;