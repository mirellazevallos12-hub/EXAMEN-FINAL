export default function WizardFooter({ onSwitchToLogin }) {
  return (
    <div className="wizard-footer">
      <p>¿Ya tienes cuenta?</p>
      <button 
        type="button"
        onClick={onSwitchToLogin}
        className="btn-login-link"
      >
        Inicia sesión aquí
      </button>
    </div>
  );
}
