export default function MensajeExito({ mensaje }) {
  return (
    <div className="wizard-success">
      <div className="success-icon">✓</div>
      <p>{mensaje}</p>
    </div>
  );
}
