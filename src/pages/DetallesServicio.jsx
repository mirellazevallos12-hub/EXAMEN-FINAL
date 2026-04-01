import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/DetallesServicio.css';

export default function DetallesServicio({ service, onSwitchToLogin, onSwitchToHome, onNuestroServicio, onComprar }) {
  const [selectedTravel, setSelectedTravel] = useState(null);

  const travelDetails = [
    {
      id: 1,
      ruta: 'Lima - Cusco',
      horaSalida: '08:00 AM',
      horaLlegada: '08:00 PM',
      duracion: '12h',
      asientos: 15,
      precio: 85
    },
    {
      id: 2,
      ruta: 'Lima - Arequipa',
      horaSalida: '02:00 PM',
      horaLlegada: '10:00 PM',
      duracion: '8h',
      asientos: 20,
      precio: 65
    },
    {
      id: 3,
      ruta: 'Lima - Trujillo',
      horaSalida: '10:00 PM',
      horaLlegada: '05:00 AM',
      duracion: '7h',
      asientos: 18,
      precio: 45
    }
  ];

  const selectedTravelData = travelDetails.find(t => t.id === selectedTravel);

  return (
    <div className="detalles-servicio-page">
      <EncabezadoPrincipal 
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToHome}
        onHistorialClick={onSwitchToHome}
        onNuestroServicio={onNuestroServicio}
      />
      
      <div className="detalles-servicio-hero">
        <img src={service.imagen} alt={service.tipo} className="hero-imagen" />
        <div className="hero-overlay">
          <button className="btn-volver-hero" onClick={onSwitchToHome}>
            ← Volver
          </button>
          <div className="hero-content">
            <h1 className="hero-titulo">{service.nombre}</h1>
            <p className="hero-descripcion">{service.descripcion}</p>
          </div>
        </div>
      </div>

      <div className="detalles-servicio-container">
        <div className="detalles-grid">
          {/* CARACTERÍSTICAS */}
          <div className="caracteristicas-section">
            <h2>Características Incluidas</h2>
            <div className="features-grid">
              {service.features.map((feature, idx) => (
                <div key={idx} className="feature-card">
                  <button className="btn-feature-detail" onClick={onComprar}>
                    Ver Detalle
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SELECTORES Y RESERVA */}
          <div className="reserva-section">
            <div className="viajes-card">
              <h2>Viajes Disponibles Hoy</h2>
              <div className="viajes-list">
                {travelDetails.map((travel) => (
                  <div 
                    key={travel.id}
                    className={`viaje-item ${selectedTravel === travel.id ? 'activo' : ''}`}
                    onClick={() => setSelectedTravel(travel.id)}
                  >
                    <div className="viaje-header">
                      <span className="viaje-ruta">{travel.ruta}</span>
                      <span className="viaje-duracion">{travel.duracion}</span>
                    </div>
                    <div className="viaje-horarios">
                      <div className="horario-item">
                        <span className="label">Salida</span>
                        <span className="hora">{travel.horaSalida}</span>
                      </div>
                      <div className="flecha">→</div>
                      <div className="horario-item">
                        <span className="label">Llegada</span>
                        <span className="hora">{travel.horaLlegada}</span>
                      </div>
                    </div>
                    <div className="viaje-footer">
                      <span className="asientos">👥 {travel.asientos} lugares</span>
                      <span className="precio">S/. {travel.precio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedTravelData && (
              <div className="resumen-reserva">
                <h3>Resumen de tu Reserva</h3>
                <div className="resumen-item">
                  <span className="label">Servicio</span>
                  <span className="valor">{service.nombre}</span>
                </div>
                <div className="resumen-item">
                  <span className="label">Ruta</span>
                  <span className="valor">{selectedTravelData.ruta}</span>
                </div>
                <div className="resumen-item">
                  <span className="label">Horario</span>
                  <span className="valor">{selectedTravelData.horaSalida} - {selectedTravelData.horaLlegada}</span>
                </div>
                <div className="resumen-item">
                  <span className="label">Duración</span>
                  <span className="valor">{selectedTravelData.duracion}</span>
                </div>
                <div className="resumen-divider"></div>
                <div className="resumen-precio">
                  <span className="label">Precio por Pasaje</span>
                  <span className="precio">S/. {selectedTravelData.precio}</span>
                </div>
                <button className="btn-reservar" onClick={onComprar}>
                  CONTINUAR CON LA RESERVA
                </button>
              </div>
            )}

            {!selectedTravelData && (
              <div className="ayuda-seleccionar">
                <p>Selecciona un viaje para continuar con tu reserva</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ChatAssistant page="detalles-servicio" />
    </div>
  );
}
