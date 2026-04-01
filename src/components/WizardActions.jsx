export default function WizardActions({ 
  step, 
  totalSteps, 
  onBack, 
  onNext, 
  isLastStep 
}) {
  return (
    <div className="wizard-actions">
      <button 
        onClick={onBack}
        className="btn-action btn-back"
        disabled={step === 0}
      >
        ← Atrás
      </button>
      <button 
        onClick={onNext}
        className="btn-action btn-next"
      >
        {isLastStep ? 'Finalizar' : 'Siguiente →'}
      </button>
    </div>
  );
}
