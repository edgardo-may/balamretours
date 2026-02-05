// src/pages/Contact.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import type { ContactFormData } from '../types/index';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Form data:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenContact={() => {}} />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contacto</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ¿Tienes preguntas? Estamos aquí para ayudarte a planificar tu viaje perfecto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Información de contacto</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-4 rounded-lg mr-4">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Teléfono</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-4 rounded-lg mr-4">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600">info@turismoaventura.com</p>
                    <p className="text-gray-600">reservas@turismoaventura.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-4 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Oficina Central</h3>
                    <p className="text-gray-600">Calle Viajes 123</p>
                    <p className="text-gray-600">Ciudad Turística, CP 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-4 rounded-lg mr-4">
                    <FaClock className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Horario de atención</h3>
                    <p className="text-gray-600 mb-1">Lunes a Viernes: 9:00 - 20:00</p>
                    <p className="text-gray-600 mb-1">Sábados: 10:00 - 18:00</p>
                    <p className="text-gray-600">Domingos: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>

              {/* Mapa (placeholder) */}
              <div className="mt-12">
                <h3 className="font-bold text-gray-800 mb-4">Nuestra ubicación</h3>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-500">Mapa interactivo aquí</p>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h2>
                
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                    ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Teléfono</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Destino de interés</label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona un destino</option>
                      <option value="Maldivas">Maldivas</option>
                      <option value="Santorini">Santorini</option>
                      <option value="Kyoto">Kyoto</option>
                      <option value="Machu Picchu">Machu Picchu</option>
                      <option value="Personalizado">Itinerario personalizado</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Mensaje *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Cuéntanos sobre tu viaje ideal..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold transition-colors"
                  >
                    Enviar mensaje
                  </button>
                </form>
              </div>

              {/* FAQ rápida */}
              <div className="mt-8 bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">Preguntas frecuentes</h3>
                <div className="space-y-3">
                  <p className="text-gray-600">
                    <span className="font-semibold">¿Cuánto tiempo tardan en responder?</span>
                    <br />
                    Normalmente respondemos en menos de 24 horas hábiles.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">¿Ofrecen asesoramiento personalizado?</span>
                    <br />
                    Sí, podemos crear itinerarios completamente personalizados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;