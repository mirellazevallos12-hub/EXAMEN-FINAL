import { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Promociones from './pages/Promociones';
import DetallesPromocion from './pages/DetallesPromocion';
import DetallesServicio from './pages/DetallesServicio';
import CompraEntradas from './pages/CompraEntradas';
import SelectAsientos from './pages/SelectAsientos';
import RegistroDatos from './pages/RegistroDatos';
import MetodoPago from './pages/MetodoPago';
import ConfirmacionCompra from './pages/ConfirmacionCompra';
import Historial from './pages/Historial';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    'linear-gradient(135deg, #ff9900 0%, #8b4513 50%, #2c3e50 100%)'
  );
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const usuario = localStorage.getItem('usuarioLogueado');
    return usuario ? JSON.parse(usuario) : null;
  });
  const [historialCompras, setHistorialCompras] = useState([]);
  
  // Restaurar sesión desde localStorage al cargar
  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogueado');
    if (usuario) {
      setUsuarioLogueado(JSON.parse(usuario));
    }
  }, []);
  
  const handleAgregarAlHistorial = (compra) => {
    setHistorialCompras(prev => [compra, ...prev]);
  };
  
  const handleLogout = () => {
    setUsuarioLogueado(null);
    localStorage.removeItem('usuarioLogueado');
    setCurrentPage('home');
  };

  if (currentPage === 'home') {
    return (
      <Home 
        usuarioLogueado={usuarioLogueado}
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToPromociones={() => setCurrentPage('promociones')}
        onSwitchToHistorial={() => setCurrentPage('historial')}
        onLogout={handleLogout}
        onViewPromotionDetail={(promo) => {
          setSelectedPromotion(promo);
          setCurrentPage('detalles');
        }}
        onViewServiceDetail={(service) => {
          setSelectedService(service);
          setCurrentPage('detalles-servicio');
        }}
        onComprarDesdeHome={(viaje) => {
          setSelectedDate(viaje.fecha);
          setSelectedTravel(viaje);
          setCurrentPage('compra-entradas');
        }}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <Login 
        onSwitchToRegister={() => setCurrentPage('register')}
        onSwitchToHome={() => setCurrentPage('home')}
        backgroundImage={backgroundImage}
        onImageChange={setBackgroundImage}
        onUsuarioLogueado={setUsuarioLogueado}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <Register 
        onSwitchToLogin={() => setCurrentPage('login')}
        backgroundImage={backgroundImage}
        onImageChange={setBackgroundImage}
      />
    );
  }

  if (currentPage === 'promociones') {
    return (
      <Promociones 
        usuarioLogueado={usuarioLogueado}
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToHome={() => setCurrentPage('home')}
        onSwitchToHistorial={() => setCurrentPage('historial')}
        onNuestroServicio={() => setCurrentPage('home')}
        onLogout={handleLogout}
        onViewPromotionDetail={(promo) => {
          setSelectedPromotion(promo);
          setCurrentPage('detalles');
        }}
        onComprarDesdePromociones={(viaje) => {
          setSelectedDate(viaje.fecha || 'Promocion');
          setSelectedTravel(viaje);
          setCurrentPage('compra-entradas');
        }}
      />
    );
  }

  if (currentPage === 'detalles') {
    return (
      <DetallesPromocion 
        promotion={selectedPromotion}
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToPromociones={() => setCurrentPage('promociones')}
        onNuestroServicio={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'detalles-servicio') {
    return (
      <DetallesServicio 
        service={selectedService}
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToHome={() => setCurrentPage('home')}
        onNuestroServicio={() => setCurrentPage('home')}
        onComprar={() => setCurrentPage('compra-entradas')}
      />
    );
  }

  if (currentPage === 'compra-entradas') {
    return (
      <CompraEntradas 
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToHome={() => setCurrentPage('home')}
        onSwitchToPromociones={() => setCurrentPage('promociones')}
        onSwitchToHistorial={() => setCurrentPage('historial')}
        onNuestroServicio={() => setCurrentPage('home')}
        onSelectAsientos={(date, travel) => {
          setSelectedDate(date);
          setSelectedTravel(travel);
          setCurrentPage('compra-entradas-asientos');
        }}
      />
    );
  }

  if (currentPage === 'compra-entradas-asientos') {
    return (
      <SelectAsientos 
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToHome={() => setCurrentPage('home')}
        onSwitchToPromociones={() => setCurrentPage('promociones')}
        onSwitchToHistorial={() => setCurrentPage('historial')}
        onNuestroServicio={() => setCurrentPage('home')}
        selectedDate={selectedDate}
        selectedTravel={selectedTravel}
        onContinuarDatos={() => setCurrentPage('registro-datos')}
      />
    );
  }

  if (currentPage === 'registro-datos') {
    return (
      <RegistroDatos 
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToHome={() => setCurrentPage('home')}
        onSwitchToPromociones={() => setCurrentPage('promociones')}
        onSwitchToHistorial={() => setCurrentPage('historial')}
        onNuestroServicio={() => setCurrentPage('home')}
        onContinuarPago={() => setCurrentPage('metodo-pago')}
      />
    );
  }

  if (currentPage === 'metodo-pago') {
    return (
      <MetodoPago 
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToHome={() => setCurrentPage('home')}
        onSwitchToPromociones={() => setCurrentPage('promociones')}
        onSwitchToHistorial={() => setCurrentPage('historial')}
        onNuestroServicio={() => setCurrentPage('home')}
        onCompletarPago={() => setCurrentPage('confirmacion-compra')}
      />
    );
  }

  if (currentPage === 'confirmacion-compra') {
    return (
      <ConfirmacionCompra 
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToHome={() => setCurrentPage('home')}
        onSwitchToPromociones={() => setCurrentPage('promociones')}
        onSwitchToHistorial={() => setCurrentPage('historial')}
        onNuestroServicio={() => setCurrentPage('home')}
        onAgregarAlHistorial={handleAgregarAlHistorial}
      />
    );
  }

  if (currentPage === 'historial') {
    return (
      <Historial 
        usuarioLogueado={usuarioLogueado}
        onSwitchToLogin={() => setCurrentPage('login')}
        onSwitchToHome={() => setCurrentPage('home')}
        onSwitchToPromociones={() => setCurrentPage('promociones')}
        onSwitchToHistorial={() => setCurrentPage('historial')}
        onNuestroServicio={() => setCurrentPage('home')}
        onLogout={handleLogout}
        historialCompras={historialCompras}
      />
    );
  }

  return (
    <Home 
      onSwitchToLogin={() => setCurrentPage('login')}
      onSwitchToPromociones={() => setCurrentPage('promociones')}
      onSwitchToHistorial={() => setCurrentPage('historial')}
      onViewPromotionDetail={(promo) => {
        setSelectedPromotion(promo);
        setCurrentPage('detalles');
      }}
      onViewServiceDetail={(service) => {
        setSelectedService(service);
        setCurrentPage('detalles-servicio');
      }}
      onComprarDesdeHome={(viaje) => {
        setSelectedDate(viaje.fecha);
        setSelectedTravel(viaje);
        setCurrentPage('compra-entradas');
      }}
    />
  );
}

export default App;
