export default function EncabezadoFormulario({ paso, totalPasos }) {
  return (
    <div className="wizard-header">
      <h1 className="wizard-title">Crear Cuenta</h1>
      <div className="wizard-steps">
        {Array.from({ length: totalPasos }).map((_, idx) => (
          <div 
            key={idx} 
            className={`step-indicator ${idx === paso ? 'active' : ''} ${idx < paso ? 'completed' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
