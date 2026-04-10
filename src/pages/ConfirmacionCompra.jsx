import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/ConfirmacionCompra.css';

export default function ConfirmacionCompra({ onSwitchToLogin, onSwitchToHome, onSwitchToPromociones, onSwitchToHistorial, onNuestroServicio, onAgregarAlHistorial }) {
  const [confirmacionData] = useState({
    numeroReserva: 'VLC-2024-001542',
    estado: 'CONFIRMADO',
    codigoQR: 'VLC20240015421234567890',
    fechaCompra: new Date().toLocaleDateString('es-PE'),
    horaCompra: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
    viaje: {
      origen: 'LIMA',
      destino: 'CUSCO',
      fecha: '15 de Abril de 2026',
      horaSalida: '08:00 AM',
      horaLlegada: '08:00 PM',
      duracion: '12 horas',
      distancia: '1,150 km',
      terminal: {
        origen: 'Terminal Central Lima - Avenida 28 de Julio #1250',
        destino: 'Terminal Cusco - Plaza de Armas'
      }
    },
    paradasIntermedias: [
      { ciudad: 'Ica', hora: '11:30 AM', distancia: '300 km' },
      { ciudad: 'Nazca', hora: '01:30 PM', distancia: '600 km' },
      { ciudad: 'Arequipa', hora: '05:00 PM', distancia: '950 km' }
    ],
    pasajero: {
      nombres: 'Juan',
      apellidos: 'Pérez García',
      dni: '12345678',
      email: 'juan.perez@email.com',
      genero: 'Masculino',
      telefono: '+51 987 654 321'
    },
    asientos: ['A2', 'A3'],
    servicio: 'SERVICIO PREMIUM',
    numeroRemis: 'BVL-2024-5847',
    detalles: {
      asientos: 2,
      precioUnitario: 85,
      subtotal: 170,
      impuesto: 12.60,
      tarifa: 10,
      total: 192.60
    }
  });

  const [showModal, setShowModal] = useState(null);
  const [verDetallesTerminal, setVerDetallesTerminal] = useState(false);

  const handleIrHistorial = () => {
    if (onAgregarAlHistorial) {
      onAgregarAlHistorial(confirmacionData);
    }
    onSwitchToHistorial();
  };

  return (
    <div className="confirmacion-compra-page">
      <EncabezadoPrincipal 
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToPromociones}
        onHistorialClick={onSwitchToHistorial}
        onNuestroServicio={onNuestroServicio}
      />

      <div className="confirmacion-hero">
        <div className="confirmacion-exitosa">
          <div className="icono-exitoso">✓</div>
          <h1>¡COMPRA CONFIRMADA!</h1>
          <p>Tu boleto ha sido registrado exitosamente en nuestro sistema</p>
        </div>
      </div>

      <div className="confirmacion-container">
        {/* NÚMERO DE RESERVA */}
        <div className="numero-reserva-grande">
          <h2>{confirmacionData.numeroReserva}</h2>
          <p>Estado: <span className="estado-badge">{confirmacionData.estado}</span></p>
          <p className="numero-remis">Remis: {confirmacionData.numeroRemis}</p>
          <p className="fecha-hora-compra">
            Comprado: {confirmacionData.fechaCompra} a las {confirmacionData.horaCompra}
          </p>
        </div>

        {/* DETALLE DEL VIAJE */}
        <div className="seccion-confirmacion viaje-seccion">
          <h3>RUTA Y HORARIOS</h3>
          <div className="tarjeta-viaje-confirmacion">
            <div className="viaje-header-grande">
              <div className="ruta-grande">
                <div className="ciudad-info">
                  <span className="label-ciudad">SALIDA</span>
                  <span className="nombre-ciudad">{confirmacionData.viaje.origen}</span>
                  <span className="terminal-info">{confirmacionData.viaje.horaSalida}</span>
                </div>
                <div className="flecha-viaje">✈️</div>
                <div className="ciudad-info">
                  <span className="label-ciudad">LLEGADA</span>
                  <span className="nombre-ciudad">{confirmacionData.viaje.destino}</span>
                  <span className="terminal-info">{confirmacionData.viaje.horaLlegada}</span>
                </div>
              </div>
            </div>
            
            <div className="viaje-detalles-grid">
              <div className="detalle-item">
                <span className="icon">📅</span>
                <span className="label">Fecha de Viaje:</span>
                <span className="valor">{confirmacionData.viaje.fecha}</span>
              </div>
              <div className="detalle-item">
                <span className="icon">⏱️</span>
                <span className="label">Duración:</span>
                <span className="valor">{confirmacionData.viaje.duracion}</span>
              </div>
              <div className="detalle-item">
                <span className="icon">📏</span>
                <span className="label">Distancia:</span>
                <span className="valor">{confirmacionData.viaje.distancia}</span>
              </div>
              <div className="detalle-item">
                <span className="icon">🚌</span>
                <span className="label">Servicio:</span>
                <span className="valor-badge">{confirmacionData.servicio}</span>
              </div>
            </div>

            {/* Botón para ver detalles de terminales */}
            <button 
              className="btn-mas-detalles"
              onClick={() => setVerDetallesTerminal(!verDetallesTerminal)}
            >
              {verDetallesTerminal ? '🔼 Ocultar detalles de terminales' : '🔽 Ver detalles de terminales'}
            </button>

            {verDetallesTerminal && (
              <div className="detalles-terminales">
                <div className="terminal-detalle">
                  <strong>🏢 Terminal de Salida:</strong>
                  <p>{confirmacionData.viaje.terminal.origen}</p>
                </div>
                <div className="terminal-detalle">
                  <strong>🏢 Terminal de Llegada:</strong>
                  <p>{confirmacionData.viaje.terminal.destino}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PARADAS INTERMEDIAS */}
        <div className="seccion-confirmacion paradas-seccion">
          <h3>🛣️ PARADAS INTERMEDIAS</h3>
          <div className="timeline-viaje">
            {confirmacionData.paradasIntermedias.map((parada, idx) => (
              <div key={idx} className="parada-item">
                <div className="parada-marker"></div>
                <div className="parada-info">
                  <span className="parada-ciudad">{parada.ciudad}</span>
                  <span className="parada-hora">{parada.hora}</span>
                  <span className="parada-distancia">({parada.distancia})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOS COLUMNAS: DATOS DEL PASAJERO Y ASIENTOS */}
        <div className="dos-columnas">
          <div className="seccion-confirmacion">
            <h3>DATOS DEL PASAJERO</h3>
            <div className="tarjeta-datos">
              <div className="dato-item">
                <span className="label">Nombres:</span>
                <span className="valor">{confirmacionData.pasajero.nombres}</span>
              </div>
              <div className="dato-item">
                <span className="label">Apellidos:</span>
                <span className="valor">{confirmacionData.pasajero.apellidos}</span>
              </div>
              <div className="dato-item">
                <span className="label">DNI:</span>
                <span className="valor">{confirmacionData.pasajero.dni}</span>
              </div>
              <div className="dato-item">
                <span className="label">Email:</span>
                <span className="valor">{confirmacionData.pasajero.email}</span>
              </div>
              <div className="dato-item">
                <span className="label">Teléfono:</span>
                <span className="valor">{confirmacionData.pasajero.telefono}</span>
              </div>
              <div className="dato-item">
                <span className="label">Género:</span>
                <span className="valor">{confirmacionData.pasajero.genero}</span>
              </div>
            </div>
            <button 
              className="btn-modificar"
              onClick={() => setShowModal('datos')}
            >
              ✏️ Modificar Datos
            </button>
          </div>

          <div className="seccion-confirmacion">
            <h3>🎫 ASIENTOS RESERVADOS</h3>
            <div className="tarjeta-asientos">
              <div className="asientos-container-confirmacion">
                {confirmacionData.asientos.map((asiento, idx) => (
                  <div key={idx} className="asiento-confirmado-grande">
                    <span className="numero-asiento">{asiento}</span>
                  </div>
                ))}
              </div>
              <p className="total-asientos">Total: {confirmacionData.asientos.length} asiento(s)</p>
              <button 
                className="btn-modificar"
                onClick={() => setShowModal('asientos')}
              >
                🔄 Cambiar Asientos
              </button>
            </div>
          </div>
        </div>

        {/* RESUMEN DE PAGO DETALLADO */}
        <div className="seccion-confirmacion resumen-pago-avanzado">
          <h3>💰 RESUMEN DE PAGO DETALLADO</h3>
          <div className="tarjeta-pago-resumen">
            <div className="item-pago">
              <span className="concepto">{confirmacionData.detalles.asientos} Asiento(s) x S/. {confirmacionData.detalles.precioUnitario}</span>
              <span className="monto">S/. {confirmacionData.detalles.subtotal}</span>
            </div>
            <div className="item-pago">
              <span className="concepto">Impuesto (IGV 8%)</span>
              <span className="monto">S/. {confirmacionData.detalles.impuesto}</span>
            </div>
            <div className="item-pago">
              <span className="concepto">Tarifa de Servicio</span>
              <span className="monto">S/. {confirmacionData.detalles.tarifa}</span>
            </div>
            <div className="item-pago total">
              <span className="concepto">TOTAL A PAGAR</span>
              <span className="monto">S/. {confirmacionData.detalles.total}</span>
            </div>
          </div>
        </div>

        {/* ACCIONES AVANZADAS */}
        <div className="acciones-confirmacion-avanzada">
          <button className="btn-historial" onClick={handleIrHistorial}>
            📋 MIS COMPRAS
          </button>
          <button 
            className="btn-cancelar"
            onClick={() => setShowModal('cancelar')}
          >
            ❌ CANCELAR RESERVA
          </button>
          <button className="btn-inicio" onClick={onSwitchToHome}>
            🏠 VOLVER AL INICIO
          </button>
        </div>

        {/* AVISO IMPORTANTE */}
        <div className="aviso-importante">
          <p><strong>⚠️ IMPORTANTE:</strong> Conserva tu número de reserva <strong>{confirmacionData.numeroReserva}</strong>. Llega 30 minutos antes de la salida. No se permiten reembolsos dentro de 24 horas del viaje.</p>
        </div>
      </div>

      {/* MODALES */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {showModal === 'datos' && (
              <>
                <h2>Modificar Datos del Pasajero</h2>
                <div className="modal-form">
                  <input type="text" placeholder="Nombres" defaultValue={confirmacionData.pasajero.nombres} />
                  <input type="text" placeholder="Apellidos" defaultValue={confirmacionData.pasajero.apellidos} />
                  <input type="email" placeholder="Email" defaultValue={confirmacionData.pasajero.email} />
                  <input type="tel" placeholder="Teléfono" defaultValue={confirmacionData.pasajero.telefono} />
                  <button className="btn-guardar">Guardar Cambios</button>
                  <button className="btn-cerrar" onClick={() => setShowModal(null)}>Cancelar</button>
                </div>
              </>
            )}
            
            {showModal === 'asientos' && (
              <>
                <h2>Cambiar Asientos</h2>
                <div className="modal-form">
                  <p>Selecciona los nuevos asientos:</p>
                  <div className="asientos-disponibles">
                    {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'].map(seat => (
                      <button key={seat} className={`asiento-opcion ${confirmacionData.asientos.includes(seat) ? 'seleccionado' : ''}`}>
                        {seat}
                      </button>
                    ))}
                  </div>
                  <button className="btn-guardar">Cambiar Asientos</button>
                  <button className="btn-cerrar" onClick={() => setShowModal(null)}>Cancelar</button>
                </div>
              </>
            )}

            {showModal === 'cancelar' && (
              <>
                <h2>Cancelar Reserva</h2>
                <div className="modal-form">
                  <p>⚠️ ¿Estás seguro de que deseas cancelar esta reserva?</p>
                  <p>Se te devolverá: <strong>S/. 180.60</strong> (menos comisión de cancelación: S/. 20)</p>
                  <p>El reembolso se procesará en 3-5 días hábiles.</p>
                  <button className="btn-cancelar-si">Confirmar Cancelación</button>
                  <button className="btn-cerrar" onClick={() => setShowModal(null)}>No, Mantener Reserva</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <ChatAssistant page="confirmacion-compra" />
    </div>
  );
}
