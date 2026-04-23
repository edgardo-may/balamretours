import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Calendar, Users, Mail, Phone, User } from 'lucide-react';
import Button from '../Ui/Button';
import { tours } from '../../data/tours';

interface BookingFormProps {
  selectedTourId?: string;
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ selectedTourId, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    tourId: selectedTourId || tours[0].id
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Reserva enviada!</h3>
        <p className="text-slate-500">Nos pondremos en contacto contigo en menos de 24 horas para confirmar los detalles.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <User className="w-4 h-4 text-teal-600" /> Nombre Completo
          </label>
          <input 
            required
            type="text" 
            placeholder="Ej. Juan Pérez"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Mail className="w-4 h-4 text-teal-600" /> Email
          </label>
          <input 
            required
            type="email" 
            placeholder="juan@ejemplo.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal-600" /> WhatsApp / Teléfono
          </label>
          <input 
            required
            type="tel" 
            placeholder="+52..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" /> Fecha Deseada
          </label>
          <input 
            required
            type="date" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-600" /> Personas
          </label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all appearance-none"
            value={formData.guests}
            onChange={(e) => setFormData({...formData, guests: e.target.value})}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'Persona' : 'Personas'}</option>
            ))}
            <option value="11+">Más de 10 (Grupo)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            Seleccionar Tour
          </label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all appearance-none"
            value={formData.tourId}
            onChange={(e) => setFormData({...formData, tourId: e.target.value})}
          >
            {tours.map(tour => (
              <option key={tour.id} value={tour.id}>{tour.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full py-4 text-lg" 
          isLoading={isSubmitting}
        >
          <Send className="w-5 h-5 mr-2" />
          Confirmar Solicitud
        </Button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        Al enviar, aceptas nuestras políticas de privacidad y términos de servicio.
      </p>
    </form>
  );
};

export default BookingForm;
