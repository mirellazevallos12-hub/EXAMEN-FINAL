import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/Home.css';
import '../styles/Promociones.css';

export default function Promociones({ usuarioLogueado, onSwitchToLogin, onSwitchToHome, onSwitchToHistorial, onNuestroServicio, onLogout, onComprarDesdePromociones }) {
  const [viajesDescuento] = useState([
    {
      id: 201,
      origen: 'LIMA',
      destino: 'CUSCO',
      precioOriginal: 150,
      precioPromocion: 99,
      descuento: 34,
      duracion: '12 h',
      horaSalida: '08:00 AM',
      asientosDisponibles: 20,
      imagen: '/images/machu picchu.jpg',
      codigo: 'VIAJA2024',
      descripcion: 'Viaje directo a Cusco con todas las comodidades'
    },
    {
      id: 202,
      origen: 'LIMA',
      destino: 'PUNO',
      precioOriginal: 120,
      precioPromocion: 79,
      descuento: 34,
      duracion: '14 h',
      horaSalida: '10:00 PM',
      asientosDisponibles: 15,
      imagen: '/images/puno.jpg',
      codigo: 'PROMO24',
      descripcion: 'Llega cómodo a Puno con nuestro servicio premium'
    },
    {
      id: 203,
      origen: 'LIMA',
      destino: 'AREQUIPA',
      precioOriginal: 100,
      precioPromocion: 65,
      descuento: 35,
      duracion: '8 h',
      horaSalida: '11:00 AM',
      asientosDisponibles: 25,
      imagen: '/images/arequipa.webp',
      codigo: 'DESCUENTO35',
      descripcion: 'La mejor oferta a Arequipa este mes'
    },
    {
      id: 204,
      origen: 'LIMA',
      destino: 'TRUJILLO',
      precioOriginal: 80,
      precioPromocion: 49,
      descuento: 39,
      duracion: '8 h',
      horaSalida: '11:00 PM',
      asientosDisponibles: 30,
      imagen: '/images/trujillo.jpeg',
      codigo: 'SUPER39',
      descripcion: 'Super oferta con el mejor descuento del mes'
    }
  ]);

  return (
    <div className="promociones-page">
      <EncabezadoPrincipal 
        usuarioLogueado={usuarioLogueado}
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={() => {}}
        onHistorialClick={onSwitchToHistorial}
        onNuestroServicio={onNuestroServicio}
        onLogout={onLogout}
      />
      <div className="promociones-header">
        <h1>Promociones Especiales Viajero</h1>
        <p>Disfruta de nuestras mejores ofertas en boletos de autobús con descuentos increíbles</p>
      </div>

      {/* FORMULARIO DE BÚSQUEDA */}
      <div className="formulario-busqueda-container">
        <form className="formulario-busqueda">
          <div className="titulo-formulario">
            <h3>COMPRA TU PASAJE</h3>
          </div>
          <div className="campos-formulario">
            <div className="campo">
              <label>Origen</label>
              <input type="text" className="input-campo" value="LIMA" readOnly />
            </div>
            <div className="campo">
              <label>Destino</label>
              <select className="input-campo">
                <option>Seleccionar</option>
                <option>CUSCO</option>
                <option>PUNO</option>
                <option>AREQUIPA</option>
                <option>TRUJILLO</option>
              </select>
            </div>
            <div className="campo">
              <label>Fecha Salida</label>
              <input type="date" className="input-campo" />
            </div>
            <div className="campo">
              <label>Fecha Retorno</label>
              <input type="date" className="input-campo" />
            </div>
            <div className="campo">
              <label>Nº Pasajeros</label>
              <select className="input-campo">
                <option>1 pasajero</option>
                <option>2 pasajeros</option>
                <option>3 pasajeros</option>
                <option>4 pasajeros</option>
                <option>5 pasajeros</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-buscar">BUSCAR PROMOCIONES</button>
        </form>
      </div>

      {/* VIAJES CON DESCUENTO DISPONIBLES */}
      <section className="viajes-descuento-section">
        <div className="container-promo">
          <h2 className="section-title">Ofertas Limitadas - Compra Ahora</h2>
          <div className="viajes-descuento-grid">
            {viajesDescuento.map(viaje => (
              <div key={viaje.id} className="viaje-descuento-card">
                <div className="viaje-desc-imagen">
                  <img src={viaje.imagen} alt={`${viaje.origen} - ${viaje.destino}`} />
                  <div className="badge-descuento-grande">
                    <span className="porcentaje">-{viaje.descuento}%</span>
                  </div>
                </div>
                <div className="viaje-desc-contenido">
                  <h3 className="ruta-desc">{viaje.origen} → {viaje.destino}</h3>
                  <p className="descripcion-viaje">{viaje.descripcion}</p>
                  
                  <div className="detalles-viaje">
                    <div className="detalle-item">
                      <span>Salida: {viaje.horaSalida}</span>
                    </div>
                    <div className="detalle-item">
                      <span>Duración: {viaje.duracion}</span>
                    </div>
                    <div className="detalle-item">
                      <span>Disponibles: {viaje.asientosDisponibles}</span>
                    </div>
                  </div>

                  <div className="precios-descuento">
                    <div className="precio-antes">
                      <span className="label">Antes:</span>
                      <span className="valor">S/. {viaje.precioOriginal}</span>
                    </div>
                    <div className="precio-ahora">
                      <span className="label">Ahora:</span>
                      <span className="valor">S/. {viaje.precioPromocion}</span>
                    </div>
                  </div>

                  <p className="codigo-canje">Código: <strong>{viaje.codigo}</strong></p>

                  <button 
                    className="btn-compra-desc"
                    onClick={() => onComprarDesdePromociones(viaje)}
                  >
                    COMPRAR CON DESCUENTO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ChatAssistant page="promociones" />
    </div>
  );
}
