export default function EncabezadoPrincipal({ usuarioLogueado, onUsuarioClick, onPromocionesClick, onHistorialClick, onNuestroServicio, onLogout }) {
  const handleHistorial = () => {
    if (onHistorialClick) {
      onHistorialClick();
    }
  };

  const handleNuestroServicio = () => {
    if (onNuestroServicio) {
      onNuestroServicio();
    }
  };

  return (
    <header className="header-principal">
      <div className="header-container">
        <div className="logo">
          <img src="/images/logo.jpeg" alt="Viale Code" className="logo-img" />
        </div>
        
        <nav className="nav-menu">
          <button 
            onClick={handleHistorial}
            className="nav-link"
            style={{ background: 'none', border: 'none', padding: '8px 12px', cursor: 'pointer', color: 'inherit', textDecoration: 'none', font: 'inherit' }}
          >
            Historial
          </button>
          <button 
            onClick={handleNuestroServicio}
            className="nav-link"
            style={{ background: 'none', border: 'none', padding: '8px 12px', cursor: 'pointer', color: 'inherit', textDecoration: 'none', font: 'inherit' }}
          >
            Nuestro Servicio
          </button>
          <a href="#destinos" className="nav-link">Destino</a>
          <button 
            onClick={onPromocionesClick}
            className="nav-link"
            style={{ background: 'none', border: 'none', padding: '8px 12px', cursor: 'pointer', color: 'inherit', textDecoration: 'none', font: 'inherit' }}
          >
            Promociones
          </button>
        </nav>

        {usuarioLogueado ? (
          <div className="usuario-info">
            <span className="nombre-usuario">{usuarioLogueado}</span>
            <button className="btn-logout" onClick={onLogout}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <button className="btn-usuario" onClick={onUsuarioClick}>
            Iniciar Sesión
          </button>
        )}
      </div>
    </header>
  );
}
