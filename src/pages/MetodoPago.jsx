import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/MetodoPago.css';

export default function MetodoPago({ onSwitchToLogin, onSwitchToHome, onSwitchToPromociones, onSwitchToHistorial, onNuestroServicio, onCompletarPago }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const metodosPago = [
    {
      id: 'visa',
      nombre: 'Visa',
      icon: '💳',
      color: '#1434CB'
    },
    {
      id: 'mastercard',
      nombre: 'Mastercard',
      icon: '💳',
      color: '#EB001B'
    },
    {
      id: 'paypal',
      nombre: 'PayPal',
      icon: '🔵',
      color: '#003087'
    }
  ];

  const handlePay = () => {
    if (!selectedPayment || !cardNumber || !cardHolder) {
      alert('Por favor completa todos los campos');
      return;
    }
    console.log('Procesando pago:', {
      metodo: selectedPayment,
      tarjeta: cardNumber,
      titular: cardHolder,
      codigo: promoCode
    });
    if (onCompletarPago) {
      onCompletarPago();
    }
  };

  return (
    <div className="metodo-pago-page">
      <EncabezadoPrincipal 
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToPromociones}
        onHistorialClick={onSwitchToHistorial}
        onNuestroServicio={onNuestroServicio}
      />

      <div className="pasos-progreso-pago">
        <div className="paso-item completado">
          <div className="numero-paso">1</div>
          <p>Destino-Fecha</p>
        </div>
        <div className="paso-item completado">
          <div className="numero-paso">2</div>
          <p>Selecciona asientos</p>
        </div>
        <div className="paso-item completado">
          <div className="numero-paso">3</div>
          <p>Registra datos</p>
        </div>
        <div className="paso-item activo">
          <div className="numero-paso">4</div>
          <p>Realiza pagos</p>
        </div>
      </div>

      <div className="pago-container">
        <h2>ELIGE TU METODO DE PAGO:</h2>

        <div className="tarjeta-pago">
          <div className="pago-header">
            <h3>METODOS DE PAGO</h3>
          </div>

          <div className="opciones-pago">
            {metodosPago.map(metodo => (
              <button
                key={metodo.id}
                className={`opcion-pago ${selectedPayment === metodo.id ? 'seleccionado' : ''}`}
                onClick={() => setSelectedPayment(metodo.id)}
                style={selectedPayment === metodo.id ? { backgroundColor: metodo.color } : {}}
              >
                <span className="icono-pago">{metodo.icon}</span>
                <span className="nombre-pago">{metodo.nombre}</span>
              </button>
            ))}
          </div>

          <div className="formulario-pago">
            <div className="grupo-input">
              <label>NUMERO DE TITULAR</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Nombre del titular"
                className="input-pago"
              />
            </div>

            <div className="grupo-input">
              <label>CODIGO PROMOCIONAL</label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Ingresa código (opcional)"
                className="input-pago"
              />
            </div>

            <div className="grupo-input">
              <label>NUMERO DE TARJETA A UTILIZAR</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="0000 0000 0000 0000"
                maxLength="19"
                className="input-pago"
              />
              <small className="hint">16 dígitos sin espacios</small>
            </div>
          </div>

          <button className="btn-completar-pago" onClick={handlePay}>
            COMPLETAR PAGO
          </button>
        </div>

        <div className="resumen-compra">
          <h3>Resumen de tu compra</h3>
          <div className="resumen-item">
            <span>2 Asientos</span>
            <span>S/. 170</span>
          </div>
          <div className="resumen-item">
            <span>Tarifa de servicio</span>
            <span>S/. 10</span>
          </div>
          <div className="resumen-total">
            <span>Total a pagar</span>
            <span>S/. 180</span>
          </div>
        </div>
      </div>

      <ChatAssistant page="metodo-pago" />
    </div>
  );
}
