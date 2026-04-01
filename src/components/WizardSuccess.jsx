export default function WizardSuccess({ message }) {
  return (
    <div className="wizard-success">
      <div className="success-icon">✓</div>
      <p>{message}</p>
    </div>
  );
}
