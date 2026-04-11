import { useState, useRef, useEffect } from "react";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [messages, setMessages] = useState<
    Array<{ 
      role: string; 
      content: string;
      type?: 'auto' | 'human' | 'transfer' | 'error';
      metadata?: any;
    }>
  >([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // visitorId por sesión
  const visitorId = (() => {
    let id = sessionStorage.getItem("visitorId");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("visitorId", id);
    }
    return id;
  })();

  // conversationId por sesión
  const conversationId = (() => {
    let id = sessionStorage.getItem("conversationId");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("conversationId", id);
    }
    return id;
  })();
  

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    
    // Agregar mensaje del usuario
    setMessages((prev) => [...prev, { 
      role: "user", 
      content: userText 
    }]);
    
    setTyping(true);

    try {
      const res = await fetch(
        "https://balamretours.app.n8n.cloud/webhook-test/chat-agent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId,
            message: userText,
            visitor: {
              id: visitorId,
              channel: "web"
            },
          }),
        },
      );

      const data = await res.json();
      
      setTimeout(() => {
        setTyping(false);
        
        // Procesar respuesta del flujo n8n
        if (data.success && data.reply) {
          // Verificar si necesita transferir a humano
          if (data.requiresHuman || data.action === "transfer_to_human") {
            setIsTransferring(true);
            
            // Agregar mensaje de transferencia
            setMessages((prev) => [
              ...prev,
              { 
                role: "assistant", 
                content: data.reply,
                type: "transfer",
                metadata: {
                  intent: data.intent,
                  requiresHuman: true
                }
              },
            ]);
            
            // Simular conexión con agente humano (opcional)
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { 
                  role: "assistant", 
                  content: "🔄 Conectando con un asesor humano...",
                  type: "human"
                },
              ]);
            }, 1500);
            
          } else {
            // Respuesta automática normal
            setMessages((prev) => [
              ...prev,
              { 
                role: "assistant", 
                content: data.reply,
                type: "auto",
                metadata: {
                  intent: data.intent,
                  confidence: data.metadata?.confidence,
                  faqId: data.metadata?.faqId
                }
              },
            ]);
          }
        } else {
          // Error o sin respuesta
          setMessages((prev) => [
            ...prev,
            { 
              role: "assistant", 
              content: data.reply || "No pude procesar tu mensaje. ¿Podrías reformularlo?",
              type: "error"
            },
          ]);
        }
      }, 800);
    } catch (err) {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "Hubo un error 😕, intenta de nuevo.",
          type: "error"
        },
      ]);
    }
  };

  const closeChat = () => {
    setOpen(false);
    setIsTransferring(false);
    
    // Espera a que termine el fade (30 segundos para volver a mostrar el botón)
    setTimeout(() => {
      setShowButton(true);
    }, 200);
  };

  const openChat = () => {
    setShowButton(false);
    setOpen(true);
  };

  // Función para estilizar según el tipo de mensaje (COLORES MODIFICADOS)
  const getMessageStyle = (type: string | undefined, role: string) => {
    if (role === "user") {
      return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"; // Usuario con gradiente
    }
    
    switch(type) {
      case 'transfer':
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-400 shadow-sm"; // Transferencia
      case 'human':
        return "bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 shadow-sm"; // Agente humano
      case 'error':
        // CAMBIO: De rojo a gris/ámbar más sutil
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-amber-300 shadow-sm"; // Error modificado
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm"; // Auto respuesta normal
    }
  };

  // Función para agregar ícono según tipo
  const getMessageIcon = (type: string | undefined, role: string) => {
    if (role === "user") return null;
    
    switch(type) {
      case 'transfer':
        return "🔄";
      case 'human':
        return "👨‍💼";
      case 'error':
        // CAMBIO: De ⚠️ rojo a un ícono más neutral
        return "❓";
      default:
        return "🤖";
    }
  };

  return (
    <div className="fixed bottom-4 right-8 z-50 flex flex-col items-end gap-4">
      {/* CHAT - TAMAÑO AJUSTADO */}
      <div
        className={`absolute bottom-0 right-0 transition-all duration-300 ease-in-out
        ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200`}
      >
        {/* Header del chat */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 font-semibold flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              🤖
            </div>
            <div>
              <h2 className="text-lg font-bold">Agente Virtual</h2>
              <p className="text-xs font-normal opacity-90">
                {isTransferring ? "Conectando con asesor..." : "Asistencia 24/7"}
              </p>
            </div>
          </div>
          <button 
            onClick={closeChat}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Área de mensajes - ALTURA INCREMENTADA */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          {messages.length === 0 && !typing && (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-gray-700">¡Hola! Soy tu asistente de viajes</h3>
              <p className="text-sm text-gray-500 mt-1">
                Pregúntame sobre tours, precios o disponibilidad
              </p>
            </div>
          )}
          
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[85%] ${getMessageStyle(m.type, m.role)} transition-all duration-200 hover:scale-[1.01]`}
              >
                <div className="flex items-start gap-3">
                  {m.role === "assistant" && getMessageIcon(m.type, m.role) && (
                    <span className="text-xl mt-0.5">{getMessageIcon(m.type, m.role)}</span>
                  )}
                  <div className="flex-1">
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {m.content}
                    </div>
                    {/* Mostrar metadata si existe (para debug) */}
                    {process.env.NODE_ENV === 'development' && m.metadata && (
                      <div className="text-xs mt-2 pt-2 border-t border-gray-200/50 text-gray-500">
                        {m.metadata.intent && `Intención: ${m.metadata.intent}`}
                        {m.metadata.confidence && ` | Confianza: ${Math.round(m.metadata.confidence * 100)}%`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator mejorado */}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 rounded-2xl shadow-sm flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
                <span className="text-sm text-gray-600">Escribiendo respuesta...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Área de entrada - ANCHO INCREMENTADO */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder={isTransferring ? "Un asesor humano te atenderá pronto..." : "Escribe tu mensaje aquí..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isTransferring && sendMessage()}
                disabled={isTransferring}
              />
              {!isTransferring && input.length > 0 && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {input.length}/500
                </span>
              )}
            </div>
            <button
              onClick={sendMessage}
              disabled={isTransferring || !input.trim()}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                isTransferring 
                  ? 'bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-95 shadow-md hover:shadow-lg'
              } text-white`}
            >
              {isTransferring ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Espera</span>
                </>
              ) : (
                <>
                  <span>Enviar</span>
                  <span>↑</span>
                </>
              )}
            </button>
          </div>
          
          {/* Footer informativo */}
          <div className="text-xs text-gray-500 mt-3 px-2 text-center">
            {isTransferring ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Conectando con agente humano...
              </div>
            ) : (
              "Presiona Enter para enviar • Respuestas automáticas • Transferencia a humano si es necesario"
            )}
          </div>
        </div>
      </div>

      {/* BOTÓN FLOTANTE - MEJORADO */}
      {!open && showButton && (
        <button
          onClick={openChat}
          className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 active:scale-95 group"
        >
          <span>💬</span>
          {/* Badge de notificación (opcional) */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            1
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ¿Necesitas ayuda?
          </div>
        </button>
      )}
    </div>
  );
}