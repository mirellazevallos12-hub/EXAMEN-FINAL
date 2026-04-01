export default function ServiciosHome({ onViewServiceDetail }) {
  const servicios = [
    {
      id: 1,
      nombre: 'PREMIUM',
      tipo: 'SERVICIO PREMIUM',
      imagen: '/images/premium-bus.jpg',
      features: ['WiFi Gratis', 'Asientos Premium', 'Enchufes USB'],
      precio: 'Desde S/. 85',
      descripcion: 'Disfruta de máxima comodidad'
    },
    {
      id: 2,
      nombre: 'MEDIUM',
      tipo: 'SERVICIO MEDIUM',
      imagen: '/images/medium-bus.jpg',
      features: ['Aire Acondicionado', 'Asientos Cómodos', 'Servicio de Bebidas'],
      precio: 'Desde S/. 65',
      descripcion: 'Viaja con confort y seguridad'
    },
    {
      id: 3,
      nombre: 'EJECUTIVO',
      tipo: 'SERVICIO EJECUTIVO',
      imagen: '/images/ejecutivo-bus.jpg',
      features: ['Servicio VIP', 'Comidas Incluidas', 'Atención Premium'],
      precio: 'Desde S/. 120',
      descripcion: 'Experiencia de viaje excepcional'
    }
  ];

  return (
    <section id="servicios" className="servicios-home-container">
      <div className="servicios-titulo">
        <h2>CONOCE NUESTROS SERVICIOS</h2>
        <p className="servicios-subtitulo">Elige el servicio que mejor se adapte a ti</p>
      </div>
      <div className="servicios-grid">
        {servicios.map(servicio => (
          <div 
            key={servicio.id} 
            className="servicio-card"
            onClick={() => onViewServiceDetail(servicio)}
          >
            <img 
              src={servicio.imagen} 
              alt={servicio.tipo}
              className="servicio-imagen"
            />
            <div className="servicio-content">
              <h3 className="servicio-nombre">{servicio.nombre}</h3>
              
              <div className="servicio-features">
                {servicio.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="servicio-footer">
                <div className="precio-seccion">{servicio.precio}</div>
                <button 
                  className="btn-ver-detalle"
                  onClick={() => onViewServiceDetail(servicio)}
                >
                  <span>VER DETALLE</span>
                  <span className="arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
