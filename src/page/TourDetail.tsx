// src/pages/TourDetail.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { TourDetail, DayItinerary, FAQ, Availability } from '../types/index';
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaCheck,
  FaTimes,
  FaPlane,
  FaHotel,
  FaUtensils,
  FaBus,
  FaHiking,
  FaCamera,
  FaHeart,
  FaShareAlt,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const TourDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [reservationData, setReservationData] = useState({
    adults: 1,
    children: 0,
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    agreeToTerms: false
  });

  // Datos de ejemplo del tour (en un caso real vendrían de una API)
  const tour: TourDetail = {
    id: 1,
    name: 'Tour Premium a Machu Picchu',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    description: 'Experiencia completa en la maravilla del mundo inca. Incluye caminata por el Camino Inca, visita a Machu Picchu, Valle Sagrado y Cusco.',
    price: '$1,599',
    duration: '6 días / 5 noches',
    rating: 4.9,
    included: [
      'Alojamiento en hoteles 4 estrellas',
      'Todas las comidas (desayuno, almuerzo, cena)',
      'Guía turístico bilingüe certificado',
      'Entradas a todas las atracciones',
      'Transporte privado durante todo el tour',
      'Tren de lujo a Machu Picchu',
      'Seguro de viaje',
      'Oxígeno de emergencia'
    ],
    notIncluded: [
      'Vuelos internacionales',
      'Bebidas alcohólicas',
      'Propinas para guías y conductores',
      'Gastos personales',
      'Visas (si aplica)'
    ],
    highlights: [
      'Visita a Machu Picchu al amanecer',
      'Caminata por el Camino Inca',
      'Tour por el Valle Sagrado',
      'Visita a sitios arqueológicos incas',
      'Experiencia cultural con comunidades locales',
      'Fotografía profesional incluida'
    ],
    requirements: [
      'Pasaporte válido',
      'Condición física moderada',
      'Ropa adecuada para montaña',
      'Vacuna contra la fiebre amarilla (recomendada)',
      'Seguro de viaje médico'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada a Cusco y Aclimatación',
        description: 'Recepción en el aeropuerto y traslado al hotel. Tarde libre para aclimatarse a la altitud.',
        activities: ['Recepción aeropuerto', 'Check-in hotel', 'Orientación del tour'],
        meals: ['Cena de bienvenida'],
        accommodation: 'Hotel 4* en Cusco'
      },
      {
        day: 2,
        title: 'Valle Sagrado de los Incas',
        description: 'Visita a Pisac, Ollantaytambo y mercado artesanal. Almuerzo típico andino.',
        activities: ['Mercado de Pisac', 'Ruinas de Ollantaytambo', 'Almuerzo tradicional'],
        meals: ['Desayuno', 'Almuerzo', 'Cena'],
        accommodation: 'Hotel 4* en Valle Sagrado'
      },
      {
        day: 3,
        title: 'Camino Inca a Machu Picchu',
        description: 'Caminata por el famoso Camino Inca con vistas espectaculares.',
        activities: ['Caminata moderada', 'Visita a Wiñay Wayna', 'Llegada a Inti Punku'],
        meals: ['Desayuno', 'Box lunch', 'Cena'],
        accommodation: 'Hotel 3* en Aguas Calientes'
      },
      {
        day: 4,
        title: 'Machu Picchu - La Ciudad Perdida',
        description: 'Visita a Machu Picchu al amanecer. Tour guiado completo por la ciudadela.',
        activities: ['Machu Picchu al amanecer', 'Tour guiado completo', 'Tiempo libre'],
        meals: ['Desayuno', 'Almuerzo', 'Cena'],
        accommodation: 'Hotel 3* en Aguas Calientes'
      },
      {
        day: 5,
        title: 'Regreso a Cusco',
        description: 'Tren panorámico de regreso y tarde libre en Cusco para explorar.',
        activities: ['Tren panorámico', 'Visita a la Catedral', 'Tiempo libre'],
        meals: ['Desayuno', 'Cena de despedida'],
        accommodation: 'Hotel 4* en Cusco'
      },
      {
        day: 6,
        title: 'Despedida y Traslado',
        description: 'Desayuno y traslado al aeropuerto para vuelo de regreso.',
        activities: ['Desayuno final', 'Traslado aeropuerto'],
        meals: ['Desayuno'],
        accommodation: 'Fin del tour'
      }
    ],
    faqs: [
      {
        question: '¿Qué nivel de condición física se requiere?',
        answer: 'Se requiere condición física moderada. La caminata más larga es de 4-5 horas con descansos. Recomendamos entrenar caminando varias semanas antes.'
      },
      {
        question: '¿Hay restricciones de edad?',
        answer: 'El tour está disponible para personas de 12 a 65 años. Menores de 18 deben ir acompañados por un adulto.'
      },
      {
        question: '¿Qué debo llevar?',
        answer: 'Ropa cómoda para caminar, zapatos de trekking, protector solar, gorra, agua, documentos personales y cámara fotográfica.'
      },
      {
        question: '¿Hay opciones vegetarianas/veganas?',
        answer: 'Sí, ofrecemos opciones vegetarianas, veganas y podemos adaptarnos a otras restricciones dietéticas con previo aviso.'
      },
      {
        question: '¿Qué pasa si me enfermo durante el tour?',
        answer: 'Contamos con asistencia médica 24/7, oxígeno de emergencia y seguro de viaje que cubre emergencias médicas.'
      }
    ],
    availability: [
      { date: '2024-03-15', availableSpots: 8, price: 1599 },
      { date: '2024-03-22', availableSpots: 12, price: 1599 },
      { date: '2024-03-29', availableSpots: 6, price: 1599 },
      { date: '2024-04-05', availableSpots: 15, price: 1699 },
      { date: '2024-04-12', availableSpots: 10, price: 1699 },
      { date: '2024-04-19', availableSpots: 4, price: 1699 }
    ]
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationData.agreeToTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    
    // Aquí iría la lógica para enviar la reserva a una API
    console.log('Reserva enviada:', {
      tourId: id,
      date: selectedDate,
      ...reservationData
    });
    
    alert('¡Reserva enviada con éxito! Te contactaremos pronto para confirmar los detalles.');
    setShowReservationForm(false);
    setReservationData({
      adults: 1,
      children: 0,
      fullName: '',
      email: '',
      phone: '',
      specialRequests: '',
      agreeToTerms: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setReservationData(prev => ({ ...prev, [name]: checked }));
    } else {
      setReservationData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowReservationForm(true);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const calculateTotal = () => {
    const selectedAvailability = tour.availability.find(a => a.date === selectedDate);
    if (!selectedAvailability) return 0;
    
    const adultPrice = selectedAvailability.price * reservationData.adults;
    const childPrice = (selectedAvailability.price * 0.7) * reservationData.children; // 30% descuento niños
    return adultPrice + childPrice;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenContact={() => {}} />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">
              Inicio
            </button>
            <span className="mx-2">›</span>
            <button onClick={() => navigate('/destinos')} className="hover:text-blue-600 transition-colors">
              Destinos
            </button>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-medium">{tour.name}</span>
          </nav>
        </div>
      </div>

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Header del Tour */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{tour.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>Perú • Machu Picchu</span>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="font-semibold">{tour.rating} (128 reseñas)</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{tour.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaHeart className="text-gray-600" />
                </button>
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaShareAlt className="text-gray-600" />
                </button>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{tour.price}</div>
                  <div className="text-sm text-gray-500">por persona</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Imagen principal */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Galería de imágenes */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                      src={`https://images.unsplash.com/photo-152${num}3976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`}
                      alt={`Imagen ${num}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Descripción detallada */}
              <section className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sobre este tour</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {tour.description} Este tour exclusivo te lleva por los lugares más emblemáticos 
                  de la cultura inca, combinando aventura, historia y paisajes espectaculares.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaPlane className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Vuelos incluidos</div>
                      <div className="text-sm text-gray-500">Desde Lima a Cusco</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaHotel className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Alojamiento</div>
                      <div className="text-sm text-gray-500">Hoteles 4* seleccionados</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaUtensils className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Comidas</div>
                      <div className="text-sm text-gray-500">Todas incluidas</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaBus className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Transporte</div>
                      <div className="text-sm text-gray-500">Privado y cómodo</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaHiking className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Guías</div>
                      <div className="text-sm text-gray-500">Bilingües certificados</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaCamera className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Fotografía</div>
                      <div className="text-sm text-gray-500">Sesión profesional</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Itinerario */}
              <section className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Itinerario Detallado</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="border-l-4 border-blue-500 pl-6 py-4 relative">
                      <div className="absolute -left-3 top-6 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {day.day}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{day.title}</h3>
                      <p className="text-gray-600 mb-3">{day.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Actividades:</h4>
                          <ul className="space-y-1">
                            {day.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-center text-gray-600">
                                <FaCheck className="text-green-500 mr-2 text-sm" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Comidas & Alojamiento:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-center text-gray-600">
                              <FaUtensils className="text-orange-500 mr-2 text-sm" />
                              {day.meals.join(', ')}
                            </li>
                            <li className="flex items-center text-gray-600">
                              <FaHotel className="text-purple-500 mr-2 text-sm" />
                              {day.accommodation}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Lo Incluido/No Incluido */}
              <section className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Qué está incluido?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                      <FaCheck className="mr-2" /> Incluido en el precio
                    </h3>
                    <ul className="space-y-3">
                      {tour.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                      <FaTimes className="mr-2" /> No incluido
                    </h3>
                    <ul className="space-y-3">
                      {tour.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaTimes className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Preguntas Frecuentes */}
              <section className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                  {tour.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                      >
                        <span className="font-semibold text-gray-800">{faq.question}</span>
                        {expandedFaq === index ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 py-4 bg-white">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Columna derecha - Sidebar de reserva */}
            <div className="space-y-8">
              {/* Tarjeta de reserva */}
              <div className="bg-white rounded-2xl p-6 shadow-xl sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{tour.price}</div>
                  <div className="text-gray-500">por persona • {tour.duration}</div>
                </div>

                {/* Selección de fecha */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Selecciona tu fecha</h3>
                  <div className="space-y-3">
                    {tour.availability.map((slot) => (
                      <button
                        key={slot.date}
                        onClick={() => handleDateSelect(slot.date)}
                        className={`w-full p-3 rounded-lg border transition-all duration-200 flex justify-between items-center ${
                          selectedDate === slot.date
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium">
                            {new Date(slot.date).toLocaleDateString('es-ES', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short'
                            })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {slot.availableSpots} cupos disponibles
                          </div>
                        </div>
                        <div className="font-semibold">${slot.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botón de reserva principal */}
                <button
                  onClick={() => setShowReservationForm(true)}
                  disabled={!selectedDate}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                    selectedDate
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {selectedDate ? 'Reservar Ahora' : 'Selecciona una fecha'}
                </button>

                {/* Información de contacto rápida */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">¿Tienes dudas?</h4>
                  <div className="space-y-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors">
                      <FaWhatsapp className="mr-2" />
                      Chatear por WhatsApp
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors">
                      <FaPhone className="mr-2" />
                      Llamar Ahora
                    </button>
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors">
                      <FaEnvelope className="mr-2" />
                      Enviar Email
                    </button>
                  </div>
                </div>

                {/* Garantías */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Cancelación gratuita hasta 30 días antes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Mejor precio garantizado</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>Pagos seguros SSL</span>
                  </div>
                </div>
              </div>

              {/* Reseñas */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Reseñas de viajeros</h3>
                <div className="flex items-center mb-4">
                  <div className="text-3xl font-bold mr-3">{tour.rating}</div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`${i < Math.floor(tour.rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Basado en 128 reseñas</div>
                  </div>
                </div>
                <button className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Ver todas las reseñas
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Reserva */}
      {showReservationForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Completar Reserva</h2>
                  <p className="text-gray-600 mt-2">
                    {tour.name} • {selectedDate && new Date(selectedDate).toLocaleDateString('es-ES', { dateStyle: 'full' })}
                  </p>
                </div>
                <button
                  onClick={() => setShowReservationForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-6">
                {/* Información del tour */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Fecha seleccionada</div>
                      <div className="font-semibold">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('es-ES', { dateStyle: 'medium' })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Precio por adulto</div>
                      <div className="font-semibold">
                        ${tour.availability.find(a => a.date === selectedDate)?.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selector de personas */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4">Participantes</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Adultos (18+)</label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => setReservationData(prev => ({ 
                            ...prev, 
                            adults: Math.max(1, prev.adults - 1) 
                          }))}
                          className="w-10 h-10 rounded-l-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          name="adults"
                          value={reservationData.adults}
                          onChange={handleInputChange}
                          min="1"
                          max="10"
                          className="w-16 h-10 border-y border-gray-300 text-center"
                        />
                        <button
                          type="button"
                          onClick={() => setReservationData(prev => ({ 
                            ...prev, 
                            adults: Math.min(10, prev.adults + 1) 
                          }))}
                          className="w-10 h-10 rounded-r-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Niños (0-17)</label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => setReservationData(prev => ({ 
                            ...prev, 
                            children: Math.max(0, prev.children - 1) 
                          }))}
                          className="w-10 h-10 rounded-l-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          name="children"
                          value={reservationData.children}
                          onChange={handleInputChange}
                          min="0"
                          max="10"
                          className="w-16 h-10 border-y border-gray-300 text-center"
                        />
                        <button
                          type="button"
                          onClick={() => setReservationData(prev => ({ 
                            ...prev, 
                            children: Math.min(10, prev.children + 1) 
                          }))}
                          className="w-10 h-10 rounded-r-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información personal */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800">Información de contacto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Nombre completo *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={reservationData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={reservationData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="juan@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={reservationData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Solicitudes especiales</label>
                      <textarea
                        name="specialRequests"
                        value={reservationData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Alergias alimentarias, necesidades especiales, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Resumen de pago */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-4">Resumen de pago</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Adultos ({reservationData.adults} × ${tour.availability.find(a => a.date === selectedDate)?.price})</span>
                      <span>${(tour.availability.find(a => a.date === selectedDate)?.price || 0) * reservationData.adults}</span>
                    </div>
                    {reservationData.children > 0 && (
                      <div className="flex justify-between">
                        <span>Niños ({reservationData.children} × ${(tour.availability.find(a => a.date === selectedDate)?.price || 0) * 0.7})</span>
                        <span>${((tour.availability.find(a => a.date === selectedDate)?.price || 0) * 0.7) * reservationData.children}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-blue-600">${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Términos y condiciones */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={reservationData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                    required
                  />
                  <label className="text-gray-700 text-sm">
                    Acepto los{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      términos y condiciones
                    </a>
                    {' '}y la{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      política de privacidad
                    </a>
                    . Entiendo que recibiré un correo de confirmación y que la reserva está sujeta a disponibilidad.
                  </label>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowReservationForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-lg font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-semibold transition-colors transform hover:scale-105"
                  >
                    Confirmar Reserva y Pagar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TourDetail;