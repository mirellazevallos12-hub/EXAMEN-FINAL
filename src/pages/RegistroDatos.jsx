import { useState } from 'react';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/RegistroDatos.css';

export default function RegistroDatos({ onSwitchToLogin, onSwitchToHome, onSwitchToPromociones, onSwitchToHistorial, onNuestroServicio, onContinuarPago }) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    numeroCivular: '',
    numeroDni: '',
    correoElectronico: '',
    genero: '',
    observacionCliente: '',
    contactoEmergencia: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que todos los campos requeridos estén completos
    if (!formData.nombres || !formData.apellidos || !formData.numeroDni || !formData.correoElectronico) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    console.log('Datos guardados:', formData);
    onContinuarPago();
  };

  return (
    <div className="registro-datos-page">
      <EncabezadoPrincipal 
        onUsuarioClick={onSwitchToLogin}
        onPromocionesClick={onSwitchToPromociones}
        onHistorialClick={onSwitchToHistorial}
        onNuestroServicio={onNuestroServicio}
      />

      <div className="pasos-progreso-registro">
        <div className="paso-item completado">
          <div className="numero-paso">1</div>
          <p>Destino-Fecha</p>
        </div>
        <div className="paso-item completado">
          <div className="numero-paso">2</div>
          <p>Selecciona asientos</p>
        </div>
        <div className="paso-item activo">
          <div className="numero-paso">3</div>
          <p>Registra datos</p>
        </div>
        <div className="paso-item">
          <div className="numero-paso">4</div>
          <p>Realiza pagos</p>
        </div>
      </div>

      <div className="registro-container">
        <div className="tarjeta-registro">
          <h2>DATOS DE PASAJERO:</h2>

          <form onSubmit={handleSubmit} className="formulario-registro">
            <div className="columnas-formulario">
              <div className="columna-izquierda">
                <div className="grupo-input-registro">
                  <label>NOMBRES</label>
                  <input
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    className="input-registro"
                    required
                  />
                </div>

                <div className="grupo-input-registro">
                  <label>APELLIDOS</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    placeholder="Ingresa tu apellido"
                    className="input-registro"
                    required
                  />
                </div>

                <div className="grupo-input-registro">
                  <label>NUMERO CIVULAR</label>
                  <input
                    type="text"
                    name="numeroCivular"
                    value={formData.numeroCivular}
                    onChange={handleChange}
                    placeholder="Número de cédula"
                    className="input-registro"
                  />
                </div>

                <div className="grupo-input-registro">
                  <label>NUMERO DE DNI</label>
                  <input
                    type="text"
                    name="numeroDni"
                    value={formData.numeroDni}
                    onChange={handleChange}
                    placeholder="Ingresa tu DNI"
                    className="input-registro"
                    required
                  />
                </div>
              </div>

              <div className="columna-derecha">
                <div className="grupo-input-registro">
                  <label>CORREO ELECTRONICO</label>
                  <input
                    type="email"
                    name="correoElectronico"
                    value={formData.correoElectronico}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="input-registro"
                    required
                  />
                </div>

                <div className="grupo-input-registro">
                  <label>GENERO</label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className="input-registro"
                  >
                    <option value="">Selecciona tu género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="grupo-input-registro">
                  <label>OBSERVACION DE CLIENTE</label>
                  <textarea
                    name="observacionCliente"
                    value={formData.observacionCliente}
                    onChange={handleChange}
                    placeholder="Observaciones adicionales"
                    className="input-registro textarea-registro"
                    rows="2"
                  />
                </div>

                <div className="grupo-input-registro">
                  <label>CONTACTO DE EMERGENCIA</label>
                  <input
                    type="tel"
                    name="contactoEmergencia"
                    value={formData.contactoEmergencia}
                    onChange={handleChange}
                    placeholder="Número de emergencia"
                    className="input-registro"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-siguiente">
              SIGUIENTE
            </button>
          </form>
        </div>
      </div>

      <ChatAssistant page="registro-datos" />
    </div>
  );
}
