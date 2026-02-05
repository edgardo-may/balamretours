     // Estado para el testimonio actual
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
   
   // Efecto para cambiar testimonios
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 7000); // Cambia cada 7 segundos
    
    return () => clearInterval(testimonialInterval);
  }, [currentTestimonial]);
   
   // Testimonios
    const testimonials = [
      {
        text: "Una experiencia inolvidable. Los cenotes son mágicos y los guías excelentes.",
        author: "María González",
        rating: 5
      },
      {
        text: "Las zonas arqueológicas son impresionantes. Aprendimos mucho sobre la cultura maya.",
        author: "Carlos Rodríguez",
        rating: 4
      },
      {
        text: "La atención personalizada hizo toda la diferencia. ¡Volveremos!",
        author: "Ana Martínez",
        rating: 5
      }
    ];
  
  
  const testimonialVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }
  };

 
 
 
 {/* Testimonios animados */}
        <div className="mt-16 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              variants={testimonialVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-start mb-4">
                <FaQuoteLeft className="text-primary w-6 h-6 mr-3 mt-1" />
                <p className="text-white text-lg italic text-left">
                  "{testimonials[currentTestimonial].text}"
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-left">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400' : 'text-gray-500'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonial 
                          ? 'bg-white w-6' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>