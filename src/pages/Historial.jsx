import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/Historial.css';

export default function Historial({ usuarioLogueado, onSwitchToLogin, onSwitchToHome, onSwitchToPromociones, onSwitchToHistorial, onNuestroServicio, onLogout, historialCompras = [] }) {
  const [filtrosActivos, setFiltrosActivos] = useState({
    paisajes: false,
    horaSalida: false,
    horaLlegada: false,
    asientos: false,
    servicios: false,
    lugarViaje: false
  });

  const viajes = historialCompras.length > 0 
    ? historialCompras.map((compra, idx) => ({
        id: idx,
        tipo: 'Transporte en Bus',
        horaSalida: compra.viaje.horaSalida,
        servicio: compra.servicio,
        asientos: compra.asientos.join(', '),
        ruta: `${compra.viaje.origen} - ${compra.viaje.destino}`,
        numeroReserva: compra.numeroReserva,
        estado: compra.estado,
        fecha: compra.viaje.fecha,
        pasajero: compra.pasajero.nombres + ' ' + compra.pasajero.apellidos,
        total: compra.detalles.total
      }))
    : [];

  const handleFiltro = (filtro) => {
    setFiltrosActivos(prev => ({
      ...prev,
      [filtro]: !prev[filtro]
    }));
  };

  return (
    <div className="historial-page">
      <EncabezadoPrincipal 
        usuarioLogueado={usuarioLogueado}
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToPromociones}
        onHistorialClick={() => {}}
        onNuestroServicio={onNuestroServicio}
        onLogout={onLogout}
      />

      <div className="historial-container">
        <button className="btn-volver-historial" onClick={onSwitchToHome}>← Volver a Inicio</button>

        <div className="historial-contenido">
          <aside className="filtros-sidebar">
            <h2 className="filtros-titulo">DETALLES:</h2>
            
            <div className="filtro-grupo">
              <label className="filtro-item">
                <input 
                  type="checkbox" 
                  className="filtro-checkbox"
                  checked={filtrosActivos.paisajes}
                  onChange={() => handleFiltro('paisajes')}
                />
                <span className="filtro-label">PAISAJES</span>
              </label>
              
              <label className="filtro-item">
                <input 
                  type="checkbox" 
                  className="filtro-checkbox"
                  checked={filtrosActivos.horaSalida}
                  onChange={() => handleFiltro('horaSalida')}
                />
                <span className="filtro-label">HORA DE SALIDA</span>
              </label>
              
              <label className="filtro-item">
                <input 
                  type="checkbox" 
                  className="filtro-checkbox"
                  checked={filtrosActivos.horaLlegada}
                  onChange={() => handleFiltro('horaLlegada')}
                />
                <span className="filtro-label">HORA DE LLEGADA</span>
              </label>
              
              <label className="filtro-item">
                <input 
                  type="checkbox" 
                  className="filtro-checkbox"
                  checked={filtrosActivos.asientos}
                  onChange={() => handleFiltro('asientos')}
                />
                <span className="filtro-label">ASIENTOS</span>
              </label>
              
              <label className="filtro-item">
                <input 
                  type="checkbox" 
                  className="filtro-checkbox"
                  checked={filtrosActivos.servicios}
                  onChange={() => handleFiltro('servicios')}
                />
                <span className="filtro-label">SERVICIOS</span>
              </label>
              
              <label className="filtro-item">
                <input 
                  type="checkbox" 
                  className="filtro-checkbox"
                  checked={filtrosActivos.lugarViaje}
                  onChange={() => handleFiltro('lugarViaje')}
                />
                <span className="filtro-label">LUGAR DE VIAJE</span>
              </label>
            </div>

            <button className="btn-buscar">BUSCAR</button>
          </aside>

          <main className="viajes-grid">
            {viajes.length === 0 ? (
              <div className="sin-compras">
                <p>No tienes compras registradas aún</p>
                <p>Realiza una compra para verla aquí</p>
              </div>
            ) : (
              viajes.map((viaje) => (
                <div key={viaje.id} className="viaje-card">
                  <div className="viaje-item">
                    <span className="viaje-label">RESERVA</span>
                    <span className="viaje-valor">{viaje.numeroReserva}</span>
                  </div>

                  <div className="viaje-item">
                    <span className="viaje-label">PASAJERO</span>
                    <span className="viaje-valor">{viaje.pasajero}</span>
                  </div>

                  <div className="viaje-item">
                    <span className="viaje-label">RUTA</span>
                    <span className="viaje-valor">{viaje.ruta}</span>
                  </div>

                  <div className="viaje-item">
                    <span className="viaje-label">FECHA</span>
                    <span className="viaje-valor">{viaje.fecha}</span>
                  </div>

                  <div className="viaje-item">
                    <span className="viaje-label">HORA SALIDA</span>
                    <span className="viaje-valor">{viaje.horaSalida}</span>
                  </div>

                  <div className="viaje-item">
                    <span className="viaje-label">SERVICIO</span>
                    <span className="viaje-valor">{viaje.servicio}</span>
                  </div>

                  <div className="viaje-item">
                    <span className="viaje-label">ASIENTOS</span>
                    <span className="viaje-valor">{viaje.asientos}</span>
                  </div>

                  <div className="viaje-item">
                    <span className="viaje-label">ESTADO</span>
                    <span className="viaje-valor estado-badge">{viaje.estado}</span>
                  </div>

                  <div className="viaje-item">
                    <span className="viaje-label">TOTAL</span>
                    <span className="viaje-valor">S/. {viaje.total}</span>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>

      <ChatAssistant page="historial" />
    </div>
  );
}
