import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/SelectAsientos.css';

export default function SelectAsientos({ onSwitchToLogin, onSwitchToHome, onSwitchToPromociones, onSwitchToHistorial, onNuestroServicio, selectedDate, selectedTravel, onContinuarDatos }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Mapa de asientos del bus
  const seatMap = [
    // Piso 1
    { id: 'A1', row: 'A', status: 'disponible' },
    { id: 'A2', row: 'A', status: 'disponible' },
    { id: 'A3', row: 'A', status: 'no-disponible' },
    { id: 'A4', row: 'A', status: 'disponible' },
    { id: 'A5', row: 'A', status: 'disponible' },
    { id: 'A6', row: 'A', status: 'no-disponible' },
    { id: 'A7', row: 'A', status: 'disponible' },
    { id: 'A8', row: 'A', status: 'disponible' },

    { id: 'B1', row: 'B', status: 'disponible' },
    { id: 'B2', row: 'B', status: 'disponible' },
    { id: 'B3', row: 'B', status: 'disponible' },
    { id: 'B4', row: 'B', status: 'disponible' },
    { id: 'B5', row: 'B', status: 'no-disponible' },
    { id: 'B6', row: 'B', status: 'disponible' },
    { id: 'B7', row: 'B', status: 'disponible' },
    { id: 'B8', row: 'B', status: 'disponible' },

    { id: 'C1', row: 'C', status: 'disponible' },
    { id: 'C2', row: 'C', status: 'disponible' },
    { id: 'C3', row: 'C', status: 'disponible' },
    { id: 'C4', row: 'C', status: 'disponible' },
    { id: 'C5', row: 'C', status: 'disponible' },
    { id: 'C6', row: 'C', status: 'disponible' },
    { id: 'C7', row: 'C', status: 'disponible' },
    { id: 'C8', row: 'C', status: 'no-disponible' },

    { id: 'D1', row: 'D', status: 'disponible' },
    { id: 'D2', row: 'D', status: 'disponible' },
    { id: 'D3', row: 'D', status: 'disponible' },
    { id: 'D4', row: 'D', status: 'no-disponible' },
    { id: 'D5', row: 'D', status: 'disponible' },
    { id: 'D6', row: 'D', status: 'disponible' },
    { id: 'D7', row: 'D', status: 'disponible' },
    { id: 'D8', row: 'D', status: 'disponible' },
  ];

  const handleSeatClick = (seatId, status) => {
    if (status === 'no-disponible') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatStatus = (seatId) => {
    if (selectedSeats.includes(seatId)) return 'seleccionado';
    const seat = seatMap.find(s => s.id === seatId);
    return seat?.status || 'disponible';
  };

  const totalPrice = selectedSeats.length * 85; // Precio por asiento

  return (
    <div className="select-asientos-page">
      <EncabezadoPrincipal 
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToPromociones}
        onHistorialClick={onSwitchToHistorial}
        onNuestroServicio={onNuestroServicio}
      />

      <div className="pasos-progreso">
        <div className="paso-item completado">
          <div className="numero-paso">1</div>
          <p>Destino-Fecha</p>
        </div>
        <div className="paso-item activo">
          <div className="numero-paso">2</div>
          <p>Selecciona asientos</p>
        </div>
        <div className="paso-item">
          <div className="numero-paso">3</div>
          <p>Registra datos</p>
        </div>
        <div className="paso-item">
          <div className="numero-paso">4</div>
          <p>Realiza pagos</p>
        </div>
      </div>

      <div className="asientos-container">
        <h2>ELIGE TU ASIENTO</h2>

        <div className="leyenda-asientos">
          <div className="leyenda-item">
            <div className="color no-disponible"></div>
            <span>NO DISPONIBLE</span>
          </div>
          <div className="leyenda-item">
            <div className="color disponible"></div>
            <span>DISPONIBLE</span>
          </div>
          <div className="leyenda-item">
            <div className="color seleccionado"></div>
            <span>RESERVA POR CONFIRMAR</span>
          </div>
        </div>

        <div className="mapa-asientos">
          {['A', 'B', 'C', 'D'].map(row => (
            <div key={row} className="fila-asientos">
              <div className="etiqueta-fila">{row}</div>
              <div className="grupo-asientos">
                {Array.from({ length: 4 }, (_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const seat = seatMap.find(s => s.id === seatId);
                  return (
                    <button
                      key={seatId}
                      className={`asiento ${getSeatStatus(seatId)}`}
                      onClick={() => handleSeatClick(seatId, seat?.status)}
                      disabled={seat?.status === 'no-disponible'}
                      title={seatId}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <span className="espacio-conductor"></span>
              <div className="grupo-asientos">
                {Array.from({ length: 4 }, (_, i) => {
                  const seatId = `${row}${i + 5}`;
                  const seat = seatMap.find(s => s.id === seatId);
                  return (
                    <button
                      key={seatId}
                      className={`asiento ${getSeatStatus(seatId)}`}
                      onClick={() => handleSeatClick(seatId, seat?.status)}
                      disabled={seat?.status === 'no-disponible'}
                      title={seatId}
                    >
                      {i + 5}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="resumen-asientos">
          <div className="asientos-seleccionados">
            <h3>Asientos Seleccionados:</h3>
            <p className="lista-asientos">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ninguno'}
            </p>
            <div className="cantidad-precio">
              <span>{selectedSeats.length} asiento(s)</span>
              <span className="precio-total">S/. {totalPrice}</span>
            </div>
          </div>
          <button 
            className="btn-continuar"
            disabled={selectedSeats.length === 0}
            onClick={onContinuarDatos}
          >
            CONTINUAR A DATOS
          </button>
        </div>
      </div>

      <ChatAssistant page="select-asientos" />
    </div>
  );
}
