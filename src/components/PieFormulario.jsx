export default function PieFormulario({ alCambiarALogin }) {
  return (
    <div className="wizard-footer">
      <p>¿Ya tienes cuenta?</p>
      <button 
        type="button"
        onClick={alCambiarALogin}
        className="btn-login-link"
      >
        Inicia sesión aquí
      </button>
    </div>
  );
}
