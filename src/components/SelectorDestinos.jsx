import '../styles/SelectorDestinos.css';

export default function SelectorDestinos({ onSelectDestino, onClose }) {
  const destinos = [
    {
      id: 1,
      nombre: 'CUSCO',
      imagen: '/images/machu picchu.jpg',
      descripcion: 'Machu Picchu'
    },
    {
      id: 2,
      nombre: 'AYACUCHO',
      imagen: '/images/puno.jpg',
      descripcion: 'Línea de Nazca'
    },
    {
      id: 3,
      nombre: 'APURÍMAC',
      imagen: '/images/arequipa.webp',
      descripcion: 'Ayacucho'
    }
  ];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDestinoClick = (destino) => {
    console.log('Click en destino:', destino.nombre);
    onSelectDestino(destino);
  };

  const handleKeyDown = (e, destino) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDestinoClick(destino);
    }
  };

  return (
    <div className="selector-destinos-overlay" onClick={handleOverlayClick}>
      <div className="selector-destinos-modal">
        <button className="close-btn" onClick={onClose} type="button">✕</button>
        
        <h2>Selecciona tu Destino</h2>
        
        <div className="destinos-grid">
          {destinos.map(destino => (
            <div 
              key={destino.id} 
              className="destino-card"
              onClick={() => handleDestinoClick(destino)}
              onKeyDown={(e) => handleKeyDown(e, destino)}
              role="button"
              tabIndex="0"
            >
              <div 
                className="destino-imagen"
                style={{
                  backgroundImage: `url('${destino.imagen}')`
                }}
              >
                <div className="destino-overlay">
                  <h3>{destino.nombre}</h3>
                  <button 
                    className="btn-seleccionar-destino"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDestinoClick(destino);
                    }}
                    type="button"
                  >
                    VER VIAJES
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
