import { useState } from 'react';
import '../styles/Register.css';
import '../styles/RegisterWizard.css';
import ChatAssistant from '../components/ChatAssistant';
import EncabezadoFormulario from '../components/EncabezadoFormulario';
import PreguntaFormulario from '../components/PreguntaFormulario';
import MensajeExito from '../components/MensajeExito';
import BotonesFormulario from '../components/BotonesFormulario';
import PieFormulario from '../components/PieFormulario';

export default function Register({ onSwitchToLogin, backgroundImage, onImageChange }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    fechaNacimiento: {
      dia: '',
      mes: '',
      año: ''
    },
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const questions = [
    { label: '¿Cuál es tu nombre?', key: 'nombres', type: 'text', placeholder: 'Ej: Juan' },
    { label: '¿Cuál es tu apellido?', key: 'apellidos', type: 'text', placeholder: 'Ej: Pérez' },
    { label: '¿Tu correo electrónico?', key: 'email', type: 'email', placeholder: 'tu@email.com' },
    { label: '¿Fecha de nacimiento?', key: 'fechaNacimiento', type: 'text', placeholder: 'DD/MM/AAAA' },
    { label: '¿Contraseña?', key: 'password', type: 'password', placeholder: '••••••••' },
    { label: '¿Confirmar contraseña?', key: 'confirmPassword', type: 'password', placeholder: '••••••••' }
  ];

  const handleNext = () => {
    const currentQuestion = questions[step];
    
    // Special handling for fecha de nacimiento
    if (step === 3) {
      if (!formData.fechaNacimiento.dia || !formData.fechaNacimiento.mes || !formData.fechaNacimiento.año) {
        setError('Por favor completa la fecha de nacimiento');
        return;
      }
      setError('');
      setStep(step + 1);
      return;
    }

    const value = formData[currentQuestion.key];

    if (!value) {
      setError(`Por favor completa: ${currentQuestion.label}`);
      return;
    }

    if (currentQuestion.key === 'email' && !value.includes('@')) {
      setError('Email inválido');
      return;
    }

    if (currentQuestion.key === 'password' && value.length < 6) {
      setError('Contraseña debe tener mínimo 6 caracteres');
      return;
    }

    if (currentQuestion.key === 'confirmPassword') {
      if (value !== formData.password) {
        setError('Las contraseñas no coinciden');
        return;
      }
      handleSubmit();
      return;
    }

    setError('');
    setStep(step + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (step === 3) {
      // Handle date fields (dia, mes, año)
      setFormData(prev => ({
        ...prev,
        fechaNacimiento: {
          ...prev.fechaNacimiento,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [questions[step].key]: value
      }));
    }
  };

  const handleSubmit = () => {
    setSuccess('¡Cuenta creada exitosamente!');
    setTimeout(() => {
      onSwitchToLogin();
      setFormData({
        nombres: '',
        apellidos: '',
        email: '',
        fechaNacimiento: {
          dia: '',
          mes: '',
          año: ''
        },
        password: '',
        confirmPassword: ''
      });
      setSuccess('');
      setStep(0);
    }, 2000);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setError('');
    }
  };

  return (
    <>
      <div 
        className="register-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="register-overlay"></div>

        <div className="register-wizard">
          <EncabezadoFormulario paso={step} totalPasos={questions.length} />

          {success ? (
            <MensajeExito mensaje={success} />
          ) : (
            <>
              <PreguntaFormulario 
                etiquetaPregunta={questions[step].label}
                tipoPregunta={questions[step].type}
                placeholder={questions[step].placeholder}
                valor={formData[questions[step].key]}
                alCambiar={handleInputChange}
                error={error}
                esPasoFecha={step === 3}
                valorFecha={formData.fechaNacimiento}
              />

              <BotonesFormulario 
                paso={step}
                totalPasos={questions.length}
                alVolverAtras={handleBack}
                alSiguiente={handleNext}
                esUltimoPaso={step === questions.length - 1}
              />

              <PieFormulario alCambiarALogin={onSwitchToLogin} />
            </>
          )}
        </div>
      </div>
      <ChatAssistant onImageChange={onImageChange} />
    </>
  );
}
