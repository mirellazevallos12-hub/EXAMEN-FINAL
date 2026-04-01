import { useState } from 'react';
import '../styles/Login.css';
import ChatAssistant from '../components/ChatAssistant';

export default function Login({ onSwitchToRegister, onSwitchToHome, backgroundImage, onImageChange, onUsuarioLogueado }) {
  const [usuario, setUsuario] = useState('');
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const USUARIO_VALIDO = '123456';
  const CODIGO_VALIDO = '123456';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!usuario || !codigo) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (usuario !== USUARIO_VALIDO || codigo !== CODIGO_VALIDO) {
      setError('Usuario o código incorrecto');
      return;
    }

    setError('');
    setSuccess('¡Login exitoso!');
    setTimeout(() => {
      setSuccess('');
      onUsuarioLogueado('Fernando Pérez');
      setUsuario('');
      setCodigo('');
      onSwitchToHome();
    }, 1000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url) => {
    if (url) {
      onImageChange(url);
    }
  };

  return (
    <>
      <div 
        className="login-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
      <div className="login-overlay"></div>
      
      <div className="login-card">
        <h1 className="login-title">LOGIN</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Código</label>
            <input
              type="password"
              placeholder="Ingresa tu código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="input-field"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="btn-login">
            INICIAR SESIÓN
          </button>
        </form>

        <div className="social-login">
          <button className="btn-social google">
            🔍 GOOGLE
          </button>
          <button className="btn-social facebook">
            f FACEBOOK
          </button>
        </div>

        <div className="register-link">
          <p>¿No tienes cuenta?</p>
          <button 
            type="button"
            onClick={onSwitchToRegister}
            className="btn-register-link"
          >
            Crear cuenta aquí
          </button>
        </div>
      </div>
    </div>
    <ChatAssistant onImageChange={onImageChange} />
    </>
  );
}
