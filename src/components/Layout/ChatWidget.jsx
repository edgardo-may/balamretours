import { useState, useRef, useEffect } from "react";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola Soy tu agente virtual. ¿En qué te puedo ayudar hoy?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Genera un visitorId único por sesión y lo guarda en sessionStorage
  const visitorId = (() => {
    let id = sessionStorage.getItem("visitorId");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("visitorId", id);
    }
    return id;
  })();

  // Auto-scrollea al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("https://balamretours.app.n8n.cloud/webhook/chat-to-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          visitor: {
            id: visitorId,
            name: "" // opcional, si quieres pedir nombre luego
          }
        })
      });

      const data = await res.json();

      // Solo agrega la respuesta del agente si existe
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply }
        ]);
      }

    } catch (err) {
      console.error("Error del Webhook:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lo siento, hubo un error al procesar tu solicitud." }
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="w-80 h-[420px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-black text-white p-3 font-semibold flex justify-between">
            Agente Virtual
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-xl max-w-[75%] ${m.role === "user" ? "bg-black text-white" : "bg-gray-100"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none"
              placeholder="Escribe tu mensaje…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white px-4 rounded-xl text-sm"
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl"
      >
        💬
      </button>
    </div>
  );
}
