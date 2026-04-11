// Componente para ver preguntas sin responder
const PreguntasSinResponder = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    cargarPreguntas();
  }, []);

  const cargarPreguntas = async () => {
    const { data } = await supabase
      .from('preguntas_sin_respuesta')
      .select('*')
      .eq('fue_resuelta', false)
      .order('created_at', { ascending: false });
    
    setPreguntas(data || []);
  };

  const agregarRespuesta = async (preguntaId, respuesta, keywords) => {
    // 1. Marcar pregunta como resuelta
    await supabase
      .from('preguntas_sin_respuesta')
      .update({ fue_resuelta: true, respuesta_provisional: respuesta })
      .eq('id', preguntaId);

    // 2. Crear nueva intención aprendida
    const intent = `intent_${Date.now()}`;
    await supabase
      .from('intenciones_aprendidas')
      .insert({
        intent: intent,
        keywords: keywords,
        respuesta: respuesta,
        ejemplos: [pregunta.pregunta],
        creado_desde_pregunta_id: preguntaId
      });

    cargarPreguntas();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📝 Preguntas sin Responder</h2>
      
      <div className="space-y-4">
        {preguntas.map(pregunta => (
          <div key={pregunta.id} className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">{pregunta.pregunta}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(pregunta.created_at).toLocaleDateString()}
            </p>
            
            <div className="mt-3">
              <input 
                type="text" 
                placeholder="Respuesta..."
                className="border p-2 rounded w-full mb-2"
                id={`respuesta-${pregunta.id}`}
              />
              <input 
                type="text" 
                placeholder="Keywords (separadas por coma)"
                className="border p-2 rounded w-full mb-2"
                id={`keywords-${pregunta.id}`}
              />
              <button 
                onClick={() => agregarRespuesta(
                  pregunta.id,
                  document.getElementById(`respuesta-${pregunta.id}`).value,
                  document.getElementById(`keywords-${pregunta.id}`).value.split(',')
                )}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Agregar Respuesta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};