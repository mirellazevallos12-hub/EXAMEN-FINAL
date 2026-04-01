import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import BannerPrincipal from '../components/BannerPrincipal';
import FormularioBusqueda from '../components/FormularioBusqueda';
import ServiciosHome from '../components/ServiciosHome';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/Home.css';
import '../styles/ServiciosHome.css';
import '../styles/Promociones.css';

export default function Home({ usuarioLogueado, onSwitchToLogin, onSwitchToPromociones, onSwitchToHistorial, onLogout, onViewServiceDetail, onComprarDesdeHome }) {
  const handleNuestroServicio = () => {
    const element = document.getElementById('servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [viajesDestacados] = useState([
    {
      id: 1,
      origen: 'LIMA',
      destino: 'CUSCO',
      fecha: 'Hoy',
      horaSalida: '08:00 AM',
      horaLlegada: '08:00 PM',
      duracion: '12 h',
      precio: 85,
      asientosDisponibles: 12,
      imagen: '/images/machu picchu.jpg'
    },
    {
      id: 2,
      origen: 'LIMA',
      destino: 'AREQUIPA',
      fecha: 'Mañana',
      horaSalida: '10:30 AM',
      horaLlegada: '06:00 PM',
      duracion: '8 h',
      precio: 65,
      asientosDisponibles: 8,
      imagen: '/images/arequipa.webp'
    },
    {
      id: 3,
      origen: 'LIMA',
      destino: 'TRUJILLO',
      fecha: '02 Abril',
      horaSalida: '11:00 PM',
      horaLlegada: '07:00 AM',
      duracion: '8 h',
      precio: 55,
      asientosDisponibles: 15,
      imagen: '/images/trujillo.jpeg'
    },
    {
      id: 4,
      origen: 'LIMA',
      destino: 'PIURA',
      fecha: '03 Abril',
      horaSalida: '06:00 PM',
      horaLlegada: '12:00 AM',
      duracion: '6 h',
      precio: 45,
      asientosDisponibles: 20,
      imagen: '/images/piura.jpg'
    }
  ]);

  const [viajesPromocion] = useState([
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
    }
  ]);

  return (
    <div className="home-page">
      <EncabezadoPrincipal 
        usuarioLogueado={usuarioLogueado}
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToPromociones}
        onHistorialClick={onSwitchToHistorial}
        onNuestroServicio={handleNuestroServicio}
        onLogout={onLogout}
      />
      <BannerPrincipal />
      <FormularioBusqueda />

      {/* VIAJES DESTACADOS */}
      <section className="viajes-destacados-section">
        <div className="container">
          <h2>Viajes Destacados de Hoy</h2>
          <p className="subtitle">Los mejores viajes disponibles en este momento</p>
          <div className="viajes-grid">
            {viajesDestacados.map(viaje => (
              <div key={viaje.id} className="viaje-card-home">
                <div className="viaje-imagen" style={{ backgroundImage: `url(${viaje.imagen})` }}>
                  <span className="precio-viaje">S/. {viaje.precio}</span>
                </div>
                <div className="viaje-info">
                  <div className="ruta-compacta">
                    <span className="origen">{viaje.origen}</span>
                    <span className="flecha-home">→</span>
                    <span className="destino">{viaje.destino}</span>
                  </div>
                  <p className="fecha-viaje">{viaje.fecha}</p>
                  <div className="horarios">
                    <span className="salida">Salida: {viaje.horaSalida}</span>
                    <span className="duracion">{viaje.duracion}</span>
                  </div>
                  <p className="asientos-disponibles">
                    {viaje.asientosDisponibles} asientos disponibles
                  </p>
                  <button 
                    className="btn-compra-home"
                    onClick={() => onComprarDesdeHome(viaje)}
                  >
                    COMPRAR AHORA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOCIONES ESPECIALES */}
      <section className="viajes-descuento-section">
        <div className="container-promo">
          <h2 className="section-title">Ofertas Limitadas - Compra Ahora</h2>
          <div className="viajes-descuento-grid">
            {viajesPromocion.map(viaje => (
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
                    onClick={() => onComprarDesdeHome(viaje)}
                  >
                    COMPRAR CON DESCUENTO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiciosHome onViewServiceDetail={onViewServiceDetail} />
      <ChatAssistant page="home" />
    </div>
  );
}
