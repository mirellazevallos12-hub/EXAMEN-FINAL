import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/DetallesPromocion.css';

export default function DetallesPromocion({ promotion, onSwitchToLogin, onSwitchToPromociones, onNuestroServicio }) {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="detalles-page">
      <EncabezadoPrincipal 
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToPromociones}
        onNuestroServicio={onNuestroServicio}
      />
      
      <div className="detalles-container">
        <div className="detalles-header">
          <button 
            className="btn-volver"
            onClick={onSwitchToPromociones}
          >
            ← Volver a Promociones
          </button>
          <h1>{promotion.titulo}</h1>
          <p>{promotion.origen} → {promotion.destino}</p>
        </div>

        <div className="detalles-contenido">
          <div className="detalles-imagen">
            <img 
              src={promotion.imagen} 
              alt={promotion.titulo}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>

          <div className="detalles-info">
            <div className="info-card">
              <h2>Información del Viaje</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Origen</span>
                  <span className="valor">{promotion.origen}</span>
                </div>
                <div className="info-item">
                  <span className="label">Destino</span>
                  <span className="valor">{promotion.destino}</span>
                </div>
                <div className="info-item">
                  <span className="label">Duración</span>
                  <span className="valor">{promotion.duracion}</span>
                </div>
              </div>
            </div>

            <div className="horarios-card">
              <h2>Horarios Disponibles</h2>
              <div className="horarios-list">
                {promotion.horarios.map((horario, idx) => (
                  <div 
                    key={idx}
                    className={`horario-item ${selectedTime === idx ? 'activo' : ''}`}
                    onClick={() => setSelectedTime(idx)}
                  >
                    <div className="horario-tiempo">
                      <span className="tiempo">{horario.hora}</span>
                      <span className="asientos">
                        {horario.asientos} asientos disponibles
                      </span>
                    </div>
                    <div className="horario-precio">
                      <span className="precio-label">S/.</span>
                      <span className="precio-valor">{horario.precio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedTime !== null && (
              <div className="resumen-card">
                <h2>Resumen de Selección</h2>
                <div className="resumen-grid">
                  <div className="resumen-item">
                    <span className="label">Hora</span>
                    <span className="valor">{promotion.horarios[selectedTime].hora}</span>
                  </div>
                  <div className="resumen-item">
                    <span className="label">Asientos</span>
                    <span className="valor">{promotion.horarios[selectedTime].asientos} disponibles</span>
                  </div>
                  <div className="resumen-item">
                    <span className="label">Precio</span>
                    <span className="valor precio">S/. {promotion.horarios[selectedTime].precio}</span>
                  </div>
                </div>
                <button className="btn-comprar">
                  Continuar con la Compra
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatAssistant page="detalles" />
    </div>
  );
}
