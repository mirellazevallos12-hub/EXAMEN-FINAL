import { useState, useRef, useEffect } from 'react';
import '../styles/ChatAssistant.css';

export default function ChatAssistant({ page = 'home' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: page === 'home' ? '¡Hola! Bienvenido a VialeCode. Estoy aquí para ayudarte a buscar y reservar tus boletos de autobús.' : 
            page === 'promociones' ? '¡Hola! Revisa nuestras promociones especiales. ¿Necesitas ayuda con alguna oferta?' :
            '¡Hola! Parece que te interesa este viaje. ¿Quieres conocer más detalles o ayuda con la compra?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    // Respuestas contextuales según la página
    if (page === 'promociones' || page === 'detalles') {
      const promocionesResponses = {
        'precio|costo|cuánto|how much': 'Los precios varían según la ruta y horario. Revisa los detalles de cada promoción para ver los costos específicos.',
        'asientos|disponible|availability': 'Puedes ver la cantidad de asientos disponibles en cada horario. ¡Reserva rápido si hay pocas plazas!',
        'horario|hora|salida|departure': 'Cada promoción tiene múltiples horarios disponibles. Elige el que se adapte mejor a tu viaje.',
        'reserva|compra|booking|buy': 'Para completar tu compra, selecciona el horario deseado y haz clic en "Continuar con la compra".',
        'promoción|descuento|offer': 'Tenemos increíbles ofertas. Explora todas nuestras promociones especiales.',
        'destino|origen|route': 'Puedes viajar a múltiples destinos. Cada promoción incluye información de origen y destino.',
        'ayuda|help|soporte|support': 'Estoy aquí para ayudarte con:\n✓ Información de promociones\n✓ Preguntas sobre horarios\n✓ Detalles de precios\n\n¿Qué necesitas?',
        'gracias|thanks|ok|dale': '¡De nada! ¡Buen viaje! ¿Hay algo más en lo que pueda ayudarte?',
      };

      // Buscar respuesta coincidente
      for (const [keywords, response] of Object.entries(promocionesResponses)) {
        const keywordArray = keywords.split('|');
        if (keywordArray.some(keyword => message.includes(keyword))) {
          return response;
        }
      }

      return 'Excelente pregunta. Puedo ayudarte con:\n\n• Información de promociones\n• Precios y horarios\n• Disponibilidad de asientos\n• Cómo reservar\n\n¿Qué deseas saber?';
    }

    // Respuestas para la página HOME
    const homeResponses = {
      'buscar|search|viaje|trip': 'Para buscar un viaje, ingresa tu origen, destino, fecha y cantidad de pasajeros. ¡Encontraremos las mejores opciones!',
      'precio|costo|cuánto|how much': 'Los precios varían según la ruta y fechas. Realiza una búsqueda para ver precios específicos.',
      'asientos|pasajeros|passengers': 'Puedes seleccionar de 1 a 7 pasajeros. Cada asiento tiene su costo.',
      'fecha|day|fecha salida': 'Selecciona la fecha de salida (y retorno si es viaje redondo). En el calendario verás todas las opciones.',
      'promoción|oferta|special offer': 'Revisa nuestras promociones especiales. ¡Tenemos descuentos increíbles!',
      'destinos|rutas|routes': 'Viajamos a múltiples destinos. Busca el tuyo y explora nuestras rutas.',
      'ayuda|help|soporte|support': 'Estoy aquí para ayudarte con:\n✓ Cómo buscar viajes\n✓ Información de rutas\n✓ Promociones actuales\n✓ Preguntas generales\n\n¿Qué necesitas?',
      'gracias|thanks|ok|dale': '¡De nada! Si necesitas más ayuda, estoy aquí. ¿Hay algo más?',
    };

    // Buscar respuesta coincidente
    for (const [keywords, response] of Object.entries(homeResponses)) {
      const keywordArray = keywords.split('|');
      if (keywordArray.some(keyword => message.includes(keyword))) {
        return response;
      }
    }

    return 'Buena pregunta. Puedo ayudarte con:\n\n• Búsqueda de viajes\n• Información de rutas\n• Promociones\n• Información general\n\n¿Qué deseas saber?';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simular latencia del bot
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Botón flotante del chat */}
      <button 
        className="chat-toggle robot-chat"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        🤖
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>🤖 Auto Robot Asistente</h3>
            <button 
              className="chat-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message message-${msg.sender}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                </div>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            ))}
            
            {isLoading && (
              <div className="message message-bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn">
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  );
}
