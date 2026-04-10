import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import SelectorDestinos from '../components/SelectorDestinos';
import '../styles/CompraEntradas.css';

export default function CompraEntradas({ onSwitchToLogin, onSwitchToHome, onSwitchToPromociones, onSwitchToHistorial, onNuestroServicio, onSelectAsientos }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState('ida');
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [mostrarSelectorDestinos, setMostrarSelectorDestinos] = useState(false);

  const rutasDisponibles = [
    {
      id: 1,
      origen: 'LIMA',
      destino: 'CUSCO',
      horaSalida: '08:00 AM',
      horaLlegada: '08:00 PM',
      duracion: '12h',
      precio: 85,
      asientosDisponibles: 15,
      imagen: '/images/machu picchu.jpg'
    },
    {
      id: 2,
      origen: 'PUNO',
      destino: 'AYACUCHO',
      horaSalida: '10:30 AM',
      horaLlegada: '06:30 PM',
      duracion: '8h',
      precio: 65,
      asientosDisponibles: 20,
      imagen: '/images/puno.jpg'
    },
    {
      id: 3,
      origen: 'SELVA',
      destino: 'APURÍMAC',
      horaSalida: '02:00 PM',
      horaLlegada: '10:00 PM',
      duracion: '8h',
      precio: 55,
      asientosDisponibles: 18,
      imagen: '/images/arequipa.webp'
    }
  ];

  const handleBuscar = () => {
    if (!selectedDate) {
      alert('Por favor selecciona una fecha');
    } else {
      console.log('Buscando viajes para:', selectedDate);
    }
  };

  const handleSelectDestino = (destino) => {
    console.log('Destino seleccionado:', destino);
    setSelectedDestino(destino);
    setMostrarSelectorDestinos(false);
  };

  return (
    <div className="compra-entradas-page">
      <EncabezadoPrincipal 
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToPromociones}
        onHistorialClick={onSwitchToHistorial}
        onNuestroServicio={onNuestroServicio}
      />

      <div className="compra-hero">
        <img 
          src="/images/iniciar seccion.jpg" 
          alt="Bus Banner" 
          className="banner-bus"
        />
      </div>

      <div className="compra-container">
        <div className="pasos-compra">
          <div className="paso">
            <div className="numero-paso">1</div>
            <p>Elige tu viaje de ida y vuelta</p>
          </div>
          <div className="paso">
            <div className="numero-paso">2</div>
            <p>Selecciona Asientos</p>
          </div>
          <div className="paso">
            <div className="numero-paso">3</div>
            <p>Registra tus datos</p>
          </div>
          <div className="paso">
            <div className="numero-paso">4</div>
            <p>¡Recibe pagos!</p>
          </div>
        </div>

        <div className="filtros-viajes">
          <div className="filtro-grupo">
            <label>Destino:</label>
            <button 
              className="btn-selector-destino"
              onClick={() => setMostrarSelectorDestinos(true)}
            >
              {selectedDestino ? selectedDestino.nombre : '📍 Selecciona un destino'}
            </button>
          </div>

          <div className="filtro-grupo">
            <label>
              <input 
                type="radio" 
                value="ida" 
                checked={tripType === 'ida'}
                onChange={(e) => setTripType(e.target.value)}
              />
              Solo Ida
            </label>
            <label>
              <input 
                type="radio" 
                value="ida-vuelta" 
                checked={tripType === 'ida-vuelta'}
                onChange={(e) => setTripType(e.target.value)}
              />
              Ida y Vuelta
            </label>
          </div>

          <div className="filtro-grupo">
            <label>Fecha de Salida:</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-fecha"
            />
          </div>

          {tripType === 'ida-vuelta' && (
            <div className="filtro-grupo">
              <label>Fecha de Retorno:</label>
              <input 
                type="date" 
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="input-fecha"
              />
            </div>
          )}

          <button className="btn-buscar-viajes" onClick={handleBuscar}>
            BUSCAR VIAJES
          </button>
        </div>

        <div className="viajes-disponibles">
          <h2>Viajes Disponibles</h2>
          <div className="grid-viajes">
            {rutasDisponibles.map(ruta => (
              <div key={ruta.id} className="tarjeta-viaje">
                <div className="viaje-imagen">
                  <img src={ruta.imagen} alt={`${ruta.origen} - ${ruta.destino}`} />
                </div>
                <div className="viaje-ruta">
                  <div className="ciudad-origen">
                    <span className="icono">🚌</span>
                    <span className="nombre">{ruta.origen}</span>
                  </div>
                  <div className="flecha">→</div>
                  <div className="ciudad-destino">
                    <span className="nombre">{ruta.destino}</span>

                  </div>
                </div>
                <div className="viaje-info">
                  <div className="info-item">
                    <span className="label">Salida:</span>
                    <span className="valor">{ruta.horaSalida}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Llegada:</span>
                    <span className="valor">{ruta.horaLlegada}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Duración:</span>
                    <span className="valor">{ruta.duracion}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Asientos:</span>
                    <span className="valor">{ruta.asientosDisponibles}</span>
                  </div>
                </div>
                <div className="viaje-precio">
                  <span className="currency">S/.</span>
                  <span className="monto">{ruta.precio}</span>
                </div>
                <button 
                  className="btn-seleccionar"
                  onClick={() => onSelectAsientos(selectedDate, ruta)}
                >
                  SELECCIONAR
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {mostrarSelectorDestinos && (
        <SelectorDestinos 
          onSelectDestino={handleSelectDestino}
          onClose={() => setMostrarSelectorDestinos(false)}
        />
      )}

      <ChatAssistant page="compra-entradas" />
    </div>
  );
}
