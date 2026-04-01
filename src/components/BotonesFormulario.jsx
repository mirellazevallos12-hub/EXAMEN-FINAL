export default function BotonesFormulario({ 
  paso, 
  totalPasos, 
  alVolverAtras, 
  alSiguiente, 
  esUltimoPaso 
}) {
  return (
    <div className="wizard-actions">
      <button 
        onClick={alVolverAtras}
        className="btn-action btn-back"
        disabled={paso === 0}
      >
        ← Atrás
      </button>
      <button 
        onClick={alSiguiente}
        className="btn-action btn-next"
      >
        {esUltimoPaso ? 'Finalizar' : 'Siguiente →'}
      </button>
    </div>
  );
}
