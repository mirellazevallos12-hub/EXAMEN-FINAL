export default function WizardHeader({ step, totalSteps }) {
  return (
    <div className="wizard-header">
      <h1 className="wizard-title">Crear Cuenta</h1>
      <div className="wizard-steps">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div 
            key={idx} 
            className={`step-indicator ${idx === step ? 'active' : ''} ${idx < step ? 'completed' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
