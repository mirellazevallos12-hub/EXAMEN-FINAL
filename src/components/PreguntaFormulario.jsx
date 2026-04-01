import SelectorFecha from './SelectorFecha';

export default function PreguntaFormulario({ 
  etiquetaPregunta, 
  tipoPregunta, 
  placeholder, 
  valor, 
  alCambiar, 
  error, 
  esPasoFecha, 
  valorFecha 
}) {
  return (
    <div className="wizard-body">
      <div className="question-text">{etiquetaPregunta}</div>
      
      {error && <div className="error-message">{error}</div>}
      
      {esPasoFecha ? (
        <SelectorFecha fechaNacimiento={valorFecha} alCambiar={alCambiar} />
      ) : (
        <input
          type={tipoPregunta}
          placeholder={placeholder}
          value={valor}
          onChange={alCambiar}
          className="wizard-input"
          autoFocus
        />
      )}
    </div>
  );
}
